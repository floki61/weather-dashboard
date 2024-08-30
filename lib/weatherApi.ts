export const fetchWeatherData = async (city: string) => {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data;
};
