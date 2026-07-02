import React, { useState } from 'react';
import { User as UserIcon, Activity, Key, Clock, ShieldCheck, Database, RefreshCw, Eye, EyeOff } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
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
    { name: 'EU_AI_Act_Final_Text.pdf', date: '10m ago', size: '2.4 MB', status: 'Completed' },
    { name: 'NIST_RMF_Guidelines.pdf', date: '2h ago', size: '1.2 MB', status: 'Completed' },
    { name: 'India_AI_Mission_Draft.docx', date: '1d ago', size: '750 KB', status: 'Completed' }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(rawApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-20" id="profile-page">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <UserIcon className="h-7 w-7 text-brand-primary" /> {user?.role === 'admin' ? 'Admin Profile' : 'User Profile'} & API Management
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Monitor your research compute quota, retrieve developer tokens, and view historic upload trails.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Admin Card & Usage Status (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Main User Card */}
          <GlassCard hoverEffect={false} className="p-6 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="absolute top-0 right-0 w-44 h-44 radial-glow-2 opacity-25 pointer-events-none -z-10" />
            
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-brand-primary/20 ring-4 ring-white/10 shrink-0">
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-white">{user?.username}</h2>
                <span className="text-xs text-slate-400 block mt-0.5">{user?.username}@example.com</span>
                <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${user?.role === 'admin' ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-accent' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
                  {user?.role === 'admin' ? 'SUPER USER (ADMIN)' : 'STANDARD USER'}
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block">Workspace Cluster</span>
              <span className="text-sm font-mono font-bold text-white block mt-0.5">Cloud Run (Tokyo Edge)</span>
              <span className="text-[10px] text-emerald-400 font-semibold block mt-1">● System Online</span>
            </div>
          </GlassCard>

          {/* Compute Quotas */}
          <GlassCard hoverEffect={false} className="p-6 space-y-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="h-4 w-4 text-brand-secondary" /> Compute Quotas & Volumes
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
                <Key className="h-4.5 w-4.5 text-brand-accent" /> Developer API Secrets
              </h3>
              <span className="text-[10px] text-slate-500">v1 API Access Token</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Use this secret token to query parsed policies programmatically from terminal commands or Python ML notebooks.
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
                title={apiKeyVisible ? 'Hide Token' : 'Reveal Token'}
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
                <Clock className="h-4 w-4 text-brand-primary" /> Historic Logs
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
              <button 
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 font-semibold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-1.5"
                onClick={() => setApiKeyVisible(false)}
              >
                <Database className="h-3.5 w-3.5" /> Clean workspace cache
              </button>
            </div>
          </GlassCard>

        </div>

      </div>
    </div>
  );
}
