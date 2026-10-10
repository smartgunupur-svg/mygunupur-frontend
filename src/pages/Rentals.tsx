import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MapPin,
  Home,
  CheckCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Building,
  Key,
  SlidersHorizontal,
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const PROPERTY_TYPES = [
  'ALL',
  'Single Room',
  'PG',
  'Hostel',
  'Flat / Apartment',
  'Independent House',
];

const Rentals: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);
  const [popularPlaces, setPopularPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedPlaceId, setSelectedPlaceId] = useState('ALL');
  const [maxDistanceKm, setMaxDistanceKm] = useState('ALL');
  const [priceRange, setPriceRange] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedPlaceInfo, setSelectedPlaceInfo] = useState<any>(null);

  // Fetch popular places
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(`${API_URL}/rentals/popular-places`);
        setPopularPlaces(res.data);
      } catch (err) {
        console.error('Error fetching popular places:', err);
      }
    };
    fetchPlaces();
  }, []);

  // Fetch properties based on filters
  useEffect(() => {
    const fetchRentals = async () => {
      setLoading(true);
      try {
        const params: any = {};
        if (search.trim()) params.search = search.trim();
        if (selectedType !== 'ALL') params.propertyType = selectedType;
        if (selectedPlaceId !== 'ALL') params.popularPlaceId = selectedPlaceId;
        if (maxDistanceKm !== 'ALL') params.maxDistanceKm = maxDistanceKm;

        if (priceRange === 'under3k') params.maxRent = 3000;
        else if (priceRange === '3k-5k') {
          params.minRent = 3000;
          params.maxRent = 5000;
        } else if (priceRange === '5k-10k') {
          params.minRent = 5000;
          params.maxRent = 10000;
        } else if (priceRange === 'above10k') {
          params.minRent = 10000;
        }

        if (sortBy) params.sortBy = sortBy;

        const res = await axios.get(`${API_URL}/rentals`, { params });
        setProperties(res.data.properties || []);
        setSelectedPlaceInfo(res.data.selectedPlace);
      } catch (err) {
        console.error('Error fetching rentals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [search, selectedType, selectedPlaceId, maxDistanceKm, priceRange, sortBy]);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Hero Search Banner */}
      <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-black tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Gunupur Rental Directory
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Find Rooms, Hostels & Flats for Rent in Gunupur
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm font-medium leading-relaxed">
            Verified rental accommodations for GIET University students, faculty, and newcomers relocating to Gunupur, Odisha.
          </p>

          {/* Quick Search Input */}
          <div className="pt-3">
            <div className="relative bg-white rounded-2xl shadow-lg p-1.5 flex items-center">
              <Search className="w-5 h-5 text-slate-400 ml-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by locality, area or keyword (e.g. Gobriguda, GIET)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-3 pr-4 py-2 text-xs sm:text-sm text-slate-800 font-medium placeholder-slate-400 focus:outline-none bg-transparent"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="px-3 py-1 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Property Type Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {PROPERTY_TYPES.map((type) => {
          const isSelected = selectedType === type;
          return (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {type === 'ALL' ? 'All Types' : type}
            </button>
          );
        })}
      </div>

      {/* Landmark & Distance Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Landmark Selector */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Near Landmark:</span>
          </div>
          <select
            value={selectedPlaceId}
            onChange={(e) => {
              setSelectedPlaceId(e.target.value);
              if (e.target.value === 'ALL') setMaxDistanceKm('ALL');
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
          >
            <option value="ALL">Any Location in Gunupur</option>
            {popularPlaces.map((place) => (
              <option key={place._id} value={place._id}>
                📍 Near {place.name} ({place.category})
              </option>
            ))}
          </select>

          {/* Distance Radius (only if a landmark is selected) */}
          {selectedPlaceId !== 'ALL' && (
            <select
              value={maxDistanceKm}
              onChange={(e) => setMaxDistanceKm(e.target.value)}
              className="px-3 py-2 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-xs font-bold focus:outline-none"
            >
              <option value="ALL">Within Any Distance</option>
              <option value="1">Within ~1 km</option>
              <option value="2">Within ~2 km</option>
              <option value="5">Within ~5 km</option>
            </select>
          )}
        </div>

        {/* Price & Sort Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Budgets</option>
            <option value="under3k">Under ₹3,000</option>
            <option value="3k-5k">₹3,000 - ₹5,000</option>
            <option value="5k-10k">₹5,000 - ₹10,000</option>
            <option value="above10k">Above ₹10,000</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="newest">Recently Added</option>
            <option value="rent_asc">Price: Low to High</option>
            <option value="rent_desc">Price: High to Low</option>
            {selectedPlaceId !== 'ALL' && (
              <option value="nearest">Nearest to Landmark</option>
            )}
          </select>
        </div>
      </div>

      {/* Selected Landmark proximity note */}
      {selectedPlaceInfo && (
        <div className="px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-800 font-medium">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              Showing rental options near <strong>{selectedPlaceInfo.name}</strong> ({selectedPlaceInfo.locality}). Distances are approximate straight-line estimates.
            </span>
          </div>
          <button
            onClick={() => {
              setSelectedPlaceId('ALL');
              setMaxDistanceKm('ALL');
            }}
            className="text-[11px] text-emerald-700 hover:underline font-bold"
          >
            Reset
          </button>
        </div>
      )}

      {/* Properties Cards Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-6 space-y-3">
          <Home className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">No properties found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            We couldn't find any approved rentals matching your criteria. Try adjusting your landmark or price range filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((prop) => (
            <motion.div
              key={prop._id}
              whileHover={{ y: -3 }}
              onClick={() => navigate(`/rentals/${prop._id}`)}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Photo & Badges */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={prop.coverImage || '/placeholder-room.jpg'}
                    alt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e: any) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-black uppercase rounded-lg">
                      {prop.propertyType}
                    </span>
                    {prop.furnishingStatus && (
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-extrabold rounded-lg">
                        {prop.furnishingStatus}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl shadow-md">
                    <span className="text-sm font-black text-blue-900">
                      ₹{prop.monthlyRent.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold"> / month</span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-4 sm:p-5 space-y-2.5">
                  <h3 className="text-sm font-black text-slate-900 line-clamp-1 leading-snug">
                    {prop.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{prop.locality}</span>
                  </div>

                  {/* Distance from selected landmark if present */}
                  {prop.distanceKm !== null && prop.nearPlaceName && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-[10px] font-bold">
                      <span>📍 Approx. {prop.distanceKm} km from {prop.nearPlaceName}</span>
                    </div>
                  )}

                  {/* Amenities Chips */}
                  {prop.amenities && prop.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {prop.amenities.slice(0, 3).map((amenity: string) => (
                        <span
                          key={amenity}
                          className="px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-medium rounded-md"
                        >
                          {amenity}
                        </span>
                      ))}
                      {prop.amenities.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-bold self-center">
                          +{prop.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-blue-600 flex items-center gap-1">
                  View Full Details <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black rounded uppercase">
                  Available
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Owner Callout Card */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-blue-200">
            <Key className="w-3.5 h-3.5" /> Property Owners in Gunupur
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Have rooms, hostels or houses to rent in Gunupur?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Get your rental properties verified and listed on MyGunupur to reach thousands of GIET students and residents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/owner/login')}
            className="px-5 py-2.5 bg-white text-slate-900 font-black text-xs sm:text-sm rounded-xl hover:bg-blue-50 transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            Owner Portal Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rentals;
