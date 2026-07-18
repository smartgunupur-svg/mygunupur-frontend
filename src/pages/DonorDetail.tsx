import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CalendarDays, Heart } from 'lucide-react';

const DonorDetail: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-white/30 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center gap-4 py-4">
          <button
            onClick={() => navigate('/blood-donors')}
            className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Donor Tribute</h1>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 space-y-6 pt-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 text-center"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">Late Teacher & Well-Wisher</h2>
          <div className="flex items-center justify-center gap-2 text-slate-500 mb-6">
            <CalendarDays className="w-4 h-4" />
            <span className="font-semibold">Passed Away on 14th February 2023</span>
          </div>
          
          <div className="text-left space-y-4 max-w-2xl mx-auto">
            <p className="text-slate-600 leading-relaxed">
              A dedicated teacher and a beloved well-wisher of Gunupur, who touched countless lives with kindness, wisdom, and selfless service. 
              Their legacy of compassion and commitment to the community continues to inspire everyone who knew them.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="bg-red-50 rounded-2xl p-4 text-left">
                <h4 className="font-bold text-red-700 mb-2">Profession</h4>
                <p className="text-slate-600">Teacher</p>
              </div>
              <div className="bg-rose-50 rounded-2xl p-4 text-left">
                <h4 className="font-bold text-rose-700 mb-2">Location</h4>
                <p className="text-slate-600 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Gunupur, Odisha
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-red-600 to-rose-600 text-white rounded-3xl p-8 shadow-xl text-center"
        >
          <Heart className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h3 className="text-2xl font-black mb-3">A Heart of Gold</h3>
          <p className="text-red-100">
            Your kindness will never be forgotten. Thank you for everything you did for our community.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DonorDetail;
