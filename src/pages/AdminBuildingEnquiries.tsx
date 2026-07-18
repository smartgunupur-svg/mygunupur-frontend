import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  PlayCircle
} from 'lucide-react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const statusConfig = {
  pending: { label: 'Pending', color: 'text-yellow-600 bg-yellow-100', icon: Clock },
  in_progress: { label: 'In Progress', color: 'text-blue-600 bg-blue-100', icon: PlayCircle },
  completed: { label: 'Completed', color: 'text-green-600 bg-green-100', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'text-red-600 bg-red-100', icon: XCircle }
};

const AdminBuildingEnquiries: React.FC = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchEnquiries();
  }, [navigate]);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get(`${API_URL}/building-enquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnquiries(response.data);
    } catch (error) {
      console.error('Error fetching building enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API_URL}/building-enquiries/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEnquiries();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredEnquiries = activeTab === 'all' 
    ? enquiries 
    : enquiries.filter(e => e.status === activeTab);

  const tabs = ['all', 'pending', 'in_progress', 'completed', 'cancelled'];

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6 pt-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              activeTab === tab 
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab === 'all' ? 'All' : statusConfig[tab as keyof typeof statusConfig].label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500 text-lg">Loading enquiries...</div>
      ) : filteredEnquiries.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-100"
        >
          <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">No Enquiries Found</h3>
          <p className="text-slate-500">No {activeTab !== 'all' ? statusConfig[activeTab as keyof typeof statusConfig].label.toLowerCase() : ''} building enquiries yet</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enquiry, index) => {
            const StatusIcon = statusConfig[enquiry.status as keyof typeof statusConfig].icon;
            return (
              <motion.div
                key={enquiry._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-md">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{enquiry.name}</h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(enquiry.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${statusConfig[enquiry.status as keyof typeof statusConfig].color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="font-bold text-sm">{statusConfig[enquiry.status as keyof typeof statusConfig].label}</span>
                    </div>
                    <div className="relative">
                      <select
                        value={enquiry.status}
                        onChange={(e) => updateStatus(enquiry._id, e.target.value)}
                        className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-slate-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-semibold">Phone</span>
                    </div>
                    <a href={`tel:${enquiry.phone}`} className="text-lg font-bold text-slate-800 hover:text-green-600">
                      {enquiry.phone}
                    </a>
                  </div>
                  {enquiry.email && (
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2 text-slate-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm font-semibold">Email</span>
                      </div>
                      <a href={`mailto:${enquiry.email}`} className="text-lg font-bold text-slate-800 hover:text-green-600">
                        {enquiry.email}
                      </a>
                    </div>
                  )}
                  {enquiry.plotNumber && (
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2 text-slate-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-semibold">Plot Number</span>
                      </div>
                      <p className="text-lg font-bold text-slate-800">{enquiry.plotNumber}</p>
                    </div>
                  )}
                  {enquiry.ward && (
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2 text-slate-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-semibold">Ward</span>
                      </div>
                      <p className="text-lg font-bold text-slate-800">{enquiry.ward}</p>
                    </div>
                  )}
                </div>

                {enquiry.address && (
                  <div className="bg-slate-50 p-4 rounded-xl mb-4">
                    <div className="flex items-center gap-2 mb-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-semibold">Address</span>
                    </div>
                    <p className="text-slate-800">{enquiry.address}</p>
                  </div>
                )}

                {enquiry.requirement && (
                  <div className="bg-slate-50 p-4 rounded-xl mb-4">
                    <div className="flex items-center gap-2 mb-2 text-slate-600">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-semibold">Requirement</span>
                    </div>
                    <p className="text-slate-800">{enquiry.requirement}</p>
                  </div>
                )}

                {enquiry.message && (
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-slate-600">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-semibold">Message</span>
                    </div>
                    <p className="text-slate-800">{enquiry.message}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminBuildingEnquiries;
