"use client"

import { memo, useState } from "react"
import Image from "next/image"
import type { Token } from "@/lib/types"
import { formatPrice, formatNumber, formatVolume } from "@/lib/format"
import { PriceChangeIndicator } from "@/components/ui/price-change-indicator"
import { RiskBadge } from "@/components/ui/risk-badge"
import { TokenMenu } from "@/components/ui/token-menu"
import { useRealTimePrice } from "@/hooks/use-real-time-price"
import { cn } from "@/lib/utils"

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

  return (
    <tr className="group relative border-b border-border/40 transition-all duration-200 hover:bg-white/[0.02]">
      <td className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary scale-y-0 transition-transform duration-200 group-hover:scale-y-100" />

      {/* Token Name & Symbol */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_-3px_var(--color-primary)] overflow-hidden">
            {!imageError && token.imageUrl ? (
              <Image
                src={token.imageUrl || "/placeholder.svg"}
                alt={token.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-primary font-bold">{token.symbol[0]}</span>
            )}
          </div>
          <div className="min-w-0 flex flex-col">
            <span className="font-semibold text-sm text-foreground tracking-tight group-hover:text-primary transition-colors">
              {token.name}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">{token.symbol}</span>
          </div>
        </div>
      </td>

      {/* Price with animation */}
      <td
        className={cn(
          "px-6 py-4 whitespace-nowrap font-mono text-sm tabular-nums transition-colors duration-300",
          priceChangeAnimation === "up" && "text-success bg-success/5",
          priceChangeAnimation === "down" && "text-destructive bg-destructive/5",
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

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <TokenMenu token={token} />
      </td>
    </tr>
  )
})
