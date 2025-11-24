# Axiom Trade Token Discovery Table

A pixel-perfect replica of Axiom Trade's token discovery table with real-time pricing, advanced filtering, and professional trading UI patterns.

## Features

### Core Components
- **Three Token Categories**: New Pairs, Final Stretch, Migrated tokens
- **Real-Time Updates**: WebSocket mock integration with smooth price animations
- **Advanced Sorting**: Click any column header to sort (ascending/descending)
- **Search Filtering**: Search by token name, symbol, or contract address
- **Responsive Design**: Optimized for mobile and desktop

### UI/UX Patterns
- **Popovers**: Detailed token information on hover
- **Tooltips**: Additional context for metrics
- **Modals**: View detailed token analytics (extensible)
- **Dropdowns**: Token action menu with copy/explorer/alerts
- **Loading States**: Skeleton screens with shimmer animations
- **Error Boundaries**: Graceful error handling with recovery

### Performance Optimizations
- **Memoized Components**: React.memo on all table rows and headers
- **React Compiler**: Enabled for automatic optimization
- **Debounced Search**: 300ms delay to reduce re-renders
- **Virtual Scrolling Ready**: Architecture supports rendering 1000+ items
- **Code Splitting**: Lazy-loaded components where applicable

### Accessibility
- **ARIA Labels**: Proper semantic HTML with accessible roles
- **Keyboard Navigation**: Tab through interactive elements
- **Focus Management**: Trap focus in modals, restore on close
- **Screen Reader Support**: sr-only text for visual-only content
- **Color Contrast**: WCAG AA compliant (7+ contrast ratio)

## Tech Stack

### Frontend
- **Next.js 16**: App Router with React 19.2
- **TypeScript**: Strict mode for type safety
- **Tailwind CSS v4**: Utility-first styling with custom theme
- **Redux Toolkit**: Complex state management
- **React Query**: Data fetching and caching

### State Management
- **Filter Slice**: Tab selection and search queries
- **Price Slice**: Real-time price updates
- **UI Slice**: Modal/popover state

### UI Components
- **Radix UI**: Headless components (Popover, Tooltip, Dropdown)
- **Lucide Icons**: 24px consistent icon set
- **shadcn/ui patterns**: Dialog, dropdown menu implementations

## Architecture

### Directory Structure
\`\`\`
├── app/
│   ├── page.tsx              # Main entry with Redux/Query providers
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Design tokens and animations
├── components/
│   ├── header.tsx            # Tab/search header
│   ├── token-table.tsx       # Main table component
│   ├── error-boundary.tsx    # Error handling
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
│       └── ... (other UI components)
├── lib/
│   ├── api/
│   │   ├── client.ts         # API client
│   │   └── mock-tokens.ts    # Mock data
│   ├── redux/
│   │   ├── store.ts
│   │   └── slices/
│   ├── websocket/
│   │   └── price-stream.ts   # WebSocket mock
│   ├── a11y/
│   │   └── focus-manager.ts  # Accessibility utilities
│   ├── performance/
│   │   └── metrics.ts        # Web Vitals tracking
│   ├── types.ts              # TypeScript interfaces
│   ├── format.ts             # Number formatting
│   └── query-client.ts       # React Query setup
├── hooks/
│   ├── use-tokens.ts         # Fetch tokens
│   ├── use-real-time-price.ts # WebSocket hook
│   ├── use-debounce.ts       # Debounce hook
│   └── use-toast.ts          # Toast notifications
└── scripts/
    └── (future: testing, data generation)
\`\`\`

### Component Hierarchy
\`\`\`
App (Provider wrapper)
├── Header
│   ├── Tabs
│   └── Search Input
└── TokenTable
    ├── TableHeader (Sortable)
    └── TableBody
        └── TokenTableRow[] (Memoized)
            ├── PriceChangeIndicator
            ├── RiskBadge
            └── TokenMenu (Dropdown)
\`\`\`

## Performance Metrics

### Target Lighthouse Scores
- **Performance**: ≥90
- **Accessibility**: ≥95
- **Best Practices**: ≥90
- **SEO**: ≥90

### Optimization Techniques
- React Compiler enabled for automatic optimization
- Memoized components prevent unnecessary re-renders
- Debounced search reduces filtering overhead
- Virtual scrolling ready for large datasets
- Image optimization with next/image
- CSS class minification with Tailwind

## Getting Started

### Installation
\`\`\`bash
# Clone the repository
git clone <repository>

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

### Development
\`\`\`bash
# Run with debug logging
npm run dev -- --debug

# Run type checking
npm run type-check

# Run Lighthouse audit
npm run lighthouse
\`\`\`

## Real-Time Price Updates

The WebSocket mock simulates real-time token pricing with:
- Random price fluctuations ±1% per second
- Smooth color transitions (green for gains, red for losses)
- Automatic connection/disconnection management
- Error recovery and reconnection logic

### Replace Mock with Real WebSocket
In `lib/websocket/price-stream.ts`, replace the mock implementation:
\`\`\`typescript
class PriceStreamManager {
  connect(tokenIds: string[]): void {
    // Replace with real WebSocket connection
    // this.ws = new WebSocket('wss://your-api.com/prices');
  }
}
\`\`\`

## Accessibility Checklist

- [x] Semantic HTML elements
- [x] ARIA labels and roles
- [x] Keyboard navigation (Tab, Enter, Escape)
- [x] Focus indicators and management
- [x] Color contrast ≥7:1
- [x] Screen reader support
- [x] Error messages with guidance
- [x] Loading state announcements

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS 14+, Android 12+

## Future Enhancements

- [ ] WebSocket integration with real exchange API
- [ ] Advanced charting with TradingView Lightweight Charts
- [ ] User authentication and watchlists
- [ ] Export to CSV/PDF
- [ ] Dark/light theme toggle
- [ ] Notification system with price alerts
- [ ] Advanced filtering (liquidity, risk score ranges)
- [ ] Historical data and charts

## License

MIT
