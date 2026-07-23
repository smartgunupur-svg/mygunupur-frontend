import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, MapPin, Star, Activity, ShoppingBag, Radio, Sparkles, Wrench, ShieldAlert, Home as HomeIcon, Utensils, ArrowLeft, MessageCircle } from 'lucide-react';
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
            className="rounded-3xl overflow-hidden shadow-lg"
          >
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-64 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
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
            <p className="text-slate-600 leading-relaxed mt-4">{business.description}</p>
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
          className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100"
        >
          <h3 className="text-lg font-black text-slate-800 mb-4">Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a
              href={`tel:${business.phone}`}
              className="flex items-center justify-center gap-3 py-4 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-2xl font-bold transition-all"
            >
              <Phone className="w-6 h-6" />
              <span>Call: {business.phone}</span>
            </a>

            {business.alternatePhone && (
              <a
                href={`tel:${business.alternatePhone}`}
                className="flex items-center justify-center gap-3 py-4 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-2xl font-bold transition-all"
              >
                <Phone className="w-6 h-6" />
                <span>Alt: {business.alternatePhone}</span>
              </a>
            )}

            {business.whatsappNumber && (
              <a
                href={`https://wa.me/${business.whatsappNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-4 bg-green-50 hover:bg-green-100 text-green-600 rounded-2xl font-bold transition-all"
              >
                <MessageCircle className="w-6 h-6" />
                <span>WhatsApp: {business.whatsappNumber}</span>
              </a>
            )}

            {business.googleMap && (
              <a
                href={business.googleMap}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-4 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-2xl font-bold transition-all"
              >
                <MapPin className="w-6 h-6" />
                <span>View on Map</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Full Screen Image Preview */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="max-w-5xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Preview" 
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessDetail;
