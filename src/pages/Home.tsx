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

const heroSlides = [
  {
    id: 1,
    title: "One Platform for Every Citizen Service",
    subtitle: "All essential services, information and support, now just a click away.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&h=900&fit=crop"
  },
  {
    id: 2,
    title: "Home Loans Made Easy",
    subtitle: "Calculate your EMI and get the best home loan options from trusted banks.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1600&h=900&fit=crop"
  },
  {
    id: 3,
    title: "Explore the Beauty of Gunupur",
    subtitle: "Discover amazing places, temples and waterfalls in and around Gunupur.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&h=900&fit=crop"
  }
];

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



const counters = [
  { id: 1, value: '25+', label: 'Services', icon: TrendingUp, color: 'from-blue-600 to-indigo-600' },
  { id: 2, value: '300+', label: 'Businesses', icon: Building, color: 'from-green-600 to-emerald-600' },
  { id: 3, value: '18', label: 'Departments', icon: Building2, color: 'from-purple-600 to-pink-600' },
  { id: 4, value: '24×7', label: 'Emergency', icon: AlertTriangle, color: 'from-red-600 to-rose-600' }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touristPlaces, setTouristPlaces] = useState<any[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [notices, setNotices] = useState<any[]>([]);
  const [businesses, setBusinesses] = useState<any[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.weatherapi.com/v1/current.json?key=e1b301203ef34fd39d8110550252901&q=19.08,83.82&aqi=yes');
        setWeather(response.data);
      } catch (error) {
        setWeather({
          location: { name: 'Gunupur', region: 'Odisha' },
          current: { 
            temp_c: 28, 
            condition: { text: 'Sunny', icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png' }, 
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white p-8 md:p-12 mb-6"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex-1">
              <p className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-2">Welcome to</p>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-4">MY GUNUPUR</h1>
              <p className="text-xl text-blue-100 font-semibold mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Gunupur, Rayagada, Odisha
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <p className="text-xs text-blue-200 font-bold mb-1">Population</p>
                  <p className="text-2xl font-black">80K+</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <p className="text-xs text-blue-200 font-bold mb-1">Total Services</p>
                  <p className="text-2xl font-black">25+</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <p className="text-xs text-blue-200 font-bold mb-1">Verified Businesses</p>
                  <p className="text-2xl font-black">350+</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <p className="text-xs text-blue-200 font-bold mb-1">Emergency</p>
                  <p className="text-2xl font-black">24×7</p>
                </div>
              </div>

              <div className="relative max-w-md group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-amber-300 group-hover:scale-110 transition-transform" />
                <input
                  type="text"
                  readOnly
                  placeholder="Search hospitals, schools, hotels, services..."
                  onClick={() => navigate('/services')}
                  className="w-full pl-14 pr-6 py-5 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-blue-100/90 focus:outline-none cursor-pointer hover:bg-white/25 hover:border-white/40 transition-all duration-300 font-semibold text-lg"
                />
              </div>
            </div>

            <motion.div 
              className="w-full md:w-1/3"
              animate={{ 
                y: [0, -10, 0], 
                rotate: [0, 1, 0, -1, 0] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <img src="/layoutlogo.png" alt="My Gunupur" className="w-full h-96 object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.3)]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {counters.map((counter, index) => {
              const Icon = counter.icon;
              return (
                <motion.div
                  key={counter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-3xl p-7 shadow-xl border border-slate-100 text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${counter.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-3xl font-black text-slate-800 mb-1">{counter.value}</p>
                  <p className="text-sm font-bold text-slate-500">{counter.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Swarga Ratha */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 rounded-3xl p-10 md:p-14 text-white shadow-2xl mb-8 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/15 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col items-center gap-8 mb-8">
              <div className="flex items-center gap-8">
                <div className="bg-white/20 backdrop-blur-lg p-4 rounded-3xl border border-white/30 shadow-2xl">
                  <img src="/logo.png" alt="My Gunupur" className="w-32 h-32 object-contain drop-shadow-2xl" />
                </div>
                <div className="text-center">
                  <h2 className="text-5xl md:text-6xl font-black mb-3 drop-shadow-2xl">Swarga Ratha</h2>
                  <p className="text-3xl md:text-4xl font-bold text-yellow-100 mb-4">ସ୍ୱର୍ଗ ରଥ</p>
                  <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/40 shadow-xl">
                    <span className="text-2xl">✨</span>
                    <span className="text-xl font-black tracking-wide">PREMIUM FREE SERVICE FOR EVERYONE</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="tel:7735706860"
                className="group relative flex items-center justify-center gap-4 px-10 py-7 bg-white text-orange-700 font-black text-3xl rounded-3xl shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-amber-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-4">
                  <Phone className="w-10 h-10" />
                  7735706860
                </div>
              </a>
              <a
                href="tel:8895186071"
                className="group relative flex items-center justify-center gap-4 px-10 py-7 bg-white text-orange-700 font-black text-3xl rounded-3xl shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-amber-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-4">
                  <Phone className="w-10 h-10" />
                  8895186071
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Weather and Emergency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onClick={() => navigate('/weather')}
            className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8 rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">GUNUPUR, ODISHA</p>
                {loadingWeather ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-14 w-28 bg-slate-200 rounded-xl" />
                    <div className="h-5 w-36 bg-slate-200 rounded-lg" />
                  </div>
                ) : (
                  <>
                    <h3 className="text-6xl font-black text-slate-800 mb-2">{(weather && weather.current) ? weather.current.temp_c : 28}°C</h3>
                    <p className="text-base text-slate-600 font-semibold">{(weather && weather.current) ? weather.current.condition.text : 'Sunny'}</p>
                  </>
                )}
              </div>
              {weather && weather.current && weather.current.condition && (
                <div className="flex flex-col items-center gap-2">
                  <img src={weather.current.condition.icon} alt={weather.current.condition.text} className="w-28 h-28" />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200">
              <div className="text-center">
                <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <p className="text-xs text-slate-500 font-bold">Humidity</p>
                <p className="text-lg font-black text-slate-700">{(weather && weather.current) ? weather.current.humidity : 65}%</p>
              </div>
              <div className="text-center">
                <Wind className="w-5 h-5 text-cyan-500 mx-auto mb-1" />
                <p className="text-xs text-slate-500 font-bold">Wind</p>
                <p className="text-lg font-black text-slate-700">{(weather && weather.current) ? weather.current.wind_kph : 12} km/h</p>
              </div>
              <div className="text-center">
                <div className="w-5 h-5 bg-green-500 rounded-full mx-auto mb-1 flex items-center justify-center">
                  <span className="text-[8px] font-black text-white">AQI</span>
                </div>
                <p className="text-xs text-slate-500 font-bold">AQI</p>
                <p className="text-lg font-black text-slate-700">{(weather && weather.current && weather.current.air_quality) ? weather.current.air_quality['us-epa-index'] : 2}</p>
              </div>
              <div className="text-center">
                <CloudRain className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                <p className="text-xs text-slate-500 font-bold">Rain</p>
                <p className="text-lg font-black text-slate-700">{(weather && weather.current) ? (weather.current.precip_mm || 0) : 0} mm</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-red-500 via-rose-500 to-pink-600 text-white p-8 rounded-3xl shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-4xl font-black mb-3">Emergency</h3>
                <p className="text-base text-red-100 font-semibold uppercase tracking-wide">Quick SOS</p>
              </div>
              <motion.div 
                className="w-24 h-24 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-md"
                animate={{ 
                  scale: [1, 1.1, 1], 
                  rotate: [0, 5, -5, 0] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <AlertTriangle className="w-12 h-12 text-white" />
              </motion.div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <a
                href="tel:100"
                className="flex flex-col items-center gap-2 p-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl transition-all"
              >
                <ShieldAlert className="w-8 h-8 text-white" />
                <span className="text-sm font-black">Police</span>
                <span className="text-xs font-bold">100</span>
              </a>
              <a
                href="tel:108"
                className="flex flex-col items-center gap-2 p-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl transition-all"
              >
                <HeartPulse className="w-8 h-8 text-white" />
                <span className="text-sm font-black">Ambulance</span>
                <span className="text-xs font-bold">108</span>
              </a>
              <a
                href="tel:101"
                className="flex flex-col items-center gap-2 p-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl transition-all"
              >
                <AlertTriangle className="w-8 h-8 text-white" />
                <span className="text-sm font-black">Fire</span>
                <span className="text-xs font-bold">101</span>
              </a>
            </div>
            <button
              onClick={() => navigate('/emergency')}
              className="w-full mt-5 py-3 bg-white text-red-600 font-black rounded-2xl hover:bg-red-50 transition-all"
            >
              View All Contacts
            </button>
          </motion.div>
        </div>

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

        {/* Image Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-10"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-72 md:h-96 lg:h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlides[currentSlide].id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img
                  src={heroSlides[currentSlide].image} alt={heroSlides[currentSlide].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-3">{heroSlides[currentSlide].title}</h3>
                  <p className="text-xl text-slate-200 font-semibold">{heroSlides[currentSlide].subtitle}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute top-8 right-8 flex gap-3 z-10">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-10 bg-white shadow-lg' : 'w-3 bg-white/60 hover:bg-white/80'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

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
