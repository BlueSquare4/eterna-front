"use client"

import { memo } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface PriceChangeIndicatorProps {
  change: number
}

export const PriceChangeIndicator = memo(function PriceChangeIndicator({ change }: PriceChangeIndicatorProps) {
  const isPositive = change >= 0
  const displayValue = `${Math.abs(change).toFixed(2)}%`

  return (
    <div
      className={`
      flex items-center gap-1.5 text-sm font-mono font-bold tabular-nums px-2.5 py-1 rounded-lg
      ${
        isPositive
          ? "text-emerald-400 bg-emerald-500/12 border border-emerald-500/25"
          : "text-rose-400 bg-rose-500/12 border border-rose-500/25"
      }
    `}
    >
      {isPositive ? (
        <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
      ) : (
        <TrendingDown className="w-3.5 h-3.5 flex-shrink-0" />
      )}
      <span>{displayValue}</span>
    </div>
  )
})
