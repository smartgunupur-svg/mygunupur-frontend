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
  BookOpen,
  MoreHorizontal,
  FileText,
  MessageCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const heroSlides = [
  {
    id: 1,
    title: "Welcome to My Gunupur",
    subtitle: "One Platform for Every Citizen Service",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    cta: "Explore Services",
    path: null
  },
  {
    id: 2,
    title: "Apply for Home Loan",
    subtitle: "Calculate EMI & Get Instant Approval",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=800&fit=crop",
    cta: "Check EMI",
    path: "/home-loan"
  },
  {
    id: 3,
    title: "Explore Gunupur",
    subtitle: "Discover Tourist Places & Local Gems",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=800&fit=crop",
    cta: "Visit Now",
    path: null
  }
];

const quickServices = [
  { id: 1, title: "Home Loan", icon: HomeIcon, color: "from-blue-500 to-blue-600", bg: "bg-blue-50", path: "/home-loan" },
  { id: 2, title: "Building Approval", icon: Building2, color: "from-green-500 to-emerald-600", bg: "bg-green-50", path: "/building-enquiry" },
  { id: 3, title: "Construction Material", icon: Briefcase, color: "from-yellow-500 to-orange-500", bg: "bg-yellow-50", path: "/" },
  { id: 4, title: "Emergency", icon: AlertTriangle, color: "from-red-500 to-red-600", bg: "bg-red-50", path: "/emergency" },
  { id: 5, title: "Hospitals", icon: HeartPulse, color: "from-pink-500 to-rose-600", bg: "bg-pink-50", path: "/" },
  { id: 6, title: "Banks", icon: Banknote, color: "from-indigo-500 to-indigo-600", bg: "bg-indigo-50", path: "/" },
  { id: 7, title: "Notices", icon: BookOpen, color: "from-purple-500 to-purple-600", bg: "bg-purple-50", path: "/" },
  { id: 8, title: "Explore", icon: MapPin, color: "from-teal-500 to-teal-600", bg: "bg-teal-50", path: "/" },
  { id: 9, title: "Contact", icon: MessageSquare, color: "from-orange-500 to-orange-600", bg: "bg-orange-50", path: "/contact" }
];

const emergencyContacts = [
  { id: 1, name: "Police", number: "100", icon: AlertTriangle, color: "from-red-500 to-rose-600" },
  { id: 2, name: "Ambulance", number: "108", icon: HeartPulse, color: "from-pink-500 to-rose-600" },
  { id: 3, name: "Fire Service", number: "101", icon: AlertTriangle, color: "from-orange-500 to-orange-600" },
  { id: 4, name: "Women Helpline", number: "1091", icon: MessageSquare, color: "from-purple-500 to-purple-600" }
];

const popularServices = [
  { id: 1, title: "Home Loan EMI Calculator", desc: "Calculate EMI, check eligibility & apply", color: "from-green-50 to-green-100", icon: HomeIcon, path: "/home-loan" },
  { id: 2, title: "Building Plan Assistance", desc: "Architects, Engineers & Approval Help", color: "from-blue-50 to-blue-100", icon: Building2, path: "/building-enquiry" },
  { id: 3, title: "Government Schemes", desc: "Check eligibility & apply for schemes", color: "from-amber-50 to-amber-100", icon: BookOpen, path: "/" }
];

const banks = [
  { id: 1, name: "Indian Bank", logo: "🏦" },
  { id: 2, name: "UCO Bank", logo: "🏛️" },
  { id: 3, name: "SBI", logo: "🏦" },
  { id: 4, name: "Axis Bank", logo: "🏦" }
];

const touristPlaces = [
  { id: 1, name: "Jagannath Temple", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop", rating: 4.8, distance: "2 km", desc: "Ancient temple with beautiful architecture" },
  { id: 2, name: "Tumma Waterfall", image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&h=400&fit=crop", rating: 4.9, distance: "15 km", desc: "Serene waterfall surrounded by nature" },
  { id: 3, name: "Aska Road View", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop", rating: 4.6, distance: "5 km", desc: "Scenic road with beautiful views" },
  { id: 4, name: "Duduma Waterfall", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop", rating: 4.9, distance: "30 km", desc: "Majestic waterfall in the hills" }
];

const bottomNavItems = [
  { id: 1, icon: HomeIcon, label: "Home", active: true, path: "/" },
  { id: 2, icon: FileText, label: "Services", active: false, path: "/home-loan" },
  { id: 3, icon: Search, label: "Search", active: false, path: "/" },
  { id: 4, icon: Bell, label: "Notices", active: false, path: "/" },
  { id: 5, icon: MoreHorizontal, label: "More", active: false, path: "/" }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeBottomNav, setActiveBottomNav] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 pb-32">
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50"
        style={{ height: '72px' }}
      >
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">⛰️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent leading-tight">My Gunupur</h1>
              <p className="text-xs text-slate-500 font-medium leading-tight">Everything You Need, All in One Place</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all">
              <Bell className="w-6 h-6 text-slate-600" />
            </button>
            <button className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all">
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 space-y-6 pt-4">
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
              placeholder="Search services, hospitals, banks..."
              className="w-full pl-14 pr-14 py-4 rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl shadow-slate-200/50 border border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 placeholder:text-slate-400 text-base"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl hover:shadow-xl hover:shadow-blue-500/30 transition-all">
              <Mic className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>

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
              className={cn("absolute inset-0", index === currentSlide ? "z-10" : "z-0")}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">{slide.title}</h2>
                  <p className="text-slate-200 text-lg mb-6">{slide.subtitle}</p>
                  <button
                    onClick={() => slide.path && navigate(slide.path)}
                    className="px-8 py-3.5 bg-white text-slate-800 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
                  >
                    {slide.cta}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}

          <div className="absolute bottom-5 right-8 z-20 flex gap-2">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-800">Quick Access</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {quickServices.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => service.path && navigate(service.path)}
                className={cn(
                  "flex flex-col items-center gap-2.5 p-3.5 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer",
                  service.bg,
                  "border border-white/50"
                )}
              >
                <div className={cn("w-10 h-10 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-md", service.color)}>
                  <service.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{service.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-800">Emergency Contacts</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -2 }}
                className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100"
              >
                <div className="flex items-start gap-3">
                  <div className={cn("w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm", contact.color)}>
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-sm">{contact.name}</h4>
                    <p className="text-xl font-black text-slate-900 mt-0.5">{contact.number}</p>
                    <p className="text-xs text-green-600 font-semibold mt-1 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Available 24×7
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${contact.number}`}
                  className={cn("mt-3 w-full py-2.5 bg-gradient-to-r text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm", contact.color)}
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-800">Available Banks</h3>
            <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {banks.map((bank, index) => (
              <motion.button
                key={bank.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -2, scale: 1.02 }}
                onClick={() => navigate('/home-loan')}
                className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 text-center"
              >
                <span className="text-4xl mb-2 block">{bank.logo}</span>
                <h4 className="font-bold text-slate-800 text-sm">{bank.name}</h4>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="text-xl font-bold text-slate-800 mb-4">Popular Services</h3>
          <div className="space-y-3">
            {popularServices.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ x: 4 }}
                onClick={() => service.path && navigate(service.path)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 bg-gradient-to-r rounded-2xl shadow-sm hover:shadow-xl transition-all border border-white/50 cursor-pointer",
                  service.color
                )}
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <service.icon className="w-6 h-6 text-slate-700" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-bold text-slate-800">{service.title}</h4>
                  <p className="text-sm text-slate-600">{service.desc}</p>
                </div>
                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-800">Explore Gunupur</h3>
            <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">View All</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory">
            {touristPlaces.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                whileHover={{ y: -2 }}
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
                  <div className="p-4">
                    <h4 className="font-bold text-lg text-slate-800 mb-1">{place.name}</h4>
                    <p className="text-xs text-slate-500 mb-2">{place.desc}</p>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      {place.distance} from center
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-xl hover:shadow-md transition-all text-sm">
                        Open Map
                      </button>
                      <button className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-28 right-4 flex flex-col gap-3 z-40" style={{ bottom: '120px' }}>
        <motion.a
          href="https://wa.me/919437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-[#25D366] rounded-2xl shadow-xl flex items-center justify-center"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </motion.a>
        <motion.a
          href="tel:9437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-blue-600 rounded-2xl shadow-xl flex items-center justify-center"
        >
          <Phone className="w-7 h-7 text-white" />
        </motion.a>
      </div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.2 }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-t-3xl shadow-2xl border-t border-l border-r border-slate-200/50 px-4 py-3">
            <div className="flex items-center justify-around">
              {bottomNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveBottomNav(item.id);
                    if (item.path) navigate(item.path);
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-2.5 rounded-2xl transition-all min-w-[64px]",
                    activeBottomNav === item.id
                      ? "bg-gradient-to-br from-blue-50 to-green-50 text-blue-600"
                      : "text-slate-500 hover:bg-slate-100"
                  )}
                >
                  <item.icon className={cn("w-6 h-6", activeBottomNav === item.id ? "text-blue-600" : "")} />
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
