import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft, Calculator, Phone, Send, IndianRupee, Percent, Calendar, FileText,
  CheckCircle2, Home as HomeIcon, ShieldCheck, Lock, Users, Star,
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

/**
 * Standard fintech/lending-app visual language:
 * white surfaces, navy primary (#0B2545), a single blue accent (#2563EB)
 * for interaction, restrained shadows, rounded-lg/xl (not 2xl/3xl everywhere).
 */

const steps = [
  { id: 1, title: 'Check Eligibility', desc: 'Verify eligibility in minutes', icon: CheckCircle2 },
  { id: 2, title: 'Calculate EMI', desc: 'Plan your monthly payments', icon: Calculator },
  { id: 3, title: 'Submit Enquiry', desc: 'Get a call from our experts', icon: FileText },
  { id: 4, title: 'Get Approval', desc: 'Quick approval & disbursement', icon: HomeIcon },
];

const trustBadges = [
  { icon: ShieldCheck, label: 'RBI-registered lending partners' },
  { icon: Lock, label: '256-bit secure application' },
  { icon: Users, label: '4,800+ loans facilitated' },
];

const whatsappLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.488-.492-.67-.5h-.572c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .162 5.332.162 11.885c0 2.102.553 4.136 1.56 5.943L0 24l6.324-1.659a11.858 11.858 0 005.726 1.467c.003 0 0 0 .004 0 6.557 0 11.886-5.333 11.886-11.885 0-3.173-1.234-6.151-3.475-8.388"/>
</svg>`;

const NAVY = '#0B2545';
const NAVY_LIGHT = '#13345E';
const BLUE = '#2563EB';

const inputClass =
  'w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[0.95rem] text-slate-800 font-medium placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors';

const HomeLoan: React.FC = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [banks, setBanks] = useState<any[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', address: '', loanPurpose: '', remarks: '', agreedToContact: false,
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

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await axios.get(`${API_URL}/banks`);
        setBanks(res.data);
      } catch (error) {
        console.error('Error fetching banks:', error);
        setBanks([
          { _id: '1', name: 'Indian Bank', logo: '🏦' },
          { _id: '2', name: 'UCO Bank', logo: '🏛️' },
          { _id: '3', name: 'State Bank of India', logo: '🏦' },
          { _id: '4', name: 'Axis Bank', logo: '🏦' },
        ]);
      } finally {
        setLoadingBanks(false);
      }
    };
    fetchBanks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/loan-enquiries`, {
        ...formData, loanAmount, interestRate, loanTenure, emi, bankId: selectedBank,
      });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Error submitting enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const emiSharePct = totalPayment > 0 ? Math.round((loanAmount / totalPayment) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      <style>{`
        .loan-slider { -webkit-appearance: none; appearance: none; height: 6px; border-radius: 9999px; background: #E2E8F0; }
        .loan-slider::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 9999px;
          background: #2563EB; cursor: pointer; border: 3px solid white; box-shadow: 0 1px 4px rgba(15,23,42,0.35);
        }
        .loan-slider::-moz-range-thumb {
          width: 20px; height: 20px; border-radius: 9999px; background: #2563EB; cursor: pointer; border: 3px solid white;
        }
      `}</style>

      <Helmet>
        <title>Home Loan - My Gunupur</title>
        <meta name="description" content="Get easy home loans in Gunupur with competitive interest rates, quick approval, and flexible repayment options. Use our EMI calculator to plan your payments!" />
        <meta property="og:title" content="Home Loan - My Gunupur" />
        <meta property="og:description" content="Get easy home loans in Gunupur with competitive interest rates, quick approval, and flexible repayment options. Use our EMI calculator to plan your payments!" />
        <meta property="og:url" content="https://mygunupur.in/home-loan" />
      </Helmet>

      {/* Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200"
        style={{ height: '68px' }}
      >
        <div className="max-w-5xl mx-auto px-4 h-full flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: NAVY }}>
              <HomeIcon className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="leading-tight">
              <h1 className="text-[1.05rem] font-bold text-slate-900">Home Loan</h1>
              <p className="text-[0.72rem] font-medium text-slate-500">My Gunupur Financing Desk</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-5xl mx-auto px-4 pt-6 space-y-8">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-7 md:p-10 text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_LIGHT} 100%)` }}
        >
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.12)' }}>
              <Star className="w-3 h-3 fill-current" style={{ color: '#FBBF24' }} />
              Rated 4.8 by applicants in Gunupur
            </span>
            <h2 className="text-[1.75rem] md:text-[2.4rem] font-bold leading-tight mb-3 max-w-xl">
              Home loans, made straightforward
            </h2>
            <p className="text-slate-300 text-[0.95rem] md:text-base mb-7 max-w-lg">
              Compare rates, calculate your EMI, and apply through a verified bank partner — no branch visit needed.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="tel:9437578310"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-semibold text-sm rounded-lg hover:bg-slate-100 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call the Desk
              </a>
              <a
                href="https://wa.me/919437578310"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white font-semibold text-sm rounded-lg hover:brightness-105 transition-all"
              >
                <div dangerouslySetInnerHTML={{ __html: whatsappLogo }} />
                WhatsApp Us
              </a>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-6 border-t border-white/10">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <badge.icon className="w-4 h-4" style={{ color: '#60A5FA' }} />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* How to Avail — stepper */}
        <motion.section initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.4 }}>
          <h3 className="text-lg font-bold text-slate-900 mb-4">How to avail your loan</h3>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="relative"
                >
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-5 left-[calc(100%-0.5rem)] w-full h-px bg-slate-200" />
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 relative z-10"
                      style={{ background: '#EFF6FF', color: BLUE, border: `1.5px solid #DBEAFE` }}
                    >
                      {index + 1}
                    </div>
                    <step.icon className="w-5 h-5 text-slate-400" />
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900 mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* EMI Calculator */}
        <motion.section initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.4 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">EMI Calculator</h3>
            <span className="text-xs font-medium text-slate-400">Indicative estimate</span>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Inputs */}
              <div className="lg:col-span-3 space-y-7">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <IndianRupee className="w-4 h-4 text-slate-400" />
                      Loan Amount
                    </label>
                    <span className="text-base font-bold text-slate-900 tabular-nums">₹{loanAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range" min="100000" max="10000000" step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="loan-slider w-full cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-[0.7rem] font-medium text-slate-400">
                    <span>₹1L</span><span>₹50L</span><span>₹1Cr</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <Percent className="w-4 h-4 text-slate-400" />
                      Interest Rate (p.a.)
                    </label>
                    <span className="text-base font-bold text-slate-900 tabular-nums">{interestRate}%</span>
                  </div>
                  <input
                    type="range" min="5" max="15" step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="loan-slider w-full cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-[0.7rem] font-medium text-slate-400">
                    <span>5%</span><span>10%</span><span>15%</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      Loan Tenure
                    </label>
                    <span className="text-base font-bold text-slate-900 tabular-nums">{loanTenure} Years</span>
                  </div>
                  <input
                    type="range" min="1" max="30" step="1"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="loan-slider w-full cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-[0.7rem] font-medium text-slate-400">
                    <span>1 Yr</span><span>15 Yrs</span><span>30 Yrs</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-2">
                <div className="rounded-xl p-6 h-full flex flex-col justify-between" style={{ background: NAVY }}>
                  <div>
                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">Your Monthly EMI</p>
                    <p className="text-3xl font-bold text-white tabular-nums mb-6">₹{emi.toLocaleString()}</p>

                    <div className="mb-1.5 flex justify-between text-[0.7rem] font-medium text-slate-300">
                      <span>Principal</span>
                      <span>Interest</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden flex mb-6" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div style={{ width: `${emiSharePct}%`, background: '#60A5FA' }} />
                      <div style={{ width: `${100 - emiSharePct}%`, background: '#F59E0B' }} />
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-300">Total Interest</span>
                      <span className="text-sm font-bold text-white tabular-nums">₹{totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-300">Total Payment</span>
                      <span className="text-sm font-bold text-white tabular-nums">₹{totalPayment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Select Bank */}
        <motion.section initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.4 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Select bank partner</h3>
            <span className="text-xs font-medium text-slate-400">Optional</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {loadingBanks
              ? [1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-5 rounded-xl border border-slate-200 bg-white animate-pulse text-center">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg mx-auto mb-3" />
                    <div className="h-3.5 bg-slate-100 rounded w-3/4 mx-auto" />
                  </div>
                ))
              : banks.map((bank, index) => (
                  <motion.button
                    key={bank._id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedBank(bank._id)}
                    className={cn(
                      'p-5 rounded-xl border-2 bg-white text-center transition-all duration-200',
                      selectedBank === bank._id ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-200 hover:border-slate-300'
                    )}
                  >
                    <span className="text-2xl mb-2 block">{bank.logo || '🏦'}</span>
                    <h4 className="text-sm font-semibold text-slate-800">{bank.name}</h4>
                    {selectedBank === bank._id && (
                      <span className="inline-flex items-center gap-1 text-[0.7rem] font-semibold text-blue-600 mt-2">
                        <CheckCircle2 className="w-3 h-3" /> Selected
                      </span>
                    )}
                  </motion.button>
                ))}
          </div>
        </motion.section>

        {/* Submit Enquiry */}
        <motion.section initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.4 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Submit enquiry</h3>
            <span className="text-xs font-medium text-slate-400">We respond within 24 hours</span>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-14 text-center"
                >
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1.5">Enquiry submitted successfully</h4>
                  <p className="text-sm text-slate-500">Our team will call you shortly.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5" initial={{ opacity: 1 }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name *</label>
                      <input
                        type="text" required placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Mobile Number *</label>
                      <input
                        type="tel" required placeholder="Enter your mobile number"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address</label>
                      <input
                        type="email" placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Loan Purpose</label>
                      <select
                        value={formData.loanPurpose}
                        onChange={(e) => setFormData({ ...formData, loanPurpose: e.target.value })}
                        className={inputClass}
                      >
                        <option value="">Select purpose</option>
                        <option value="Home Purchase">Home Purchase</option>
                        <option value="Home Construction">Home Construction</option>
                        <option value="Home Renovation">Home Renovation</option>
                        <option value="Balance Transfer">Balance Transfer</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Address</label>
                    <textarea
                      rows={3} placeholder="Enter your address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={cn(inputClass, 'resize-none')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Remarks (optional)</label>
                    <textarea
                      rows={2} placeholder="Any additional remarks"
                      value={formData.remarks}
                      onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                      className={cn(inputClass, 'resize-none')}
                    />
                  </div>
                  <label className="flex items-center gap-2.5 pt-1 cursor-pointer">
                    <input
                      type="checkbox" required
                      checked={formData.agreedToContact}
                      onChange={(e) => setFormData({ ...formData, agreedToContact: e.target.checked })}
                      className="w-4 h-4 rounded accent-blue-600"
                    />
                    <span className="text-sm text-slate-600 font-medium">I agree to be contacted by the team</span>
                  </label>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg font-semibold text-sm text-white flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
                    style={{ background: BLUE }}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Enquiry
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-28 right-5 flex flex-col gap-3 z-40">
        <motion.a
          href="https://wa.me/919437578310"
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, type: 'spring' }}
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
          className="w-[52px] h-[52px] rounded-full bg-[#25D366] shadow-lg flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: whatsappLogo }}
        />
        <motion.a
          href="tel:9437578310"
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, type: 'spring' }}
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
          className="w-[52px] h-[52px] rounded-full shadow-lg flex items-center justify-center"
          style={{ background: BLUE }}
        >
          <Phone className="w-5 h-5 text-white" />
        </motion.a>
      </div>

      {/* Bottom Nav */}
      <motion.div
        initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.4, type: 'spring' }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-around py-2.5">
            <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 px-4 py-1.5 text-slate-400">
              <HomeIcon className="w-5 h-5" />
              <span className="text-[0.68rem] font-semibold">Home</span>
            </button>
            <button onClick={() => navigate('/home-loan')} className="flex flex-col items-center gap-1 px-4 py-1.5" style={{ color: BLUE }}>
              <HomeIcon className="w-5 h-5" />
              <span className="text-[0.68rem] font-semibold">Loan</span>
            </button>
            <button onClick={() => navigate('/building-enquiry')} className="flex flex-col items-center gap-1 px-4 py-1.5 text-slate-400">
              <FileText className="w-5 h-5" />
              <span className="text-[0.68rem] font-semibold">Building</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeLoan;