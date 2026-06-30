import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Mic, 
  Home as HomeIcon, 
  Building2, 
  AlertTriangle, 
  HeartPulse, 
  Banknote, 
  MessageSquare, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Star, 
  Menu, 
  Bell,
  Briefcase,
  BookOpen
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const heroSlides = [
  {
    id: 1,
    title: "Welcome to Gunupur",
    subtitle: "One Platform for Every Citizen Service",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    cta: "Explore Services"
  },
  {
    id: 2,
    title: "Your Home, Your Dreams",
    subtitle: "Calculate EMI & Apply for Home Loans",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
    cta: "EMI Calculator"
  },
  {
    id: 3,
    title: "Explore the Beauty",
    subtitle: "Discover Tourist Places & Nature",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=800&fit=crop",
    cta: "Visit Places"
  }
];

const quickServices = [
  { id: 1, title: "Home Loan", icon: HomeIcon, color: "from-blue-500 to-blue-600", bg: "bg-blue-50", path: "/home-loan" },
  { id: 2, title: "Building Plan", icon: Building2, color: "from-green-500 to-emerald-600", bg: "bg-green-50", path: "/building-enquiry" },
  { id: 3, title: "Emergency", icon: AlertTriangle, color: "from-red-500 to-rose-600", bg: "bg-red-50", path: "/emergency" },
  { id: 4, title: "Hospitals", icon: HeartPulse, color: "from-blue-400 to-indigo-600", bg: "bg-blue-50", path: "/" },
  { id: 5, title: "Jobs", icon: Briefcase, color: "from-amber-500 to-orange-600", bg: "bg-amber-50", path: "/" },
  { id: 6, title: "Complaints", icon: MessageSquare, color: "from-purple-500 to-violet-600", bg: "bg-purple-50", path: "/contact" },
  { id: 7, title: "Schemes", icon: BookOpen, color: "from-pink-500 to-fuchsia-600", bg: "bg-pink-50", path: "/" },
  { id: 8, title: "Directory", icon: Banknote, color: "from-teal-500 to-cyan-600", bg: "bg-teal-50", path: "/" }
];

const emergencyContacts = [
  { id: 1, name: "Police", number: "100", icon: AlertTriangle, color: "bg-red-100 text-red-600" },
  { id: 2, name: "Ambulance", number: "108", icon: HeartPulse, color: "bg-red-100 text-red-600" },
  { id: 3, name: "Fire Service", number: "101", icon: AlertTriangle, color: "bg-orange-100 text-orange-600" },
  { id: 4, name: "Women Helpline", number: "1091", icon: MessageSquare, color: "bg-purple-100 text-purple-600" }
];

const popularServices = [
  { id: 1, title: "Home Loan EMI Calculator", desc: "Calculate EMI, check eligibility & apply", color: "from-green-50 to-green-100", icon: HomeIcon, path: "/home-loan" },
  { id: 2, title: "Building Plan Assistance", desc: "Architects, Engineers & Approval Help", color: "from-blue-50 to-blue-100", icon: Building2, path: "/" },
  { id: 3, title: "Government Schemes", desc: "Check eligibility & apply for schemes", color: "from-amber-50 to-amber-100", icon: BookOpen, path: "/" }
];

const touristPlaces = [
  { id: 1, name: "Jagannath Temple", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=300&fit=crop", rating: 4.8, distance: "2 km" },
  { id: 2, name: "Tumma Waterfall", image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400&h=300&fit=crop", rating: 4.9, distance: "15 km" },
  { id: 3, name: "Aska Road View", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop", rating: 4.6, distance: "5 km" },
  { id: 4, name: "Duduma Waterfall", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop", rating: 4.9, distance: "30 km" }
];

const bottomNavItems = [
  { id: 1, icon: HomeIcon, label: "Home", active: true, path: "/" },
  { id: 2, icon: Building2, label: "Services", active: false, path: "/home-loan" },
  { id: 3, icon: Search, label: "Search", active: false, path: "/" },
  { id: 4, icon: BookOpen, label: "Notices", active: false, path: "/" },
  { id: 5, icon: MapPin, label: "Profile", active: false, path: "/" }
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeBottomNav, setActiveBottomNav] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Sticky Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 glass shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">⛰️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">My Gunupur</h1>
                <p className="text-xs text-slate-500 font-medium">Everything You Need, All in One Place</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 hover:bg-slate-100 rounded-2xl transition-all">
                <Bell className="w-6 h-6 text-slate-600" />
              </button>
              <button className="p-3 hover:bg-slate-100 rounded-2xl transition-all">
                <Menu className="w-6 h-6 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search services, contacts, places..."
              className="w-full pl-14 pr-14 py-5 rounded-3xl bg-white shadow-lg shadow-slate-200/50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 placeholder:text-slate-400"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl hover:shadow-lg hover:shadow-blue-500/30 transition-all">
              <Mic className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>

        {/* Hero Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video"
        >
          {heroSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className={cn(
                "absolute inset-0",
                index === currentSlide ? "z-10" : "z-0"
              )}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <p className="text-blue-200 font-semibold mb-2 tracking-wide">Welcome to</p>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">{slide.title}</h2>
                  <p className="text-slate-200 text-lg mb-6">{slide.subtitle}</p>
                  <button className="px-8 py-4 bg-white text-slate-800 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2">
                    {slide.cta}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
          
          {/* Slider Indicators */}
          <div className="absolute bottom-4 right-8 z-20 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentSlide ? "w-10 bg-white" : "w-3 bg-white/40 hover:bg-white/60"
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
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Quick Access</h3>
            <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">View All</button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {quickServices.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => service.path && navigate(service.path)}
                className={cn(
                  "flex flex-col items-center gap-3 p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer",
                  service.bg,
                  "border border-white/50"
                )}
              >
                <div className={cn("w-14 h-14 bg-gradient-to-br rounded-2xl flex items-center justify-center shadow-lg", service.color)}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-semibold text-slate-700 text-center">{service.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Emergency Contacts</h3>
            <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">View All</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-5 shadow-lg border border-slate-100"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center", contact.color)}>
                    <contact.icon className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-slate-800">{contact.name}</h4>
                    <p className="text-2xl font-black text-red-600 mt-1">{contact.number}</p>
                    <p className="text-xs text-green-600 font-semibold mt-2">● 24×7 Available</p>
                  </div>
                  <a
                    href={`tel:${contact.number}`}
                    className="w-full py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-red-500/30 transition-all"
                  >
                    Call Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Popular Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xl font-bold text-slate-800 mb-6">Popular Services</h3>
          <div className="space-y-4">
            {popularServices.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ x: 8 }}
                onClick={() => service.path && navigate(service.path)}
                className={cn(
                  "w-full flex items-center gap-4 p-5 bg-gradient-to-r rounded-3xl shadow-sm hover:shadow-xl transition-all border border-white/50 cursor-pointer",
                  service.color
                )}
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <service.icon className="w-7 h-7 text-slate-700" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-slate-800">{service.title}</h4>
                  <p className="text-sm text-slate-600">{service.desc}</p>
                </div>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <ChevronRight className="w-5 h-5 text-slate-500" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Explore Gunupur */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">Explore Gunupur</h3>
            <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">View All</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
            {touristPlaces.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex-shrink-0 w-72 snap-start"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
                  <div className="relative aspect-[4/3]">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-slate-800">{place.rating}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-lg text-slate-800 mb-1">{place.name}</h4>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mb-4">
                      <MapPin className="w-4 h-4" />
                      {place.distance} from center
                    </p>
                    <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-2xl hover:shadow-lg transition-all">
                      View on Map
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-28 right-4 flex flex-col gap-3 z-40">
        <motion.a
          href="https://wa.me/911234567890"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-green-500 rounded-2xl shadow-xl flex items-center justify-center"
        >
          <span className="text-white text-2xl">💬</span>
        </motion.a>
        <motion.a
          href="tel:100"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-red-500 rounded-2xl shadow-xl flex items-center justify-center"
        >
          <Phone className="w-7 h-7 text-white" />
        </motion.a>
      </div>

      {/* Bottom Navigation */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.1 }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="glass bg-white/90 rounded-t-3xl shadow-2xl border-t border-l border-r border-slate-200/50 px-6 py-4">
            <div className="flex items-center justify-between">
              {bottomNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveBottomNav(item.id);
                  if (item.path) navigate(item.path);
                }}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 rounded-2xl transition-all",
                  activeBottomNav === item.id 
                    ? "bg-gradient-to-br from-blue-50 to-green-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-100"
                )}
              >
                <item.icon className={cn("w-7 h-7", activeBottomNav === item.id ? "text-blue-600" : "")} />
                <span className={cn("text-xs font-semibold", activeBottomNav === item.id ? "text-blue-600" : "")}>{item.label}</span>
              </button>
            ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
