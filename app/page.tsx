'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import WeatherCard from '@/components/weather-card';
import { WeatherData } from '@/types/weather';
import { fetchWeatherData } from '@/lib/weatherApi';
import VisibilityCard from '@/components/visibility';
import UvIndex from '@/components/uvIndex';
import HumidityCloudiness from '@/components/humidity-cloudiness';
import MoreData from '@/components/moreData';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Thermometer, Wind, X, Plus, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Temperature from '@/components/temperature';

interface CityData {
  name: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
}

export default function Component() {
  const [city, setCity] = useState('Marrakech');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');
  const [backgroundImage, setBackgroundImage] = useState<string>('/default.jpg');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  const [newCity, setNewCity] = useState('');
  const [isAddingCity, setIsAddingCity] = useState(false);
  const [addCityError, setAddCityError] = useState<string>('');

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

  const handleCityClick = (cityName: string) => {
    setCity(cityName);
  };

  const handleCityDelete = (cityName: string) => {
    setCitiesData(citiesData.filter(city => city.name !== cityName));
  };

  const handleAddCity = async (cityName: string) => {
    if (cityName && !citiesData.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
      setAddCityError('');
      try {
        const newCityData = await fetchCityData(cityName);
        setCitiesData(prevCities => [...prevCities, newCityData]);
      } catch (err) {
        setAddCityError('Failed to add city. Please try again.');
      }
    }
  };

  return (
    <div className='bg-background flex flex-col min-h-screen w-full'>
      <Header setSidebarOpen={setSidebarOpen} handleSearch={handleSearch} setCity={setCity} />
      <div className='flex flex-col lg:flex-row h-full w-full mx-auto px-4 sm:px-6 lg:px-8 p-4 gap-4 pb-4'>
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
            {weatherData && <WeatherCard weatherData={weatherData} onAddCity={handleAddCity} />}
          </div>
          {weatherData ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <VisibilityCard visibilityData={weatherData.visibilityData} />
              <UvIndex uvIndex={weatherData.uvIndex} />
              <HumidityCloudiness humidity={weatherData.main.humidity} cloudiness={weatherData.clouds.all} />
              <MoreData weatherData={weatherData} />
            </div>
          ) : (
            <div className="text-center text-muted-foreground p-4 bg-primary-foreground rounded-xl">
              No weather data available. Please enter a city to fetch weather details.
            </div>
          )}
        </div>
        <div className='lg:w-1/3 w-full'>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Popular Cities</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setIsAddingCity(!isAddingCity)}>
                {isAddingCity ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                <span className="sr-only">{isAddingCity ? "Cancel" : "Add city"}</span>
              </Button>
            </CardHeader>
            <CardContent>
              {isAddingCity && (
                <div className="mb-4 space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Enter city name"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="flex-grow"
                    />
                    <Button onClick={() => handleAddCity(newCity)} disabled={!newCity}>
                      <Search className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  {addCityError && <p className="text-red-500 text-sm">{addCityError}</p>}
                </div>
              )}
              <div className="space-y-4">
                {citiesData.map((cityData, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-primary-foreground rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <div
                      className="flex items-center cursor-pointer flex-grow"
                      onClick={() => handleCityClick(cityData.name)}
                    >
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span className="font-medium">{cityData.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Thermometer className="w-4 h-4 mr-1 text-primary" />
                        <span>{cityData.temperature}°C</span>
                      </div>
                      <div className="flex items-center">
                        <Wind className="w-4 h-4 mr-1 text-primary" />
                        <span>{cityData.windSpeed} km/h</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCityDelete(cityData.name)}
                        className="ml-2"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Delete city</span>
                      </Button>
                    </div>

                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}