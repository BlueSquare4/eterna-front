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
  if (!active) return <div className="w-4 h-4" />
  return order === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
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
    { label: "Risk Score", key: "riskScore" as const, sortable: true },
    { label: "Actions", key: "id" as const, sortable: false },
  ]

  return (
    <thead>
      <tr className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        {headers.map((header) => (
          <th
            key={header.key}
            className="px-6 py-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-widest select-none"
          >
            {header.sortable ? (
              <button
                onClick={() => onSort(header.key as SortKey)}
                className="flex items-center gap-1.5 hover:text-foreground transition-colors group"
              >
                {header.label}
                <div
                  className={`transition-opacity duration-200 ${sortKey === header.key ? "opacity-100 text-primary" : "opacity-0 group-hover:opacity-50"}`}
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
