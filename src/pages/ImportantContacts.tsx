import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Building, Shield, Lightbulb, UserCheck, ShieldAlert } from 'lucide-react';

const contactsList = [
  {
    id: 1,
    name: 'Collectorate Rayagada',
    phone: '000000000',
    icon: Shield,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50 border-indigo-100',
    desc: 'District Headquarters Administrative Office'
  },
  {
    id: 2,
    name: 'Sub-Collector Office Gunupur',
    phone: '000000000',
    icon: UserCheck,
    color: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-100',
    desc: 'Sub-Divisional Headquarters Office'
  },
  {
    id: 3,
    name: 'SP Office Rayagada',
    phone: '000000000',
    icon: ShieldAlert,
    color: 'text-red-600',
    bg: 'bg-red-50 border-red-100',
    desc: 'Police Superintendent Administration'
  },
  {
    id: 4,
    name: 'BDO Office Gunupur',
    phone: '000000000000',
    icon: Building,
    color: 'text-green-600',
    bg: 'bg-green-50 border-green-100',
    desc: 'Block Development Officer'
  },
  {
    id: 5,
    name: 'Tahasil Office Gunupur',
    phone: '00000000000',
    icon: Building,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-100',
    desc: 'Land Records & Revenue Administration'
  },
  {
    id: 6,
    name: 'Municipality Office Gunupur',
    phone: '000000000',
    icon: Building,
    color: 'text-teal-600',
    bg: 'bg-teal-50 border-teal-100',
    desc: 'Municipal Corporation Office'
  },
  {
    id: 7,
    name: 'Electricity Office (TPSODL)',
    phone: '1912',
    icon: Lightbulb,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50 border-yellow-100',
    desc: 'Electricity Complaints & Support'
  }
];

const ImportantContacts: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Official Directory</h3>
        <div className="space-y-3">
          {contactsList.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${contact.bg.split(' ')[0]} border border-slate-100 shadow-sm`}>
                    <Icon className={`w-6 h-6 ${contact.color}`} />
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
      </div>
    </div>
  );
};

export default ImportantContacts;
