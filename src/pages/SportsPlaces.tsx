import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Phone, MapPin, Trophy } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackSportsPlaces = [
  {
    id: 1,
    name: 'GIET Stadium',
    phone: '9437578310',
    address: 'GIET University, Gunupur',
    type: 'Stadium',
    sports: ['Cricket', 'Football', 'Athletics'],
    timing: '6 AM - 9 PM',
    googleMap: 'https://maps.google.com'
  },
  {
    id: 2,
    name: 'Town Ground, Gunupur',
    phone: '9876543210',
    address: 'Near Bus Stand, Gunupur',
    type: 'Ground',
    sports: ['Cricket', 'Football', 'Kabaddi'],
    timing: '6 AM - 8 PM',
    googleMap: 'https://maps.google.com'
  }
];

const SportsPlaces: React.FC = () => {
  const [sportsPlaces, setSportsPlaces] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSportsPlaces = async () => {
      try {
        const res = await axios.get(`${API_URL}/sports-places`);
        if (res.data && res.data.length > 0) {
          setSportsPlaces(res.data);
        } else {
          setSportsPlaces(fallbackSportsPlaces);
        }
      } catch (error) {
        console.error('Error fetching sports places:', error);
        setSportsPlaces(fallbackSportsPlaces);
      } finally {
        setLoading(false);
      }
    };
    fetchSportsPlaces();
  }, []);

  const filteredSportsPlaces = sportsPlaces.filter(h =>
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
          placeholder="Search sports places..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-orange-600/20 transition-all duration-200"
        />
      </div>

      {/* Sports Place Listings */}
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
        ) : filteredSportsPlaces.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm font-semibold">No sports places found in Gunupur.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSportsPlaces.map((h, index) => (
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
                      <MapPin className="w-3.5 h-3.5 text-orange-500" /> {h.address}
                    </p>
                    <div className="flex gap-2">
                      {h.type && (
                        <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                          {h.type}
                        </span>
                      )}
                      {h.timing && (
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                          {h.timing}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sports badges */}
                {h.sports && h.sports.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {h.sports.map((f: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[9px] font-bold rounded-lg">
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                {/* Direct Dialing & Maps */}
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  {h.phone && (
                    <a
                      href={`tel:${h.phone}`}
                      className="flex-1 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200"
                    >
                      <Phone className="w-4 h-4" /> Call Place
                    </a>
                  )}
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

export default SportsPlaces;
