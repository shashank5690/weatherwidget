import React from 'react';
import { WeatherData } from '../utils/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface Props {
  weatherData: WeatherData | null;
}

const WeatherDisplay: React.FC<Props> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 345, margin: 'auto', mt: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {weatherData.city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Min Temp: {weatherData.minTemp}°C
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Max Temp: {weatherData.maxTemp}°C
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Avg Temp: {weatherData.avgTemp}°C
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
