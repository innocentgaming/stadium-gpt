import { NextResponse } from 'next/server';
import { GeminiAIService } from '@/lib/services/ai';
import { chatRateLimiter } from '@/lib/rate-limiter';
import { sanitizeInput } from '@/lib/utils';

// Helper to determine allowed origin for CORS/CSRF validation
const getAllowedOrigin = (): string => {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*', // Standard for public/app-facing endpoints in this context, or restrict to getAllowedOrigin()
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

/**
 * Simple pattern scanner for adversarial instructions to prevent LLM Hijacking.
 */
function detectPromptInjection(message: string): boolean {
  const injectionPatterns = [
    /\bignore\s+(?:previous|all|the)\s+instruction/i,
    /\bignore\s+above\b/i,
    /\bsystem\s+override\b/i,
    /\byou\s+are\s+now\s+a\b/i,
    /\bforget\s+(?:your|what\s+you)\b/i,
    /\bnew\s+role\b/i,
    /system\s*prompt/i,
    /\bjailbreak\b/i,
  ];
  return injectionPatterns.some((pattern) => pattern.test(message));
}

// Instantiate the AI Service (Injects environment key automatically)
const aiService = new GeminiAIService();

/**
 * OPTIONS preflight handler for CORS.
 */
export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS_HEADERS, status: 200 });
}

/**
 * POST handler for /api/chat.
 * Incorporates security filters (Rate Limiting, CSRF, XSS, Prompt Injection).
 */
export async function POST(request: Request) {
  try {
    // 1. CSRF Verification
    const origin = request.headers.get('origin');
    if (!isOriginAllowed(origin)) {
      return NextResponse.json(
        { success: false, reply: 'Access forbidden: Unauthorized origin.', error: 'CSRF block' },
        { status: 403, headers: CORS_HEADERS }
      );
    }

    // 2. Rate Limiting Verification
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!chatRateLimiter.check(ip)) {
      return NextResponse.json(
        { success: false, reply: 'Too many requests. Please wait a minute and try again.', error: 'Rate limit exceeded' },
        { status: 429, headers: CORS_HEADERS }
      );
    }

    const body = await request.json();
    const rawMessage = body.message;

    if (!rawMessage || typeof rawMessage !== 'string') {
      return NextResponse.json(
        { success: false, reply: 'Invalid message payload.' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const sanitizedMessage = sanitizeInput(rawMessage);
    if (!sanitizedMessage) {
      return NextResponse.json(
        { success: false, reply: 'Message cannot be empty.' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // 3. Prompt Injection Shielding
    if (detectPromptInjection(sanitizedMessage)) {
      return NextResponse.json(
        {
          success: false,
          reply: 'Security alert: The query triggered StadiumGPT Prompt Guardrails. System override attempts are blocked.',
          error: 'Prompt injection attempt detected.',
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // 4. Delegate to AI Service
    const aiResponse = await aiService.generateChatReply(sanitizedMessage);
    const status = aiResponse.success ? 200 : 500;

    return NextResponse.json(aiResponse, { status, headers: CORS_HEADERS });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        reply: 'An error occurred while compiling your request.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
