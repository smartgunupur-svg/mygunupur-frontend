import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, Play, X, Eye } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackGallery = [
  {
    id: 1,
    title: 'Tumma Waterfall Scenic View',
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&h=400&fit=crop',
    category: 'Photos'
  },
  {
    id: 2,
    title: 'Jagannath Temple Entrance',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop',
    category: 'Photos'
  },
  {
    id: 3,
    title: 'Bansadhara River Bridge',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop',
    category: 'Photos'
  },
  {
    id: 4,
    title: 'Green Valley Viewpoint',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop',
    category: 'Photos'
  }
];

const Gallery: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('Photos'); // Photos, Videos
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${API_URL}/gallery`);
        if (res.data && res.data.length > 0) {
          setItems(res.data);
        } else {
          setItems(fallbackGallery);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
        setItems(fallbackGallery);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = items.filter(item => item.category === activeTab);

  return (
    <div className="p-4 space-y-6">
      {/* Tabs */}
      <div className="flex gap-2">
        {['Photos', 'Videos'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all duration-200 uppercase tracking-wider flex items-center justify-center gap-1.5 ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab === 'Photos' ? <Image className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : activeTab === 'Videos' ? (
        <div className="space-y-4">
          {/* Mock Video Items */}
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm relative group cursor-pointer">
            <div className="h-48 relative bg-slate-900 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop"
                alt="Video thumbnail"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-14 h-14 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-blue-600 fill-blue-600 ml-0.5" />
                </div>
              </div>
            </div>
            <div className="p-4 bg-white">
              <h4 className="font-extrabold text-slate-800 text-sm">Explore Gunupur Tourism Video</h4>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Duration: 3:45 mins</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item._id || item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => setLightboxImage(item.image)}
              className="h-36 bg-slate-100 rounded-2xl overflow-hidden relative group cursor-pointer border border-slate-100 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title || 'Gallery item'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox Popup Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightboxImage}
              alt="Fullscreen Media"
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
