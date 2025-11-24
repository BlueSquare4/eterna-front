"use client"

import { configureStore } from "@reduxjs/toolkit"
import filterReducer from "./slices/filter-slice"
import priceReducer from "./slices/price-slice"
import uiReducer from "./slices/ui-slice"

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    prices: priceReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
