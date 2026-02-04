
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, Cpu, Zap, Code, MessageSquare } from 'lucide-react';

interface HeroProps {
  onServicesClick: () => void;
  onConsultationClick: () => void;
}

const FloatingIcon = ({ icon: Icon, delay = 0, x = 0, y = 0 }: { icon: any, delay?: number, x?: number, y?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.4, 0.4, 0],
      scale: [0.5, 1, 1, 0.5],
      y: [y, y - 50, y - 100],
      rotate: [0, 45, 90]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      delay, 
      ease: "linear" 
    }}
    className="absolute text-indigo-400 pointer-events-none z-0"
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    <Icon size={32} strokeWidth={1} />
  </motion.div>
);

const RippleButton: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string; 
}> = ({ children, onClick, className }) => {
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    if (!button) return;
    
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple-circle");

    const existingRipples = button.querySelectorAll('.ripple-circle');
    existingRipples.forEach(r => r.remove());
    
    button.appendChild(circle);
    if (onClick) onClick();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={createRipple}
      className={`alive-btn relative overflow-hidden ${className}`}
    >
      {children}
    </motion.button>
  );
};

const Hero: React.FC<HeroProps> = ({ onServicesClick, onConsultationClick }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yOrb1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yGrid = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative h-full">
      {/* Animated Floating Particles */}
      <FloatingIcon icon={Terminal} delay={0} x={10} y={40} />
      <FloatingIcon icon={Cpu} delay={2} x={80} y={20} />
      <FloatingIcon icon={Zap} delay={4} x={30} y={15} />
      <FloatingIcon icon={Code} delay={1} x={70} y={60} />

      <motion.div 
        style={{ y: yOrb1 }}
        className="absolute top-1/4 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none z-0" 
      />
      <motion.div 
        style={{ y: yOrb2 }}
        className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0" 
      />
      
      <motion.div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ 
          backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', 
          backgroundSize: '40px 40px',
          y: yGrid
        }}
      />

      <motion.div 
        initial={{ opacity: 0, x: -120 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", damping: 25, stiffness: 80 }}
        style={{ opacity }}
        className="relative z-10"
      >
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">Digital Growth Partner</span>
        </div>

        <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
          <span className="text-animate-gradient">Grow Your Business</span> <br />
          <span className="text-indigo-600 text-animate-underline">Online with Expert</span> <br />
          Marketing.
        </h1>

        <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-lg">
          Helping brands dominate the digital landscape with data-driven SEO, performance marketing, and high-impact branding solutions.
        </p>

        <div className="flex flex-wrap gap-5">
          <RippleButton 
            onClick={onServicesClick}
            className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-xl shadow-indigo-100 flex items-center gap-3"
          >
            Our Services <ArrowRight className="w-5 h-5" />
          </RippleButton>
          <RippleButton 
            onClick={onConsultationClick}
            className="px-8 py-4 bg-white text-gray-900 font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-3"
          >
            Free Consultation <MessageSquare className="w-5 h-5 text-indigo-600" />
          </RippleButton>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 120 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", damping: 25, stiffness: 80, delay: 0.2 }}
        style={{ y: yImage }}
        className="hidden lg:block relative z-10"
      >
        <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(79,70,229,0.2)] border-8 border-gray-50 bg-white">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
            alt="Digital Marketing Illustration" 
            className="w-full h-auto scale-105"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
