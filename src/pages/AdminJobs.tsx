import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Plus, Edit, Trash2, LogOut } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminJobs: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    type: 'Private',
    location: 'Gunupur',
    salary: '',
    description: '',
    requirements: '',
    contactPhone: '',
    contactEmail: '',
    link: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [navigate]);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const data = {
      ...formData,
      requirements: formData.requirements.split(',').map(r => r.trim()).filter(r => r)
    };
    try {
      if (editingJob) {
        await axios.put(`${API_URL}/jobs/${editingJob._id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJobs(jobs.map(j => j._id === editingJob._id ? { ...j, ...data } : j));
      } else {
        const response = await axios.post(`${API_URL}/jobs`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJobs([...jobs, response.data]);
      }
      setShowForm(false);
      setEditingJob(null);
      setFormData({
        title: '',
        company: '',
        type: 'Private',
        location: 'Gunupur',
        salary: '',
        description: '',
        requirements: '',
        contactPhone: '',
        contactEmail: '',
        link: ''
      });
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleEdit = (job: any) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      type: job.type || 'Private',
      location: job.location || 'Gunupur',
      salary: job.salary || '',
      description: job.description || '',
      requirements: job.requirements?.join(', ') || '',
      contactPhone: job.contactPhone || '',
      contactEmail: job.contactEmail || '',
      link: job.link || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`${API_URL}/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(jobs.filter(j => j._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white border-b border-slate-200/50 h-[72px]"
      >
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 hover:bg-slate-100 rounded-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">Local Jobs</h1>
                <p className="text-xs text-slate-500 font-medium">{jobs.length} jobs listed</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all font-semibold text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 space-y-4 pt-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Post New Job'}
        </button>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingJob ? 'Edit Job' : 'Post New Job'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Sales Executive"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Company / Employer</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Reliance Retail"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Job Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Private">Private</option>
                    <option value="Government">Government</option>
                    <option value="Walk-in">Walk-in</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Gunupur"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Salary Range</label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. ₹15,000 / month"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Job Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 resize-none"
                  rows={4}
                  placeholder="Enter job roles and details..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Requirements (comma separated)</label>
                <input
                  type="text"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  placeholder="12th Pass, Good speaking skills, MS Office"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Contact Phone</label>
                  <input
                    type="text"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                    placeholder="Call for application"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Contact Email / Link</label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                    placeholder="Apply Link or Email"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-bold rounded-xl"
              >
                {editingJob ? 'Update Job' : 'Post Job Opening'}
              </button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-20 text-slate-500 text-lg">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-100">
            <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Jobs Posted</h3>
            <p className="text-slate-500">Post local jobs to help citizens find work</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job._id || job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-md border border-slate-100"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2.5 py-0.5 bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold rounded-full uppercase">
                      {job.type}
                    </span>
                    <h3 className="text-base font-bold text-slate-800 mt-1">{job.title}</h3>
                    <p className="text-xs text-slate-500 font-bold">{job.company} — {job.location || 'Gunupur'}</p>
                    {job.salary && <p className="text-xs text-green-600 font-extrabold mt-1">Salary: {job.salary}</p>}
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-2">{job.description}</p>
                    {job.requirements?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {job.requirements.map((req: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded-md">
                            {req}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(job)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobs;
