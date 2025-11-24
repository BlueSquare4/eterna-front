import type { ReactNode } from 'react';

export type Token = {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  priceChange24hPercent: number;
  volume24h: number;
  liquidity: number;
  fdv: number; // Fully Diluted Valuation
  age: string; // e.g., "5m", "2h", "1d"
  priceUpdate?: 'up' | 'down';
  marketCap: number;
  transactions: {
    buys: number;
    sells: number;
  };
  socials: {
    twitter?: string;
    telegram?: string;
    website?: string;
  };
  creator: {
    pnl: number;
    pnlPercent: number;
  };
  holders: number;
  proTraders: number;
  topTraders: number;
  vips: {
    current: number;
    total: number;
  };
  snipers: number;
  bots: number;
  boxes: number;
  isPumpFun: boolean;
  type: 'pump' | 'mayhem' | 'virtual-curve' | 'meteora';
};

export type SortDirection = 'asc' | 'desc';
export type SortConfig = {
  key: keyof Token | null;
  direction: SortDirection;
};

// This type is no longer needed with the new card layout
export type ColumnDef<T> = {
  accessorKey: keyof T | 'id';
  header: ReactNode;
  cell: (item: T) => ReactNode;
  enableSorting?: boolean;
  hideOnMobile?: boolean;
};
