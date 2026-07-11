import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Plus, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminNotices: React.FC = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Municipality',
    pdfFile: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${API_URL}/notices`);
        setNotices(response.data);
      } catch (error) {
          console.error('Error fetching notices:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchNotices();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      if (editingNotice) {
        await axios.put(`${API_URL}/notices/${editingNotice._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotices(notices.map(n => n._id === editingNotice._id ? { ...n, ...formData } : n));
      } else {
        const response = await axios.post(`${API_URL}/notices`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setNotices([response.data, ...notices]);
      }
      setShowForm(false);
      setEditingNotice(null);
      setFormData({ title: '', description: '', category: 'Municipality', pdfFile: '' });
    } catch (error) {
      console.error('Error saving notice:', error);
    }
  };

  const handleEdit = (notice: any) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      description: notice.description,
      category: notice.category || 'Municipality',
      pdfFile: notice.pdfFile || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/notices/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotices(notices.filter(n => n._id !== id));
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  return (
    <AdminLayout title="Notices">
      <div className="max-w-6xl mx-auto px-4 space-y-4 pt-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add New Notice'}
        </button>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingNotice ? 'Edit Notice' : 'Add New Notice'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Notice Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="Enter notice title"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
                >
                  <option value="Municipality">Municipality</option>
                  <option value="Government">Government</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Notice Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 resize-none"
                  rows={4}
                  placeholder="Enter notice details..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">PDF Document Link (optional)</label>
                <input
                  type="text"
                  value={formData.pdfFile}
                  onChange={(e) => setFormData({ ...formData, pdfFile: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="Link to PDF file"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold rounded-xl"
              >
                {editingNotice ? 'Update Notice' : 'Publish Notice'}
              </button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-lg">Loading notices...</div>
        ) : notices.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-100">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Notices Yet</h3>
            <p className="text-slate-500">Publish notices to keep citizens updated</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice, index) => (
              <motion.div
                key={notice._id || notice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-slate-100"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 bg-purple-50 border border-purple-100 text-purple-600 text-[10px] font-bold rounded-full">
                      {notice.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-800 mt-1">{notice.title}</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{notice.description}</p>
                    {notice.pdfFile && (
                      <p className="text-xs text-blue-600 font-semibold mt-2">
                        PDF attached: <a href={notice.pdfFile} target="_blank" rel="noreferrer" className="underline">{notice.pdfFile.substring(0, 30)}...</a>
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(notice)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(notice._id)}
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
    </AdminLayout>
  );
};

export default AdminNotices;
