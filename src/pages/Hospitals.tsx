import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  HeartPulse,
  Phone,
  MapPin,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Hospitals: React.FC = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get(`${API_URL}/hospitals`);
        setHospitals(res.data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        setHospitals([
          { _id: 1, name: "District Headquarters Hospital", phone: "9437578310", address: "Hospital Road, Gunupur" },
          { _id: 2, name: "Sai Nursing Home", phone: "9876543210", address: "Near Bus Stand, Gunupur" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 pb-24">
      {/* Header */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-white/30 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center gap-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Hospitals</h1>
            <p className="text-xs font-semibold text-slate-500">Medical facilities in Gunupur</p>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 space-y-6 pt-6">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-pink-600 to-rose-600 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <HeartPulse className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-black mb-3">Healthcare Facilities</h2>
              <p className="text-pink-100 text-lg">Find all hospitals and clinics in Gunupur</p>
            </div>
          </div>
        </motion.div>

        {/* Hospitals List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-black text-slate-800 mb-6">Nearby Hospitals</h3>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 animate-pulse">
                  <div className="h-6 bg-slate-200 rounded w-1/2 mb-3"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {hospitals.map((hospital, index) => (
                <motion.div
                  key={hospital._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-black text-slate-800 text-lg">{hospital.name}</h4>
                      {hospital.departments && hospital.departments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {hospital.departments.map((dept: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-semibold rounded-full">
                              {dept}
                            </span>
                          ))}
                        </div>
                      )}
                      {hospital.address && (
                        <div className="flex items-center gap-2 mt-3 text-slate-600 text-sm font-semibold">
                          <MapPin className="w-4 h-4" />
                          {hospital.address}
                        </div>
                      )}
                    </div>
                    <a
                      href={`tel:${hospital.phone}`}
                      className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <Phone className="w-5 h-5" />
                      Call
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Hospitals;
