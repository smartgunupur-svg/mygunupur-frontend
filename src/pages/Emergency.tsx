import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Phone,
  AlertTriangle,
  Home,
  MapPin,
  HeartPulse,
  Shield,
  Search
} from 'lucide-react';
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
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching emergency contacts:', error);
        setContacts([
          { id: 1, category: 'Police', name: 'Police Station Gunupur', phone: '100', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=200&fit=crop' },
          { id: 2, category: 'Ambulance', name: 'Ambulance Service', phone: '108', image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=200&h=200&fit=crop' },
          { id: 3, category: 'Fire', name: 'Fire Service', phone: '101', image: 'https://images.unsplash.com/photo-1600003270844-975d221d0b7a?w=200&h=200&fit=crop' },
          { id: 4, category: 'Women', name: 'Women Helpline', phone: '1091', image: 'https://images.unsplash.com/photo-1531123414780-f7422387418a?w=200&h=200&fit=crop' },
          { id: 5, category: 'Hospital', name: 'District Hospital', phone: '06859-222222', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=200&h=200&fit=crop' },
          { id: 6, category: 'Disaster', name: 'Disaster Management', phone: '1078', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=200&h=200&fit=crop' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
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
    <div className="min-h-screen bg-[#f8fafc] pb-28">
      <Helmet>
        <title>Emergency Contacts - My Gunupur</title>
        <meta name="description" content="Get all emergency contacts for Gunupur" />
      </Helmet>

      {/* Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <img src="/layoutlogo.png" alt="My Gunupur" className="h-12 w-12" />
              <div className="leading-tight">
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                  My <span className="font-serif italic">Gunupur</span>
                </h1>
                <p className="text-xs text-gray-600 font-medium">Everything You Need, All in One Place</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Emergency Helpline Numbers</h2>
            <p className="text-lg text-red-100 mb-6">Get instant help in case of any emergency</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="tel:100"
                className="flex items-center gap-2 px-8 py-3 bg-white text-red-700 rounded-xl font-bold shadow-lg hover:bg-yellow-100 transition-all"
              >
                <Phone className="w-5 h-5" /> Call Police (100)
              </a>
              <a
                href="tel:108"
                className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-xl font-bold shadow-lg hover:bg-green-600 transition-all"
              >
                <HeartPulse className="w-5 h-5" /> Call Ambulance (108)
              </a>
              <a
                href="tel:101"
                className="flex items-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-xl font-bold shadow-lg hover:bg-orange-600 transition-all"
              >
                <AlertTriangle className="w-5 h-5" /> Call Fire (101)
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search emergency services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm text-lg"
            />
          </div>
        </motion.div>

        {/* Emergency Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gray-200" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
                      <div className="h-6 bg-gray-200 rounded w-40" />
                    </div>
                  </div>
                  <div className="h-12 bg-gray-200 rounded-xl" />
                </div>
              </motion.div>
            ))
          ) : (
            filteredContacts.map((contact, index) => {
              const IconComponent = categoryIcons[contact.category] || Phone;
              return (
                <motion.div
                  key={contact.id || contact._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${categoryColors[contact.category] || 'from-gray-500 to-gray-600'} rounded-2xl flex items-center justify-center`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-gray-500">{contact.category}</span>
                        <h3 className="text-xl font-bold text-gray-800">{contact.name}</h3>
                      </div>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className={`w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r ${categoryColors[contact.category] || 'from-gray-500 to-gray-600'} text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all`}
                    >
                      <Phone className="w-6 h-6" />
                      {contact.phone}
                    </a>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Quick Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
            <Shield className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-blue-800 mb-2">Safety First</h3>
            <p className="text-blue-700 text-sm">Always keep these numbers handy for any emergency situation.</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
            <MapPin className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-lg font-bold text-green-800 mb-2">Nearby Services</h3>
            <p className="text-green-700 text-sm">All contact numbers are for Gunupur and nearby areas.</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl border border-yellow-200">
            <Home className="w-10 h-10 text-yellow-600 mb-4" />
            <h3 className="text-lg font-bold text-yellow-800 mb-2">24/7 Support</h3>
            <p className="text-yellow-700 text-sm">Most emergency services are available 24 hours a day.</p>
          </div>
        </motion.div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-28 right-5 flex flex-col gap-3 z-40">
        <motion.a
          href="https://wa.me/919437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center"
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.488-.492-.67-.5h-.572c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .162 5.332.162 11.885c0 2.102.553 4.136 1.56 5.943L0 24l6.324-1.659a11.858 11.858 0 005.726 1.467c.003 0 0 0 .004 0 6.557 0 11.886-5.333 11.886-11.885 0-3.173-1.234-6.151-3.475-8.388"/>
          </svg>
        </motion.a>
        <motion.a
          href="tel:9437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: 'spring' }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg flex items-center justify-center"
        >
          <Phone className="w-6 h-6 text-white" />
        </motion.a>
      </div>
    </div>
  );
};

export default Emergency;
