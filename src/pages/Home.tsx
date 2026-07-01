import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Home as HomeIcon,
  Building2,
  AlertTriangle,
  HeartPulse,
  Briefcase,
  MessageSquare,
  Phone,
  ArrowUpRight,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * ---------------------------------------------------------------------------
 * DESIGN TOKENS — "Civic Ledger"
 * A municipal-directory identity for Gunupur: parchment paper, deep forest
 * green for trust/authority, terracotta as a nod to the region's laterite
 * and temple architecture, and a gold seal used sparingly for officialdom.
 * ---------------------------------------------------------------------------
 * Add once, globally (index.html or a font CSS file):
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">
 * -------------------------------------------------------------------------*/

const heroSlides = [
  {
    id: 1,
    eyebrow: 'Municipal Services · Gunupur',
    title: 'One Door for Every Civic Need',
    subtitle: 'Home loans, building approvals, emergency lines and local services — organised in one place.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&h=1000&fit=crop',
    cta: 'View All Services',
    path: null,
  },
  {
    id: 2,
    eyebrow: 'Home Financing',
    title: 'A Home Loan, Explained Plainly',
    subtitle: 'Estimate your EMI and start an application without visiting a branch.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1400&h=1000&fit=crop',
    cta: 'Calculate Your EMI',
    path: '/home-loan',
  },
  {
    id: 3,
    eyebrow: 'Heritage & Places',
    title: 'The Gunupur Worth Seeing',
    subtitle: 'Temples, waterfalls and quiet corners of the town, mapped for you.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&h=1000&fit=crop',
    cta: 'Explore Places',
    path: null,
  },
];

const quickServices = [
  { id: 1, index: '01', title: 'Home Loan', desc: 'EMI calculator & apply', icon: HomeIcon, path: '/home-loan' },
  { id: 2, index: '02', title: 'Building Approval', desc: 'Track your application', icon: Building2, path: '/building-enquiry' },
  { id: 3, index: '03', title: 'Construction Material', desc: 'Local vendors & rates', icon: Briefcase, path: '/construction-material' },
  { id: 4, index: '04', title: 'Emergency', desc: 'Police, fire, ambulance', icon: AlertTriangle, path: '/emergency' },
  { id: 5, index: '05', title: 'Hospitals', desc: 'Nearby care & contacts', icon: HeartPulse, path: '/hospitals' },
  { id: 6, index: '06', title: 'Contact', desc: 'Reach the office', icon: MessageSquare, path: '/contact' },
];

const whatsappLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.488-.492-.67-.5h-.572c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .162 5.332.162 11.885c0 2.102.553 4.136 1.56 5.943L0 24l6.324-1.659a11.858 11.858 0 005.726 1.467c.003 0 0 0 .004 0 6.557 0 11.886-5.333 11.886-11.885 0-3.173-1.234-6.151-3.475-8.388"/>
</svg>`;

/** Small circular civic-seal mark — the signature element, used sparingly. */
const Seal: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" style={style}>
    <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="0.7" strokeDasharray="1.5 3.5" />
    <text x="32" y="37" textAnchor="middle" fontFamily="Fraunces, serif" fontSize="19" fontWeight="600" fill="currentColor">G</text>
  </svg>
);

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emergencyContacts, setEmergencyContacts] = useState<any[]>([]);
  const [touristPlaces, setTouristPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactsRes, placesRes] = await Promise.all([
          axios.get(`${API_URL}/emergency-contacts`),
          axios.get(`${API_URL}/tourist-places`),
        ]);
        setEmergencyContacts(contactsRes.data);
        setTouristPlaces(placesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setEmergencyContacts([
          { id: 1, category: 'Police', name: 'Police', phone: '100' },
          { id: 2, category: 'Ambulance', name: 'Ambulance', phone: '108' },
          { id: 3, category: 'Fire', name: 'Fire Service', phone: '101' },
          { id: 4, category: 'Women', name: 'Women Helpline', phone: '1091' },
        ]);
        setTouristPlaces([
          { _id: 1, title: 'Jagannath Temple', description: 'Ancient temple with beautiful architecture', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=700&h=500&fit=crop' },
          { _id: 2, title: 'Tumma Waterfall', description: 'Serene waterfall surrounded by nature', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=700&h=500&fit=crop' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="min-h-screen pb-24"
      style={{
        background: '#FAF6EF',
        color: '#1E2521',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        .font-display { font-family: 'Fraunces', serif; }
        .font-mono-num { font-family: 'IBM Plex Mono', monospace; }
        .hairline { border-color: rgba(30,37,33,0.10); }
      `}</style>

      <Helmet>
        <title>My Gunupur - Your Gateway to Citizen Services in Gunupur, Odisha</title>
        <meta name="description" content="My Gunupur - Your gateway to citizen services, home loans, building approvals, emergency contacts, and local businesses in Gunupur, Odisha." />
        <meta property="og:title" content="My Gunupur - Citizen Services" />
        <meta property="og:description" content="My Gunupur - Your gateway to citizen services, home loans, building approvals, emergency contacts, and local businesses in Gunupur, Odisha." />
        <meta property="og:url" content="https://mygunupur.in/" />
      </Helmet>

      {/* Masthead */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b hairline"
        style={{ background: 'rgba(250,246,239,0.92)', backdropFilter: 'blur(10px)', height: '76px' }}
      >
        <div className="max-w-6xl mx-auto px-5 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Seal className="w-9 h-9" style={{ color: '#1B4D3E' }} />
            <div className="leading-tight">
              <h1 className="font-display text-[1.35rem] font-semibold tracking-tight" style={{ color: '#1B4D3E' }}>
                My Gunupur
              </h1>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]" style={{ color: '#8A7B5F' }}>
                Citizen Services Directory
              </p>
            </div>
          </div>
          <div
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border hairline"
            style={{ color: '#1B4D3E' }}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Municipal Info
          </div>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-5 space-y-16 pt-8">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden border hairline"
          style={{ borderRadius: '4px' }}
        >
          <div className="relative aspect-[4/3] md:aspect-[21/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlides[currentSlide].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <img
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].title}
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(0.85) contrast(1.02)' }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(0deg, rgba(20,24,21,0.92) 0%, rgba(20,24,21,0.45) 55%, rgba(20,24,21,0.1) 100%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-12">
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
                    <span
                      className="inline-block text-[0.7rem] font-semibold uppercase tracking-[0.14em] mb-4 pb-1 border-b"
                      style={{ color: '#E7A45C', borderColor: 'rgba(231,164,92,0.4)' }}
                    >
                      {heroSlides[currentSlide].eyebrow}
                    </span>
                    <h2 className="font-display text-[2.1rem] md:text-[3.1rem] font-medium text-white leading-[1.08] mb-3 max-w-2xl">
                      {heroSlides[currentSlide].title}
                    </h2>
                    <p className="text-white/75 text-base md:text-lg mb-7 max-w-lg">
                      {heroSlides[currentSlide].subtitle}
                    </p>
                    <button
                      onClick={() => heroSlides[currentSlide].path && navigate(heroSlides[currentSlide].path!)}
                      className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all duration-300 hover:gap-3"
                      style={{ background: '#BC5B2C', color: '#FAF6EF', borderRadius: '2px' }}
                    >
                      {heroSlides[currentSlide].cta}
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-6 right-6 z-20 hidden md:block" style={{ color: 'rgba(250,246,239,0.55)' }}>
              <Seal className="w-14 h-14" />
            </div>

            <div className="absolute bottom-7 right-7 md:right-12 z-20 flex gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className="h-[3px] transition-all duration-300"
                  style={{
                    width: index === currentSlide ? '28px' : '12px',
                    background: index === currentSlide ? '#E7A45C' : 'rgba(255,255,255,0.35)',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Quick Access — directory style */}
        <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}>
          <div className="flex items-baseline justify-between mb-6 border-b hairline pb-3">
            <h3 className="font-display text-2xl font-medium" style={{ color: '#1B4D3E' }}>Service Directory</h3>
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: '#8A7B5F' }}>
              {quickServices.length} listings
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(30,37,33,0.10)' }}>
            {quickServices.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => service.path && navigate(service.path)}
                className="group flex items-center gap-4 p-5 text-left transition-colors duration-300"
                style={{ background: '#FAF6EF' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#F2ECDF')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#FAF6EF')}
              >
                <span className="font-mono-num text-xs mt-1" style={{ color: '#BC5B2C' }}>{service.index}</span>
                <div
                  className="w-11 h-11 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                  style={{ background: '#1B4D3E', borderRadius: '2px' }}
                >
                  <service.icon className="w-5 h-5" style={{ color: '#FAF6EF' }} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[0.95rem] leading-tight" style={{ color: '#1E2521' }}>{service.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#8A7B5F' }}>{service.desc}</p>
                </div>
                <ArrowUpRight className="w-4 h-4 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#BC5B2C' }} />
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Emergency Contacts */}
        <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}>
          <div className="flex items-baseline justify-between mb-6 border-b hairline pb-3">
            <h3 className="font-display text-2xl font-medium" style={{ color: '#1B4D3E' }}>Emergency Lines</h3>
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: '#8A7B5F' }}>Active 24 × 7</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {loading
              ? [1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-5 border hairline animate-pulse" style={{ borderRadius: '3px' }}>
                    <div className="h-3 rounded w-1/2 mb-4" style={{ background: '#E8E1D3' }} />
                    <div className="h-7 rounded w-2/3" style={{ background: '#E8E1D3' }} />
                  </div>
                ))
              : emergencyContacts.map((contact, index) => (
                  <motion.a
                    key={contact._id || contact.id}
                    href={`tel:${contact.phone}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="group p-5 border hairline transition-colors duration-300"
                    style={{ borderRadius: '3px' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#BC5B2C')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(30,37,33,0.10)')}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#8A7B5F' }}>{contact.name}</p>
                      <AlertTriangle className="w-3.5 h-3.5" style={{ color: '#BC5B2C' }} />
                    </div>
                    <p className="font-mono-num text-2xl font-semibold" style={{ color: '#1E2521' }}>{contact.phone}</p>
                  </motion.a>
                ))}
          </div>
        </motion.section>

        {/* Explore Gunupur */}
        <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}>
          <div className="flex items-baseline justify-between mb-6 border-b hairline pb-3">
            <h3 className="font-display text-2xl font-medium" style={{ color: '#1B4D3E' }}>Places Worth Visiting</h3>
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: '#8A7B5F' }}>Curated</span>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory">
            {loading
              ? [1, 2, 3].map((i) => (
                  <div key={i} className="flex-shrink-0 w-80 snap-start border hairline animate-pulse" style={{ borderRadius: '3px' }}>
                    <div className="aspect-[4/3]" style={{ background: '#E8E1D3' }} />
                    <div className="p-5">
                      <div className="h-4 rounded w-2/3 mb-3" style={{ background: '#E8E1D3' }} />
                      <div className="h-3 rounded w-1/2" style={{ background: '#E8E1D3' }} />
                    </div>
                  </div>
                ))
              : touristPlaces.map((place, index) => (
                  <motion.div
                    key={place._id || place.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="flex-shrink-0 w-80 snap-start border hairline overflow-hidden group"
                    style={{ borderRadius: '3px' }}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={place.image}
                        alt={place.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ filter: 'saturate(0.9)' }}
                      />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(20,24,21,0.75) 0%, transparent 55%)' }} />
                      <h4 className="font-display absolute bottom-4 left-5 right-5 text-xl font-medium text-white">{place.title}</h4>
                    </div>
                    <div className="p-5">
                      <p className="text-sm leading-relaxed mb-4" style={{ color: '#5B6560' }}>{place.description}</p>
                      <div className="flex items-center gap-4">
                        {place.googleMap && (
                          <button
                            onClick={() => window.open(place.googleMap, '_blank')}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold"
                            style={{ color: '#1B4D3E' }}
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            Open in Maps
                          </button>
                        )}
                        <button className="inline-flex items-center gap-1.5 text-sm font-semibold ml-auto" style={{ color: '#BC5B2C' }}>
                          View Details
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>
        </motion.section>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-5 flex flex-col gap-3 z-40">
        <motion.a
          href="https://wa.me/919437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="w-14 h-14 flex items-center justify-center shadow-lg"
          style={{ background: '#25D366', borderRadius: '3px' }}
          dangerouslySetInnerHTML={{ __html: whatsappLogo }}
        />
        <motion.a
          href="tel:9437578310"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, type: 'spring' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="w-14 h-14 flex items-center justify-center shadow-lg"
          style={{ background: '#1B4D3E', borderRadius: '3px' }}
        >
          <Phone className="w-5 h-5" style={{ color: '#FAF6EF' }} />
        </motion.a>
      </div>
    </div>
  );
};

export default Home;