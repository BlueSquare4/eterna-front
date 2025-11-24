"use client"

import { memo } from "react"
import type { Token } from "@/lib/types"
import { ChevronUp, ChevronDown } from "lucide-react"

type SortKey = keyof Token
type SortOrder = "asc" | "desc"

interface TokenTableHeaderProps {
  sortKey: SortKey
  sortOrder: SortOrder
  onSort: (key: SortKey) => void
}

const SortIcon = memo(function SortIcon({ active, order }: { active: boolean; order: SortOrder }) {
  if (!active) return <div className="w-3.5 h-3.5" />
  return order === "asc" ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />
})

export const TokenTableHeader = memo(function TokenTableHeader({ sortKey, sortOrder, onSort }: TokenTableHeaderProps) {
  const headers = [
    { label: "Token", key: "name" as const, sortable: true },
    { label: "Price", key: "price" as const, sortable: true },
    { label: "24h Change", key: "change24h" as const, sortable: true },
    { label: "Volume", key: "volume24h" as const, sortable: true },
    { label: "Market Cap", key: "marketCap" as const, sortable: true },
    { label: "Liquidity", key: "liquidity" as const, sortable: true },
    { label: "Holders", key: "holders" as const, sortable: true },
    { label: "Risk", key: "riskScore" as const, sortable: true },
    { label: "Volatility", key: "volatility" as const, sortable: true },
  ]

  return (
    <thead>
      <tr className="border-b border-border/50 bg-gradient-to-r from-background/90 via-background/80 to-background/90 backdrop-blur-xl sticky top-0 z-20 shadow-lg shadow-primary/5">
        {headers.map((header) => (
          <th
            key={header.key}
            className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest select-none"
          >
            {header.sortable ? (
              <button
                onClick={() => onSort(header.key as SortKey)}
                className="flex items-center gap-1.5 hover:text-foreground transition-all duration-200 group hover:translate-y-[-2px]"
                aria-label={`Sort by ${header.label}`}
              >
                {header.label}
                <div
                  className={`transition-all duration-200 ${sortKey === header.key ? "opacity-100 text-primary scale-110" : "opacity-30 group-hover:opacity-60"}`}
                >
                  <SortIcon active={true} order={sortKey === header.key ? sortOrder : "asc"} />
                </div>
              </button>
            ) : (
              <span>{header.label}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  )
})
