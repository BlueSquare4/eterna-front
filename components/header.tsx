"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
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
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Token Discovery</h1>
            <p className="text-muted-foreground text-sm mt-1">Real-time token tracking and analytics</p>
          </div>
          <MarketPulse />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Tabs defaultValue="new-pairs" className="w-full sm:w-auto" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3 sm:w-auto">
              <TabsTrigger value="new-pairs">New Pairs</TabsTrigger>
              <TabsTrigger value="final-stretch">Final Stretch</TabsTrigger>
              <TabsTrigger value="migrated">Migrated</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tokens..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
