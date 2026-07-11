import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Phone, MapPin, Star, Building2, Wifi, Coffee, Key } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Hotels: React.FC = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get(`${API_URL}/hotels`);
        setHotels(res.data || []);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search hotels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition-all duration-200"
        />
      </div>

      {/* Hotel Listings */}
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-2 animate-pulse">
                <div className="h-5 bg-slate-200 rounded w-1/2" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-10 bg-slate-100 rounded-2xl" />
              </div>
            ))}
          </div>
        ) : filteredHotels.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Building2 className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm font-semibold">No hotels found in Gunupur.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHotels.map((h, index) => (
              <motion.div
                key={h._id || h.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-800 text-sm">{h.name}</h4>
                    <p className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" /> {h.address}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-0.5 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {h.rating || 4.5}
                    </div>
                    <span className="text-[10px] text-slate-400 font-extrabold bg-slate-100 px-2 py-0.5 rounded-md">
                      Price: {h.priceRange || '₹₹'}
                    </span>
                  </div>
                </div>

                {/* Features badges */}
                {h.features && h.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {h.features.map((f: string, i: number) => {
                      let Icon = Key;
                      if (f.toLowerCase().includes('wifi')) Icon = Wifi;
                      if (f.toLowerCase().includes('restaurant') || f.toLowerCase().includes('cafe')) Icon = Coffee;
                      return (
                        <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[9px] font-bold rounded-lg flex items-center gap-1">
                          <Icon className="w-3 h-3 text-slate-400" />
                          {f}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Direct Dialing & Maps */}
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <a
                    href={`tel:${h.phone}`}
                    className="flex-1 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <Phone className="w-4 h-4" /> Book Room / Call
                  </a>
                  {h.googleMap && (
                    <button
                      onClick={() => window.open(h.googleMap, '_blank')}
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

export default Hotels;
