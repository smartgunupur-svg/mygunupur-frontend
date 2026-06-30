import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  Phone,
  MapPin,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ConstructionMaterial: React.FC = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get(`${API_URL}/construction-material-shops`);
        setShops(res.data);
      } catch (error) {
        console.error('Error fetching shops:', error);
        setShops([
          { _id: 1, name: "Gunupur Building Materials", phone: "9437578310", address: "Main Road, Gunupur", materials: ["Cement", "Sand", "Bricks"] },
          { _id: 2, name: "Sai Hardware Store", phone: "9876543210", address: "Near Bus Stand, Gunupur", materials: ["Pipes", "Fittings", "Paint"] }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pb-24">
      {/* Header */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-white/30 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center gap-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Construction Material</h1>
            <p className="text-xs font-semibold text-slate-500">Find all your building supplies in Gunupur</p>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 space-y-6 pt-6">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-black mb-3">Building Supplies</h2>
              <p className="text-amber-100 text-lg">All construction materials available in Gunupur</p>
            </div>
          </div>
        </motion.div>

        {/* Shops List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-black text-slate-800 mb-6">Nearby Shops</h3>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 animate-pulse">
                  <div className="h-6 bg-slate-200 rounded w-1/2 mb-3"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {shops.map((shop, index) => (
                <motion.div
                  key={shop._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-black text-slate-800 text-lg">{shop.name}</h4>
                      {shop.materials && shop.materials.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {shop.materials.map((material: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full">
                              {material}
                            </span>
                          ))}
                        </div>
                      )}
                      {shop.address && (
                        <div className="flex items-center gap-2 mt-3 text-slate-600 text-sm font-semibold">
                          <MapPin className="w-4 h-4" />
                          {shop.address}
                        </div>
                      )}
                    </div>
                    <a
                      href={`tel:${shop.phone}`}
                      className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <Phone className="w-5 h-5" />
                      Call
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ConstructionMaterial;
