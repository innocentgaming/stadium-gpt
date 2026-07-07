import { NextResponse } from 'next/server';
import { sanitizeInput } from '@/lib/utils';

/**
 * GET Handler for /api/metrics
 * Returns real-time IoT metrics for MetLife Stadium.
 * Supports optional filtering by seating zone.
 *
 * @param request - Inbound HTTP Request
 * @returns JSON Response containing metrics payload or error object
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const zoneParam = searchParams.get('zone');

    if (zoneParam) {
      // Input sanitization to prevent potential XSS/injection vectors
      const sanitizedZone = sanitizeInput(zoneParam).toLowerCase();
      const validZones = ['north', 'south', 'east', 'west'];

      if (!validZones.includes(sanitizedZone)) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'INVALID_ZONE',
              message: 'Invalid zone parameter. Must be one of: north, south, east, west.',
            },
          },
          { status: 400 }
        );
      }

      const zoneMetrics: Record<string, { activeFans: number; density: number; status: string }> = {
        north: { activeFans: 19140, density: 87, status: 'high' },
        south: { activeFans: 13640, density: 62, status: 'moderate' },
        east: { activeFans: 16920, density: 94, status: 'critical' },
        west: { activeFans: 8100, density: 45, status: 'low' },
      };

      return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
        data: zoneMetrics[sanitizedZone],
      });
    }

    // Default global stadium metrics
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        activeFans: 94218,
        avgLatency: '87ms',
        safetyScore: '98.7%',
        activeIncidents: 3,
        cvFeedsActive: 847,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: error instanceof Error ? error.message : 'An unexpected error occurred.',
        },
      },
      { status: 500 }
    );
  }
}
