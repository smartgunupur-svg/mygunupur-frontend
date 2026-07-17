import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminImportantContacts: React.FC = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    icon: 'Shield',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50 border-indigo-100',
    desc: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${API_URL}/important-contacts`);
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    try {
      if (editingContact) {
        await axios.put(`${API_URL}/important-contacts/${editingContact._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContacts(contacts.map(c => c._id === editingContact._id ? { ...c, ...formData } : c));
      } else {
        const response = await axios.post(`${API_URL}/important-contacts`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContacts([...contacts, response.data]);
      }
      setShowForm(false);
      setEditingContact(null);
      setFormData({
        name: '',
        phone: '',
        icon: 'Shield',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50 border-indigo-100',
        desc: ''
      });
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleEdit = (contact: any) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      icon: contact.icon,
      color: contact.color,
      bg: contact.bg,
      desc: contact.desc
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/important-contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(contacts.filter(c => c._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-4 pt-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add New Contact'}
        </button>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingContact ? 'Edit Contact' : 'Add New Contact'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  placeholder="Enter contact name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <input
                  type="text"
                  required
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                >
                  <option value="Shield">Shield</option>
                  <option value="UserCheck">UserCheck</option>
                  <option value="ShieldAlert">ShieldAlert</option>
                  <option value="Building">Building</option>
                  <option value="Lightbulb">Lightbulb</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Color</label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                >
                  <option value="text-indigo-600">Indigo</option>
                  <option value="text-blue-600">Blue</option>
                  <option value="text-red-600">Red</option>
                  <option value="text-green-600">Green</option>
                  <option value="text-emerald-600">Emerald</option>
                  <option value="text-teal-600">Teal</option>
                  <option value="text-yellow-600">Yellow</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Background</label>
                <select
                  value={formData.bg}
                  onChange={(e) => setFormData({ ...formData, bg: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                >
                  <option value="bg-indigo-50 border-indigo-100">Indigo</option>
                  <option value="bg-blue-50 border-blue-100">Blue</option>
                  <option value="bg-red-50 border-red-100">Red</option>
                  <option value="bg-green-50 border-green-100">Green</option>
                  <option value="bg-emerald-50 border-emerald-100">Emerald</option>
                  <option value="bg-teal-50 border-teal-100">Teal</option>
                  <option value="bg-yellow-50 border-yellow-100">Yellow</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold rounded-xl"
              >
                {editingContact ? 'Update Contact' : 'Add Contact'}
              </button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-lg">Loading contacts...</div>
        ) : contacts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-100"
          >
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Contacts Yet</h3>
            <p className="text-slate-500">Add important contacts to display</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{contact.name}</h3>
                  <p className="text-sm text-slate-500">{contact.desc}</p>
                  <p className="text-sm font-bold text-slate-800 mt-2">{contact.phone}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(contact)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
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
  );;
};

export default AdminImportantContacts;
