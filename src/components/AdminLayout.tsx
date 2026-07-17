import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  FileText, 
  Building2, 
  LogOut, 
  ChevronRight,
  Banknote,
  ShoppingCart,
  HeartPulse,
  MapPin,
  AlertTriangle,
  LayoutDashboard,
  Bell,
  Search,
  Menu,
  X,
  Droplets,
  Briefcase,
  Award,
  Image,
  Calendar,
  BookOpen,
  Home,
  Utensils,
  Settings,
  Phone,
  GraduationCap,
  TreePine,
  Trophy
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const navItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Loan Enquiries', icon: FileText, path: '/admin/loan-enquiries', color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Building Enquiries', icon: Building2, path: '/admin/building-enquiries', color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'Banks', icon: Banknote, path: '/admin/banks', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { title: 'Construction Material', icon: ShoppingCart, path: '/admin/construction-material', color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Hospitals', icon: HeartPulse, path: '/admin/hospitals', color: 'text-pink-500', bg: 'bg-pink-50' },
    { title: 'Blood Donors', icon: Droplets, path: '/admin/blood-donors', color: 'text-red-500', bg: 'bg-red-50' },
    { title: 'Hotels', icon: Home, path: '/admin/hotels', color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Restaurants', icon: Utensils, path: '/admin/restaurants', color: 'text-rose-600', bg: 'bg-rose-50' },
    { title: 'Tourist Places', icon: MapPin, path: '/admin/tourist-places', color: 'text-teal-500', bg: 'bg-teal-50' },
    { title: 'Schools', icon: GraduationCap, path: '/admin/schools', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Colleges', icon: BookOpen, path: '/admin/colleges', color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Govt Offices', icon: Building2, path: '/admin/govt-offices', color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Parks', icon: TreePine, path: '/admin/parks', color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Sports Places', icon: Trophy, path: '/admin/sports-places', color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Emergency Contacts', icon: AlertTriangle, path: '/admin/emergency-contacts', color: 'text-red-500', bg: 'bg-red-50' },
    { title: 'Important Contacts', icon: Phone, path: '/admin/important-contacts', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Notices', icon: Bell, path: '/admin/notices', color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Gallery Media', icon: Image, path: '/admin/gallery', color: 'text-sky-500', bg: 'bg-sky-50' },
    { title: 'Events Calendar', icon: Calendar, path: '/admin/events', color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { title: 'Local Jobs', icon: Briefcase, path: '/admin/jobs', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Govt Schemes', icon: Award, path: '/admin/schemes', color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { title: 'Businesses & Directory', icon: BookOpen, path: '/admin/businesses', color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Settings', icon: Settings, path: '/admin/settings', color: 'text-slate-600', bg: 'bg-slate-50' }
  ];

  // Generate title from path
  const pathTitle = location.pathname.split('/').pop() || 'dashboard';
  const title = pathTitle.charAt(0).toUpperCase() + pathTitle.slice(1).replace(/-/g, ' ');

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className={`fixed left-0 top-0 h-full w-72 bg-white border-r border-slate-200 z-50 shadow-xl lg:static lg:translate-x-0 transition-transform duration-300 flex-shrink-0 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="My Gunupur" className="h-12 w-auto" />
            <div>
              <h1 className="text-lg font-bold text-slate-800">My Gunupur</h1>
              <p className="text-xs text-slate-500 font-medium">Admin Panel</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-1 overflow-y-auto flex-1" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? `bg-gradient-to-r ${item.bg} ${item.color} font-semibold shadow-sm border border-slate-100`
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.title}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all font-semibold text-sm"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex-shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6 text-slate-600" /> : <Menu className="w-6 h-6 text-slate-600" />}
              </button>
              <h2 className="text-xl font-bold text-slate-800">{title}</h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-6 h-6 text-slate-600" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  AD
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800">Admin</p>
                  <p className="text-xs text-slate-500">admin@mygunupur.in</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
