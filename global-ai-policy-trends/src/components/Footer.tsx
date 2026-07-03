import React from 'react';
import { motion } from 'motion/react';
import { Globe, Heart, Sparkles, Github, MessageSquare, BookOpen, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-panel border-t border-white/10 mt-auto rounded-t-3xl shadow-2xl relative overflow-hidden" id="footer">
      <div className="absolute bottom-0 left-0 w-80 h-80 radial-glow-2 opacity-20 -z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 radial-glow-3 opacity-25 -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Vision */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/polaris-logo.png" alt="Polaris logo" className="h-12 w-12 rounded-2xl bg-white/5 p-1 border border-white/10 object-contain" />
              <div>
                <div className="font-display font-bold text-white text-lg tracking-tight">
                  Polaris AI Policy Trends
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-brand-accent font-semibold mt-1">
                  Unified governance intelligence
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              An enterprise-grade, intelligence-driven framework specializing in analyzing, summarizing, forecasting, and compiling worldwide artificial intelligence governance. Designed for compliance, innovation, and ethical alignment.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/documentation" className="hover:text-brand-accent flex items-center gap-2 transition-colors">
                  <BookOpen className="h-3.5 w-3.5 text-brand-accent" /> Documentation
                </Link>
              </li>
              <li>
                <a href="#github" className="hover:text-brand-accent flex items-center gap-2 transition-colors">
                  <Github className="h-3.5 w-3.5 text-brand-secondary" /> GitHub Repository
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-accent flex items-center gap-2 transition-colors">
                  <Globe className="h-3.5 w-3.5 text-emerald-400" /> Country Coverage
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legals */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Legal & Contact</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#privacy" className="hover:text-brand-accent flex items-center gap-2 transition-colors">
                  <Shield className="h-3.5 w-3.5 text-indigo-400" /> Privacy Policy
                </a>
              </li>
              <li>
                <a href="mailto:contact@aipolicytracker.org" className="hover:text-brand-accent flex items-center gap-2 transition-colors">
                  <MessageSquare className="h-3.5 w-3.5 text-cyan-400" /> Contact Support
                </a>
              </li>
              <li className="text-xs text-slate-500 pt-1">
                Version 1.4.0 (Enterprise)
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {currentYear} Polaris AI. All rights reserved.
          </div>

          <motion.div 
            className="flex items-center space-x-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-[11px] text-brand-accent"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-accent" />
            <span>Co-Engineered with AI Intelligence</span>
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500 animate-pulse ml-0.5" />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
