import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  X,
  Check,
  AlertCircle,
  Home,
  MapPin,
  IndianRupee,
  Shield,
  Phone,
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AVAILABLE_AMENITIES = [
  'Wi-Fi',
  '24x7 Water Supply',
  'Electricity (Separate Meter)',
  'Attached Bathroom',
  'Kitchen Access',
  'Bed & Mattress',
  'Study Table & Chair',
  'Wardrobe / Cupboard',
  'Bike Parking',
  'Car Parking',
  'Laundry / Washing Machine',
  'CCTV / Security',
  'Power Backup / Inverter',
  'RO Drinking Water',
  'Geyser / Hot Water',
  'Air Conditioner (AC)',
  'Ceiling Fan',
  'Balcony / Terrace',
  'Daily Room Cleaning',
  'Mess / Food Facility Nearby',
];

const PROPERTY_TYPES = [
  'Single Room',
  'PG',
  'Hostel',
  'Flat / Apartment',
  'Independent House',
  'Other',
];

const GUNUPUR_LOCALITIES = [
  'Gobriguda (Near GIET)',
  'Main Road',
  'Station Road',
  'Hospital Road',
  'Daily Bazar / Market',
  'Old Town',
  'Marathiguda',
  'Gopabandhu Nagar',
  'College Road',
  'Jagannath Temple Road',
  'Other',
];

const OwnerPropertyForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    propertyType: 'Single Room',
    shortDescription: '',
    description: '',
    locality: 'Gobriguda (Near GIET)',
    customLocality: '',
    address: '',
    latitude: '',
    longitude: '',
    googleMap: '',
    monthlyRent: '',
    securityDeposit: '0',
    advanceAmount: '0',
    rentNegotiable: false,
    availableFrom: new Date().toISOString().split('T')[0],
    furnishingStatus: 'Furnished',
    bedrooms: 1,
    bathrooms: 1,
    preferredTenant: 'Students',
    minimumStay: '1 Month',
    amenities: ['Wi-Fi', '24x7 Water Supply', 'Attached Bathroom'] as string[],
    images: [] as string[],
    coverImage: '',
    contactPhone: '',
    contactWhatsapp: '',
  });

  // Fetch initial profile & property if editing
  useEffect(() => {
    const token = localStorage.getItem('ownerToken');
    if (!token) {
      navigate('/owner/login');
      return;
    }

    const init = async () => {
      try {
        const ownerRes = await axios.get(`${API_URL}/owner/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const owner = ownerRes.data;

        if (isEditing) {
          const propRes = await axios.get(`${API_URL}/owner/properties/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const prop = propRes.data;

          const isCustomLoc = !GUNUPUR_LOCALITIES.includes(prop.locality);
          setFormData({
            title: prop.title || '',
            propertyType: prop.propertyType || 'Single Room',
            shortDescription: prop.shortDescription || '',
            description: prop.description || '',
            locality: isCustomLoc ? 'Other' : prop.locality,
            customLocality: isCustomLoc ? prop.locality : '',
            address: prop.address || '',
            latitude: prop.latitude ? String(prop.latitude) : '',
            longitude: prop.longitude ? String(prop.longitude) : '',
            googleMap: prop.googleMap || '',
            monthlyRent: String(prop.monthlyRent || ''),
            securityDeposit: String(prop.securityDeposit || '0'),
            advanceAmount: String(prop.advanceAmount || '0'),
            rentNegotiable: Boolean(prop.rentNegotiable),
            availableFrom: prop.availableFrom
              ? new Date(prop.availableFrom).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0],
            furnishingStatus: prop.furnishingStatus || 'Furnished',
            bedrooms: prop.bedrooms || 1,
            bathrooms: prop.bathrooms || 1,
            preferredTenant: prop.preferredTenant || 'All',
            minimumStay: prop.minimumStay || '1 Month',
            amenities: prop.amenities || [],
            images: prop.images || [],
            coverImage: prop.coverImage || '',
            contactPhone: prop.contactPhone || owner.phone || '',
            contactWhatsapp: prop.contactWhatsapp || owner.whatsappNumber || '',
          });
        } else {
          // Pre-fill owner contact details
          setFormData((prev) => ({
            ...prev,
            contactPhone: owner.phone || '',
            contactWhatsapp: owner.whatsappNumber || owner.phone || '',
          }));
        }
      } catch (err: any) {
        console.error('Error loading form data:', err);
        setError('Could not load property details.');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [id, isEditing, navigate]);

  // Image Upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 10) {
      alert('You can upload up to 10 images per property.');
      return;
    }

    setUploadingImage(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        const uploadData = new FormData();
        uploadData.append('image', file);
        const res = await axios.post(`${API_URL}/upload`, uploadData);
        if (res.data?.url) {
          uploadedUrls.push(res.data.url);
        }
      }

      setFormData((prev) => {
        const newImages = [...prev.images, ...uploadedUrls];
        return {
          ...prev,
          images: newImages,
          coverImage: prev.coverImage || newImages[0] || '',
        };
      });
    } catch (err: any) {
      console.error('Image upload failed:', err);
      alert('Failed to upload one or more images. Please check file format and size.');
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = (urlToRemove: string) => {
    setFormData((prev) => {
      const remaining = prev.images.filter((img) => img !== urlToRemove);
      const newCover = prev.coverImage === urlToRemove ? remaining[0] || '' : prev.coverImage;
      return {
        ...prev,
        images: remaining,
        coverImage: newCover,
      };
    });
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleSubmit = async (submitForReview: boolean) => {
    setError('');

    const finalLocality =
      formData.locality === 'Other' ? formData.customLocality.trim() : formData.locality;

    if (!formData.title.trim()) {
      setError('Property title is required.');
      return;
    }
    if (!formData.monthlyRent || Number(formData.monthlyRent) <= 0) {
      setError('Please enter a valid monthly rent amount.');
      return;
    }
    if (!finalLocality) {
      setError('Please select or specify the locality in Gunupur.');
      return;
    }
    if (!formData.address.trim()) {
      setError('Property address is required.');
      return;
    }
    if (!formData.description.trim()) {
      setError('Detailed description is required.');
      return;
    }
    if (!formData.contactPhone.trim()) {
      setError('Contact phone number is required.');
      return;
    }

    setSaving(true);
    const token = localStorage.getItem('ownerToken');

    const payload = {
      ...formData,
      locality: finalLocality,
      monthlyRent: Number(formData.monthlyRent),
      securityDeposit: Number(formData.securityDeposit || 0),
      advanceAmount: Number(formData.advanceAmount || 0),
      bedrooms: Number(formData.bedrooms || 1),
      bathrooms: Number(formData.bathrooms || 1),
      latitude: formData.latitude ? Number(formData.latitude) : null,
      longitude: formData.longitude ? Number(formData.longitude) : null,
      submitForReview,
    };

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/owner/properties/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${API_URL}/owner/properties`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate('/owner/properties');
    } catch (err: any) {
      console.error('Error saving property:', err);
      setError(err.response?.data?.message || 'Error saving property. Please check the form.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isFlatOrHouse =
    formData.propertyType === 'Flat / Apartment' || formData.propertyType === 'Independent House';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/owner/properties')}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl font-black text-slate-900">
            {isEditing ? 'Edit Rental Property' : 'Add New Rental Property'}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Fill in the details about your room, PG, hostel or flat in Gunupur
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-2xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form Cards */}
      <div className="space-y-5">
        {/* Section 1: Basic Information */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Home className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-black text-slate-800">Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Property Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Spacious Single Room for Students near GIET"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Property Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Furnishing Status
              </label>
              <select
                value={formData.furnishingStatus}
                onChange={(e) => setFormData({ ...formData, furnishingStatus: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
              >
                <option value="Furnished">Fully Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Short Description (Highlights)
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="e.g. 5 mins walk to GIET gate, 24h water, quiet study atmosphere"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Detailed Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe room details, surroundings, restrictions, food options, electricity billing rules, etc."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Location & Address */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-black text-slate-800">Location in Gunupur</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Locality / Area <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
              >
                {GUNUPUR_LOCALITIES.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {formData.locality === 'Other' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Specify Locality Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.customLocality}
                  onChange={(e) => setFormData({ ...formData, customLocality: e.target.value })}
                  placeholder="Enter locality / street name"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
                />
              </div>
            )}

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Address / Landmarks <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="House No., Street Name, Near landmark, Gunupur, Odisha 765022"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Google Map Link (Optional)
              </label>
              <input
                type="text"
                value={formData.googleMap}
                onChange={(e) => setFormData({ ...formData, googleMap: e.target.value })}
                placeholder="https://maps.app.goo.gl/..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Latitude (Optional)
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  placeholder="e.g. 19.0560"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Longitude (Optional)
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  placeholder="e.g. 83.8220"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Rental Details & Pricing */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <IndianRupee className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-black text-slate-800">Rental Details & Pricing</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Monthly Rent (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.monthlyRent}
                onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                placeholder="e.g. 3500"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Security Deposit (₹)
              </label>
              <input
                type="number"
                min="0"
                value={formData.securityDeposit}
                onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                placeholder="e.g. 2000"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Advance Amount (₹)
              </label>
              <input
                type="number"
                min="0"
                value={formData.advanceAmount}
                onChange={(e) => setFormData({ ...formData, advanceAmount: e.target.value })}
                placeholder="e.g. 3500"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Available From
              </label>
              <input
                type="date"
                value={formData.availableFrom}
                onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preferred Tenant
              </label>
              <select
                value={formData.preferredTenant}
                onChange={(e) => setFormData({ ...formData, preferredTenant: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
              >
                <option value="All">Anyone (All Welcome)</option>
                <option value="Students">GIET / College Students</option>
                <option value="Bachelor (Male)">Bachelor (Boys)</option>
                <option value="Bachelor (Female)">Bachelor (Girls)</option>
                <option value="Family">Family</option>
                <option value="Working Professionals">Working Professionals</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Minimum Stay Period
              </label>
              <select
                value={formData.minimumStay}
                onChange={(e) => setFormData({ ...formData, minimumStay: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
              >
                <option value="No Minimum">No Minimum</option>
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year / Academic Session</option>
              </select>
            </div>

            {/* Conditional fields for flats and houses */}
            {isFlatOrHouse && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bedrooms (BHK)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
                  />
                </div>
              </>
            )}

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="rentNegotiable"
                checked={formData.rentNegotiable}
                onChange={(e) => setFormData({ ...formData, rentNegotiable: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="rentNegotiable" className="text-xs font-bold text-slate-700 cursor-pointer">
                Rent is negotiable
              </label>
            </div>
          </div>
        </div>

        {/* Section 4: Amenities Checklist */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Shield className="w-4 h-4 text-purple-600" />
            <h2 className="text-sm font-black text-slate-800">Amenities & Facilities</h2>
          </div>
          <p className="text-xs text-slate-500">
            Select only the facilities actually available at this property:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {AVAILABLE_AMENITIES.map((amenity) => {
              const selected = formData.amenities.includes(amenity);
              return (
                <button
                  type="button"
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                    selected
                      ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                      selected ? 'bg-blue-600 text-white' : 'border border-slate-300 bg-white'
                    }`}
                  >
                    {selected && <Check className="w-3 h-3" />}
                  </div>
                  <span className="truncate">{amenity}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 5: Property Images */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-sky-600" />
              <h2 className="text-sm font-black text-slate-800">Photographs</h2>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              {formData.images.length}/10 images
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Clear photographs of the room, bed, bathroom, and exterior increase student inquiries by 3x.
          </p>

          {/* Upload input */}
          <div>
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl cursor-pointer bg-slate-50/70 hover:bg-blue-50/20 transition-all">
              <Upload className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-xs font-bold text-slate-700">
                {uploadingImage ? 'Uploading photographs...' : 'Click to Upload Photos'}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, JPEG up to 10MB</span>
              <input
                type="file"
                multiple
                accept="image/*"
                disabled={uploadingImage}
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Uploaded thumbnails */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
              {formData.images.map((imgUrl, i) => {
                const isCover = formData.coverImage === imgUrl;
                return (
                  <div
                    key={i}
                    className="relative group rounded-xl overflow-hidden aspect-video bg-slate-100 border border-slate-200 shadow-sm"
                  >
                    <img src={imgUrl} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(imgUrl)}
                      className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-red-600 text-white rounded-full transition-colors"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, coverImage: imgUrl })}
                      className={`absolute bottom-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold transition-all ${
                        isCover ? 'bg-amber-500 text-white' : 'bg-black/60 text-white hover:bg-black/80'
                      }`}
                    >
                      {isCover ? '★ Cover' : 'Set Cover'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Section 6: Public Contact Info */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Phone className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-black text-slate-800">Public Contact Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone Number for Calls <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                placeholder="Owner phone number"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                WhatsApp Number for Inquiries
              </label>
              <input
                type="tel"
                value={formData.contactWhatsapp}
                onChange={(e) => setFormData({ ...formData, contactWhatsapp: e.target.value })}
                placeholder="WhatsApp number (defaults to phone)"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/owner/properties')}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSubmit(false)}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all disabled:opacity-50"
            >
              Save as Draft
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSubmit(true)}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {saving ? 'Submitting...' : 'Submit for Admin Review'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerPropertyForm;
