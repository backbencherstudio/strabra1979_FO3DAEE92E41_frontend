"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A linear line chart"

const chartData = [
  { month: "January", desktop: 0 },
  { month: "February", desktop: 65 },
  { month: "March", desktop: 95 },
  { month: "April", desktop: 105 },
  { month: "May", desktop: 125 },
  { month: "June", desktop: 135 },
  { month: "July", desktop: 150 },
  { month: "August", desktop: 190 },
  { month: "September", desktop: 190 },
    { month: "October", desktop: 210 },
    { month: "November", desktop: 240 },
    { month: "December", desktop: 300 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function Chart() {
  return (
    <Card className=" border-none shadow-none">
     
      <CardContent>
        <ChartContainer config={chartConfig} className=" h-[500px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
       
    </Card>
  )
}
