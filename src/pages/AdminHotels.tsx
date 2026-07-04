import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Phone,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Home,
  MapPin,
  Star
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminHotels: React.FC = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    priceRange: '',
    rating: '',
    phone: '',
    address: '',
    googleMap: '',
    amenities: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${API_URL}/hotels`);
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

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
      amenities: formData.amenities.split(',').map(m => m.trim()).filter(m => m),
      rating: parseFloat(formData.rating) || 0
    };
    try {
      if (editingHotel) {
        await axios.put(`${API_URL}/hotels/${editingHotel._id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHotels(hotels.map(h => h._id === editingHotel._id ? { ...h, ...data } : h));
      } else {
        const response = await axios.post(`${API_URL}/hotels`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHotels([...hotels, response.data]);
      }
      setShowForm(false);
      setEditingHotel(null);
      setFormData({ name: '', image: '', priceRange: '', rating: '', phone: '', address: '', googleMap: '', amenities: '' });
    } catch (error) {
      console.error('Error saving hotel:', error);
    }
  };

  const handleEdit = (hotel: any) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      image: hotel.image || '',
      priceRange: hotel.priceRange || '',
      rating: hotel.rating?.toString() || '',
      phone: hotel.phone || '',
      address: hotel.address || '',
      googleMap: hotel.googleMap || '',
      amenities: hotel.amenities?.join(', ') || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this hotel?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/hotels/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHotels(hotels.filter(h => h._id !== id));
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 pb-32">
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
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent">
                  Hotels
                </h1>
                <p className="text-xs text-slate-500 font-medium">{hotels.length} hotels</p>
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
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-orange-600 to-red-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add New Hotel'}
        </button>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Hotel Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                  placeholder="Enter hotel name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Price Range</label>
                  <input
                    type="text"
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                    placeholder="e.g., ₹1,000 - ₹2,500/night"
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
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
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
                <label className="block text-sm font-bold text-slate-700 mb-2">Amenities (comma separated)</label>
                <input
                  type="text"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-500"
                  placeholder="WiFi, Parking, AC, Restaurant"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-br from-orange-600 to-red-600 text-white font-bold rounded-xl"
              >
                {editingHotel ? 'Update Hotel' : 'Add Hotel'}
              </button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-lg">Loading hotels...</div>
        ) : hotels.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-100"
          >
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Hotels Yet</h3>
            <p className="text-slate-500">Add hotels to display</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{hotel.name}</h3>
                    {hotel.phone && (
                      <div className="mt-2 flex items-center gap-2 text-slate-600">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${hotel.phone}`} className="font-bold text-slate-800 hover:text-orange-600">
                          {hotel.phone}
                        </a>
                      </div>
                    )}
                    {hotel.priceRange && (
                      <div className="mt-2 text-sm text-slate-600">
                        <span className="font-semibold">{hotel.priceRange}</span>
                      </div>
                    )}
                    {hotel.rating && (
                      <div className="mt-2 flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold">{hotel.rating}</span>
                      </div>
                    )}
                    {hotel.address && (
                      <div className="mt-2 flex items-start gap-2 text-slate-600">
                        <MapPin className="w-4 h-4 mt-0.5" />
                        <span className="text-sm">{hotel.address}</span>
                      </div>
                    )}
                    {hotel.amenities?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {hotel.amenities.map((amenity: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(hotel)}
                      className="p-2 text-orange-600 hover:bg-orange-50 rounded-xl"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(hotel._id)}
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

export default AdminHotels;
