import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Building, Shield, Lightbulb, UserCheck, ShieldAlert } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const iconComponents: any = {
  Shield,
  UserCheck,
  ShieldAlert,
  Building,
  Lightbulb
};

const ImportantContacts: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${API_URL}/important-contacts`);
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center py-10 text-slate-500">Loading contacts...</div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Official Directory</h3>
        {contacts.length === 0 ? (
          <div className="text-center py-10 text-slate-500">No contacts available</div>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact, index) => {
              const Icon = iconComponents[contact.icon] || Building;
              return (
                <motion.div
                  key={contact._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${contact.bg?.split(' ')[0] || 'bg-indigo-50'} border border-slate-100 shadow-sm`}>
                      <Icon className={`w-6 h-6 ${contact.color || 'text-indigo-600'}`} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{contact.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{contact.desc}</p>
                      <p className="text-xs text-blue-600 font-bold mt-1">{contact.phone}</p>
                    </div>
                  </div>

                  <a
                    href={`tel:${contact.phone}`}
                    className="w-10 h-10 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm border border-blue-100"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportantContacts;
