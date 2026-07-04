import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, FileText, ExternalLink, Award, Users } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackSchemes = [
  {
    id: 1,
    title: 'Madhu Babu Pension Yojana',
    category: 'Pension',
    description: 'A state pension scheme providing social security to old aged, widows, and disabled persons in Odisha.',
    eligibility: ['Resident of Odisha', 'Age 60 years or above (elderly)', 'Family income below ₹24,000 per annum'],
    documents: ['Aadhar Card', 'Resident Certificate', 'Income Certificate', 'Bank Passbook copy'],
    link: 'https://seped.odisha.gov.in'
  },
  {
    id: 2,
    title: 'Pradhan Mantri Awas Yojana (PMAY)',
    category: 'PMAY',
    description: 'A housing initiative that aims to provide affordable housing for all rural and urban poor.',
    eligibility: ['Indian Citizen', 'Must not own a pakka house anywhere in the country', 'EWS/LIG families'],
    documents: ['Aadhar Card', 'Voter ID Card', 'Address Proof', 'Income Proof/Caste Certificate'],
    link: 'https://pmaymis.gov.in'
  },
  {
    id: 3,
    title: 'Post-Matric Scholarship Scheme',
    category: 'Scholarship',
    description: 'Financial assistance for SC, ST, OBC and Minority community students studying post-matriculation courses.',
    eligibility: ['Odisha state domicile student', 'SC/ST/OBC/SEBC categories', 'Passing percentage in last qualifying exam'],
    documents: ['College Admission Receipt', 'Previous Year Marksheet', 'Caste Certificate', 'Income Certificate'],
    link: 'https://scholarship.odisha.gov.in'
  },
  {
    id: 4,
    title: 'KALIA Scheme for Farmers',
    category: 'Farmer Schemes',
    description: 'Krushak Assistance for Livelihood and Income Augmentation to accelerate agriculture prosperity.',
    eligibility: ['Small and marginal farmers of Odisha', 'Landless agricultural households'],
    documents: ['Land Records (RoR)', 'Aadhar Card', 'Active Bank Account details'],
    link: 'https://kalia.odisha.gov.in'
  }
];

const GovernmentSchemes: React.FC = () => {
  const [schemes, setSchemes] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  const tabs = ['All', 'PMAY', 'Pension', 'Scholarship', 'Farmer Schemes'];

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await axios.get(`${API_URL}/government-schemes`);
        if (res.data && res.data.length > 0) {
          setSchemes(res.data);
        } else {
          setSchemes(fallbackSchemes);
        }
      } catch (error) {
        console.error('Error fetching schemes:', error);
        setSchemes(fallbackSchemes);
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  const filteredSchemes = activeTab === 'All'
    ? schemes
    : schemes.filter(s => s.category?.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="p-4 space-y-6">
      {/* Category Tabs */}
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

      {/* Schemes List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4 animate-pulse">
              <div className="h-6 bg-slate-200 rounded w-2/3" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
              <div className="h-24 bg-slate-100 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : filteredSchemes.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <Award className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="text-sm font-semibold">No schemes found in this category.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSchemes.map((scheme, index) => (
            <motion.div
              key={scheme._id || scheme.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-extrabold text-slate-800 text-base">{scheme.title}</h4>
                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-[9px] font-bold rounded-full border border-blue-100">
                  {scheme.category}
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium leading-relaxed">{scheme.description}</p>

              {/* Eligibility Section */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-blue-500" /> Who is Eligible
                </p>
                <ul className="space-y-1.5 pl-1">
                  {scheme.eligibility && scheme.eligibility.map((el: string, idx: number) => (
                    <li key={idx} className="text-xs text-slate-600 font-semibold flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                      {el}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents Required */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-blue-500" /> Documents Needed
                </p>
                <ul className="space-y-1.5 pl-1">
                  {scheme.documents && scheme.documents.map((doc: string, idx: number) => (
                    <li key={idx} className="text-xs text-slate-600 font-semibold flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply link */}
              {scheme.link && (
                <button
                  onClick={() => window.open(scheme.link, '_blank')}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:shadow-blue-500/20 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200"
                >
                  Apply on Official Portal <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GovernmentSchemes;
