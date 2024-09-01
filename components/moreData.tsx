import React from 'react';
import { Thermometer, Gauge, Sun, Wind } from 'lucide-react';
import { WeatherData } from '@/types/weather';

interface Props {
    weatherData: WeatherData;
}

const MoreData: React.FC<Props> = ({ weatherData }) => {
    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getWindDirection = (degrees: number) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return directions[Math.round(degrees / 45) % 8];
    };

    return (
        <div className="space-y-4 bg-accent rounded-xl h-full p-6">
            <DataItem
                icon={<Thermometer className="w-5 h-5" />}
                title="Feels Like"
                value={`${Math.round(weatherData.main.feels_like)}°C`}
            />
            <DataItem
                icon={<Gauge className="w-5 h-5" />}
                title="Pressure"
                value={`${weatherData.main.pressure} hPa`}
            />
            <DataItem
                icon={<Wind className="w-5 h-5" />}
                title="Wind"
                value={`${weatherData.wind.speed} m/s ${getWindDirection(weatherData.wind.deg)}`}
            />
            <div className=''>
                <div className="flex items-center mb-4">
                    <Sun className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Sunrise & Sunset</span>
                </div>
                <div className="flex flex-col w-full justify-between gap-2 text-sm pl-4">
                    <div className='flex w-full justify-between'>
                        <span>
                            Sunrise
                        </span>
                        <span>
                            {formatTime(weatherData.sys.sunrise)}
                        </span>
                    </div>
                    <div className='flex w-full justify-between'>
                        <span>
                            Sunset
                        </span>
                        <span>
                            {formatTime(weatherData.sys.sunset)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface DataItemProps {
    icon: React.ReactNode;
    title: string;
    value: string;
}

const DataItem: React.FC<DataItemProps> = ({ icon, title, value }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center">
            {icon}
            <span className="ml-2 text-sm">{title}</span>
        </div>
        <span className="font-medium">{value}</span>
    </div>
);

export default MoreData;