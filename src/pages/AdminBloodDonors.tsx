import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, 
  Plus, 
  Edit, 
  Trash2, 
  Droplets,
  MapPin,
  CheckCircle2,
  Key,
  Clock,
  CalendarDays
} from 'lucide-react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface AccessKey {
  _id: string;
  key: string;
  donorId: string;
  donorName: string;
  expiresAt: string;
  createdAt: string;
}

const AdminBloodDonors: React.FC = () => {
  const navigate = useNavigate();
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDonor, setEditingDonor] = useState<any | null>(null);
  const [activeKeys, setActiveKeys] = useState<AccessKey[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    phone: '',
    area: '',
    status: 'available',
    verified: false,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    age: '',
    gender: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchDonors = async () => {
      try {
        const response = await axios.get(`${API_URL}/blood-donors`);
        setDonors(response.data);
      } catch (error) {
        console.error('Error fetching donors:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchActiveKeys = async () => {
      try {
        const response = await axios.get(`${API_URL}/blood-donors/access-keys/active`);
        setActiveKeys(response.data);
      } catch (error) {
        console.error('Error fetching active keys:', error);
      }
    };

    fetchDonors();
    fetchActiveKeys();
  }, [navigate]);

  // Refresh active keys every 10 seconds
  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const response = await axios.get(`${API_URL}/blood-donors/access-keys/active`);
        setActiveKeys(response.data);
      } catch (error) {
        console.error('Error refreshing active keys:', error);
      }
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      if (editingDonor) {
        await axios.put(`${API_URL}/blood-donors/${editingDonor._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDonors(donors.map(d => d._id === editingDonor._id ? { ...d, ...formData } : d));
      } else {
        const response = await axios.post(`${API_URL}/blood-donors`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDonors([...donors, response.data]);
      }
      setShowForm(false);
      setEditingDonor(null);
      setFormData({ 
        name: '', 
        bloodGroup: '', 
        phone: '', 
        area: '', 
        status: 'available', 
        verified: false,
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        age: '',
        gender: ''
      });
    } catch (error) {
      console.error('Error saving donor:', error);
    }
  };

  const handleEdit = (donor: any) => {
    setEditingDonor(donor);
    setFormData({
      name: donor.name,
      bloodGroup: donor.bloodGroup,
      phone: donor.phone,
      area: donor.area || '',
      status: donor.status || 'available',
      verified: donor.verified || false,
      availability: donor.availability || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      age: donor.age || '',
      gender: donor.gender || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this donor?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/blood-donors/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDonors(donors.filter(d => d._id !== id));
    } catch (error) {
      console.error('Error deleting donor:', error);
    }
  };

  const generateKey = async (donor: any) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(
        `${API_URL}/blood-donors/${donor._id}/generate-key`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Generated key for ${donor.name}: ${response.data.key}`);
      // Refresh active keys
      const keysResponse = await axios.get(`${API_URL}/blood-donors/access-keys/active`);
      setActiveKeys(keysResponse.data);
    } catch (error) {
      console.error('Error generating key:', error);
      alert('Failed to generate key');
    }
  };

  const deleteKey = async (keyId: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/blood-donors/access-keys/${keyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh active keys
      const response = await axios.get(`${API_URL}/blood-donors/access-keys/active`);
      setActiveKeys(response.data);
    } catch (error) {
      console.error('Error deleting key:', error);
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

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-4 pt-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h2 className="text-3xl font-black text-slate-800">Blood Donors Management</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-red-600 to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            {showForm ? 'Cancel' : 'Add New Donor'}
          </button>
        </div>
      </div>

      {/* Active Access Keys */}
      {activeKeys.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Key className="w-6 h-6 text-amber-600" />
            <h3 className="text-xl font-black text-amber-800">Active Access Keys</h3>
          </div>
          <div className="space-y-3">
            {activeKeys.map((accessKey) => {
              const timeLeft = Math.max(0, Math.ceil((new Date(accessKey.expiresAt).getTime() - Date.now()) / 1000));
              return (
                <div
                  key={accessKey._id}
                  className="bg-white rounded-2xl p-4 border border-amber-200 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-100 px-4 py-2 rounded-xl">
                      <span className="text-2xl font-black text-amber-800">{accessKey.key}</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{accessKey.donorName}</p>
                      <div className="flex items-center gap-2 text-amber-700 text-sm">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">{timeLeft}s remaining</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteKey(accessKey._id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-xl"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
        >
          <h3 className="text-xl font-black text-slate-800 mb-6">
            {editingDonor ? 'Edit Donor' : 'Add New Donor'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                placeholder="Enter donor name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Blood Group</label>
                <select
                  required
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Age</label>
                <input
                  type="number"
                  min="18"
                  max="60"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                  placeholder="Age"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Area/Locality</label>
              <input
                type="text"
                required
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                placeholder="Enter area"
              />
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

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="verified"
                checked={formData.verified}
                onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
              />
              <label htmlFor="verified" className="text-sm font-semibold text-slate-700">Verified Donor</label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-br from-red-600 to-rose-600 text-white font-bold rounded-xl"
            >
              {editingDonor ? 'Update Donor' : 'Add Donor'}
            </button>
          </form>
        </motion.div>
      )}

      {/* Donors List */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 text-lg">Loading donors...</div>
      ) : donors.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-100"
        >
          <Droplets className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">No Donors Yet</h3>
          <p className="text-slate-500">Add donors to display</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {donors.map((donor, index) => (
            <motion.div
              key={donor._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
            >
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-black text-slate-800">{donor.name}</h3>
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

                  {donor.phone && (
                    <div className="mt-2 flex items-center gap-2 text-slate-600">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${donor.phone}`} className="font-semibold text-slate-800 hover:text-red-600">
                        {donor.phone}
                      </a>
                    </div>
                  )}

                  {donor.area && (
                    <div className="mt-2 flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4 mt-0.5" />
                      <span className="text-sm">{donor.area}</span>
                    </div>
                  )}

                  {donor.availability && (
                    <div className="mt-2 flex items-center gap-2 text-slate-500 text-xs">
                      <CalendarDays className="w-4 h-4" />
                      <span>Available: {donor.availability.map((d: string) => d.slice(0,3)).join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => generateKey(donor)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Key className="w-4 h-4" />
                    Generate Key
                  </button>
                  <button
                    onClick={() => handleEdit(donor)}
                    className="p-2 text-amber-600 hover:bg-amber-100 rounded-xl"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(donor._id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-xl"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBloodDonors;