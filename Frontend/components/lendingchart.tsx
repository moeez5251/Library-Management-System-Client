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
import { useEffect, useState } from "react"

export const description = "A multiple line chart"
const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

export function ChartLineMultiple({ data }: { data: any }) {
  const [chartData, setchartData] = useState([
    { month: "January", desktop: 0, mobile: 0 },
    { month: "February", desktop: 0, mobile: 0 },
    { month: "March", desktop: 0, mobile: 0 },
    { month: "April", desktop: 0, mobile: 0 },
    { month: "May", desktop: 0, mobile: 0 },
    { month: "June", desktop: 0, mobile: 0 },
    { month: "July", desktop: 0, mobile: 0 },
    { month: "August", desktop: 0, mobile: 0 },
    { month: "September", desktop: 0, mobile: 0 },
    { month: "October", desktop: 0, mobile: 0 },
    { month: "November", desktop: 0, mobile: 0 },
    { month: "December", desktop: 0, mobile: 0 },
  ])
  useEffect(() => {
    const keys = Object.keys(data)

    for (let i = 0; i < keys.length; i++) {
      const month = keys[i];
      const value = data[month];
      const index = chartData.findIndex((item) => item.month === month);
      if (index !== -1) {
        setchartData((prevData) => {
          const newData = [...prevData];
          newData[index].desktop = Math.floor(value + Math.random()* 3);
          newData[index].mobile = value;
          return newData;
        })
      }
    }
    return () => {

    }
  }, [data])


  return (
    <Card data-swapy-item="b" className="flex flex-col dark:bg-[#1b2536] h-full border-none">
      <CardHeader>
        <CardTitle>Lending Activity</CardTitle>
        <CardDescription>January - December {new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent className="w-full h-[290px] flex">
        <ChartContainer config={chartConfig} className="w-full h-full min-w-[200px]">
            <LineChart
              data={chartData}
              margin={{ top: 10, bottom: 20, left: 10, right: 10 }}
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
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
