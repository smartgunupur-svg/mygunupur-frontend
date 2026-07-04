import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  LayoutGrid,
  Compass,
  BookOpen,
  Menu,
  X,
  ArrowLeft,
  Phone,
  Droplets,
  Building2,
  HeartPulse,
  AlertTriangle,
  FileText,
  HelpCircle,
  MapPin,
  Calendar,
  Image,
  CloudSun,
  Briefcase,
  MessageSquare,
  Info,
  Mail,
  UserCheck,
  Building,
  Utensils
} from 'lucide-react';

const routeTitles: { [key: string]: string } = {
  '/': 'Home',
  '/home-loan': 'Home Loan EMI',
  '/building-enquiry': 'Building Plan Assistance',
  '/emergency': 'Emergency Contacts',
  '/hospitals': 'Hospitals Directory',
  '/blood-donors': 'Blood Donor Directory',
  '/explore': 'Explore Gunupur',
  '/services': 'All Services',
  '/directory': 'Local Directory',
  '/government-schemes': 'Government Schemes',
  '/notices': 'Notices & Updates',
  '/hotels': 'Hotels Directory',
  '/restaurants': 'Restaurants Directory',
  '/important-contacts': 'Important Contacts',
  '/events': 'Events & Festivals',
  '/gallery': 'Gallery',
  '/weather': 'Weather Update',
  '/jobs': 'Local Jobs',
  '/feedback': 'Feedback & Contact',
  '/about': 'About Us',
  '/contact': 'Contact Us'
};

const BottomNavLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentPath = location.pathname;
  const isHome = currentPath === '/';
  const pageTitle = routeTitles[currentPath] || 'My Gunupur';

  // Define the menu links for the drawer
  const drawerLinks = [
    { name: 'Home', path: '/', icon: Home, color: 'text-blue-500' },
    { name: 'All Services', path: '/services', icon: LayoutGrid, color: 'text-indigo-500' },
    { name: 'Explore Gunupur', path: '/explore', icon: Compass, color: 'text-green-500' },
    { name: 'Business Directory', path: '/directory', icon: BookOpen, color: 'text-amber-500' },
    { name: 'Emergency Contacts', path: '/emergency', icon: AlertTriangle, color: 'text-red-500' },
    { name: 'Hospitals', path: '/hospitals', icon: HeartPulse, color: 'text-rose-500' },
    { name: 'Blood Donors', path: '/blood-donors', icon: Droplets, color: 'text-red-500' },
    { name: 'Government Schemes', path: '/government-schemes', icon: Building, color: 'text-cyan-500' },
    { name: 'Notices & Updates', path: '/notices', icon: FileText, color: 'text-purple-500' },
    { name: 'Home Loan EMI', path: '/home-loan', icon: Building2, color: 'text-teal-500' },
    { name: 'Building Plan', path: '/building-enquiry', icon: HelpCircle, color: 'text-emerald-500' },
    { name: 'Hotels Directory', path: '/hotels', icon: MapPin, color: 'text-orange-500' },
    { name: 'Restaurants Directory', path: '/restaurants', icon: Utensils, color: 'text-rose-600' },
    { name: 'Important Contacts', path: '/important-contacts', icon: Phone, color: 'text-slate-500' },
    { name: 'Events & Festivals', path: '/events', icon: Calendar, color: 'text-yellow-500' },
    { name: 'Gallery', path: '/gallery', icon: Image, color: 'text-sky-500' },
    { name: 'Weather', path: '/weather', icon: CloudSun, color: 'text-yellow-600' },
    { name: 'Jobs & Hiring', path: '/jobs', icon: Briefcase, color: 'text-indigo-600' },
    { name: 'Feedback & Contact', path: '/feedback', icon: MessageSquare, color: 'text-pink-500' },
    { name: 'About Us', path: '/about', icon: Info, color: 'text-slate-600' },
    { name: 'Contact Us', path: '/contact', icon: Mail, color: 'text-slate-700' },
    { name: 'Admin Panel', path: '/admin/login', icon: UserCheck, color: 'text-slate-800' }
  ];

  const handleLinkClick = (path: string) => {
    setDrawerOpen(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          {isHome ? (
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <img src="/layoutlogo.png" alt="Logo" className="h-10 w-10 object-contain rounded-full shadow-sm" />
              <div>
                <h1 className="text-base font-extrabold text-blue-900 tracking-tight leading-tight">MY GUNUPUR</h1>
                <p className="text-[10px] font-semibold text-slate-500 leading-none">Everything You Need, All In One Place</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-slate-100 rounded-full transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">{pageTitle}</h1>
            </div>
          )}

          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-full transition-all duration-200"
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </button>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 w-full max-w-md mx-auto bg-white min-h-[calc(100vh-8rem)] pb-20 shadow-sm border-x border-slate-50 overflow-y-auto">
        <Outlet />
      </main>

      {/* Sticky Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors duration-200 ${
              isHome ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </button>

          <button
            onClick={() => navigate('/services')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors duration-200 ${
              currentPath === '/services' ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[10px]">Services</span>
          </button>

          <button
            onClick={() => navigate('/explore')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors duration-200 ${
              currentPath === '/explore' ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px]">Explore</span>
          </button>

          <button
            onClick={() => navigate('/directory')}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors duration-200 ${
              currentPath === '/directory' ? 'text-blue-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px]">Directory</span>
          </button>

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
              className="fixed inset-0 bg-black z-50"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-sm bg-[#0f172a] text-white z-50 shadow-2xl flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/layoutlogo.png" alt="Logo" className="h-8 w-8 rounded-full" />
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
                {drawerLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = currentPath === link.path;
                  return (
                    <button
                      key={link.name}
                      onClick={() => handleLinkClick(link.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-slate-800 text-blue-400 font-bold border border-slate-700/50'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${link.color}`} />
                      <span className="text-sm font-medium">{link.name}</span>
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
