"use client"

/**
 * Focus management utilities for accessibility
 * Helps maintain focus state during dynamic content updates
 */

export class FocusManager {
  private static instance: FocusManager
  private previousActiveElement: HTMLElement | null = null

  static getInstance(): FocusManager {
    if (!FocusManager.instance) {
      FocusManager.instance = new FocusManager()
    }
    return FocusManager.instance
  }

  saveFocus(): void {
    if (typeof document !== "undefined") {
      this.previousActiveElement = document.activeElement as HTMLElement
    }
  }

  restoreFocus(): void {
    if (this.previousActiveElement && typeof this.previousActiveElement.focus === "function") {
      this.previousActiveElement.focus()
    }
  }

  trapFocus(element: HTMLElement): () => void {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    element.addEventListener("keydown", handleKeyDown)

    return () => {
      element.removeEventListener("keydown", handleKeyDown)
    }
  }
}

export const focusManager = FocusManager.getInstance()
