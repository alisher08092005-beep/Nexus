
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'WEEK_01', value: 400 },
  { name: 'WEEK_02', value: 1200 },
  { name: 'WEEK_03', value: 800 },
  { name: 'WEEK_04', value: 2400 },
  { name: 'WEEK_05', value: 3800 },
  { name: 'WEEK_06', value: 5200 },
];

const StatsSection: React.FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Multi-layer parallax
  const yTextBg = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const yStatsPanel = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto w-full relative">
      {/* Background Parallax Layer: Ghost Text */}
      <motion.div 
        style={{ y: yTextBg }}
        className="absolute -top-60 -left-40 text-[240px] font-black text-indigo-500/[0.03] select-none pointer-events-none uppercase tracking-tighter whitespace-nowrap z-0"
      >
        PERFORMANCE_DATA_NEXUS
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
        {/* Left Content (Slide from Left) */}
        <motion.div 
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-[2px] bg-cyan-500"></span>
            <span className="text-xs font-black text-cyan-600 uppercase tracking-widest">Live Performance Matrix</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-8 leading-tight uppercase">
            <span className="text-animate-gradient">Data-Driven</span> <br />
            <span className="text-animate-underline text-indigo-600">Scaling</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed mb-12 max-w-md">
            Our infrastructure maintains a 99.9% conversion uptime, processing billions in market sentiment signals to ensure your growth trajectory is absolute.
          </p>
          
          <div className="grid grid-cols-2 gap-8">
            {[
              { label: 'Active Deployments', val: '4,812' },
              { label: 'Global Node Load', val: 'Low' },
            ].map((stat, idx) => (
              <div key={idx} className="border-l-4 border-slate-100 pl-6">
                <div className="text-3xl font-black text-slate-900 mb-1">{stat.val}</div>
                <div className="text-[10px] font-black text-cyan-600 uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Content (Slide from Right + Parallax) */}
        <motion.div 
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ y: yStatsPanel }}
          className="lg:col-span-7 bg-slate-900 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-6 text-[9px] font-bold text-cyan-500/20 mono tracking-widest">
            SECURE_NODE_7 // ENCRYPTED
          </div>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Growth Forecast</span>
                <span className="text-2xl font-black text-white">+312.4% Est.</span>
             </div>
             <div className="text-[9px] font-black text-cyan-500 bg-cyan-500/10 px-4 py-2 border border-cyan-500/30 rounded-lg">SYSTEM_STATUS: ACTIVE</div>
          </div>
          <div className="h-[300px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StatsSection;
