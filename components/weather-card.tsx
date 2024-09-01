import React from 'react';
import { MapPin, Wind, Droplet, Plus } from 'lucide-react';
import { WeatherData } from '@/types/weather';
import Temperature from './temperature';
import { Button } from './ui/button';

interface Props {
  weatherData: WeatherData;
  onAddCity: (city: string) => void;
}

const WeatherCard: React.FC<Props> = ({ weatherData, onAddCity }) => {
  const handleAddCity = () => {
    onAddCity(weatherData.name);
  };
  return (
    <div className='w-full h-full flex flex-col lg:grid lg:grid-cols-2 lg:gird-rows-2 gap-4 text-muted-foreground p-4 lg:p-0 relative'>
      <Button
        variant="outline"
        size="icon"
        onClick={handleAddCity}
        className="absolute top-2 right-2 z-10"
        aria-label="Add to list"
      >
        <Plus className="w-3 h-3" />
      </Button>
      <div className='flex flex-col justify-between space-y-6 lg:space-y-0 lg:m-10'>
        <div className="flex flex-col lg:flex-row sm:flex-col justify-between items-start sm:items-center">
          <div className='flex items-center mb-2 sm:mb-0'>
            <MapPin className="w-5 h-5 mr-2" />
            <h2 className="text-xl font-semibold">{weatherData.name}</h2>
          </div>
          <div className=''>
            <p className="text-sm">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center text-foreground'>
          <div className='flex justify-center'>
            <span className="text-7xl sm:text-8xl lg:text-7xl font-light w-full text-center">{weatherData.main.temp}</span>
            <span className="text-7xl sm:text-5xl lg:text-4xl font-light w-full text-center">°</span>
          </div>
          {/* <p className="text-lg mt-2 w-full text-center">{weatherData.main.feels_like}</p> */}
          <div className='flex justify-center items-center'>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="w-16 h-16"
            />
            <span className="ml-2 text-xl">
              {weatherData.weather[0].description}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex items-center">
            <Wind className="w-5 h-5 mr-2" />
            <span className="text-sm">{weatherData.main.pressure}hpa</span>
          </div>
          <div className="flex items-center">
            <Droplet className="w-5 h-5 mr-2" />
            <span className="text-sm">{weatherData.main.humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind className="w-5 h-5 mr-2" />
            <span className="text-sm">{weatherData.wind.speed}km/h</span>
          </div>
        </div>
      </div>
      <div className='lg:m-10 border rounded-xl bg-accent bg-opacity'>
        <div className='flex flex-col justify-between space-y-6 lg:space-y-0 p-4 h-full w-full'>
          <div className="flex items-start sm:items-center lg:text-3xl text-2xl">
            Temperature
          </div>
          <div className='lg:m-0 sm:m-40'>
            <Temperature data={weatherData.temperatures} />
          </div>
        </div>
      </div>
    </div>

  );
};

export default WeatherCard;