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
  CloudSun,
  Grid
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
  { id: 1, title: 'Home Loan', icon: Banknote, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100/50', path: '/home-loan' },
  { id: 2, title: 'Building Plan', icon: Building2, color: 'text-green-600', bg: 'bg-green-50 border-green-100/50', path: '/building-enquiry' },
  { id: 3, title: 'Emergency', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50 border-red-100/50', path: '/emergency' },
  { id: 4, title: 'Hospitals', icon: HeartPulse, color: 'text-pink-600', bg: 'bg-pink-50 border-pink-100/50', path: '/hospitals' },
  { id: 5, title: 'Notices', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100/50', path: '/notices' },
  { id: 6, title: 'Blood Donors', icon: Droplets, color: 'text-red-500', bg: 'bg-red-50 border-red-100/50', path: '/blood-donors' },
  { id: 7, title: 'Explore', icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100/50', path: '/explore' },
  { id: 8, title: 'More', icon: Grid, color: 'text-slate-600', bg: 'bg-slate-50 border-slate-200/50', path: '/services' }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touristPlaces, setTouristPlaces] = useState<any[]>([]);

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
          setTouristPlaces(placesRes.data.slice(0, 2));
        } else {
          setTouristPlaces([
            { _id: 1, title: 'Jagannath Temple', description: 'Ancient temple with beautiful architecture', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop', googleMap: '#' },
            { _id: 2, title: 'Putudi Waterfall', description: 'Serene waterfall surrounded by nature', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&h=400&fit=crop', googleMap: '#' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setTouristPlaces([
          { _id: 1, title: 'Jagannath Temple', description: 'Ancient temple with beautiful architecture', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop', googleMap: '#' },
          { _id: 2, title: 'Putudi Waterfall', description: 'Serene waterfall surrounded by nature', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&h=400&fit=crop', googleMap: '#' }
        ]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-5 bg-[#f8fafc] pb-24">
      <Helmet>
        <title>My Gunupur - Your Gateway to Citizen Services</title>
        <meta name="description" content="My Gunupur - Your one-stop platform for all citizen services in Gunupur, Odisha." />
      </Helmet>

      {/* Hero Welcome Banner Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-[32px] overflow-hidden shadow-lg bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-6"
      >
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Welcome to</p>
          <h2 className="text-2xl font-black tracking-tight leading-tight">MY GUNUPUR</h2>
          <p className="text-xs text-blue-100/70 font-semibold leading-relaxed">A Digital Initiative for a Better Tomorrow.</p>
        </div>
        <div className="mt-5 relative">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
          <input
            type="text"
            readOnly
            placeholder="Search services, places..."
            onClick={() => navigate('/services')}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-2xl text-xs font-semibold text-white placeholder-blue-200/60 focus:outline-none cursor-pointer hover:bg-white/20 transition-all duration-200"
          />
        </div>
      </motion.div>

      {/* Weather & Emergency Call Row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Weather Card */}
        <div
          onClick={() => navigate('/weather')}
          className="bg-white border border-slate-100 p-4 rounded-[24px] shadow-sm flex items-center justify-between cursor-pointer hover:border-slate-200 transition-all duration-200"
        >
          <div>
            <p className="text-[9px] text-slate-400 font-extrabold uppercase leading-none">Gunupur, Odisha</p>
            <p className="text-lg font-black text-slate-800 mt-1.5 leading-none">28°C</p>
            <p className="text-[9px] text-slate-500 font-bold mt-1 leading-none">Sunny</p>
          </div>
          <CloudSun className="w-8 h-8 text-amber-500" />
        </div>

        {/* Emergency Call Card */}
        <div
          onClick={() => navigate('/emergency')}
          className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-4 rounded-[24px] shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-all duration-200"
        >
          <div>
            <h4 className="text-xs font-black">Emergency</h4>
            <p className="text-[8px] text-red-100 font-semibold mt-0.5 uppercase tracking-wide">One Tap Call</p>
          </div>
          <AlertTriangle className="w-8 h-8 text-white animate-pulse" />
        </div>
      </div>

      {/* Quick Access Services */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Quick Access</h3>
        <div className="grid grid-cols-4 gap-2">
          {quickServices.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => navigate(service.path)}
                className="flex flex-col items-center gap-1.5 p-2 bg-white border border-slate-100 rounded-2xl hover:border-slate-200 transition-all duration-200"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${service.bg.split(' ')[0]} border border-slate-100 shadow-sm`}>
                  <Icon className={`w-5 h-5 ${service.color}`} />
                </div>
                <span className="text-[9px] font-bold text-slate-700 leading-tight text-center truncate w-full">{service.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's Update notices banner */}
      <div
        onClick={() => navigate('/notices')}
        className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="bg-red-500 text-white px-2 py-0.5 rounded-lg text-[9px] font-black uppercase">Today's Update</span>
          <span className="text-xs font-bold text-slate-700">2 New Notices & Updates published</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400" />
      </div>

      {/* Slider Banner Section */}
      <div className="relative rounded-[24px] overflow-hidden shadow-md h-36 bg-slate-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSlides[currentSlide].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <h4 className="text-xs font-extrabold text-white leading-tight">{heroSlides[currentSlide].title}</h4>
              <p className="text-[9px] text-slate-200 mt-0.5 truncate">{heroSlides[currentSlide].subtitle}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        {/* Indicators */}
        <div className="absolute top-3 right-4 flex gap-1 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-4 bg-white' : 'w-1 bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Featured Places */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Featured Places</h3>
          <button
            onClick={() => navigate('/explore')}
            className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider flex items-center gap-0.5 hover:text-blue-700"
          >
            View All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {touristPlaces.map((place) => (
            <div
              key={place._id || place.id}
              onClick={() => navigate('/explore')}
              className="bg-white border border-slate-100 rounded-[20px] overflow-hidden shadow-sm flex flex-col cursor-pointer"
            >
              <div className="h-24 bg-slate-100 relative">
                <img src={place.image} alt={place.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h4 className="text-xs font-extrabold text-slate-800 truncate">{place.title}</h4>
                <p className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">{place.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
