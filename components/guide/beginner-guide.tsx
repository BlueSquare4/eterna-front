"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Info, ChevronRight, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface Tip {
  id: number
  title: string
  description: string
  icon: React.ElementType
}

const TIPS: Tip[] = [
  {
    id: 1,
    title: "Live Market Pulse",
    description:
      "This dashboard updates in real-time. Watch for flashing colors—green means buying pressure, red means selling.",
    icon: Info,
  },
  {
    id: 2,
    title: "Understanding Risk",
    description:
      "The 'Risk' badge is your safety guide. 'Low' risk tokens are generally more stable bets for beginners.",
    icon: Lightbulb,
  },
  {
    id: 3,
    title: "Deep Dive",
    description: "Click on any token row to open a detailed view with charts, full history, and contract information.",
    icon: ChevronRight,
  },
]

export function BeginnerGuide() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Initial delay before showing the first tip
  useEffect(() => {
    const timer = setTimeout(() => {
      const seen = localStorage.getItem("axiom-guide-seen")
      if (!seen) {
        setIsVisible(true)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Auto-advance logic
  useEffect(() => {
    if (!isVisible || hasInteracted || isPaused) return

    const timer = setTimeout(() => {
      handleNext()
    }, 8000) // 8 seconds per tip

    return () => clearTimeout(timer)
  }, [isVisible, currentTipIndex, hasInteracted, isPaused])

  const handleNext = () => {
    if (currentTipIndex < TIPS.length - 1) {
      setCurrentTipIndex((prev) => prev + 1)
    } else {
      handleDismiss()
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("axiom-guide-seen", "true")
  }

  if (!isVisible) return null

  const CurrentIcon = TIPS[currentTipIndex].icon

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 w-full max-w-sm",
        "animate-in slide-in-from-bottom-5 fade-in duration-500",
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0F0F23]/95 backdrop-blur-md shadow-2xl shadow-black/50">
        {/* Authentic Glow Effect */}
        <div className="absolute -top-10 -right-10 h-32 w-32 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none" />

        {/* Progress Bar (Simulated) */}
        {!hasInteracted && !isPaused && (
          <div className="absolute top-0 left-0 h-[2px] w-full bg-white/5">
            <div
              key={currentTipIndex} // Reset animation on index change
              className="h-full bg-blue-500 animate-[progress_8s_linear_forwards]"
            />
          </div>
        )}

        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <CurrentIcon className="h-5 w-5" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white tracking-wide text-sm uppercase">
                  Tip {currentTipIndex + 1}/{TIPS.length}
                </h3>
                <button
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close guide"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <h4 className="font-semibold text-lg text-white">{TIPS[currentTipIndex].title}</h4>

              <p className="text-sm text-gray-400 leading-relaxed">{TIPS[currentTipIndex].description}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button onClick={handleDismiss} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Don't show again
            </button>

            <div className="flex gap-2">
              {currentTipIndex > 0 && (
                <button
                  onClick={() => {
                    setHasInteracted(true)
                    setCurrentTipIndex((prev) => prev - 1)
                  }}
                  className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs text-white border border-white/5 transition-colors"
                >
                  Previous
                </button>
              )}
              <button
                onClick={() => {
                  setHasInteracted(true)
                  handleNext()
                }}
                className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-xs text-white font-medium shadow-lg shadow-blue-500/20 transition-all"
              >
                {currentTipIndex === TIPS.length - 1 ? "Got it" : "Next Tip"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
