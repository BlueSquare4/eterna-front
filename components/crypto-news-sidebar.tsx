"use client"

import type React from "react"

import { useState } from "react"
import { X, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface NewsItem {
  id: string
  title: string
  source: string
  timestamp: string
  sentiment: "positive" | "negative" | "neutral"
  impact: "high" | "medium" | "low"
}

interface MarketStat {
  label: string
  value: string
  change: number
  icon: React.ReactNode
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Bitcoin Breaks New All-Time High Above $45K",
    source: "CryptoNews Daily",
    timestamp: "2 hours ago",
    sentiment: "positive",
    impact: "high",
  },
  {
    id: "2",
    title: "SEC Approval for Spot Bitcoin ETF Sparks Rally",
    source: "Financial Times",
    timestamp: "4 hours ago",
    sentiment: "positive",
    impact: "high",
  },
  {
    id: "3",
    title: "Ethereum Layer 2 Solutions See Record Activity",
    source: "The Block",
    timestamp: "6 hours ago",
    sentiment: "positive",
    impact: "medium",
  },
  {
    id: "4",
    title: "Major Exchange Announces New Trading Pairs",
    source: "CoinDesk",
    timestamp: "8 hours ago",
    sentiment: "neutral",
    impact: "medium",
  },
  {
    id: "5",
    title: "Regulatory Concerns Over Stablecoin Issuance",
    source: "Bloomberg",
    timestamp: "12 hours ago",
    sentiment: "negative",
    impact: "medium",
  },
]

const marketStats: MarketStat[] = [
  {
    label: "Total Market Cap",
    value: "$2.15T",
    change: 5.23,
    icon: <TrendingUp className="w-4 h-4 text-success" />,
  },
  {
    label: "24h Volume",
    value: "$89.4B",
    change: -2.15,
    icon: <TrendingDown className="w-4 h-4 text-destructive" />,
  },
  {
    label: "Bitcoin Dominance",
    value: "48.5%",
    change: 1.2,
    icon: <TrendingUp className="w-4 h-4 text-warning" />,
  },
  {
    label: "Fear & Greed",
    value: "72 (Greed)",
    change: 8.5,
    icon: <TrendingUp className="w-4 h-4 text-success" />,
  },
]

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return "border-l-4 border-l-success bg-success/5"
    case "negative":
      return "border-l-4 border-l-destructive bg-destructive/5"
    default:
      return "border-l-4 border-l-muted-foreground bg-muted/5"
  }
}

const getImpactBadgeColor = (impact: string) => {
  switch (impact) {
    case "high":
      return "bg-destructive/20 text-destructive"
    case "medium":
      return "bg-warning/20 text-warning"
    default:
      return "bg-muted/20 text-muted-foreground"
  }
}

export function CryptoNewsSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"news" | "analytics">("news")

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-32 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Toggle news sidebar"
      >
        <AlertCircle className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 h-screen w-96 bg-gradient-to-b from-card/95 to-background/95 backdrop-blur-xl border-l border-border/40 shadow-2xl shadow-primary/10 overflow-hidden z-50 transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="border-b border-border/40 bg-gradient-to-r from-primary/10 to-transparent p-6 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-foreground">Crypto Updates</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-4 pt-4 border-b border-border/40">
          <button
            onClick={() => setActiveTab("news")}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
              activeTab === "news"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
          >
            News
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
              activeTab === "analytics"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
          >
            Analytics
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100vh-140px)]">
          {activeTab === "news" ? (
            <div className="space-y-3 p-4">
              {mockNews.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-lg p-4 transition-all hover:shadow-md cursor-pointer group",
                    getSentimentColor(item.sentiment),
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex-1">
                      {item.title}
                    </h3>
                    <span
                      className={cn("text-xs px-2 py-1 rounded whitespace-nowrap", getImpactBadgeColor(item.impact))}
                    >
                      {item.impact.charAt(0).toUpperCase() + item.impact.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{item.source}</p>
                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 p-4">
              {marketStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-muted/30 hover:bg-muted/50 transition-colors rounded-lg p-4 border border-border/40"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <div className="flex items-center gap-1">
                      {stat.icon}
                      <span
                        className={cn("text-xs font-medium", stat.change > 0 ? "text-success" : "text-destructive")}
                      >
                        {stat.change > 0 ? "+" : ""}
                        {stat.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                </div>
              ))}

              {/* Additional Info */}
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mt-6">
                <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
                  Market Summary
                </p>
                <ul className="space-y-2 text-xs text-foreground/80">
                  <li>• ETH Gas: 45 Gwei (Standard)</li>
                  <li>• Layer 1 TVL: $98.2B</li>
                  <li>• Staking APY: 3.2-5.8%</li>
                  <li>• Top Performer: SOL (+12.5%)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsOpen(false)} />}
    </>
  )
}
