"use client"

import type React from "react"

import { memo } from "react"
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface RiskBadgeProps {
  score: number
}

export const RiskBadge = memo(function RiskBadge({ score }: RiskBadgeProps) {
  let variant: "low" | "medium" | "high"
  let icon: React.ReactNode
  let label: string

  if (score <= 3) {
    variant = "low"
    icon = <CheckCircle2 className="w-3.5 h-3.5" />
    label = "Low Risk"
  } else if (score <= 6) {
    variant = "medium"
    icon = <AlertTriangle className="w-3.5 h-3.5" />
    label = "Medium"
  } else {
    variant = "high"
    icon = <AlertCircle className="w-3.5 h-3.5" />
    label = "High Risk"
  }

  const variantClasses = {
    low: "text-emerald-400 bg-emerald-500/12 border-emerald-500/25 shadow-emerald-500/20",
    medium: "text-amber-400 bg-amber-500/12 border-amber-500/25 shadow-amber-500/20",
    high: "text-rose-400 bg-rose-500/12 border-rose-500/25 shadow-rose-500/20",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border backdrop-blur-sm transition-all duration-300",
        variantClasses[variant],
      )}
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
