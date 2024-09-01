import React from 'react'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { Eye } from 'lucide-react'
import { WeatherData } from '@/types/weather';

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background p-2 rounded shadow-md border border-border">
                <p className="text-sm">{`Time: ${payload[0].payload.time}`} </p>
                <p className="text-sm font-bold">{`Visibility: ${payload[0].value.toFixed(1)} km`}</p>
            </div>
        );
    }
    return null;
};

export default function VisibilityCard({ visibilityData }: { visibilityData: WeatherData['visibilityData'] }) {
    const currentVisibility = visibilityData[visibilityData.length - 1].visibility;

    return (
        <div className='flex flex-col rounded-xl bg-accent h-full p-6 gap-4'>
            <div className='flex flex-col space-y-2'>
                <div className="text-sm font-medium flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Visibility
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                    Visibility accross the day
                </div>
            </div>
            <div className='h-full flex flex-col'>
                <div className="text-2xl font-bold">{currentVisibility.toFixed(1)}km <span className='text-sm text-muted-foreground'>now</span></div>
                <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={visibilityData}>
                        <XAxis dataKey="time" hide />
                        <YAxis hide domain={[0, 'dataMax + 2']} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="visibility" stroke="#8884d8" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground h-full flex items-end">
                    {getVisibilityDescription(currentVisibility)}
                </p>
            </div>
        </div>
    )
}

function getVisibilityDescription(visibility: number) {
    if (visibility > 10) return "Excellent visibility";
    if (visibility > 5) return "Good visibility";
    if (visibility > 2) return "Moderate visibility";
    if (visibility > 1) return "Poor visibility";
    return "Very poor visibility";
}