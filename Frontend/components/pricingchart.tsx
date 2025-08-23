"use client"

import { Pie, PieChart, Label } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Fines and lost/damaged books"

const chartData = [
  { type: "Overdue Fines", stock: 275, fill: "#01e497" },
  { type: "Lost Books Fines", stock: 200, fill: "#fe4b00" },
]

const chartConfig = {
  stock: {
    label: "Stock",
  },
  available: {
    label: "Overdue Fines",
    color: "var(--chart-1)",
  },
  unavailable: {
    label: "Lost Books ",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const totalStock = chartData.reduce((acc, curr) => acc + curr.stock, 0)

export function ChartPieDonut() {
  return (
    <Card data-swapy-item="a" className="flex flex-col dark:bg-[#1b2536] h-full border-none">
      <CardHeader className="items-center pb-0">
        <CardTitle>Fines</CardTitle>
        <CardDescription className="font-semibold">Overview of pie chart</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Pie
              data={chartData}
              dataKey="stock"
              nameKey="type"
              innerRadius={60}
              outerRadius={90}   
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                         100%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="flex justify-center items-center gap-6 mt-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-baseline gap-2 text-sm">
              <span
                className="block h-3 w-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <div className="flex flex-col">
                <span className="font-semibold text-nowrap">
                    {item.stock} (
                  {((item.stock / totalStock) * 100).toFixed(1)}%)
                </span>
                <span className="text-xs text-[#9297a3] font-semibold">{item.type}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
