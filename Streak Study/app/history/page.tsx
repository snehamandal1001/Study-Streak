'use client'

import Link from 'next/link'
import { HistoryList } from '@/components/HistoryList'
import { useStudyData } from '@/hooks/useStudyData'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, CalendarDays } from 'lucide-react'

export default function HistoryPage() {
  const { studyDates, isLoading } = useStudyData()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <CalendarDays className="h-12 w-12 animate-pulse mx-auto text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Loading study history...</p>
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
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-balance">Study History</h2>
          <p className="text-muted-foreground mt-1">
            Your complete record of study sessions. Newest entries appear first.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Total Study Days: <span className="font-semibold text-foreground">{studyDates.length}</span>
          </p>
        </div>

        {/* Full History List */}
        <HistoryList studyDates={studyDates} />
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
