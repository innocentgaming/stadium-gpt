import { InMemoryRateLimiter } from '../lib/rate-limiter';
import { handleDashboardIncidentFilter, filterVolunteers, filterVolunteerTasks } from '../lib/services/filters';
import { GeminiAIService } from '../lib/services/ai';

// Mock global fetch for testing the API calling branches
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('InMemoryRateLimiter Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should allow requests within limit and reject after limit is reached', () => {
    const limiter = new InMemoryRateLimiter(10000, 3);
    const key = 'test-client-ip';

    expect(limiter.check(key)).toBe(true);
    expect(limiter.check(key)).toBe(true);
    expect(limiter.check(key)).toBe(true);
    expect(limiter.check(key)).toBe(false);
  });

  test('should reset rate limits for a specific key', () => {
    const limiter = new InMemoryRateLimiter(10000, 2);
    const key = 'another-ip';

    expect(limiter.check(key)).toBe(true);
    expect(limiter.check(key)).toBe(true);
    expect(limiter.check(key)).toBe(false);

    limiter.reset(key);
    expect(limiter.check(key)).toBe(true);
  });
});

describe('Filters Service Unit Tests', () => {
  const mockIncidents = [
    { id: '1', type: 'Medical', severity: 'Critical', location: 'Sec 205', status: 'Resolved', time: '12:00', date: '2026-07-07', response: '1m', agent: 'Medical' },
    { id: '2', type: 'Fire Alert', severity: 'Critical', location: 'Kitchen', status: 'In Progress', time: '12:10', date: '2026-07-07', response: '2m', agent: 'Safety' },
  ];

  test('handleDashboardIncidentFilter should search correctly', () => {
    const res = handleDashboardIncidentFilter(mockIncidents, 'medical');
    expect(res.state).toBe('success');
    expect(res.data.length).toBe(1);
    expect(res.data[0].id).toBe('1');
  });

  test('handleDashboardIncidentFilter should return empty/success for blank queries', () => {
    expect(handleDashboardIncidentFilter([], 'test').state).toBe('empty');
    expect(handleDashboardIncidentFilter(mockIncidents, '').state).toBe('success');
    expect(handleDashboardIncidentFilter(mockIncidents, 'Nonexistent').state).toBe('no-results');
  });

  test('filterVolunteers should filter by search query and status', () => {
    const mockVolunteers = [
      { name: 'Maria Garcia', role: 'Guide', zone: 'Gate 7', status: 'active', tasks: 12, avatar: '👩‍🦰' },
      { name: 'James Wilson', role: 'Medical', zone: 'Sec 100', status: 'break', tasks: 6, avatar: '🧑‍⚕️' },
    ];

    expect(filterVolunteers(mockVolunteers, 'maria').length).toBe(1);
    expect(filterVolunteers(mockVolunteers, '', 'break').length).toBe(1);
    expect(filterVolunteers(mockVolunteers, '', 'all').length).toBe(2);
    expect(filterVolunteers(mockVolunteers, '', '').length).toBe(2); // empty statusFilter check
    expect(filterVolunteers(mockVolunteers, 'nonexistent').length).toBe(0);
  });

  test('filterVolunteerTasks should filter by priority and search', () => {
    const mockTasks = [
      { task: 'Escort wheelchair user to Section 205', priority: 'high', zone: 'Gate 3', eta: '5 min' },
      { task: 'Restock water at Station 7', priority: 'low', zone: 'F&B Area', eta: '10 min' },
    ];

    expect(filterVolunteerTasks(mockTasks, 'water').length).toBe(1);
    expect(filterVolunteerTasks(mockTasks, '', 'high').length).toBe(1);
    expect(filterVolunteerTasks(mockTasks, '', 'all').length).toBe(2);
    expect(filterVolunteerTasks(mockTasks, '', '').length).toBe(2); // empty priorityFilter check
  });
});

describe('GeminiAIService RAG and Fallback Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call Gemini REST API if API key is provided and succeed', async () => {
    const aiService = new GeminiAIService('dummy-key');

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: 'Answer from Gemini API' }] } }]
      })
    });

    const res = await aiService.generateChatReply('Help with sensory room');
    expect(res.success).toBe(true);
    expect(res.reply).toBe('Answer from Gemini API');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('should handle API success but missing candidates structure gracefully', async () => {
    const aiService = new GeminiAIService('dummy-key');

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}) // missing candidates
    });

    const res = await aiService.generateChatReply('Where is the restroom?');
    expect(res.success).toBe(true); // falls back to local patterns
    expect(res.reply).toContain('accessible restroom');
  });

  test('should fall back to local pattern-matching if Gemini API fails', async () => {
    const aiService = new GeminiAIService('dummy-key');

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    const res = await aiService.generateChatReply('Where is the restroom?');
    expect(res.success).toBe(true); // falls back to local patterns
    expect(res.reply).toContain('accessible restroom');
  });

  test('should return error if message is empty', async () => {
    const aiService = new GeminiAIService('');
    const res = await aiService.generateChatReply('   ');
    expect(res.success).toBe(false);
    expect(res.reply).toBe('Message cannot be empty.');
  });

  test('should return fallback answers for all known keywords', async () => {
    const aiService = new GeminiAIService(''); // empty key triggers fallback

    const cases = [
      { q: 'restroom bathroom toilet', contains: 'accessible restroom' },
      { q: 'wheelchair access elevator', contains: 'Elevator Cluster C' },
      { q: 'food queue eat drink burger', contains: 'MetLife Burger Co.' },
      { q: 'sustainability carbon green', contains: '1,247 tons of CO₂' },
      { q: 'shuttle metro bus transport', contains: 'Metro Lines A and B' },
      { q: 'sensory noise quiet', contains: 'Sensory Room A' },
      { q: 'match score stats', contains: 'Brazil 2 - 1 Germany' },
      { q: 'hola hello hi', contains: 'I am StadiumGPT' },
      { q: 'unknown query text', contains: 'looking into that for you' }
    ];

    for (const testCase of cases) {
      const res = await aiService.generateChatReply(testCase.q);
      expect(res.success).toBe(true);
      expect(res.reply).toContain(testCase.contains);
    }
  });

  test('should return crowd predictions via Gemini API if key is present', async () => {
    const aiService = new GeminiAIService('dummy-key');
    const mockZones = [{ name: 'North Stand', density: 87, capacity: 22000, current: 19140 }];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        candidates: [{ content: { parts: [{ text: JSON.stringify({ predictions: [{ zone: 'North Stand', predictedDensity: 89, risk: 'high', recommendation: 'Open auxiliary' }], generalAdvice: 'Advice here' }) }] } }]
      })
    });

    const res = await aiService.generateCrowdPrediction(mockZones);
    expect(res.success).toBe(true);
    expect(res.predictions.length).toBe(1);
    expect(res.predictions[0].zone).toBe('North Stand');
    expect(res.generalAdvice).toBe('Advice here');
  });

  test('should handle prediction API success but missing candidates gracefully', async () => {
    const aiService = new GeminiAIService('dummy-key');
    const mockZones = [{ name: 'North Stand', density: 87, capacity: 22000, current: 19140 }];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}) // missing candidates
    });

    const res = await aiService.generateCrowdPrediction(mockZones);
    expect(res.success).toBe(true); // falls back to local patterns
    expect(res.predictions.length).toBe(1);
  });

  test('should fall back to deterministic heuristics for predictions if key is missing or API fails', async () => {
    const aiService = new GeminiAIService('');
    const mockZones = [
      { name: 'North Stand', density: 99, capacity: 22000, current: 19140 }, // will scale to critical (>90)
      { name: 'South Stand', density: 85, capacity: 22000, current: 13640 }, // will scale to high (80-90)
      { name: 'East Stand', density: 60, capacity: 18000, current: 10000 },  // will scale to moderate (55-80)
      { name: 'West Stand', density: 30, capacity: 18000, current: 5400 }    // will scale to low (<55)
    ];

    const res = await aiService.generateCrowdPrediction(mockZones);
    expect(res.success).toBe(true);
    expect(res.predictions.length).toBe(4);
    
    // Check risk classifications mapping
    expect(res.predictions[0].risk).toBe('critical'); 
    expect(res.predictions[1].risk).toBe('high');     
    expect(res.predictions[2].risk).toBe('moderate'); 
    expect(res.predictions[3].risk).toBe('low');      
  });

  test('should return prediction validation error if input is empty or invalid', async () => {
    const aiService = new GeminiAIService('');
    const res = await aiService.generateCrowdPrediction([] as any);
    expect(res.success).toBe(false);
    expect(res.predictions.length).toBe(0);
    expect(res.generalAdvice).toContain('Invalid');
  });

  test('should hit catch blocks on invalid inputs in service methods', async () => {
    const aiService = new GeminiAIService('');
    
    // Force catch inside generateChatReply with Error object
    const chatErrorRes = await aiService.generateChatReply(null as any);
    expect(chatErrorRes.success).toBe(false);
    expect(chatErrorRes.error).toBeDefined();

    // Force catch inside generateChatReply with string object throwing during replace
    const badMessage = {
      replace: () => { throw 'String error'; }
    };
    const chatStringErrorRes = await aiService.generateChatReply(badMessage as any);
    expect(chatStringErrorRes.success).toBe(false);
    expect(chatStringErrorRes.error).toBe('Unknown internal error');

    // Force catch inside generateCrowdPrediction by passing an array containing undefined to bypass check
    const predictErrorRes = await aiService.generateCrowdPrediction([undefined as any]);
    expect(predictErrorRes.success).toBe(false);
    expect(predictErrorRes.error).toBeDefined();

    // Force catch inside generateCrowdPrediction with string object by bypassing name getter
    const badZones = [
      {
        get name() {
          throw 'String error';
        },
        density: 50,
        current: 100,
        capacity: 200
      }
    ];
    const predictStringErrorRes = await aiService.generateCrowdPrediction(badZones as any);
    expect(predictStringErrorRes.success).toBe(false);
    expect(predictStringErrorRes.error).toBe('Unknown error');
  });
});
