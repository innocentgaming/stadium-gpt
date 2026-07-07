import { GET } from '../app/api/metrics/route';

describe('/api/metrics API Route Handler', () => {
  test('should return global metrics when no zone parameter is provided', async () => {
    const request = new Request('http://localhost:3000/api/metrics');
    const response = await GET(request);

    expect(response.status).toBe(200);
    const body = await response.json();

    expect(body.success).toBe(true);
    expect(body.timestamp).toBeDefined();
    expect(body.data).toEqual({
      activeFans: 94218,
      avgLatency: '87ms',
      safetyScore: '98.7%',
      activeIncidents: 3,
      cvFeedsActive: 847,
    });
  });

  test('should return zone metrics when a valid zone parameter is provided', async () => {
    const request = new Request('http://localhost:3000/api/metrics?zone=north');
    const response = await GET(request);

    expect(response.status).toBe(200);
    const body = await response.json();

    expect(body.success).toBe(true);
    expect(body.data).toEqual({
      activeFans: 19140,
      density: 87,
      status: 'high',
    });
  });

  test('should return 400 error when an invalid zone is specified', async () => {
    const request = new Request('http://localhost:3000/api/metrics?zone=invalid_zone');
    const response = await GET(request);

    expect(response.status).toBe(400);
    const body = await response.json();

    expect(body.success).toBe(false);
    expect(body.error.code).toBe('INVALID_ZONE');
    expect(body.error.message).toContain('Invalid zone parameter');
  });

  test('should handle case-insensitive zone parameter', async () => {
    const request = new Request('http://localhost:3000/api/metrics?zone=EAST');
    const response = await GET(request);

    expect(response.status).toBe(200);
    const body = await response.json();

    expect(body.success).toBe(true);
    expect(body.data).toEqual({
      activeFans: 16920,
      density: 94,
      status: 'critical',
    });
  });

  test('should sanitize malicious input and reject it with 400', async () => {
    const request = new Request('http://localhost:3000/api/metrics?zone=<script>alert("xss")</script>EAST');
    const response = await GET(request);

    expect(response.status).toBe(400);
    const body = await response.json();

    expect(body.success).toBe(false);
    expect(body.error.code).toBe('INVALID_ZONE');
  });
});
