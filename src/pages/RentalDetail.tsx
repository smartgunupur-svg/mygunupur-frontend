import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  IndianRupee,
  Home,
  CheckCircle2,
  Phone,
  MessageCircle,
  Calendar,
  Users,
  Compass,
  Share2,
  ExternalLink,
  ShieldCheck,
  Check,
  AlertCircle,
  Eye,
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const RentalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`${API_URL}/rentals/${id}`);
        setProperty(res.data);
      } catch (err: any) {
        console.error('Error fetching property detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title || 'Rental in Gunupur',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-4">
        <Home className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-base font-bold text-slate-800">Property Listing Not Found</h2>
        <p className="text-xs text-slate-500">
          This listing may have been rented, updated, or is awaiting administrative review.
        </p>
        <button
          onClick={() => navigate('/rentals')}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          Back to All Rentals
        </button>
      </div>
    );
  }

  const photos =
    property.images && property.images.length > 0
      ? property.images
      : [property.coverImage || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'];

  // Clean WhatsApp number
  const cleanWhatsapp = (property.contactWhatsapp || property.contactPhone || '').replace(
    /[^0-9]/g,
    ''
  );
  const whatsappUrl = `https://wa.me/91${cleanWhatsapp}?text=${encodeURIComponent(
    `Hello! I saw your listing "${property.title}" on MyGunupur. Is it currently available for rent?`
  )}`;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/rentals')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Rentals
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm"
        >
          <Share2 className="w-3.5 h-3.5" />
          {copied ? 'Link Copied!' : 'Share'}
        </button>
      </div>

      {/* Main Grid: Gallery & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Gallery & Description */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Gallery */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm space-y-2 p-2">
            <div className="relative aspect-[16/10] bg-slate-900 rounded-2xl overflow-hidden">
              <img
                src={photos[selectedPhotoIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-white text-xs font-black uppercase rounded-lg">
                  {property.propertyType}
                </span>
                <span className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-extrabold rounded-lg">
                  {property.availability}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {photos.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto p-1 scrollbar-none">
                {photos.map((url: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedPhotoIndex === idx
                        ? 'border-blue-600 scale-95'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title, Locality & Pricing Header */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="space-y-1.5">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{property.locality}, Gunupur</span>
              </div>
            </div>

            {/* Rent & Deposit Box */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  Monthly Rent
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-2xl font-black text-blue-900">
                    ₹{property.monthlyRent.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">/ month</span>
                </div>
                {property.rentNegotiable && (
                  <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md mt-1">
                    Rent Negotiable
                  </span>
                )}
              </div>

              <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-blue-200/60 pt-3 sm:pt-0 sm:pl-6 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Security Deposit</span>
                  <p className="text-sm font-black text-slate-800">
                    {property.securityDeposit > 0
                      ? `₹${property.securityDeposit.toLocaleString('en-IN')}`
                      : 'None'}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Advance Amount</span>
                  <p className="text-sm font-black text-slate-800">
                    {property.advanceAmount > 0
                      ? `₹${property.advanceAmount.toLocaleString('en-IN')}`
                      : 'None'}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Furnishing</span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{property.furnishingStatus}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Preferred Tenant</span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{property.preferredTenant}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Minimum Stay</span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{property.minimumStay}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Available From</span>
                <p className="text-xs font-bold text-slate-800 mt-0.5">
                  {new Date(property.availableFrom).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-black text-slate-900">About this Property</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities & Facilities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-900">Amenities & Facilities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity: string) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-semibold text-slate-700"
                  >
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Landmark Proximity Highlights */}
          {property.nearbyLandmarks && property.nearbyLandmarks.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-black text-slate-900">Approximate Distance to Landmarks</h3>
              </div>
              <p className="text-xs text-slate-500">
                Straight-line aerial distance calculated from verified Gunupur landmark coordinates:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {property.nearbyLandmarks.map((lm: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs"
                  >
                    <span className="font-bold text-slate-800">{lm.name}</span>
                    <span className="font-mono font-black text-blue-600">~{lm.distanceKm} km</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Contact & Address Card */}
        <div className="space-y-5 lg:sticky lg:top-24">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xs font-black text-slate-900">Verified Rental Listing</h3>
                <p className="text-[10px] text-slate-500 font-medium">Approved by MyGunupur Administration</p>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="space-y-2.5">
              <a
                href={`tel:${property.contactPhone}`}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" /> Call Owner Directly
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs shadow-md shadow-emerald-500/20 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Inquiry
              </a>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 leading-relaxed">
              Contact <strong>{property.ownerName}</strong> directly for room visits, rent confirmation, and booking.
            </div>

            {/* Address */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Full Address
              </span>
              <p className="font-medium text-slate-700 leading-relaxed">{property.address}</p>
              {property.googleMap && (
                <a
                  href={property.googleMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline pt-1"
                >
                  Open in Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalDetail;
