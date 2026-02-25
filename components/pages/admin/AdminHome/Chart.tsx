"use client"

import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"


const yearlyData = [
  { month: "Jan", sales: 50 },
  { month: "Feb", sales: 90 },
  { month: "Mar", sales: 180 },
  { month: "Apr", sales: 220 },
  { month: "May", sales: 300 },
  { month: "Jun", sales: 270 },
  { month: "Jul", sales: 350 },
  { month: "Aug", sales: 360 },
  { month: "Sep", sales: 390 },
  { month: "Oct", sales: 420 },
  { month: "Nov", sales: 430 },
  { month: "Dec", sales: 600 },
]

const monthlyData = [
  { month: "Week 1", sales: 120 },
  { month: "Week 2", sales: 200 },
  { month: "Week 3", sales: 150 },
  { month: "Week 4", sales: 280 },
]


const chartConfig = {
  sales: {
    label: "Data",
  },
} satisfies ChartConfig


export default function Chart() {
  const [filter, setFilter] = useState("year")

  const data = filter === "year" ? yearlyData : monthlyData

  return (
    <Card className="rounded-2xl border border-white/10 bg-[#f8fafb] text-black  h-full">

      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">
          Sales Details
        </CardTitle>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-md border border-white/20 bg-white px-3 py-1 text-sm outline-none text-black"
        >
          <option value="year">Year</option>
          <option value="month">Month</option>
        </select>
      </CardHeader>

      {/* Chart */}
      <CardContent className="xl:h-[250px] 2xl:h-[230px]">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <AreaChart data={data}>

            <defs>
              <linearGradient id="orangeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B880" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#E6F2ED" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#2a2a2a"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
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
      </CardContent>
    </Card>
  )
}



// "use client"

// import { TrendingUp } from "lucide-react"
// import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   type ChartConfig,
// } from "@/components/ui/chart"

// export const description = "A linear line chart"

// const chartData = [
//   { month: "January", desktop: 0 },
//   { month: "February", desktop: 65 },
//   { month: "March", desktop: 95 },
//   { month: "April", desktop: 105 },
//   { month: "May", desktop: 125 },
//   { month: "June", desktop: 135 },
//   { month: "July", desktop: 150 },
//   { month: "August", desktop: 190 },
//   { month: "September", desktop: 190 },
//   { month: "October", desktop: 210 },
//   { month: "November", desktop: 240 },
//   { month: "December", desktop: 300 },
// ]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "var(--chart-1)",
//   },
// } satisfies ChartConfig

// export function Chart() {
//   return (
//     <Card className=" border-none shadow-none">

//       <CardContent>
//         <ChartContainer config={chartConfig} className=" h-[500px] w-full">
//           <LineChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Line
//               dataKey="desktop"
//               type="linear"
//               stroke="var(--color-desktop)"
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ChartContainer>
//       </CardContent>

//     </Card>
//   )
// }
