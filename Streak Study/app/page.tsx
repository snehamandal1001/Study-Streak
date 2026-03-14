'use client'

import Link from 'next/link'
import { StreakCard } from '@/components/StreakCard'
import { StudyButton } from '@/components/StudyButton'
import { HistoryList } from '@/components/HistoryList'
import { useStudyData } from '@/hooks/useStudyData'
import { Button } from '@/components/ui/button'
import { History, BookOpen } from 'lucide-react'

export default function DashboardPage() {
  const { studyDates, streakInfo, isLoading, updateStudyDates } = useStudyData()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 animate-pulse mx-auto text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Loading your study data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <h1 className="text-xl font-bold">Daily Learning Streak</h1>
          </div>
          <nav>
            <Link href="/history">
              <Button variant="outline" size="sm">
                <History className="mr-2 h-4 w-4" />
                View History
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-balance">Welcome back!</h2>
          <p className="text-muted-foreground mt-1">
            Track your daily learning progress and build consistent study habits.
          </p>
        </div>

        {/* Stats Cards */}
        <StreakCard
          currentStreak={streakInfo.currentStreak}
          totalDays={streakInfo.totalDays}
          lastStudyDate={streakInfo.lastStudyDate}
        />

        {/* Study Button */}
        <StudyButton
          studyDates={studyDates}
          onStudyMarked={updateStudyDates}
        />

        {/* Recent History */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <Link href="/history">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <HistoryList studyDates={studyDates} limit={5} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          Keep learning, keep growing!
        </div>
      </footer>
    </div>
  )
}
