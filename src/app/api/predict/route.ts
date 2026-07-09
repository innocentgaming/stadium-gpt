import { NextResponse } from 'next/server';
import { sanitizeInput } from '@/lib/utils';

/**
 * Interface representing zone input telemetry.
 */
interface ZoneState {
  name: string;
  density: number;
  current: number;
  capacity: number;
}

/**
 * Interface representing predictions from the AI engine.
 */
interface PredictionItem {
  zone: string;
  predictedDensity: number;
  risk: 'low' | 'moderate' | 'high' | 'critical';
  recommendation: string;
}

/**
 * Interface representing the structured API response.
 */
interface PredictResponse {
  success: boolean;
  predictions: PredictionItem[];
  generalAdvice: string;
  error?: string;
}

/**
 * POST handler for /api/predict.
 * Analyzes crowd telemetry logs using the Gemini API.
 * Provides a local programmatic fallback if GEMINI_API_KEY is not defined.
 *
 * @param request - NextJS Request
 * @returns JSON response containing crowd density predictions
 */
export async function POST(request: Request): Promise<NextResponse<PredictResponse>> {
  try {
    const zones = (await request.json()) as ZoneState[];

    if (!Array.isArray(zones) || zones.length === 0) {
      return NextResponse.json(
        { success: false, predictions: [], generalAdvice: 'Invalid zone telemetry payload.' },
        { status: 400 }
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
      const systemInstruction = `You are the Crowd Analytics AI Predictor for MetLife Stadium at FIFA World Cup 2026. Given the following active stands and concourse telemetry, output a valid JSON response containing a forecast for the next 2 hours. Use these EXACT JSON keys: "predictions" (array of items with keys "zone", "predictedDensity", "risk", "recommendation") and "generalAdvice" (string). Ensure risk is one of: "low", "moderate", "high", "critical". Do not include markdown code block formatting in the output, only return raw JSON.`;

      const res = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nTelemetry: ${JSON.stringify(zones)}` }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (res.ok) {
        const responseData = await res.json();
        const rawText = responseData?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText.trim()) as {
            predictions: PredictionItem[];
            generalAdvice: string;
          };
          return NextResponse.json({
            success: true,
            predictions: parsed.predictions,
            generalAdvice: parsed.generalAdvice,
          });
        }
      }
    }

    // Local Programmatic Fallback Prediction Engine
    const predictions: PredictionItem[] = zones.map((zone) => {
      // Forecast small random fluctuation or increase
      const predictedDensity = Math.min(100, Math.max(10, zone.density + Math.floor(Math.random() * 8) - 2));
      let risk: 'low' | 'moderate' | 'high' | 'critical' = 'low';
      let recommendation = 'Status normal. Continue monitoring flows.';

      if (predictedDensity > 90) {
        risk = 'critical';
        recommendation = `Divert inflow from adjacent turnstiles to secondary concourses. Halt local ticket scans.`;
      } else if (predictedDensity > 80) {
        risk = 'high';
        recommendation = `Deploy auxiliary volunteers to direct traffic. Open gate auxiliary channels.`;
      } else if (predictedDensity > 55) {
        risk = 'moderate';
        recommendation = 'Monitor ticketing gates closely for potential queues.';
      }

      return {
        zone: sanitizeInput(zone.name),
        predictedDensity,
        risk,
        recommendation,
      };
    });

    const hasCritical = predictions.some((p) => p.risk === 'critical');
    const generalAdvice = hasCritical
      ? 'Crowd density is peaking in multiple stands. We recommend activating dynamic perimeter holds at Gate 7 North.'
      : 'Crowd distributions are within safe operating limits. Maintain standard volunteer checkpoints.';

    return NextResponse.json({
      success: true,
      predictions,
      generalAdvice,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        predictions: [],
        generalAdvice: 'Operational forecast failed due to telemetry processing error.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
