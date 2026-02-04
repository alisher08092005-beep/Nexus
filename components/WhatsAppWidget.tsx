
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppWidget: React.FC = () => {
  const phoneNumber = "923079842491"; 
  const message = encodeURIComponent("Hello Nexus AI Team, I'm interested in growing my business. Can we talk?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
      className="fixed bottom-6 right-24 z-[100]"
    >
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-full shadow-xl shadow-emerald-500/20 border-2 border-white relative group transition-colors hover:bg-emerald-600"
      >
        <MessageCircle size={28} className="text-white" />
        
        {/* Pulsing Status Indicator */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full animate-pulse shadow-sm"></span>
        
        {/* Tooltip on hover (Desktop) */}
        <span className="absolute bottom-full mb-4 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          WhatsApp Support
        </span>
      </motion.a>
    </motion.div>
  );
};

export default WhatsAppWidget;
