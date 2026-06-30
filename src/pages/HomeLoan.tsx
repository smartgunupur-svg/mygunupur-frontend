import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  ArrowLeft,
  Calculator,
  Phone,
  Mail,
  MapPin,
  Send,
  IndianRupee,
  Percent,
  Calendar,
  FileText,
  CheckCircle2,
  Banknote,
  Building2,
  ShieldCheck,
  Star
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const banks = [
  {
    id: 1,
    name: 'Indian Bank',
    logo: '🏦',
    color: 'from-blue-600 to-blue-700',
    bg: 'bg-blue-50',
    interestRate: '8.50',
    processingFee: '0.50',
    maxTenure: '30 Years'
  },
  {
    id: 2,
    name: 'UCO Bank',
    logo: '🏛️',
    color: 'from-orange-500 to-red-600',
    bg: 'bg-orange-50',
    interestRate: '8.75',
    processingFee: '0.35',
    maxTenure: '30 Years'
  }
];

const HomeLoan: React.FC = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [selectedBank, setSelectedBank] = useState<number | null>(null);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '9437578310',
    email: 'smartgunupur@gmail.com',
    address: '',
    loanPurpose: '',
    remarks: '',
    agreedToContact: false
  });

  useEffect(() => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const tenure = loanTenure * 12;

    const emiValue = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);
    const totalPaymentValue = emiValue * tenure;
    const totalInterestValue = totalPaymentValue - principal;

    setEmi(Math.round(emiValue));
    setTotalInterest(Math.round(totalInterestValue));
    setTotalPayment(Math.round(totalPaymentValue));
  }, [loanAmount, interestRate, loanTenure]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/loan-enquiries`, {
        ...formData,
        loanAmount,
        interestRate,
        loanTenure,
        emi
      });
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: '',
          mobile: '9437578310',
          email: 'smartgunupur@gmail.com',
          address: '',
          loanPurpose: '',
          remarks: '',
          agreedToContact: false
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Error submitting enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectBank = (bankId: number) => {
    setSelectedBank(bankId);
    const bank = banks.find(b => b.id === bankId);
    if (bank) {
      setInterestRate(parseFloat(bank.interestRate));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 glass bg-white/90 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-3 hover:bg-slate-100 rounded-2xl transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Home Loan</h1>
              <p className="text-sm text-slate-500 font-medium">Calculate & Apply Now</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 space-y-6 pt-6">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-semibold">
                  Best Interest Rates
                </div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  4.9 Rating
                </div>
              </div>
              <h2 className="text-4xl font-bold mb-3">Your Dream Home<br />Awaits You</h2>
              <p className="text-blue-100 text-lg mb-6">Calculate your EMI and get instant home loan approval with the best banks in India</p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:9437578310" className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 font-bold rounded-2xl hover:shadow-xl transition-all">
                  <Phone className="w-5 h-5" />
                  Call: 9437578310
                </a>
                <a href="mailto:smartgunupur@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur border border-white/30 font-bold rounded-2xl hover:bg-white/30 transition-all">
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="text-9xl animate-bounce">🏠</div>
            </div>
          </div>
        </motion.div>

        {/* Bank Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-800">Available Banks</h3>
            <p className="text-sm text-slate-500 font-medium">Select to auto-fill interest rate</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {banks.map((bank, index) => (
              <motion.button
                key={bank.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => selectBank(bank.id)}
                className={cn(
                  "text-left p-6 rounded-3xl border-2 transition-all",
                  selectedBank === bank.id
                    ? "border-blue-500 shadow-xl"
                    : "border-slate-100 hover:border-slate-200 shadow-lg",
                  "bg-white"
                )}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center shadow-lg", bank.color)}>
                      <span className="text-3xl">{bank.logo}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xl">{bank.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-slate-500 font-medium">4.9 (2.5k+)</span>
                      </div>
                    </div>
                  </div>
                  {selectedBank === bank.id && (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Interest</p>
                    <p className="text-2xl font-black text-slate-800">{bank.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Processing Fee</p>
                    <p className="text-2xl font-black text-slate-800">{bank.processingFee}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Max Tenure</p>
                    <p className="text-2xl font-black text-slate-800">{bank.maxTenure}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* EMI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Calculator className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">EMI Calculator</h3>
              <p className="text-sm text-slate-500 font-medium">Calculate your monthly EMI instantly</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Loan Amount */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <label className="font-bold text-slate-700 flex items-center gap-2 text-lg">
                  <IndianRupee className="w-5 h-5 text-blue-600" />
                  Loan Amount
                </label>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-slate-500 font-medium">₹</span>
                  <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    {loanAmount.toLocaleString()}
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="100000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-gradient-to-r from-blue-600 to-green-600"
              />
              <div className="flex justify-between mt-3 text-sm font-semibold text-slate-400">
                <span>₹1L</span>
                <span>₹50L</span>
                <span>₹1Cr</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <label className="font-bold text-slate-700 flex items-center gap-2 text-lg">
                  <Percent className="w-5 h-5 text-blue-600" />
                  Interest Rate (p.a)
                </label>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    {interestRate}%
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-gradient-to-r from-blue-600 to-green-600"
              />
              <div className="flex justify-between mt-3 text-sm font-semibold text-slate-400">
                <span>5%</span>
                <span>10%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <label className="font-bold text-slate-700 flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Loan Tenure
                </label>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    {loanTenure} Years
                  </span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={loanTenure}
                onChange={(e) => setLoanTenure(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-gradient-to-r from-blue-600 to-green-600"
              />
              <div className="flex justify-between mt-3 text-sm font-semibold text-slate-400">
                <span>1 Year</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2 text-blue-100">
              <Calendar className="w-5 h-5" />
              <p className="font-semibold">Monthly EMI</p>
            </div>
            <p className="text-4xl font-black">₹{emi.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl border border-orange-500/20">
            <div className="flex items-center gap-2 mb-2 text-orange-100">
              <Percent className="w-5 h-5" />
              <p className="font-semibold">Total Interest</p>
            </div>
            <p className="text-4xl font-black">₹{totalInterest.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-6 text-white shadow-xl border border-green-500/20">
            <div className="flex items-center gap-2 mb-2 text-green-100">
              <Banknote className="w-5 h-5" />
              <p className="font-semibold">Total Payment</p>
            </div>
            <p className="text-4xl font-black">₹{totalPayment.toLocaleString()}</p>
          </div>
        </motion.div>

        {/* Enquiry Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">Apply for Home Loan</h3>
              <p className="text-sm text-slate-500 font-medium">Our team will contact you within 24 hours</p>
            </div>
          </div>

          {submitSuccess ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Enquiry Submitted Successfully!</h3>
              <p className="text-slate-500">Our team will contact you shortly</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    placeholder="9437578310"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="smartgunupur@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Loan Purpose *</label>
                  <select
                    name="loanPurpose"
                    required
                    value={formData.loanPurpose}
                    onChange={(e) => setFormData({ ...formData, loanPurpose: e.target.value })}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium"
                  >
                    <option value="">Select Purpose</option>
                    <option value="new">New Home Purchase</option>
                    <option value="construction">Home Construction</option>
                    <option value="renovation">Home Renovation</option>
                    <option value="transfer">Loan Transfer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Address (Optional)</label>
                <textarea
                  name="address"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Additional Remarks</label>
                <textarea
                  name="remarks"
                  placeholder="Any additional details..."
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  rows={3}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="agree"
                  required
                  checked={formData.agreedToContact}
                  onChange={(e) => setFormData({ ...formData, agreedToContact: e.target.checked })}
                  className="w-5 h-5 accent-blue-600"
                />
                <label htmlFor="agree" className="text-sm text-slate-600 font-medium">
                  I agree to be contacted by our team
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Enquiry Now
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2 text-lg">Call Us</h4>
            <a href="tel:9437578310" className="text-2xl font-black text-blue-600 block mb-1">9437578310</a>
            <p className="text-sm text-slate-500 font-medium">Available 24×7</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2 text-lg">Email Us</h4>
            <a href="mailto:smartgunupur@gmail.com" className="text-lg font-bold text-green-600 block mb-1">smartgunupur@gmail.com</a>
            <p className="text-sm text-slate-500 font-medium">Reply within 2 hours</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <MapPin className="w-8 h-8 text-yellow-600" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2 text-lg">Visit Us</h4>
            <p className="text-sm text-slate-500 font-medium">Gunupur, Rayagada, Odisha</p>
          </div>
        </motion.div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-28 right-4 flex flex-col gap-3 z-40">
        <motion.a
          href="https://wa.me/919437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-green-500 rounded-2xl shadow-xl flex items-center justify-center"
        >
          <span className="text-white text-3xl">💬</span>
        </motion.a>
        <motion.a
          href="tel:9437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-blue-600 rounded-2xl shadow-xl flex items-center justify-center"
        >
          <Phone className="w-8 h-8 text-white" />
        </motion.a>
      </div>
    </div>
  );
};

export default HomeLoan;
