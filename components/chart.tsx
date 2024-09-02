import React from 'react'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts"
import { WeatherData } from '@/types/weather'
import { ChartSpline } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean
  payload?: Array<{ name: string; value: number; stroke: string }>
  label?: string
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Card className="bg-background border-border">
        <CardContent className="p-2">
          <p className="text-sm font-medium text-foreground ">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{  }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </CardContent>
      </Card>
    )
  }

  return null
}

export default function Chart({ data }: { data: WeatherData }) {
    const chartData = data?.windData.map(entry => {
        const temp = data.temperatures[entry.time.includes('06') ? 'morning' :
            entry.time.includes('12') ? 'afternoon' :
                entry.time.includes('18') ? 'evening' : 'night'];

        return {
            name: entry.time,
            temp: temp,
            wind: entry.speed
        };
    }) || [];

    return (
        <div className="flex flex-col bg-accent p-6 rounded-xl gap-4">
            <div className="text-sm font-medium flex items-center">
                <ChartSpline className='w-4 h-4 mr-4' />
                <h3 className="text-lg font-semibold">Temperature and Wind Speed Forecast</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line yAxisId="left" type="monotone" dataKey="temp" name="Temperature (°C)" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                    <Line yAxisId="right" type="monotone" dataKey="wind" name="Wind Speed (m/s)" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}