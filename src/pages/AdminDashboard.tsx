import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Building2, 
  Users, 
  ArrowRight,
  Banknote,
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
  AlertTriangle,
  MonitorPlay,
  Bell,
  TrendingUp,
  XCircle
} from 'lucide-react';
import axios from 'axios';
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
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
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
          restaurantsRes,
          heroSlidesRes
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
          axios.get(`${API_URL}/restaurants`),
          axios.get(`${API_URL}/hero-slides/admin`)
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
        setHeroSlides(heroSlidesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const stats = [
    { title: 'Loan Enquiries', value: loanEnquiries.length, icon: FileText, color: 'from-blue-500 to-blue-600', path: '/admin/loan-enquiries' },
    { title: 'Building Enquiries', value: buildingEnquiries.length, icon: Building2, color: 'from-green-500 to-emerald-600', path: '/admin/building-enquiries' },
    { title: 'Hero Slides', value: heroSlides.length, icon: MonitorPlay, color: 'from-purple-500 to-indigo-600', path: '/admin/hero-slides' },
    { title: 'Total Banks', value: banks.length, icon: Banknote, color: 'from-indigo-500 to-purple-600', path: '/admin/banks' },
    { title: 'Hospitals', value: hospitals.length, icon: HeartPulse, color: 'from-pink-500 to-rose-600', path: '/admin/hospitals' },
    { title: 'Blood Donors', value: bloodDonors.length, icon: Droplets, color: 'from-red-500 to-rose-600', path: '/admin/blood-donors' },
    { title: 'Tourist Places', value: touristPlaces.length, icon: MapPin, color: 'from-teal-500 to-cyan-600', path: '/admin/tourist-places' },
    { title: 'Notices', value: notices.length, icon: FileText, color: 'from-purple-500 to-purple-600', path: '/admin/notices' },
    { title: 'Gallery Media', value: gallery.length, icon: Image, color: 'from-sky-500 to-blue-600', path: '/admin/gallery' },
    { title: 'Events Scheduled', value: events.length, icon: Calendar, color: 'from-yellow-500 to-amber-600', path: '/admin/events' },
    { title: 'Jobs Posted', value: jobs.length, icon: Briefcase, color: 'from-indigo-500 to-indigo-600', path: '/admin/jobs' },
    { title: 'Govt Schemes', value: schemes.length, icon: Award, color: 'from-cyan-500 to-blue-600', path: '/admin/schemes' },
    { title: 'Businesses & Shops', value: businesses.length, icon: BookOpen, color: 'from-amber-500 to-orange-600', path: '/admin/businesses' },
  ];

  const recentEnquiries = [...loanEnquiries, ...buildingEnquiries]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  const quickActions = [
    { title: 'Add New Bank', icon: Banknote, color: 'from-blue-50 to-indigo-50', iconColor: 'text-blue-600', border: 'border-blue-100', path: '/admin/banks' },
    { title: 'Add Hero Slide', icon: MonitorPlay, color: 'from-purple-50 to-indigo-50', iconColor: 'text-purple-600', border: 'border-purple-100', path: '/admin/hero-slides' },
    { title: 'Add Business', icon: BookOpen, color: 'from-amber-50 to-orange-50', iconColor: 'text-amber-600', border: 'border-amber-100', path: '/admin/businesses' },
    { title: 'Add Emergency Contact', icon: AlertTriangle, color: 'from-red-50 to-orange-50', iconColor: 'text-red-600', border: 'border-red-100', path: '/admin/emergency-contacts' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2">Welcome back, Admin!</h1>
            <p className="text-blue-100 text-lg font-semibold">Here's what's happening in your city today.</p>
          </div>
          <div className="mt-6 md:mt-0 flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl">
              <p className="text-sm font-semibold text-blue-100">Total Active Slides</p>
              <p className="text-2xl font-black">{heroSlides.filter(s => s.active).length}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
        {stats.map((stat, index) => (
          <motion.button
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(stat.path)}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 text-left"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-md`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-slate-300" />
            </div>
            <p className="text-4xl font-black text-slate-800 mb-1">{loading ? '...' : stat.value}</p>
            <p className="text-sm font-semibold text-slate-500">{stat.title}</p>
          </motion.button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              <Clock className="w-7 h-7 text-blue-600" />
              Recent Enquiries
            </h3>
            <button
              onClick={() => navigate('/admin/loan-enquiries')}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-xl transition-all flex items-center gap-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                  <tr>
                    <th className="px-8 py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Name</th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Type</th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Date</th>
                    <th className="px-8 py-5 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-16 text-center text-slate-500 font-semibold">Loading...</td>
                    </tr>
                  ) : recentEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-16 text-center text-slate-500 font-semibold">No enquiries yet</td>
                    </tr>
                  ) : (
                    recentEnquiries.map((enquiry, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                        onClick={() => navigate(enquiry.loanAmount ? '/admin/loan-enquiries' : '/admin/building-enquiries')}
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-md">
                              <Users className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-bold text-lg text-slate-800">{enquiry.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-4 py-2 rounded-full text-xs font-bold ${
                            enquiry.loanAmount ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {enquiry.loanAmount ? 'Loan' : 'Building'}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-sm font-semibold text-slate-700">
                            {new Date(enquiry.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">
                            {new Date(enquiry.createdAt).toLocaleTimeString()}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          {(() => {
                            const status = enquiry.status || 'pending';
                            const statusConfig = {
                              pending: { label: 'Pending', color: 'text-yellow-700 bg-yellow-100', icon: Clock },
                              in_progress: { label: 'In Progress', color: 'text-blue-700 bg-blue-100', icon: MonitorPlay },
                              completed: { label: 'Completed', color: 'text-green-700 bg-green-100', icon: CheckCircle },
                              cancelled: { label: 'Cancelled', color: 'text-red-700 bg-red-100', icon: XCircle }
                            };
                            const config = statusConfig[status as keyof typeof statusConfig];
                            const Icon = config.icon;
                            return (
                              <span className={`flex items-center gap-2 ${config.color} px-4 py-2 rounded-full text-xs font-bold`}>
                                <Icon className="w-4 h-4" />
                                {config.label}
                              </span>
                            );
                          })()}
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
        <div className="space-y-8">
          {/* Quick Actions */}
          <div>
            <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <Bell className="w-7 h-7 text-orange-600" />
              Quick Actions
            </h3>
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 space-y-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4, scale: 1.01 }}
                  onClick={() => navigate(action.path)}
                  className={`w-full flex items-center justify-between p-5 bg-gradient-to-r ${action.color} hover:opacity-90 rounded-2xl transition-all border ${action.border}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md`}>
                      <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                    </div>
                    <span className="font-bold text-lg text-slate-800">{action.title}</span>
                  </div>
                  <ArrowRight className={`w-5 h-5 ${action.iconColor}`} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* System Stats */}
          <div>
            <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <CheckCircle className="w-7 h-7 text-green-600" />
              System Stats
            </h3>
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                    <span className="font-bold text-lg text-slate-800">Emergency Contacts</span>
                  </div>
                  <span className="font-black text-2xl text-slate-800">{emergencyContacts.length}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-teal-600" />
                    <span className="font-bold text-lg text-slate-800">Tourist Places</span>
                  </div>
                  <span className="font-black text-2xl text-slate-800">{touristPlaces.length}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <HeartPulse className="w-6 h-6 text-pink-600" />
                    <span className="font-bold text-lg text-slate-800">Hospitals</span>
                  </div>
                  <span className="font-black text-2xl text-slate-800">{hospitals.length}</span>
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
