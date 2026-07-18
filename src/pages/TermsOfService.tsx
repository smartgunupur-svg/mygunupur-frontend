import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, AlertCircle, FileSpreadsheet, ShieldAlert } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Helmet>
        <title>Terms of Service - My Gunupur</title>
        <meta name="description" content="Terms of Service for My Gunupur. Please read these terms carefully before using our platform." />
      </Helmet>

      {/* Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200"
        style={{ height: '68px' }}
      >
        <div className="max-w-4xl mx-auto px-4 h-full flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-600">
              <BookOpen className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="leading-tight">
              <h1 className="text-base font-bold text-slate-900">Terms of Service</h1>
              <p className="text-[0.72rem] font-medium text-slate-500">My Gunupur Initiative</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8 text-slate-700"
        >
          <div className="text-center space-y-3 pb-6 border-b border-slate-100">
            <h2 className="text-3xl font-black text-slate-900">Terms of Service</h2>
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Last Updated: July 2026</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-5 flex flex-col items-center text-center">
              <AlertCircle className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-bold text-slate-800 text-sm mb-1">Acceptance</h4>
              <p className="text-xs text-slate-500">By using our services, you agree to comply with local laws and rules.</p>
            </div>
            <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-5 flex flex-col items-center text-center">
              <FileSpreadsheet className="w-8 h-8 text-emerald-600 mb-3" />
              <h4 className="font-bold text-slate-800 text-sm mb-1">Accurate Details</h4>
              <p className="text-xs text-slate-500">You promise to provide true, accurate details during requests.</p>
            </div>
            <div className="bg-purple-50/50 border border-purple-100/50 rounded-2xl p-5 flex flex-col items-center text-center">
              <ShieldAlert className="w-8 h-8 text-purple-600 mb-3" />
              <h4 className="font-bold text-slate-800 text-sm mb-1">Fair Use</h4>
              <p className="text-xs text-slate-500">Spamming, fake requests, and misuse of hotline resources are prohibited.</p>
            </div>
          </div>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Welcome to My Gunupur. By accessing this platform, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any local laws in Gunupur, Odisha, India. If you do not agree with any of these terms, you are prohibited from using this portal.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">2. Scope of Services</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              My Gunupur is a citizen-focused directory and utility portal. We facilitate connections between local residents and services:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 pl-4 space-y-1.5">
              <li>Information directories (Schools, Colleges, Parks, Hotels, etc.)</li>
              <li>Calculators and enquiry logs (Home Loan approvals, Building Permission desks)</li>
              <li>Free community initiatives (Swarga Ratha hearse logistics)</li>
              <li>Verified emergency contacts and direct hotlines.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">3. User Responsibilities</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Users must provide valid contact details (Mobile number, Name) when requesting loan options or municipal clearances. You agree not to submit false claims, trigger prank calls using hotlines, or attempt to crawl/overload database servers.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">4. Disclaimer of Liability</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              While My Gunupur strives for high accuracy and support:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 pl-4 space-y-1.5">
              <li><strong>Loan Rates:</strong> Bank rates shown represent reference tools. Final rate approvals are at the discretion of the partner banks.</li>
              <li><strong>Building Permissions:</strong> Final building sanctions are subject to municipal authority review and formal documentation.</li>
              <li><strong>Service Availability:</strong> Swarga Ratha hearse service operates based on real-time availability and support parameters.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">5. Governing Law</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Any dispute relating to the My Gunupur initiative shall be subject to local court jurisdictions in Rayagada and the State of Odisha, India.
            </p>
          </section>

          <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 font-semibold gap-4">
            <p>© 2026 My Gunupur Initiative. Rayagada, Odisha, India.</p>
            <p>Support: <a href="mailto:support@mygunupur.in" className="text-blue-500 hover:underline">support@mygunupur.in</a></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
