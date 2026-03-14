import { NextRequest, NextResponse } from 'next/server'
import { getTodayDate, hasStudiedToday, addStudyDate, calculateStreak } from '@/lib/streakLogic'

// POST /api/study - Mark today's study
// Since we're using localStorage on the client, this endpoint receives the current study dates
// and returns the updated data after adding today's date
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const studyDates: string[] = body.studyDates || []

    // Check if already studied today
    if (hasStudiedToday(studyDates)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'You have already marked today.',
          alreadyMarked: true 
        },
        { status: 400 }
      )
    }

    // Add today's date
    const updatedDates = addStudyDate(studyDates)
    const streakInfo = calculateStreak(updatedDates)

    return NextResponse.json({
      success: true,
      message: 'Great job! Study recorded for today.',
      studyDates: updatedDates,
      streak: streakInfo
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to record study.' },
      { status: 500 }
    )
  }
}
