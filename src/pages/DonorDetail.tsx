import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CalendarDays, Heart, Candle, Sparkles } from 'lucide-react';

const DonorDetail: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-rose-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-100 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center gap-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all group"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600 group-hover:text-rose-600" />
          </button>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">A Tribute</h1>
          </div>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 space-y-8 pt-8 pb-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 via-amber-500 to-rose-600 text-white shadow-2xl"
        >
          {/* Decorative glows */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-rose-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 p-10 md:p-16 text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto border border-white/30 shadow-inner">
                <Heart className="w-14 h-14 text-white" />
              </div>
            </motion.div>
            
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-black mb-4 drop-shadow-lg"
            >
              In Loving Memory
            </motion.h2>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-rose-100 mb-6"
            >
              Late Teacher & Well-Wisher of Gunupur
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-3 text-rose-100 font-semibold"
            >
              <Candle className="w-6 h-6" />
              <span className="text-lg">Passed Away on 14th February 2023</span>
            </motion.div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-8 h-8 text-amber-500" />
            <h3 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-amber-700 bg-clip-text text-transparent">A Life of Service</h3>
          </div>
          
          <div className="space-y-6 text-slate-700">
            <p className="text-lg leading-relaxed">
              A dedicated teacher, a compassionate mentor, and a beloved well-wisher of Gunupur, who touched countless lives with 
              kindness, wisdom, and selfless service. Their legacy of compassion and commitment to the community continues to 
              inspire everyone who knew them.
            </p>
            
            <p className="text-lg leading-relaxed">
              Through their tireless efforts, they helped shape the future of many young minds in our town. Their generosity 
              knew no bounds, and their dedication to the betterment of Gunupur will be remembered for generations to come.
            </p>
          </div>
        </motion.div>

        {/* Details Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-3xl p-8 border border-rose-200 shadow-lg">
            <Heart className="w-8 h-8 text-rose-600 mb-4" />
            <h4 className="text-xl font-black text-slate-800 mb-2">Profession</h4>
            <p className="text-slate-700 font-semibold">Teacher & Community Guide</p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl p-8 border border-amber-200 shadow-lg">
            <MapPin className="w-8 h-8 text-amber-600 mb-4" />
            <h4 className="text-xl font-black text-slate-800 mb-2">Location</h4>
            <p className="text-slate-700 font-semibold">Gunupur, Rayagada, Odisha</p>
          </div>
        </motion.div>

        {/* Closing Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-10 shadow-2xl text-center"
        >
          <Candle className="w-12 h-12 mx-auto mb-6 text-amber-400" />
          <h3 className="text-3xl font-black mb-4">Forever in Our Hearts</h3>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Your kindness, your wisdom, and your love for our community will never be forgotten. 
            Thank you for everything you did for Gunupur. You will always be with us in spirit.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DonorDetail;
