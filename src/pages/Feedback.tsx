import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, CheckCircle, Send, HelpCircle, Heart, AlertOctagon } from 'lucide-react';

const Feedback: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Suggestion', // Suggestion, Complaint, Query, Praise
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = [
    { name: 'Suggestion', icon: HelpCircle, color: 'text-blue-500', bg: 'bg-blue-50 border-blue-100' },
    { name: 'Complaint', icon: AlertOctagon, color: 'text-red-500', bg: 'bg-red-50 border-red-100' },
    { name: 'Praise', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50 border-rose-100' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;
    
    setLoading(true);
    // Mock API submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        category: 'Suggestion',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-slate-100 rounded-3xl p-5 shadow-sm space-y-2">
        <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
          <MessageSquare className="w-5 h-5 text-blue-600" /> Share your Thoughts
        </h4>
        <p className="text-xs text-slate-500 font-semibold leading-relaxed">
          Your suggestions, feedback, and complaints help us build a better digital infrastructure for Gunupur.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 px-1">Full Name *</label>
          <input
            type="text"
            required
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/55 focus:bg-white border border-slate-100 rounded-2xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600/30 transition-all duration-200"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 px-1">Mobile Number *</label>
          <input
            type="tel"
            required
            placeholder="Enter 10-digit number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/55 focus:bg-white border border-slate-100 rounded-2xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600/30 transition-all duration-200"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 px-1">Email Address (Optional)</label>
          <input
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/55 focus:bg-white border border-slate-100 rounded-2xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600/30 transition-all duration-200"
          />
        </div>

        {/* Category Choice */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 px-1">Feedback Category</label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = formData.category === cat.name;
              return (
                <button
                  type="button"
                  key={cat.name}
                  onClick={() => setFormData({ ...formData, category: cat.name })}
                  className={`py-2.5 px-2 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-bold">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 px-1">Detailed Message *</label>
          <textarea
            required
            rows={4}
            placeholder="Write your suggestion or complaint here..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/55 focus:bg-white border border-slate-100 rounded-2xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600/30 transition-all duration-200 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:shadow-blue-500/20 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : (
            <>
              Submit Feedback <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl border border-slate-100"
            >
              <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
              <div>
                <h4 className="font-extrabold text-slate-800 text-base">Feedback Submitted!</h4>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Thank you for your valuable response. We will review it shortly.
                </p>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold transition-all duration-200"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Feedback;
