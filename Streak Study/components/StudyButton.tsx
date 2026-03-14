'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Check, AlertCircle } from 'lucide-react'
import { hasStudiedToday } from '@/lib/streakLogic'

interface StudyButtonProps {
  studyDates: string[]
  onStudyMarked: (updatedDates: string[]) => void
}

export function StudyButton({ studyDates, onStudyMarked }: StudyButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null)

  const alreadyStudiedToday = hasStudiedToday(studyDates)

  const handleStudyClick = async () => {
    if (alreadyStudiedToday) {
      setMessage({ type: 'info', text: 'You have already marked today.' })
      return
    }

    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/study', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studyDates }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage({ type: 'success', text: data.message })
        onStudyMarked(data.studyDates)
      } else {
        setMessage({ type: 'info', text: data.message })
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to record study. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            className="w-full md:w-auto px-8 py-6 text-lg"
            onClick={handleStudyClick}
            disabled={isLoading || alreadyStudiedToday}
          >
            {alreadyStudiedToday ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                Already Studied Today
              </>
            ) : (
              <>
                <BookOpen className="mr-2 h-5 w-5" />
                {isLoading ? 'Recording...' : 'I Studied Today'}
              </>
            )}
          </Button>

          {message && (
            <div
              className={`flex items-center gap-2 text-sm px-4 py-2 rounded-md ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : message.type === 'info'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message.type === 'success' ? (
                <Check className="h-4 w-4" />
              ) : message.type === 'info' ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              {message.text}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
