'use client'

import { useState, useEffect, useCallback } from 'react'
import { calculateStreak, StreakInfo } from '@/lib/streakLogic'

const STORAGE_KEY = 'dailyLearningStreak_studyDates'

export function useStudyData() {
  const [studyDates, setStudyDates] = useState<string[]>([])
  const [streakInfo, setStreakInfo] = useState<StreakInfo>({
    currentStreak: 0,
    totalDays: 0,
    lastStudyDate: null
  })
  const [isLoading, setIsLoading] = useState(true)

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const dates = JSON.parse(stored)
        setStudyDates(dates)
        setStreakInfo(calculateStreak(dates))
      }
    } catch (error) {
      console.error('Failed to load study data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save to localStorage whenever studyDates changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(studyDates))
      } catch (error) {
        console.error('Failed to save study data:', error)
      }
    }
  }, [studyDates, isLoading])

  // Update study dates and recalculate streak
  const updateStudyDates = useCallback((newDates: string[]) => {
    setStudyDates(newDates)
    setStreakInfo(calculateStreak(newDates))
  }, [])

  return {
    studyDates,
    streakInfo,
    isLoading,
    updateStudyDates
  }
}
