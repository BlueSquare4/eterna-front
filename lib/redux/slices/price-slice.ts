"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface PriceState {
  prices: Record<string, number>
  lastUpdated: Record<string, number>
}

const initialState: PriceState = {
  prices: {},
  lastUpdated: {},
}

export const priceSlice = createSlice({
  name: "prices",
  initialState,
  reducers: {
    updatePrice: (state, action: PayloadAction<{ tokenId: string; price: number }>) => {
      state.prices[action.payload.tokenId] = action.payload.price
      state.lastUpdated[action.payload.tokenId] = Date.now()
    },
    updatePrices: (state, action: PayloadAction<Record<string, number>>) => {
      const now = Date.now()
      Object.entries(action.payload).forEach(([tokenId, price]) => {
        state.prices[tokenId] = price
        state.lastUpdated[tokenId] = now
      })
    },
    resetPrices: (state) => {
      Object.assign(state, initialState)
    },
  },
})

export const { updatePrice, updatePrices, resetPrices } = priceSlice.actions
export default priceSlice.reducer
