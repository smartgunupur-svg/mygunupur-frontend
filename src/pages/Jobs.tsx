import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Phone, MapPin, Briefcase, Calendar, Award } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackJobs = [
  {
    id: 1,
    title: 'Customer Relationship Executive',
    company: 'Reliance Retail Smart Point',
    type: 'Private',
    location: 'Gunupur Town',
    salary: '₹12,000 - ₹15,000 / month',
    description: 'Looking for enthusiastic executives to manage customer relations and store billing desks.',
    requirements: ['12th Pass or Graduate', 'Good communication', 'Basic computer knowledge'],
    contactPhone: '9437578310'
  },
  {
    id: 2,
    title: 'Guest Lecturer (Computer Science)',
    company: 'GIET University',
    type: 'Walk-in',
    location: 'Gobriguda Campus, Gunupur',
    salary: '₹25,000 - ₹35,000 / month',
    description: 'Walk-in interview for teaching CSE graduates. Candidates should have teaching aptitude and core subject knowledge.',
    requirements: ['M.Tech or Ph.D. in CSE', '2 years experience preferred'],
    contactPhone: '9876543210'
  },
  {
    id: 3,
    title: 'Technical Assistant (Water Supply)',
    company: 'Public Health Department (Odisha Govt)',
    type: 'Government',
    location: 'Municipal Office, Gunupur',
    salary: 'Contractual (State Scale)',
    description: 'Supervise maintenance of city water storage points, pump houses, and pipeline distribution lines.',
    requirements: ['Diploma in Civil/Mechanical Engineering', 'Odia language proficiency'],
    contactPhone: '8877665544'
  }
];

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API_URL}/jobs`);
        if (res.data && res.data.length > 0) {
          setJobs(res.data);
        } else {
          setJobs(fallbackJobs);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs(fallbackJobs);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(j =>
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-2xl text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition-all duration-200"
        />
      </div>

      {/* Jobs Listings */}
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-2 animate-pulse">
                <div className="h-5 bg-slate-200 rounded w-1/2" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Briefcase className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-sm font-semibold">No job openings found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredJobs.map((j, index) => (
              <motion.div
                key={j._id || j.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className={`px-2 py-0.5 rounded-md text-[8px] font-extrabold uppercase ${
                      j.type === 'Government'
                        ? 'bg-purple-50 text-purple-700 border border-purple-100'
                        : j.type === 'Walk-in'
                        ? 'bg-orange-50 text-orange-700 border border-orange-100'
                        : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}>
                      {j.type}
                    </span>
                    <h4 className="font-extrabold text-slate-800 text-sm mt-1">{j.title}</h4>
                    <p className="text-xs text-slate-500 font-semibold">{j.company}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-extrabold bg-slate-100 px-2 py-0.5 rounded-md">
                    {j.salary || 'Best in Industry'}
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-medium leading-relaxed">{j.description}</p>

                {/* Requirements */}
                {j.requirements && j.requirements.length > 0 && (
                  <div className="space-y-1 bg-slate-50 p-3 rounded-2xl">
                    <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-blue-500" /> Requirements
                    </p>
                    <ul className="space-y-1 pl-1">
                      {j.requirements.map((req: string, idx: number) => (
                        <li key={idx} className="text-[11px] text-slate-600 font-semibold flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-slate-400 rounded-full" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {j.location || 'Gunupur'}
                  </span>
                  <a
                    href={`tel:${j.contactPhone}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-200"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call to Apply
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

export default Jobs;
