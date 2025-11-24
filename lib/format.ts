/* Number and price formatting utilities */

export function formatPrice(price: number): string {
  if (price === 0) return "$0.00"
  if (price < 0.01) {
    return `$${price.toExponential(2)}`
  }
  if (price < 1) {
    return `$${price.toFixed(4)}`
  }
  return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatVolume(volume: number): string {
  if (volume === 0) return "$0"
  if (volume >= 1000000000) {
    return `$${(volume / 1000000000).toFixed(2)}B`
  }
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(2)}M`
  }
  if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(2)}K`
  }
  return `$${volume.toLocaleString()}`
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(2)}K`
  }
  return `${num.toLocaleString()}`
}

export function formatPercentage(percentage: number): string {
  const sign = percentage >= 0 ? "+" : ""
  return `${sign}${percentage.toFixed(2)}%`
}
