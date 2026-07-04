import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  Droplets,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminBloodDonors: React.FC = () => {
  const navigate = useNavigate();
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDonor, setEditingDonor] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    phone: '',
    whatsapp: '',
    area: '',
    status: 'available',
    verified: false
  });

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

    fetchDonors();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

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
      setFormData({ name: '', bloodGroup: '', phone: '', whatsapp: '', area: '', status: 'available', verified: false });
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
      whatsapp: donor.whatsapp,
      area: donor.area,
      status: donor.status,
      verified: donor.verified
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

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 pb-32">
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50"
        style={{ height: '72px' }}
      >
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 hover:bg-slate-100 rounded-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-red-700 to-rose-600 bg-clip-text text-transparent">
                  Blood Donors
                </h1>
                <p className="text-xs text-slate-500 font-medium">{donors.length} donors</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all font-semibold text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 space-y-4 pt-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-red-600 to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add New Donor'}
        </button>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingDonor ? 'Edit Donor' : 'Add New Donor'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                  placeholder="Enter donor name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Blood Group</label>
                  <select
                    required
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                  >
                    <option value="">Select blood group</option>
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                  >
                    <option value="available">Available</option>
                    <option value="busy">Busy</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp Number</label>
                  <input
                    type="text"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                    placeholder="Enter WhatsApp number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Area/Locality</label>
                <input
                  type="text"
                  required
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
                  placeholder="Enter area"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="verified"
                  checked={formData.verified}
                  onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                  className="w-5 h-5 text-red-600 rounded focus:ring-red-500"
                />
                <label htmlFor="verified" className="text-sm font-bold text-slate-700">Verified Donor</label>
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
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-800">{donor.name}</h3>
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
                    {donor.phone && (
                      <div className="mt-2 flex items-center gap-2 text-slate-600">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${donor.phone}`} className="font-bold text-slate-800 hover:text-red-600">
                          {donor.phone}
                        </a>
                      </div>
                    )}
                    {donor.area && (
                      <div className="mt-2 flex items-start gap-2 text-slate-600">
                        <MapPin className="w-4 h-4 mt-0.5" />
                        <span className="text-sm">{donor.area}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(donor)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(donor._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
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
    </div>
  );
};

export default AdminBloodDonors;
