import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  LayoutGrid,
  Compass,
  BookOpen,
  Menu,
  X,
  Phone,
  Droplets,
  Building2,
  HeartPulse,
  AlertTriangle,
  FileText,
  HelpCircle,
  Calendar,
  Image,
  CloudSun,
  Briefcase,
  MessageSquare,
  Info,
  UserCheck,
  Building,
  Utensils,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';



const BottomNavLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API_URL}/settings`);
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        setSettings({
          features: {
            homeLoan: true,
            buildingPlan: true,
            emergency: true,
            hospitals: true,
            bloodDonors: true,
            touristPlaces: true,
            notices: true,
            hotels: true,
            restaurants: true,
            importantContacts: true,
            events: true,
            gallery: true,
            weather: true,
            jobs: true,
            businesses: true,
            governmentSchemes: true,
            about: true,
            contact: true
          }
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const currentPath = location.pathname;
  const isHome = currentPath === '/';

  // Define the menu links for the drawer with visibility controlled by settings
  const getDrawerLinks = () => {
    const links: any[] = [
      { name: 'Home', path: '/', icon: Home, color: 'text-blue-500', visible: true },
      { name: 'All Services', path: '/services', icon: LayoutGrid, color: 'text-indigo-500', visible: true },
      { name: 'Explore Gunupur', path: '/explore', icon: Compass, color: 'text-green-500', visible: settings?.features?.touristPlaces },
      { name: 'Business Directory', path: '/directory', icon: BookOpen, color: 'text-amber-500', visible: settings?.features?.businesses },
      { name: 'Emergency Contacts', path: '/emergency', icon: AlertTriangle, color: 'text-red-500', visible: settings?.features?.emergency },
      { name: 'Hospitals', path: '/hospitals', icon: HeartPulse, color: 'text-rose-500', visible: settings?.features?.hospitals },
      { name: 'Blood Donors', path: '/blood-donors', icon: Droplets, color: 'text-red-600', visible: settings?.features?.bloodDonors },
      { name: 'Government Schemes', path: '/government-schemes', icon: Building, color: 'text-cyan-500', visible: settings?.features?.governmentSchemes },
      { name: 'Notices & Updates', path: '/notices', icon: FileText, color: 'text-purple-500', visible: settings?.features?.notices },
      { name: 'Home Loan EMI', path: '/home-loan', icon: Building2, color: 'text-teal-500', visible: settings?.features?.homeLoan },
      { name: 'Building Plan', path: '/building-enquiry', icon: HelpCircle, color: 'text-emerald-500', visible: settings?.features?.buildingPlan },
      { name: 'Hotels', path: '/hotels', icon: Home, color: 'text-orange-500', visible: settings?.features?.hotels },
      { name: 'Restaurants', path: '/restaurants', icon: Utensils, color: 'text-pink-600', visible: settings?.features?.restaurants },
      { name: 'Important Contacts', path: '/important-contacts', icon: Phone, color: 'text-slate-500', visible: settings?.features?.importantContacts },
      { name: 'Events & Festivals', path: '/events', icon: Calendar, color: 'text-yellow-500', visible: settings?.features?.events },
      { name: 'Gallery', path: '/gallery', icon: Image, color: 'text-sky-500', visible: settings?.features?.gallery },
      { name: 'Weather', path: '/weather', icon: CloudSun, color: 'text-yellow-600', visible: settings?.features?.weather },
      { name: 'Jobs & Hiring', path: '/jobs', icon: Briefcase, color: 'text-indigo-600', visible: settings?.features?.jobs },
      { name: 'Feedback & Contact', path: '/feedback', icon: MessageSquare, color: 'text-pink-500', visible: settings?.features?.contact },
      { name: 'About Us', path: '/about', icon: Info, color: 'text-slate-600', visible: settings?.features?.about },
      { name: 'Admin Panel', path: '/admin/login', icon: UserCheck, color: 'text-slate-800', visible: true }
    ];
    return links.filter(link => link.visible);
  };

  const handleLinkClick = (path: string) => {
    setDrawerOpen(false);
    navigate(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logo.png" alt="Logo" className="h-12 w-12 object-contain rounded-xl shadow-lg" />
            <div>
              <h1 className="text-xl md:text-2xl font-black text-blue-900 tracking-tight leading-tight">MY GUNUPUR</h1>
              <p className="text-xs font-semibold text-slate-500 leading-none">Everything You Need, All In One Place</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate('/')}
              className={`text-sm font-semibold transition-colors ${isHome ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('/services')}
              className={`text-sm font-semibold transition-colors ${currentPath === '/services' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Services
            </button>
            {settings?.features?.touristPlaces && (
              <button
                onClick={() => navigate('/explore')}
                className={`text-sm font-semibold transition-colors ${currentPath === '/explore' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
              >
                Explore
              </button>
            )}
            {settings?.features?.businesses && (
              <button
                onClick={() => navigate('/directory')}
                className={`text-sm font-semibold transition-colors ${currentPath === '/directory' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
              >
                Directory
              </button>
            )}
            <button
              onClick={() => navigate('/contact')}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-full transition-all duration-200 md:hidden"
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto bg-slate-50 min-h-[calc(100vh-8rem)] pb-24 md:pb-8 overflow-y-auto">
        <Outlet />
      </main>

      {/* Footer - Only on Home */}
      {isHome && (
        <footer className="bg-white border-t border-slate-100 py-12 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Column 1: App Branding & Info */}
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain rounded-xl shadow-md" />
                <h3 className="text-lg font-black text-blue-900 tracking-tight">MY GUNUPUR</h3>
              </div>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed max-w-sm">
                Your one-stop citizen super app for all services, businesses, loans, clearances, and emergency hotlines in Gunupur, Rayagada, Odisha.
              </p>
            </div>

            {/* Column 2: Quick & Legal Links */}
            <div className="flex flex-col md:flex-row justify-center md:justify-around gap-6 text-center md:text-left">
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Quick Links</h4>
                <div className="space-y-2">
                  <button onClick={() => navigate('/about')} className="block w-full md:w-auto text-xs text-slate-600 hover:text-blue-600 font-bold transition-colors">
                    About Us
                  </button>
                  <button onClick={() => navigate('/services')} className="block w-full md:w-auto text-xs text-slate-600 hover:text-blue-600 font-bold transition-colors">
                    All Services
                  </button>
                  <button onClick={() => navigate('/contact')} className="block w-full md:w-auto text-xs text-slate-600 hover:text-blue-600 font-bold transition-colors">
                    Contact Us
                  </button>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Legal & Terms</h4>
                <div className="space-y-2">
                  <button onClick={() => navigate('/privacy-policy')} className="block w-full md:w-auto text-xs text-slate-600 hover:text-blue-600 font-bold transition-colors">
                    Privacy Policy
                  </button>
                  <button onClick={() => navigate('/terms-of-service')} className="block w-full md:w-auto text-xs text-slate-600 hover:text-blue-600 font-bold transition-colors">
                    Terms of Service
                  </button>
                </div>
              </div>
            </div>

            {/* Column 3: Donated By */}
            <div className="flex flex-col items-center md:items-end justify-center h-full">
              <div 
                className="flex flex-col items-center md:items-end gap-3 text-center md:text-right cursor-pointer hover:scale-105 transition-transform"
                onClick={() => navigate('/donor-detail')}
              >
                <p className="text-[10px] font-black text-slate-450 uppercase tracking-widest">Donated By</p>
                <div className="flex items-center gap-3 bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-200 shadow-sm">
                    <img
                      src="https://res.cloudinary.com/cfs0kcdh/image/upload/v1783889491/my-gunupur/acp8dg8jcervtlxm6b8z.jpg"
                      alt="Voona Mallikarjun"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-extrabold text-slate-800">Late Voona Mallikarjun</span>
                    <p className="text-[10px] text-slate-500 font-bold">Tribute Page →</p>
                  </div>
                </div>
              </div>
              </div>

          </div>

          {/* Bottom Copyright Row */}
          <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-400 font-bold gap-4">
            <p>© 2026 My Gunupur Initiative. All rights reserved.</p>
            <p>Everything You Need, All In One Place</p>
          </div>
        </footer>
      )}

      {/* Sticky Bottom Nav Bar - Only on Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] md:hidden">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors duration-200 ${isHome ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </button>

          <button
            onClick={() => navigate('/services')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors duration-200 ${currentPath === '/services' ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[10px]">Services</span>
          </button>

          {settings?.features?.touristPlaces && (
            <button
              onClick={() => navigate('/explore')}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors duration-200 ${currentPath === '/explore' ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Compass className="w-5 h-5" />
              <span className="text-[10px]">Explore</span>
            </button>
          )}

          {settings?.features?.businesses && (
            <button
              onClick={() => navigate('/directory')}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors duration-200 ${currentPath === '/directory' ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-[10px]">Directory</span>
            </button>
          )}

          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 text-slate-400 hover:text-slate-600`}
          >
            <Menu className="w-5 h-5" />
            <span className="text-[10px]">Menu</span>
          </button>
        </div>
      </nav>

      {/* Menu Overlay Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80vw] max-w-sm bg-[#0f172a] text-white z-50 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded-full" />
                  <div>
                    <h2 className="text-sm font-black tracking-wider text-blue-400">MY GUNUPUR</h2>
                    <p className="text-[8px] text-slate-400 font-semibold uppercase">Citizen Super App</p>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 hover:bg-slate-800 rounded-full transition-all duration-200"
                >
                  <X className="w-5 h-5 text-slate-400 hover:text-white" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2 scrollbar-thin">
                {getDrawerLinks().map((link, _index) => {
                  const Icon = link.icon;
                  const isActive = currentPath === link.path;
                  return (
                    <button
                      key={link.name}
                      onClick={() => handleLinkClick(link.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? `bg-gradient-to-r from-slate-800 to-slate-700 ${link.color} font-bold border border-slate-700/50`
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? '' : link.color}`} />
                      <span className="text-sm font-medium">{link.name}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-800 bg-[#0b0f19] text-center">
                <p className="text-[10px] text-slate-500 font-semibold">© 2026 My Gunupur Initiative</p>
                <p className="text-[8px] text-slate-600 mt-0.5">Version 1.2.0 (Premium Pack)</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BottomNavLayout;
