import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calculator, 
  Phone, 
  Send, 
  IndianRupee, 
  Percent, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Banknote, 
  Star,
  MessageCircle
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
    bg: 'bg-blue-50'
  },
  {
    id: 2,
    name: 'UCO Bank',
    logo: '🏛️',
    color: 'from-orange-500 to-red-600',
    bg: 'bg-orange-50'
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
    mobile: '',
    email: '',
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
          mobile: '',
          email: '',
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 pb-32">
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50"
        style={{ height: '72px' }}
      >
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2.5 hover:bg-slate-100 rounded-2xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent leading-tight">Home Loan</h1>
            <p className="text-xs text-slate-500 font-medium leading-tight">Calculate & Apply Now</p>
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 space-y-5 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          </div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-semibold">
                  Best Interest Rates
                </div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  4.9 Rating
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Your Dream Home<br />Awaits You</h2>
              <p className="text-blue-100 text-base mb-4">Calculate your EMI and get instant home loan approval</p>
              <div className="flex flex-wrap gap-2">
                <a href="tel:9437578310" className="flex items-center gap-2 px-6 py-2.5 bg-white text-indigo-700 font-bold rounded-2xl hover:shadow-xl transition-all">
                  <Phone className="w-4 h-4" />
                  Call: 9437578310
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="text-7xl animate-bounce">🏠</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-slate-800">Available Banks</h3>
            <p className="text-xs text-slate-500 font-medium">Select to auto-fill interest rate</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {banks.map((bank, index) => (
              <motion.button
                key={bank.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -2 }}
                onClick={() => selectBank(bank.id)}
                className={cn(
                  "text-center p-6 rounded-2xl border-2 transition-all",
                  selectedBank === bank.id
                    ? "border-blue-500 shadow-xl"
                    : "border-slate-100 hover:border-slate-200 shadow-lg",
                  "bg-white"
                )}
              >
                <span className="text-4xl mb-2 block">{bank.logo}</span>
                <h4 className="font-bold text-slate-800">{bank.name}</h4>
                {selectedBank === bank.id && (
                  <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-blue-100 rounded-full text-blue-700 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Selected
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-5 shadow-xl border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">EMI Calculator</h3>
              <p className="text-xs text-slate-500 font-medium">Calculate your monthly EMI instantly</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <label className="font-bold text-slate-700 flex items-center gap-2 text-sm">
                  <IndianRupee className="w-4 h-4 text-blue-600" />
                  Loan Amount
                </label>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-slate-500 font-medium text-sm">₹</span>
                  <span className="text-lg font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
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
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-gradient-to-r from-blue-600 to-green-600"
              />
              <div className="flex justify-between mt-2 text-[11px] font-semibold text-slate-400">
                <span>₹1L</span>
                <span>₹50L</span>
                <span>₹1Cr</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <label className="font-bold text-slate-700 flex items-center gap-2 text-sm">
                  <Percent className="w-4 h-4 text-blue-600" />
                  Interest Rate (p.a)
                </label>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-lg font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
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
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-gradient-to-r from-blue-600 to-green-600"
              />
              <div className="flex justify-between mt-2 text-[11px] font-semibold text-slate-400">
                <span>5%</span>
                <span>10%</span>
                <span>15%</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <label className="font-bold text-slate-700 flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Loan Tenure
                </label>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-lg font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
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
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-gradient-to-r from-blue-600 to-green-600"
              />
              <div className="flex justify-between mt-2 text-[11px] font-semibold text-slate-400">
                <span>1 Year</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 text-white shadow-xl border border-blue-500/20">
            <div className="flex items-center gap-1.5 mb-1.5 text-blue-100">
              <Calendar className="w-4 h-4" />
              <p className="font-semibold text-xs">Monthly EMI</p>
            </div>
            <p className="text-2xl font-black">₹{emi.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 text-white shadow-xl border border-orange-500/20">
            <div className="flex items-center gap-1.5 mb-1.5 text-orange-100">
              <Percent className="w-4 h-4" />
              <p className="font-semibold text-xs">Total Interest</p>
            </div>
            <p className="text-2xl font-black">₹{totalInterest.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-4 text-white shadow-xl border border-green-500/20">
            <div className="flex items-center gap-1.5 mb-1.5 text-green-100">
              <Banknote className="w-4 h-4" />
              <p className="font-semibold text-xs">Total Payment</p>
            </div>
            <p className="text-2xl font-black">₹{totalPayment.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-5 shadow-xl border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Apply for Home Loan</h3>
              <p className="text-xs text-slate-500 font-medium">Our team will contact you within 24 hours</p>
            </div>
          </div>

          {submitSuccess ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Enquiry Submitted Successfully!</h3>
              <p className="text-sm text-slate-500">Our team will contact you shortly</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Loan Purpose *</label>
                  <select
                    name="loanPurpose"
                    required
                    value={formData.loanPurpose}
                    onChange={(e) => setFormData({ ...formData, loanPurpose: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium text-sm"
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
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Address (Optional)</label>
                <textarea
                  name="address"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Additional Remarks</label>
                <textarea
                  name="remarks"
                  placeholder="Any additional details..."
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 font-medium text-sm resize-none"
                />
              </div>

              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="agree"
                  required
                  checked={formData.agreedToContact}
                  onChange={(e) => setFormData({ ...formData, agreedToContact: e.target.checked })}
                  className="w-4 h-4 accent-blue-600"
                />
                <label htmlFor="agree" className="text-xs text-slate-600 font-medium">
                  I agree to be contacted by our team
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold text-base rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
      </div>

      <div className="fixed bottom-28 right-4 flex flex-col gap-3 z-40" style={{ bottom: '120px' }}>
        <motion.a
          href="https://wa.me/919437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-[#25D366] rounded-2xl shadow-xl flex items-center justify-center"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </motion.a>
        <motion.a
          href="tel:9437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-blue-600 rounded-2xl shadow-xl flex items-center justify-center"
        >
          <Phone className="w-7 h-7 text-white" />
        </motion.a>
      </div>
    </div>
  );
};

export default HomeLoan;
