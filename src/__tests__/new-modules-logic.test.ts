// Test suite for the logic of new operational modules (Fan Experience, Accessibility, Transportation, Operations)

// 1. Fan Experience Route Planner Logic
export function calculateFanRoute(section: string): string {
  if (!section.trim()) return '';
  return `Route Calculated!\n\n1. Enter via Gate C (Wheelchair Accessible).\n2. Take Escalator 4 to Concourse level 2.\n3. Section ${section} will be to your left.\n4. Nearest F&B: MetLife Burger Co. (no queue).`;
}

// 2. Accessibility Voice Copilot Logic
export function getVoiceAssistantResponse(command: string): string {
  if (command.includes('wheelchair')) {
    return 'Calculating optimal wheelchair-accessible route. Navigate to Gate C Elevator 3 to Level 2.';
  }
  if (command.includes('restroom')) {
    return 'The closest accessible restroom is 45 meters behind you, next to Elevator A. Wait time is 0 minutes.';
  }
  return 'Searching for accessibility services. Please specify wheelchair routes, restrooms, or sensory rooms.';
}

// 3. Transportation Parking Occupancy Percentage Calculation
export function getParkingOccupancyPercent(occupied: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((occupied / total) * 100);
}

// 4. Stadium Operations Temp Adjust
export function adjustFieldTemperature(current: number, direction: 'up' | 'down'): number {
  const delta = direction === 'up' ? 0.5 : -0.5;
  return Number((current + delta).toFixed(1));
}

describe('StadiumGPT New Modules Logic Tests', () => {
  test('Fan Experience - calculateFanRoute should generate precise directions based on section', () => {
    expect(calculateFanRoute('')).toBe('');
    expect(calculateFanRoute('205')).toContain('Section 205');
    expect(calculateFanRoute('108')).toContain('Section 108');
  });

  test('Accessibility - getVoiceAssistantResponse should return correct guidance for keywords', () => {
    expect(getVoiceAssistantResponse('Find a wheelchair route')).toContain('wheelchair-accessible route');
    expect(getVoiceAssistantResponse('Where is the restroom')).toContain('accessible restroom');
    expect(getVoiceAssistantResponse('Hello')).toContain('Searching for accessibility services');
  });

  test('Transportation - getParkingOccupancyPercent should correctly compute rounded occupancy', () => {
    expect(getParkingOccupancyPercent(1140, 1200)).toBe(95);
    expect(getParkingOccupancyPercent(560, 800)).toBe(70);
    expect(getParkingOccupancyPercent(0, 500)).toBe(0);
    expect(getParkingOccupancyPercent(100, 0)).toBe(0);
  });

  test('Operations - adjustFieldTemperature should increment/decrement in tenths precision', () => {
    expect(adjustFieldTemperature(21.5, 'up')).toBe(22.0);
    expect(adjustFieldTemperature(21.5, 'down')).toBe(21.0);
    expect(adjustFieldTemperature(20.0, 'up')).toBe(20.5);
  });
});
