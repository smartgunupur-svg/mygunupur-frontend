import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Users,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  History,
  Plus,
  Search,
  Filter,
  Eye,
  Key,
  Trash2,
  Check,
  X,
  AlertTriangle,
  RefreshCw,
  Copy,
  ExternalLink,
  ShieldAlert,
  Sliders,
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

type TabType =
  | 'overview'
  | 'owners'
  | 'properties'
  | 'approvals'
  | 'places'
  | 'renewals'
  | 'activity';

const AdminRentals: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [loading, setLoading] = useState(true);

  // Data states
  const [overview, setOverview] = useState<any>(null);
  const [owners, setOwners] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [popularPlaces, setPopularPlaces] = useState<any[]>([]);
  const [activityHistory, setActivityHistory] = useState<any[]>([]);

  // Search & Filters
  const [ownerSearch, setOwnerSearch] = useState('');
  const [ownerStatusFilter, setOwnerStatusFilter] = useState('ALL');
  const [ownerRenewalFilter, setOwnerRenewalFilter] = useState('ALL');

  const [propSearch, setPropSearch] = useState('');
  const [propStatusFilter, setPropStatusFilter] = useState('ALL');
  const [propTypeFilter, setPropTypeFilter] = useState('ALL');

  // Modals
  const [showCreateOwnerModal, setShowCreateOwnerModal] = useState(false);
  const [newOwnerData, setNewOwnerData] = useState({
    name: '',
    phone: '',
    email: '',
    temporaryPassword: '',
    renewalDueDate: '',
    adminNotes: '',
    address: '',
    whatsappNumber: '',
  });
  const [createdCredential, setCreatedCredential] = useState<{
    phone: string;
    tempPass: string;
  } | null>(null);

  // Review Property Modal
  const [reviewingProperty, setReviewingProperty] = useState<any | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [reviewActionLoading, setReviewActionLoading] = useState(false);

  // Owner Details Modal
  const [selectedOwnerDetail, setSelectedOwnerDetail] = useState<any | null>(null);

  // Renewal Modal
  const [renewingOwner, setRenewingOwner] = useState<any | null>(null);
  const [renewalForm, setRenewalForm] = useState({
    durationYears: '1',
    customDate: '',
    notes: '',
  });

  // Popular Place Modal
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [editingPlace, setEditingPlace] = useState<any | null>(null);
  const [placeForm, setPlaceForm] = useState({
    name: '',
    category: 'Landmark',
    locality: 'Gunupur',
    address: '',
    latitude: '',
    longitude: '',
    mapUrl: '',
    isActive: true,
  });

  const getAuthHeader = () => {
    const token = localStorage.getItem('adminToken');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchOverview = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/rentals/overview`, getAuthHeader());
      setOverview(res.data);
    } catch (e) {
      console.error('Error fetching rental overview:', e);
    }
  };

  const fetchOwners = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/rentals/owners`, getAuthHeader());
      setOwners(res.data);
    } catch (e) {
      console.error('Error fetching owners:', e);
    }
  };

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/rentals/properties`, getAuthHeader());
      setProperties(res.data);
    } catch (e) {
      console.error('Error fetching properties:', e);
    }
  };

  const fetchPendingApprovals = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/rentals/properties/pending`, getAuthHeader());
      setPendingApprovals(res.data);
    } catch (e) {
      console.error('Error fetching approvals:', e);
    }
  };

  const fetchPopularPlaces = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/rentals/popular-places`, getAuthHeader());
      setPopularPlaces(res.data);
    } catch (e) {
      console.error('Error fetching popular places:', e);
    }
  };

  const fetchActivityHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/rentals/activity`, getAuthHeader());
      setActivityHistory(res.data);
    } catch (e) {
      console.error('Error fetching activity history:', e);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchOverview(),
      fetchOwners(),
      fetchProperties(),
      fetchPendingApprovals(),
      fetchPopularPlaces(),
      fetchActivityHistory(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadAllData();
  }, [navigate]);

  // Handler: Create Owner
  const handleCreateOwner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/admin/rentals/owners`, newOwnerData, getAuthHeader());
      setCreatedCredential({
        phone: res.data.owner.phone,
        tempPass: res.data.temporaryPassword,
      });
      fetchOwners();
      fetchOverview();
      setNewOwnerData({
        name: '',
        phone: '',
        email: '',
        temporaryPassword: '',
        renewalDueDate: '',
        adminNotes: '',
        address: '',
        whatsappNumber: '',
      });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error creating owner account');
    }
  };

  // Handler: Reset Password for Owner
  const handleResetOwnerPassword = async (ownerId: string, ownerName: string) => {
    if (!window.confirm(`Generate a new temporary password for ${ownerName}?`)) return;
    try {
      const res = await axios.post(
        `${API_URL}/admin/rentals/owners/${ownerId}/reset-password`,
        {},
        getAuthHeader()
      );
      alert(`New Temporary Password for ${ownerName}:\n\n${res.data.temporaryPassword}\n\nPlease share this securely with the owner.`);
      fetchOwners();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error resetting password');
    }
  };

  // Handler: Change Owner Status
  const handleOwnerStatusChange = async (ownerId: string, newStatus: string) => {
    if (!window.confirm(`Change owner account status to ${newStatus}?`)) return;
    try {
      await axios.patch(
        `${API_URL}/admin/rentals/owners/${ownerId}/status`,
        { status: newStatus },
        getAuthHeader()
      );
      fetchOwners();
      fetchOverview();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error updating status');
    }
  };

  // Handler: Record Annual Renewal
  const handleRecordRenewal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!renewingOwner) return;
    try {
      await axios.patch(
        `${API_URL}/admin/rentals/owners/${renewingOwner._id}/renewal`,
        {
          newDueDate: renewalForm.customDate || undefined,
          renewDurationYears: Number(renewalForm.durationYears),
          notes: renewalForm.notes,
        },
        getAuthHeader()
      );
      setRenewingOwner(null);
      fetchOwners();
      fetchOverview();
      alert('Renewal recorded successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error recording renewal');
    }
  };

  // Handler: Review Property (Approve / Reject / Unpublish)
  const handleReviewAction = async (action: 'APPROVE' | 'REJECT' | 'UNPUBLISH') => {
    if (!reviewingProperty) return;
    if (action === 'REJECT' && !rejectionReason.trim()) {
      alert('Please specify the rejection reason or required correction instructions.');
      return;
    }

    setReviewActionLoading(true);
    try {
      await axios.patch(
        `${API_URL}/admin/rentals/properties/${reviewingProperty._id}/review`,
        { action, reason: rejectionReason },
        getAuthHeader()
      );
      setReviewingProperty(null);
      setRejectionReason('');
      fetchProperties();
      fetchPendingApprovals();
      fetchOverview();
      fetchActivityHistory();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error updating property status');
    } finally {
      setReviewActionLoading(false);
    }
  };

  // Handler: Delete Property
  const handleDeleteProperty = async (propId: string, title: string) => {
    if (!window.confirm(`Permanently remove property "${title}"?`)) return;
    try {
      await axios.delete(`${API_URL}/admin/rentals/properties/${propId}`, getAuthHeader());
      fetchProperties();
      fetchPendingApprovals();
      fetchOverview();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error deleting property');
    }
  };

  // Handler: Save Popular Place
  const handleSavePlace = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPlace) {
        await axios.put(
          `${API_URL}/admin/rentals/popular-places/${editingPlace._id}`,
          placeForm,
          getAuthHeader()
        );
      } else {
        await axios.post(`${API_URL}/admin/rentals/popular-places`, placeForm, getAuthHeader());
      }
      setShowPlaceModal(false);
      setEditingPlace(null);
      fetchPopularPlaces();
      fetchOverview();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error saving popular place');
    }
  };

  const handleDeletePlace = async (placeId: string, name: string) => {
    if (!window.confirm(`Delete landmark "${name}"?`)) return;
    try {
      await axios.delete(`${API_URL}/admin/rentals/popular-places/${placeId}`, getAuthHeader());
      fetchPopularPlaces();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error deleting place');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Filtered owners
  const filteredOwners = owners.filter((o) => {
    const matchesSearch =
      o.name.toLowerCase().includes(ownerSearch.toLowerCase()) ||
      o.phone.includes(ownerSearch) ||
      (o.email && o.email.toLowerCase().includes(ownerSearch.toLowerCase()));
    const matchesStatus = ownerStatusFilter === 'ALL' || o.status === ownerStatusFilter;
    const matchesRenewal =
      ownerRenewalFilter === 'ALL' || o.renewalStatus === ownerRenewalFilter;
    return matchesSearch && matchesStatus && matchesRenewal;
  });

  // Filtered properties
  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(propSearch.toLowerCase()) ||
      p.locality.toLowerCase().includes(propSearch.toLowerCase()) ||
      (p.owner?.name && p.owner.name.toLowerCase().includes(propSearch.toLowerCase()));
    const matchesStatus = propStatusFilter === 'ALL' || p.status === propStatusFilter;
    const matchesType = propTypeFilter === 'ALL' || p.propertyType === propTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Title & Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900">Rental Properties System</h1>
              <p className="text-xs text-slate-500 font-medium">
                Manage property owners, room listings, reviews, and renewals for Gunupur
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCreatedCredential(null);
                setShowCreateOwnerModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all"
            >
              <Plus className="w-4 h-4" /> Create Owner Account
            </button>
            <button
              onClick={loadAllData}
              title="Refresh"
              className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-t border-slate-100 pt-3 scrollbar-none">
          {[
            { id: 'overview', label: 'Overview', icon: Sliders },
            { id: 'owners', label: `Property Owners (${owners.length})`, icon: Users },
            { id: 'properties', label: `All Properties (${properties.length})`, icon: Home },
            {
              id: 'approvals',
              label: `Pending Approvals (${pendingApprovals.length})`,
              icon: Clock,
              badge: pendingApprovals.length > 0 ? pendingApprovals.length : null,
            },
            { id: 'places', label: `Popular Places (${popularPlaces.length})`, icon: MapPin },
            { id: 'renewals', label: 'Annual Renewals', icon: Calendar },
            { id: 'activity', label: 'Activity History', icon: History },
          ].map((tab: any) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="ml-1 px-1.5 py-0.2 bg-red-500 text-white text-[10px] font-black rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Pending Alert if any */}
          {pendingApprovals.length > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-black text-amber-900">
                    {pendingApprovals.length} Properties Awaiting Review
                  </h4>
                  <p className="text-[11px] text-amber-700 font-medium">
                    New rooms and flats have been submitted by owners and need your verification.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('approvals')}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm whitespace-nowrap"
              >
                Review Now
              </button>
            </div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Total Properties
              </span>
              <p className="text-2xl font-black text-slate-800 mt-1">
                {overview?.properties?.total || 0}
              </p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                {overview?.properties?.availablePublic || 0} live on site
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Pending Approvals
              </span>
              <p className="text-2xl font-black text-amber-600 mt-1">
                {overview?.properties?.pendingReview || 0}
              </p>
              <p className="text-[11px] text-slate-500 font-semibold mt-1">
                Requires admin review
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Property Owners
              </span>
              <p className="text-2xl font-black text-blue-600 mt-1">
                {overview?.owners?.total || 0}
              </p>
              <p className="text-[11px] text-slate-500 font-semibold mt-1">
                {overview?.owners?.active || 0} active accounts
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Overdue Renewals
              </span>
              <p className="text-2xl font-black text-red-600 mt-1">
                {overview?.owners?.overdueRenewals || 0}
              </p>
              <p className="text-[11px] text-amber-600 font-semibold mt-1">
                {overview?.owners?.upcomingRenewals || 0} due soon
              </p>
            </div>
          </div>

          {/* Quick links & summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Listing Distribution
              </h3>
              <div className="space-y-2 text-xs font-medium text-slate-600">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span>Approved & Available</span>
                  <span className="font-bold text-emerald-600">{overview?.properties?.availablePublic || 0}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span>Currently Rented</span>
                  <span className="font-bold text-purple-600">{overview?.properties?.rented || 0}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span>Drafts (in progress)</span>
                  <span className="font-bold text-slate-600">{overview?.properties?.draft || 0}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Rejected (corrections needed)</span>
                  <span className="font-bold text-red-600">{overview?.properties?.rejected || 0}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Gunupur Landmarks
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {popularPlaces.length} verified landmarks configured for distance and location search.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {popularPlaces.map((pl) => (
                  <span
                    key={pl._id}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-bold rounded-lg"
                  >
                    📍 {pl.name}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setActiveTab('places')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 pt-2 block"
              >
                Manage Landmarks →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROPERTY OWNERS */}
      {activeTab === 'owners' && (
        <div className="space-y-4">
          {/* Search & Filter */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search owner by name, phone, or email..."
                value={ownerSearch}
                onChange={(e) => setOwnerSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>
            <select
              value={ownerStatusFilter}
              onChange={(e) => setOwnerStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Account Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INVITED">Invited</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="DEACTIVATED">Deactivated</option>
            </select>
            <select
              value={ownerRenewalFilter}
              onChange={(e) => setOwnerRenewalFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Renewal Statuses</option>
              <option value="ACTIVE">Active (Renewed)</option>
              <option value="DUE_SOON">Due Soon (&lt; 30d)</option>
              <option value="OVERDUE">Overdue</option>
            </select>
          </div>

          {/* Owners Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Owner Name</th>
                    <th className="py-3.5 px-4">Phone / Contact</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Properties</th>
                    <th className="py-3.5 px-4">Renewal Due</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredOwners.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No property owners found.
                      </td>
                    </tr>
                  ) : (
                    filteredOwners.map((owner) => (
                      <tr key={owner._id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">
                          {owner.name}
                          {owner.email && (
                            <span className="block text-[10px] text-slate-400 font-medium">
                              {owner.email}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-700">
                          {owner.phone}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md ${
                              owner.status === 'ACTIVE'
                                ? 'bg-emerald-100 text-emerald-800'
                                : owner.status === 'SUSPENDED'
                                ? 'bg-amber-100 text-amber-800'
                                : owner.status === 'DEACTIVATED'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {owner.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium">
                          <span className="font-bold text-blue-600">{owner.totalProperties || 0}</span> total ({owner.publishedProperties || 0} live)
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-[11px] font-bold ${
                              owner.renewalStatus === 'OVERDUE'
                                ? 'text-red-600'
                                : owner.renewalStatus === 'DUE_SOON'
                                ? 'text-amber-600'
                                : 'text-slate-600'
                            }`}
                          >
                            {owner.renewalDueDate
                              ? new Date(owner.renewalDueDate).toLocaleDateString('en-IN')
                              : 'N/A'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setRenewingOwner(owner);
                                setRenewalForm({
                                  durationYears: '1',
                                  customDate: '',
                                  notes: '',
                                });
                              }}
                              className="px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-[10px] font-bold"
                              title="Record Annual Renewal"
                            >
                              Renew
                            </button>
                            <button
                              onClick={() => handleResetOwnerPassword(owner._id, owner.name)}
                              className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                              title="Reset Password Securely"
                            >
                              <Key className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() =>
                                handleOwnerStatusChange(
                                  owner._id,
                                  owner.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'
                                )
                              }
                              className={`p-1.5 rounded-lg ${
                                owner.status === 'ACTIVE'
                                  ? 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                                  : 'text-emerald-600 hover:bg-emerald-50'
                              }`}
                              title={owner.status === 'ACTIVE' ? 'Suspend Account' : 'Reactivate Account'}
                            >
                              {owner.status === 'ACTIVE' ? (
                                <AlertTriangle className="w-3.5 h-3.5" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ALL PROPERTIES */}
      {activeTab === 'properties' && (
        <div className="space-y-4">
          {/* Filter Toolbar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search properties by title, locality, or owner..."
                value={propSearch}
                onChange={(e) => setPropSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>
            <select
              value={propStatusFilter}
              onChange={(e) => setPropStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="APPROVED">Approved (Public)</option>
              <option value="PENDING_REVIEW">Pending Review</option>
              <option value="DRAFT">Draft</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <select
              value={propTypeFilter}
              onChange={(e) => setPropTypeFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Types</option>
              <option value="Single Room">Single Room</option>
              <option value="PG">PG</option>
              <option value="Hostel">Hostel</option>
              <option value="Flat / Apartment">Flat / Apartment</option>
              <option value="Independent House">Independent House</option>
            </select>
          </div>

          {/* Properties Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Property</th>
                    <th className="py-3.5 px-4">Owner</th>
                    <th className="py-3.5 px-4">Rent</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Availability</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredProperties.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No properties found.
                      </td>
                    </tr>
                  ) : (
                    filteredProperties.map((prop) => (
                      <tr key={prop._id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                              <img
                                src={prop.coverImage || '/placeholder-room.jpg'}
                                alt=""
                                className="w-full h-full object-cover"
                                onError={(e: any) => {
                                  e.target.src =
                                    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=300&q=80';
                                }}
                              />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 truncate max-w-xs">{prop.title}</p>
                              <span className="text-[10px] text-slate-400">
                                {prop.propertyType} • {prop.locality}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-800">{prop.owner?.name || 'Owner'}</p>
                          <span className="text-[10px] text-slate-500">{prop.owner?.phone}</span>
                        </td>
                        <td className="py-3 px-4 font-black text-slate-900">
                          ₹{prop.monthlyRent.toLocaleString('en-IN')}/mo
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md ${
                              prop.status === 'APPROVED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : prop.status === 'PENDING_REVIEW'
                                ? 'bg-amber-100 text-amber-800'
                                : prop.status === 'REJECTED'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {prop.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-[11px] font-bold text-slate-600">
                            {prop.availability}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setReviewingProperty(prop);
                                setRejectionReason(prop.rejectionReason || '');
                              }}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-bold rounded-lg text-[10px]"
                            >
                              Review
                            </button>
                            {prop.status === 'APPROVED' && (
                              <button
                                onClick={() => window.open(`/rentals/${prop._id}`, '_blank')}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="View public page"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteProperty(prop._id, prop.title)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete Property"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PENDING APPROVALS */}
      {activeTab === 'approvals' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-slate-800">Pending Review Queue</h2>
              <p className="text-xs text-slate-500 font-medium">
                Verify rent details, photograph authenticity, and safety standards before approving
              </p>
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 font-black text-xs rounded-xl">
              {pendingApprovals.length} awaiting
            </span>
          </div>

          {pendingApprovals.length === 0 ? (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800">All caught up!</h3>
              <p className="text-xs text-slate-400 mt-0.5">There are no pending property approvals.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingApprovals.map((prop) => (
                <div
                  key={prop._id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm p-4 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-24 h-24 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                        <img
                          src={prop.coverImage || (prop.images && prop.images[0]) || '/placeholder-room.jpg'}
                          alt={prop.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-black rounded-md">
                          {prop.propertyType}
                        </span>
                        <h3 className="text-sm font-black text-slate-900 mt-1 truncate">{prop.title}</h3>
                        <p className="text-xs text-slate-600 font-bold mt-0.5">
                          ₹{prop.monthlyRent.toLocaleString('en-IN')}/mo • {prop.locality}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Owner: <strong>{prop.owner?.name}</strong> ({prop.owner?.phone})
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-slate-600 leading-relaxed max-h-24 overflow-y-auto">
                      {prop.description}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {prop.amenities?.slice(0, 5).map((a: string) => (
                        <span
                          key={a}
                          className="px-2 py-0.5 bg-white border border-slate-200 text-slate-600 text-[10px] font-medium rounded-md"
                        >
                          {a}
                        </span>
                      ))}
                      {prop.amenities?.length > 5 && (
                        <span className="text-[10px] text-slate-400 font-bold self-center">
                          +{prop.amenities.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setReviewingProperty(prop);
                        setRejectionReason('');
                      }}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                    >
                      Details & Reject
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await axios.patch(
                            `${API_URL}/admin/rentals/properties/${prop._id}/review`,
                            { action: 'APPROVE' },
                            getAuthHeader()
                          );
                          fetchPendingApprovals();
                          fetchProperties();
                          fetchOverview();
                        } catch (e: any) {
                          alert(e.response?.data?.message || 'Error approving');
                        }
                      }}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm"
                    >
                      Approve Listing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: POPULAR PLACES (LANDMARKS) */}
      {activeTab === 'places' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-slate-800">Gunupur Popular Places & Landmarks</h2>
              <p className="text-xs text-slate-500 font-medium">
                Enables straight-line proximity calculations and landmark searches for visitors
              </p>
            </div>
            <button
              onClick={() => {
                setEditingPlace(null);
                setPlaceForm({
                  name: '',
                  category: 'Landmark',
                  locality: 'Gunupur',
                  address: '',
                  latitude: '',
                  longitude: '',
                  mapUrl: '',
                  isActive: true,
                });
                setShowPlaceModal(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow transition-all"
            >
              <Plus className="w-4 h-4" /> Add Landmark
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {popularPlaces.map((place) => (
              <div
                key={place._id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {place.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        place.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {place.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 mt-2">{place.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{place.locality}</p>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">
                    {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-3">
                  {place.mapUrl ? (
                    <a
                      href={place.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span />
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingPlace(place);
                        setPlaceForm({
                          name: place.name,
                          category: place.category,
                          locality: place.locality,
                          address: place.address || '',
                          latitude: String(place.latitude),
                          longitude: String(place.longitude),
                          mapUrl: place.mapUrl || '',
                          isActive: place.isActive,
                        });
                        setShowPlaceModal(true);
                      }}
                      className="text-xs font-bold text-slate-600 hover:text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePlace(place._id, place.name)}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: ANNUAL RENEWALS */}
      {activeTab === 'renewals' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
            <h2 className="text-sm font-black text-slate-800">Annual Renewal Tracking (Manual)</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              MyGunupur charges an annual fee for owner listing privileges. Renewal payments are collected manually (no online payment gateway). Administrators record renewals and update dates after external verification.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Owner</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Account Status</th>
                  <th className="py-3.5 px-4">Due Date</th>
                  <th className="py-3.5 px-4">Renewal Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {owners.map((owner) => (
                  <tr key={owner._id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-bold text-slate-900">{owner.name}</td>
                    <td className="py-3 px-4">{owner.phone}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-700">
                        {owner.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {owner.renewalDueDate
                        ? new Date(owner.renewalDueDate).toLocaleDateString('en-IN')
                        : 'Not Set'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md ${
                          owner.renewalStatus === 'OVERDUE'
                            ? 'bg-red-100 text-red-800'
                            : owner.renewalStatus === 'DUE_SOON'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {owner.renewalStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setRenewingOwner(owner);
                          setRenewalForm({
                            durationYears: '1',
                            customDate: '',
                            notes: '',
                          });
                        }}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm"
                      >
                        Record Renewal
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: ACTIVITY AUDIT HISTORY */}
      {activeTab === 'activity' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-black text-slate-800">Rental Activity History</h2>
          <div className="divide-y divide-slate-100">
            {activityHistory.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No recorded activity logs yet.</p>
            ) : (
              activityHistory.map((log) => (
                <div key={log._id} className="py-3 flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-extrabold text-[10px] rounded">
                        {log.action}
                      </span>
                      <span className="text-xs font-bold text-slate-800">{log.targetTitle}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      By {log.actorType} ({log.actorEmail || log.actorId})
                    </p>
                    {log.details && (
                      <p className="text-[10px] text-slate-400 font-mono">
                        {JSON.stringify(log.details)}
                      </p>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString('en-IN')}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* MODAL: CREATE OWNER ACCOUNT */}
      {showCreateOwnerModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">Create Property Owner Account</h3>
              <button
                onClick={() => setShowCreateOwnerModal(false)}
                className="p-1 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {createdCredential ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Owner Account Created Successfully!</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Provide the following temporary credentials to the owner. They will be required to create a new password upon first login.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-emerald-200 font-mono text-xs space-y-1">
                    <p>Phone / Login: <strong>{createdCredential.phone}</strong></p>
                    <p>Temporary Password: <strong>{createdCredential.tempPass}</strong></p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateOwnerModal(false)}
                  className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateOwner} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Owner Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newOwnerData.name}
                    onChange={(e) => setNewOwnerData({ ...newOwnerData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                    placeholder="e.g. Ramesh Chandra Das"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number (Login Identifier) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={newOwnerData.phone}
                    onChange={(e) => setNewOwnerData({ ...newOwnerData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                    placeholder="10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={newOwnerData.email}
                    onChange={(e) => setNewOwnerData({ ...newOwnerData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                    placeholder="owner@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Custom Temporary Password (leave blank to auto-generate)
                  </label>
                  <input
                    type="text"
                    value={newOwnerData.temporaryPassword}
                    onChange={(e) =>
                      setNewOwnerData({ ...newOwnerData, temporaryPassword: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                    placeholder="Auto-generated if left empty"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Internal Admin Notes
                  </label>
                  <textarea
                    rows={2}
                    value={newOwnerData.adminNotes}
                    onChange={(e) =>
                      setNewOwnerData({ ...newOwnerData, adminNotes: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                    placeholder="e.g. Verified ownership of Gobriguda building."
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateOwnerModal(false)}
                    className="px-4 py-2 border border-slate-200 text-xs font-bold rounded-xl text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: RECORD ANNUAL RENEWAL */}
      {renewingOwner && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">
                Record Annual Renewal: {renewingOwner.name}
              </h3>
              <button onClick={() => setRenewingOwner(null)} className="p-1 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleRecordRenewal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Extension Duration</label>
                <select
                  value={renewalForm.durationYears}
                  onChange={(e) => setRenewalForm({ ...renewalForm, durationYears: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none"
                >
                  <option value="1">+1 Year from current due date</option>
                  <option value="2">+2 Years from current due date</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Or Set Specific Custom Due Date
                </label>
                <input
                  type="date"
                  value={renewalForm.customDate}
                  onChange={(e) => setRenewalForm({ ...renewalForm, customDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Admin Notes</label>
                <textarea
                  rows={2}
                  value={renewalForm.notes}
                  onChange={(e) => setRenewalForm({ ...renewalForm, notes: e.target.value })}
                  placeholder="e.g. Paid in cash / verified receipt."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRenewingOwner(null)}
                  className="px-4 py-2 border border-slate-200 text-xs font-bold rounded-xl text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow"
                >
                  Confirm Renewal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PROPERTY REVIEW (APPROVE / REJECT) */}
      {reviewingProperty && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">Review Listing</h3>
              <button onClick={() => setReviewingProperty(null)} className="p-1 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border">
                  <img
                    src={reviewingProperty.coverImage || (reviewingProperty.images && reviewingProperty.images[0])}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">{reviewingProperty.title}</h4>
                  <p className="text-xs text-slate-600 font-semibold">
                    {reviewingProperty.propertyType} • {reviewingProperty.locality} • ₹
                    {reviewingProperty.monthlyRent}/mo
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Owner: {reviewingProperty.owner?.name} ({reviewingProperty.owner?.phone})
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Address</span>
                <p className="text-xs text-slate-800">{reviewingProperty.address}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Description</span>
                <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl">
                  {reviewingProperty.description}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Rejection Reason / Correction Instructions (Required if rejecting)
                </label>
                <textarea
                  rows={2}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="e.g. Please upload clear photographs of the bathroom and clarify electricity charges."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setReviewingProperty(null)}
                className="px-4 py-2 border border-slate-200 text-xs font-bold rounded-xl text-slate-600"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                {reviewingProperty.status === 'APPROVED' ? (
                  <button
                    disabled={reviewActionLoading}
                    onClick={() => handleReviewAction('UNPUBLISH')}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Unpublish Listing
                  </button>
                ) : (
                  <>
                    <button
                      disabled={reviewActionLoading}
                      onClick={() => handleReviewAction('REJECT')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow"
                    >
                      Reject with Reason
                    </button>
                    <button
                      disabled={reviewActionLoading}
                      onClick={() => handleReviewAction('APPROVE')}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow"
                    >
                      Approve Listing
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT POPULAR PLACE */}
      {showPlaceModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">
                {editingPlace ? 'Edit Landmark' : 'Add Popular Place in Gunupur'}
              </h3>
              <button onClick={() => setShowPlaceModal(false)} className="p-1 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSavePlace} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Landmark Name *</label>
                <input
                  type="text"
                  required
                  value={placeForm.name}
                  onChange={(e) => setPlaceForm({ ...placeForm, name: e.target.value })}
                  placeholder="e.g. GIET University"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={placeForm.category}
                    onChange={(e) => setPlaceForm({ ...placeForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none"
                  >
                    <option value="Education">Education</option>
                    <option value="Transport">Transport</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Market">Market</option>
                    <option value="Landmark">Landmark</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Locality</label>
                  <input
                    type="text"
                    value={placeForm.locality}
                    onChange={(e) => setPlaceForm({ ...placeForm, locality: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Latitude *</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={placeForm.latitude}
                    onChange={(e) => setPlaceForm({ ...placeForm, latitude: e.target.value })}
                    placeholder="19.0558"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Longitude *</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={placeForm.longitude}
                    onChange={(e) => setPlaceForm({ ...placeForm, longitude: e.target.value })}
                    placeholder="83.8219"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps URL</label>
                <input
                  type="text"
                  value={placeForm.mapUrl}
                  onChange={(e) => setPlaceForm({ ...placeForm, mapUrl: e.target.value })}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="placeActive"
                  checked={placeForm.isActive}
                  onChange={(e) => setPlaceForm({ ...placeForm, isActive: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="placeActive" className="text-xs font-bold text-slate-700">
                  Active (visible in public search dropdown)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPlaceModal(false)}
                  className="px-4 py-2 border border-slate-200 text-xs font-bold rounded-xl text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow"
                >
                  Save Landmark
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRentals;
