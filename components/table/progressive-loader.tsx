"use client"

import { memo } from "react"

interface ProgressiveLoaderProps {
  isLoading: boolean
  itemsCount?: number
  totalItems?: number
}

export const ProgressiveLoader = memo(function ProgressiveLoader({
  isLoading,
  itemsCount = 0,
  totalItems = 100,
}: ProgressiveLoaderProps) {
  const percentage = Math.round((itemsCount / totalItems) * 100)

  if (!isLoading) return null

  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted-foreground">Loading tokens...</p>
        <p className="text-xs text-muted-foreground font-mono">{percentage}%</p>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
})
