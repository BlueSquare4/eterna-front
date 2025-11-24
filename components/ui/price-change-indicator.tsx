"use client"

import { memo } from "react"

interface PriceChangeIndicatorProps {
  change: number
}

export const PriceChangeIndicator = memo(function PriceChangeIndicator({ change }: PriceChangeIndicatorProps) {
  const isPositive = change >= 0
  const displayValue = `${Math.abs(change).toFixed(2)}%`

  return (
    <div
      className={`
      flex items-center gap-1.5 text-sm font-mono font-medium tabular-nums
      ${isPositive ? "text-emerald-400" : "text-rose-400"}
    `}
    >
      <div
        className={`
        flex items-center justify-center w-4 h-4 rounded text-[10px] 
        ${isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}
      `}
      >
        {isPositive ? "▲" : "▼"}
      </div>
      <span>{displayValue}</span>
    </div>
  )
})
