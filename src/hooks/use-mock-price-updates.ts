"use client";

import { useState, useEffect, useRef } from 'react';
import type { Token } from '@/lib/types';

export function useMockPriceUpdates(initialTokens: Token[]) {
  const [tokens, setTokens] = useState<Token[]>(initialTokens);
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setTokens(prevTokens => 
        prevTokens.map(token => {
          if (Math.random() > 0.7) { // 30% chance to update a token's price
            const changeFactor = (Math.random() - 0.5) * 0.1; // -5% to +5% change
            const newPrice = token.price * (1 + changeFactor);
            const priceUpdate = newPrice > token.price ? 'up' : 'down';

            // Clear any existing timeout for this token
            if (timeoutsRef.current[token.id]) {
              clearTimeout(timeoutsRef.current[token.id]);
            }

            // Set a new timeout to remove the update indicator
            const timeoutId = setTimeout(() => {
              setTokens(currentTokens => 
                currentTokens.map(t => 
                  t.id === token.id ? { ...t, priceUpdate: undefined } : t
                )
              );
              delete timeoutsRef.current[token.id];
            }, 1000);
            timeoutsRef.current[token.id] = timeoutId;
            
            return { 
              ...token, 
              price: newPrice,
              priceChange24hPercent: token.priceChange24hPercent + changeFactor * 100,
              priceUpdate,
            };
          }
          return token;
        })
      );
    }, 2000); // Update every 2 seconds

    return () => {
      clearInterval(interval);
      // Clear all timeouts on cleanup
      Object.values(timeoutsRef.current).forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return tokens;
}
