import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, BarChart3, Brain, Database, Cpu, Activity } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function ModelEvaluation() {
  const location = useLocation();
  const customMetrics = location.state?.customMetrics;
  
  const defaultMetrics = [
    { metric: 'Accuracy',        xgb: '90.0%',   rf: '90.0%' },
    { metric: 'Precision',       xgb: '85.2%',   rf: '86.4%' },
    { metric: 'Recall',          xgb: '92.9%',   rf: '91.1%' },
    { metric: 'F1 Score',        xgb: '88.9%',   rf: '88.7%' },
    { metric: 'ROC-AUC',         xgb: '0.96',    rf: '0.96' },
    { metric: 'Cross-Val Score', xgb: '83.5%',   rf: '83.1%' },
    { metric: 'Training Time',   xgb: '3.15 s',  rf: '2.90 s' },
    { metric: 'Prediction Time', xgb: '0.002 s', rf: '0.008 s' },
  ];

  const metrics = customMetrics || defaultMetrics;

  const xgbFeatures = [
    { feature: "secretary", importance: "0.0261" },
    { feature: "department", importance: "0.0247" },
    { feature: "cooperation", importance: "0.0202" },
    { feature: "financial", importance: "0.0188" },
    { feature: "property", importance: "0.0186" }
  ];

  const rfFeatures = [
    { feature: "mandates", importance: "0.0563" },
    { feature: "ai", importance: "0.0473" },
    { feature: "requires", importance: "0.0399" },
    { feature: "instructs", importance: "0.0304" },
    { feature: "intelligence", importance: "0.0209" }
  ];

  const xgbConfusion = [[65, 9], [4, 52]];
  const rfConfusion = [[66, 8], [5, 51]];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-400 font-semibold tracking-wider uppercase mb-6">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Evaluation Metrics</span>
        </div>
        <h1 className="text-4xl font-display font-bold text-white tracking-tight mb-4">
          Complete Machine Learning Evaluation
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          Comprehensive performance report of the XGBoost and Random Forest classifiers used in the Polaris AI Pipeline.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard hoverEffect glowColor="blue">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400"><Database className="h-6 w-6" /></div>
            <div>
              <p className="text-sm font-semibold text-slate-400">Total Samples</p>
              <h3 className="text-2xl font-bold text-white mt-1">646</h3>
            </div>
          </div>
        </GlassCard>
        <GlassCard hoverEffect glowColor="indigo">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400"><Brain className="h-6 w-6" /></div>
            <div>
              <p className="text-sm font-semibold text-slate-400">Total Features (TF-IDF)</p>
              <h3 className="text-2xl font-bold text-white mt-1">501</h3>
            </div>
          </div>
        </GlassCard>
        <GlassCard hoverEffect glowColor="emerald">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400"><Activity className="h-6 w-6" /></div>
            <div>
              <p className="text-sm font-semibold text-slate-400">Selected Model</p>
              <h3 className="text-2xl font-bold text-white mt-1">XGBoost</h3>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard hoverEffect={false} glowColor="cyan" className="p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-primary/10 rounded-xl border border-brand-primary/20">
              <BarChart3 className="h-5 w-5 text-brand-accent" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Performance Metrics</h3>
              <p className="text-sm text-slate-400 mt-0.5">XGBoost vs Random Forest Comparison</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wider">Metric</th>
                <th className="px-6 py-4 text-sm font-semibold text-brand-accent uppercase tracking-wider">XGBoost (Best)</th>
                <th className="px-6 py-4 text-sm font-semibold text-purple-400 uppercase tracking-wider">Random Forest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {metrics.map((row) => (
                <tr key={row.metric} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4 text-slate-300 font-medium">{row.metric}</td>
                  <td className="px-6 py-4 font-mono font-bold text-brand-accent text-base">{row.xgb}</td>
                  <td className="px-6 py-4 font-mono font-bold text-purple-400 text-base">{row.rf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard hoverEffect={false}>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-brand-accent" /> XGBoost Feature Importance
          </h3>
          <div className="space-y-4">
            {xgbFeatures.map((f, i) => (
              <div key={f.feature} className="relative">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300 capitalize">{f.feature}</span>
                  <span className="text-brand-accent font-mono">{f.importance}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden group">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(parseFloat(f.importance) / 0.03) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                    className="bg-brand-accent h-2 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard hoverEffect={false}>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-purple-400" /> RF Feature Importance
          </h3>
          <div className="space-y-4">
            {rfFeatures.map((f, i) => (
              <div key={f.feature} className="relative">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300 capitalize">{f.feature}</span>
                  <span className="text-purple-400 font-mono">{f.importance}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden group">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(parseFloat(f.importance) / 0.06) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                    className="bg-purple-400 h-2 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard hoverEffect={false}>
          <h3 className="text-lg font-bold text-white mb-6">XGBoost Confusion Matrix</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
              <div className="text-xs text-emerald-400 font-bold uppercase mb-1">True Negative</div>
              <div className="text-3xl font-mono text-white">{xgbConfusion[0][0]}</div>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-center">
              <div className="text-xs text-rose-400 font-bold uppercase mb-1">False Positive</div>
              <div className="text-3xl font-mono text-white">{xgbConfusion[0][1]}</div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
              <div className="text-xs text-amber-400 font-bold uppercase mb-1">False Negative</div>
              <div className="text-3xl font-mono text-white">{xgbConfusion[1][0]}</div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
              <div className="text-xs text-emerald-400 font-bold uppercase mb-1">True Positive</div>
              <div className="text-3xl font-mono text-white">{xgbConfusion[1][1]}</div>
            </div>
          </div>
        </GlassCard>

        <GlassCard hoverEffect={false}>
          <h3 className="text-lg font-bold text-white mb-6">Random Forest Confusion Matrix</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
              <div className="text-xs text-emerald-400 font-bold uppercase mb-1">True Negative</div>
              <div className="text-3xl font-mono text-white">{rfConfusion[0][0]}</div>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-center">
              <div className="text-xs text-rose-400 font-bold uppercase mb-1">False Positive</div>
              <div className="text-3xl font-mono text-white">{rfConfusion[0][1]}</div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
              <div className="text-xs text-amber-400 font-bold uppercase mb-1">False Negative</div>
              <div className="text-3xl font-mono text-white">{rfConfusion[1][0]}</div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
              <div className="text-xs text-emerald-400 font-bold uppercase mb-1">True Positive</div>
              <div className="text-3xl font-mono text-white">{rfConfusion[1][1]}</div>
            </div>
          </div>
        </GlassCard>
      </div>

    </div>
  );
}
