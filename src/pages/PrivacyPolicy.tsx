import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Helmet>
        <title>Privacy Policy - My Gunupur</title>
        <meta name="description" content="Privacy Policy for My Gunupur Initiative. Understand how we protect your personal data." />
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
              <Shield className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="leading-tight">
              <h1 className="text-base font-bold text-slate-900">Privacy Policy</h1>
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
            <h2 className="text-3xl font-black text-slate-900">Privacy Policy</h2>
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Last Updated: July 2026</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-5 flex flex-col items-center text-center">
              <Eye className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-bold text-slate-800 text-sm mb-1">Transparency</h4>
              <p className="text-xs text-slate-500">We only collect data necessary to provide and improve citizen services.</p>
            </div>
            <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-2xl p-5 flex flex-col items-center text-center">
              <Lock className="w-8 h-8 text-emerald-600 mb-3" />
              <h4 className="font-bold text-slate-800 text-sm mb-1">Security First</h4>
              <p className="text-xs text-slate-500">Your details are protected using industry-standard secure servers.</p>
            </div>
            <div className="bg-purple-50/50 border border-purple-100/50 rounded-2xl p-5 flex flex-col items-center text-center">
              <FileText className="w-8 h-8 text-purple-600 mb-3" />
              <h4 className="font-bold text-slate-800 text-sm mb-1">User Control</h4>
              <p className="text-xs text-slate-500">You retain control of your information and consent for partner contacts.</p>
            </div>
          </div>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">1. Information We Collect</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              To provide support and verify submissions on the My Gunupur portal, we may collect the following personal information when you submit enquiries (e.g., Home Loan applications, Building Approvals, or Emergency support request):
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 pl-4 space-y-1.5">
              <li>Contact Information (Name, Phone Number, Email address, Physical Address)</li>
              <li>Enquiry Details (Plot details, ward details, building requirements)</li>
              <li>Technical details (selected bank partners, loan amount configurations, device identifiers)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              The information we collect is processed solely to fulfill your specific service requests:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 pl-4 space-y-1.5">
              <li>To forward Home Loan requests to your designated partner bank.</li>
              <li>To evaluate and process municipal building plan enquiries.</li>
              <li>To contact you regarding updates, notifications, or service approvals.</li>
              <li>To analyze and optimize app performance and layout quality.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">3. Information Sharing</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              My Gunupur does not sell or lease your personal information. Your details are shared only with:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 pl-4 space-y-1.5">
              <li><strong>Authorized Bank Partners:</strong> If you explicitly submit an enquiry for a home loan with a chosen bank.</li>
              <li><strong>Municipal Administrators:</strong> Internal desk personnel who review building approval checklists.</li>
              <li><strong>Legal Compliance:</strong> When required by governing laws in Rayagada, Odisha, or central Indian jurisdictions.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">4. Data Retention and Security</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              We employ encryption and secure network protocols to prevent unauthorized access. We retain personal details only as long as necessary to complete your support request or comply with local records retention guidelines.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">5. Updates to this Policy</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              We may modify this policy periodically to align with updated app updates or citizen requirements. Significant changes will be announced on the Home page update ticker.
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

export default PrivacyPolicy;
