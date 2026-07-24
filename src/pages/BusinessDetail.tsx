import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, MapPin, Star, Activity, ShoppingBag, Radio, Sparkles, Wrench, ShieldAlert, Home as HomeIcon, Utensils, ArrowLeft, MessageCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const categoryIcons: { [key: string]: any } = {
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

const BusinessDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await axios.get(`${API_URL}/businesses/${id}`);
        setBusiness(res.data);
      } catch (error) {
        console.error('Error fetching business:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBusiness();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Activity className="w-12 h-12 mx-auto mb-3 text-slate-300" />
        <h3 className="text-lg font-bold text-slate-800">Business not found</h3>
        <button
          onClick={() => navigate('/directory')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          Back to Directory
        </button>
      </div>
    );
  }

  const Icon = categoryIcons[business.category] || Activity;

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>{business ? `${business.name} - My Gunupur Business Directory` : 'Business Directory - My Gunupur'}</title>
        <meta name="description" content={business?.description || `Find and connect with ${business?.name || 'local businesses'} in Gunupur, Odisha.`} />
        <meta name="keywords" content={`${business?.name || ''}, ${business?.category || ''}, Gunupur, Odisha, business directory`} />
        {business?.image && <meta property="og:image" content={business.image} />}
        <meta property="og:title" content={business?.name || 'My Gunupur Business Directory'} />
        <meta property="og:description" content={business?.description || 'Find local businesses in Gunupur, Odisha'} />
      </Helmet>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-slate-700" />
          </button>
          <h1 className="text-xl font-bold text-slate-800">{business.name}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Business Image */}
        {business.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl overflow-hidden shadow-lg bg-slate-950 relative h-64 md:h-80 flex items-center justify-center border border-slate-100/50"
          >
            {/* Blurred background photo */}
            <img
              src={business.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none select-none"
            />
            {/* Main fully-visible contain photo */}
            <img
              src={business.image}
              alt={business.name}
              className="relative z-10 max-w-full max-h-full object-contain cursor-pointer transition-transform duration-500 hover:scale-[1.01]"
              onClick={() => setSelectedImage(business.image)}
            />
          </motion.div>
        )}

        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{business.category}</span>
                </div>
              </div>
              <h2 className="text-2xl font-black text-slate-800">{business.name}</h2>
              <p className="text-sm text-slate-500 font-semibold mt-1 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-blue-500" /> {business.address}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-xl text-sm font-black">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              {business.rating || 4.5}
            </div>
          </div>

          {business.description && (
            <div className="mt-5 pt-5 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 mb-2">About</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{business.description}</p>
            </div>
          )}

          {/* Features */}
          {business.features && business.features.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-bold text-slate-800 mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {business.features.map((feature: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Materials (for Construction Material) */}
          {business.materials && business.materials.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-bold text-slate-800 mb-2">Materials</h3>
              <div className="flex flex-wrap gap-2">
                {business.materials.map((material: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold rounded-xl"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Contact Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 space-y-4"
        >
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-500" />
            <span>Contact & Location</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={`tel:${business.phone}`}
              className="flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 active:scale-98 text-white rounded-2xl font-bold shadow-md shadow-blue-500/10 hover:shadow-lg transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              <span>Call: {business.phone}</span>
            </a>

            {business.alternatePhone && (
              <a
                href={`tel:${business.alternatePhone}`}
                className="flex items-center justify-center gap-3 py-4 bg-slate-50 hover:bg-slate-100 active:scale-98 text-slate-700 rounded-2xl border border-slate-200/50 font-bold transition-all duration-200"
              >
                <Phone className="w-5 h-5" />
                <span>Alt Call: {business.alternatePhone}</span>
              </a>
            )}

            {business.whatsappNumber && (
              <a
                href={`https://wa.me/${business.whatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-4 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white rounded-2xl font-bold shadow-md shadow-emerald-500/10 hover:shadow-lg transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp: {business.whatsappNumber}</span>
              </a>
            )}

            {business.alternateWhatsappNumber && (
              <a
                href={`https://wa.me/${business.alternateWhatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-4 bg-emerald-50 hover:bg-emerald-100 active:scale-98 text-emerald-700 rounded-2xl border border-emerald-200/60 font-bold transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Alt WhatsApp: {business.alternateWhatsappNumber}</span>
              </a>
            )}

            {business.googleMap && (
              <a
                href={business.googleMap}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-4 bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-800 rounded-2xl border border-slate-350/20 font-bold transition-all duration-200"
              >
                <MapPin className="w-5 h-5 text-red-500" />
                <span>View on Google Maps</span>
              </a>
            )}
          </div>
        </motion.div>
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

export default BusinessDetail;
