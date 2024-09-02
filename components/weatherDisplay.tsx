import React from 'react';
import WeatherCard from '@/components/weather-card';
import VisibilityCard from '@/components/visibility';
import UvIndex from '@/components/uvIndex';
import HumidityCloudiness from '@/components/humidity-cloudiness';
import MoreData from '@/components/moreData';
import { WeatherData } from '@/types/weather';
import Chart from './chart';
interface Props {
    weatherData: WeatherData | null;
    error: string;
    backgroundImage: string;
    onAddCity: (city: string) => void;
}

const WeatherDisplay: React.FC<Props> = ({ weatherData, error, backgroundImage, onAddCity }) => {
    return (
        <div className='h-full lg:w-2/3 flex flex-col gap-4'>
            <div
                className='rounded-xl border bg-primary-foreground'
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {error && <div className="text-red-500 p-4">{error}</div>}
                {weatherData && <WeatherCard weatherData={weatherData} onAddCity={onAddCity} />}
            </div>
            {weatherData ? (
                <>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <VisibilityCard visibilityData={weatherData.visibilityData} />
                        <UvIndex uvIndex={weatherData.uvIndex} />
                        <HumidityCloudiness humidity={weatherData.main.humidity} cloudiness={weatherData.clouds.all} />
                        <MoreData weatherData={weatherData} />
                    </div>
                    <Chart data={weatherData} />
                </>
            ) : (
                <div className="text-center text-muted-foreground p-4 bg-primary-foreground rounded-xl">
                    No weather data available. Please enter a city to fetch weather details.
                </div>
            )}
        </div>
    );
};

export default WeatherDisplay;
