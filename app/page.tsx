'use client'
import React, { useState } from 'react';
import Header from '@/components/Header';
import WeatherCard from '@/components/weather-card';
import { WeatherData } from '@/types/weather';
import { fetchWeatherData } from '@/lib/weatherApi';
import WeatherDisplay from '@/components/weatherDisplay';


export default function WeatherDashboard() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeatherData(null);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className='bg-background flex flex-col min-h-screen w-screen'>
      <div className=''>
        <Header setSidebarOpen={setSidebarOpen} handleSearch={handleSearch} setCity={setCity} />
      </div>
      <div className='flex lg:flex-row flex-col h-full w-full mx-auto px-4 sm:px-6 lg:px-12 py-8  gap-4'>
        <div className='h-full lg:w-2/3 w-full grid grid-rows-2'>
          <div className='h-full  rounded-xl border bg-primary-foreground'>
            {error && <div className="text-red-500">{error}</div>}
            {weatherData && <WeatherCard weatherData={weatherData} />}
          </div>
          <div className='h-full grid sm:grid-cols-2 gap-4 pt-4'>
            <div className='h-full  rounded-xl border bg-accent p-4'>Wind</div>
            <div className='h-full  rounded-xl border bg-accent p-4'>Rain Chanse</div>
            <div className='h-full  rounded-xl border bg-accent p-4'>Pressure</div>
            <div className='h-full  rounded-xl border bg-accent p-4'>UV Index</div>
          </div>
        </div>
        <div className='h-full lg:w-1/3 w-full border rounded-xl'>
          {error && <div className="text-red-500">{error}</div>}
          {weatherData && <WeatherDisplay weatherData={weatherData} />}
        </div>
      </div>
    </div >
  );
};
