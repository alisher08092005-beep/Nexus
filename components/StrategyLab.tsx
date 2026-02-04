
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateMarketingStrategy } from '../services/gemini';
import { MarketingStrategy } from '../types';
import { Zap, Command, Terminal, Database, Activity, Sparkles } from 'lucide-react';

interface StrategyLabProps {
  onStrategyUpdate?: (strategy: MarketingStrategy) => void;
}

const StrategyLab: React.FC<StrategyLabProps> = ({ onStrategyUpdate }) => {
  const [formData, setFormData] = useState({ businessName: '', niche: '', goals: 'Aggressive Scaling' });
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<MarketingStrategy | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await generateMarketingStrategy(formData.businessName, formData.niche, formData.goals);
    if (result) {
      setStrategy(result);
      if (onStrategyUpdate) onStrategyUpdate(result);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[70vh]">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-4 bg-indigo-600 p-12 text-white rounded-3xl shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-500/30 px-3 py-1.5 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-indigo-100" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-50">AI Engine Active</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Strategy Lab</h2>
            <p className="text-indigo-100 text-sm font-medium leading-relaxed opacity-80">
              Input your target business metrics to generate a customized, AI-optimized marketing blueprint instantly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-12">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Business Name</label>
              <input 
                className="w-full bg-indigo-700/50 border border-indigo-500/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-300 input-glow transition-all placeholder:text-indigo-300/50"
                placeholder="e.g. Nexus Inc"
                required
                value={formData.businessName}
                onChange={e => setFormData({...formData, businessName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest">Industry / Niche</label>
              <input 
                className="w-full bg-indigo-700/50 border border-indigo-500/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-300 input-glow transition-all placeholder:text-indigo-300/50"
                placeholder="e.g. Luxury Retail"
                required
                value={formData.niche}
                onChange={e => setFormData({...formData, niche: e.target.value})}
              />
            </div>
            <motion.button 
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-white text-indigo-600 font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              {loading ? <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div> : 'Generate Intel'}
            </motion.button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl shadow-xl p-10 lg:p-12 overflow-y-auto max-h-[70vh]"
        >
          <AnimatePresence mode="wait">
            {strategy ? (
              <motion.div 
                key="strategy"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-10"
              >
                <div className="p-8 bg-indigo-50 rounded-2xl border-l-4 border-indigo-600">
                  <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Command size={14} /> Recommended Positioning
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">"{strategy.suggestedTagline}"</h3>
                  <p className="text-gray-600 text-sm font-medium">{strategy.projectedOutcome}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <Database className="text-indigo-600" size={18} />
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Target Audience</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600 leading-relaxed">{strategy.targetAudience}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                      <Activity className="text-emerald-600" size={18} />
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Optimal Channels</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(strategy.recommendedChannels || []).map((c, i) => (
                        <span key={i} className="px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-lg uppercase tracking-widest">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-gray-100">
                   <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                     <Terminal size={16} className="text-indigo-600" /> Execution Roadmap (Weeks 1-4)
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                     {(strategy.weeklyRoadmap || []).map((week, idx) => (
                       <div key={idx} className="space-y-3">
                          <div className="text-2xl font-extrabold text-indigo-100">W0{week.week}</div>
                          <div className="space-y-2">
                            {(week.tasks || []).map((task, ti) => (
                              <div key={ti} className="text-[11px] font-semibold text-gray-500 leading-tight border-l border-indigo-200 pl-2">
                                {task}
                              </div>
                            ))}
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-center p-12">
                 <div className="w-20 h-20 bg-gray-50 flex items-center justify-center mb-6 rounded-full border border-gray-100">
                   <Zap className="w-8 h-8 text-indigo-300" />
                 </div>
                 <h3 className="text-xl font-bold text-gray-300 tracking-widest uppercase italic">Awaiting System Input...</h3>
                 <p className="text-gray-300 text-xs font-bold mt-4 tracking-widest uppercase">System Status: Standby_0.0</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default StrategyLab;
