/* WebSocket mock for real-time price updates */
import type { PriceUpdate } from "@/lib/types"

type PriceStreamListener = (update: PriceUpdate) => void

class PriceStreamManager {
  private listeners: Set<PriceStreamListener> = new Set()
  private intervals: Map<string, NodeJS.Timer> = new Map()
  private isConnected = false
  private tokenPrices: Map<string, number> = new Map()

  connect(tokenIds: string[]): void {
    if (this.isConnected && tokenIds.length === 0) return

    this.isConnected = true
    tokenIds.forEach((tokenId) => {
      if (this.intervals.has(tokenId)) return

      // Initialize price
      const basePrice = Math.random() * 1000 + 100
      this.tokenPrices.set(tokenId, basePrice)

      // Simulate price updates every 1-3 seconds
      const interval = setInterval(
        () => {
          const currentPrice = this.tokenPrices.get(tokenId) || basePrice
          const change = (Math.random() - 0.5) * 20
          const newPrice = Math.max(currentPrice + change, 0.01)
          this.tokenPrices.set(tokenId, newPrice)

          const update: PriceUpdate = {
            tokenId,
            price: newPrice,
            change: ((newPrice - currentPrice) / currentPrice) * 100,
            timestamp: Date.now(),
          }

          this.notifyListeners(update)
        },
        1000 + Math.random() * 2000,
      )

      this.intervals.set(tokenId, interval)
    })
  }

  disconnect(tokenIds?: string[]): void {
    if (!tokenIds) {
      // Disconnect all
      this.intervals.forEach((interval) => clearInterval(interval))
      this.intervals.clear()
      this.isConnected = false
      return
    }

    tokenIds.forEach((tokenId) => {
      const interval = this.intervals.get(tokenId)
      if (interval) {
        clearInterval(interval)
        this.intervals.delete(tokenId)
      }
    })
  }

  subscribe(listener: PriceStreamListener): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notifyListeners(update: PriceUpdate): void {
    this.listeners.forEach((listener) => {
      try {
        listener(update)
      } catch (error) {
        console.error("Error in price stream listener:", error)
      }
    })
  }
}

export const priceStream = new PriceStreamManager()
