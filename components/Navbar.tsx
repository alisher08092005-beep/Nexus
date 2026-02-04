
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppSection } from '../types';
import { 
  Menu, X, ArrowRight, ChevronRight, 
  Home, Zap, Briefcase, Image as ImageIcon, 
  Info, BookOpen, MessageSquare 
} from 'lucide-react';

interface NavbarProps {
  activeSection: AppSection;
  onNavClick: (id: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavClick, isOpen, onToggle }) => {
  const navItems = [
    { label: 'Home', id: AppSection.HERO, icon: <Home size={22} /> },
    { label: 'Strategy', id: AppSection.STRATEGY, icon: <Zap size={22} /> },
    { label: 'Services', id: AppSection.SERVICES, icon: <Briefcase size={22} /> },
    { label: 'Portfolio', id: AppSection.PORTFOLIO, icon: <ImageIcon size={22} /> },
    { label: 'About', id: AppSection.ABOUT, icon: <Info size={22} /> },
    { label: 'Blog', id: AppSection.BLOG, icon: <BookOpen size={22} /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isOpen ? 'bg-transparent' : 'bg-white/90 backdrop-blur-md border-b border-gray-100'} py-4`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-[110]">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            if (isOpen) onToggle();
            onNavClick(AppSection.HERO);
          }}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-indigo-200">N</div>
          <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-white' : 'text-gray-900'}`}>NEXUS</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`text-sm font-semibold relative transition-all py-1 px-2 flex items-center gap-2 group ${
                  isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
                }`}
              >
                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'opacity-70 group-hover:opacity-100'}`}>
                  {item.icon}
                </span>
                {item.label}
                <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full group-hover:left-0 ${isActive ? 'w-full left-0' : ''}`} />
              </button>
            );
          })}
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavClick(AppSection.CONTACT)}
            className="alive-btn px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-full shadow-lg shadow-indigo-100"
          >
            Get a Quote
          </motion.button>
        </div>

        {/* Mobile/Tablet Hamburger Button */}
        <button 
          className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
            isOpen ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'
          }`}
          onClick={onToggle}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 z-[101] bg-black/80 backdrop-blur-md lg:hidden"
            />
            
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[105] w-[85%] max-w-sm bg-[#0a0f1d] flex flex-col pt-24 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col w-full">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => onNavClick(item.id)}
                      className={`w-full px-8 py-5 flex items-center justify-between transition-all group border-b border-white/5 ${
                        isActive 
                          ? 'bg-indigo-600/20 text-white' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <span className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-600/40' 
                            : 'bg-white/5 text-gray-500 group-hover:text-indigo-400 group-hover:bg-white/10'
                        }`}>
                          {item.icon}
                        </span>
                        <span className={`text-xl font-bold tracking-tight transition-all duration-300 ${isActive ? 'translate-x-1' : ''}`}>
                          {item.label}
                        </span>
                      </div>
                      <ChevronRight 
                        size={20} 
                        className={`transition-all duration-300 ${isActive ? 'text-indigo-400 opacity-100 translate-x-0' : 'text-gray-800 opacity-0 -translate-x-2'}`} 
                      />
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-auto px-8 pb-12 flex flex-col items-center gap-8">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavClick(AppSection.CONTACT)}
                  className="w-full py-5 bg-indigo-600 text-white text-lg font-bold rounded-2xl shadow-[0_20px_50px_-10px_rgba(79,70,229,0.5)] flex items-center justify-center gap-3 active:scale-95"
                >
                  Get a Quote <ArrowRight size={22} />
                </motion.button>
                
                <p className="text-center text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">
                  © 2024 NEXUS GLOBAL PROTOCOL
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
