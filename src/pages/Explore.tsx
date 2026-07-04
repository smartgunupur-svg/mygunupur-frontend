import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Compass } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackPlaces = [
  {
    id: 1,
    title: 'Putudi Waterfall',
    category: 'Waterfalls',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&h=400&fit=crop',
    description: 'A beautiful cascade surrounded by dense forest, offering a perfect getaway for nature lovers.',
    bestTime: 'October to February',
    googleMap: 'https://maps.google.com'
  },
  {
    id: 2,
    title: 'Maa Tarini Temple',
    category: 'Temples',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop',
    description: 'A holy shrine dedicated to Maa Tarini, drawing devotees from across the region.',
    bestTime: 'Throughout the year',
    googleMap: 'https://maps.google.com'
  },
  {
    id: 3,
    title: 'Belghar Nature Camp',
    category: 'Tourist Places',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop',
    description: 'Perched in the hills, known for its scenic wildlife, indigenous tribe culture, and wooden cottages.',
    bestTime: 'November to April',
    googleMap: 'https://maps.google.com'
  },
  {
    id: 4,
    title: 'Joranda Waterfall',
    category: 'Waterfalls',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop',
    description: 'Stunning high waterfall drop making a beautiful roar inside nature camp forests.',
    bestTime: 'July to November',
    googleMap: 'https://maps.google.com'
  }
];

const Explore: React.FC = () => {
  const [places, setPlaces] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(`${API_URL}/tourist-places`);
        if (res.data && res.data.length > 0) {
          setPlaces(res.data);
        } else {
          setPlaces(fallbackPlaces);
        }
      } catch (error) {
        console.error('Error fetching tourist places:', error);
        setPlaces(fallbackPlaces);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  const tabs = ['All', 'Tourist Places', 'Temples', 'Waterfalls'];

  const filteredPlaces = activeTab === 'All' 
    ? places 
    : places.filter(place => place.category?.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="p-4 space-y-6">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Places List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-slate-200" />
              <div className="p-5 space-y-3">
                <div className="h-6 bg-slate-200 rounded w-1/2" />
                <div className="h-4 bg-slate-200 rounded w-5/6" />
                <div className="h-4 bg-slate-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredPlaces.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <Compass className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="text-sm font-semibold">No places found in this category.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPlaces.map((place) => (
            <motion.div
              key={place._id || place.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden transition-all duration-300"
            >
              {/* Image Banner */}
              <div className="h-48 relative overflow-hidden">
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-blue-900 border border-slate-200/50 shadow-sm">
                  {place.category}
                </span>
              </div>

              {/* Info Container */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-black text-slate-800 leading-tight">{place.title}</h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" /> Gunupur, Rayagada, Odisha
                  </p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-normal">{place.description}</p>

                {/* Sub Metadata */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-[10px] text-slate-400 leading-none">Best Time</p>
                      <p className="mt-0.5">{place.bestTime || 'Oct to Feb'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-[10px] text-slate-400 leading-none">Duration</p>
                      <p className="mt-0.5">2 - 4 Hours</p>
                    </div>
                  </div>
                </div>

                {/* Call-to-action */}
                <button
                  onClick={() => place.googleMap && window.open(place.googleMap, '_blank')}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:shadow-blue-500/20 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <MapPin className="w-4 h-4" /> View Route on Google Maps
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
