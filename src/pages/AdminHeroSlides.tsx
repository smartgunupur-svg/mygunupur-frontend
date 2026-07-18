import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Image, Plus, Trash2, Edit2, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminHeroSlides: React.FC = () => {
  const navigate = useNavigate();
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    subtitle: '',
    link: '',
    order: 0,
    active: true
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchSlides();
  }, [navigate]);

  const fetchSlides = async () => {
    try {
      const response = await axios.get(`${API_URL}/hero-slides/admin`);
      setSlides(response.data);
    } catch (error) {
      console.error('Error fetching hero slides:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);

    try {
      const response = await axios.post(`${API_URL}/upload`, uploadFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, image: response.data.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      if (editingId) {
        await axios.put(`${API_URL}/hero-slides/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API_URL}/hero-slides`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchSlides();
      setShowForm(false);
      setEditingId(null);
      setFormData({ image: '', title: '', subtitle: '', link: '', order: 0, active: true });
    } catch (error) {
      console.error('Error saving hero slide:', error);
    }
  };

  const handleEdit = (slide: any) => {
    setEditingId(slide._id);
    setFormData({
      image: slide.image,
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      link: slide.link || '',
      order: slide.order || 0,
      active: slide.active !== false
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this slide?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/hero-slides/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSlides();
    } catch (error) {
      console.error('Error deleting slide:', error);
    }
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    const token = localStorage.getItem('adminToken');
    try {
      await axios.put(`${API_URL}/hero-slides/${id}`, { active: !currentActive }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSlides();
    } catch (error) {
      console.error('Error toggling slide:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-4 pt-6">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            if (!showForm) {
              setFormData({ image: '', title: '', subtitle: '', link: '', order: 0, active: true });
            }
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-purple-500 to-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add New Slide'}
        </button>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">{editingId ? 'Edit Slide' : 'Add New Slide'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="Enter slide title"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="Enter slide subtitle"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Link</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
                />
                {uploading && <div className="text-sm text-slate-500">Uploading...</div>}
                <div className="text-sm text-slate-400 mt-1">Or paste direct Image URL:</div>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 mt-1"
                  placeholder="Direct Image URL"
                />
              </div>
              <button
                type="submit"
                disabled={uploading || !formData.image}
                className="w-full py-3 bg-gradient-to-br from-purple-500 to-indigo-500 text-white font-bold rounded-xl disabled:opacity-50"
              >
                {editingId ? 'Update Slide' : 'Add Slide'}
              </button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-lg">Loading hero slides...</div>
        ) : slides.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-100">
            <Image className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Slides Yet</h3>
            <p className="text-slate-500">Add hero slides to showcase on the home page</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {slides.map((slide) => (
              <motion.div
                key={slide._id}
                layout
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 relative group"
              >
                <div className="h-48 relative">
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => toggleActive(slide._id, slide.active)}
                      className={`p-2 rounded-xl backdrop-blur ${slide.active ? 'bg-green-500/80 text-white' : 'bg-slate-500/80 text-white'}`}
                    >
                      {slide.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-slate-800 mb-1">{slide.title || 'Untitled Slide'}</h4>
                  {slide.subtitle && <p className="text-sm text-slate-500 mb-2">{slide.subtitle}</p>}
                  {slide.link && <p className="text-xs text-purple-600 truncate">{slide.link}</p>}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-400">Order: {slide.order}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(slide)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(slide._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
  );;
};

export default AdminHeroSlides;
