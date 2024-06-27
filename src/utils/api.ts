import { City, WeatherData } from './types';

export const fetchWeatherData = async (city: City): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=1`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    if (!data || !data.daily || !data.daily.temperature_2m_min || !data.daily.temperature_2m_max) {
      throw new Error('Invalid data format received');
    }

    return {
      city: city.city,
      weatherCode: data.daily.weather_code[0],
      minTemp: data.daily.temperature_2m_min[0],
      maxTemp: data.daily.temperature_2m_max[0],
      avgTemp: (data.daily.temperature_2m_min[0] + data.daily.temperature_2m_max[0]) / 2,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
