// Streak logic utilities for the Daily Learning Streak Tracker

export interface StudyData {
  studyDates: string[] // Array of ISO date strings (YYYY-MM-DD)
}

export interface StreakInfo {
  currentStreak: number
  totalDays: number
  lastStudyDate: string | null
}

// Get today's date in YYYY-MM-DD format
export function getTodayDate(): string {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

// Format date for display (e.g., "14 March 2026")
export function formatDateForDisplay(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Check if a date string is today
export function isToday(dateString: string): boolean {
  return dateString === getTodayDate()
}

// Check if a date is yesterday relative to another date
export function isConsecutiveDay(currentDate: string, previousDate: string): boolean {
  const current = new Date(currentDate + 'T00:00:00')
  const previous = new Date(previousDate + 'T00:00:00')
  
  // Calculate difference in days
  const diffTime = current.getTime() - previous.getTime()
  const diffDays = diffTime / (1000 * 60 * 60 * 24)
  
  return diffDays === 1
}

// Calculate streak from study dates
export function calculateStreak(studyDates: string[]): StreakInfo {
  if (studyDates.length === 0) {
    return {
      currentStreak: 0,
      totalDays: 0,
      lastStudyDate: null
    }
  }

  // Sort dates in descending order (newest first)
  const sortedDates = [...studyDates].sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  )

  const today = getTodayDate()
  const lastStudyDate = sortedDates[0]
  
  // Check if the streak is still active
  // Streak is active if last study was today or yesterday
  const lastStudyDateObj = new Date(lastStudyDate + 'T00:00:00')
  const todayObj = new Date(today + 'T00:00:00')
  const daysSinceLastStudy = Math.floor(
    (todayObj.getTime() - lastStudyDateObj.getTime()) / (1000 * 60 * 60 * 24)
  )

  // If more than 1 day has passed since last study, streak is broken
  if (daysSinceLastStudy > 1) {
    return {
      currentStreak: 0,
      totalDays: studyDates.length,
      lastStudyDate
    }
  }

  // Count consecutive days starting from the most recent study date
  let streak = 1
  for (let i = 0; i < sortedDates.length - 1; i++) {
    if (isConsecutiveDay(sortedDates[i], sortedDates[i + 1])) {
      streak++
    } else {
      break
    }
  }

  return {
    currentStreak: streak,
    totalDays: studyDates.length,
    lastStudyDate
  }
}

// Check if user has already studied today
export function hasStudiedToday(studyDates: string[]): boolean {
  const today = getTodayDate()
  return studyDates.includes(today)
}

// Add today's study date (returns updated array)
export function addStudyDate(studyDates: string[]): string[] {
  const today = getTodayDate()
  
  // Prevent duplicate entries
  if (studyDates.includes(today)) {
    return studyDates
  }
  
  return [...studyDates, today]
}
