import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Phone, 
  Mail, 
  MapPin
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const Emergency: React.FC = () => {
  const navigate = useNavigate();
  const [emergencyContacts, setEmergencyContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(`${API_URL}/emergency-contacts`);
        setEmergencyContacts(res.data);
      } catch (error) {
        console.error('Error fetching emergency contacts:', error);
        setEmergencyContacts([
          { _id: '1', category: "Police", name: "Police Station Gunupur", phone: "100", color: "from-red-500 to-rose-600", bg: "bg-red-50" },
          { _id: '2', category: "Fire", name: "Fire Station Gunupur", phone: "101", color: "from-orange-500 to-red-600", bg: "bg-orange-50" },
          { _id: '3', category: "Ambulance", name: "Ambulance Service", phone: "108", color: "from-blue-500 to-indigo-600", bg: "bg-blue-50" },
          { _id: '4', category: "Hospital", name: "District HQ Hospital", phone: "9437578310", color: "from-green-500 to-emerald-600", bg: "bg-green-50" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Helmet>
        <title>Emergency Contacts - My Gunupur</title>
        <meta name="description" content="Find all emergency contact numbers in Gunupur including police, fire, ambulance, and hospitals. Get help quickly!" />
        <meta property="og:title" content="Emergency Contacts - My Gunupur" />
        <meta property="og:description" content="Find all emergency contact numbers in Gunupur including police, fire, ambulance, and hospitals. Get help quickly!" />
        <meta property="og:url" content="https://mygunupur.in/emergency" />
      </Helmet>
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Emergency Contacts</h1>
              <p className="text-sm text-slate-500 font-medium">Immediate help at your fingertips</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 space-y-6 pt-6">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-red-600 via-red-700 to-orange-600 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-start justify-between">
            <div className="max-w-md">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-3">Emergency Help</h2>
              <p className="text-red-100 text-lg mb-6">One tap call to all essential emergency services in Gunupur</p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:9437578310" className="flex items-center gap-2 px-6 py-3 bg-white text-red-700 font-bold rounded-2xl hover:shadow-xl transition-all">
                  <Phone className="w-5 h-5" />
                  Call: 9437578310
                </a>
                <a href="mailto:smartgunupur@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur border border-white/30 font-bold rounded-2xl hover:bg-white/30 transition-all">
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Emergency Contacts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Call Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              [1,2,3,4,5,6].map((i) => (
                <div key={i} className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 animate-pulse">
                  <div className="w-16 h-16 bg-slate-200 rounded-3xl mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
                  <div className="h-6 bg-slate-200 rounded w-2/3 mb-2"></div>
                  <div className="h-8 bg-slate-200 rounded w-1/2 mb-4"></div>
                  <div className="h-12 bg-slate-200 rounded-2xl"></div>
                </div>
              ))
            ) : (
              emergencyContacts.map((contact, index) => (
                <motion.div
                  key={contact._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className={cn("bg-white rounded-3xl p-6 shadow-xl border border-slate-100", contact.bg || "bg-slate-50")}
                >
                  <div className="flex flex-col gap-4">
                    <div className={cn("w-16 h-16 bg-gradient-to-br rounded-3xl flex items-center justify-center shadow-lg", contact.color || "from-red-500 to-rose-600")}>
                      <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{contact.category}</span>
                      <h4 className="font-bold text-slate-800 text-lg">{contact.name}</h4>
                      <p className="text-3xl font-black text-slate-900 mt-1">{contact.phone}</p>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className={cn("w-full py-4 bg-gradient-to-r text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2", contact.color || "from-red-500 to-rose-600")}
                    >
                      <Phone className="w-5 h-5" />
                      Call Now
                    </a>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Contact Cards */}
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
            <p className="text-sm text-slate-500">24×7 Available</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Email Us</h4>
            <a href="mailto:smartgunupur@gmail.com" className="text-lg font-bold text-green-600 block mb-1">smartgunupur@gmail.com</a>
            <p className="text-sm text-slate-500">Quick response</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-orange-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Location</h4>
            <p className="text-sm text-slate-500">Gunupur, Rayagada, Odisha</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Emergency;
