import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  Send,
  AlertCircle,
  Home,
  CheckCircle2,
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const OwnerProperties: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [availabilityFilter, setAvailabilityFilter] = useState('ALL');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchProperties = async () => {
    const token = localStorage.getItem('ownerToken');
    if (!token) {
      navigate('/owner/login');
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/owner/properties`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(res.data);
    } catch (err: any) {
      console.error('Error fetching owner properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [navigate]);

  const handleAvailabilityChange = async (id: string, newAvailability: string) => {
    const token = localStorage.getItem('ownerToken');
    setActionLoading(id);
    try {
      await axios.patch(
        `${API_URL}/owner/properties/${id}/availability`,
        { availability: newAvailability },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProperties((prev) =>
        prev.map((p) => (p._id === id ? { ...p, availability: newAvailability } : p))
      );
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error updating availability');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSubmitForReview = async (id: string) => {
    const token = localStorage.getItem('ownerToken');
    if (!window.confirm('Submit this property listing for admin review and approval?')) return;
    setActionLoading(id);
    try {
      await axios.post(
        `${API_URL}/owner/properties/${id}/submit`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchProperties();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error submitting property');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    const token = localStorage.getItem('ownerToken');
    if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return;
    }
    setActionLoading(id);
    try {
      await axios.delete(`${API_URL}/owner/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error deleting property');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.locality.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    const matchesAvailability =
      availabilityFilter === 'ALL' || p.availability === availabilityFilter;
    return matchesSearch && matchesStatus && matchesAvailability;
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900">My Properties</h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage your rooms, PGs, hostels and apartments in Gunupur
          </p>
        </div>
        <button
          onClick={() => navigate('/owner/properties/new')}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add New Property
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or locality..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 flex-1 md:flex-initial">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING_REVIEW">Pending Review</option>
              <option value="DRAFT">Draft</option>
              <option value="REJECTED">Action Needed (Rejected)</option>
            </select>
          </div>

          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="flex-1 md:flex-initial px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Availability</option>
            <option value="AVAILABLE">Available</option>
            <option value="RENTED">Rented</option>
            <option value="UNAVAILABLE">Unavailable</option>
          </select>
        </div>
      </div>

      {/* Properties List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-6">
          <Home className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-700">No properties found</h3>
          <p className="text-xs text-slate-400 mt-1">
            {properties.length === 0
              ? 'Get started by creating your first rental property listing.'
              : 'Try adjusting your search or filters.'}
          </p>
          {properties.length === 0 && (
            <button
              onClick={() => navigate('/owner/properties/new')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow"
            >
              Add Property
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProperties.map((prop) => (
            <div
              key={prop._id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-4 space-y-3">
                {/* Header with image & info */}
                <div className="flex gap-3">
                  <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                    <img
                      src={prop.coverImage || '/placeholder-room.jpg'}
                      alt={prop.title}
                      className="w-full h-full object-cover"
                      onError={(e: any) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {prop.propertyType}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
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
                    </div>

                    <h3 className="text-xs font-black text-slate-900 truncate mt-1">{prop.title}</h3>
                    <p className="text-[11px] text-slate-500 font-medium truncate">
                      {prop.locality} • ₹{prop.monthlyRent.toLocaleString('en-IN')}/mo
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Updated: {new Date(prop.updatedAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* Rejection Alert if any */}
                {prop.status === 'REJECTED' && (
                  <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Correction Requested: </span>
                      <span className="font-medium">{prop.rejectionReason || 'Please review listing details.'}</span>
                    </div>
                  </div>
                )}

                {/* Quick Availability Switch */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">Availability:</span>
                  <select
                    value={prop.availability}
                    disabled={actionLoading === prop._id}
                    onChange={(e) => handleAvailabilityChange(prop._id, e.target.value)}
                    className="text-xs font-bold px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="RENTED">Rented</option>
                    <option value="UNAVAILABLE">Unavailable</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="bg-slate-50 border-t border-slate-100 px-4 py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/owner/properties/${prop._id}/edit`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg shadow-sm transition-all"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>

                  {prop.status === 'APPROVED' && (
                    <button
                      onClick={() => window.open(`/rentals/${prop._id}`, '_blank')}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-blue-600 hover:bg-blue-50 text-xs font-bold rounded-lg transition-colors"
                      title="View public page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View
                    </button>
                  )}

                  {(prop.status === 'DRAFT' || prop.status === 'REJECTED') && (
                    <button
                      onClick={() => handleSubmitForReview(prop._id)}
                      disabled={actionLoading === prop._id}
                      className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit for Review
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(prop._id, prop.title)}
                  disabled={actionLoading === prop._id}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete property"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerProperties;
