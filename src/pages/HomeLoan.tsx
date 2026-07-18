import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Phone,
  Send,
  IndianRupee,
  Percent,
  Calendar,
  FileText,
  CheckCircle2,
  Home as HomeIcon
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const whatsappLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-7 h-7">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.488-.492-.67-.5h-.572c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .162 5.332.162 11.885c0 2.102.553 4.136 1.56 5.943L0 24l6.324-1.659a11.858 11.858 0 005.726 1.467c.003 0 0 0 .004 0 6.557 0 11.886-5.333 11.886-11.885 0-3.173-1.234-6.151-3.475-8.388"/>
</svg>`;

const HomeLoan: React.FC = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState<string>("1000000");
  const [interestRate, setInterestRate] = useState<string>("8.5");
  const [loanTenure, setLoanTenure] = useState<string>("20");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [banks, setBanks] = useState<any[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    loanPurpose: '',
    remarks: '',
    agreedToContact: false
  });

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get(`${API_URL}/banks`);
        setBanks(response.data);
      } catch (error) {
        console.error('Error fetching banks:', error);
      } finally {
        setLoadingBanks(false);
      }
    };

    fetchBanks();
  }, []);

  useEffect(() => {
    const principal = Number(loanAmount) || 0;
    const rate = (Number(interestRate) || 0) / 12 / 100;
    const tenure = (Number(loanTenure) || 0) * 12;

    if (principal > 0 && rate > 0 && tenure > 0) {
      const emiValue = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
      const totalPaymentValue = emiValue * tenure;
      const totalInterestValue = totalPaymentValue - principal;

      setEmi(Math.round(emiValue));
      setTotalInterest(Math.round(totalInterestValue));
      setTotalPayment(Math.round(totalPaymentValue));
    } else {
      setEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
    }
  }, [loanAmount, interestRate, loanTenure]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/loan-enquiries`, {
        ...formData,
        loanAmount: Number(loanAmount),
        interestRate: Number(interestRate),
        loanTenure: Number(loanTenure),
        emi,
        bankId: selectedBank
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Error submitting enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 pb-28">
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/85 backdrop-blur-2xl border-b border-white/30 shadow-sm"
        style={{ height: '72px' }}
      >
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20">
              <HomeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-blue-700 to-emerald-700 bg-clip-text text-transparent leading-tight">
                Home Loan
              </h1>
              <p className="text-xs font-semibold text-slate-500">
                Your Dream Home Awaits
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 space-y-7 pt-6">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Get Your Dream Home Today
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-6 max-w-2xl">
              Easy home loans with competitive interest rates, quick approval, and flexible repayment options
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:9437578310"
                className="flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-black rounded-2xl hover:shadow-xl transition-all"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a
                href="https://wa.me/919437578310"
                className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-black rounded-2xl hover:shadow-xl transition-all"
              >
                <div dangerouslySetInnerHTML={{ __html: whatsappLogo }} />
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
            <h3 className="text-xl font-black text-slate-800">
              Why Choose Us?
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Competitive Interest Rates', icon: Percent },
              { title: 'Quick Processing', icon: FileText },
              { title: 'Easy Documentation', icon: FileText },
              { title: 'Expert Guidance', icon: HomeIcon }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-black text-slate-800 mb-2">
                  {feature.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* EMI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-emerald-600 rounded-full"></div>
            <h3 className="text-xl font-black text-slate-800">
              EMI Calculator
            </h3>
          </div>
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 shadow-xl border border-slate-100">
            <div className="space-y-6">
              {/* Loan Amount */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <label className="font-bold text-slate-700 flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-blue-600" />
                    Loan Amount
                  </label>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-slate-600 font-semibold text-lg">₹</span>
                  <input
                    type="text"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="flex-1 text-2xl font-black bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent outline-none border-b-2 border-slate-200 focus:border-blue-600 transition-all"
                  />
                </div>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={Number(loanAmount) || 0}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-gradient-to-r from-blue-600 to-emerald-600"
                />
                <div className="flex justify-between mt-3 text-xs font-bold text-slate-400">
                  <span>₹1L</span>
                  <span>₹50L</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <label className="font-bold text-slate-700 flex items-center gap-2">
                    <Percent className="w-5 h-5 text-blue-600" />
                    Interest Rate (p.a)
                  </label>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="text"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="flex-1 text-2xl font-black bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent outline-none border-b-2 border-slate-200 focus:border-blue-600 transition-all"
                  />
                  <span className="text-slate-600 font-semibold text-lg">%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="15"
                  step="0.1"
                  value={Number(interestRate) || 0}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-gradient-to-r from-blue-600 to-emerald-600"
                />
                <div className="flex justify-between mt-3 text-xs font-bold text-slate-400">
                  <span>5%</span>
                  <span>10%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <label className="font-bold text-slate-700 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Loan Tenure
                  </label>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="text"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                    className="flex-1 text-2xl font-black bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent outline-none border-b-2 border-slate-200 focus:border-blue-600 transition-all"
                  />
                  <span className="text-slate-600 font-semibold text-lg">Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={Number(loanTenure) || 0}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-gradient-to-r from-blue-600 to-emerald-600"
                />
                <div className="flex justify-between mt-3 text-xs font-bold text-slate-400">
                  <span>1 Year</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl border border-blue-500/20">
                <div className="flex items-center gap-1.5 mb-1.5 text-blue-100">
                  <Calendar className="w-4 h-4" />
                  <p className="font-bold text-xs">Monthly EMI</p>
                </div>
                <p className="text-3xl font-black">₹{emi.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl border border-orange-500/20">
                <div className="flex items-center gap-1.5 mb-1.5 text-orange-100">
                  <Percent className="w-4 h-4" />
                  <p className="font-bold text-xs">Total Interest</p>
                </div>
                <p className="text-3xl font-black">₹{totalInterest.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-xl border border-emerald-500/20">
                <div className="flex items-center gap-1.5 mb-1.5 text-emerald-100">
                  <IndianRupee className="w-4 h-4" />
                  <p className="font-bold text-xs">Total Payment</p>
                </div>
                <p className="text-3xl font-black">₹{totalPayment.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Select Bank Partner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
            <h3 className="text-xl font-black text-slate-800">
              Select Bank Partner
            </h3>
          </div>
          {loadingBanks ? (
            <div className="text-center py-12 text-slate-500">Loading banks...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banks.map((bank, index) => {
                const isSelected = selectedBank === bank._id;
                return (
                  <motion.button
                    key={bank._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.08 }}
                    whileHover={{ y: -4 }}
                    type="button"
                    onClick={() => setSelectedBank(isSelected ? null : bank._id)}
                    className={`p-6 rounded-3xl border-2 transition-all duration-300 text-center relative flex flex-col items-center justify-center cursor-pointer w-full ${
                      isSelected
                        ? 'bg-gradient-to-br from-emerald-50/40 via-teal-50/20 to-emerald-50/5 border-emerald-400 shadow-xl shadow-emerald-500/5'
                        : 'bg-white border-slate-100 hover:border-slate-200 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {isSelected && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 bg-emerald-500 text-white rounded-full p-1 shadow-md z-10"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </motion.div>
                    )}

                    <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-inner">
                      {bank.image ? (
                        <img
                          src={bank.image}
                          alt={bank.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const fallback = (e.target as HTMLImageElement).parentElement?.querySelector('.bank-fallback');
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <span className={`text-2xl ${bank.image ? 'hidden' : ''} bank-fallback`}>🏦</span>
                    </div>
                    <h4 className="text-lg font-black text-slate-800 mb-2">
                      {bank.name}
                    </h4>
                    {bank.ifsc && (
                      <p className="text-sm text-slate-600 mb-2">
                        IFSC: {bank.ifsc}
                      </p>
                    )}
                    {bank.services && bank.services.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center mt-2">
                        {bank.services.slice(0, 4).map((service: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-xs font-semibold border border-slate-100"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Submit Enquiry Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
            <h3 className="text-xl font-black text-slate-800">
              Submit Enquiry
            </h3>
          </div>
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 shadow-xl border border-slate-100">
            {submitSuccess ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-black text-slate-800 mb-2">
                  Enquiry Submitted Successfully!
                </h4>
                <p className="text-slate-600">Our team will contact you shortly</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3.5 bg-white border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-slate-800 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      placeholder="Enter your mobile number"
                      value={formData.mobile}
                      onChange={(e) =>
                        setFormData({ ...formData, mobile: e.target.value })
                      }
                      className="w-full px-4 py-3.5 bg-white border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-slate-800 font-semibold"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3.5 bg-white border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-slate-800 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Loan Purpose
                    </label>
                    <select
                      value={formData.loanPurpose}
                      onChange={(e) =>
                        setFormData({ ...formData, loanPurpose: e.target.value })
                      }
                      className="w-full px-4 py-3.5 bg-white border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-slate-800 font-semibold"
                    >
                      <option value="">Select Purpose</option>
                      <option value="Home Purchase">Home Purchase</option>
                      <option value="Home Construction">Home Construction</option>
                      <option value="Home Renovation">Home Renovation</option>
                      <option value="Balance Transfer">Balance Transfer</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Address
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-4 py-3.5 bg-white border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-slate-800 font-semibold resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Remarks (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Any additional remarks"
                    value={formData.remarks}
                    onChange={(e) =>
                      setFormData({ ...formData, remarks: e.target.value })
                    }
                    className="w-full px-4 py-3.5 bg-white border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-slate-800 font-semibold resize-none"
                  />
                </div>
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="agree-loan"
                    required
                    checked={formData.agreedToContact}
                    onChange={(e) =>
                      setFormData({ ...formData, agreedToContact: e.target.checked })
                    }
                    className="w-5 h-5 accent-blue-600"
                  />
                  <label
                    htmlFor="agree-loan"
                    className="text-sm text-slate-600 font-semibold"
                  >
                    I agree to be contacted by our team
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      Submit Enquiry Now
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-28 right-5 flex flex-col gap-4 z-40">
        <motion.a
          href="https://wa.me/919437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-[#25D366] rounded-3xl shadow-2xl shadow-[#25D366]/40 flex items-center justify-center hover:shadow-[#25D366]/60 transition-all duration-300"
          dangerouslySetInnerHTML={{ __html: whatsappLogo }}
        />
        <motion.a
          href="tel:9437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: "spring" }}
          whileHover={{ scale: 1.15, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-2xl shadow-blue-500/40 flex items-center justify-center hover:shadow-blue-500/60 transition-all duration-300"
        >
          <Phone className="w-8 h-8 text-white" />
        </motion.a>
      </div>


    </div>
  );
};

export default HomeLoan;
