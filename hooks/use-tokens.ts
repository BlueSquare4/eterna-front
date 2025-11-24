"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import type { Token, ApiError } from "@/lib/types"

type TabType = "new-pairs" | "final-stretch" | "migrated"

export function useTokens(category: TabType) {
  return useQuery<Token[], ApiError>({
    queryKey: ["tokens", category],
    queryFn: async () => {
      const data = await apiClient.getTokens(category)
      if (!data || data.length === 0) {
        throw new Error(`Failed to load ${category} tokens`)
      }
      return data
    },
    enabled: !!category,
  })
}
