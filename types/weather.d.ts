// export interface WeatherData {
//     name: string;
//     main: {
//         temp: number;
//         humidity: number;
//     };
//     weather: {
//         description: string;
//         icon: string;
//     }[];
//     wind: {
//         speed: number;
//     };
// }


export interface WeatherData {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
    weather: Array<{
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
        deg: number;
    };
    visibility: number;
    clouds: {
        all: number;
    };
    sys: {
        sunrise: number;
        sunset: number;
    };
    rain?: {
        '1h': number;
    };
    snow?: {
        '1h': number;
    };
}

export interface Data {
    location: string;
    currentTemp: number;
    condition: string;
    pressure: number;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    rainChance: number;
    uvIndex: number;
    forecast: {
      morning: number;
      afternoon: number;
      evening: number;
      night: number;
    };
    hourlyForecast: Array<{
      time: string;
      temp: number;
      icon: React.ReactNode;
    }>;
    weekForecast: Array<{
      day: string;
      date: string;
      temp: number;
      icon: React.ReactNode;
    }>;
  }
  