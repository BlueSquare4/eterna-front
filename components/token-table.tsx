"use client"

import { useMemo, useState, useCallback, memo } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { TokenTableHeader } from "./table/token-table-header"
import { TokenTableRow } from "./table/token-table-row"
import { TokenTableSkeleton } from "./table/token-table-skeleton"
import { useTokens } from "@/hooks/use-tokens"
import type { Token } from "@/lib/types"

type SortKey = keyof Token
type SortOrder = "asc" | "desc"

const TokenTable = memo(function TokenTable() {
  const [sortKey, setSortKey] = useState<SortKey>("price")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")

  const { activeTab, searchQuery } = useSelector((state: RootState) => state.filters)
  const { data: tokens, isLoading, error } = useTokens(activeTab)

  const filteredAndSortedTokens = useMemo(() => {
    if (!tokens) return []

    const filtered = tokens.filter((token) => {
      const matchesSearch =
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.contractAddress.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [tokens, searchQuery, sortKey, sortOrder])

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
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-destructive font-medium">Failed to load tokens</p>
        <p className="text-muted-foreground text-sm mt-2">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <TokenTableHeader sortKey={sortKey} sortOrder={sortOrder} onSort={handleSort} />
          <tbody>
            {isLoading ? (
              <TokenTableSkeleton />
            ) : filteredAndSortedTokens.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-muted-foreground">
                  No tokens found
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

export { TokenTable }
