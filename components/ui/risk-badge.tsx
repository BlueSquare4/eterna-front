"use client"

import type React from "react"

import { memo } from "react"
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react"

interface RiskBadgeProps {
  score: number
}

export const RiskBadge = memo(function RiskBadge({ score }: RiskBadgeProps) {
  let variant: "low" | "medium" | "high"
  let icon: React.ReactNode
  let label: string

  if (score <= 3) {
    variant = "low"
    icon = <CheckCircle className="w-4 h-4" />
    label = "Low"
  } else if (score <= 6) {
    variant = "medium"
    icon = <AlertTriangle className="w-4 h-4" />
    label = "Medium"
  } else {
    variant = "high"
    icon = <AlertCircle className="w-4 h-4" />
    label = "High"
  }

  const variantClasses = {
    low: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_8px_-2px_rgba(52,211,153,0.3)]",
    medium: "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_8px_-2px_rgba(251,191,36,0.3)]",
    high: "text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-[0_0_8px_-2px_rgba(251,113,133,0.3)]",
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border backdrop-blur-sm transition-all duration-300 ${variantClasses[variant]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          variant === "low" ? "bg-emerald-400" : variant === "medium" ? "bg-amber-400" : "bg-rose-400"
        } animate-pulse`}
      />
      <span className="leading-tight">{label}</span>
    </div>
  )
})
