'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays, CheckCircle } from 'lucide-react'
import { formatDateForDisplay } from '@/lib/streakLogic'

interface HistoryListProps {
  studyDates: string[]
  limit?: number
}

export function HistoryList({ studyDates, limit }: HistoryListProps) {
  // Sort dates in descending order (newest first)
  const sortedDates = [...studyDates].sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  )

  // Apply limit if specified
  const displayDates = limit ? sortedDates.slice(0, limit) : sortedDates

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Study History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {displayDates.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No study sessions recorded yet. Start your learning journey today!
          </p>
        ) : (
          <ul className="space-y-2">
            {displayDates.map((date) => (
              <li
                key={date}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="font-medium">{formatDateForDisplay(date)}</span>
              </li>
            ))}
          </ul>
        )}
        {limit && studyDates.length > limit && (
          <p className="text-sm text-muted-foreground text-center mt-4">
            Showing {limit} of {studyDates.length} entries
          </p>
        )}
      </CardContent>
    </Card>
  )
}
