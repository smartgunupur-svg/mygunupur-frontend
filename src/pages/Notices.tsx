import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Download, Calendar, Bell } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackNotices = [
  {
    id: 1,
    title: 'Water Supply interruption in Ward 3 and 4',
    description: 'Notice regarding maintenance of water pipeline on 25th May 2025. Water supply will be interrupted between 9 AM and 3 PM.',
    category: 'Municipality',
    pdfFile: '#',
    date: '2025-05-20T10:00:00.000Z'
  },
  {
    id: 2,
    title: 'Swachh Gunupur Campaign 2025 Launch',
    description: 'Join hands for making Gunupur clean and green. Sanitation drive starts from Old Bus Stand this Sunday.',
    category: 'Other',
    pdfFile: '#',
    date: '2025-05-13T10:00:00.000Z'
  },
  {
    id: 3,
    title: 'PMAY Scheme Application Date Extended',
    description: 'Application dates for rural housing scheme beneficiary submissions have been extended to June 15th.',
    category: 'Government',
    pdfFile: '#',
    date: '2025-05-15T10:00:00.000Z'
  },
  {
    id: 4,
    title: 'Traffic Diversion due to Rath Yatra festival',
    description: 'Municipal police has diverted main road traffic from Tuesday for preparation of cart path works.',
    category: 'Municipality',
    pdfFile: '#',
    date: '2025-05-12T10:00:00.000Z'
  }
];

const Notices: React.FC = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const tabs = ['All', 'Municipality', 'Government', 'Other'];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get(`${API_URL}/notices`);
        if (res.data && res.data.length > 0) {
          setNotices(res.data);
        } else {
          setNotices(fallbackNotices);
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
        setNotices(fallbackNotices);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const filteredNotices = notices.filter(n => {
    const matchesTab = activeTab === 'All' || n.category?.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-4 space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search notices..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition-all duration-200"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notices Listings */}
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-2 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-1/4" />
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Bell className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm font-semibold">No notices found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotices.map((notice, index) => (
              <motion.div
                key={notice._id || notice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                      notice.category === 'Municipality' 
                        ? 'bg-blue-50 text-blue-700 border-blue-100'
                        : notice.category === 'Government'
                        ? 'bg-purple-50 text-purple-700 border-purple-100'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                      {notice.category} Notice
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(notice.date || notice.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-800 text-sm leading-tight">{notice.title}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{notice.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" /> PDF Document
                  </span>
                  <a
                    href={notice.pdfFile || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notices;
