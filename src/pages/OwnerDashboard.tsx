import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Home,
  Calendar,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const OwnerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [recentProperties, setRecentProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('ownerToken');
    if (!token) {
      navigate('/owner/login');
      return;
    }

    const loadData = async () => {
      try {
        const [statsRes, propsRes] = await Promise.all([
          axios.get(`${API_URL}/owner/dashboard/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/owner/properties`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setStats(statsRes.data);
        setRecentProperties(propsRes.data.slice(0, 5));
      } catch (err: any) {
        console.error('Owner dashboard data error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Properties',
      count: stats?.totalProperties || 0,
      icon: Home,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-100',
    },
    {
      title: 'Published (Public)',
      count: stats?.publishedProperties || 0,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Pending Approval',
      count: stats?.pendingApproval || 0,
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-100',
    },
    {
      title: 'Drafts',
      count: stats?.draftProperties || 0,
      icon: Building2,
      color: 'text-slate-600',
      bg: 'bg-slate-50 border-slate-200',
    },
    {
      title: 'Action Needed (Rejected)',
      count: stats?.rejectedProperties || 0,
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-50 border-red-100',
    },
    {
      title: 'Currently Rented',
      count: stats?.rentedProperties || 0,
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50 border-purple-100',
    },
  ];

  const renewalDateFormatted = stats?.nextRenewalDate
    ? new Date(stats.nextRenewalDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'N/A';

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-bold tracking-wider uppercase mb-2">
            Gunupur Rental Portal
          </span>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Manage Your Rental Listings
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-xl">
            Keep your rooms, PGs, and houses up to date for GIET students and residents arriving in Gunupur.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate('/owner/properties/new')}
            className="flex items-center gap-2 px-5 py-3 bg-white text-blue-700 rounded-2xl font-black text-xs sm:text-sm shadow-md hover:bg-blue-50 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Property
          </button>
          <button
            onClick={() => navigate('/owner/properties')}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600/50 hover:bg-blue-600 text-white rounded-2xl font-bold text-xs sm:text-sm border border-white/20 transition-all"
          >
            View All Properties
          </button>
        </div>
      </div>

      {/* Account & Renewal Status Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">Account Status:</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-md uppercase">
                {stats?.accountStatus || 'ACTIVE'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Registered property owner in Gunupur
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-6">
          <Calendar className="w-4 h-4 text-slate-400" />
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Next Annual Renewal Date
            </p>
            <p className="text-xs font-black text-slate-800">{renewalDateFormatted}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className={`p-4 rounded-2xl border ${card.bg} shadow-sm transition-all`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${card.color}`} />
                <span className="text-xl font-black text-slate-800">{card.count}</span>
              </div>
              <p className="text-[11px] font-bold text-slate-600 leading-tight">{card.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Properties Section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-800">Recent Listings</h3>
            <p className="text-xs text-slate-500 font-medium">Quick glance at your latest properties</p>
          </div>
          <button
            onClick={() => navigate('/owner/properties')}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            Manage All <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentProperties.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl">
            <Home className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-600">No properties added yet</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Click Add Property above to create your first listing.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentProperties.map((prop) => (
              <div
                key={prop._id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 p-2 rounded-xl transition-colors cursor-pointer"
                onClick={() => navigate(`/owner/properties/${prop._id}/edit`)}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                    <img
                      src={prop.coverImage || '/placeholder-room.jpg'}
                      alt={prop.title}
                      className="w-full h-full object-cover"
                      onError={(e: any) => {
                        e.target.src = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-800">{prop.title}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {prop.propertyType} • {prop.locality} • ₹{prop.monthlyRent}/month
                    </p>
                    {prop.status === 'REJECTED' && prop.rejectionReason && (
                      <p className="text-[10px] text-red-600 font-bold mt-1">
                        Correction needed: {prop.rejectionReason}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg ${
                      prop.status === 'APPROVED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : prop.status === 'PENDING_REVIEW'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : prop.status === 'REJECTED'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {prop.status}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                      prop.availability === 'AVAILABLE'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {prop.availability}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
