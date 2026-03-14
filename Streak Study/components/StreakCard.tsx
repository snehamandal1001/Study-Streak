'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame, Calendar, Clock } from 'lucide-react'
import { formatDateForDisplay } from '@/lib/streakLogic'

interface StreakCardProps {
  currentStreak: number
  totalDays: number
  lastStudyDate: string | null
}

export function StreakCard({ currentStreak, totalDays, lastStudyDate }: StreakCardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Current Streak Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Current Streak
          </CardTitle>
          <Flame className="h-5 w-5 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {currentStreak} <span className="text-lg font-normal text-muted-foreground">days</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {currentStreak > 0 ? 'Keep it up!' : 'Start your streak today!'}
          </p>
        </CardContent>
      </Card>

      {/* Total Study Days Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Study Days
          </CardTitle>
          <Calendar className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {totalDays} <span className="text-lg font-normal text-muted-foreground">days</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            All time progress
          </p>
        </CardContent>
      </Card>

      {/* Last Studied Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Last Studied
          </CardTitle>
          <Clock className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">
            {lastStudyDate ? formatDateForDisplay(lastStudyDate) : 'Never'}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {lastStudyDate ? 'Great work!' : 'Start learning today'}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
