import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Building2, 
  LogOut, 
  Users, 
  ArrowRight,
  Banknote,
  ShoppingCart,
  HeartPulse,
  MapPin,
  AlertTriangle,
  LayoutDashboard,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  CheckCircle,
  Clock
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loanEnquiries, setLoanEnquiries] = useState<any[]>([]);
  const [buildingEnquiries, setBuildingEnquiries] = useState<any[]>([]);
  const [banks, setBanks] = useState<any[]>([]);
  const [shops, setShops] = useState<any[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [touristPlaces, setTouristPlaces] = useState<any[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      try {
        const [
          loanRes, 
          buildingRes, 
          banksRes, 
          shopsRes, 
          hospitalsRes, 
          touristRes, 
          emergencyRes
        ] = await Promise.all([
          axios.get(`${API_URL}/loan-enquiries`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_URL}/building-enquiries`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_URL}/banks`),
          axios.get(`${API_URL}/construction-material-shops`),
          axios.get(`${API_URL}/hospitals`),
          axios.get(`${API_URL}/tourist-places`),
          axios.get(`${API_URL}/emergency-contacts`)
        ]);
        setLoanEnquiries(loanRes.data);
        setBuildingEnquiries(buildingRes.data);
        setBanks(banksRes.data);
        setShops(shopsRes.data);
        setHospitals(hospitalsRes.data);
        setTouristPlaces(touristRes.data);
        setEmergencyContacts(emergencyRes.data);
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

  const navItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Loan Enquiries', icon: FileText, path: '/admin/loan-enquiries', color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Building Enquiries', icon: Building2, path: '/admin/building-enquiries', color: 'text-green-500', bg: 'bg-green-50' },
    { title: 'Banks', icon: Banknote, path: '/admin/banks', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { title: 'Construction Material', icon: ShoppingCart, path: '/admin/construction-material', color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Hospitals', icon: HeartPulse, path: '/admin/hospitals', color: 'text-pink-500', bg: 'bg-pink-50' },
    { title: 'Tourist Places', icon: MapPin, path: '/admin/tourist-places', color: 'text-teal-500', bg: 'bg-teal-50' },
    { title: 'Emergency Contacts', icon: AlertTriangle, path: '/admin/emergency-contacts', color: 'text-red-500', bg: 'bg-red-50' }
  ];

  const stats = [
    { title: 'Loan Enquiries', value: loanEnquiries.length, icon: FileText, color: 'from-blue-500 to-blue-600', change: '+12%', trend: 'up' },
    { title: 'Building Enquiries', value: buildingEnquiries.length, icon: Building2, color: 'from-green-500 to-emerald-600', change: '+8%', trend: 'up' },
    { title: 'Total Banks', value: banks.length, icon: Banknote, color: 'from-indigo-500 to-purple-600', change: '+5%', trend: 'up' },
    { title: 'Material Shops', value: shops.length, icon: ShoppingCart, color: 'from-orange-500 to-red-600', change: '+3%', trend: 'up' },
    { title: 'Hospitals', value: hospitals.length, icon: HeartPulse, color: 'from-pink-500 to-rose-600', change: '+2%', trend: 'up' },
    { title: 'Tourist Places', value: touristPlaces.length, icon: MapPin, color: 'from-teal-500 to-cyan-600', change: '+4%', trend: 'up' },
  ];

  const recentEnquiries = [...loanEnquiries, ...buildingEnquiries]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className={`fixed left-0 top-0 h-full w-72 bg-white border-r border-slate-200 z-50 shadow-xl lg:static lg:translate-x-0 transition-transform duration-300 flex-shrink-0`}
      >
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img src="/layoutlogo.png" alt="My Gunupur" className="h-12 w-auto" />
            <div>
              <h1 className="text-lg font-bold text-slate-800">My Gunupur</h1>
              <p className="text-xs text-slate-500 font-medium">Admin Panel</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-1 overflow-y-auto flex-1" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? `bg-gradient-to-r ${item.bg} ${item.color} font-semibold shadow-sm border border-slate-100` 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.title}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </motion.button>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all font-semibold text-sm"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex-shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6 text-slate-600" /> : <Menu className="w-6 h-6 text-slate-600" />}
              </button>
              <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-6 h-6 text-slate-600" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  AD
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800">Admin</p>
                  <p className="text-xs text-slate-500">admin@mygunupur.in</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-md`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-3xl font-black text-slate-800 mb-1">{loading ? '...' : stat.value}</p>
                  <p className="text-sm text-slate-500 font-semibold">{stat.title}</p>
                </motion.div>
              ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Enquiries */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800">Recent Enquiries</h3>
                  <button
                    onClick={() => navigate('/admin/loan-enquiries')}
                    className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center gap-1"
                  >
                    View All <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {loading ? (
                          <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-slate-500">Loading...</td>
                          </tr>
                        ) : recentEnquiries.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-slate-500">No enquiries yet</td>
                          </tr>
                        ) : (
                          recentEnquiries.map((enquiry, index) => (
                            <motion.tr
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="hover:bg-slate-50 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                    <Users className="w-5 h-5 text-white" />
                                  </div>
                                  <span className="font-semibold text-slate-800">{enquiry.name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  enquiry.loanAmount ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                                }`}>
                                  {enquiry.loanAmount ? 'Loan' : 'Building'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-slate-600">
                                  {new Date(enquiry.createdAt).toLocaleDateString()}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {new Date(enquiry.createdAt).toLocaleTimeString()}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-xs font-semibold">
                                  <Clock className="w-3.5 h-3.5" />
                                  Pending
                                </span>
                              </td>
                            </motion.tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Stats */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Actions</h3>
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                    <div className="space-y-3">
                      <button
                        onClick={() => navigate('/admin/banks')}
                        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition-all border border-blue-100"
                      >
                        <div className="flex items-center gap-3">
                          <Banknote className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-slate-800">Add New Bank</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-blue-600" />
                      </button>
                      <button
                        onClick={() => navigate('/admin/construction-material')}
                        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 rounded-xl transition-all border border-orange-100"
                      >
                        <div className="flex items-center gap-3">
                          <ShoppingCart className="w-5 h-5 text-orange-600" />
                          <span className="font-semibold text-slate-800">Add Shop</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-orange-600" />
                      </button>
                      <button
                        onClick={() => navigate('/admin/emergency-contacts')}
                        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 rounded-xl transition-all border border-red-100"
                      >
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <span className="font-semibold text-slate-800">Add Emergency Contact</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* System Stats */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">System Stats</h3>
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-slate-700">Emergency Contacts</span>
                        </div>
                        <span className="font-bold text-slate-800">{emergencyContacts.length}</span>
                      </div>
                      <div className="h-px bg-slate-100" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-teal-600" />
                          <span className="font-medium text-slate-700">Tourist Places</span>
                        </div>
                        <span className="font-bold text-slate-800">{touristPlaces.length}</span>
                      </div>
                      <div className="h-px bg-slate-100" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <HeartPulse className="w-5 h-5 text-pink-600" />
                          <span className="font-medium text-slate-700">Hospitals</span>
                        </div>
                        <span className="font-bold text-slate-800">{hospitals.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
