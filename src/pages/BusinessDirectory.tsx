import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Phone, MapPin, Star, Activity, ShoppingBag, Radio, Sparkles, Wrench, ShieldAlert, Home as HomeIcon, Utensils, MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const categoryIcons: { [key: string]: any } = {
  'All': HomeIcon,
  'Medical Stores': Activity,
  'Hardware': ShieldAlert,
  'Electronics': Radio,
  'Grocery': ShoppingBag,
  'Salons': Sparkles,
  'Repair Shops': Wrench,
  'Hotel': HomeIcon,
  'Restaurant': Utensils,
  'Construction Material': ShieldAlert
};

const categoryThemes: { [key: string]: { gradient: string; text: string; bg: string; border: string; accent: string } } = {
  'All': {
    gradient: 'from-blue-600 to-indigo-600',
    text: 'text-blue-600',
    bg: 'bg-blue-50/50',
    border: 'border-blue-100',
    accent: 'bg-blue-600'
  },
  'Medical Stores': {
    gradient: 'from-rose-500 to-red-600',
    text: 'text-rose-600',
    bg: 'bg-rose-50/50',
    border: 'border-rose-100',
    accent: 'bg-rose-600'
  },
  'Hardware': {
    gradient: 'from-slate-600 to-zinc-800',
    text: 'text-slate-600',
    bg: 'bg-slate-50/50',
    border: 'border-slate-100',
    accent: 'bg-slate-600'
  },
  'Electronics': {
    gradient: 'from-sky-500 to-indigo-600',
    text: 'text-sky-600',
    bg: 'bg-sky-50/50',
    border: 'border-sky-100',
    accent: 'bg-sky-650'
  },
  'Grocery': {
    gradient: 'from-emerald-500 to-green-600',
    text: 'text-emerald-600',
    bg: 'bg-emerald-50/50',
    border: 'border-emerald-100',
    accent: 'bg-emerald-650'
  },
  'Salons': {
    gradient: 'from-pink-500 to-rose-600',
    text: 'text-pink-600',
    bg: 'bg-pink-50/50',
    border: 'border-pink-100',
    accent: 'bg-pink-600'
  },
  'Repair Shops': {
    gradient: 'from-amber-500 to-orange-650',
    text: 'text-amber-650',
    bg: 'bg-amber-50/50',
    border: 'border-amber-100',
    accent: 'bg-amber-600'
  },
  'Hotel': {
    gradient: 'from-violet-600 to-indigo-700',
    text: 'text-violet-600',
    bg: 'bg-violet-50/50',
    border: 'border-violet-100',
    accent: 'bg-violet-650'
  },
  'Restaurant': {
    gradient: 'from-orange-500 to-red-600',
    text: 'text-orange-600',
    bg: 'bg-orange-50/50',
    border: 'border-orange-100',
    accent: 'bg-orange-600'
  },
  'Construction Material': {
    gradient: 'from-amber-700 to-stone-850',
    text: 'text-amber-800',
    bg: 'bg-amber-50/30',
    border: 'border-amber-200/40',
    accent: 'bg-amber-700'
  }
};

const getCategoryTheme = (category: string) => {
  return categoryThemes[category] || {
    gradient: 'from-blue-500 to-cyan-600',
    text: 'text-blue-600',
    bg: 'bg-blue-50/50',
    border: 'border-blue-100',
    accent: 'bg-blue-600'
  };
};

const fallbackBusinesses = [
  {
    id: 1,
    name: 'Arogya Medical Store',
    category: 'Medical Stores',
    phone: '9437578310',
    address: 'Main Road, Near Old Hospital, Gunupur',
    rating: 4.8,
    features: ['24x7 Open', 'Home Delivery'],
    googleMap: 'https://maps.google.com'
  },
  {
    id: 2,
    name: 'Sardar Hardware & Electricals',
    category: 'Hardware',
    phone: '9876543210',
    address: 'Cinema Hall Road, Gunupur',
    rating: 4.5,
    features: ['Best Price', 'All brands'],
    googleMap: 'https://maps.google.com'
  },
  {
    id: 3,
    name: 'Gupta Grocery Store',
    category: 'Grocery',
    phone: '9988776655',
    address: 'Daily Market, Gunupur',
    rating: 4.6,
    features: ['Fresh Veggies', 'Home Delivery'],
    googleMap: 'https://maps.google.com'
  },
  {
    id: 4,
    name: 'Smart Repair & Electronics',
    category: 'Repair Shops',
    phone: '7766554433',
    address: 'Bus Stand Complex, Gunupur',
    rating: 4.2,
    features: ['Mobile Repair', 'TV Repair'],
    googleMap: 'https://maps.google.com'
  }
];

const BusinessDirectory: React.FC = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Get unique categories from businesses and add "All" at the beginning
  const categories = ['All', ...Array.from(new Set(businesses.map(b => b.category))).sort()];

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await axios.get(`${API_URL}/businesses`);
        if (res.data && res.data.length > 0) {
          setBusinesses(res.data);
        } else {
          setBusinesses(fallbackBusinesses);
        }
      } catch (error) {
        console.error('Error fetching businesses:', error);
        setBusinesses(fallbackBusinesses);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, []);

  const filteredBusinesses = businesses.filter(b => {
    const matchesCategory = activeCategory === 'All' || b.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="px-4 py-6 md:py-8 space-y-6 max-w-6xl mx-auto">
      <Helmet>
        <title>Business Directory - My Gunupur | Local Shops, Hotels & Restaurants</title>
        <meta name="description" content="Find local businesses, shops, hotels, restaurants, and services in Gunupur, Odisha. Complete business directory with contact details and locations." />
        <meta name="keywords" content="Gunupur business directory, local shops, hotels, restaurants, services, Odisha" />
      </Helmet>

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 backdrop-blur-md rounded-full text-xs font-bold text-blue-300 border border-blue-400/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Local Businesses
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight font-sans">Business Directory</h2>
          <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
            Connect directly with verified local shops, retail stores, hotels, restaurants, and professional services in Gunupur.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative group max-w-xl">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          placeholder="Search businesses by name, keyword or area..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200/80 rounded-2xl text-sm font-semibold text-slate-800 placeholder-slate-450 shadow-sm focus:ring-4 focus:ring-blue-600/10 focus:border-blue-500 focus:outline-none transition-all duration-200"
        />
      </div>

      {/* Categories Selector */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-black text-slate-450 uppercase tracking-widest px-1">Categories</h3>
        <div className="flex overflow-x-auto no-scrollbar pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible gap-2 scroll-smooth">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat] || Activity;
            const isActive = activeCategory === cat;
            const theme = getCategoryTheme(cat);
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-bold whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 active:scale-98 ${
                  isActive
                    ? `bg-gradient-to-r ${theme.gradient} text-white shadow-md shadow-blue-500/10 border-transparent`
                    : 'bg-white border-slate-200/60 text-slate-600 hover:text-slate-900 hover:border-slate-350 hover:bg-slate-50/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Directory Listings Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {loading ? 'Searching listings...' : `${filteredBusinesses.length} Registered Providers`}
          </h3>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4 animate-pulse">
                <div className="h-44 bg-slate-150 rounded-2xl w-full" />
                <div className="h-5 bg-slate-200 rounded w-2/3" />
                <div className="h-4 bg-slate-150 rounded w-1/2" />
                <div className="h-10 bg-slate-100 rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredBusinesses.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl shadow-sm">
            <Activity className="w-12 h-12 mx-auto mb-3 text-slate-300 animate-pulse" />
            <p className="text-sm font-bold text-slate-650">No businesses found in this category.</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((b, index) => {
              const Icon = categoryIcons[b.category] || Activity;
              const theme = getCategoryTheme(b.category);
              
              return (
                <motion.div
                  key={b._id || b.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.05, 0.5) }}
                  onClick={() => navigate(`/directory/${b._id || b.id}`)}
                  className="group bg-white border border-slate-200/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-slate-300/40 cursor-pointer flex flex-col justify-between transition-all duration-300"
                >
                  {/* Card Visual Header (Photo or Category placeholder) */}
                  <div className="relative h-52 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                    {/* Overlay Badges */}
                    <span className="absolute top-3.5 left-3.5 z-20 px-2.5 py-1 text-[10px] font-extrabold tracking-wider bg-white/90 backdrop-blur-md text-slate-800 rounded-full shadow-sm flex items-center gap-1 border border-white/20">
                      <Icon className={`w-3 h-3 ${theme.text}`} />
                      {b.category}
                    </span>

                    <span className="absolute top-3.5 right-3.5 z-20 px-2.5 py-1 text-[10px] font-black bg-amber-400 text-slate-900 rounded-full shadow-sm flex items-center gap-0.5 border border-amber-300/20">
                      <Star className="w-3 h-3 fill-slate-900 text-slate-900" />
                      {b.rating || 4.5}
                    </span>

                    {b.isVeg && (
                      <span className="absolute bottom-3.5 right-3.5 z-20 px-2.5 py-1 text-[9px] font-black bg-emerald-500 text-white rounded-full shadow-sm flex items-center gap-1 border border-emerald-400/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        PURE VEG
                      </span>
                    )}

                    {b.priceRange && (
                      <span className="absolute bottom-3.5 left-3.5 z-20 px-2.5 py-1 text-[9px] font-black bg-slate-900/60 backdrop-blur-md text-white rounded-full shadow-sm border border-white/10">
                        Price: {b.priceRange}
                      </span>
                    )}

                    {b.image ? (
                      <>
                        {/* 1. Blurred backdrop image (prevents empty layout letterboxes) */}
                        <img
                          src={b.image}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none select-none"
                        />
                        {/* 2. Contain foreground image (never crops business cards or text) */}
                        <img
                          src={b.image}
                          alt={b.name}
                          className="relative z-10 max-w-full max-h-full object-contain select-none transition-transform duration-500 group-hover:scale-105"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(b.image);
                          }}
                        />
                      </>
                    ) : (
                      /* Placeholder Premium Layout */
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} flex flex-col items-center justify-center p-6 text-center text-white/95`}>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
                        <Icon className="w-12 h-12 text-white/80 mb-2 drop-shadow-md transition-transform duration-500 group-hover:scale-110" />
                        <span className="text-[10px] font-black tracking-widest text-white/60 uppercase">{b.category}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-blue-600 transition-colors line-clamp-1">
                        {b.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-semibold flex items-start gap-1 line-clamp-2">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{b.address || 'Gunupur, Odisha'}</span>
                      </p>
                    </div>

                    {/* Features Badges */}
                    {b.features && b.features.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {b.features.slice(0, 3).map((f: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded-md">
                            {f}
                          </span>
                        ))}
                        {b.features.length > 3 && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-400 text-[9px] font-bold rounded-md">
                            +{b.features.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Materials Badges for Construction Category */}
                    {b.materials && b.materials.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {b.materials.slice(0, 3).map((m: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 bg-orange-50 text-orange-700 text-[9px] font-bold rounded-md">
                            {m}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Dial / Map Actions */}
                    <div className="flex gap-2 pt-3 border-t border-slate-100/80">
                      <a
                        href={`tel:${b.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200"
                      >
                        <Phone className="w-4 h-4" /> Call
                      </a>
                      
                      {b.whatsappNumber && (
                        <a
                          href={`https://wa.me/${b.whatsappNumber.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="py-2.5 px-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100/50 rounded-xl text-xs font-bold flex items-center justify-center transition-all duration-200"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      )}

                      {b.googleMap && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(b.googleMap, '_blank');
                          }}
                          className="py-2.5 px-3.5 bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200/50 rounded-xl text-xs font-bold flex items-center justify-center transition-all duration-200"
                        >
                          <MapPin className="w-4 h-4" />
                        </button>
                      )}
                      
                      <div className="py-2.5 px-2 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-500 rounded-xl flex items-center justify-center transition-all duration-200">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Full Screen Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="max-w-4xl max-h-[90vh] relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/85 text-white px-3 py-1.5 rounded-full text-xs font-black border border-white/20 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessDirectory;
