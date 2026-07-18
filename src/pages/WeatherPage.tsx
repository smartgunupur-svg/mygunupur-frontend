  import React, { useState, useEffect } from 'react';
import { Droplets, Wind, Thermometer, CloudSun, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const WeatherPage: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const weatherCodeDescriptions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Freezing drizzle',
    57: 'Freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Freezing rain',
    67: 'Freezing rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Rain showers',
    81: 'Rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Thunderstorm with heavy hail'
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Gunupur coordinates: 19.08, 83.82
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: 19.08,
            longitude: 83.82,
            current: ['temperature_2m', 'relative_humidity_2m', 'apparent_temperature', 'wind_speed_10m', 'weather_code'],
            daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min'],
            timezone: 'auto',
            forecast_days: 7
          }
        });
        setWeather(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError('Unable to load weather data. Please check your internet connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="p-4 space-y-6">
        <div className="bg-slate-200 animate-pulse h-64 rounded-3xl"></div>
        <div className="bg-slate-200 animate-pulse h-72 rounded-3xl"></div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="p-4">
        <div className="text-center py-12">
          <CloudSun className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <h3 className="font-bold text-slate-700 text-lg mb-2">Weather Unavailable</h3>
          <p className="text-sm text-slate-500">{error || 'Unable to load weather data'}</p>
        </div>
      </div>
    );
  }

  const current = weather.current;
  const forecast = weather.daily || {};
  const forecastDays = forecast.time || [];

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Current Weather Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full filter blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 text-blue-100">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Gunupur, Odisha</span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-6xl md:text-7xl font-black tracking-tight">{Math.round(current.temperature_2m)}°C</h1>
              <p className="text-lg md:text-xl font-semibold text-blue-100 mt-2">
                {weatherCodeDescriptions[current.weather_code] || 'Unknown'}
              </p>
            </div>
            <div className="w-24 h-24 flex items-center justify-center">
              <CloudSun className="w-full h-full text-white/90" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/20">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Droplets className="w-5 h-5 text-blue-200" />
                <span className="text-[10px] text-blue-200 font-bold uppercase">Humidity</span>
              </div>
              <p className="text-2xl font-black">{current.relative_humidity_2m}%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Wind className="w-5 h-5 text-blue-200" />
                <span className="text-[10px] text-blue-200 font-bold uppercase">Wind</span>
              </div>
              <p className="text-2xl font-black">{Math.round(current.wind_speed_10m)} km/h</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Thermometer className="w-5 h-5 text-blue-200" />
                <span className="text-[10px] text-blue-200 font-bold uppercase">Feels Like</span>
              </div>
              <p className="text-2xl font-black">{Math.round(current.apparent_temperature)}°C</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 7-Day Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider px-1">7-Day Forecast</h3>
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
          {forecastDays.map((dateStr: string, idx: number) => {
            const date = new Date(dateStr);
            const dayName = idx === 0 ? 'Today' : 
                           idx === 1 ? 'Tomorrow' : 
                           date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
            const weatherCode = forecast.weather_code?.[idx] || 0;
            const maxTemp = forecast.temperature_2m_max?.[idx];
            const minTemp = forecast.temperature_2m_min?.[idx];
            return (
              <div
                key={idx}
                className={`flex items-center justify-between py-4 ${idx !== forecastDays.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <span className="text-sm font-black text-slate-700 w-28">{dayName}</span>
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <CloudSun className="w-full h-full text-slate-400" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    {weatherCodeDescriptions[weatherCode] || 'Unknown'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-black text-slate-800">{Math.round(maxTemp)}°</span>
                  <span className="font-semibold text-slate-400">{Math.round(minTemp)}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherPage;
