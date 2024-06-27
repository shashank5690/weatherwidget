import React from 'react';
import { WeatherData } from '../utils/types';
import Typography from '@mui/material/Typography';

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  avgTemp: number | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, avgTemp }) => {
  if (!weatherData) {
    return <Typography variant="body1">No weather data available</Typography>;
  }

  return (
    <div>
      <Typography variant="h6">Weather Code: {weatherData.weatherCode}</Typography>
      <Typography variant="body1">Min Temperature: {weatherData.minTemp}°C</Typography>
      <Typography variant="body1">Max Temperature: {weatherData.maxTemp}°C</Typography>
      <Typography variant="body1">Average Temperature: {avgTemp}°C</Typography>
    </div>
  );
};

export default WeatherDisplay;
