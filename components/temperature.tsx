import React from 'react'
import { Line, LineChart, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface Temperature {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
}

const chartConfig = {
    temperature: {
        label: "Temperature",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export default function Temperature({ data }: { data: Temperature }) {

    const chartData = [
        { time: "Morning", temperature: data.morning },
        { time: "Afternoon", temperature: data.afternoon },
        { time: "Evening", temperature: data.evening },
        { time: "Night", temperature: data.night },
    ];

    return (
        <div className="w-full h-full lg:h-auto">
            <ChartContainer config={chartConfig} className="p-4 lg:p-6">
                <LineChart
                    width={300}
                    height={200}
                    data={chartData}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 10,
                    }}
                >
                    <XAxis
                        dataKey="time"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={18}
                        interval={0} // Force all labels to render
                        tickFormatter={(value: string) => value.slice(0, 2)}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                    />
                    <Line
                        dataKey="temperature"
                        type="monotone"
                        stroke="var(--color-temperature)"
                        strokeWidth={2}
                        dot={{
                            fill: "var(--color-temperature)",
                            r: 4,
                        }}
                        activeDot={{
                            r: 6,
                        }}
                    />
                </LineChart>
            </ChartContainer>
        </div>
    )
}

