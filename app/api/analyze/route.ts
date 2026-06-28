import { NextResponse } from 'next/server';
import { MOCK_INCIDENTS } from '@/lib/mock-incidents';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { incidentId = 'ransomware-attack' } = body;

    const incident = MOCK_INCIDENTS[incidentId] || MOCK_INCIDENTS['ransomware-attack'];

    return NextResponse.json({
      success: true,
      incidentId: incident.id,
      status: 'ORCHESTRATION_INITIALIZED',
      timestamp: new Date().toISOString(),
      scenario: incident
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to initialize incident analysis telemetry' },
      { status: 500 }
    );
  }
}
