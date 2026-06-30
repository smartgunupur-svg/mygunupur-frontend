import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  Home
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminBanks: React.FC = () => {
  const navigate = useNavigate();
  const [banks, setBanks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBank, setEditingBank] = useState<any | null>(null);
  const [formData, setFormData] = useState({ name: '', logo: '' });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchBanks = async () => {
      try {
        const response = await axios.get(`${API_URL}/banks`);
        setBanks(response.data);
      } catch (error) {
        console.error('Error fetching banks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
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
      if (editingBank) {
        await axios.put(`${API_URL}/banks/${editingBank._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBanks(banks.map(b => b._id === editingBank._id ? { ...b, ...formData } : b));
      } else {
        const response = await axios.post(`${API_URL}/banks`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBanks([...banks, response.data]);
      }
      setShowForm(false);
      setEditingBank(null);
      setFormData({ name: '', logo: '' });
    } catch (error) {
      console.error('Error saving bank:', error);
    }
  };

  const handleEdit = (bank: any) => {
    setEditingBank(bank);
    setFormData({ name: bank.name, logo: bank.logo || '' });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this bank?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/banks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBanks(banks.filter(b => b._id !== id));
    } catch (error) {
      console.error('Error deleting bank:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 pb-32">
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
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
                  Banks
                </h1>
                <p className="text-xs text-slate-500 font-medium">{banks.length} banks</p>
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
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add New Bank'}
        </button>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingBank ? 'Edit Bank' : 'Add New Bank'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  placeholder="Enter bank name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Logo (optional)
                </label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  placeholder="Emoji or image URL"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold rounded-xl"
              >
                {editingBank ? 'Update Bank' : 'Add Bank'}
              </button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-lg">Loading banks...</div>
        ) : banks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-100"
          >
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Banks Yet</h3>
            <p className="text-slate-500">Add banks to display on the home loan page</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {banks.map((bank, index) => (
              <motion.div
                key={bank._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                    {bank.logo ? (
                      <span className="text-2xl">{bank.logo}</span>
                    ) : (
                      <Home className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{bank.name}</h3>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(bank)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(bank._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBanks;
