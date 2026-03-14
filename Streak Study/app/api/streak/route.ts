import { NextRequest, NextResponse } from 'next/server'
import { calculateStreak } from '@/lib/streakLogic'

// GET /api/streak - Get current streak info
// Receives study dates as query parameter and returns calculated streak
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const datesParam = searchParams.get('dates')
    
    const studyDates: string[] = datesParam ? JSON.parse(datesParam) : []
    const streakInfo = calculateStreak(studyDates)

    return NextResponse.json({
      success: true,
      currentStreak: streakInfo.currentStreak,
      totalDays: streakInfo.totalDays,
      lastStudyDate: streakInfo.lastStudyDate
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to calculate streak.' },
      { status: 500 }
    )
  }
}
