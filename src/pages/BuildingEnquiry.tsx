import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft, Phone, Send, CheckCircle2, FileText, Building2, Home as HomeIcon,
  ShieldCheck, Clock, Users,
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

/**
 * Same "fintech-professional" language as the Home Loan page:
 * white surfaces, navy primary (#0B2545), a single blue accent (#2563EB).
 */

const whatsappLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.488-.492-.67-.5h-.572c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .162 5.332.162 11.885c0 2.102.553 4.136 1.56 5.943L0 24l6.324-1.659a11.858 11.858 0 005.726 1.467c.003 0 0 0 .004 0 6.557 0 11.886-5.333 11.886-11.885 0-3.173-1.234-6.151-3.475-8.388"/>
</svg>`;

const steps = [
  { id: 1, title: 'Submit Enquiry', desc: 'Fill the form with your details', icon: FileText },
  { id: 2, title: 'Document Check', desc: 'Our team verifies your documents', icon: CheckCircle2 },
  { id: 3, title: 'Plan Review', desc: 'Expert review of your building plan', icon: Building2 },
  { id: 4, title: 'Get Approval', desc: 'Receive approval and guidance', icon: HomeIcon },
];

const trustBadges = [
  { icon: ShieldCheck, label: 'Municipal-compliant process' },
  { icon: Clock, label: 'Response within 24 hours' },
  { icon: Users, label: '1,200+ plans reviewed' },
];

const NAVY = '#0B2545';
const NAVY_LIGHT = '#13345E';
const BLUE = '#2563EB';

const inputClass =
  'w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-[0.95rem] text-slate-800 font-medium placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors';

const BuildingEnquiry: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    plotNumber: '',
    ward: '',
    requirement: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/building-enquiries`, formData);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: '', phone: '', email: '', address: '', plotNumber: '', ward: '', requirement: '', message: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Error submitting enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      <Helmet>
        <title>Building Approval - My Gunupur</title>
        <meta name="description" content="Get expert guidance and fast approval for your building plans in Gunupur with our streamlined process. Submit your enquiry today!" />
        <meta property="og:title" content="Building Approval - My Gunupur" />
        <meta property="og:description" content="Get expert guidance and fast approval for your building plans in Gunupur with our streamlined process. Submit your enquiry today!" />
        <meta property="og:url" content="https://mygunupur.in/building-enquiry" />
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
              <Building2 className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="leading-tight">
              <h1 className="text-[1.05rem] font-bold text-slate-900">Building Approval</h1>
              <p className="text-[0.72rem] font-medium text-slate-500">Plan Review & Permission Desk</p>
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
              <Building2 className="w-3 h-3" style={{ color: '#60A5FA' }} />
              Building Plan Approval
            </span>
            <h2 className="text-[1.75rem] md:text-[2.4rem] font-bold leading-tight mb-3 max-w-xl">
              Get your building plan approved, without the runaround
            </h2>
            <p className="text-slate-300 text-[0.95rem] md:text-base mb-7 max-w-lg">
              Submit your plot and plan details once — our team handles document checks, plan review and permission guidance.
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

        {/* How it Works — stepper */}
        <motion.section initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.4 }}>
          <h3 className="text-lg font-bold text-slate-900 mb-4">How it works</h3>
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
                    <div className="hidden lg:block absolute top-10 left-[calc(100%-0.75rem)] w-full h-0.5 bg-gradient-to-r from-blue-200 to-blue-100" />
                  )}
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 relative z-10 mb-4"
                      style={{ background: `linear-gradient(135deg, ${BLUE}, #1D4ED8)`, color: 'white', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}
                    >
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="mb-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 font-bold text-sm">
                      {index + 1}
                    </div>
                    <h4 className="font-bold text-base text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Submit Enquiry */}
        <motion.section initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.4 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Submit your enquiry</h3>
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
                  <p className="text-sm text-slate-500">Our team will contact you shortly.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5" initial={{ opacity: 1 }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name *</label>
                      <input
                        type="text" name="name" required placeholder="Enter your full name"
                        value={formData.name} onChange={handleChange} className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone Number *</label>
                      <input
                        type="tel" name="phone" required placeholder="Enter your phone number"
                        value={formData.phone} onChange={handleChange} className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address</label>
                      <input
                        type="email" name="email" placeholder="Enter your email"
                        value={formData.email} onChange={handleChange} className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Plot Number</label>
                      <input
                        type="text" name="plotNumber" placeholder="Enter plot number"
                        value={formData.plotNumber} onChange={handleChange} className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Ward</label>
                      <input
                        type="text" name="ward" placeholder="Enter ward number"
                        value={formData.ward} onChange={handleChange} className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Requirement Type *</label>
                      <select
                        name="requirement" required value={formData.requirement}
                        onChange={handleChange} className={inputClass}
                      >
                        <option value="">Select requirement</option>
                        <option value="new-construction">New Construction</option>
                        <option value="renovation">Renovation / Extension</option>
                        <option value="plan-approval">Plan Approval</option>
                        <option value="permission">Building Permission</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Address</label>
                    <textarea
                      name="address" placeholder="Enter your complete address"
                      value={formData.address} onChange={handleChange} rows={2}
                      className={cn(inputClass, 'resize-none')}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Message / Details</label>
                    <textarea
                      name="message" placeholder="Tell us more about your requirement..."
                      value={formData.message} onChange={handleChange} rows={3}
                      className={cn(inputClass, 'resize-none')}
                    />
                  </div>

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


    </div>
  );
};

export default BuildingEnquiry;