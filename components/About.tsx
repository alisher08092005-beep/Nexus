
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, TrendingUp, Award, Clock, Lightbulb, Target, Rocket, ShieldCheck } from 'lucide-react';

interface AboutProps {
  onContactClick?: () => void;
}

const stats = [
  { icon: <Users />, title: '100+ Partners', desc: 'From disruptive startups to Fortune 500 giants.' },
  { icon: <TrendingUp />, title: '$45M+ Revenue', desc: 'Direct impact generated for our clients in 2023.' },
  { icon: <Award />, title: 'Award Winning', desc: 'Recognized for technical excellence and ROI.' },
  { icon: <Clock />, title: '9+ Years Ops', desc: 'A decade of refining digital growth protocols.' }
];

const methodology = [
  { icon: <Lightbulb />, step: '01', title: 'Discovery', text: 'We audit your infrastructure and market sentiment to find gaps.' },
  { icon: <Target />, step: '02', title: 'Strategy', text: 'Our AI engine generates a 12-month growth blueprint.' },
  { icon: <Rocket />, step: '03', title: 'Execution', text: 'Rapid deployment across all high-impact channels.' },
  { icon: <ShieldCheck />, step: '04', title: 'Optimize', text: 'Continuous data loops to maximize conversion efficiency.' }
];

const About: React.FC<AboutProps> = ({ onContactClick }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yFloat = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const rotateFloat = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-6 w-full relative py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></span>
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-widest">Our DNA</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
            Built for <span className="text-animate-gradient">Unfair</span> Advantage.
          </h2>
          <p className="text-gray-500 mb-10 text-lg leading-relaxed max-w-xl">
            Nexus isn't an agency; we're a force multiplier. Founded on the principle that data without strategy is just noise, we've spent 9 years building the frameworks that allow brands to dominate their categories.
          </p>
          
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <h4 className="text-3xl font-black text-gray-900 mb-1">99.9%</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Client Retention</p>
            </div>
            <div>
              <h4 className="text-3xl font-black text-gray-900 mb-1">3.5x</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Avg. Growth ROI</p>
            </div>
          </div>

          <button 
            onClick={onContactClick}
            className="alive-btn px-10 py-5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black shadow-xl shadow-gray-200"
          >
            Meet the Founders
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <motion.div style={{ y: yFloat, rotate: rotateFloat }} className="absolute -z-10 -top-20 -right-20 w-64 h-64 bg-indigo-50 rounded-[4rem] blur-3xl opacity-60" />
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="alive-card p-10 rounded-[2.5rem] border border-gray-100 shadow-sm bg-white/90 backdrop-blur-md"
            >
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                {React.cloneElement(stat.icon as React.ReactElement, { size: 28 })}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{stat.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="pt-20 border-t border-gray-100"
      >
        <div className="text-center mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-4 uppercase tracking-tighter">The Nexus Protocol</h3>
          <p className="text-gray-500 max-w-lg mx-auto">Our four-stage engagement framework designed for predictable, scalable growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {methodology.map((m, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="relative group p-8 rounded-3xl bg-gray-50/50 hover:bg-white transition-all border border-transparent hover:border-gray-100 hover:shadow-xl"
            >
              <div className="absolute top-4 right-4 text-4xl font-black text-gray-100 group-hover:text-indigo-50 transition-colors">{m.step}</div>
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                {m.icon}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">{m.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{m.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
