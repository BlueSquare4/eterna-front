/* Token and data types for type safety */

export interface Token {
  id: string
  name: string
  symbol: string
  imageUrl?: string
  contractAddress: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  liquidity: number
  holders: number
  riskScore: number
  lastUpdated: number
  category: "new-pairs" | "final-stretch" | "migrated"
  verified: boolean
}

export interface PriceUpdate {
  tokenId: string
  price: number
  change: number
  timestamp: number
}

export interface ApiError extends Error {
  code?: string
  status?: number
}
