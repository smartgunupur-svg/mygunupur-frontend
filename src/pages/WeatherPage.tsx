import React, { useState, useEffect } from 'react';
import { Droplets, Wind, Thermometer } from 'lucide-react';
import axios from 'axios';

const API_URL = 'https://api.weatherapi.com/v1';
const API_KEY = 'e1b301203ef34fd39d8110550252901';

const WeatherPage: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`${API_URL}/forecast.json?key=${API_KEY}&q=19.08,83.82&days=7`);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="p-4 space-y-6">
        <div className="bg-slate-200 animate-pulse h-64 rounded-3xl" />
        <div className="bg-slate-200 animate-pulse h-72 rounded-3xl" />
      </div>
    );
  }

  const current = weather?.current;
  const location = weather?.location;
  const forecast = weather?.forecast?.forecastday;

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-36 h-36 bg-amber-400/20 rounded-full filter blur-2xl" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="space-y-1">
            <p className="text-xs font-bold text-blue-100 uppercase tracking-wider">{location?.name}, {location?.region}</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">{current?.temp_c}°C</h2>
            <p className="text-sm md:text-lg font-semibold text-blue-100">{current?.condition?.text}</p>
          </div>
          {current?.condition?.icon && (
            <img
              src={current.condition.icon}
              alt={current.condition.text}
              className="w-20 h-20 drop-shadow-md"
            />
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 pt-8 mt-8 border-t border-white/10 text-center">
          <div className="space-y-1">
            <p className="text-[10px] text-blue-200 font-bold uppercase">Humidity</p>
            <div className="flex items-center justify-center gap-1 text-xs font-extrabold">
              <Droplets className="w-3.5 h-3.5 text-blue-300" /> {current?.humidity}%
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-blue-200 font-bold uppercase">Wind</p>
            <div className="flex items-center justify-center gap-1 text-xs font-extrabold">
              <Wind className="w-3.5 h-3.5 text-blue-300" /> {current?.wind_kph} km/h
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-blue-200 font-bold uppercase">Feels Like</p>
            <div className="flex items-center justify-center gap-1 text-xs font-extrabold">
              <Thermometer className="w-3.5 h-3.5 text-blue-300" /> {current?.feelslike_c}°C
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">7-Day Forecast</h3>
        <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm divide-y divide-slate-100">
          {forecast?.map((dayData: any, idx: number) => {
            const date = new Date(dayData.date);
            const dayName = idx === 0 ? 'Today' : 
                             idx === 1 ? 'Tomorrow' : 
                             date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
            return (
              <div key={idx} className="flex items-center justify-between py-3.5 first:pt-1 last:pb-1">
                <span className="text-xs font-bold text-slate-700 w-32">{dayName}</span>
                <div className="flex items-center gap-2 flex-1">
                  {dayData.day.condition.icon && (
                    <img src={dayData.day.condition.icon} alt={dayData.day.condition.text} className="w-8 h-8" />
                  )}
                  <span className="text-xs font-semibold text-slate-500">{dayData.day.condition.text}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-extrabold">
                  <span className="text-slate-800">{dayData.day.maxtemp_c}°</span>
                  <span className="text-slate-400 font-semibold">{dayData.day.mintemp_c}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
