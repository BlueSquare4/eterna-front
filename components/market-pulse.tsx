"use client"

import { Activity, Fuel, Globe, TrendingUp } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function MarketPulse() {
  const [gas, setGas] = useState(15)
  const [ethPrice, setEthPrice] = useState(2450)

  // Simulate live market data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGas((prev) => Math.max(10, prev + (Math.random() > 0.5 ? 1 : -1)))
      setEthPrice((prev) => prev + (Math.random() - 0.5) * 5)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5 bg-transparent"
        >
          <Activity className="w-4 h-4 text-primary animate-pulse" />
          <span className="hidden sm:inline text-xs font-medium">Market Pulse</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 bg-card/95 backdrop-blur-xl border-primary/20">
        <div className="p-4 border-b border-border/50">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            Global Market Stats
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Fuel className="w-3 h-3" /> Gas (Gwei)
            </span>
            <div className="text-xl font-mono font-bold text-foreground tabular-nums">{gas}</div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> ETH Price
            </span>
            <div className="text-xl font-mono font-bold text-green-500 tabular-nums">${ethPrice.toFixed(2)}</div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Global Cap</span>
            <div className="text-lg font-mono font-medium text-foreground">$2.45T</div>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">24h Volume</span>
            <div className="text-lg font-mono font-medium text-foreground">$84.2B</div>
          </div>
        </div>
        <div className="p-3 bg-muted/20 text-[10px] text-center text-muted-foreground border-t border-border/50">
          Real-time network status
        </div>
      </PopoverContent>
    </Popover>
  )
}
