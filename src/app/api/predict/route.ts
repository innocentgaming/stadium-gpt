import { NextResponse } from 'next/server';
import { GeminiAIService } from '@/lib/services/ai';
import { predictRateLimiter } from '@/lib/rate-limiter';
import { sanitizeInput } from '@/lib/utils';

// Helper to determine allowed origin for CORS/CSRF validation
const getAllowedOrigin = (): string => {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Checks if origin header matches the allowed application domain.
 * Prevents CSRF attacks from external websites.
 */
function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true; // Direct same-origin browser POST requests might lack origin
  const allowed = getAllowedOrigin();
  if (origin === allowed) return true;
  if (origin.startsWith('http://localhost:') || origin.startsWith('https://localhost:')) return true;
  return false;
}

// Instantiate the AI Service
const aiService = new GeminiAIService();

/**
 * OPTIONS preflight handler for CORS.
 */
export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS, status: 200 });
}

/**
 * POST handler for /api/predict.
 * Analyzes crowd telemetry logs using the Gemini API or Heuristic fallback.
 * Incorporates CORS, CSRF, and Rate Limiting.
 */
export async function POST(request: Request) {
  try {
    // 1. CSRF Verification
    const origin = request.headers.get('origin');
    if (!isOriginAllowed(origin)) {
      return NextResponse.json(
        { success: false, predictions: [], generalAdvice: 'Access forbidden: Unauthorized origin.', error: 'CSRF block' },
        { status: 403, headers: CORS_HEADERS }
      );
    }

    // 2. Rate Limiting Verification
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!predictRateLimiter.check(ip)) {
      return NextResponse.json(
        {
          success: false,
          predictions: [],
          generalAdvice: 'Too many requests. Please wait a minute and try again.',
          error: 'Rate limit exceeded',
        },
        { status: 429, headers: CORS_HEADERS }
      );
    }

    const zones = await request.json();

    if (!Array.isArray(zones) || zones.length === 0) {
      return NextResponse.json(
        { success: false, predictions: [], generalAdvice: 'Invalid zone telemetry payload.' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // 3. Delegate to AI Service
    const aiResponse = await aiService.generateCrowdPrediction(zones);
    const status = aiResponse.success ? 200 : 500;

    return NextResponse.json(aiResponse, { status, headers: CORS_HEADERS });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        predictions: [],
        generalAdvice: 'Operational forecast failed due to telemetry processing error.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
