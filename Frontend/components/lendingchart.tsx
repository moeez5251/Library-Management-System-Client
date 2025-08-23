"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A multiple line chart"

const chartData = [
  { month: "ABC", desktop: 186, mobile: 80 },
  { month: "June", desktop: 2114, mobile: 140 },
  { month: "June", desktop: 1114, mobile: 10 },
  { month: "June", desktop: 114, mobile: 1110 },
  { month: "June", desktop: 1114, mobile: 0 },
  { month: "June", desktop: 14, mobile: 11111 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

export function ChartLineMultiple() {
  return (
    <Card data-swapy-item="b" className="flex flex-col dark:bg-[#1b2536] h-full border-none">
      <CardHeader>
        <CardTitle>Lending Activity</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="w-full h-[290px] flex">
        <ChartContainer config={chartConfig} className="w-full h-full min-w-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, bottom: 20, left: 10, right: 10 }} // small margins to prevent overflow
            >
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={0}
                padding={{ left: 5, right: 5 }} 
                tickFormatter={(value) => value.slice(0, 3)}
                textAnchor="end"
              />

              <YAxis
                tickFormatter={(value) => `${Math.ceil(value / 3000)}x`} 
              />

              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

              <Line
                dataKey="desktop"
                type="monotone"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mobile"
                type="monotone"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
