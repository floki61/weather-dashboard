'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PopularCities from '@/components/PopularCities';
import { WeatherData } from '@/types/weather';
import { fetchWeatherData } from '@/lib/weatherApi';
import WeatherDisplay from '@/components/weatherDisplay';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

interface CityData {
  name: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
}

export default function App() {
  const [city, setCity] = useState('Marrakech');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');
  const [backgroundImage, setBackgroundImage] = useState<string>('/default.jpg');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [citiesData, setCitiesData] = useState<CityData[]>([]);

  useEffect(() => {
    const defaultCities = ['Rabat', 'Casablanca', 'Agadir'];
    Promise.all(defaultCities.map(fetchCityData))
      .then(setCitiesData)
      .catch(console.error);

    handleSearch();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [city]);

  const fetchCityData = async (cityName: string): Promise<CityData> => {
    const data = await fetchWeatherData(cityName);
    return {
      name: data.name,
      temperature: Math.round(data.main.temp),
      windSpeed: Math.round(data.wind.speed),
      humidity: data.main.humidity,
      pressure: data.main.pressure
    };
  };

  const handleSearch = async () => {
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      setError('');
      setBackgroundImage('/default.jpg');
    } catch (err) {
      setError('City not found');
      setWeatherData(null);
      setBackgroundImage('/default.jpg');
    }
  };

  const handleAddCity = async (cityName: string) => {
    if (cityName && !citiesData.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
      try {
        const newCityData = await fetchCityData(cityName);
        setCitiesData(prevCities => [...prevCities, newCityData]);
        toast.success(`City "${city}" added successfully!`);
      } catch (err) {
        toast.error('Failed to add city. Please try again.');
      }
    }
  };

  const handleCityDelete = (cityName: string) => {
    setCitiesData(citiesData.filter(city => city.name !== cityName));
  };

  return (
    <div className='bg-background flex flex-col min-h-screen w-full'>
      <Header setSidebarOpen={setSidebarOpen} handleSearch={handleSearch} setCity={setCity} />
      <div className='flex flex-col lg:flex-row h-full w-full mx-auto px-4 sm:px-6 lg:px-8 p-4 gap-4 pb-4'>
        <WeatherDisplay
          weatherData={weatherData}
          error={error}
          backgroundImage={backgroundImage}
          onAddCity={handleAddCity}
        />
        <PopularCities
          citiesData={citiesData}
          onCityClick={setCity}
          onCityDelete={handleCityDelete}
          onAddCity={handleAddCity}
        />
      </div>
      <Footer />
    </div>
  );
}