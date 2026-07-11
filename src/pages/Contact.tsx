import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Contact: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API_URL}/settings`);
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const contactDetails = settings?.contactDetails || {
    phone: '9437578310',
    email: 'smartgunupur@gmail.com',
    address: 'Gunupur, Rayagada, Odisha'
  };

  return (
    <div className="p-4 space-y-6">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-2xl md:text-3xl font-black text-slate-900">Contact Us</h1>
        <p className="text-sm text-slate-500 font-semibold">We'd love to hear from you</p>
      </motion.div>

      {/* Contact Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
            <Phone className="w-7 h-7 text-blue-600" />
          </div>
          <h4 className="font-bold text-slate-800 mb-1">Phone</h4>
          <a
            href={`tel:${contactDetails.phone}`}
            className="text-lg font-black text-blue-600 block"
          >
            {contactDetails.phone}
          </a>
          <p className="text-xs text-slate-500 mt-1">Available 24×7</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
            <Mail className="w-7 h-7 text-green-600" />
          </div>
          <h4 className="font-bold text-slate-800 mb-1">Email</h4>
          <a
            href={`mailto:${contactDetails.email}`}
            className="text-sm font-black text-green-600 block break-all"
          >
            {contactDetails.email}
          </a>
          <p className="text-xs text-slate-500 mt-1">We reply within 2 hours</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
            <MapPin className="w-7 h-7 text-orange-600" />
          </div>
          <h4 className="font-bold text-slate-800 mb-1">Address</h4>
          <p className="text-sm text-slate-600 font-semibold">{contactDetails.address}</p>
        </div>
      </motion.div>

      {/* WhatsApp Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <a
          href={`https://wa.me/91${contactDetails.phone?.replace(/\D/g, '')}`}
          className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
        >
          <MessageSquare className="w-6 h-6" />
          Chat on WhatsApp
        </a>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-xl font-black text-slate-800 mb-6">Send us a Message</h3>
          {submitSuccess ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-10 h-10 text-green-600" />
              </div>
              <h4 className="text-xl font-black text-slate-800 mb-2">Message Sent!</h4>
              <p className="text-sm text-slate-500">We'll get back to you soon</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-semibold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-semibold"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Your Message *</label>
                <textarea
                  required
                  placeholder="Write your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-semibold resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
