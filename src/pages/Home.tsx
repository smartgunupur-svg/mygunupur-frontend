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
  Trophy
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
  { id: 5, title: 'Schools', icon: GraduationCap, color: 'text-yellow-600', bg: 'bg-yellow-50', path: '/schools', description: 'Find Schools' },
  { id: 6, title: 'Colleges', icon: Building, color: 'text-teal-600', bg: 'bg-teal-50', path: '/colleges', description: 'Higher Education' },
  { id: 7, title: 'Govt Offices', icon: Building2, color: 'text-purple-600', bg: 'bg-purple-50', path: '/govt-offices', description: 'Govt Services' },
  { id: 8, title: 'Parks', icon: TreePine, color: 'text-green-600', bg: 'bg-green-50', path: '/parks', description: 'Recreation' },
  { id: 9, title: 'Sports Places', icon: Trophy, color: 'text-orange-600', bg: 'bg-orange-50', path: '/sports-places', description: 'Sports & Games' },
  { id: 10, title: 'Notices', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50', path: '/notices', description: 'Updates' },
  { id: 11, title: 'Blood Donors', icon: Droplets, color: 'text-red-500', bg: 'bg-red-50', path: '/blood-donors', description: 'Find Donors' },
  { id: 12, title: 'Explore', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/explore', description: 'Discover' },
  { id: 13, title: 'Jobs', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50', path: '/jobs', description: 'Opportunities' }
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
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
              <p className="text-xl text-blue-100 font-semibold mb-8 max-w-2xl">
                A Digital Initiative for a Better Tomorrow. Everything You Need, All In One Place.</p>
              
              <div className="relative max-w-md group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-amber-300 group-hover:scale-110 transition-transform" />
                <input
                  type="text"
                  readOnly
                  placeholder="Search services, places, businesses..."
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

        {/* Swarga Ratha */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl p-8 md:p-10 text-white shadow-2xl mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-200 via-transparent to-transparent"></div>
          </div>
          <div className="flex flex-col items-center gap-6 relative z-10">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-2">Swarga Ratha</h2>
              <p className="text-2xl md:text-3xl font-bold text-amber-100 mb-6">ସ୍ୱର୍ଗ ରଥ</p>
            </div>
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <a
                href="tel:7735706860"
                className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-white text-orange-700 font-black text-2xl rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Phone className="w-8 h-8" />
                7735706860
              </a>
              <a
                href="tel:8895186071"
                className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-white text-orange-700 font-black text-2xl rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Phone className="w-8 h-8" />
                8895186071
              </a>
            </div>
          </div>
        </motion.div>

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
                    <h3 className="text-6xl font-black text-slate-800 mb-2">{weather?.current?.temp_c}°C</h3>
                    <p className="text-base text-slate-600 font-semibold">{weather?.current?.condition?.text}</p>
                  </>
                )}
              </div>
              {weather && (
                <div className="flex flex-col items-center gap-2">
                  <img src={weather?.current?.condition?.icon} alt={weather?.current?.condition?.text} className="w-28 h-28" />
                  <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full">H: {weather?.current?.humidity}% | W: {weather?.current?.wind_kph} km/h</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onClick={() => navigate('/emergency')}
            className="bg-gradient-to-br from-red-500 via-rose-500 to-pink-600 text-white p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between h-full">
              <div>
                <h3 className="text-4xl font-black mb-3">Emergency</h3>
                <p className="text-base text-red-100 font-semibold uppercase tracking-wide">Quick Call</p>
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
          </motion.div>
        </div>

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
                  <span className="text-xs text-slate-500 font-semibold text-center">{service.description}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

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
              className="flex items-center gap-3 px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all duration-300 hover:scale-105"
            >
              View All <ChevronRight className="w-6 h-6" />
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
