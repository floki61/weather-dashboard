'use client'
import { useState } from 'react';
import WeatherDisplay from '@/components/weatherDisplay';
import { fetchWeatherData } from '@/lib/weatherApi';
import { WeatherData } from '@/types/weather';

const Home = () => {
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="mb-8">
        <input
          type="text"
          className="p-2 rounded-md border dark:bg-gray-700 dark:text-white"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {weatherData && <WeatherDisplay weatherData={weatherData} />}
    </div>
  );
};

export default Home;
