/* API client for data fetching */
import type { Token } from "@/lib/types"
import { mockTokens } from "./mock-tokens"

class APIClient {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

  async getTokens(category: string): Promise<Token[]> {
    // Mock implementation - replace with real API calls
    return new Promise((resolve) => {
      setTimeout(() => {
        if (category === "new-pairs") {
          resolve(mockTokens.filter((t) => t.category === "new-pairs"))
        } else if (category === "final-stretch") {
          resolve(mockTokens.filter((t) => t.category === "final-stretch"))
        } else {
          resolve(mockTokens.filter((t) => t.category === "migrated"))
        }
      }, 500)
    })
  }

  async getTokenById(id: string): Promise<Token | null> {
    const token = mockTokens.find((t) => t.id === id)
    return token || null
  }

  async searchTokens(query: string): Promise<Token[]> {
    const lowercaseQuery = query.toLowerCase()
    return mockTokens.filter(
      (t) =>
        t.name.toLowerCase().includes(lowercaseQuery) ||
        t.symbol.toLowerCase().includes(lowercaseQuery) ||
        t.contractAddress.toLowerCase().includes(lowercaseQuery),
    )
  }
}

export const apiClient = new APIClient()
