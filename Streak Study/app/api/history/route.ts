import { NextRequest, NextResponse } from 'next/server'

// GET /api/history - Get study history
// Receives study dates as query parameter and returns sorted list (newest first)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const datesParam = searchParams.get('dates')
    
    const studyDates: string[] = datesParam ? JSON.parse(datesParam) : []
    
    // Sort dates in descending order (newest first)
    const sortedDates = [...studyDates].sort((a, b) => 
      new Date(b).getTime() - new Date(a).getTime()
    )

    return NextResponse.json({
      success: true,
      history: sortedDates
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch history.' },
      { status: 500 }
    )
  }
}
