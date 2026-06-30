import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Send,
  MessageSquare,
  Globe
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will reach out soon at 9437578310 or via email at smartgunupur@gmail.com.');
  };

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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Contact Us</h1>
              <p className="text-sm text-slate-500 font-medium">Get in touch with us anytime</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 space-y-6 pt-6">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-start justify-between">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-3">We'd Love to Hear From You</h2>
              <p className="text-blue-100 text-lg mb-6">Have questions? Need help? We're here for you!</p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:9437578310" className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 font-bold rounded-2xl hover:shadow-xl transition-all">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Phone</h4>
                  <a href="tel:9437578310" className="text-xl font-bold text-blue-600 block">9437578310</a>
                  <p className="text-sm text-slate-500 mt-1">Available 24×7</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Email</h4>
                  <a href="mailto:smartgunupur@gmail.com" className="text-lg font-bold text-green-600 block">smartgunupur@gmail.com</a>
                  <p className="text-sm text-slate-500 mt-1">We reply within 2 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Address</h4>
                  <p className="text-sm text-slate-600 font-medium">Gunupur, Rayagada</p>
                  <p className="text-sm text-slate-500">Odisha, India</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">WhatsApp</h4>
                  <a href="https://wa.me/919437578310" className="text-lg font-bold text-purple-600 block">Chat with us</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter your phone"
                      defaultValue="9437578310"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="smartgunupur@gmail.com"
                    defaultValue="smartgunupur@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Your Message *</label>
                  <textarea
                    required
                    placeholder="Write your message here..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
