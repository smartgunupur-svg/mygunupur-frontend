import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, AlertTriangle, Search, Shield, HeartPulse, MapPin } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Emergency: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${API_URL}/emergency-contacts`);
        setContacts(response.data || []);
      } catch (error) {
        console.error('Error fetching emergency contacts:', error);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone?.includes(searchQuery)
  );

  const categoryColors: Record<string, string> = {
    Police: 'from-red-500 to-red-600',
    Ambulance: 'from-green-500 to-emerald-600',
    Fire: 'from-orange-500 to-red-600',
    Women: 'from-pink-500 to-purple-600',
    Hospital: 'from-blue-500 to-cyan-600',
    Disaster: 'from-yellow-500 to-orange-600'
  };

  const categoryIcons: Record<string, React.ElementType> = {
    Police: Shield,
    Ambulance: HeartPulse,
    Fire: AlertTriangle,
    Women: HeartPulse,
    Hospital: HeartPulse,
    Disaster: AlertTriangle
  };

  return (
    <div className="p-4 space-y-6">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full">
          <AlertTriangle className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-wider">Emergency Services</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900">Emergency Contacts</h1>
        <p className="text-sm text-slate-500 font-semibold">Get instant help with one tap call</p>
      </motion.div>

      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, category or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all"
          />
        </div>
      </motion.div>

      {/* Quick Dial Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <a
            href="tel:100"
            className="flex flex-col items-center gap-2 bg-gradient-to-br from-red-500 to-red-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <Shield className="w-8 h-8" />
            <span className="text-xs font-black">Police</span>
            <span className="text-lg font-black">100</span>
          </a>
          <a
            href="tel:108"
            className="flex flex-col items-center gap-2 bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <HeartPulse className="w-8 h-8" />
            <span className="text-xs font-black">Ambulance</span>
            <span className="text-lg font-black">108</span>
          </a>
          <a
            href="tel:101"
            className="flex flex-col items-center gap-2 bg-gradient-to-br from-orange-500 to-red-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <AlertTriangle className="w-8 h-8" />
            <span className="text-xs font-black">Fire</span>
            <span className="text-lg font-black">101</span>
          </a>
        </div>
      </motion.div>

      {/* Contacts Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-slate-700 px-1">All Emergency Contacts</h3>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-2xl"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-slate-200 rounded w-20 mb-2"></div>
                    <div className="h-5 bg-slate-200 rounded w-40"></div>
                  </div>
                </div>
                <div className="h-12 bg-slate-200 rounded-xl"></div>
              </motion.div>
            ))}
          </div>
        ) : filteredContacts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <h4 className="font-bold text-slate-700">No emergency contacts found</h4>
            <p className="text-sm text-slate-500 mt-1">Please check back later</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((contact, index) => {
              const IconComponent = categoryIcons[contact.category] || Phone;
              return (
                <motion.div
                  key={contact._id || contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${categoryColors[contact.category] || 'from-slate-500 to-slate-600'} rounded-2xl flex items-center justify-center`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{contact.category}</span>
                        <h4 className="text-lg font-black text-slate-800 truncate">{contact.name}</h4>
                        {contact.address && (
                          <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{contact.address}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className={`w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r ${categoryColors[contact.category] || 'from-slate-500 to-slate-600'} text-white rounded-xl font-black text-lg hover:opacity-90 transition-all shadow-md`}
                    >
                      <Phone className="w-6 h-6" />
                      {contact.phone}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Emergency;
