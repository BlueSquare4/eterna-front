"use client";

import type { Token } from '@/lib/types';
import { TokenCard } from './token-card';
import { useSortableData } from '@/hooks/use-sortable-data';
import { ArrowUpDown, ArrowDown, ArrowUp, Pause, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';

interface TokenListProps {
  data: Token[];
  title: string;
}

type SortKey = keyof Token;

export function TokenList({ data, title }: TokenListProps) {
  const [sortKey, setSortKey] = useState<SortKey>('age');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const { items, requestSort, sortConfig } = useSortableData(data, { key: sortKey, direction: sortDirection });

  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    requestSort(key);
    setSortKey(key);
    setSortDirection(direction);
  }

  const sortOptions: { key: SortKey, label: string }[] = [
    { key: 'age', label: 'Age' },
    { key: 'marketCap', label: 'Market Cap' },
    { key: 'volume24h', label: 'Volume (24h)' },
    { key: 'priceChange24hPercent', label: 'Price Change (24h)' },
    { key: 'price', label: 'Price' },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.key === sortKey)?.label || 'Sort by';

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b border-border flex-none">
        <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold">{title}</h2>
            <button className="text-primary"><Pause className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
                  <ArrowUpDown className="h-3 w-3" />
                  <span>{currentSortLabel}</span>
                  {sortConfig?.direction === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup value={sortKey} onValueChange={(val) => handleSort(val as SortKey)}>
                  {sortOptions.map(option => (
                    <DropdownMenuRadioItem key={option.key} value={option.key}>{option.label}</DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <SlidersHorizontal className="h-4 w-4" />
            </Button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {items.map((token) => (
            <TokenCard key={token.id} token={token} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
