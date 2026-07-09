import { NextResponse } from 'next/server';
import { sanitizeInput } from '@/lib/utils';

/**
 * Interface representing the inbound request body.
 */
interface ChatRequest {
  message: string;
}

/**
 * Interface representing the structured output reply.
 */
interface ChatResponse {
  success: boolean;
  reply: string;
  error?: string;
}

// Static RAG context containing comprehensive tournament data for FIFA World Cup 2026 at MetLife Stadium
const STADIUM_KNOWLEDGE = `
Stadium Context: MetLife Stadium, New Jersey/New York.
Event: FIFA World Cup 2026.
Current Match: Brazil vs Germany (Live score: 2 - 1, 72nd min).
Active Fans: 94,218.
Available Gates: Gates A, B, C, D (Gate C is Accessibility Primary, Gate 7 North is experiencing high density).
Concessions Queues:
- MetLife Burger Co. (Section 104): Low wait (~3 min)
- Corner Kick Pizza (Section 118): Medium wait (~9 min)
- Halal Pitch Eats (Section 224): High wait (~18 min)
Accessibility Services:
- Sensory Room A: Low noise, low light area at Concourse level 1. Current occupancy: 5/10.
- Elevator Cluster C: Operating normally, primary route for Level 2 wheelchair access.
- Audio Assist Units: 150 headsets available at Info Desks.
Public Transportation:
- Metro Line A & B: Operating normally with 3-5 min frequency.
- Shuttle bus 7: Delayed by 12 mins due to traffic congestion on Route 3.
- Parking Lots: Lot A (North) is 95% full; Lot B (South) is 70% full. Lot B has available EV slots and accessible parking.
Sustainability Metrics:
- Carbon Saved: 1,247 tons.
- Waste Recycled: 78%.
- Retractable Roof Position: CLOSED.
- Field Temperature: 21.5°C.
`;

/**
 * POST handler for /api/chat.
 * Integrates directly with the Gemini API for natural language assistance.
 * Includes local pattern matching as a robust fallback.
 *
 * @param request - Inbound Next.js Request object
 * @returns JSON Response containing the chatbot reply
 */
export async function POST(request: Request): Promise<NextResponse<ChatResponse>> {
  try {
    const body = (await request.json()) as ChatRequest;
    const rawMessage = body.message;

    if (!rawMessage || typeof rawMessage !== 'string') {
      return NextResponse.json(
        { success: false, reply: 'Invalid message payload.' },
        { status: 400 }
      );
    }

    const sanitizedMessage = sanitizeInput(rawMessage);
    if (!sanitizedMessage) {
      return NextResponse.json(
        { success: false, reply: 'Message cannot be empty.' },
        { status: 400 }
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
      // Direct call to Gemini REST API to ensure no heavy packages are required
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
      const systemInstruction = `You are StadiumGPT, the AI Operating System for MetLife Stadium at FIFA World Cup 2026. Use the following context to answer the user's question concisely. Be professional, direct, and helpful. Translate automatically if the user queries in another language.\n\nContext:\n${STADIUM_KNOWLEDGE}`;

      const res = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nUser Question: ${sanitizedMessage}` }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 250,
            temperature: 0.3,
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`Gemini API returned status code ${res.status}`);
      }

      const responseData = await res.json();
      const replyText = responseData?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (replyText) {
        return NextResponse.json({ success: true, reply: replyText.trim() });
      }
    }

    // Local pattern-matching fallback with detailed answers when API key is absent
    let reply = 'I am looking into that for you. Let me check with the venue coordinator.';
    const queryLower = sanitizedMessage.toLowerCase();

    if (queryLower.includes('restroom') || queryLower.includes('bathroom') || queryLower.includes('toilet')) {
      reply = 'The nearest accessible restroom is located 45 meters behind you, next to Elevator A. Wait time: 0 minutes. Standard restrooms are near Section 104 with a 2-minute wait.';
    } else if (queryLower.includes('wheelchair') || queryLower.includes('access') || queryLower.includes('elevator')) {
      reply = 'Elevator Cluster C is fully operational. We recommend navigating through Gate C, which has designated step-free paths directly to Level 2 seating.';
    } else if (queryLower.includes('food') || queryLower.includes('queue') || queryLower.includes('eat') || queryLower.includes('drink')) {
      reply = 'MetLife Burger Co. (Section 104) has a very low wait time (~3m). Halal Pitch Eats (Section 224) is currently experiencing long queues (~18m).';
    } else if (queryLower.includes('sustainability') || queryLower.includes('carbon') || queryLower.includes('green')) {
      reply = 'StadiumGPT has coordinated environmental saves of 1,247 tons of CO₂ and achieved a 78% waste recycling rate. The retractable roof is currently closed.';
    } else if (queryLower.includes('shuttle') || queryLower.includes('metro') || queryLower.includes('bus') || queryLower.includes('transport')) {
      reply = 'Metro Lines A and B are running on-time (3-5 min frequency). Shuttle Bus 7 is experiencing a 12-minute delay due to external traffic on Route 3.';
    } else if (queryLower.includes('sensory') || queryLower.includes('noise') || queryLower.includes('quiet')) {
      reply = 'Sensory Room A is available at Concourse level 1. It is a noise-reduced, low-stimulation environment. Current occupancy: 5 out of 10. No reservation needed.';
    } else if (queryLower.includes('match') || queryLower.includes('score') || queryLower.includes('stats')) {
      reply = 'Live score: Brazil 2 - 1 Germany (72\'). Possession is Brazil 58% - 42% Germany. Suggesting staying seated as queue times peak now.';
    } else if (queryLower.includes('hola') || queryLower.includes('hello') || queryLower.includes('hi')) {
      reply = 'Hello! I am StadiumGPT, your AI assistant for MetLife Stadium. I can help with navigation, multilingual translation, parking, accessibility, or operations. What can I do for you?';
    }

    return NextResponse.json({ success: true, reply });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        reply: 'I was unable to process your request at this moment.',
        error: error instanceof Error ? error.message : 'Unknown internal error',
      },
      { status: 500 }
    );
  }
}
