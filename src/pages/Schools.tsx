import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Phone, MapPin, GraduationCap } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackSchools = [
  {
    id: 1,
    name: 'Govt Boys High School',
    phone: '9437578310',
    address: 'Main Road, Gunupur',
    board: 'CHSE',
    type: 'Govt',
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    googleMap: 'https://maps.google.com'
  },
  {
    id: 2,
    name: 'Govt Girls High School',
    phone: '9876543210',
    address: 'Near Police Station, Gunupur',
    board: 'CHSE',
    type: 'Govt',
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    googleMap: 'https://maps.google.com'
  },
  {
    id: 3,
    name: 'Dav Public School',
    phone: '8877665544',
    address: 'GIET Road, Gunupur',
    board: 'CBSE',
    type: 'Private',
    classes: ['Nursery', 'LKG', 'UKG', 'Class 1 to 12'],
    googleMap: 'https://maps.google.com'
  }
];

const Schools: React.FC = () => {
  const [schools, setSchools] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await axios.get(`${API_URL}/schools`);
        if (res.data && res.data.length > 0) {
          setSchools(res.data);
        } else {
          setSchools(fallbackSchools);
        }
      } catch (error) {
        console.error('Error fetching schools:', error);
        setSchools(fallbackSchools);
      } finally {
        setLoading(false);
      }
    };
    fetchSchools();
  }, []);

  const filteredSchools = schools.filter(h =>
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
          placeholder="Search schools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition-all duration-200"
        />
      </div>

      {/* School Listings */}
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
        ) : filteredSchools.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <GraduationCap className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm font-semibold">No schools found in Gunupur.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSchools.map((h, index) => (
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
                    <div className="flex gap-2">
                      {h.type && (
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          {h.type}
                        </span>
                      )}
                      {h.board && (
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                          {h.board}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Classes badges */}
                {h.classes && h.classes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {h.classes.map((f: string, i: number) => (
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
                      className="flex-1 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200"
                    >
                      <Phone className="w-4 h-4" /> Call School
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

export default Schools;
