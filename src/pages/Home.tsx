import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Building2,
  AlertTriangle,
  HeartPulse,
  MapPin,
  ChevronRight,
  Banknote,
  FileText,
  Droplets,
  Search,
  Calendar,
  Utensils,
  Briefcase,
  Home as HomeIcon,
  Building,
  Phone,
  GraduationCap,
  TreePine,
  Trophy,
  Star,
  TrendingUp,
  ShieldAlert,
  Wind,
  CloudRain
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const quickServices = [
  { id: 1, title: 'Home Loan', icon: Banknote, color: 'text-blue-600', bg: 'bg-blue-50', path: '/home-loan' },
  { id: 2, title: 'Building Plan', icon: Building2, color: 'text-green-600', bg: 'bg-green-50', path: '/building-enquiry' },
  { id: 3, title: 'Emergency', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', path: '/emergency' },
  { id: 4, title: 'Hospitals', icon: HeartPulse, color: 'text-pink-600', bg: 'bg-pink-50', path: '/hospitals' },
  { id: 5, title: 'Schools', icon: GraduationCap, color: 'text-yellow-600', bg: 'bg-yellow-50', path: '/schools' },
  { id: 6, title: 'Colleges', icon: Building, color: 'text-teal-600', bg: 'bg-teal-50', path: '/colleges' },
  { id: 7, title: 'Govt Offices', icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50', path: '/govt-offices' },
  { id: 8, title: 'Parks', icon: TreePine, color: 'text-green-600', bg: 'bg-green-50', path: '/parks' },
  { id: 9, title: 'Sports Places', icon: Trophy, color: 'text-orange-600', bg: 'bg-orange-50', path: '/sports-places' },
  { id: 10, title: 'Notices', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50', path: '/notices' },
  { id: 11, title: 'Blood Donors', icon: Droplets, color: 'text-red-500', bg: 'bg-red-50', path: '/blood-donors' },
  { id: 12, title: 'Explore', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/explore' },
  { id: 13, title: 'Jobs', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50', path: '/jobs' }
];

const featuredServices = [
  { id: 14, title: 'Government Schemes', icon: Building, color: 'from-cyan-600 to-blue-600', path: '/government-schemes', description: 'PMAY, Pension, Scholarships' },
  { id: 15, title: 'Hotels', icon: HomeIcon, color: 'from-orange-500 to-red-500', path: '/hotels', description: 'Stay & Accommodation' },
  { id: 16, title: 'Restaurants', icon: Utensils, color: 'from-pink-500 to-rose-500', path: '/restaurants', description: 'Food & Dining' },
  { id: 17, title: 'Events', icon: Calendar, color: 'from-yellow-500 to-orange-500', path: '/events', description: 'Festivals & Events' },
  { id: 18, title: 'Schools', icon: GraduationCap, color: 'from-yellow-500 to-amber-600', path: '/schools', description: 'Find Schools' },
  { id: 19, title: 'Colleges', icon: Building, color: 'from-teal-500 to-cyan-600', path: '/colleges', description: 'Higher Education' },
  { id: 20, title: 'Parks', icon: TreePine, color: 'from-green-500 to-emerald-600', path: '/parks', description: 'Recreation' },
  { id: 21, title: 'Sports Places', icon: Trophy, color: 'from-orange-500 to-red-600', path: '/sports-places', description: 'Sports & Games' }
];

const popularSearches = [
  { id: 1, text: 'Hospital', icon: HeartPulse },
  { id: 2, text: 'Hotel', icon: HomeIcon },
  { id: 3, text: 'Police', icon: ShieldAlert },
  { id: 4, text: 'College', icon: GraduationCap },
  { id: 5, text: 'Blood Donor', icon: Droplets },
  { id: 6, text: 'Restaurant', icon: Utensils }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touristPlaces, setTouristPlaces] = useState<any[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [notices, setNotices] = useState<any[]>([]);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [heroSlides, setHeroSlides] = useState<any[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (heroSlides.length > 0) {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [heroSlides]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placesRes = await axios.get(`${API_URL}/tourist-places`);
        if (placesRes.data && placesRes.data.length > 0) {
          setTouristPlaces(placesRes.data.slice(0, 4));
        }
        const noticesRes = await axios.get(`${API_URL}/notices`);
        setNotices(noticesRes.data || []);
        const businessesRes = await axios.get(`${API_URL}/businesses`);
        setBusinesses(businessesRes.data.slice(0, 3) || []);
        const slidesRes = await axios.get(`${API_URL}/hero-slides`);
        setHeroSlides(slidesRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=19.08&longitude=83.82&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&timezone=auto');
        const data = response.data;
        
        // Map weather codes to conditions (simplified)
        const weatherCodeConditions: Record<number, { text: string; icon: string }> = {
          0: { text: 'Clear sky', icon: '☀️' },
          1: { text: 'Mainly clear', icon: '🌤️' },
          2: { text: 'Partly cloudy', icon: '⛅' },
          3: { text: 'Overcast', icon: '☁️' },
          45: { text: 'Foggy', icon: '🌫️' },
          48: { text: 'Depositing rime fog', icon: '🌫️' },
          51: { text: 'Light drizzle', icon: '🌧️' },
          53: { text: 'Moderate drizzle', icon: '🌧️' },
          55: { text: 'Dense drizzle', icon: '🌧️' },
          61: { text: 'Slight rain', icon: '🌧️' },
          63: { text: 'Moderate rain', icon: '🌧️' },
          65: { text: 'Heavy rain', icon: '🌧️' },
          71: { text: 'Slight snow', icon: '❄️' },
          73: { text: 'Moderate snow', icon: '❄️' },
          75: { text: 'Heavy snow', icon: '❄️' },
          77: { text: 'Snow grains', icon: '❄️' },
          80: { text: 'Slight rain showers', icon: '🌦️' },
          81: { text: 'Moderate rain showers', icon: '🌦️' },
          82: { text: 'Violent rain showers', icon: '🌦️' },
          85: { text: 'Slight snow showers', icon: '🌨️' },
          86: { text: 'Heavy snow showers', icon: '🌨️' },
          95: { text: 'Thunderstorm', icon: '⛈️' },
          96: { text: 'Thunderstorm with slight hail', icon: '⛈️' },
          99: { text: 'Thunderstorm with heavy hail', icon: '⛈️' }
        };
        
        const weatherCode = data.current.weather_code;
        const condition = weatherCodeConditions[weatherCode] || { text: 'Unknown', icon: '🌤️' };
        
        setWeather({
          location: { name: 'Gunupur', region: 'Odisha' },
          current: {
            temp_c: Math.round(data.current.temperature_2m),
            condition: { text: condition.text, icon: condition.icon },
            humidity: data.current.relative_humidity_2m,
            wind_kph: data.current.wind_speed_10m,
            air_quality: { 'us-epa-index': 2 },
            precip_mm: data.current.precipitation
          }
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeather({
          location: { name: 'Gunupur', region: 'Odisha' },
          current: { 
            temp_c: 28, 
            condition: { text: 'Sunny', icon: '☀️' }, 
            humidity: 65, 
            wind_kph: 12,
            air_quality: { 'us-epa-index': 2 },
            precip_mm: 0
          }
        });
      } finally {
        setLoadingWeather(false);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="space-y-8 py-6 px-4 md:px-0 overflow-hidden">
      <Helmet>
        <title>My Gunupur - Your Gateway to Citizen Services</title>
        <meta name="description" content="My Gunupur - Your one-stop platform for all citizen services in Gunupur, Odisha." />
      </Helmet>

      <div className="max-w-6xl mx-auto relative">
        {/* Floating decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>

        {/* Hero Slider */}
        {heroSlides.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl h-72 md:h-96 lg:h-[500px] mb-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlides[currentSlide]?._id || currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {heroSlides[currentSlide]?.link ? (
                  <a href={heroSlides[currentSlide].link} target="_blank" rel="noopener noreferrer" className="absolute inset-0">
                    <img
                      src={heroSlides[currentSlide].image}
                      alt={heroSlides[currentSlide].title || 'Hero Slide'}
                      className="w-full h-full object-cover"
                    />
                  </a>
                ) : (
                  <img
                    src={heroSlides[currentSlide].image}
                    alt={heroSlides[currentSlide].title || 'Hero Slide'}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                {(heroSlides[currentSlide]?.title || heroSlides[currentSlide]?.subtitle) && (
                  <div className="absolute bottom-8 left-8 right-8 z-10">
                    {heroSlides[currentSlide]?.title && (
                      <h3 className="text-3xl md:text-5xl font-black text-white mb-2">{heroSlides[currentSlide].title}</h3>
                    )}
                    {heroSlides[currentSlide]?.subtitle && (
                      <p className="text-lg md:text-xl text-slate-200 font-semibold">{heroSlides[currentSlide].subtitle}</p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="absolute top-6 right-6 flex gap-2 z-10">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-white shadow-lg' : 'w-2 bg-white/60 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: heroSlides.length > 0 ? 0.2 : 0 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-tr from-[#0b1329] via-[#101b3b] to-[#1c1236] border border-white/5 text-white p-8 md:p-12 mb-6"
        >
          {/* Glowing blur orbs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col items-center text-center mb-8">
              <p className="text-[10px] font-black text-amber-400 uppercase tracking-[0.25em] mb-3">CITIZEN SUPER APP</p>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-[0_4px_12px_rgba(255,255,255,0.05)] bg-gradient-to-b from-white via-slate-100 to-slate-350 bg-clip-text text-transparent">MY GUNUPUR</h1>
              <p className="text-sm text-blue-300/90 font-bold bg-white/5 px-4 py-1.5 rounded-full border border-white/5 shadow-inner flex items-center gap-2 justify-center">
                <MapPin className="w-4 h-4 text-blue-400" /> Gunupur, Rayagada, Odisha
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center flex flex-col justify-center items-center group/stat">
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-1">Population</p>
                <p className="text-3xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent group-hover/stat:scale-110 transition-transform">80K+</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center flex flex-col justify-center items-center group/stat">
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-1">Total Services</p>
                <p className="text-3xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent group-hover/stat:scale-110 transition-transform">25+</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center flex flex-col justify-center items-center group/stat">
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-1">Verified Businesses</p>
                <p className="text-3xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent group-hover/stat:scale-110 transition-transform">350+</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center flex flex-col justify-center items-center group/stat">
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider mb-1">Emergency Help</p>
                <p className="text-3xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent group-hover/stat:scale-110 transition-transform">24×7</p>
              </div>
            </div>
 
            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-45 transition duration-350"></div>
              <div className="relative flex items-center">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400 group-hover:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <input
                  type="text"
                  readOnly
                  placeholder="Search hospitals, schools, hotels, services..."
                  onClick={() => navigate('/services')}
                  className="w-full pl-16 pr-6 py-5 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none cursor-pointer hover:bg-slate-900/90 hover:border-white/20 transition-all duration-300 font-semibold text-lg shadow-inner"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live City Hub & Hotline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-4">
            <span className="w-3 h-12 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full shadow-lg shadow-blue-500/20"></span>
            Live City Hub & Hotline
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Live Weather Card */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => navigate('/weather')}
              className="bg-white border border-slate-150/80 rounded-3xl p-6 shadow-lg relative overflow-hidden flex flex-col justify-between cursor-pointer group hover:shadow-blue-500/5 hover:border-blue-300 transition-all duration-300 min-h-[220px]"
            >
              {/* background glows */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">GUNUPUR LIVE WEATHER</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    {loadingWeather ? (
                      <div className="animate-pulse space-y-2">
                        <div className="h-10 w-20 bg-slate-100 rounded-xl" />
                        <div className="h-4 w-28 bg-slate-100 rounded-lg" />
                      </div>
                    ) : (
                      <>
                        <h3 className="text-5xl font-black text-slate-800 leading-none">
                          {weather?.current?.temp_c ?? 28}°C
                        </h3>
                        <p className="text-sm font-semibold text-slate-500 mt-2">
                          {weather?.current?.condition?.text ?? 'Sunny'}
                        </p>
                      </>
                    )}
                  </div>
                  {weather?.current?.condition && (
                    <span className="text-6xl drop-shadow-sm select-none group-hover:scale-110 transition-transform duration-300">
                      {weather.current.condition.icon}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-6 pt-5 border-t border-slate-100 relative z-10">
                <div className="text-center">
                  <Droplets className="w-4 h-4 text-blue-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <p className="text-[9px] text-slate-400 font-bold">Humidity</p>
                  <p className="text-xs font-extrabold text-slate-700">{weather?.current?.humidity ?? 65}%</p>
                </div>
                <div className="text-center">
                  <Wind className="w-4 h-4 text-cyan-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <p className="text-[9px] text-slate-400 font-bold">Wind</p>
                  <p className="text-xs font-extrabold text-slate-700">{weather?.current?.wind_kph ?? 12} km/h</p>
                </div>
                <div className="text-center">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full mx-auto mb-1 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-[7px] font-black text-white">AQI</span>
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold">AQI</p>
                  <p className="text-xs font-extrabold text-slate-700">{weather?.current?.air_quality?.['us-epa-index'] ?? 2}</p>
                </div>
                <div className="text-center">
                  <CloudRain className="w-4 h-4 text-indigo-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                  <p className="text-[9px] text-slate-400 font-bold">Rain</p>
                  <p className="text-xs font-extrabold text-slate-700">{weather?.current?.precip_mm ?? 0} mm</p>
                </div>
              </div>
            </motion.div>

            {/* SOS Emergency Hotline Card */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-white border border-slate-150/80 rounded-3xl p-6 shadow-lg relative overflow-hidden flex flex-col justify-between group hover:shadow-red-500/5 hover:border-red-300 transition-all duration-300 min-h-[220px]"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-all"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">24/7 SOS EMERGENCY</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <a
                    href="tel:100"
                    className="flex flex-col items-center justify-center p-3 bg-red-50/50 hover:bg-red-500/10 border border-red-100/50 hover:border-red-500/20 text-red-700 rounded-2xl transition-all duration-300 group/btn hover:scale-105"
                  >
                    <ShieldAlert className="w-5 h-5 text-red-650 group-hover/btn:scale-115 transition-transform" />
                    <span className="text-xs font-black text-slate-800 mt-1.5">Police</span>
                    <span className="text-[10px] font-bold text-slate-500 mt-0.5">100</span>
                  </a>
                  <a
                    href="tel:108"
                    className="flex flex-col items-center justify-center p-3 bg-red-50/50 hover:bg-red-500/10 border border-red-100/50 hover:border-red-500/20 text-red-700 rounded-2xl transition-all duration-300 group/btn hover:scale-105"
                  >
                    <HeartPulse className="w-5 h-5 text-red-650 group-hover/btn:scale-115 transition-transform" />
                    <span className="text-xs font-black text-slate-800 mt-1.5">Ambulance</span>
                    <span className="text-[10px] font-bold text-slate-500 mt-0.5">108</span>
                  </a>
                  <a
                    href="tel:101"
                    className="flex flex-col items-center justify-center p-3 bg-red-50/50 hover:bg-red-500/10 border border-red-100/50 hover:border-red-500/20 text-red-700 rounded-2xl transition-all duration-300 group/btn hover:scale-105"
                  >
                    <AlertTriangle className="w-5 h-5 text-red-650 group-hover/btn:scale-115 transition-transform" />
                    <span className="text-xs font-black text-slate-800 mt-1.5">Fire</span>
                    <span className="text-[10px] font-bold text-slate-500 mt-0.5">101</span>
                  </a>
                </div>
              </div>

              <button
                onClick={() => navigate('/emergency')}
                className="w-full mt-5 py-3 bg-slate-50 border border-slate-100 text-slate-700 font-black text-xs rounded-2xl hover:bg-slate-100 hover:border-slate-200 transition-all flex items-center justify-center gap-2 group/all relative z-10"
              >
                View All Emergency Contacts
                <ChevronRight className="w-3.5 h-3.5 group-hover/all:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Swarga Ratha Card */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-white border border-slate-150/80 rounded-3xl p-6 shadow-lg relative overflow-hidden flex flex-col justify-between group hover:shadow-amber-500/5 hover:border-amber-300 transition-all duration-300 min-h-[220px]"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">FREE HEARSE SERVICE</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                      Swarga Ratha
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">ସ୍ୱର୍ଗ ରଥ (Free 24x7 service)</p>
                  </div>
                  <img src="/logo.png" alt="My Gunupur Logo" className="w-10 h-10 object-contain drop-shadow" />
                </div>
                
                <p className="text-[11px] text-slate-550 font-medium leading-relaxed">
                  Dignified hearse van services provided for the citizens of Gunupur. Free service dialers below:
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-5 relative z-10">
                <a
                  href="tel:7735706860"
                  className="flex items-center justify-center gap-2 py-3 bg-amber-50/60 hover:bg-amber-100/80 border border-amber-100/50 hover:border-amber-200 rounded-2xl transition-all duration-300 text-amber-800 hover:scale-103 font-bold text-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  7735706860
                </a>
                <a
                  href="tel:8895186071"
                  className="flex items-center justify-center gap-2 py-3 bg-amber-50/60 hover:bg-amber-100/80 border border-amber-100/50 hover:border-amber-200 rounded-2xl transition-all duration-300 text-amber-800 hover:scale-103 font-bold text-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  8895186071
                </a>
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Quick Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-4">
            <span className="w-3 h-12 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
            Quick Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">
            {quickServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  onClick={() => navigate(service.path)}
                  className="flex flex-col items-center justify-center p-7 bg-white rounded-3xl border border-slate-100 hover:border-slate-200 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.08, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${service.bg}`}>
                    <Icon className={`w-10 h-10 ${service.color}`} />
                  </div>
                  <span className="font-black text-slate-800 mb-2 text-center">{service.title}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Popular Searches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Popular Searches
          </h2>
          <div className="flex flex-wrap gap-3">
            {popularSearches.map((search, index) => {
              const Icon = search.icon;
              return (
                <motion.button
                  key={search.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  onClick={() => {
                    if (search.text === 'Hospital') navigate('/hospitals');
                    else if (search.text === 'Hotel') navigate('/hotels');
                    else if (search.text === 'Blood Donor') navigate('/blood-donors');
                    else if (search.text === 'Restaurant') navigate('/restaurants');
                    else if (search.text === 'College') navigate('/colleges');
                    else if (search.text === 'Police') navigate('/emergency');
                  }}
                  className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span className="font-bold text-slate-700">{search.text}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Updates Ticker */}
        {notices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-10 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-100"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
                <span className="font-black text-amber-800">Latest Updates</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <motion.div
                  animate={{ x: ['100%', '-100%'] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="whitespace-nowrap"
                >
                  {notices.map((notice) => (
                    <span key={notice._id} className="mx-6 font-semibold text-slate-700">
                      • {notice.title}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}



        {/* Top Rated Businesses */}
        {businesses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-4">
              <span className="w-3 h-12 bg-gradient-to-b from-yellow-600 to-amber-600 rounded-full"></span>
              Top Rated Businesses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {businesses.map((business, index) => (
                <motion.div
                  key={business._id || business.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  onClick={() => navigate('/directory')}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-slate-100 cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={business.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'} 
                      alt={business.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-black text-yellow-700">{business.rating || 4.5}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-black text-slate-800">{business.name}</h4>
                    {business.address && (
                      <p className="text-sm text-slate-500 mt-1">{business.address}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* More Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-4">
            <span className="w-3 h-12 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></span>
            More Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {featuredServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  onClick={() => navigate(service.path)}
                  className="flex items-center gap-7 p-9 bg-white rounded-3xl border border-slate-100 hover:border-slate-200 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-white shadow-xl`}>
                    <Icon className="w-10 h-10" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-black text-slate-800 text-xl mb-2">{service.title}</h4>
                    <p className="text-sm text-slate-500 font-semibold">{service.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Explore Gunupur */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-slate-800 flex items-center gap-4">
              <span className="w-3 h-12 bg-gradient-to-b from-pink-600 to-rose-600 rounded-full"></span>
              Explore Gunupur
            </h2>
            <button
              onClick={() => navigate('/explore')}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Explore All <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {touristPlaces.map((place, index) => (
              <motion.div
                key={place._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                onClick={() => navigate('/explore')}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-slate-100 cursor-pointer group"
                whileHover={{ y: -8 }}
              >
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={place.image} alt={place.title} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" />
                </div>
                <div className="p-7">
                  <h4 className="font-black text-slate-800 text-xl mb-3">{place.title}</h4>
                  <p className="text-sm text-slate-500 font-semibold">{place.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>


      </div>
    </div>
  );
};

export default Home;
