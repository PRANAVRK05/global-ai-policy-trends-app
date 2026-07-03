import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  ChevronDown, 
  FileSearch, 
  Brain, 
  BarChart3, 
  FileText, 
  UploadCloud, 
  TrendingUp, 
  BookOpen, 
  Info, 
  Bell, 
  User, 
  Menu, 
  X, 
  Sparkles,
  Settings,
  ShieldCheck,
  Activity
} from 'lucide-react';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 'n-1', text: 'New analysis ready: Singapore Model AI Governance v2', time: '10m ago', unread: true },
    { id: 'n-2', text: 'EU AI Act compliance timeline updated', time: '1h ago', unread: true },
    { id: 'n-3', text: 'Weekly AI Policy forecast report generated', time: '1d ago', unread: false }
  ]);
  
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);
  const closeDropdowns = () => {
    setIsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsNotificationsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const hasUnread = notifications.some(n => n.unread);
  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const isActive = (path: string) => location.pathname === path;
  const isAnalysisActive = () => [
    '/analysis', 
    '/sentiment', 
    '/analytics', 
    '/reports'
  ].some(path => location.pathname === path);

  const dropdownItems = [
    {
      to: '/analysis',
      title: 'Policy Analysis',
      desc: 'Analyze uploaded AI policy documents.',
      icon: FileSearch,
      color: 'text-blue-400 bg-blue-500/10'
    },
    {
      to: '/sentiment',
      title: 'Sentiment Analysis',
      desc: 'AI-powered sentiment detection.',
      icon: Brain,
      color: 'text-indigo-400 bg-indigo-500/10'
    },
    {
      to: '/analytics',
      title: 'Analytics Dashboard',
      desc: 'Interactive visualizations.',
      icon: BarChart3,
      color: 'text-cyan-400 bg-cyan-500/10'
    },
    {
      to: '/reports',
      title: 'Reports',
      desc: 'Generate downloadable reports.',
      icon: FileText,
      color: 'text-purple-400 bg-purple-500/10'
    }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 rounded-b-2xl shadow-lg shadow-black/40" id="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" onClick={closeDropdowns} className="flex items-center space-x-3 group" id="nav-logo">
            <div className="relative p-2 bg-white/5 rounded-2xl border border-white/10 shadow-lg shadow-black/20 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/polaris-logo.png"
                alt="Polaris logo"
                className="h-10 w-10 rounded-xl"
              />
            </div>
            <span className="font-display font-bold tracking-tight text-white text-lg sm:text-xl flex flex-col leading-tight">
              <span>Polaris</span>
              <span className="text-brand-accent font-sans font-medium text-xs uppercase tracking-[0.24em] bg-brand-primary/10 px-2 py-0.5 rounded-full border border-brand-primary/20 mt-1">
                AI Policy Trends
              </span>
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1" id="nav-desktop-links">
            
            <Link 
              to="/" 
              onClick={closeDropdowns}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/') ? 'text-brand-accent bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>

            {/* Analysis Dropdown Trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-1 ${
                  isAnalysisActive() ? 'text-brand-accent bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Analysis</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="absolute left-0 mt-2 w-80 rounded-2xl bg-[#020617]/95 backdrop-blur-xl glow-blue border border-white/10 p-2 shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 radial-glow-1 opacity-50 -z-10" />
                    <div className="px-3 py-2 border-b border-white/5">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-brand-accent" /> AI Analytics Suite
                      </p>
                    </div>
                    <div className="grid gap-1 mt-1">
                      {dropdownItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={closeDropdowns}
                            className={`flex items-start gap-3 p-2.5 rounded-xl transition-all hover:bg-white/5 ${
                              isActive(item.to) ? 'bg-brand-primary/10 border border-brand-primary/20' : 'border border-transparent'
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${item.color}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-white">{item.title}</div>
                              <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/forecasting" 
              onClick={closeDropdowns}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                isActive('/forecasting') ? 'text-brand-accent bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingUp className="h-4 w-4 text-brand-accent" />
              Trends & Forecasting
            </Link>

            <Link 
              to="/upload" 
              onClick={closeDropdowns}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                isActive('/upload') ? 'text-brand-accent bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <UploadCloud className="h-4 w-4 text-brand-secondary" />
              Upload Data
            </Link>

            {isAdmin && (
              <Link 
                to="/documentation" 
                onClick={closeDropdowns}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive('/documentation') ? 'text-brand-accent bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <BookOpen className="h-4 w-4 text-emerald-400" />
                Documentation
              </Link>
            )}

            <Link 
              to="/about" 
              onClick={closeDropdowns}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive('/about') ? 'text-brand-accent bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              About
            </Link>
          </div>

          {/* Right Toolbar Controls */}
          <div className="hidden sm:flex items-center space-x-3" id="nav-toolbar">
            
            {/* Notification bell and drawer */}
            <div className="relative">
              <button 
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsDropdownOpen(false);
                }}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all relative border border-white/5"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {hasUnread && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-accent animate-ping" />
                )}
                {hasUnread && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-accent" />
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0B1121]/95 backdrop-blur-2xl border border-white/10 p-3 shadow-2xl z-50 glow-indigo">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-2">
                      <span className="text-xs font-semibold text-white">Notifications</span>
                      <button 
                        onClick={markAllRead} 
                        className="text-[10px] text-brand-accent hover:underline uppercase tracking-wider font-bold"
                      >
                        Mark all read
                      </button>
                    </div>
                    <div className="grid gap-2 max-h-60 overflow-y-auto pr-1">
                      {notifications.map(n => (
                        <div key={n.id} className={`p-2 rounded-xl text-xs transition-colors ${n.unread ? 'bg-white/5 border border-white/10' : 'text-slate-400'}`}>
                          <div className="flex items-start justify-between gap-1">
                            <span className={n.unread ? 'text-white font-medium' : 'text-slate-400'}>{n.text}</span>
                            {n.unread && <span className="h-1.5 w-1.5 bg-brand-accent rounded-full mt-1 shrink-0" />}
                          </div>
                          <span className="text-[10px] text-slate-500 block mt-1">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Admin Panel Link */}
            {isAdmin && (
              <Link 
                to="/admin" 
                onClick={closeDropdowns}
                className={`p-2 rounded-xl transition-all ${
                  isActive('/admin') ? 'text-brand-accent bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                title="Admin Panel"
              >
                <div className="flex items-center gap-1.5 px-2 font-medium">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs">Admin</span>
                </div>
              </Link>
            )}

            {/* Profile trigger / Login */}
            {isAuthenticated ? (
              <div className="relative" ref={profileDropdownRef}>
                <button 
                  onClick={toggleProfileDropdown}
                  className={`p-1 pl-1.5 pr-3 rounded-full border transition-all flex items-center gap-2 ${
                    isActive('/profile') || isProfileDropdownOpen ? 'border-brand-accent bg-brand-accent/10 text-white' : 'border-white/10 bg-white/5 hover:border-white/30 text-slate-300'
                  }`}
                >
                  <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold text-xs ring-1 ring-white/20">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium max-w-[80px] truncate">{user?.username}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0B1121]/95 backdrop-blur-xl border border-white/10 p-2 shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="px-3 py-2 border-b border-white/5 mb-1">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{isAdmin ? 'Admin Menu' : 'User Menu'}</p>
                      </div>
                      
                      {isAdmin ? (
                        <>
                          <Link to="/admin" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><ShieldCheck className="h-4 w-4 text-red-400" /> Admin Console</Link>
                          <Link to="/admin" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><User className="h-4 w-4" /> Users</Link>
                          <Link to="/admin" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><Activity className="h-4 w-4" /> Monitoring & Logs</Link>
                          <Link to="/documentation" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><BookOpen className="h-4 w-4" /> Documentation</Link>
                          <Link to="/profile" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><Settings className="h-4 w-4" /> API Management & Profile</Link>
                        </>
                      ) : (
                        <>
                          <Link to="/profile" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><User className="h-4 w-4 text-brand-primary" /> My Profile</Link>
                          <Link to="/upload" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><UploadCloud className="h-4 w-4" /> My Uploads</Link>
                          <Link to="/reports" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><FileText className="h-4 w-4" /> Saved Reports</Link>
                          <Link to="/profile" onClick={closeDropdowns} className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><Settings className="h-4 w-4" /> Settings</Link>
                        </>
                      )}
                      
                      <div className="pt-1 mt-1 border-t border-white/5">
                        <button onClick={() => { logout(); closeDropdowns(); }} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left">
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-xl hover:bg-white/5 transition-all">Sign In</Link>
                <Link to="/register" className="text-xs font-medium bg-brand-accent text-[#020617] px-4 py-2 rounded-xl hover:opacity-90 transition-opacity">Register</Link>
              </div>
            )}
          </div>

          {/* Hamburger button */}
          <div className="flex lg:hidden items-center" id="nav-hamburger">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-white/5 transition-all"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden glass-panel border-t border-white/5 px-4 pt-2 pb-6 space-y-1 overflow-hidden"
          >
            <div className="py-2 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Menu</span>
              <div className="flex gap-2">
                <Link to="/profile" onClick={closeDropdowns} className="p-1 px-2.5 rounded-full border border-white/10 bg-white/5 text-xs text-slate-300 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-brand-accent" /> Profile
                </Link>
                <Link to="/settings" onClick={closeDropdowns} className="p-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-slate-300">
                  <Settings className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <Link
              to="/"
              onClick={closeDropdowns}
              className={`block px-3 py-2 rounded-xl text-base font-medium ${
                isActive('/') ? 'text-brand-accent bg-white/5' : 'text-slate-300'
              }`}
            >
              Home
            </Link>

            <div className="pt-2">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Analysis Views</p>
              {dropdownItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeDropdowns}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-base font-medium ${
                    isActive(item.to) ? 'text-brand-accent bg-brand-primary/10' : 'text-slate-300'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-white/5">
              <Link
                to="/forecasting"
                onClick={closeDropdowns}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-base font-medium ${
                  isActive('/forecasting') ? 'text-brand-accent bg-white/5' : 'text-slate-300'
                }`}
              >
                <TrendingUp className="h-4 w-4 text-brand-accent" />
                <span>Trends & Forecasting</span>
              </Link>

              <Link
                to="/upload"
                onClick={closeDropdowns}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-base font-medium ${
                  isActive('/upload') ? 'text-brand-accent bg-white/5' : 'text-slate-300'
                }`}
              >
                <UploadCloud className="h-4 w-4 text-brand-secondary" />
                <span>Upload Data</span>
              </Link>

              {isAdmin && (
                <Link
                  to="/documentation"
                  onClick={closeDropdowns}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-base font-medium ${
                    isActive('/documentation') ? 'text-brand-accent bg-white/5' : 'text-slate-300'
                  }`}
                >
                  <BookOpen className="h-4 w-4 text-emerald-400" />
                  <span>Documentation</span>
                </Link>
              )}

              <Link
                to="/about"
                onClick={closeDropdowns}
                className={`block px-3 py-2 rounded-xl text-base font-medium ${
                  isActive('/about') ? 'text-brand-accent bg-white/5' : 'text-slate-300'
                }`}
              >
                About
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
