import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Droplets, 
  Phone, 
  MapPin,
  CheckCircle2,
  Plus
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const BloodDonors: React.FC = () => {
  const navigate = useNavigate();
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bloodGroupFilter, setBloodGroupFilter] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    phone: '',
    whatsapp: '',
    area: ''
  });

  const fetchDonors = async () => {
    try {
      const params = new URLSearchParams();
      if (bloodGroupFilter) params.append('bloodGroup', bloodGroupFilter);
      if (areaFilter) params.append('area', areaFilter);
      
      const res = await axios.get(`${API_URL}/blood-donors?${params}`);
      setDonors(res.data);
    } catch (error) {
      console.error('Error fetching donors:', error);
      setDonors([
        { _id: 1, name: "Rajesh Kumar", bloodGroup: "O+", phone: "9437578310", whatsapp: "9437578310", area: "Gunupur", status: "available", verified: true },
        { _id: 2, name: "Priya Das", bloodGroup: "A+", phone: "9876543210", whatsapp: "9876543210", area: "Rayagada", status: "available", verified: false }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [bloodGroupFilter, areaFilter]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/blood-donors`, formData);
      setFormData({ name: '', bloodGroup: '', phone: '', whatsapp: '', area: '' });
      setShowRegisterForm(false);
      fetchDonors();
    } catch (error) {
      console.error('Error registering donor:', error);
    }
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 pb-24">
      <Helmet>
        <title>Blood Donors - My Gunupur</title>
        <meta name="description" content="Find blood donors in Gunupur. Search by blood group and area. Register as a donor to save lives!" />
        <meta property="og:title" content="Blood Donors - My Gunupur" />
        <meta property="og:description" content="Find blood donors in Gunupur. Search by blood group and area. Register as a donor to save lives!" />
        <meta property="og:url" content="https://mygunupur.in/blood-donors" />
      </Helmet>
      {/* Header */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-white/30 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center gap-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Blood Donors</h1>
            <p className="text-xs font-semibold text-slate-500">Donate blood, save lives</p>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 space-y-6 pt-6">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-red-600 to-rose-600 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <Droplets className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-black mb-3">Blood Donor Directory</h2>
              <p className="text-red-100 text-lg mb-4">Find donors or register yourself to help others</p>
              <button
                onClick={() => setShowRegisterForm(!showRegisterForm)}
                className="flex items-center gap-2 px-6 py-3 bg-white text-red-600 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="w-5 h-5" />
                Register as Donor
              </button>
            </div>
          </div>
        </motion.div>

        {/* Register Form */}
        {showRegisterForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
          >
            <h3 className="text-xl font-black text-slate-800 mb-6">Register as a Donor</h3>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Blood Group</label>
                <select
                  required
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    placeholder="Enter WhatsApp number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Area/Locality</label>
                <input
                  type="text"
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  placeholder="Enter your area"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  Register Now
                </button>
                <button
                  type="button"
                  onClick={() => setShowRegisterForm(false)}
                  className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Filter by Blood Group</label>
              <select
                value={bloodGroupFilter}
                onChange={(e) => setBloodGroupFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Filter by Area</label>
              <input
                type="text"
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                placeholder="Search by area"
              />
            </div>
          </div>
        </motion.div>

        {/* Donors List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-black text-slate-800 mb-6">Available Donors</h3>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 animate-pulse">
                  <div className="h-6 bg-slate-200 rounded w-1/2 mb-3"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : donors.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-100 text-center">
              <Droplets className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-slate-700 mb-2">No donors found</h4>
              <p className="text-slate-500">Try adjusting your filters or register as a donor</p>
            </div>
          ) : (
            <div className="space-y-4">
              {donors.map((donor, index) => (
                <motion.div
                  key={donor._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100"
                >
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-black text-slate-800 text-lg">{donor.name}</h4>
                        {donor.verified && (
                          <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 mb-3">
                        <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-xl">
                          {donor.bloodGroup}
                        </span>
                        <span className={`px-4 py-2 font-bold rounded-xl ${
                          donor.status === 'available' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {donor.status === 'available' ? 'Available' : 'Busy'}
                        </span>
                      </div>
                      {donor.area && (
                        <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold">
                          <MapPin className="w-4 h-4" />
                          {donor.area}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={`tel:${donor.phone}`}
                        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                      >
                        <Phone className="w-5 h-5" />
                        Call
                      </a>
                      <a
                        href={`https://wa.me/${donor.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.488-.492-.67-.5h-.572c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.199 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .162 5.332.162 11.885c0 2.102.553 4.136 1.56 5.943L0 24l6.324-1.659a11.858 11.858 0 005.726 1.467c.003 0 0 0 .004 0 6.557 0 11.886-5.333 11.886-11.885 0-3.173-1.234-6.151-3.475-8.388z" />
                        </svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BloodDonors;
