import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  IndianRupee,
  Calendar,
  Home
} from 'lucide-react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminLoanEnquiries: React.FC = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchEnquiries = async () => {
      try {
        const response = await axios.get(`${API_URL}/loan-enquiries`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEnquiries(response.data);
      } catch (error) {
        console.error('Error fetching loan enquiries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, [navigate]);

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-4 pt-6">
        {loading ? (
          <div className="text-center py-20 text-slate-500 text-lg">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-100"
          >
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Loan Enquiries Yet</h3>
            <p className="text-slate-500">When users submit loan enquiries, they'll appear here</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {enquiries.map((enquiry, index) => (
              <motion.div
                key={enquiry._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{enquiry.name}</h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(enquiry.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-slate-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-semibold">Mobile</span>
                    </div>
                    <a href={`tel:${enquiry.mobile}`} className="text-lg font-bold text-slate-800 hover:text-blue-600">
                      {enquiry.mobile}
                    </a>
                  </div>
                  {enquiry.email && (
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2 text-slate-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm font-semibold">Email</span>
                      </div>
                      <a href={`mailto:${enquiry.email}`} className="text-lg font-bold text-slate-800 hover:text-blue-600">
                        {enquiry.email}
                      </a>
                    </div>
                  )}
                  {enquiry.loanAmount && (
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2 text-slate-600">
                        <IndianRupee className="w-4 h-4" />
                        <span className="text-sm font-semibold">Loan Amount</span>
                      </div>
                      <p className="text-lg font-bold text-slate-800">₹{enquiry.loanAmount.toLocaleString()}</p>
                    </div>
                  )}
                  {enquiry.emi && (
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2 text-slate-600">
                        <IndianRupee className="w-4 h-4" />
                        <span className="text-sm font-semibold">Monthly EMI</span>
                      </div>
                      <p className="text-lg font-bold text-slate-800">₹{enquiry.emi.toLocaleString()}</p>
                    </div>
                  )}
                </div>

                {enquiry.address && (
                  <div className="bg-slate-50 p-4 rounded-xl mb-4">
                    <div className="flex items-center gap-2 mb-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-semibold">Address</span>
                    </div>
                    <p className="text-slate-800">{enquiry.address}</p>
                  </div>
                )}

                {enquiry.remarks && (
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-2 text-slate-600">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-semibold">Remarks</span>
                    </div>
                    <p className="text-slate-800">{enquiry.remarks}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
  );;
};

export default AdminLoanEnquiries;
