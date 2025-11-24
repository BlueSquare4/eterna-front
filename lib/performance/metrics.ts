/**
 * Web Vitals and performance monitoring
 * Tracks Core Web Vitals: LCP, FID, CLS
 */

export interface PerformanceMetrics {
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  ttfb?: number // Time to First Byte
}

export function reportWebVitals(metrics: PerformanceMetrics) {
  if (typeof window === "undefined") return

  // Send to analytics service
  const vitals = {
    timestamp: new Date().toISOString(),
    ...metrics,
  }

  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log("Web Vitals:", vitals)
  }

  // Send to external service in production
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_ANALYTICS_URL) {
    navigator.sendBeacon(process.env.NEXT_PUBLIC_ANALYTICS_URL, JSON.stringify(vitals))
  }
}

export function measureComponentRenderTime(componentName: string): () => void {
  const startTime = performance.now()

  return () => {
    const endTime = performance.now()
    const renderTime = endTime - startTime

    if (renderTime > 50) {
      console.warn(`Component ${componentName} took ${renderTime.toFixed(2)}ms to render`)
    }
  }
}
