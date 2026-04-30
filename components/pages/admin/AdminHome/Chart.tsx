'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Spinner } from '@/components/ui/spinner'

const chartConfig = {
  sales: {
    label: 'Properties',
  },
} satisfies ChartConfig

interface ChartProps {
  isLoading: boolean
  data?: {
    year: number
    data: {
      label: string
      count: number
    }[]
  }
}

export default function Chart({ isLoading, data: chartData }: ChartProps) {
  console.log(chartData?.data)
  const chartDisplayData =
    chartData?.data?.map((item) => ({
      month: item.label,
      sales: item.count,
    })) ?? []

  return (
    // xl:h-62.5 2xl:h-57.5
    <Card className="h-full gap-3">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-foreground text-base font-semibold">
            Property Dashboard Overview
          </CardTitle>
          <CardDescription className="text-xs">
            Overview of condition over last 1 Year
          </CardDescription>
        </div>

        {/* <select */}
        {/*   value={filter} */}
        {/*   onChange={(e) => setFilter(e.target.value)} */}
        {/*   className="rounded-md border border-white/20 bg-white px-3 py-1 text-sm text-black outline-none" */}
        {/* > */}
        {/*   <option value="year">Year</option> */}
        {/*   <option value="month">Month</option> */}
        {/* </select> */}
      </CardHeader>

      {/* Chart */}
      <CardContent className="relative flex-1 pl-0">
        {isLoading ? (
          <section className="grid size-full place-items-center">
            <p className="loading-text">Loading chart data...</p>
          </section>
        ) : (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart data={chartDisplayData}>
              <defs>
                <linearGradient id="orangeFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B880" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#E6F2ED" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} stroke="#2a2a2a" strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />

              <YAxis tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />

              <ChartTooltip
                cursor={true}
                content={
                  <ChartTooltipContent
                    className="min-w-40"
                    labelFormatter={(label, payload) => {
                      if (label) {
                        return `${label} , ${chartData?.year}`
                      }

                      return `${chartData?.year}`
                    }}
                    indicator="dot"
                  />
                }
              />

              <Area
                type="monotone"
                dataKey="sales"
                stroke="#10B880"
                strokeWidth={2}
                fill="url(#orangeFill)"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
