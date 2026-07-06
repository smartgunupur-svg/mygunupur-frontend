import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Building2, 
  Users, 
  ArrowRight,
  Banknote,
  ShoppingCart,
  HeartPulse,
  MapPin,
  CheckCircle,
  Clock,
  Droplets,
  Briefcase,
  Award,
  Image,
  Calendar,
  BookOpen,
  Home,
  Utensils,
  AlertTriangle
} from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loanEnquiries, setLoanEnquiries] = useState<any[]>([]);
  const [buildingEnquiries, setBuildingEnquiries] = useState<any[]>([]);
  const [banks, setBanks] = useState<any[]>([]);
  const [shops, setShops] = useState<any[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [touristPlaces, setTouristPlaces] = useState<any[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<any[]>([]);
  const [bloodDonors, setBloodDonors] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [schemes, setSchemes] = useState<any[]>([]);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
          emergencyRes,
          bloodDonorsRes,
          noticesRes,
          galleryRes,
          eventsRes,
          jobsRes,
          schemesRes,
          businessesRes,
          hotelsRes,
          restaurantsRes
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
          axios.get(`${API_URL}/emergency-contacts`),
          axios.get(`${API_URL}/blood-donors`),
          axios.get(`${API_URL}/notices`),
          axios.get(`${API_URL}/gallery`),
          axios.get(`${API_URL}/events`),
          axios.get(`${API_URL}/jobs`),
          axios.get(`${API_URL}/government-schemes`),
          axios.get(`${API_URL}/businesses`),
          axios.get(`${API_URL}/hotels`),
          axios.get(`${API_URL}/restaurants`)
        ]);
        setLoanEnquiries(loanRes.data);
        setBuildingEnquiries(buildingRes.data);
        setBanks(banksRes.data);
        setShops(shopsRes.data);
        setHospitals(hospitalsRes.data);
        setTouristPlaces(touristRes.data);
        setEmergencyContacts(emergencyRes.data);
        setBloodDonors(bloodDonorsRes.data);
        setNotices(noticesRes.data);
        setGallery(galleryRes.data);
        setEvents(eventsRes.data);
        setJobs(jobsRes.data);
        setSchemes(schemesRes.data);
        setBusinesses(businessesRes.data);
        setHotels(hotelsRes.data);
        setRestaurants(restaurantsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const stats = [
    { title: 'Loan Enquiries', value: loanEnquiries.length, icon: FileText, color: 'from-blue-500 to-blue-600', change: '+12%', trend: 'up' },
    { title: 'Building Enquiries', value: buildingEnquiries.length, icon: Building2, color: 'from-green-500 to-emerald-600', change: '+8%', trend: 'up' },
    { title: 'Total Banks', value: banks.length, icon: Banknote, color: 'from-indigo-500 to-purple-600', change: '+5%', trend: 'up' },
    { title: 'Material Shops', value: shops.length, icon: ShoppingCart, color: 'from-orange-500 to-red-600', change: '+3%', trend: 'up' },
    { title: 'Hospitals', value: hospitals.length, icon: HeartPulse, color: 'from-pink-500 to-rose-600', change: '+2%', trend: 'up' },
    { title: 'Blood Donors', value: bloodDonors.length, icon: Droplets, color: 'from-red-500 to-rose-600', change: '+6%', trend: 'up' },
    { title: 'Hotels', value: hotels.length, icon: Home, color: 'from-orange-600 to-red-600', change: '+7%', trend: 'up' },
    { title: 'Restaurants', value: restaurants.length, icon: Utensils, color: 'from-rose-600 to-pink-600', change: '+9%', trend: 'up' },
    { title: 'Tourist Places', value: touristPlaces.length, icon: MapPin, color: 'from-teal-500 to-cyan-600', change: '+4%', trend: 'up' },
    { title: 'Notices', value: notices.length, icon: FileText, color: 'from-purple-500 to-purple-600', change: '+15%', trend: 'up' },
    { title: 'Gallery Media', value: gallery.length, icon: Image, color: 'from-sky-500 to-blue-600', change: '+20%', trend: 'up' },
    { title: 'Events Scheduled', value: events.length, icon: Calendar, color: 'from-yellow-500 to-amber-600', change: '+10%', trend: 'up' },
    { title: 'Jobs Posted', value: jobs.length, icon: Briefcase, color: 'from-indigo-500 to-indigo-600', change: '+25%', trend: 'up' },
    { title: 'Govt Schemes', value: schemes.length, icon: Award, color: 'from-cyan-500 to-blue-600', change: '+5%', trend: 'up' },
    { title: 'Businesses & Shops', value: businesses.length, icon: BookOpen, color: 'from-amber-500 to-orange-600', change: '+12%', trend: 'up' },
  ];

  const recentEnquiries = [...loanEnquiries, ...buildingEnquiries]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  return (
    <AdminLayout title="Dashboard">
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
    </AdminLayout>
  );
};

export default AdminDashboard;
