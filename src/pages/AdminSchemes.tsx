import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Award, Plus, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminSchemes: React.FC = () => {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingScheme, setEditingScheme] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Pension',
    description: '',
    eligibility: '',
    documents: '',
    link: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchSchemes = async () => {
      try {
        const response = await axios.get(`${API_URL}/government-schemes`);
        setSchemes(response.data);
      } catch (error) {
        console.error('Error fetching schemes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const data = {
      ...formData,
      eligibility: formData.eligibility.split(',').map(el => el.trim()).filter(el => el),
      documents: formData.documents.split(',').map(d => d.trim()).filter(d => d)
    };
    try {
      if (editingScheme) {
        await axios.put(`${API_URL}/government-schemes/${editingScheme._id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSchemes(schemes.map(s => s._id === editingScheme._id ? { ...s, ...data } : s));
      } else {
        const response = await axios.post(`${API_URL}/government-schemes`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSchemes([...schemes, response.data]);
      }
      setShowForm(false);
      setEditingScheme(null);
      setFormData({ title: '', category: 'Pension', description: '', eligibility: '', documents: '', link: '' });
    } catch (error) {
      console.error('Error saving scheme:', error);
    }
  };

  const handleEdit = (scheme: any) => {
    setEditingScheme(scheme);
    setFormData({
      title: scheme.title,
      category: scheme.category || 'Pension',
      description: scheme.description || '',
      eligibility: scheme.eligibility?.join(', ') || '',
      documents: scheme.documents?.join(', ') || '',
      link: scheme.link || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this scheme?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/government-schemes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSchemes(schemes.filter(s => s._id !== id));
    } catch (error) {
      console.error('Error deleting scheme:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-4 pt-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Register New Scheme'}
        </button>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingScheme ? 'Edit Scheme' : 'Register New Scheme'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Scheme Name</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., Madhu Babu Pension Yojana"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                >
                  <option value="Pension">Pension</option>
                  <option value="PMAY">PMAY</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Farmer Schemes">Farmer Schemes</option>
                  <option value="Women Schemes">Women Schemes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500 resize-none"
                  rows={4}
                  placeholder="Enter details of the scheme..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Eligibility Criteria (comma separated)</label>
                  <input
                    type="text"
                    value={formData.eligibility}
                    onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                    placeholder="Resident of Odisha, Age 60+, Family income < 24000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Required Documents (comma separated)</label>
                  <input
                    type="text"
                    value={formData.documents}
                    onChange={(e) => setFormData({ ...formData, documents: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                    placeholder="Aadhaar Card, Resident Proof, Income Certificate"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Official Portal URL</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
                  placeholder="Paste official website link"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-bold rounded-xl"
              >
                {editingScheme ? 'Update Scheme' : 'Register Scheme'}
              </button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-lg">Loading schemes...</div>
        ) : schemes.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-100">
            <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Schemes Registered</h3>
            <p className="text-slate-500">Add welfare schemes to keep citizens informed</p>
          </div>
        ) : (
          <div className="space-y-4">
            {schemes.map((scheme, index) => (
              <motion.div
                key={scheme._id || scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-slate-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 bg-cyan-50 border border-cyan-100 text-cyan-600 text-[10px] font-bold rounded-full uppercase">
                      {scheme.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-800 mt-1">{scheme.title}</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2">{scheme.description}</p>
                    {scheme.link && (
                      <p className="text-xs text-blue-600 font-semibold mt-2">
                        Portal: <a href={scheme.link} target="_blank" rel="noreferrer" className="underline">{scheme.link}</a>
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(scheme)}
                      className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-xl"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(scheme._id)}
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
  );;
};

export default AdminSchemes;
