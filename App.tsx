
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Calendar, User, Share2, Bookmark, ExternalLink, Globe, Sparkles as SparklesIcon } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesGrid, { iconMap } from './components/ServicesGrid';
import Portfolio from './components/Portfolio';
import StrategyLab from './components/StrategyLab';
import StatsSection from './components/StatsSection';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Blog from './components/Blog';
import ContactSection from './components/ContactSection';
import LiveConsultant from './components/LiveConsultant';
import WhatsAppWidget from './components/WhatsAppWidget';
import { fetchServices, fetchPortfolio } from './services/contentService';
import { AppSection, Service, MarketingStrategy } from './types';

const GlobalServiceModal: React.FC<{ service: Service; onClose: () => void }> = ({ service, onClose }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center px-4 py-6 md:py-8">
    <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-md" onClick={onClose} />
    <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-4xl bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
      <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/10 md:bg-gray-100 flex items-center justify-center z-50 transition-colors hover:bg-white/20 md:hover:bg-gray-200"><X size={20} className="md:text-gray-900 text-white" /></button>
      <div className="w-full md:w-5/12 bg-indigo-600 p-8 md:p-10 text-white overflow-y-auto shrink-0">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8">{iconMap[service.icon]}</div>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4">{service.title}</h2>
        <p className="opacity-90 text-sm md:text-base">{service.description}</p>
      </div>
      <div className="w-full md:w-7/12 p-8 md:p-10 bg-white overflow-y-auto">
        <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4">Service Depth</h3>
        <p className="text-gray-600 mb-8 text-sm md:text-base leading-relaxed">{service.longDescription}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {service.features.map((f, i) => (
            <div key={i} className="flex gap-2 text-[13px] md:text-sm font-semibold text-gray-800"><CheckCircle2 className="text-emerald-500 shrink-0" size={16} /> {f}</div>
          ))}
        </div>
        <button onClick={onClose} className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-sm md:text-base transition-transform active:scale-95">Close Details</button>
      </div>
    </motion.div>
  </motion.div>
);

const GlobalPortfolioModal: React.FC<{ project: any; onClose: () => void }> = ({ project, onClose }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center px-4 py-6 md:py-8">
    <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-md" onClick={onClose} />
    <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-4xl bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
      <button onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 flex items-center justify-center text-white transition-colors z-50 border border-white/30"><X size={20} /></button>
      
      <div className="relative h-48 md:h-80 w-full overflow-hidden shrink-0">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
          <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg mb-3 inline-block">
            {project.category}
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">{project.title}</h2>
          <p className="text-emerald-400 font-bold text-sm md:text-lg mt-2 flex items-center gap-2">
            <span className="w-6 h-0.5 bg-emerald-500"></span> {project.result}
          </p>
        </div>
      </div>

      <div className="p-8 md:p-14 pt-6 md:pt-10 overflow-y-auto bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 border-b border-gray-100 pb-8">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Client</p>
            <p className="font-bold text-gray-900">{project.client}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Services</p>
            <p className="font-bold text-gray-900">{project.category} Protocol</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
            <p className="font-bold text-emerald-600 flex items-center gap-1.5"><CheckCircle2 size={16} /> Completed</p>
          </div>
        </div>

        <div className="prose prose-indigo max-w-none">
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
            We architected a bespoke {project.category.toLowerCase()} framework for {project.client}, focusing on rapid scalability and sustainable ROI. The project involved an end-to-end audit of existing infrastructure followed by the deployment of Nexus proprietary AI-driven growth tactics.
          </p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
            The key differentiator was our integration of real-time market sentiment analysis which allowed us to pivot creative strategy in under 24 hours, resulting in the projected {project.result} growth milestone being hit weeks ahead of schedule.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button onClick={onClose} className="flex-1 py-4 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors">Close View</button>
          <button className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
            Visit Live Project <Globe size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HERO);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [strategy, setStrategy] = useState<MarketingStrategy | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchServices().then(setServices);
    fetchPortfolio().then(setPortfolio);
  }, []);

  // Optimized Navigation Tracking
  useEffect(() => {
    const sectionMapping: Record<string, AppSection> = {
      [AppSection.HERO]: AppSection.HERO,
      [AppSection.STRATEGY]: AppSection.STRATEGY,
      [AppSection.SERVICES]: AppSection.SERVICES,
      [AppSection.PORTFOLIO]: AppSection.PORTFOLIO,
      'stats': AppSection.PORTFOLIO, 
      [AppSection.ABOUT]: AppSection.ABOUT,
      [AppSection.TESTIMONIALS]: AppSection.ABOUT,
      [AppSection.PRICING]: AppSection.SERVICES, 
      [AppSection.BLOG]: AppSection.BLOG,
      [AppSection.CONTACT]: AppSection.CONTACT
    };

    // Use multiple thresholds to catch every bit of scrolling
    const thresholds = Array.from({ length: 21 }, (_, i) => i * 0.05);

    const observerOptions = {
      root: containerRef.current,
      threshold: thresholds,
    };

    // Store the visibility ratios of all sections
    const visibilityRatios: Record<string, number> = {};

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        visibilityRatios[entry.target.id] = entry.intersectionRatio;
      });

      // Find the key with the maximum ratio
      let maxRatio = 0;
      let mostVisibleId = activeSection as string;

      for (const [id, ratio] of Object.entries(visibilityRatios)) {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          mostVisibleId = id;
        }
      }

      const mappedSection = sectionMapping[mostVisibleId];
      if (mappedSection && mappedSection !== activeSection) {
        setActiveSection(mappedSection);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('.snap-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [activeSection]);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="relative bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar 
        activeSection={activeSection} 
        onNavClick={handleNavClick} 
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen(!isMenuOpen)}
      />

      <div ref={containerRef} className="snap-container h-screen overflow-y-auto">
        <section id={AppSection.HERO} className="snap-section"><Hero onServicesClick={() => handleNavClick(AppSection.SERVICES)} onConsultationClick={() => handleNavClick(AppSection.CONTACT)} /></section>
        <section id={AppSection.STRATEGY} className="snap-section"><StrategyLab onStrategyUpdate={setStrategy} /></section>
        <section id={AppSection.SERVICES} className="snap-section bg-gray-50/50"><ServicesGrid services={services} recommendations={strategy?.recommendedChannels} onServiceSelect={setSelectedService} /></section>
        <section id={AppSection.PORTFOLIO} className="snap-section"><Portfolio items={portfolio} onProjectClick={setSelectedProject} onAuditClick={() => handleNavClick(AppSection.CONTACT)} /></section>
        <section id="stats" className="snap-section overflow-hidden"><StatsSection /></section>
        <section id={AppSection.ABOUT} className="snap-section"><About onContactClick={() => handleNavClick(AppSection.CONTACT)} /></section>
        <section id={AppSection.TESTIMONIALS} className="snap-section bg-indigo-50/30"><Testimonials /></section>
        <section id={AppSection.PRICING} className="snap-section"><Pricing onSelectPlan={() => handleNavClick(AppSection.CONTACT)} /></section>
        <section id={AppSection.BLOG} className="snap-section"><Blog /></section>
        <section id={AppSection.CONTACT} className="snap-section bg-slate-950"><ContactSection /></section>
      </div>

      <WhatsAppWidget />
      <LiveConsultant />

      {/* GLOBAL MODALS */}
      <AnimatePresence>
        {selectedService && <GlobalServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}
        {selectedProject && <GlobalPortfolioModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
