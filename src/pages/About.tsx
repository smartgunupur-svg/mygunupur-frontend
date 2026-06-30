import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  Building2, 
  Globe
} from 'lucide-react';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 glass bg-white/90 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-3 hover:bg-slate-100 rounded-2xl transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">About Gunupur</h1>
              <p className="text-sm text-slate-500 font-medium">Know our town better</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 space-y-6 pt-6">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-500 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Welcome to Gunupur</h2>
            <p className="text-slate-300 text-lg max-w-2xl">
              A beautiful town nestled in the Rayagada district of Odisha, known for its scenic beauty, rich culture, and warm-hearted people.
            </p>
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
              <MapPin className="w-7 h-7 text-blue-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Location</h4>
            <p className="text-sm text-slate-600">Rayagada District, Odisha</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-green-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Population</h4>
            <p className="text-sm text-slate-600">Approx. 80,000+</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
              <Building2 className="w-7 h-7 text-orange-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">District</h4>
            <p className="text-sm text-slate-600">Rayagada</p>
          </div>
        </motion.div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-6">About My Gunupur Portal</h3>
          <p className="text-slate-700 mb-4 leading-relaxed">
            My Gunupur is an independent citizen service portal designed to help the residents of Gunupur easily access important services, emergency contacts, home loan information, building plan assistance, and much more in one place.
          </p>
          <p className="text-slate-700 mb-4 leading-relaxed">
            Our mission is to make essential services accessible to every citizen with just a few taps on their phone. We believe in using technology to make people's lives easier and better.
          </p>
          <p className="text-slate-700 leading-relaxed">
            This portal is not an official government website but a community initiative to serve the people of Gunupur with dedication and quality.
          </p>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Call Us</h4>
            <a href="tel:9437578310" className="text-2xl font-black text-blue-600 block mb-1">9437578310</a>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Email Us</h4>
            <a href="mailto:smartgunupur@gmail.com" className="text-lg font-bold text-green-600 block mb-1">smartgunupur@gmail.com</a>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-orange-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Visit Us</h4>
            <p className="text-sm text-slate-500">Gunupur, Rayagada, Odisha</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
