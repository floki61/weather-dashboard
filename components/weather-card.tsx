import React from 'react';
import { MapPin, Wind, Droplet } from 'lucide-react';
import { WeatherData } from '@/types/weather';

// interface Props {
//   location: string;
//   temperature: number;
//   description: string;
//   time: string;
//   forecast: number[];
//   pressure: number;
//   humidity: number;
//   windSpeed: number;
// }

interface Props {
  weatherData: WeatherData;
}


const WeatherCard: React.FC<Props> = ({ weatherData }) => {
  return (
    <div className='w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 text-muted-foreground p-4 lg:p-0'>
      <div className='flex flex-col justify-between space-y-6 lg:space-y-0 lg:m-10'>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className='flex items-center mb-2 sm:mb-0'>
            <MapPin className="w-5 h-5 mr-2" />
            <h2 className="text-xl font-semibold">{weatherData.name}</h2>
          </div>
          <div>
            <p className="text-sm">today 13:37PM</p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center text-foreground'>
          <div className='flex justify-center'>
            <span className="text-7xl sm:text-8xl lg:text-9xl font-light w-full text-center">{weatherData.main.temp}</span>
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
      <div className='mt-6 lg:m-10 border rounded-xl bg-accent bg-opacity-35'>
        <div className='flex flex-col justify-between space-y-6 lg:space-y-0 p-4 h-full'>
          <div className="flex items-start sm:items-center lg:text-3xl text-2xl">
            Temperature
          </div>
          <div className='flex flex-col'>
            graph
          </div>
          <div className="flex">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4  w-full">
              {['Morning', 'Afternoon', 'Evening', 'Night'].map((time, index) => (
                <div key={time}>
                  <p className="text-sm ">{time}</p>
                  {/* <p className="text-lg font-semibold ">{forecast[index]}°</p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;