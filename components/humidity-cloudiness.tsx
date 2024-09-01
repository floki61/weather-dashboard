import React from 'react'
import { CardContent, CardHeader, CardTitle } from './ui/card'
import { Droplets } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

export default function HumidityCloudiness({ humidity, cloudiness }: { humidity: number; cloudiness: number }) {
    return (
        <div className='flex flex-col rounded-xl bg-accent h-full p-6 gap-4'>
            <div className="text-sm font-medium flex items-center">
                <Droplets className="w-4 h-4 mr-2" />
                Humidity
            </div>
            <div className='flex w-full gap-4 items-center px-4'>
                <Progress value={humidity} className="h-2 bg-gray-400" />
                <div className="text-2xl font-bold">{humidity}%</div>
            </div>
            <div className="text-sm font-medium flex items-center">
                <Droplets className="w-4 h-4 mr-2" />
                Couldiness
            </div>
            <div className='flex w-full gap-4 items-center px-4'>
                <Progress value={cloudiness} className="h-2 bg-gray-400" />
                <div className="text-2xl font-bold">{cloudiness}%</div>
            </div>
            <p className="text-xs text-muted-foreground h-full flex items-end">
                {humidity > 80 && cloudiness > 70 ? (
                    "It's quite humid and cloudy today. You might want to stay indoors."
                ) : humidity > 80 ? (
                    "High humidity today. Stay cool and hydrated!"
                ) : cloudiness > 70 ? (
                    "Cloudy skies today, but the humidity is manageable."
                ) : (
                    "Comfortable weather today with moderate humidity and clear skies."
                )}
            </p>

        </div>
    )
}
