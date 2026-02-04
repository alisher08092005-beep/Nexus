
import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedSearch = () => (
  <motion.svg 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="w-full h-full text-indigo-600"
    initial="initial"
    whileHover="hover"
  >
    <motion.circle 
      cx="11" cy="11" r="8" 
      variants={{
        initial: { pathLength: 1, opacity: 1 },
        hover: { scale: 1.1, strokeWidth: 3 }
      }}
    />
    <motion.line 
      x1="21" y1="21" x2="16.65" y2="16.65" 
      variants={{
        initial: { x1: 21, y1: 21 },
        hover: { x1: 23, y1: 23, strokeWidth: 3 }
      }}
    />
    <motion.path 
      d="M11 8a3 3 0 0 0-3 3" 
      variants={{
        initial: { opacity: 0, pathLength: 0 },
        hover: { opacity: 1, pathLength: 1, transition: { delay: 0.1 } }
      }}
    />
  </motion.svg>
);

export const AnimatedGrowth = () => (
  <motion.svg 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="w-full h-full text-emerald-600"
    initial="initial"
    whileHover="hover"
  >
    <motion.path 
      d="M12 20V10" 
      variants={{ initial: { pathLength: 0 }, hover: { pathLength: 1 } }} 
    />
    <motion.path 
      d="M18 20V4" 
      variants={{ initial: { pathLength: 0 }, hover: { pathLength: 1, transition: { delay: 0.1 } } }} 
    />
    <motion.path 
      d="M6 20V16" 
      variants={{ initial: { pathLength: 0 }, hover: { pathLength: 1, transition: { delay: 0.2 } } }} 
    />
  </motion.svg>
);

export const AnimatedTarget = () => (
  <motion.svg 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="w-full h-full text-blue-600"
    whileHover="hover"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <motion.circle 
      cx="12" cy="12" r="2" 
      variants={{
        hover: { scale: [1, 1.5, 1], transition: { repeat: Infinity, duration: 1 } }
      }}
    />
    <motion.path 
      d="M12 2v4M12 18v4M2 12h4M18 12h4" 
      variants={{
        hover: { rotate: 90, transition: { duration: 0.5 } }
      }}
    />
  </motion.svg>
);

export const AnimatedBranding = () => (
  <motion.svg 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="w-full h-full text-purple-600"
    whileHover="hover"
  >
    <motion.path 
      d="M12 19l7-7 3 3-7 7-3-3z" 
      variants={{ hover: { x: [0, 2, 0], y: [0, -2, 0] } }} 
    />
    <motion.path 
      d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" 
      variants={{ hover: { scale: 1.05 } }}
    />
    <motion.path 
      d="M2 2l7.586 7.586" 
      variants={{ hover: { pathLength: [1, 0, 1] } }}
    />
    <circle cx="11" cy="11" r="2" />
  </motion.svg>
);

export const AnimatedSocial = () => (
  <motion.svg 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="w-full h-full text-rose-600"
    whileHover="hover"
  >
    <motion.circle 
      cx="18" cy="5" r="3" 
      variants={{ hover: { scale: 1.2, fill: 'currentColor', fillOpacity: 0.1 } }} 
    />
    <motion.circle 
      cx="6" cy="12" r="3" 
      variants={{ hover: { scale: 1.2, fill: 'currentColor', fillOpacity: 0.1, transition: { delay: 0.1 } } }} 
    />
    <motion.circle 
      cx="18" cy="19" r="3" 
      variants={{ hover: { scale: 1.2, fill: 'currentColor', fillOpacity: 0.1, transition: { delay: 0.2 } } }} 
    />
    <motion.line x1="8.59" y1="13.51" x2="15.42" y2="17.49" variants={{ hover: { pathLength: [1, 0.5, 1] } }} />
    <motion.line x1="15.41" y1="6.51" x2="8.59" y2="10.49" variants={{ hover: { pathLength: [1, 0.5, 1] } }} />
  </motion.svg>
);

export const AnimatedGlobe = () => (
  <motion.svg 
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="w-full h-full text-indigo-500"
    whileHover="hover"
  >
    <circle cx="12" cy="12" r="10" />
    <motion.line 
      x1="2" y1="12" x2="22" y2="12" 
      variants={{ hover: { scaleX: 1.2, strokeWidth: 3 } }} 
    />
    <motion.path 
      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" 
      variants={{ hover: { rotateY: 180, transition: { duration: 1, repeat: Infinity } } }}
    />
  </motion.svg>
);
