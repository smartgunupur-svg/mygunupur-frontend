import React, { useState, useEffect } from 'react';
import { Droplets, Wind, Thermometer, CloudSun, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = 'https://api.weatherapi.com/v1';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'e1b301203ef34fd39d8110550252901';

const WeatherPage: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`${API_URL}/forecast.json?key=${API_KEY}&q=19.08,83.82&days=7`);
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
  const location = weather.location;
  const forecast = weather.forecast?.forecastday || [];

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
            <span className="text-xs font-bold uppercase tracking-wider">{location?.name}, {location?.region}</span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-6xl md:text-7xl font-black tracking-tight">{current?.temp_c}°C</h1>
              <p className="text-lg md:text-xl font-semibold text-blue-100 mt-2">{current?.condition?.text}</p>
            </div>
            {current?.condition?.icon && (
              <img
                src={current.condition.icon}
                alt={current.condition.text}
                className="w-24 h-24 drop-shadow-lg"
              />
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-white/20">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Droplets className="w-5 h-5 text-blue-200" />
                <span className="text-[10px] text-blue-200 font-bold uppercase">Humidity</span>
              </div>
              <p className="text-2xl font-black">{current?.humidity}%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Wind className="w-5 h-5 text-blue-200" />
                <span className="text-[10px] text-blue-200 font-bold uppercase">Wind</span>
              </div>
              <p className="text-2xl font-black">{current?.wind_kph} km/h</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Thermometer className="w-5 h-5 text-blue-200" />
                <span className="text-[10px] text-blue-200 font-bold uppercase">Feels Like</span>
              </div>
              <p className="text-2xl font-black">{current?.feelslike_c}°C</p>
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
          {forecast.map((dayData: any, idx: number) => {
            const date = new Date(dayData.date);
            const dayName = idx === 0 ? 'Today' : 
                           idx === 1 ? 'Tomorrow' : 
                           date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
            return (
              <div
                key={idx}
                className={`flex items-center justify-between py-4 ${idx !== forecast.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <span className="text-sm font-black text-slate-700 w-28">{dayName}</span>
                <div className="flex items-center gap-3 flex-1">
                  {dayData.day.condition.icon && (
                    <img
                      src={dayData.day.condition.icon}
                      alt={dayData.day.condition.text}
                      className="w-10 h-10"
                    />
                  )}
                  <span className="text-xs font-semibold text-slate-500">{dayData.day.condition.text}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-black text-slate-800">{dayData.day.maxtemp_c}°</span>
                  <span className="font-semibold text-slate-400">{dayData.day.mintemp_c}°</span>
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
