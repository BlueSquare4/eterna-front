"use client"

import * as React from "react"
import { Line, LineChart, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import type { Token } from "@/lib/types"

const generateChartData = (currentPrice: number) => {
  const data = [];
  // Start from a price that makes the current price look like a plausible end-point
  let price = currentPrice / (1 + (Math.random() - 0.5) * 0.2);
  for (let i = 0; i < 30; i++) {
    data.push({
      name: `T-${30 - i}`,
      price,
    });
    // Add some volatility
    price *= 1 + (Math.random() - 0.5) * 0.05;
  }
  // Ensure the last data point is the current price for accuracy
  data[29] = { ...data[29], price: currentPrice };
  return data;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 8 }).format(value);
};


export function TokenChart({ token }: { token: Token }) {
  const chartData = React.useMemo(() => generateChartData(token.price), [token.price]);

  return (
    <Card className="border-0 shadow-none -mx-6 -mt-6">
      <CardContent className="p-0">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
                <Tooltip
                    content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                        return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-1 gap-2">
                            <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Price
                                </span>
                                <span className="font-bold text-foreground">
                                {formatCurrency(payload[0].value as number)}
                                </span>
                            </div>
                            </div>
                        </div>
                        )
                    }

                    return null
                    }}
                />
              <XAxis dataKey="name" hide />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="price"
                stroke="hsl(var(--primary))"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
