import { sanitizeInput, clamp, formatCompactNumber, seededRandom } from '../lib/utils';

describe('Utility Functions - StadiumGPT', () => {
  // Test Input Sanitization for Security
  test('sanitizeInput should strip HTML tags and stray angle brackets', () => {
    const dirtyInput = '<script>alert("XSS")</script> Hello <world>';
    const cleanInput = sanitizeInput(dirtyInput);
    expect(cleanInput).toBe('alert("XSS") Hello');
  });

  test('sanitizeInput should trim whitespace', () => {
    const dirtyInput = '   stadium navigation    ';
    const cleanInput = sanitizeInput(dirtyInput);
    expect(cleanInput).toBe('stadium navigation');
  });

  // Test Numeric Clamping
  test('clamp should restrict value to min and max boundaries', () => {
    expect(clamp(150, 0, 100)).toBe(100);
    expect(clamp(-50, 0, 100)).toBe(0);
    expect(clamp(50, 0, 100)).toBe(50);
  });

  // Test Number Formatting
  test('formatCompactNumber should format thousands and millions correctly', () => {
    expect(formatCompactNumber(94218)).toBe('94K');
    expect(formatCompactNumber(2300000)).toBe('2.3M');
    expect(formatCompactNumber(847)).toBe('847');
  });

  // Test Seeded Random
  test('seededRandom should be deterministic and output values between 0 and 1', () => {
    const val1 = seededRandom(42);
    const val2 = seededRandom(42);
    const val3 = seededRandom(100);

    expect(val1).toBe(val2);
    expect(val1).not.toBe(val3);
    expect(val1).toBeGreaterThanOrEqual(0);
    expect(val1).toBeLessThan(1);
  });
});
