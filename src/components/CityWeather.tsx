import React, { useState, useCallback, useEffect, useMemo } from 'react';
import CitySelector from './CitySelector';
import WeatherDisplay from './WeatherDisplay';
import { fetchWeatherData } from '../utils/api';
import { City, WeatherData } from '../utils/types';
import Typography from '@mui/material/Typography';

const LOCAL_STORAGE_KEY = 'selectedCity';

const CityWeather: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleCitySelect = useCallback(async (city: City) => {
    setSelectedCity(city);
    const data = await fetchWeatherData(city);
    setWeatherData(data);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(city));
  }, []);

  useEffect(() => {
    const savedCity = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedCity) {
      const city = JSON.parse(savedCity) as City;
      setSelectedCity(city);
      fetchWeatherData(city).then(data => setWeatherData(data));
    }
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const updateWeather = async () => {
        const data = await fetchWeatherData(selectedCity);
        setWeatherData(data);
      };
      updateWeather(); // Initial fetch
      const intervalId = setInterval(updateWeather, 600000); // Fetch every 10 minutes
      return () => clearInterval(intervalId); // Clean up on unmount or city change
    }
  }, [selectedCity]);

  const avgTemp = useMemo(() => {
    if (!weatherData) return null;
    return (weatherData.minTemp + weatherData.maxTemp) / 2;
  }, [weatherData]);

  return (
    <>
      <CitySelector onSelectCity={handleCitySelect} />
      {selectedCity && (
        <Typography variant="h6" component="h2">
          {selectedCity.city}
        </Typography>
      )}
      <WeatherDisplay weatherData={weatherData} avgTemp={avgTemp} />
    </>
  );
};

export default CityWeather;
