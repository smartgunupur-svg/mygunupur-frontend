import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Plus, Edit, Trash2, Upload } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminBusinesses: React.FC = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<any | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Medical Stores',
    customCategory: '',
    phone: '',
    address: '',
    googleMap: '',
    description: '',
    rating: '4.5',
    priceRange: '₹₹',
    isVeg: 'false',
    features: '',
    materials: '',
    image: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchBusinesses = async () => {
      try {
        const response = await axios.get(`${API_URL}/businesses`);
        setBusinesses(response.data);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [navigate]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setUploadingImage(true);
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await axios.post(`${API_URL}/upload`, formData);
      
      setFormData(prev => ({ ...prev, image: response.data.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const data = {
      ...formData,
      category: formData.category === 'Other' ? formData.customCategory : formData.category,
      rating: parseFloat(formData.rating),
      isVeg: formData.isVeg === 'true',
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
      materials: formData.materials.split(',').map(m => m.trim()).filter(m => m)
    };
    try {
      if (editingBusiness) {
        await axios.put(`${API_URL}/businesses/${editingBusiness._id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBusinesses(businesses.map(b => b._id === editingBusiness._id ? { ...b, ...data } : b));
      } else {
        const response = await axios.post(`${API_URL}/businesses`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBusinesses([...businesses, response.data]);
      }
      setShowForm(false);
      setEditingBusiness(null);
      setFormData({
      name: '',
      category: 'Medical Stores',
      customCategory: '',
      phone: '',
      address: '',
      googleMap: '',
      description: '',
      rating: '4.5',
      priceRange: '₹₹',
      isVeg: 'false',
      features: '',
      materials: '',
      image: ''
    });
    } catch (error) {
      console.error('Error saving business:', error);
    }
  };

  const handleEdit = (business: any) => {
    setEditingBusiness(business);
    setFormData({
      name: business.name,
      category: business.category || 'Medical Stores',
      customCategory: business.customCategory || '',
      phone: business.phone,
      address: business.address || '',
      googleMap: business.googleMap || '',
      description: business.description || '',
      rating: String(business.rating || 4.5),
      priceRange: business.priceRange || '₹₹',
      isVeg: business.isVeg ? 'true' : 'false',
      features: business.features?.join(', ') || '',
      materials: business.materials?.join(', ') || '',
      image: business.image || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this business?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/businesses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBusinesses(businesses.filter(b => b._id !== id));
    } catch (error) {
      console.error('Error deleting business:', error);
    }
  };

  return (
      <div className="max-w-6xl mx-auto px-4 space-y-4 pt-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-amber-500 to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Register New Business'}
        </button>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingBusiness ? 'Edit Business Details' : 'Register New Business'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                    placeholder="Enter business name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                  >
                    <option value="Medical Stores">Medical Stores</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Grocery">Grocery</option>
                    <option value="Salons">Salons</option>
                    <option value="Repair Shops">Repair Shops</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Construction Material">Construction Material</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              {/* Custom Category Input */}
              {formData.category === 'Other' && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Custom Category</label>
                  <input
                    type="text"
                    value={formData.customCategory}
                    onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                    placeholder="Enter custom category name"
                    required
                  />
                </div>
              )}
              
              {/* Materials Input for Construction Material */}
              {formData.category === 'Construction Material' && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Materials (comma separated)</label>
                  <input
                    type="text"
                    value={formData.materials}
                    onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                    placeholder="Cement, Sand, Bricks"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Business Image</label>
                {formData.image && (
                  <div className="mb-3">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl border border-slate-200"
                    />
                  </div>
                )}
                <label className="flex items-center gap-2 px-4 py-3 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
                  <Upload className="w-5 h-5 text-slate-500" />
                  <span className="text-sm text-slate-600 font-medium">
                    {uploadingImage ? 'Uploading...' : 'Click to upload image'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                    placeholder="Mobile number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Features (comma separated)</label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                  placeholder="24x7, Free Wifi, A/C, Home Delivery"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                  placeholder="Street / Area in Gunupur"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Google Map link</label>
                <input
                  type="text"
                  value={formData.googleMap}
                  onChange={(e) => setFormData({ ...formData, googleMap: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                  placeholder="Paste map coordinate link"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-br from-amber-500 to-orange-500 text-white font-bold rounded-xl"
              >
                {editingBusiness ? 'Update Business' : 'Register Business'}
              </button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-lg">Loading businesses...</div>
        ) : businesses.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-100">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Businesses Registered</h3>
            <p className="text-slate-500">Add hotels, eateries, and shops to the directory</p>
          </div>
        ) : (
          <div className="space-y-4">
            {businesses.map((business, index) => (
              <motion.div
                key={business._id || business.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-slate-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 bg-amber-50 border border-amber-100 text-amber-600 text-[10px] font-bold rounded-full uppercase">
                      {business.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-800 mt-1">{business.name}</h3>
                    <p className="text-xs text-slate-500 font-bold">Phone: {business.phone}</p>
                    <p className="text-xs text-slate-500 font-medium">Address: {business.address || 'Gunupur'}</p>
                    {business.materials?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {business.materials.map((material: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full">
                            {material}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(business)}
                      className="p-2 text-amber-600 hover:bg-amber-50 rounded-xl"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(business._id)}
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
  );
};

export default AdminBusinesses;
