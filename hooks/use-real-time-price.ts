"use client"

import { useEffect, useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { updatePrice } from "@/lib/redux/slices/price-slice"
import { priceStream } from "@/lib/websocket/price-stream"

export function useRealTimePrice(tokenId: string, initialPrice: number) {
  const [displayPrice, setDisplayPrice] = useState(initialPrice)
  const dispatch = useDispatch()

  const updatePriceDisplay = useCallback(
    (newPrice: number) => {
      setDisplayPrice(newPrice)
      dispatch(updatePrice({ tokenId, price: newPrice }))
    },
    [tokenId, dispatch],
  )

  useEffect(() => {
    // Connect to price stream for this token
    priceStream.connect([tokenId])

    // Subscribe to updates
    const unsubscribe = priceStream.subscribe((update) => {
      if (update.tokenId === tokenId) {
        updatePriceDisplay(update.price)
      }
    })

    return () => {
      unsubscribe()
      priceStream.disconnect([tokenId])
    }
  }, [tokenId, updatePriceDisplay])

  return [displayPrice, updatePriceDisplay] as const
}
