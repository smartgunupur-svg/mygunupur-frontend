import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon,
  Building2,
  AlertTriangle,
  HeartPulse,
  Briefcase,
  MessageSquare,
  Phone,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const heroSlides = [
  {
    id: 1,
    title: "Welcome to My Gunupur",
    subtitle: "Your Gateway to Every Citizen Service",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop",
    cta: "Explore Services",
    path: null
  },
  {
    id: 2,
    title: "Home Loan Made Easy",
    subtitle: "Calculate EMI & Apply in Minutes",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&h=800&fit=crop",
    cta: "Calculate Now",
    path: "/home-loan"
  },
  {
    id: 3,
    title: "Discover Gunupur",
    subtitle: "Explore the Beauty of Our Town",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=800&fit=crop",
    cta: "Explore Places",
    path: null
  }
];

const quickServices = [
  { id: 1, title: "Home Loan", icon: HomeIcon, color: "from-blue-500 to-blue-600", bg: "bg-blue-50", path: "/home-loan" },
  { id: 2, title: "Building Approval", icon: Building2, color: "from-green-500 to-emerald-600", bg: "bg-green-50", path: "/building-enquiry" },
  { id: 3, title: "Construction Material", icon: Briefcase, color: "from-amber-500 to-orange-600", bg: "bg-amber-50", path: "/construction-material" },
  { id: 4, title: "Emergency", icon: AlertTriangle, color: "from-red-500 to-red-600", bg: "bg-red-50", path: "/emergency" },
  { id: 5, title: "Hospitals", icon: HeartPulse, color: "from-pink-500 to-rose-600", bg: "bg-pink-50", path: "/hospitals" },
  { id: 6, title: "Contact", icon: MessageSquare, color: "from-teal-500 to-teal-600", bg: "bg-teal-50", path: "/contact" }
];

const whatsappLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-7 h-7">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.488-.492-.67-.5h-.572c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .162 5.332.162 11.885c0 2.102.553 4.136 1.56 5.943L0 24l6.324-1.659a11.858 11.858 0 005.726 1.467c.003 0 0 0 .004 0 6.557 0 11.886-5.333 11.886-11.885 0-3.173-1.234-6.151-3.475-8.388"/>
</svg>`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emergencyContacts, setEmergencyContacts] = useState<any[]>([]);
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
        const [contactsRes, placesRes] = await Promise.all([
          axios.get(`${API_URL}/emergency-contacts`),
          axios.get(`${API_URL}/tourist-places`)
        ]);
        setEmergencyContacts(contactsRes.data);
        setTouristPlaces(placesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback data
        setEmergencyContacts([
          { id: 1, category: "Police", name: "Police", phone: "100" },
          { id: 2, category: "Ambulance", name: "Ambulance", phone: "108" },
          { id: 3, category: "Fire", name: "Fire Service", phone: "101" },
          { id: 4, category: "Women", name: "Women Helpline", phone: "1091" }
        ]);
        setTouristPlaces([
          { _id: 1, title: "Jagannath Temple", description: "Ancient temple with beautiful architecture", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop" },
          { _id: 2, title: "Tumma Waterfall", description: "Serene waterfall surrounded by nature", image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&h=400&fit=crop" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50 pb-20">
      {/* Header */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/85 backdrop-blur-2xl border-b border-white/30 shadow-sm"
        style={{ height: '72px' }}
      >
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-blue-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/20">
              <span className="text-white text-2xl font-bold">⛰️</span>
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-emerald-700 via-blue-700 to-teal-700 bg-clip-text text-transparent leading-tight">My Gunupur</h1>
              <p className="text-xs font-semibold text-slate-500">Your Gateway to Gunupur's Services</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 space-y-7 pt-6">
        {/* Hero Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10 aspect-[4/3] md:aspect-[16/9]"
        >
          {heroSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className={cn("absolute inset-0", index === currentSlide ? "z-10" : "z-0")}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                >
                  <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold text-white mb-4 border border-white/20">
                    ✨ Welcome
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight">{slide.title}</h2>
                  <p className="text-slate-200 text-lg md:text-xl mb-8 max-w-xl">{slide.subtitle}</p>
                  <button
                    onClick={() => slide.path && navigate(slide.path)}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black rounded-2xl shadow-2xl shadow-emerald-500/40 hover:shadow-3xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2 text-lg"
                  >
                    {slide.cta}
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-8 z-20 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  index === currentSlide 
                    ? "w-12 bg-white shadow-lg" 
                    : "w-5 bg-white/40 hover:bg-white/70"
                )}
              />
            ))}
          </div>
        </motion.div>

        {/* Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full" />
              <h3 className="text-xl font-black text-slate-800">Quick Access</h3>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {quickServices.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.08, type: "spring" }}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => service.path && navigate(service.path)}
                className={cn(
                  "flex flex-col items-center gap-3 p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group",
                  service.bg,
                  "border border-white/60"
                )}
              >
                <div className={cn(
                  "w-12 h-12 bg-gradient-to-br rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110",
                  service.color
                )}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-black text-slate-700 text-center leading-tight">{service.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-rose-600 rounded-full" />
              <h3 className="text-xl font-black text-slate-800">Emergency Contacts</h3>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {loading ? (
              [1,2,3,4].map((i) => (
                <div key={i} className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-5 shadow-xl border border-slate-100 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-slate-200 rounded-2xl"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-slate-200 rounded w-2/3 mb-2"></div>
                      <div className="h-8 bg-slate-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              emergencyContacts.map((contact, index) => (
                <motion.a
                  key={contact._id || contact.id}
                  href={`tel:${contact.phone}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-5 shadow-xl hover:shadow-2xl border border-slate-100 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg from-red-500 to-rose-600">
                      <AlertTriangle className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-slate-800 text-base">{contact.name}</h4>
                      <p className="text-2xl font-black text-slate-900 mt-1">{contact.phone}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                        <p className="text-xs font-bold text-green-600">Available 24×7</p>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))
            )}
          </div>
        </motion.div>

        {/* Explore Gunupur */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
              <h3 className="text-xl font-black text-slate-800">Explore Gunupur</h3>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
            {loading ? (
              [1,2,3].map((i) => (
                <div key={i} className="flex-shrink-0 w-80 snap-start">
                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 animate-pulse">
                    <div className="relative aspect-[4/3] bg-slate-200"></div>
                    <div className="p-5">
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                      <div className="flex gap-2">
                        <div className="flex-1 h-12 bg-slate-200 rounded-2xl"></div>
                        <div className="w-20 h-12 bg-slate-200 rounded-2xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              touristPlaces.map((place, index) => (
                <motion.div
                  key={place._id || place.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.12, type: "spring" }}
                  whileHover={{ y: -6 }}
                  className="flex-shrink-0 w-80 snap-start"
                >
                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={place.image}
                        alt={place.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-2xl font-black text-white drop-shadow-lg">{place.title}</h4>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-slate-600 mb-3">{place.description}</p>
                      <div className="flex gap-2">
                        {place.googleMap && (
                          <button
                            onClick={() => window.open(place.googleMap, '_blank')}
                            className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black rounded-2xl hover:shadow-xl hover:shadow-emerald-500/40 transition-all text-sm flex items-center justify-center gap-2"
                          >
                            <MapPin className="w-4 h-4" />
                            Open Map
                          </button>
                        )}
                        <button className="px-5 py-3 bg-slate-100 text-slate-700 font-black rounded-2xl hover:bg-slate-200 transition-all text-sm">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-5 flex flex-col gap-4 z-40">
        <motion.a
          href="https://wa.me/919437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-[#25D366] rounded-3xl shadow-2xl shadow-[#25D366]/40 flex items-center justify-center hover:shadow-[#25D366]/60 transition-all duration-300"
          dangerouslySetInnerHTML={{ __html: whatsappLogo }}
        />
        <motion.a
          href="tel:9437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: "spring" }}
          whileHover={{ scale: 1.15, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shadow-2xl shadow-blue-500/40 flex items-center justify-center hover:shadow-blue-500/60 transition-all duration-300"
        >
          <Phone className="w-8 h-8 text-white" />
        </motion.a>
      </div>

      {/* Simplified Bottom Nav */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.1, type: "spring" }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white/95 backdrop-blur-2xl rounded-t-3xl shadow-2xl border-t border-l border-r border-white/50 px-6 py-4">
            <div className="flex items-center justify-around gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex flex-col items-center gap-2 px-4 py-2 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 rounded-2xl transition-all"
              >
                <HomeIcon className="w-7 h-7" />
                <span className="text-xs font-black">Home</span>
              </button>
              <button
                onClick={() => navigate('/home-loan')}
                className="flex flex-col items-center gap-2 px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-2xl transition-all"
              >
                <HomeIcon className="w-7 h-7" />
                <span className="text-xs font-semibold">Loan</span>
              </button>
              <button
                onClick={() => navigate('/building-enquiry')}
                className="flex flex-col items-center gap-2 px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-2xl transition-all"
              >
                <Building2 className="w-7 h-7" />
                <span className="text-xs font-semibold">Building</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
