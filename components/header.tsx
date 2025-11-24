"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Zap } from "lucide-react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setActiveTab, setSearchQuery } from "@/lib/redux/slices/filter-slice"
import { MarketPulse } from "@/components/market-pulse"

type TabType = "new-pairs" | "final-stretch" | "migrated"

export function Header() {
  const [searchValue, setSearchValue] = useState("")
  const dispatch = useDispatch()

  const handleTabChange = (value: string) => {
    dispatch(setActiveTab(value as TabType))
  }

  const handleSearch = (value: string) => {
    setSearchValue(value)
    dispatch(setSearchQuery(value))
  }

  return (
    <header className="border-b border-border/30 bg-gradient-to-b from-card/40 via-card/20 to-background/40 backdrop-blur-xl sticky top-0 z-40 shadow-lg shadow-primary/5">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Token Discovery</h1>
              <p className="text-muted-foreground text-xs mt-1 font-medium">
                Real-time analytics powered by live market data
              </p>
            </div>
          </div>
          <MarketPulse />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Tabs defaultValue="new-pairs" className="w-full sm:w-auto" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3 sm:w-auto bg-background/40 border border-border/40 backdrop-blur-md">
              <TabsTrigger value="new-pairs">New Pairs</TabsTrigger>
              <TabsTrigger value="final-stretch">Final Stretch</TabsTrigger>
              <TabsTrigger value="migrated">Migrated</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search tokens..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-background/40 border-border/40 focus:border-primary/50 focus:bg-background/60"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
