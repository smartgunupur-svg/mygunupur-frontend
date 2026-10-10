import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  PlusCircle,
  Settings,
  LogOut,
  Calendar,
  AlertTriangle,
  User,
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const OwnerLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('ownerToken');
    if (!token) {
      navigate('/owner/login');
      return;
    }

    const fetchOwner = async () => {
      try {
        const res = await axios.get(`${API_URL}/owner/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);

        // If must change password and not already on change-password page
        if (res.data.mustChangePassword && location.pathname !== '/owner/change-password') {
          navigate('/owner/change-password');
        }
      } catch (err: any) {
        console.error('Owner auth check error:', err);
        localStorage.removeItem('ownerToken');
        localStorage.removeItem('ownerUser');
        navigate('/owner/login');
      } finally {
        setLoading(false);
      }
    };

    fetchOwner();
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('ownerToken');
    localStorage.removeItem('ownerUser');
    navigate('/owner/login');
  };

  const navItems = [
    { title: 'Dashboard', path: '/owner/dashboard', icon: LayoutDashboard },
    { title: 'My Properties', path: '/owner/properties', icon: Home },
    { title: 'Add Property', path: '/owner/properties/new', icon: PlusCircle },
    { title: 'Settings', path: '/owner/settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Calculate days to renewal
  let renewalBadge = null;
  if (profile?.renewalDueDate) {
    const dueDate = new Date(profile.renewalDueDate);
    const now = new Date();
    const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      renewalBadge = (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-100 text-red-700 text-[11px] font-bold rounded-lg">
          <AlertTriangle className="w-3.5 h-3.5" /> Renewal Overdue
        </span>
      );
    } else if (diffDays <= 30) {
      renewalBadge = (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-700 text-[11px] font-bold rounded-lg">
          <Calendar className="w-3.5 h-3.5" /> Renewal Due in {diffDays}d
        </span>
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/owner/dashboard')}>
            <img src="/logo.png" alt="My Gunupur" className="h-10 w-10 object-contain rounded-xl shadow-sm" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-blue-900 leading-none">MY GUNUPUR</h1>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-extrabold rounded-md">
                  OWNER
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Rental Property Portal</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border border-blue-100 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.title}
                </button>
              );
            })}
          </nav>

          {/* Right User Bar */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">{renewalBadge}</div>

            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                {profile?.name ? profile.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">{profile?.name || 'Owner'}</p>
                <p className="text-[10px] text-slate-500 font-medium leading-none">{profile?.phone}</p>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 pb-24 md:pb-8">
        <Outlet />
      </main>

      {/* Mobile Sticky Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg md:hidden">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive ? 'text-blue-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px]">{item.title}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default OwnerLayout;
