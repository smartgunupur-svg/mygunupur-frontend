import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  LogOut,
  FileText
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminBuildingEnquiries: React.FC = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

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

    fetchEnquiries();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 pb-32">
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
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                  Building Enquiries
                </h1>
                <p className="text-xs text-slate-500 font-medium">{enquiries.length} enquiries</p>
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
        {loading ? (
          <div className="text-center py-20 text-slate-500 text-lg">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-100"
          >
            <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Building Enquiries Yet</h3>
            <p className="text-slate-500">When users submit building enquiries, they'll appear here</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {enquiries.map((enquiry, index) => (
              <motion.div
                key={enquiry._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <div className="flex items-start justify-between mb-4">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBuildingEnquiries;
