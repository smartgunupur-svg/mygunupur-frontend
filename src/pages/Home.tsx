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
  Phone
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
  { id: 1, title: 'Home Loan', icon: Banknote, color: 'text-blue-600', bg: 'bg-blue-50', path: '/home-loan', description: 'Calculate EMI' },
  { id: 2, title: 'Building Plan', icon: Building2, color: 'text-green-600', bg: 'bg-green-50', path: '/building-enquiry', description: 'Plan Assistance' },
  { id: 3, title: 'Emergency', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', path: '/emergency', description: 'Quick Call' },
  { id: 4, title: 'Hospitals', icon: HeartPulse, color: 'text-pink-600', bg: 'bg-pink-50', path: '/hospitals', description: 'Directory' },
  { id: 5, title: 'Notices', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50', path: '/notices', description: 'Updates' },
  { id: 6, title: 'Blood Donors', icon: Droplets, color: 'text-red-500', bg: 'bg-red-50', path: '/blood-donors', description: 'Find Donors' },
  { id: 7, title: 'Explore', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/explore', description: 'Discover' },
  { id: 8, title: 'Jobs', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50', path: '/jobs', description: 'Opportunities' }
];

const featuredServices = [
  { id: 9, title: 'Government Schemes', icon: Building, color: 'from-cyan-600 to-blue-600', path: '/government-schemes', description: 'PMAY, Pension, Scholarships' },
  { id: 10, title: 'Hotels', icon: HomeIcon, color: 'from-orange-500 to-red-500', path: '/hotels', description: 'Stay & Accommodation' },
  { id: 11, title: 'Restaurants', icon: Utensils, color: 'from-pink-500 to-rose-500', path: '/restaurants', description: 'Food & Dining' },
  { id: 12, title: 'Events', icon: Calendar, color: 'from-yellow-500 to-orange-500', path: '/events', description: 'Festivals & Events' }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touristPlaces, setTouristPlaces] = useState<any[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

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
        } else {
          setTouristPlaces([
            { _id: 1, title: 'Jagannath Temple', description: 'Ancient temple with beautiful architecture', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop', googleMap: '#' },
            { _id: 2, title: 'Putudi Waterfall', description: 'Serene waterfall surrounded by nature', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&h=400&fit=crop', googleMap: '#' },
            { _id: 3, title: 'Gunupur College', description: 'Historic educational institution', image: 'https://images.unsplash.com/photo-1562774053-7019393745?w=600&h=400&fit=crop', googleMap: '#' },
            { _id: 4, title: 'Maa Tarini Temple', description: 'Powerful goddess temple', image: 'https://images.unsplash.com/photo-1603302576837-375f9845f315?w=600&h=400&fit=crop', googleMap: '#' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setTouristPlaces([
          { _id: 1, title: 'Jagannath Temple', description: 'Ancient temple with beautiful architecture', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop', googleMap: '#' },
          { _id: 2, title: 'Putudi Waterfall', description: 'Serene waterfall surrounded by nature', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&h=400&fit=crop', googleMap: '#' },
          { _id: 3, title: 'Gunupur College', description: 'Historic educational institution', image: 'https://images.unsplash.com/photo-1562774053-7019393745?w=600&h=400&fit=crop', googleMap: '#' },
          { _id: 4, title: 'Maa Tarini Temple', description: 'Powerful goddess temple', image: 'https://images.unsplash.com/photo-1603302576837-375f9845f315?w=600&h=400&fit=crop', googleMap: '#' }
        ]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('https://api.weatherapi.com/v1/current.json?key=e1b301203ef34fd39d8110550252901&q=19.08,83.82');
        setWeather(response.data);
      } catch (error) {
        setWeather({
          location: { name: 'Gunupur', region: 'Odisha' },
          current: { temp_c: 28, condition: { text: 'Sunny', icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png' }, humidity: 65, wind_kph: 12 }
        });
      } finally {
        setLoadingWeather(false);
      }
    };
    fetchWeather();
  }, []);

  return (
    <div className="space-y-8 py-6 px-4 md:px-0">
      <Helmet>
        <title>My Gunupur - Your Gateway to Citizen Services</title>
        <meta name="description" content="My Gunupur - Your one-stop platform for all citizen services in Gunupur, Odisha." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-8 md:p-12 mb-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <p className="text-sm font-bold text-blue-300 uppercase tracking-wider mb-2">Welcome to</p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">MY GUNUPUR</h1>
              <p className="text-lg text-blue-100 font-semibold mb-8 max-w-2xl">
                A Digital Initiative for a Better Tomorrow. Everything You Need, All In One Place.</p>
              
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <input
                  type="text"
                  readOnly
                  placeholder="Search services, places, businesses..."
                  onClick={() => navigate('/services')}
                  className="w-full pl-12 pr-6 py-4 bg-white/10 border-2xl border-white/10 rounded-xl text-white placeholder-blue-200/80 focus:outline-none cursor-pointer hover:bg-white/20 transition-all duration-300 font-semibold"
                />
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <img src="/layoutlogo.png" alt="My Gunupur" className="w-full h-80 object-contain drop-shadow-2xl" />
            </div>
          </div>
        </motion.div>

        {/* Swarga Ratha */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 md:p-8 text-white shadow-2xl mb-8"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-2">Swarga Ratha</h2>
              <p className="text-xl md:text-2xl font-bold text-amber-100 mb-4">ସ୍ୱର୍ଗ ରଥ</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <a
                href="tel:7735706860"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white text-orange-700 font-black text-xl rounded-2xl hover:shadow-xl transition-all"
              >
                <Phone className="w-7 h-7" />
                7735706860
              </a>
              <a
                href="tel:8895186071"
                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white text-orange-700 font-black text-xl rounded-2xl hover:shadow-xl transition-all"
              >
                <Phone className="w-7 h-7" />
                8895186071
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate('/weather')}
            className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-3xl border-2xl border-slate-100 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-1">GUNUPUR, ODISHA</p>
                {loadingWeather ? (
                  <div className="animate-pulse">
                    <div className="h-12 w-24 bg-slate-200 rounded mb-2" />
                    <div className="h-4 w-32 bg-slate-200 rounded" />
                  </div>
                ) : (
                  <>
                    <h3 className="text-5xl font-black text-slate-800 mb-1">{weather?.current?.temp_c}°C</h3>
                    <p className="text-sm text-slate-600 font-semibold">{weather?.current?.condition?.text}</p>
                  </>
                )}
              </div>
              {weather && (
                <div className="flex flex-col items-center">
                  <img src={weather?.current?.condition?.icon} alt={weather?.current?.condition?.text} className="w-24 h-24" />
                  <span className="text-xs font-bold text-slate-500">H: {weather?.current?.humidity}% | W: {weather?.current?.wind_kph} km/h</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate('/emergency')}
            className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between h-full">
              <div>
                <h3 className="text-3xl font-black mb-2">Emergency</h3>
                <p className="text-sm text-red-100 font-semibold uppercase tracking-wide">Quick Call</p>
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <AlertTriangle className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-2 h-10 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
            Quick Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {quickServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  onClick={() => navigate(service.path)}
                  className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-md ${service.bg}`}>
                    <Icon className={`w-8 h-8 ${service.color}`} />
                  </div>
                  <span className="font-bold text-slate-800 mb-1">{service.title}</span>
                  <span className="text-xs text-slate-500 font-semibold">{service.description}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-64 md:h-80 lg:h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlides[currentSlide].id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <img
                  src={heroSlides[currentSlide].image} alt={heroSlides[currentSlide].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{heroSlides[currentSlide].title}</h3>
                  <p className="text-lg text-slate-200">{heroSlides[currentSlide].subtitle}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute top-6 right-6 flex gap-2 z-10">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/60'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-2 h-10 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></span>
            More Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  onClick={() => navigate(service.path)}
                  className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-slate-100 hover:border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-black text-slate-800 text-lg">{service.title}</h4>
                    <p className="text-sm text-slate-500 font-semibold">{service.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              <span className="w-2 h-10 bg-gradient-to-b from-pink-600 to-rose-600 rounded-full"></span>
              Explore Gunupur
            </h2>
            <button
              onClick={() => navigate('/explore')}
              className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all duration-200"
            >
              View All <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {touristPlaces.map((place, index) => (
              <motion.div
                key={place._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                onClick={() => navigate('/explore')}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl border border-slate-100 cursor-pointer group"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={place.image} alt={place.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h4 className="font-black text-slate-800 text-lg mb-2">{place.title}</h4>
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
