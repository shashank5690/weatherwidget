import React, { useState, useCallback, useEffect } from 'react';
import CitySelector from './components/CitySelector';
import WeatherDisplay from './components/WeatherDisplay';
import { fetchWeatherData } from './utils/api';
import { City, WeatherData } from './utils/types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleCitySelect = useCallback(async (city: City) => {
    setSelectedCity(city);
    const data = await fetchWeatherData(city);
    setWeatherData(data);
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const updateWeather = async () => {
        const data = await fetchWeatherData(selectedCity);
        setWeatherData(data);
      };

      updateWeather();

      const intervalId = setInterval(updateWeather, 600000); // 600000 ms = 10 minutes

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [selectedCity]);

  return (
    <Container maxWidth="sm">
      <Box my={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Weather App
        </Typography>
        <CitySelector onSelectCity={handleCitySelect} />
        {selectedCity && (
          <Typography variant="h6" component="h2">
            {selectedCity.city}
          </Typography>
        )}
        <WeatherDisplay weatherData={weatherData} />
      </Box>
    </Container>
  );
};

export default App;
