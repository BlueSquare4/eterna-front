"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type TabType = "new-pairs" | "final-stretch" | "migrated"

interface FilterState {
  activeTab: TabType
  searchQuery: string
  sortBy: string
  sortOrder: "asc" | "desc"
}

const initialState: FilterState = {
  activeTab: "new-pairs",
  searchQuery: "",
  sortBy: "price",
  sortOrder: "desc",
}

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<TabType>) => {
      state.activeTab = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sortOrder = action.payload
    },
    resetFilters: (state) => {
      Object.assign(state, initialState)
    },
  },
})

export const { setActiveTab, setSearchQuery, setSortBy, setSortOrder, resetFilters } = filterSlice.actions
export default filterSlice.reducer
