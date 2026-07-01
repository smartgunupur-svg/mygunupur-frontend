import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Home as HomeIcon,
  Building2,
  AlertTriangle,
  HeartPulse,
  Phone,
  ArrowUpRight,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Banknote,
  FileText,
  PhoneCall,
  Sparkles
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
  { id: 1, title: 'Home Loan', description: 'EMI Calculator & Apply', icon: HomeIcon, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', path: '/home-loan' },
  { id: 2, title: 'Building Plan Assistance', description: 'Calculate & Apply', icon: Building2, color: 'from-green-500 to-teal-600', bg: 'bg-green-50', path: '/building-enquiry' },
  { id: 3, title: 'Hospitals', description: 'Nearby Care & Contacts', icon: HeartPulse, color: 'from-pink-500 to-rose-600', bg: 'bg-pink-50', path: '/hospitals' },
  { id: 4, title: 'Emergency Contacts', description: '24/7 Support', icon: AlertTriangle, color: 'from-red-500 to-red-600', bg: 'bg-red-50', path: '/emergency' },
  { id: 5, title: 'Banks', description: 'All Bank Details', icon: Banknote, color: 'from-indigo-500 to-purple-600', bg: 'bg-indigo-50', path: '/home-loan' },
  { id: 6, title: 'Tourist Places', description: 'Explore Now & More', icon: MapPin, color: 'from-green-500 to-emerald-600', bg: 'bg-green-50', path: '#tourist' },
  { id: 7, title: 'Notices', description: 'Latest Updates', icon: FileText, color: 'from-purple-500 to-pink-600', bg: 'bg-purple-50', path: '#' },
  { id: 8, title: 'Contact Us', description: 'Get in Touch', icon: PhoneCall, color: 'from-orange-500 to-amber-600', bg: 'bg-orange-50', path: '/contact' }
];

const whatsappLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.488-.492-.67-.5h-.572c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .162 5.332.162 11.885c0 2.102.553 4.136 1.56 5.943L0 24l6.324-1.659a11.858 11.858 0 005.726 1.467c.003 0 0 0 .004 0 6.557 0 11.886-5.333 11.886-11.885 0-3.173-1.234-6.151-3.475-8.388"/></svg>`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touristPlaces, setTouristPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
        setTouristPlaces(placesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setTouristPlaces([
          { _id: 1, title: 'Jagannath Temple', description: 'Ancient temple with beautiful architecture', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop', googleMap: '#' },
          { _id: 2, title: 'Tumma Waterfall', description: 'Serene waterfall surrounded by nature', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&h=400&fit=crop', googleMap: '#' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-28">
      <Helmet>
        <title>My Gunupur - Your Gateway to Citizen Services</title>
        <meta name="description" content="My Gunupur - Your one-stop platform for all citizen services in Gunupur, Odisha." />
        <meta property="og:title" content="My Gunupur - Your Gateway to Citizen Services" />
        <meta property="og:description" content="My Gunupur - Your one-stop platform for all citizen services in Gunupur, Odisha." />
        <meta property="og:url" content="https://mygunupur.in" />
      </Helmet>

      {/* Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <img src="/layoutlogo.png" alt="My Gunupur" className="h-16 w-auto" />
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigate('/')}
                className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1"
              >
                Home
              </button>
              <button
                onClick={() => navigate('/about')}
                className="text-sm font-semibold text-gray-700 hover:text-blue-600"
              >
                About
              </button>
              <div className="relative group">
                <button className="text-sm font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-1">
                  Services <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <button
                onClick={() => navigate('#explore')}
                className="text-sm font-semibold text-gray-700 hover:text-blue-600"
              >
                Explore
              </button>
              <button
                onClick={() => navigate('#')}
                className="text-sm font-semibold text-gray-700 hover:text-blue-600"
              >
                Notices
              </button>
              <button
                onClick={() => navigate('#')}
                className="text-sm font-semibold text-gray-700 hover:text-blue-600"
              >
                Gallery
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="text-sm font-semibold text-gray-700 hover:text-blue-600"
              >
                Contact
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-6">
        {/* Hero Slider */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="relative h-[450px] md:h-[550px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlides[currentSlide].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <img
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-3xl">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                          <HeartPulse className="w-4 h-4 text-green-400" />
                          <span className="text-white text-sm font-semibold">Welcome to My Gunupur</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                          {heroSlides[currentSlide].title.split(' ').map((word, index) => (
                            <span key={index} className="mr-2">
                              {word === 'Every' || word === 'Citizen' || word === 'Service' ? (
                                <span className="text-green-400">{word}</span>
                              ) : (
                                word
                              )}
                            </span>
                          ))}
                        </h2>
                        <p className="text-gray-200 text-lg md:text-xl mb-8">
                          {heroSlides[currentSlide].subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <button
                            onClick={() => navigate('/')}
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all flex items-center gap-2"
                          >
                            Explore Services <ArrowUpRight className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => navigate('/contact')}
                            className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all flex items-center gap-2"
                          >
                            Contact Us <Phone className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Links on Right Side of Hero */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col gap-4 z-20">
              <motion.a
                href="/emergency"
                whileHover={{ scale: 1.05 }}
                className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100 w-48"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Emergency Contacts</h4>
                    <p className="text-xs text-gray-500">24/7 Support</p>
                  </div>
                </div>
              </motion.a>
              <motion.a
                href="/home-loan"
                whileHover={{ scale: 1.05 }}
                className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100 w-48"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <HomeIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Home Loan</h4>
                    <p className="text-xs text-gray-500">Calculate & Apply</p>
                  </div>
                </div>
              </motion.a>
              <motion.a
                href="/building-enquiry"
                whileHover={{ scale: 1.05 }}
                className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100 w-48"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Building Plan</h4>
                    <p className="text-xs text-gray-500">Assistance Expert Help</p>
                  </div>
                </div>
              </motion.a>
            </div>

            {/* Slider Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all z-20"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all z-20"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>

            {/* Slider Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-10 bg-white' : 'w-3 bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Quick Access Section */}
        <motion.section
          id="services"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="px-6 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-blue-600" /> Quick Access
              </h3>
              <button className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center gap-1">
                View All <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {quickServices.map((service, index) => (
                <motion.button
                  key={service.id}
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => service.path && navigate(service.path)}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-md`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-center">
                    <h4 className="text-sm font-bold text-gray-800">{service.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* EMI Calculator */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100"
            onClick={() => navigate('/home-loan')}
          >
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 mb-4">
              <HomeIcon className="w-10 h-10 text-green-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">EMI Calculator</h4>
            <p className="text-sm text-gray-600 mb-4">Calculate your home loan EMI instantly and plan better.</p>
            <button
              onClick={() => navigate('/home-loan')}
              className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-sm"
            >
              Calculate Now
            </button>
          </motion.div>

          {/* Latest Notices */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100"
          >
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 mb-4">
              <FileText className="w-10 h-10 text-purple-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Latest Notices</h4>
            <p className="text-sm text-gray-600 mb-4">Stay updated with the latest announcements.</p>
            <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold text-sm">
              View Notices
            </button>
          </motion.div>

          {/* Explore Gunupur */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100 overflow-hidden"
          >
            <div className="relative rounded-2xl overflow-hidden mb-4 -m-6 mb-4">
              <img
                src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=300&fit=crop"
                alt="Gunupur"
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Explore Gunupur</h4>
            <p className="text-sm text-gray-600 mb-4">Discover beautiful places, tourist spots and more.</p>
            <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold text-sm">
              Explore Now
            </button>
          </motion.div>

          {/* Emergency Helpline */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100"
            onClick={() => navigate('/emergency')}
          >
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 mb-4">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">Emergency Helpline</h4>
            <p className="text-sm text-gray-600 mb-4">Important numbers at your fingertips.</p>
            <button
              onClick={() => navigate('/emergency')}
              className="w-full py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold text-sm"
            >
              View All Numbers
            </button>
          </motion.div>
        </motion.section>

        {/* Explore Gunupur Section */}
        <motion.section
          id="tourist"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" /> Explore Gunupur
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              ))
            ) : (
              touristPlaces.map((place, index) => (
                <motion.div
                  key={place._id || place.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-gray-800 text-lg mb-2">{place.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{place.description}</p>
                    <button
                      onClick={() => place.googleMap && window.open(place.googleMap, '_blank')}
                      className="text-blue-600 font-semibold text-sm flex items-center gap-1"
                    >
                      View on Map <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="mb-4">
                <img src="/layoutlogo.png" alt="My Gunupur" className="h-16 w-auto" />
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Your one-stop platform for all citizen services in Gunupur, Odisha.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                  <span className="text-white text-sm">📘</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                  <span className="text-white text-sm">📷</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all">
                  <span className="text-white text-sm">🐦</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/home-loan" className="text-slate-300 text-sm hover:text-white transition-all">Home Loan</a></li>
                <li><a href="/building-enquiry" className="text-slate-300 text-sm hover:text-white transition-all">Building Plan</a></li>
                <li><a href="/hospitals" className="text-slate-300 text-sm hover:text-white transition-all">Hospitals</a></li>
                <li><a href="/emergency" className="text-slate-300 text-sm hover:text-white transition-all">Emergency</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-all">Tourist Places</a></li>
                <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-all">Notices</a></li>
                <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-all">Contact Us</a></li>
                <li><a href="#" className="text-slate-300 text-sm hover:text-white transition-all">About Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-4">Contact Info</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-slate-300 text-sm">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>+91 94375 78310</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300 text-sm">
                  <span className="w-4 h-4 text-blue-400 text-center">📧</span>
                  <span>info@mygunupur.in</span>
                </li>
                <li className="flex items-center gap-2 text-slate-300 text-sm">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Gunupur, Odisha</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/admin/login')}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Admin Login
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-slate-400 text-sm">
              © 2024 My Gunupur. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-28 right-5 flex flex-col gap-3 z-40">
        <motion.a
          href="https://wa.me/919437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: whatsappLogo }}
        />
        <motion.a
          href="tel:9437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: 'spring' }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg flex items-center justify-center"
        >
          <Phone className="w-6 h-6 text-white" />
        </motion.a>
      </div>
    </div>
  );
};

export default Home;
