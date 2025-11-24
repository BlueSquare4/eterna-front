"use client"

import { Provider } from "react-redux"
import { QueryClientProvider } from "@tanstack/react-query"
import { store } from "@/lib/redux/store"
import { queryClient } from "@/lib/query-client"
import { TokenTableOptimized } from "@/components/table/token-table-optimized"
import { Header } from "@/components/header"
import { ErrorBoundary } from "@/components/error-boundary"
import { Toaster } from "@/components/ui/toaster"
import { BeginnerGuide } from "@/components/guide/beginner-guide"
import { CryptoNewsSidebar } from "@/components/crypto-news-sidebar"

export default function Home() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <div className="min-h-screen bg-background relative overflow-hidden">
            <Header />
            <main className="container mx-auto px-4 py-8 relative z-10">
              <TokenTableOptimized />
            </main>
            <Toaster />
            <BeginnerGuide />
            <CryptoNewsSidebar />
          </div>
        </ErrorBoundary>
      </QueryClientProvider>
    </Provider>
  )
}
