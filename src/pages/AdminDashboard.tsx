import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Building2, 
  LogOut, 
  Users, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loanEnquiries, setLoanEnquiries] = useState<any[]>([]);
  const [buildingEnquiries, setBuildingEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [loanRes, buildingRes] = await Promise.all([
          axios.get(`${API_URL}/loan-enquiries`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_URL}/building-enquiries`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setLoanEnquiries(loanRes.data);
        setBuildingEnquiries(buildingRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const stats = [
    {
      title: 'Total Loan Enquiries',
      value: loanEnquiries.length,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      path: '/admin/loan-enquiries'
    },
    {
      title: 'Total Building Enquiries',
      value: buildingEnquiries.length,
      icon: Building2,
      color: 'from-green-500 to-emerald-600',
      bg: 'bg-green-50',
      path: '/admin/building-enquiries'
    },
    {
      title: 'This Month',
      value: loanEnquiries.filter(e => {
        const date = new Date(e.createdAt);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }).length + buildingEnquiries.filter(e => {
        const date = new Date(e.createdAt);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }).length,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50',
      path: null
    }
  ];

  const quickLinks = [
    { title: 'Loan Enquiries', icon: FileText, color: 'from-blue-500 to-blue-600', path: '/admin/loan-enquiries' },
    { title: 'Building Enquiries', icon: Building2, color: 'from-green-500 to-emerald-600', path: '/admin/building-enquiries' },
    { title: 'Banks', icon: FileText, color: 'from-indigo-500 to-purple-600', path: '/admin/banks' },
    { title: 'Construction Materials', icon: Building2, color: 'from-orange-500 to-red-600', path: '/admin/construction-material' },
    { title: 'Hospitals', icon: FileText, color: 'from-pink-500 to-rose-600', path: '/admin/hospitals' },
    { title: 'Tourist Places', icon: FileText, color: 'from-teal-500 to-cyan-600', path: '/admin/tourist-places' },
    { title: 'Emergency Contacts', icon: FileText, color: 'from-red-500 to-orange-600', path: '/admin/emergency-contacts' }
  ];

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
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-xs text-slate-500 font-medium">My Gunupur</p>
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

      <div className="max-w-6xl mx-auto px-4 space-y-6 pt-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={stat.path ? { y: -2, cursor: 'pointer' } : {}}
              onClick={() => stat.path && navigate(stat.path)}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-md`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-3xl font-black text-slate-800 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-500 font-semibold">{stat.title}</p>
              {stat.path && (
                <div className="mt-3 flex items-center gap-1 text-blue-600 text-xs font-semibold">
                  View All <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => (
              <motion.button
                key={index}
                whileHover={{ y: -2 }}
                onClick={() => navigate(link.path)}
                className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 text-left flex items-center gap-4 hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{link.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">Manage and view all enquiries</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Enquiries</h2>
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100">
            {loading ? (
              <div className="text-center py-8 text-slate-500">Loading...</div>
            ) : (
              <div className="space-y-3">
                {[...loanEnquiries.slice(0, 3), ...buildingEnquiries.slice(0, 3)]
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map((enquiry, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{enquiry.name}</p>
                          <p className="text-xs text-slate-500">
                            {enquiry.loanAmount ? 'Loan Enquiry' : 'Building Enquiry'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 font-medium">
                          {new Date(enquiry.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-slate-400">
                          {new Date(enquiry.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                {[...loanEnquiries, ...buildingEnquiries].length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    No enquiries yet
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
