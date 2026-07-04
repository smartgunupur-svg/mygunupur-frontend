import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Phone, MapPin, Star, Utensils, Award, Leaf } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackRestaurants = [
  {
    id: 1,
    name: 'Shree Jagannath Veg Restaurant',
    priceRange: '₹',
    rating: 4.7,
    phone: '9437578310',
    address: 'Main Bazar Road, Gunupur',
    isVeg: true,
    features: ['100% Pure Veg', 'Thali Special', 'AC Room'],
    googleMap: 'https://maps.google.com'
  },
  {
    id: 2,
    name: 'The Food Junction Cafe',
    priceRange: '₹₹',
    rating: 4.4,
    phone: '9876543210',
    address: 'GIET Road, Gunupur',
    isVeg: false,
    features: ['Burgers & Pizza', 'Mocktails', 'Hangout Zone'],
    googleMap: 'https://maps.google.com'
  },
  {
    id: 3,
    name: 'Red Chilli Family Restaurant',
    priceRange: '₹₹',
    rating: 4.3,
    phone: '8877665544',
    address: 'Near Old Bus Stand, Gunupur',
    isVeg: false,
    features: ['Biryani Special', 'Tandoori Items', 'Family Section'],
    googleMap: 'https://maps.google.com'
  }
];

const Restaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All'); // All, Veg, Non-Veg
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(`${API_URL}/businesses?category=restaurant`);
        if (res.data && res.data.length > 0) {
          setRestaurants(res.data);
        } else {
          setRestaurants(fallbackRestaurants);
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        setRestaurants(fallbackRestaurants);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'Veg') return matchesSearch && r.isVeg === true;
    if (activeFilter === 'Non-Veg') return matchesSearch && r.isVeg === false;
    return matchesSearch;
  });

  return (
    <div className="p-4 space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition-all duration-200"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['All', 'Veg', 'Non-Veg'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
              activeFilter === filter
                ? filter === 'Veg'
                  ? 'bg-green-600 text-white shadow-md'
                  : filter === 'Non-Veg'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {filter === 'Veg' && '🟢 '}
            {filter === 'Non-Veg' && '🔴 '}
            {filter}
          </button>
        ))}
      </div>

      {/* Restaurant Listings */}
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-2 animate-pulse">
                <div className="h-5 bg-slate-200 rounded w-1/2" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Utensils className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm font-semibold">No food joints found matching criteria.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRestaurants.map((r, index) => (
              <motion.div
                key={r._id || r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-3.5 h-3.5 border flex items-center justify-center text-[7px] font-bold ${r.isVeg ? 'border-green-600 text-green-600' : 'border-red-600 text-red-600'}`}>
                        {r.isVeg ? '●' : '▲'}
                      </span>
                      <h4 className="font-extrabold text-slate-800 text-sm">{r.name}</h4>
                    </div>
                    <p className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" /> {r.address}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-0.5 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {r.rating || 4.5}
                    </div>
                    <span className="text-[10px] text-slate-400 font-extrabold bg-slate-100 px-2 py-0.5 rounded-md">
                      {r.priceRange || '₹₹'}
                    </span>
                  </div>
                </div>

                {/* Features badges */}
                {r.features && r.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {r.features.map((f: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[9px] font-bold rounded-lg flex items-center gap-1">
                        {r.isVeg && f.toLowerCase().includes('veg') ? (
                          <Leaf className="w-3 h-3 text-green-500" />
                        ) : (
                          <Award className="w-3 h-3 text-slate-400" />
                        )}
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                {/* Direct Dialing & Maps */}
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <a
                    href={`tel:${r.phone}`}
                    className="flex-1 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <Phone className="w-4 h-4" /> Order Food / Call
                  </a>
                  {r.googleMap && (
                    <button
                      onClick={() => window.open(r.googleMap, '_blank')}
                      className="py-2.5 px-3.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/50 rounded-xl text-xs font-bold flex items-center justify-center transition-all duration-200"
                    >
                      <MapPin className="w-4 h-4" /> Map
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

export default Restaurants;
