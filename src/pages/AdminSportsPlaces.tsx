import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Phone,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Trophy
} from 'lucide-react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminSportsPlaces: React.FC = () => {
  const navigate = useNavigate();
  const [sportsPlaces, setSportsPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSportsPlace, setEditingSportsPlace] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    phone: '',
    address: '',
    googleMap: '',
    sports: '',
    type: '',
    timing: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchSportsPlaces = async () => {
      try {
        const response = await axios.get(`${API_URL}/sports-places`);
        setSportsPlaces(response.data);
      } catch (error) {
        console.error('Error fetching sports places:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsPlaces();
  }, [navigate]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);

    try {
      const response = await axios.post(`${API_URL}/upload`, uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
    const data = {
      ...formData,
      sports: formData.sports.split(',').map(m => m.trim()).filter(m => m)
    };
    try {
      if (editingSportsPlace) {
        await axios.put(`${API_URL}/sports-places/${editingSportsPlace._id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSportsPlaces(sportsPlaces.map(h => h._id === editingSportsPlace._id ? { ...h, ...data } : h));
      } else {
        const response = await axios.post(`${API_URL}/sports-places`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSportsPlaces([...sportsPlaces, response.data]);
      }
      setShowForm(false);
      setEditingSportsPlace(null);
      setFormData({ name: '', image: '', phone: '', address: '', googleMap: '', sports: '', type: '', timing: '' });
    } catch (error) {
      console.error('Error saving sports place:', error);
    }
  };

  const handleEdit = (sportsPlace: any) => {
    setEditingSportsPlace(sportsPlace);
    setFormData({
      name: sportsPlace.name,
      image: sportsPlace.image || '',
      phone: sportsPlace.phone || '',
      address: sportsPlace.address || '',
      googleMap: sportsPlace.googleMap || '',
      sports: sportsPlace.sports?.join(', ') || '',
      type: sportsPlace.type || '',
      timing: sportsPlace.timing || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this sports place?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/sports-places/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSportsPlaces(sportsPlaces.filter(h => h._id !== id));
    } catch (error) {
      console.error('Error deleting sports place:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-4 pt-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-orange-600 to-red-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add New Sports Place'}
        </button>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingSportsPlace ? 'Edit Sports Place' : 'Add New Sports Place'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Place Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                  placeholder="Enter place name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Type</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                    placeholder="e.g., Stadium, Ground, Academy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Timing</label>
                  <input
                    type="text"
                    value={formData.timing}
                    onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                    placeholder="e.g., 6 AM - 10 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Image (optional)</label>
                  <div className="space-y-2">
                    {formData.image && (
                      <div className="flex items-center gap-2">
                        <img src={formData.image} alt="Preview" className="w-16 h-16 rounded-lg object-cover" />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: '' })}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                    {uploading && <div className="text-sm text-slate-500">Uploading...</div>}
                    <div className="text-sm text-slate-500 mt-1">Or paste image URL:</div>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                      placeholder="Image URL"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Address (optional)</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                  placeholder="Enter address"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Google Maps Link (optional)</label>
                <input
                  type="text"
                  value={formData.googleMap}
                  onChange={(e) => setFormData({ ...formData, googleMap: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                  placeholder="Google Maps URL"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Sports (comma separated)</label>
                <input
                  type="text"
                  value={formData.sports}
                  onChange={(e) => setFormData({ ...formData, sports: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                  placeholder="Cricket, Football, Badminton"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-br from-orange-600 to-red-600 text-white font-bold rounded-xl"
              >
                {editingSportsPlace ? 'Update Sports Place' : 'Add Sports Place'}
              </button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-lg">Loading sports places...</div>
        ) : sportsPlaces.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-100"
          >
            <Trophy className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Sports Places Yet</h3>
            <p className="text-slate-500">Add sports places to display</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {sportsPlaces.map((sportsPlace, index) => (
              <motion.div
                key={sportsPlace._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{sportsPlace.name}</h3>
                    {sportsPlace.phone && (
                      <div className="mt-2 flex items-center gap-2 text-slate-600">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${sportsPlace.phone}`} className="font-bold text-slate-800 hover:text-orange-600">
                          {sportsPlace.phone}
                        </a>
                      </div>
                    )}
                    {sportsPlace.type && (
                      <div className="mt-2 text-sm text-slate-600">
                        <span className="font-semibold">Type: {sportsPlace.type}</span>
                      </div>
                    )}
                    {sportsPlace.timing && (
                      <div className="mt-1 text-sm text-slate-600">
                        <span className="font-semibold">Timing: {sportsPlace.timing}</span>
                      </div>
                    )}
                    {sportsPlace.address && (
                      <div className="mt-2 flex items-start gap-2 text-slate-600">
                        <MapPin className="w-4 h-4 mt-0.5" />
                        <span className="text-sm">{sportsPlace.address}</span>
                      </div>
                    )}
                    {sportsPlace.sports?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {sportsPlace.sports.map((sport: string, i: number) => (
                        <span key={i} className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full">
                          {sport}
                        </span>
                      ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(sportsPlace)}
                      className="p-2 text-orange-600 hover:bg-orange-50 rounded-xl"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(sportsPlace._id)}
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

export default AdminSportsPlaces;
