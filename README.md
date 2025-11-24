# **Axiom Trade — Token Discovery Table**

A production-grade, pixel-perfect replica of **Axiom Trade’s Token Discovery Interface**, featuring real-time pricing, advanced filtering, and professional trading UI/UX patterns optimized for performance.

---

## **🚀 Features**

### **Core Components**

* **Three Token Categories**

  * New Pairs
  * Final Stretch
  * Migrated Tokens
* **Real-Time Price Updates** (WebSocket mock with smooth animations)
* **Column Sorting** (ascending/descending)
* **Global Search Filter** (name, symbol, contract address)
* **Fully Responsive Layout**

### **UI/UX Enhancements**

* **Popovers** for token insights
* **Tooltips** for metric explanations
* **Modals** for deep analytics
* **Dropdown Menus** (copy address, explore, set alerts)
* **Skeleton Loaders** with shimmer effect
* **Error Boundaries** for fallback UI

---

## **⚡ Performance Optimizations**

* React Compiler enabled
* Highly memoized row and header components
* 300ms debounced search
* Architecture ready for virtual scrolling (1000+ tokens)
* Code splitting & lazy-loaded heavy components
* Optimized formatting and stable sorting

---

## **♿ Accessibility**

* Fully semantic HTML + ARIA
* Keyboard navigation across tabs, rows, menus
* Focus trapping & restoration in dialogs
* Screen reader-friendly labels
* High contrast ratios (WCAG AA compliant)

---

## **🧱 Tech Stack**

### **Frontend**

* **Next.js 16**
* **React 19.2**
* **TypeScript (strict mode)**
* **Tailwind CSS v4**
* **Redux Toolkit**
* **React Query**

### **UI Libraries**

* **Radix UI** (Popover, Tooltip, Dropdown)
* **shadcn/ui patterns** (Dialog, DropdownMenu)
* **Lucide Icons**

---

## **📁 Directory Structure**

```
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── header.tsx
│   ├── token-table.tsx
│   ├── error-boundary.tsx
│   ├── table/
│   │   ├── token-table-header.tsx
│   │   ├── token-table-row.tsx
│   │   ├── token-table-skeleton.tsx
│   │   ├── token-table-optimized.tsx
│   │   └── progressive-loader.tsx
│   └── ui/
│       ├── price-change-indicator.tsx
│       ├── risk-badge.tsx
│       ├── token-menu.tsx
│       ├── tooltip.tsx
│       ├── popover.tsx
│       ├── modal.tsx
│       └── ...
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   └── mock-tokens.ts
│   ├── redux/
│   │   ├── store.ts
│   │   └── slices/
│   ├── websocket/
│   │   └── price-stream.ts
│   ├── a11y/
│   │   └── focus-manager.ts
│   ├── performance/metrics.ts
│   ├── types.ts
│   ├── format.ts
│   └── query-client.ts
├── hooks/
│   ├── use-tokens.ts
│   ├── use-real-time-price.ts
│   ├── use-debounce.ts
│   └── use-toast.ts
└── scripts/
```

---

## **📊 Component Hierarchy**

```
App (Providers)
├── Header
│   ├── Tabs
│   └── Search Input
└── TokenTable
    ├── Sortable TableHeader
    └── TableBody
        └── Memoized TokenTableRow[]
            ├── PriceChangeIndicator
            ├── RiskBadge
            └── TokenMenu
```

---

## **📈 Performance Targets**

| Metric         | Target |
| -------------- | ------ |
| Performance    | ≥ 90   |
| Accessibility  | ≥ 95   |
| Best Practices | ≥ 90   |
| SEO            | ≥ 90   |

### **Techniques Used**

* React Compiler
* Stable memoized components
* Debounced search
* Code splitting
* Image optimization
* Virtualization-ready table architecture

---

## **🔌 Real-Time Price Updates**

The WebSocket mock provides:

* Random ±1% price oscillations
* Green/red animated transitions
* Auto reconnection with backoff
* Heartbeat pings for stability

### Replace With Live WebSocket

Edit `lib/websocket/price-stream.ts`:

```ts
this.ws = new WebSocket('wss://your-api.com/prices');
```

---

## **🧪 Getting Started**

### Install

```bash
git clone <repository>
npm install
npm run dev
```

### Developer Tools

```bash
npm run dev -- --debug
npm run type-check
npm run lighthouse
```

---

## **📱 Browser Support**

* Chrome / Edge (latest 2 versions)
* Firefox (latest 2 versions)
* Safari (latest 2 versions)
* iOS 14+
* Android 12+

---

## **🔮 Future Enhancements**

* Real exchange WebSocket feed
* Price alerts & notifications
* User authentication + watchlists
* TradingView lightweight charts
* CSV/PDF export
* Light/dark theme toggle
* Liquidity & volatility filter sliders
* Full historical charting

---

## **📄 License**

**MIT License**

---
