
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Service } from '../types';
import { 
  AnimatedSearch, 
  AnimatedSocial, 
  AnimatedTarget, 
  AnimatedBranding, 
  AnimatedGrowth, 
  AnimatedGlobe 
} from './AnimatedIcons';

interface ServicesGridProps {
  services: Service[];
  recommendations?: string[];
  onServiceSelect: (service: Service) => void;
}

export const iconMap: Record<string, React.ReactNode> = {
  Search: <AnimatedSearch />,
  Share2: <AnimatedSocial />,
  Target: <AnimatedTarget />,
  Palette: <AnimatedBranding />,
  BarChart: <AnimatedGrowth />,
  Globe: <AnimatedGlobe />
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", damping: 25, stiffness: 120 }
  }
};

const ServicesGrid: React.FC<ServicesGridProps> = ({ services = [], recommendations = [], onServiceSelect }) => {
  const safeRecommendations = Array.isArray(recommendations) ? recommendations : [];

  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          <span className="text-animate-gradient">Our Core</span> <span className="text-animate-underline text-indigo-600">Expertise</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          High-performance digital services tailored for your growth journey.
        </p>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          const isRecommended = safeRecommendations.some(rec => service.title.toLowerCase().includes(rec.toLowerCase()));
          return (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className={`alive-card p-10 rounded-3xl border transition-all bg-white cursor-pointer ${isRecommended ? 'border-indigo-200 ring-2 ring-indigo-500/10' : 'border-gray-100 shadow-sm'}`}
              onClick={() => onServiceSelect(service)}
            >
              {isRecommended && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-indigo-600 px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-tighter animate-pulse">
                  <Sparkles size={10} /> AI Pick
                </div>
              )}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gray-50 group-hover:bg-indigo-50 transition-colors">
                <div className="w-10 h-10">{iconMap[service.icon] || <AnimatedGlobe />}</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">{service.description}</p>
              <button className="font-bold text-sm text-indigo-600 flex items-center gap-2">Learn More →</button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ServicesGrid;
