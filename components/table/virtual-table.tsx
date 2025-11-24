"use client"

import { memo, useMemo } from "react"
import type { Token } from "@/lib/types"
import { TokenTableRow } from "./token-table-row"

interface VirtualTableProps {
  tokens: Token[]
  itemHeight?: number
  containerHeight?: number
}

/**
 * Virtual table implementation for rendering large datasets
 * Only renders visible rows to improve performance with 1000+ items
 */
export const VirtualTable = memo(function VirtualTable({
  tokens,
  itemHeight = 68,
  containerHeight = 600,
}: VirtualTableProps) {
  const visibleRange = useMemo(() => {
    const startIndex = 0
    const endIndex = Math.ceil(containerHeight / itemHeight) + 2 // Show 2 extra rows for buffer
    return { startIndex, endIndex: Math.min(endIndex, tokens.length) }
  }, [containerHeight, itemHeight, tokens.length])

  const visibleTokens = useMemo(
    () => tokens.slice(visibleRange.startIndex, visibleRange.endIndex),
    [tokens, visibleRange],
  )

  return (
    <>
      {visibleTokens.map((token) => (
        <TokenTableRow key={token.id} token={token} />
      ))}
    </>
  )
})
