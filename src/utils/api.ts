import { City, WeatherData } from './types';

export const fetchWeatherData = async (city: City): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&daily=temperature_2m_max,temperature_2m_min&forecast_days=1`
  );
  const data = await response.json();

  return {
    city: city.city,
    minTemp: data.daily.temperature_2m_min[0],
    maxTemp: data.daily.temperature_2m_max[0],
    avgTemp: (data.daily.temperature_2m_min[0] + data.daily.temperature_2m_max[0]) / 2,
  };
};
