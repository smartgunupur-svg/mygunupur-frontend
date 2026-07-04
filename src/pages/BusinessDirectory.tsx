import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Phone, MapPin, Star, Activity, ShoppingBag, Radio, Sparkles, Wrench, ShieldAlert } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const categoryIcons: { [key: string]: any } = {
  'Medical Stores': Activity,
  'Hardware': ShieldAlert,
  'Electronics': Radio,
  'Grocery': ShoppingBag,
  'Salons': Sparkles,
  'Repair Shops': Wrench
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
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('Medical Stores');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['Medical Stores', 'Hardware', 'Electronics', 'Grocery', 'Salons', 'Repair Shops'];

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
    const matchesCategory = b.category?.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder={`Search ${activeCategory}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition-all duration-200"
        />
      </div>

      {/* Categories Horizontal Grid */}
      <div className="grid grid-cols-3 gap-2">
        {categories.map((cat) => {
          const Icon = categoryIcons[cat] || Activity;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSearchQuery('');
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span className="text-[10px] font-bold leading-tight">{cat.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Directory Listings */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Registered Providers</h3>
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm animate-pulse space-y-2">
                <div className="h-5 bg-slate-200 rounded w-2/3" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : filteredBusinesses.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Activity className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm font-semibold">No businesses found in this category.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBusinesses.map((b, index) => (
              <motion.div
                key={b._id || b.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">{b.name}</h4>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" /> {b.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {b.rating || 4.5}
                  </div>
                </div>

                {/* Features Badges */}
                {b.features && b.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {b.features.map((f: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded-md">
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                {/* Dial / Map Actions */}
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <a
                    href={`tel:${b.phone}`}
                    className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <Phone className="w-4 h-4" /> Call Provider
                  </a>
                  {b.googleMap && (
                    <button
                      onClick={() => window.open(b.googleMap, '_blank')}
                      className="py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/50 rounded-xl text-xs font-bold flex items-center justify-center transition-all duration-200"
                    >
                      <MapPin className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDirectory;
