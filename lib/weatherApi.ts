import { WeatherData } from "@/types/weather";

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;


    const currentWeatherResponse = await fetch(currentWeatherUrl);
    if (!currentWeatherResponse.ok) {
        throw new Error("Failed to fetch current weather data");
    }
    const currentWeatherData = await currentWeatherResponse.json();


    const forecastResponse = await fetch(forecastUrl);
    if (!forecastResponse.ok) {
        throw new Error("Failed to fetch forecast data");
    }
    const forecastData = await forecastResponse.json();


    const { coord: { lat, lon } } = currentWeatherData;


    const uvIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const uvIndexResponse = await fetch(uvIndexUrl);
    if (!uvIndexResponse.ok) {
        throw new Error("Failed to fetch UV index data");
    }
    const uvIndexData = await uvIndexResponse.json();


    const temperatures = {
        morning: null,
        afternoon: null,
        evening: null,
        night: null,
    };


    const visibilityData: Array<{ time: string; visibility: number }> = [];

    const windData: Array<{ time: string; speed: number; direction: string }> = [];

    // Helper function to convert wind direction in degrees to cardinal directions
    const degreesToCardinal = (degrees: number): string => {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        return directions[Math.round(degrees / 22.5) % 16];
    };

    // Add current wind data
    windData.push({
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        speed: currentWeatherData.wind.speed,
        direction: degreesToCardinal(currentWeatherData.wind.deg)
    });

    // Process forecast data to extract temperatures, visibility, and wind data for specific times
    forecastData.list.slice(0, 8).forEach((entry: any) => {
        const time = entry.dt_txt.split(" ")[1];
        const hour = time.split(":")[0];

        // Add visibility data
        visibilityData.push({
            time: hour + ":00",
            visibility: entry.visibility / 1000, // Convert to km
        });

        windData.push({
            time: hour + ":00",
            speed: entry.wind.speed,
            direction: degreesToCardinal(entry.wind.deg)
        });

        switch (time) {
            case "06:00:00":
                temperatures.morning = entry.main.temp;
                break;
            case "12:00:00":
                temperatures.afternoon = entry.main.temp;
                break;
            case "18:00:00":
                temperatures.evening = entry.main.temp;
                break;
            case "21:00:00":
                temperatures.night = entry.main.temp;
                break;
        }
    });

    return {
        ...currentWeatherData,
        temperatures,
        visibilityData,
        windData,
        uvIndex: uvIndexData.value,
    };
};