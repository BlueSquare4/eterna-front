"use client"

import { memo } from "react"

const SkeletonRow = memo(function SkeletonRow() {
  return (
    <tr className="border-b border-border/50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted/50 animate-shimmer" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-muted/50 rounded animate-shimmer" />
            <div className="h-3 w-16 bg-muted/50 rounded animate-shimmer" />
          </div>
        </div>
      </td>
      {[...Array(8)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 w-20 bg-muted/50 rounded animate-shimmer" />
        </td>
      ))}
    </tr>
  )
})

export const TokenTableSkeleton = memo(function TokenTableSkeleton() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </>
  )
})
