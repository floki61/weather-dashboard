# Weather Dashboard

A modern, responsive weather dashboard built with Next.js, React, and Tailwind CSS.

## Features

- Real-time weather data fetching from OpenWeatherMap API
- Current weather conditions display (temperature, humidity, wind speed, etc.)
- City-based weather search functionality
- Detailed weather information (UV index, visibility, pressure)
- Temperature chart showing daily variations
- Popular cities list with quick access to weather information
- Add/remove cities from the dashboard
- Responsive design for desktop and mobile devices

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- Recharts (for temperature charts)

### Prerequisites

- Node.js (v14 or later)
- npm or yarn


## Project Structure

- `pages/`: Main page components
- `components/`: Reusable React components
  - `Header.tsx`: Navigation and search functionality
  - `WeatherCard.tsx`: Main weather information display
  - `MoreData.tsx`: Additional weather details
  - `Temperature.tsx`: Temperature chart component
  - `VisibilityCard.tsx`: Visibility information
  - `UvIndex.tsx`: UV index display
  - `HumidityCloudiness.tsx`: Humidity and cloudiness information
  - `WindCard.tsx`: Wind speed and direction display
- `lib/`: Utility functions and API calls
  - `weatherApi.ts`: OpenWeatherMap API integration
- `types/`: TypeScript type definitions
  - `weather.ts`: Weather data type definitions
- `styles/`: Global styles and Tailwind CSS configuration

## API Integration

This project uses the OpenWeatherMap API to fetch weather data. To use the API:

1. Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/api).
2. Generate an API key in your account dashboard.
3. Add the API key to your `.env` file as shown in the installation steps.

## Acknowledgements

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)
