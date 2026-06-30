import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Home,
  FileText,
  Map
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const BuildingEnquiry: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '9437578310',
    email: 'smartgunupur@gmail.com',
    address: '',
    plotNumber: '',
    ward: '',
    requirement: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/building-enquiries`, formData);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: '',
          phone: '9437578310',
          email: 'smartgunupur@gmail.com',
          address: '',
          plotNumber: '',
          ward: '',
          requirement: '',
          message: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Error submitting enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Building Plan Permission</h1>
              <p className="text-sm text-slate-500 font-medium">Apply for Building Approval</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 space-y-6 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-semibold">
                  Fast Approval
                </div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-semibold">
                  Expert Guidance
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-3">Get Your Building Plan Approved</h2>
              <p className="text-green-100 text-lg mb-6">Submit your details and our team will assist you with building plan permission process</p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:9437578310" className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 font-bold rounded-2xl hover:shadow-xl transition-all">
                  <Phone className="w-5 h-5" />
                  Call: 9437578310
                </a>
                <a href="mailto:smartgunupur@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur border border-white/30 font-bold rounded-2xl hover:bg-white/30 transition-all">
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="text-9xl animate-bounce">🏗️</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">Submit Your Enquiry</h3>
              <p className="text-sm text-slate-500 font-medium">Fill the form below and we'll get back to you soon</p>
            </div>
          </div>

          {submitSuccess ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Enquiry Submitted Successfully!</h3>
              <p className="text-slate-500">Our team will contact you shortly</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all text-slate-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="9437578310"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="smartgunupur@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all text-slate-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Plot Number</label>
                  <input
                    type="text"
                    name="plotNumber"
                    placeholder="Enter plot number"
                    value={formData.plotNumber}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Ward</label>
                  <input
                    type="text"
                    name="ward"
                    placeholder="Enter ward number"
                    value={formData.ward}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all text-slate-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Requirement Type *</label>
                  <select
                    name="requirement"
                    required
                    value={formData.requirement}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all text-slate-800 font-medium"
                  >
                    <option value="">Select Requirement</option>
                    <option value="new-construction">New Construction</option>
                    <option value="renovation">Renovation/Extension</option>
                    <option value="plan-approval">Plan Approval</option>
                    <option value="permission">Building Permission</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Address</label>
                <textarea
                  name="address"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all text-slate-800 font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Message / Details</label>
                <textarea
                  name="message"
                  placeholder="Tell us more about your requirement..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-green-500 focus:bg-white transition-all text-slate-800 font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    Submit Enquiry
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Phone className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2 text-lg">Call Us</h4>
            <a href="tel:9437578310" className="text-2xl font-black text-green-600 block mb-1">9437578310</a>
            <p className="text-sm text-slate-500 font-medium">Available 24×7</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Mail className="w-8 h-8 text-teal-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2 text-lg">Email Us</h4>
            <a href="mailto:smartgunupur@gmail.com" className="text-lg font-bold text-teal-600 block mb-1">smartgunupur@gmail.com</a>
            <p className="text-sm text-slate-500 font-medium">Reply within 2 hours</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Map className="w-8 h-8 text-yellow-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2 text-lg">Visit Us</h4>
            <p className="text-sm text-slate-500 font-medium">Gunupur, Rayagada, Odisha</p>
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-28 right-4 flex flex-col gap-3 z-40">
        <motion.a
          href="https://wa.me/919437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-green-500 rounded-2xl shadow-xl flex items-center justify-center"
        >
          <span className="text-white text-3xl">💬</span>
        </motion.a>
        <motion.a
          href="tel:9437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-green-600 rounded-2xl shadow-xl flex items-center justify-center"
        >
          <Phone className="w-8 h-8 text-white" />
        </motion.a>
      </div>
    </div>
  );
};

export default BuildingEnquiry;
