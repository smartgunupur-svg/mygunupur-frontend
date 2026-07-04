import React from 'react';
import { CloudSun, Sun, CloudRain, Droplets, Wind, Thermometer } from 'lucide-react';

const forecastData = [
  { day: 'Today', tempHigh: 30, tempLow: 22, condition: 'Sunny', icon: Sun, color: 'text-amber-500' },
  { day: 'Tomorrow', tempHigh: 31, tempLow: 23, condition: 'Partly Cloudy', icon: CloudSun, color: 'text-slate-400' },
  { day: 'Wed, 22 May', tempHigh: 29, tempLow: 22, condition: 'Light Rain', icon: CloudRain, color: 'text-blue-400' },
  { day: 'Thu, 23 May', tempHigh: 28, tempLow: 21, condition: 'Rain', icon: CloudRain, color: 'text-blue-500' },
  { day: 'Fri, 24 May', tempHigh: 30, tempLow: 22, condition: 'Sunny', icon: Sun, color: 'text-amber-500' }
];

const WeatherPage: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      {/* Current Weather Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
        {/* Background sun glow */}
        <div className="absolute right-0 top-0 w-36 h-36 bg-amber-400/20 rounded-full filter blur-2xl" />
        
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-xs font-bold text-blue-100 uppercase tracking-wider">Gunupur, Odisha</p>
            <h2 className="text-5xl font-black tracking-tight">28°C</h2>
            <p className="text-sm font-semibold text-blue-100">Partly Cloudy / Sunny</p>
          </div>
          <CloudSun className="w-16 h-16 text-amber-300 drop-shadow-md" />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-2 pt-6 mt-6 border-t border-white/10 text-center">
          <div className="space-y-1">
            <p className="text-[10px] text-blue-200 font-bold uppercase">Humidity</p>
            <div className="flex items-center justify-center gap-1 text-xs font-extrabold">
              <Droplets className="w-3.5 h-3.5 text-blue-300" /> 72%
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-blue-200 font-bold uppercase">Wind</p>
            <div className="flex items-center justify-center gap-1 text-xs font-extrabold">
              <Wind className="w-3.5 h-3.5 text-blue-300" /> 10 km/h
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-blue-200 font-bold uppercase">Feels Like</p>
            <div className="flex items-center justify-center gap-1 text-xs font-extrabold">
              <Thermometer className="w-3.5 h-3.5 text-blue-300" /> 31°C
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">5-Day Forecast</h3>
        <div className="bg-white border border-slate-100 rounded-3xl p-4 shadow-sm divide-y divide-slate-100">
          {forecastData.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="flex items-center justify-between py-3.5 first:pt-1 last:pb-1">
                <span className="text-xs font-bold text-slate-700 w-24">{f.day}</span>
                <div className="flex items-center gap-2 flex-1">
                  <Icon className={`w-5 h-5 ${f.color}`} />
                  <span className="text-xs font-semibold text-slate-500">{f.condition}</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-extrabold">
                  <span className="text-slate-800">{f.tempHigh}°</span>
                  <span className="text-slate-400 font-semibold">{f.tempLow}°</span>
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
