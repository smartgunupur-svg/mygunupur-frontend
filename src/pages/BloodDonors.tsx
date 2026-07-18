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
  Plus,
  Lock,
  Unlock,
  CalendarDays,
  LocateFixed
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
    area: '',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    age: '',
    gender: ''
  });
  const [accessKey, setAccessKey] = useState('');
  const [keyValid, setKeyValid] = useState(false);
  const [isLifetimeKey, setIsLifetimeKey] = useState(false);

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
        { _id: 1, name: "Rajesh Kumar", bloodGroup: "O+", phone: "9437578310", area: "Gunupur", status: "available", verified: true, availability: ['Monday', 'Wednesday', 'Friday'], age: 28, gender: 'Male' },
        { _id: 2, name: "Priya Das", bloodGroup: "A+", phone: "9876543210", area: "Rayagada", status: "available", verified: false, availability: ['Tuesday', 'Thursday', 'Saturday'], age: 25, gender: 'Female' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [bloodGroupFilter, areaFilter]);

  const handleGetGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Use OpenStreetMap Nominatim for reverse geocoding (free!)
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
            .then(res => res.json())
            .then(data => {
              const address = data.address;
              const locality = address.suburb || address.village || address.town || address.city || address.state_district || '';
              setFormData(prev => ({ ...prev, area: locality }));
            })
            .catch(err => console.error('Error getting address:', err));
        },
        (err) => console.error('Error getting location:', err)
      );
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/blood-donors`, formData);
      setFormData({ name: '', bloodGroup: '', phone: '', area: '', availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], age: '', gender: '' });
      setShowRegisterForm(false);
      fetchDonors();
    } catch (error) {
      console.error('Error registering donor:', error);
    }
  };

  const handleVerifyKey = async () => {
    try {
      const response = await axios.post(`${API_URL}/blood-donors/verify-key`, {
        key: accessKey
      });
      if (response.data.valid) {
        setKeyValid(true);
        setIsLifetimeKey(response.data.isLifetime || false);
      } else {
        alert('Invalid or expired key! Please call 9437578310 to get a valid key.');
      }
    } catch (error) {
      alert('Invalid or expired key! Please call 9437578310 to get a valid key.');
    }
  };

  const toggleAvailability = (day: string) => {
    setFormData(prev => {
      const current = prev.availability.includes(day);
      return {
        ...prev,
        availability: current 
          ? prev.availability.filter(d => d !== day)
          : [...prev.availability, day]
      };
    });
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-amber-800 mb-2">To contact a donor</h3>
              <p className="text-amber-700 text-sm mb-3">
                Call <a href="tel:9437578310" className="font-black underline hover:text-amber-900">9437578310</a> to get a 4-digit access key.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Access Key Input */}
        {!keyValid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100"
          >
            <h3 className="font-black text-slate-800 mb-4 text-lg">Enter Access Key</h3>
            <div className="flex gap-3">
              <input
                type="text"
                maxLength={4}
                placeholder="Enter 4-digit key"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all text-center font-black text-2xl"
              />
              <button
                onClick={handleVerifyKey}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <Unlock className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Valid Key Banner */}
        {keyValid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-green-800">
                  {isLifetimeKey ? 'Lifetime access activated!' : 'Access activated!'}
                </p>
              </div>
              <button
                onClick={() => setKeyValid(false)}
                className="px-4 py-2 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-all"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
          >
            <h3 className="text-xl font-black text-slate-800 mb-6">Register as a Donor</h3>
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Age</label>
                  <input
                    type="number"
                    min="18"
                    max="60"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    placeholder="Your age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
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
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Area/Locality</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                    placeholder="Enter your area"
                  />
                  <button
                    type="button"
                    onClick={handleGetGPS}
                    className="px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-2xl border border-blue-200 transition-all"
                  >
                    <LocateFixed className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Availability Days</label>
                <div className="grid grid-cols-4 gap-2">
                  {days.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleAvailability(day)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        formData.availability.includes(day)
                          ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {day.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
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
          transition={{ delay: 0.3 }}
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
          transition={{ delay: 0.4 }}
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
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100"
                >
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="font-black text-slate-800 text-lg">
                          {keyValid ? donor.name : `${donor.name.slice(0, 2)}***`}
                        </h4>
                        {donor.verified && (
                          <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            Verified
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mb-4">
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
                        {donor.age && (
                          <span className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl">
                            {donor.age} yrs
                          </span>
                        )}
                        {donor.gender && (
                          <span className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl">
                            {donor.gender}
                          </span>
                        )}
                      </div>

                      {donor.area && (
                        <div className="flex items-center gap-2 text-slate-600 text-sm font-semibold mb-3">
                          <MapPin className="w-4 h-4" />
                          {donor.area}
                        </div>
                      )}

                      {donor.availability && (
                        <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
                          <CalendarDays className="w-4 h-4" />
                          <span>Available: {donor.availability.map((d: string) => d.slice(0,3)).join(', ')}</span>
                        </div>
                      )}

                      {/* Show donor details if key is valid */}
                      {keyValid && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-4 border-t border-slate-100"
                        >
                          <a
                            href={`tel:${donor.phone}`}
                            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                          >
                            <Phone className="w-5 h-5" />
                            Call {donor.phone}
                          </a>
                        </motion.div>
                      )}

                      {/* Locked message if key not valid */}
                      {!keyValid && (
                        <div className="flex gap-2">
                          <div className="flex items-center gap-2 px-5 py-3 bg-slate-100 text-slate-500 font-bold rounded-2xl">
                            <Lock className="w-5 h-5" />
                            Enter access key to view details
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>



        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-900 rounded-3xl p-8 text-white mt-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-black text-2xl mb-4">My Gunupur</h3>
              <p className="text-slate-400 text-sm">Your one-stop platform for all services in Gunupur, Odisha.</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => navigate('/about')} className="block text-sm text-slate-400 hover:text-white transition-colors">
                  About Us
                </button>
                <button onClick={() => navigate('/contact')} className="block text-sm text-slate-400 hover:text-white transition-colors">
                  Contact
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <div className="space-y-2">
                <button onClick={() => navigate('/privacy-policy')} className="block text-sm text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </button>
                <button onClick={() => navigate('/terms-of-service')} className="block text-sm text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm">© 2025 My Gunupur. All rights reserved.</p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default BloodDonors;