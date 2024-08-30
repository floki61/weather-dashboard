import React from 'react';
import { WeatherData } from '../types/weather';

interface Props {
    weatherData: WeatherData;
}

const WeatherDisplay: React.FC<Props> = ({ weatherData }) => {
    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{weatherData.name}</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="text-4xl font-bold mb-4">
                        {weatherData.main.temp}°C
                    </div>
                    <div className="text-lg">Feels like: {weatherData.main.feels_like}°C</div>
                    <div className="flex items-center mb-4">
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
                <div>
                    <div className="text-lg mb-2">Humidity: {weatherData.main.humidity}%</div>
                    <div className="text-lg mb-2">Pressure: {weatherData.main.pressure} hPa</div>
                    <div className="text-lg mb-2">Wind Speed: {weatherData.wind.speed} m/s</div>
                    <div className="text-lg mb-2">Wind Direction: {weatherData.wind.deg}°</div>
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <div className="text-lg mb-2">Visibility: {weatherData.visibility / 1000} km</div>
                    <div className="text-lg mb-2">Cloudiness: {weatherData.clouds.all}%</div>
                </div>
                <div>
                    <div className="text-lg mb-2">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</div>
                    <div className="text-lg mb-2">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</div>
                </div>
            </div>
            {weatherData.rain && (
                <div className="mt-4">
                    <div className="text-lg mb-2">Rain (last 1h): {weatherData.rain['1h']} mm</div>
                </div>
            )}
            {weatherData.snow && (
                <div className="mt-4">
                    <div className="text-lg mb-2">Snow (last 1h): {weatherData.snow['1h']} mm</div>
                </div>
            )}
        </div>
    );
};

export default WeatherDisplay;