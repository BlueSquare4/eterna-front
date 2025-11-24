"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UIState {
  selectedTokenId: string | null
  isModalOpen: boolean
  isPopoverOpen: Record<string, boolean>
  toasts: Array<{
    id: string
    message: string
    type: "success" | "error" | "info"
  }>
}

const initialState: UIState = {
  selectedTokenId: null,
  isModalOpen: false,
  isPopoverOpen: {},
  toasts: [],
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedToken: (state, action: PayloadAction<string | null>) => {
      state.selectedTokenId = action.payload
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload
    },
    togglePopover: (state, action: PayloadAction<string>) => {
      const key = action.payload
      state.isPopoverOpen[key] = !state.isPopoverOpen[key]
    },
    closePopover: (state, action: PayloadAction<string>) => {
      state.isPopoverOpen[action.payload] = false
    },
    addToast: (state, action: PayloadAction<{ message: string; type: "success" | "error" | "info" }>) => {
      state.toasts.push({
        id: Math.random().toString(36).slice(2),
        ...action.payload,
      })
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload)
    },
  },
})

export const { setSelectedToken, setModalOpen, togglePopover, closePopover, addToast, removeToast } = uiSlice.actions
export default uiSlice.reducer
