import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Phone,
  Plus,
  Edit,
  Trash2,
  Utensils,
  MapPin,
  Star
} from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminRestaurants: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    image: '',
    rating: '',
    phone: '',
    address: '',
    googleMap: '',
    cuisine: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${API_URL}/restaurants`);
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
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
      cuisine: formData.cuisine.split(',').map(m => m.trim()).filter(m => m),
      rating: parseFloat(formData.rating) || 0
    };
    try {
      if (editingRestaurant) {
        await axios.put(`${API_URL}/restaurants/${editingRestaurant._id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRestaurants(restaurants.map(r => r._id === editingRestaurant._id ? { ...r, ...data } : r));
      } else {
        const response = await axios.post(`${API_URL}/restaurants`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRestaurants([...restaurants, response.data]);
      }
      setShowForm(false);
      setEditingRestaurant(null);
      setFormData({ name: '', type: '', image: '', rating: '', phone: '', address: '', googleMap: '', cuisine: '' });
    } catch (error) {
      console.error('Error saving restaurant:', error);
    }
  };

  const handleEdit = (restaurant: any) => {
    setEditingRestaurant(restaurant);
    setFormData({
      name: restaurant.name,
      type: restaurant.type || '',
      image: restaurant.image || '',
      rating: restaurant.rating?.toString() || '',
      phone: restaurant.phone || '',
      address: restaurant.address || '',
      googleMap: restaurant.googleMap || '',
      cuisine: restaurant.cuisine?.join(', ') || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this restaurant?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/restaurants/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRestaurants(restaurants.filter(r => r._id !== id));
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  return (
    <AdminLayout title="Restaurants">
      <div className="max-w-6xl mx-auto px-4 space-y-4 pt-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-pink-600 to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add New Restaurant'}
        </button>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Restaurant Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                  placeholder="Enter restaurant name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Type (Veg/Non-Veg)</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                    placeholder="Veg, Non-Veg, Both"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Rating (0-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                    placeholder="e.g., 4.5"
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
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                    />
                    {uploading && <div className="text-sm text-slate-500">Uploading...</div>}
                    <div className="text-sm text-slate-500 mt-1">Or paste image URL:</div>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
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
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                  placeholder="Enter address"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Google Maps Link (optional)</label>
                <input
                  type="text"
                  value={formData.googleMap}
                  onChange={(e) => setFormData({ ...formData, googleMap: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                  placeholder="Google Maps URL"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Cuisine (comma separated)</label>
                <input
                  type="text"
                  value={formData.cuisine}
                  onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-pink-500"
                  placeholder="Indian, Chinese, South Indian"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-br from-pink-600 to-rose-600 text-white font-bold rounded-xl"
              >
                {editingRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
              </button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-lg">Loading restaurants...</div>
        ) : restaurants.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-100"
          >
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Restaurants Yet</h3>
            <p className="text-slate-500">Add restaurants to display</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{restaurant.name}</h3>
                    {restaurant.type && (
                      <div className="mt-1 text-sm text-slate-600">
                        <span className="font-semibold">{restaurant.type}</span>
                      </div>
                    )}
                    {restaurant.phone && (
                      <div className="mt-2 flex items-center gap-2 text-slate-600">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${restaurant.phone}`} className="font-bold text-slate-800 hover:text-pink-600">
                          {restaurant.phone}
                        </a>
                      </div>
                    )}
                    {restaurant.rating && (
                      <div className="mt-2 flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold">{restaurant.rating}</span>
                      </div>
                    )}
                    {restaurant.address && (
                      <div className="mt-2 flex items-start gap-2 text-slate-600">
                        <MapPin className="w-4 h-4 mt-0.5" />
                        <span className="text-sm">{restaurant.address}</span>
                      </div>
                    )}
                    {restaurant.cuisine?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {restaurant.cuisine.map((c: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-semibold rounded-full">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(restaurant)}
                      className="p-2 text-pink-600 hover:bg-pink-50 rounded-xl"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(restaurant._id)}
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

export default AdminRestaurants;
