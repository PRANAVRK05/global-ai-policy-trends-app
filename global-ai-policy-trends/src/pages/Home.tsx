import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Search, 
  Mic, 
  Sparkles, 
  FileSearch, 
  Layers, 
  Brain, 
  TrendingUp, 
  BarChart3, 
  Cpu, 
  ArrowRight, 
  ChevronRight, 
  Plus, 
  FileText,
  Clock,
  ShieldCheck
} from 'lucide-react';

import { initialPolicies, statsData, popularChips } from '../data';
import { fetchStats, fetchPolicies } from '../services/api';
import { PolicyDocument, StatItem } from '../types';
import StatCard from '../components/StatCard';
import GlassCard from '../components/GlassCard';

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const [stats, setStats] = useState<StatItem[]>(statsData);
  const [policies, setPolicies] = useState<PolicyDocument[]>(initialPolicies);

  useEffect(() => {
    async function loadData() {
      const statsRes = await fetchStats();
      setStats(statsRes);
      const policiesRes = await fetchPolicies();
      setPolicies(policiesRes);
    }
    loadData();
  }, []);

  // Filter policies based on search query or selected chip
  const filteredPolicies = policies.filter(policy => {
    const query = (activeChip || searchQuery).toLowerCase();
    if (!query) return true;
    return (
      policy.title.toLowerCase().includes(query) ||
      policy.country.toLowerCase().includes(query) ||
      policy.topics.some(t => t.toLowerCase().includes(query)) ||
      policy.keywords.some(k => k.toLowerCase().includes(query))
    );
  });

  const handleChipClick = (chip: string) => {
    if (activeChip === chip) {
      setActiveChip(null);
      setSearchQuery('');
    } else {
      setActiveChip(chip);
      setSearchQuery(chip);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      // Navigate to search outcomes or just let them filter live
      setActiveChip(null);
    }
  };

  // Six visual features configuration
  const features = [
    {
      title: 'AI Document Analysis',
      desc: 'Deep parsing of policy files extracting clauses, exceptions, risk markers, and summaries automatically.',
      icon: FileSearch,
      color: 'text-blue-400 bg-blue-500/10'
    },
    {
      title: 'Country Comparison',
      desc: 'Side-by-side assessment of regulatory burdens, safety standards, and compliance penalties globally.',
      icon: Layers,
      color: 'text-indigo-400 bg-indigo-500/10'
    },
    {
      title: 'Sentiment Analysis',
      desc: 'Automated linguistic detection indicating whether a governance draft is restrictive, neutral, or supportive.',
      icon: Brain,
      color: 'text-purple-400 bg-purple-500/10'
    },
    {
      title: 'Policy Forecasting',
      desc: 'Machine-learning models projecting regulatory tightening cycles, standardizations, and trends out to 2030.',
      icon: TrendingUp,
      color: 'text-cyan-400 bg-cyan-500/10'
    },
    {
      title: 'Interactive Dashboard',
      desc: 'Vibrant charts, radar matrices, and map analytics visualizing national capabilities and compliance rates.',
      icon: BarChart3,
      color: 'text-emerald-400 bg-emerald-500/10'
    },
    {
      title: 'AI Recommendations',
      desc: 'Targeted corporate guidelines recommending strategic adjustments to maintain alignment with international rules.',
      icon: Cpu,
      color: 'text-rose-400 bg-rose-500/10'
    }
  ];

  return (
    <div className="space-y-16 pb-20 relative" id="home-page">
      {/* Dynamic Background Mesh */}
      <div className="absolute top-0 left-0 w-full h-[600px] grid-bg opacity-30 -z-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] radial-glow-1 opacity-20 -z-20 pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] radial-glow-2 opacity-15 -z-20 pointer-events-none animate-pulse-slow" />

      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-16 text-center max-w-5xl mx-auto px-4" id="hero-section">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-8 inline-flex items-center justify-center gap-4 rounded-3xl bg-white/5 border border-white/10 px-4 py-3 shadow-xl shadow-black/10"
        >
          <img src="/polaris-logo.png" alt="Polaris logo" className="h-12 w-12 rounded-2xl object-contain bg-white/5 p-1" />
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-brand-accent font-semibold">Powered by Polaris AI</p>
            <p className="text-sm text-slate-300 mt-1">AI governance insights for global policy teams</p>
          </div>
        </motion.div>

        {/* Animated Pill Tag */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-accent/30 bg-brand-primary/10 text-xs text-brand-accent font-semibold tracking-wider uppercase mb-8"
        >
          <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Next-Gen Machine Learning Platform</span>
        </motion.div>

        {/* Hero Headings */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight leading-none"
        >
          Global AI Policy <br />
          <span className="text-gradient font-extrabold">Trends Dashboard</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto mt-6 leading-relaxed"
        >
          AI-powered platform for analyzing, comparing, forecasting, and visualizing global AI governance policies.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <button 
            onClick={() => navigate('/analytics')}
            className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg glow-blue hover:scale-[1.03] transition-all flex items-center gap-2"
          >
            Explore Dashboard <ArrowRight className="h-4 w-4" />
          </button>
          <button 
            onClick={() => navigate('/upload')}
            className="px-6 py-3 rounded-xl font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center gap-2 transition-all hover:border-white/30"
          >
            Upload Documents <Plus className="h-4 w-4 text-brand-accent" />
          </button>
        </motion.div>

        {/* 2. SEARCH BOX (approx 65% down hero area) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 w-full max-w-3xl mx-auto"
        >
          <form onSubmit={handleSearchSubmit} className="relative flex items-center p-1.5 glass-panel rounded-2xl border border-white/10 glow-blue">
            <div className="pl-3.5 text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search policies, countries, regulations, organizations..." 
              className="w-full bg-transparent border-0 outline-0 ring-0 text-white placeholder-slate-400 text-sm sm:text-base px-3 py-2"
            />

            <div className="flex items-center gap-1.5 pr-1.5">
              <button 
                type="button"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors hidden sm:block"
                title="Voice Search"
              >
                <Mic className="h-4 w-4" />
              </button>
              <button 
                type="button"
                className="p-1.5 text-brand-accent hover:text-white hover:bg-brand-primary/10 rounded-lg transition-colors hidden sm:block"
                title="AI Sparkle Assist"
              >
                <Sparkles className="h-4 w-4" />
              </button>
              <button 
                type="submit"
                className="bg-brand-primary hover:bg-blue-600 text-white px-4 py-1.5 rounded-xl font-semibold text-sm transition-all shadow-md"
              >
                Search
              </button>
            </div>
          </form>

          {/* Popular search chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="text-slate-400 font-medium mr-1">Popular:</span>
            {popularChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className={`px-3 py-1 rounded-full border transition-all duration-300 ${
                  activeChip === chip 
                    ? 'bg-brand-accent/20 border-brand-accent text-white font-semibold glow-cyan' 
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Live Filtering Output (If user clicked chip/searched) */}
      {searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard hoverEffect={false} glowColor="cyan" className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand-accent" /> Search Results for "{searchQuery}"
              </h2>
              <span className="text-xs bg-white/5 border border-white/15 text-slate-300 px-2 py-0.5 rounded-full">
                {filteredPolicies.length} matches
              </span>
            </div>
            
            {filteredPolicies.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">
                No matching regulations found in initial registry. Try querying different countries or "Act".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPolicies.map((p) => (
                  <GlassCard 
                    key={p.id} 
                    onClick={() => navigate('/analysis', { state: { selectedPolicyId: p.id } })}
                    className="p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] text-brand-accent font-semibold uppercase tracking-wider bg-brand-primary/10 px-2 py-0.5 rounded-full border border-brand-primary/20">
                          {p.country}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{p.year}</span>
                      </div>
                      <h3 className="font-semibold text-white text-sm mt-2 line-clamp-1 group-hover:text-brand-accent">{p.title}</h3>
                      <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">{p.summary}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-[10px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        Risk Score: <strong className="text-rose-400 font-mono">{p.riskScore}</strong>
                      </span>
                      <span className="text-brand-accent flex items-center gap-1 font-semibold hover:underline">
                        Launch Analysis <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
          </GlassCard>
        </section>
      )}

      {/* 3. QUICK STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="quick-statistics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              change={stat.change}
              isPositive={stat.isPositive}
              iconName={stat.iconName}
            />
          ))}
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="features-section">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-display font-bold text-white tracking-tight">
            Engineered for Policy Analytics
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Advanced neural networks and semantic graphs driving complete coverage of global governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <GlassCard hoverEffect={true} glowColor="indigo" className="h-full flex flex-col justify-between">
                  <div>
                    <div className={`p-3 rounded-2xl w-fit ${feature.color} border border-white/5`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mt-4">{feature.title}</h3>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">{feature.desc}</p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-brand-primary group hover:text-brand-accent cursor-pointer">
                    <span>Learn capability</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. LATEST POLICY INSIGHTS TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="latest-insights">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-display font-bold text-white tracking-tight">
              Latest Policy Insights
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Timeline of recent regulatory drafts, adoptions, and updates reviewed by our models.
            </p>
          </div>
          <button 
            onClick={() => navigate('/analysis')}
            className="text-xs font-bold text-brand-accent bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 transition-all uppercase tracking-wider flex items-center gap-1.5"
          >
            Review all guidelines <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="relative border-l border-white/10 pl-6 sm:pl-10 space-y-8 ml-4">
          {initialPolicies.map((p, index) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className={`absolute -left-[35px] sm:-left-[51px] top-1.5 h-6 w-6 rounded-full border-4 border-brand-dark flex items-center justify-center ${
                p.status === 'Adopted' 
                  ? 'bg-emerald-400 glow-cyan' 
                  : p.status === 'Under Review' 
                  ? 'bg-amber-400' 
                  : 'bg-brand-primary'
              }`} />

              <GlassCard hoverEffect={true} glowColor="indigo" className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/5 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-brand-accent bg-brand-primary/10 border border-brand-primary/20 px-2 py-0.5 rounded-full">
                      {p.country}
                    </span>
                    <span className="text-slate-500 text-xs flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {p.year}
                    </span>
                  </div>
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    p.status === 'Adopted' 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                      : p.status === 'Proposed' 
                      ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary' 
                      : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                  }`}>
                    {p.status}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">{p.summary}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.topics.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] bg-white/5 text-slate-300 px-2.5 py-0.5 rounded-md border border-white/5">
                      {t}
                    </span>
                  ))}
                  {p.keywords.slice(0, 2).map(k => (
                    <span key={k} className="text-[10px] bg-brand-accent/5 text-brand-accent px-2.5 py-0.5 rounded-md border border-brand-accent/10">
                      #{k}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                  <div className="flex gap-4 text-xs">
                    <span className="text-slate-400">
                      Maturity: <strong className="text-emerald-400">{p.maturityScore}/100</strong>
                    </span>
                    <span className="text-slate-400">
                      Risk Index: <strong className="text-rose-400">{p.riskScore}/100</strong>
                    </span>
                  </div>

                  <Link 
                    to="/analysis" 
                    state={{ selectedPolicyId: p.id }}
                    className="text-xs font-semibold text-brand-accent flex items-center hover:underline"
                  >
                    Analyze clauses <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CALL-TO-ACTION (Pre-launching Forecasting or Upload) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard hoverEffect={false} glowColor="indigo" className="p-8 sm:p-12 text-center relative overflow-hidden bg-gradient-to-br from-brand-dark to-brand-primary/10">
          <div className="absolute top-0 left-0 w-full h-full radial-glow-2 opacity-30 pointer-events-none -z-10" />
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white leading-tight">
              Ready to analyze custom policy drafts?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Upload any legislative text, compliance whitepapers, or draft standards. Our advanced Gemini models extract entities, evaluate risk scores, and compute policy maturity metrics in seconds.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button 
                onClick={() => navigate('/upload')}
                className="bg-brand-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg glow-blue transition-all"
              >
                Upload Document Now
              </button>
              <button 
                onClick={() => navigate('/documentation')}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl font-semibold transition-all"
              >
                Read Developer API Docs
              </button>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
