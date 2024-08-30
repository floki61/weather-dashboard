import { LayoutGrid, Map, Bookmark, Calendar, Settings, LogOut, Sun, Cloud, CloudRain, CloudLightning, Search, RefreshCw, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
export const staticWeatherData = {
    location: "Gotham",
    currentTemp: 14,
    condition: "Mostly Clear",
    pressure: 720,
    humidity: 32,
    windSpeed: 12,
    windDirection: "NE",
    rainChance: 24,
    uvIndex: 2,
    forecast: {
        morning: 15,
        afternoon: 14,
        evening: 16,
        night: 12
    },
    hourlyForecast: [
        { time: "Now", temp: 24, icon: <Sun size={24} /> },
        { time: "01PM", temp: 26, icon: <Sun size={24} /> },
        { time: "02PM", temp: 25, icon: <Sun size={24} /> },
        { time: "03PM", temp: 25, icon: <Cloud size={24} /> },
    ],
    weekForecast: [
        { day: "Tomorrow", date: "12 Apr", temp: 16, icon: <Sun size={24} /> },
        { day: "Monday", date: "13 Apr", temp: 15, icon: <Sun size={24} /> },
        { day: "Tuesday", date: "14 Apr", temp: 14, icon: <Cloud size={24} /> },
        { day: "Wednesday", date: "15 Apr", temp: 14, icon: <Cloud size={24} /> },
        { day: "Thursday", date: "16 Apr", temp: 16, icon: <Sun size={24} /> },
        { day: "Friday", date: "17 Apr", temp: 16, icon: <Sun size={24} /> },
        { day: "Saturday", date: "18 Apr", temp: 12, icon: <CloudLightning size={24} /> }
    ]
};
