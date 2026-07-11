import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Save,
  ToggleLeft,
  ToggleRight,
  Settings as SettingsIcon
} from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminSettings: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API_URL}/settings`);
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        setSettings({
          donatedBy: {},
          features: {
            homeLoan: true,
            buildingPlan: true,
            emergency: true,
            hospitals: true,
            bloodDonors: true,
            touristPlaces: true,
            notices: true,
            hotels: true,
            restaurants: true,
            importantContacts: true,
            events: true,
            gallery: true,
            weather: true,
            jobs: true,
            businesses: true,
            governmentSchemes: true,
            about: true,
            contact: true,
            schools: true,
            colleges: true,
            govtOffices: true,
            parks: true,
            sportsPlaces: true,
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [navigate]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API_URL}/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleDonorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);

    try {
      const response = await axios.post(`${API_URL}/upload`, uploadFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSettings((prev: any) => ({
        ...prev,
        donatedBy: {
          ...prev.donatedBy,
          photo: response.data.url
        }
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const toggleFeature = (key: string) => {
    setSettings((prev: any) => ({
      ...prev,
      features: {
        ...prev.features,
        [key]: !prev.features[key]
      }
    }));
  };

  const featureLabels = [
    { key: 'homeLoan', label: 'Home Loan', color: 'text-blue-600', bg: 'bg-blue-50' },
    { key: 'buildingPlan', label: 'Building Plan Assistance', color: 'text-green-600', bg: 'bg-green-50' },
    { key: 'emergency', label: 'Emergency Contacts', color: 'text-red-600', bg: 'bg-red-50' },
    { key: 'hospitals', label: 'Hospitals Directory', color: 'text-rose-600', bg: 'bg-rose-50' },
    { key: 'bloodDonors', label: 'Blood Donors', color: 'text-red-500', bg: 'bg-red-50' },
    { key: 'touristPlaces', label: 'Explore Gunupur', color: 'text-teal-600', bg: 'bg-teal-50' },
    { key: 'schools', label: 'Schools Directory', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { key: 'colleges', label: 'Colleges Directory', color: 'text-teal-700', bg: 'bg-teal-50' },
    { key: 'govtOffices', label: 'Government Offices', color: 'text-purple-700', bg: 'bg-purple-50' },
    { key: 'parks', label: 'Parks', color: 'text-green-700', bg: 'bg-green-50' },
    { key: 'sportsPlaces', label: 'Sports Places', color: 'text-orange-700', bg: 'bg-orange-50' },
    { key: 'notices', label: 'Notices & Updates', color: 'text-purple-600', bg: 'bg-purple-50' },
    { key: 'hotels', label: 'Hotels Directory', color: 'text-orange-600', bg: 'bg-orange-50' },
    { key: 'restaurants', label: 'Restaurants Directory', color: 'text-pink-600', bg: 'bg-pink-50' },
    { key: 'importantContacts', label: 'Important Contacts', color: 'text-slate-600', bg: 'bg-slate-50' },
    { key: 'events', label: 'Events & Festivals', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { key: 'gallery', label: 'Gallery', color: 'text-sky-600', bg: 'bg-sky-50' },
    { key: 'weather', label: 'Weather Update', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { key: 'jobs', label: 'Local Jobs', color: 'text-violet-600', bg: 'bg-violet-50' },
    { key: 'businesses', label: 'Business Directory', color: 'text-amber-600', bg: 'bg-amber-50' },
    { key: 'governmentSchemes', label: 'Government Schemes', color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { key: 'about', label: 'About Us', color: 'text-slate-700', bg: 'bg-slate-100' },
    { key: 'contact', label: 'Contact Us', color: 'text-blue-700', bg: 'bg-blue-100' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AdminLayout title="App Settings">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        {/* Donated By Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-6">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-purple-600" />
            Donated By
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
              <input
                type="text"
                value={settings?.donatedBy?.name || ''}
                onChange={(e) => setSettings((prev: any) => ({
                  ...prev,
                  donatedBy: {
                    ...prev.donatedBy,
                    name: e.target.value
                  }
                }))}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
                placeholder="Enter donor name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleDonorImageUpload}
                disabled={uploading}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500"
              />
              {uploading && <div className="text-sm text-slate-500 mt-2">Uploading...</div>}
              <div className="text-sm text-slate-400 mt-2">Or paste direct Image URL:</div>
              <input
                type="text"
                value={settings?.donatedBy?.photo || ''}
                onChange={(e) => setSettings((prev: any) => ({
                  ...prev,
                  donatedBy: {
                    ...prev.donatedBy,
                    photo: e.target.value
                  }
                }))}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 mt-2"
                placeholder="Direct Image URL"
              />
              {settings?.donatedBy?.photo && (
                <div className="mt-4">
                  <img src={settings.donatedBy.photo} alt="Donor" className="w-24 h-24 object-cover rounded-xl border border-slate-200" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-blue-600" />
            Feature Controls
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureLabels.map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                  settings.features[feature.key]
                    ? `${feature.bg} border-slate-200`
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">{feature.label}</span>
                  <button
                    onClick={() => toggleFeature(feature.key)}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      settings.features[feature.key]
                        ? 'bg-green-100 hover:bg-green-200'
                        : 'bg-slate-200 hover:bg-slate-300'
                    }`}
                  >
                    {settings.features[feature.key] ? (
                      <ToggleRight className="w-8 h-8 text-green-600" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-500" />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
