
import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, FolderOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface PortfolioProps {
  items: any[];
  onAuditClick?: () => void;
  onProjectClick?: (project: any) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ items = [], onAuditClick, onProjectClick }) => {
  const [filter, setFilter] = useState('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const safeItems = useMemo(() => Array.isArray(items) ? items.filter(Boolean) : [], [items]);
  
  const categories = useMemo(() => {
    const cats = new Set(safeItems.map(item => item.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [safeItems]);

  const filteredItems = useMemo(() => 
    filter === 'All' ? safeItems : safeItems.filter(item => item.category === filter)
  , [filter, safeItems]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (safeItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <FolderOpen className="text-gray-300 w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest">No Projects Found</h3>
        <p className="text-gray-400 mt-2 max-w-sm">Our case studies are currently being finalized for deployment. Check back shortly.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 w-full py-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8"
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-3">
            <span className="w-8 h-[1px] bg-indigo-600"></span>
            <Sparkles size={14} /> Case Studies
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Our <span className="text-animate-gradient">Digital</span> Portfolio
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            We don't just build websites; we architect growth engines. Explore how we've helped global brands scale their digital presence.
          </p>
        </div>
        
        {/* Navigation Wrapper for Mobile/Tablet arrows */}
        <div className="relative flex items-center w-full md:w-auto bg-white p-2 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <button 
            onClick={() => scroll('left')}
            className="md:hidden p-2 text-gray-400 hover:text-indigo-600 transition-colors z-10 bg-white"
          >
            <ChevronLeft size={16} />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth w-full md:w-auto px-2"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filter === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="md:hidden p-2 text-gray-400 hover:text-indigo-600 transition-colors z-10 bg-white"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((project, i) => (
            <motion.div 
              key={project.title || i}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 100, delay: i * 0.05 }}
              className="alive-card group relative rounded-[2.5rem] overflow-hidden shadow-xl aspect-[4/5] bg-gray-100 border border-gray-100"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200';
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent flex flex-col justify-end p-8 md:p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="mb-4">
                  <span className="text-indigo-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 block">{project.client}</span>
                  <h3 className="text-white text-2xl font-bold mb-2 leading-tight">{project.title}</h3>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="w-6 h-0.5 bg-emerald-500"></span>
                    <p className="font-bold text-xs uppercase tracking-tighter">{project.result}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest">{project.category}</span>
                  <motion.button 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onProjectClick?.(project)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 shadow-lg hover:bg-indigo-600 hover:text-white transition-colors"
                  >
                    <ExternalLink size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 p-12 bg-gray-900 rounded-[3rem] text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <h3 className="text-3xl font-bold text-white mb-6">Want results like these?</h3>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">Join 100+ high-growth companies that trust Nexus to architect their digital dominance.</p>
        <button 
          onClick={onAuditClick}
          className="alive-btn px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-900/40 relative z-10"
        >
          Start Your Audit
        </button>
      </motion.div>
    </div>
  );
};

export default Portfolio;
