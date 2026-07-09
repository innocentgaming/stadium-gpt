import { POST } from '../app/api/predict/route';

describe('/api/predict Route Handler', () => {
  test('should return 400 when zones telemetry is missing or not an array', async () => {
    const request = new Request('http://localhost:3000/api/predict', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    const response = await POST(request);

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.generalAdvice).toContain('Invalid zone telemetry');
  });

  test('should return 200 and valid predictions when zones are passed', async () => {
    const zones = [
      { name: 'North Stand', density: 87, capacity: 22000, current: 19140 },
      { name: 'East Wing', density: 94, capacity: 18000, current: 16920 },
    ];
    const request = new Request('http://localhost:3000/api/predict', {
      method: 'POST',
      body: JSON.stringify(zones),
    });
    const response = await POST(request);

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.predictions).toHaveLength(2);
    expect(body.predictions[0].zone).toBe('North Stand');
    expect(body.generalAdvice).toBeDefined();
  });
});
