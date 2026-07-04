import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fallbackEvents = [
  {
    id: 1,
    title: 'Rath Yatra Festival 2025',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop',
    description: 'The auspicious annual chariot festival of Lord Jagannath, drawing thousands of devotees to Gunupur streets.',
    date: '2025-06-27T10:00:00.000Z',
    location: 'Jagannath Temple Road, Gunupur',
    category: 'upcoming'
  },
  {
    id: 2,
    title: 'Maa Tarini Shodasha Puja',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=400&fit=crop',
    description: 'Special annual 16-day celebrations at the temple shrine with cultural programs and Prasad distribution.',
    date: '2025-07-10T10:00:00.000Z',
    location: 'Maa Tarini Temple Complex, Gunupur',
    category: 'upcoming'
  },
  {
    id: 3,
    title: 'District Cultural Mahotsav',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop',
    description: 'A grand celebration showcasing traditional tribal dance forms, local handicrafts, and heritage arts.',
    date: '2025-08-30T10:00:00.000Z',
    location: 'Municipality Ground, Gunupur',
    category: 'upcoming'
  }
];

const EventsAndFestivals: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('upcoming'); // upcoming, past
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_URL}/events`);
        if (res.data && res.data.length > 0) {
          setEvents(res.data);
        } else {
          setEvents(fallbackEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(e => e.category === activeTab);

  return (
    <div className="p-4 space-y-6">
      {/* Tabs */}
      <div className="flex gap-2">
        {['upcoming', 'past'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all duration-200 uppercase tracking-wider ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab} Events
          </button>
        ))}
      </div>

      {/* Events List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-3 animate-pulse">
              <div className="h-40 bg-slate-200 rounded-2xl" />
              <div className="h-5 bg-slate-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="text-sm font-semibold">No {activeTab} events scheduled.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event, index) => {
            const evDate = new Date(event.date);
            const month = evDate.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase();
            const day = evDate.getDate();
            const year = evDate.getFullYear();

            return (
              <motion.div
                key={event._id || event.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm flex flex-col"
              >
                {/* Event Image Banner */}
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Floating Date Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 flex flex-col items-center justify-center shadow-md border border-slate-100 w-12 text-center">
                    <span className="text-[9px] font-extrabold text-blue-600 leading-none">{month}</span>
                    <span className="text-lg font-black text-slate-800 leading-none mt-1">{day}</span>
                    <span className="text-[8px] font-bold text-slate-400 leading-none mt-0.5">{year}</span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm leading-tight">{event.title}</h4>
                    <p className="text-xs text-slate-400 font-semibold mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" /> {event.location}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventsAndFestivals;
