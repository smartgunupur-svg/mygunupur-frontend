import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  ChevronRight,
  Building2,
  HelpCircle,
  AlertTriangle,
  HeartPulse,
  Droplets,
  BookOpen,
  FileText,
  Compass,
  MapPin,
  Calendar,
  Image,
  CloudSun,
  Briefcase,
  MessageSquare,
  Building,
  Phone,
  Utensils
} from 'lucide-react';

interface ServiceItem {
  id: number;
  title: string;
  desc: string;
  icon: any;
  path: string;
  color: string;
  bg: string;
}

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const servicesList: ServiceItem[] = [
    { id: 1, title: 'Home Loan EMI', desc: 'Calculate EMI & Enquire', icon: Building2, path: '/home-loan', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
    { id: 2, title: 'Building Plan Assistance', desc: 'Get help for building plan', icon: HelpCircle, path: '/building-enquiry', color: 'text-green-600', bg: 'bg-green-50 border-green-100' },
    { id: 3, title: 'Emergency Contacts', desc: 'One tap call to emergency', icon: AlertTriangle, path: '/emergency', color: 'text-red-600', bg: 'bg-red-50 border-red-100' },
    { id: 4, title: 'Hospitals Directory', desc: 'Find hospitals near you', icon: HeartPulse, path: '/hospitals', color: 'text-rose-600', bg: 'bg-rose-50 border-rose-100' },
    { id: 5, title: 'Blood Donor Directory', desc: 'Find blood donors in Gunupur', icon: Droplets, path: '/blood-donors', color: 'text-red-600', bg: 'bg-red-50 border-red-100' },
    { id: 6, title: 'Government Schemes', desc: 'Explore all central & state schemes', icon: Building, path: '/government-schemes', color: 'text-cyan-600', bg: 'bg-cyan-50 border-cyan-100' },
    { id: 7, title: 'Notices & Updates', desc: 'Latest notices & alerts', icon: FileText, path: '/notices', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
    { id: 8, title: 'Explore Gunupur', desc: 'Tourist places, waterfalls & temples', icon: Compass, path: '/explore', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' },
    { id: 9, title: 'Business Directory', desc: 'Hotels, restaurants, medical stores, hardware, electronics & more', icon: BookOpen, path: '/directory', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100' },
    { id: 10, title: 'Important Contacts', desc: 'Collector, BDO, Tahasil, Police', icon: Phone, path: '/important-contacts', color: 'text-slate-600', bg: 'bg-slate-50 border-slate-200' },
    { id: 11, title: 'Festivals & Events', desc: 'Upcoming cultural events calendar', icon: Calendar, path: '/events', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-100' },
    { id: 12, title: 'Photo & Video Gallery', desc: 'Browse pictures of Gunupur', icon: Image, path: '/gallery', color: 'text-sky-600', bg: 'bg-sky-50 border-sky-100' },
    { id: 13, title: 'Weather Forecast', desc: 'Current temperature & 5-day info', icon: CloudSun, path: '/weather', color: 'text-yellow-700', bg: 'bg-amber-50 border-yellow-200' },
    { id: 14, title: 'Jobs & Walk-in Hirings', desc: 'Find local jobs & recruitment drives', icon: Briefcase, path: '/jobs', color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
    { id: 15, title: 'Feedback & Contact', desc: 'Submit complaints & suggestions', icon: MessageSquare, path: '/feedback', color: 'text-pink-600', bg: 'bg-pink-50 border-pink-100' }
  ];

  const filteredServices = servicesList.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      {/* Search Services */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-100 hover:bg-slate-100/80 focus:bg-white border-none rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600/30 transition-all duration-200"
        />
      </div>

      {/* Services Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Top Services</h3>
        <div className="space-y-3">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(service.path)}
                className={`flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 cursor-pointer transition-all duration-200`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${service.bg.split(' ')[0]} border border-slate-100 shadow-sm`}>
                    <Icon className={`w-6 h-6 ${service.color}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{service.title}</h4>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">{service.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
