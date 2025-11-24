"use client"

import { memo, useState } from "react"
import Image from "next/image"
import type { Token } from "@/lib/types"
import { formatPrice, formatNumber, formatVolume } from "@/lib/format"
import { PriceChangeIndicator } from "@/components/ui/price-change-indicator"
import { RiskBadge } from "@/components/ui/risk-badge"
import { useRealTimePrice } from "@/hooks/use-real-time-price"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface TokenTableRowProps {
  token: Token
}

export const TokenTableRow = memo(function TokenTableRow({ token }: TokenTableRowProps) {
  const [displayPrice, updatePrice] = useRealTimePrice(token.id, token.price)
  const [priceChangeAnimation, setPriceChangeAnimation] = useState<"up" | "down" | null>(null)
  const [imageError, setImageError] = useState(false)

  const handlePriceUpdate = (newPrice: number) => {
    if (newPrice > displayPrice) {
      setPriceChangeAnimation("up")
    } else if (newPrice < displayPrice) {
      setPriceChangeAnimation("down")
    }
    updatePrice(newPrice)
    setTimeout(() => setPriceChangeAnimation(null), 600)
  }

  const getVolatilityColor = (vol: number) => {
    if (vol < 4) return "text-success"
    if (vol < 8) return "text-foreground"
    return "text-warning"
  }

  return (
    <tr className="group relative border-b border-border/30 transition-all duration-300 hover:bg-white/5">
      <td className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-transparent scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />

      {/* Token Name & Symbol */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary/25 to-primary/5 ring-1 ring-primary/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 overflow-hidden transition-all group-hover:ring-primary/50">
            {!imageError && token.imageUrl ? (
              <Image
                src={token.imageUrl || "/placeholder.svg"}
                alt={token.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-primary font-bold text-sm">{token.symbol[0]}</span>
            )}
          </div>
          <div className="min-w-0 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-foreground tracking-tight group-hover:text-primary transition-colors">
                {token.name}
              </span>
              {token.verified && (
                <Badge variant="outline" className="h-4 px-1.5 text-[10px] bg-success/5 border-success/30 text-success">
                  Verified
                </Badge>
              )}
            </div>
            <span className="text-xs font-mono text-muted-foreground">{token.symbol}</span>
          </div>
        </div>
      </td>

      {/* Price with animation */}
      <td
        className={cn(
          "px-6 py-4 whitespace-nowrap font-mono text-sm tabular-nums font-medium transition-all duration-300",
          priceChangeAnimation === "up" &&
            "text-success bg-success/8 rounded-lg shadow-[0_0_12px_-3px_rgba(52,211,153,0.3)]",
          priceChangeAnimation === "down" &&
            "text-destructive bg-destructive/8 rounded-lg shadow-[0_0_12px_-3px_rgba(251,113,133,0.3)]",
          !priceChangeAnimation && "text-foreground/90",
        )}
      >
        {formatPrice(displayPrice)}
      </td>

      {/* 24h Change with indicator */}
      <td className="px-6 py-4 whitespace-nowrap">
        <PriceChangeIndicator change={token.change24h} />
      </td>

      {/* 24h Volume */}
      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm tabular-nums text-muted-foreground group-hover:text-foreground transition-colors">
        {formatVolume(token.volume24h)}
      </td>

      {/* Market Cap */}
      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm tabular-nums text-muted-foreground group-hover:text-foreground transition-colors">
        {formatVolume(token.marketCap)}
      </td>

      {/* Liquidity */}
      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm tabular-nums text-muted-foreground group-hover:text-foreground transition-colors">
        {formatVolume(token.liquidity)}
      </td>

      {/* Holders count */}
      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm tabular-nums text-muted-foreground group-hover:text-foreground transition-colors">
        {formatNumber(token.holders)}
      </td>

      {/* Risk Score */}
      <td className="px-6 py-4 whitespace-nowrap">
        <RiskBadge score={token.riskScore} />
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center justify-center">
          <div className={cn("font-mono text-sm font-medium tabular-nums", getVolatilityColor(token.volatility))}>
            {token.volatility.toFixed(1)}%
          </div>
        </div>
      </td>
    </tr>
  )
})
