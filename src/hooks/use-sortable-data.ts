"use client";

import { useState, useMemo } from 'react';
import type { Token, SortConfig, SortDirection } from '@/lib/types';

export function useSortableData(items: Token[], initialConfig: SortConfig | null = null) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(initialConfig);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Token];
        const bValue = b[sortConfig.key as keyof Token];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
          // Handle age string sorting
          if (sortConfig.key === 'age') {
            const timeToMinutes = (time: string) => {
              const value = parseInt(time);
              if (time.includes('m')) return value;
              if (time.includes('h')) return value * 60;
              if (time.includes('d')) return value * 60 * 24;
              return 0;
            };
            const aMinutes = timeToMinutes(aValue);
            const bMinutes = timeToMinutes(bValue);
            if (aMinutes < bMinutes) {
              return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aMinutes > bMinutes) {
              return sortConfig.direction === 'asc' ? 1 : -1;
            }
          } else {
             if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
             if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
          }
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: keyof Token) => {
    let direction: SortDirection = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
}
