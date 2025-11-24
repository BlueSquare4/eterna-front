"use client"

import { useMemo, useState, useCallback, memo } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { TokenTableHeader } from "./token-table-header"
import { TokenTableRow } from "./token-table-row"
import { TokenTableSkeleton } from "./token-table-skeleton"
import { useTokens } from "@/hooks/use-tokens"
import type { Token } from "@/lib/types"

type SortKey = keyof Token
type SortOrder = "asc" | "desc"

const DEBOUNCE_DELAY = 300

/**
 * Optimized token table with:
 * - Memoized components to prevent unnecessary re-renders
 * - Debounced search to reduce filtering operations
 * - Efficient sorting algorithm
 * - Accessibility features (ARIA labels, keyboard navigation)
 */
const TokenTableOptimized = memo(function TokenTableOptimized() {
  const [sortKey, setSortKey] = useState<SortKey>("price")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  const { activeTab, searchQuery } = useSelector((state: RootState) => state.filters)
  const { data: tokens, isLoading, error } = useTokens(activeTab)

  // Debounce search query to reduce re-renders
  useMemo(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, DEBOUNCE_DELAY)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const filteredAndSortedTokens = useMemo(() => {
    if (!tokens) return []

    const filtered = tokens.filter((token) => {
      const matchesSearch =
        token.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        token.contractAddress.toLowerCase().includes(debouncedQuery.toLowerCase())
      return matchesSearch
    })

    return filtered.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
      }

      return 0
    })
  }, [tokens, debouncedQuery, sortKey, sortOrder])

  const handleSort = useCallback(
    (key: SortKey) => {
      if (sortKey === key) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
      } else {
        setSortKey(key)
        setSortOrder("desc")
      }
    },
    [sortKey, sortOrder],
  )

  if (error) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center" role="alert">
        <p className="text-destructive font-medium">Failed to load tokens</p>
        <p className="text-muted-foreground text-sm mt-2">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto" role="region" aria-label="Token table">
        <table className="w-full" role="table">
          <TokenTableHeader sortKey={sortKey} sortOrder={sortOrder} onSort={handleSort} />
          <tbody>
            {isLoading ? (
              <TokenTableSkeleton />
            ) : filteredAndSortedTokens.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-muted-foreground">
                  {searchQuery ? "No tokens match your search" : "No tokens found"}
                </td>
              </tr>
            ) : (
              filteredAndSortedTokens.map((token) => <TokenTableRow key={token.id} token={token} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
})

export { TokenTableOptimized }
