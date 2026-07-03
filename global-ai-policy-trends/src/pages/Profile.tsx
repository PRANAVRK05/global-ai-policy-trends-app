import React, { useState } from 'react';
import { User as UserIcon, Activity, Key, Clock, ShieldCheck, Database, Eye, EyeOff, Settings, Bell, Globe, Briefcase, Calendar, FileText, Bookmark, Search, Lock, Trash2, Layout } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8 pb-20" id="profile-page">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <UserIcon className="h-7 w-7 text-brand-primary" /> {user?.role === 'admin' ? 'Administrator Portal' : 'Welcome to Polaris AI'}
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {user?.role === 'admin' ? 'Manage system configuration, monitor quotas, and oversee deployment.' : 'Manage your personal profile, saved reports, and preferences.'}
        </p>
      </div>

      {user?.role === 'admin' ? <AdminProfile /> : <UserProfile />}
    </div>
  );
}

function AdminProfile() {
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();

  const rawApiKey = 'sk_policy_live_839a2f1c304f5e7a9b08f';

  const usageStats = [
    { label: 'Analyses Run This Month', val: '84 / 1,000', progress: 8.4, color: 'bg-brand-primary' },
    { label: 'Sovereign Compute Storage', val: '42.6 MB / 500 MB', progress: 8.52, color: 'bg-brand-secondary' },
    { label: 'API Keys In Use', val: '2 active keys', progress: 40, color: 'bg-brand-accent' }
  ];

  const recentUploads = [
    { name: 'System Event Log (Auth)', date: '10m ago', size: '2.4 MB', status: 'Audited' },
    { name: 'Server Monitoring Dump', date: '2h ago', size: '1.2 MB', status: 'Completed' },
    { name: 'API Usage Export', date: '1d ago', size: '750 KB', status: 'Completed' }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(rawApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT COLUMN: Admin Card & Usage Status (8 cols) */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Main User Card */}
        <GlassCard hoverEffect={false} className="p-6 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-red-500/20">
          <div className="absolute top-0 right-0 w-44 h-44 bg-red-500/20 blur-[60px] pointer-events-none -z-10" />
          
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-red-500 to-rose-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-red-500/20 ring-4 ring-white/10 shrink-0">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-white">{user?.username}</h2>
              <span className="text-xs text-slate-400 block mt-0.5">{user?.username}@admin.polaris.ai</span>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold border bg-red-500/10 border-red-500/20 text-red-400">
                SYSTEM ADMINISTRATOR
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 block">Cloud Runtime</span>
            <span className="text-sm font-mono font-bold text-white block mt-0.5">Enterprise Cloud (Global)</span>
            <span className="text-[10px] text-emerald-400 font-semibold block mt-1">● Deployment Status: Healthy</span>
          </div>
        </GlassCard>

        {/* Compute Quotas */}
        <GlassCard hoverEffect={false} className="p-6 space-y-5">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <Activity className="h-4 w-4 text-brand-secondary" /> Compute Quotas & Volume Limits
          </h3>

          <div className="grid gap-4.5">
            {usageStats.map((stat) => (
              <div key={stat.label} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">{stat.label}</span>
                  <strong className="text-white font-mono">{stat.val}</strong>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${stat.color} rounded-full`} 
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Developer API credentials */}
        <GlassCard hoverEffect={false} className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Key className="h-4.5 w-4.5 text-brand-accent" /> Developer API & Secret Tokens
            </h3>
            <span className="text-[10px] text-slate-500">v1 API Access Token</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Use this secret token to manage workspace configuration and model parameters programmatically. Do not share this token.
          </p>

          <div className="flex items-center gap-2 bg-brand-dark/80 border border-white/10 rounded-xl p-2.5 text-xs text-white">
            <Key className="h-4 w-4 text-slate-500 shrink-0" />
            <input 
              type={apiKeyVisible ? 'text' : 'password'} 
              value={rawApiKey} 
              readOnly 
              className="w-full bg-transparent border-0 outline-none ring-0 font-mono text-slate-300"
            />
            <button 
              onClick={() => setApiKeyVisible(!apiKeyVisible)} 
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors"
            >
              {apiKeyVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
            <button 
              onClick={handleCopy}
              className="bg-brand-primary/20 border border-brand-primary/30 text-brand-accent font-semibold px-3 py-1 rounded-lg hover:bg-brand-primary/30 transition-all font-mono"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </GlassCard>
      </div>

      {/* RIGHT COLUMN: Recent uploads & Trail (4 cols) */}
      <div className="lg:col-span-4 space-y-6">
        {/* Recent Upload Log */}
        <GlassCard hoverEffect={false} className="p-5 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
              <Clock className="h-4 w-4 text-red-400" /> Audit Activity & Logs
            </h3>

            <div className="grid gap-3.5">
              {recentUploads.map((log) => (
                <div key={log.name} className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex justify-between items-start gap-1">
                    <span className="font-semibold text-white text-xs truncate max-w-[150px]">{log.name}</span>
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-0.5 shrink-0">
                      <ShieldCheck className="h-3 w-3" /> {log.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
                    <span>{log.size}</span>
                    <span>{log.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-semibold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-1.5">
              <Database className="h-3.5 w-3.5" /> Clear System Cache
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function UserProfile() {
  const { user } = useAuth();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT COLUMN: Main info and stats */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Profile Card */}
        <GlassCard hoverEffect={false} className="p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-brand-primary/10 blur-[60px] pointer-events-none -z-10" />
          
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-brand-accent to-brand-primary text-[#020617] font-extrabold text-4xl flex items-center justify-center shadow-lg shadow-brand-primary/20 ring-4 ring-white/10 shrink-0">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-display font-bold text-white">{user?.username}</h2>
              <p className="text-sm text-slate-400">{user?.username}@example.com</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1 mb-1"><Briefcase className="w-3 h-3" /> Organization</div>
                  <div className="text-sm font-medium text-white">Acme Corp</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1 mb-1"><UserIcon className="w-3 h-3" /> Occupation</div>
                  <div className="text-sm font-medium text-white">Policy Analyst</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1 mb-1"><Globe className="w-3 h-3" /> Country</div>
                  <div className="text-sm font-medium text-white">United States</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1 mb-1"><Calendar className="w-3 h-3" /> Joined Date</div>
                  <div className="text-sm font-medium text-white">March 2024</div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Activity & Collections */}
        <div className="grid sm:grid-cols-2 gap-6">
          <GlassCard hoverEffect={false} className="p-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <FileText className="h-4 w-4 text-brand-primary" /> Recent Uploaded Documents
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-slate-300 flex justify-between"><span>EU_AI_Act.pdf</span> <span className="text-xs text-slate-500">2d ago</span></li>
              <li className="text-sm text-slate-300 flex justify-between"><span>NIST_Guidelines.pdf</span> <span className="text-xs text-slate-500">1w ago</span></li>
            </ul>
          </GlassCard>

          <GlassCard hoverEffect={false} className="p-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 text-brand-accent" /> Recent Analyses
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-slate-300 flex justify-between"><span>Singapore Model Governance</span> <span className="text-xs text-slate-500">3d ago</span></li>
              <li className="text-sm text-slate-300 flex justify-between"><span>UK AI Strategy 2024</span> <span className="text-xs text-slate-500">1w ago</span></li>
            </ul>
          </GlassCard>
          
          <GlassCard hoverEffect={false} className="p-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <Bookmark className="h-4 w-4 text-emerald-400" /> Bookmarks & Favourites
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-slate-300">EU AI Act (Title III)</li>
              <li className="text-sm text-slate-300">White House Executive Order</li>
            </ul>
          </GlassCard>

          <GlassCard hoverEffect={false} className="p-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <Search className="h-4 w-4 text-purple-400" /> Recent Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">Data Privacy</span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">Generative AI</span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">Copyright</span>
            </div>
          </GlassCard>
        </div>
        
        <GlassCard hoverEffect={false} className="p-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
            <Clock className="h-4 w-4 text-brand-secondary" /> Activity Timeline
          </h3>
          <div className="space-y-4 border-l-2 border-white/10 ml-2 pl-4">
            <div className="relative">
              <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-brand-primary"></div>
              <p className="text-sm text-white">Generated EU Compliance Report</p>
              <p className="text-xs text-slate-500">Today at 10:45 AM</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-brand-accent"></div>
              <p className="text-sm text-white">Uploaded NIST AI RMF for Analysis</p>
              <p className="text-xs text-slate-500">Yesterday at 2:15 PM</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* RIGHT COLUMN: Settings */}
      <div className="lg:col-span-4 space-y-6">
        <GlassCard hoverEffect={false} className="p-6 space-y-6">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-3">
            <Settings className="h-4 w-4 text-slate-400" /> Preferences & Settings
          </h3>
          
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-left">
              <div className="flex items-center gap-3">
                <Layout className="w-4 h-4 text-brand-primary" />
                <span className="text-sm text-slate-200">Theme</span>
              </div>
              <span className="text-xs text-slate-500">Dark Mode</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-left">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-brand-secondary" />
                <span className="text-sm text-slate-200">Language</span>
              </div>
              <span className="text-xs text-slate-500">English (US)</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-left">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-slate-200">Notification Preferences</span>
              </div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-left">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-brand-accent" />
                <span className="text-sm text-slate-200">Privacy Settings</span>
              </div>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-left">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-slate-200">Change Password</span>
              </div>
            </button>
          </div>

          <div className="pt-4 border-t border-white/5">
            <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors">
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Delete Account</span>
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
