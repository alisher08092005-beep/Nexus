
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, ArrowRight, Share2, Bookmark } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

interface BlogProps {
  onReadMoreClick?: () => void;
}

const posts: BlogPost[] = [
  {
    id: 'ai-ads',
    title: 'How AI is Reshaping Paid Ads in 2024',
    excerpt: 'Discover how machine learning is optimizing bid strategies and creative testing at scale.',
    content: `The landscape of digital advertising is undergoing a seismic shift. In 2024, artificial intelligence is no longer just a buzzword—it's the primary driver of ROI for global brands. 
    
    Predictive bidding algorithms can now process millions of signals in real-time, adjusting bids faster than any human operator could. But the real revolution is in Creative Optimization. AI-driven tools are now capable of generating thousands of ad variations, testing them against specific audience segments, and automatically scaling the winners. 
    
    At Nexus, we've seen a 40% reduction in CPA (Cost Per Acquisition) for clients who fully integrate machine learning into their top-of-funnel strategies. The future of ads isn't just about spending more; it's about spending smarter through algorithmic intelligence.`,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    date: 'May 12, 2024',
    author: 'Alex Sterling',
    category: 'AI Marketing'
  },
  {
    id: 'local-seo',
    title: 'The SEO Roadmap for Local Business Dominance',
    excerpt: 'A comprehensive guide to winning local search and driving foot traffic to your storefront.',
    content: `Local search is the heartbeat of brick-and-mortar success. With 76% of people who search on their smartphone for something nearby visiting a business within a day, the stakes have never been higher. 
    
    Winning the "Map Pack" requires more than just a Google Business Profile. It requires a synchronized strategy involving hyperlocal content creation, citation consistency, and a robust review management protocol. 
    
    We dive deep into the technical aspects of schema markup for local businesses and how to leverage "Near Me" intent to capture high-conversion traffic exactly when it's ready to buy. Your local presence is your digital storefront—make sure the lights are on and the door is open.`,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    date: 'June 05, 2024',
    author: 'Elena Rodriguez',
    category: 'SEO Strategy'
  }
];

const BlogDetailModal: React.FC<{ post: BlogPost; onClose: () => void }> = ({ post, onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[1000] flex items-center justify-center px-4 py-8 pointer-events-auto"
  >
    <div className="absolute inset-0 bg-gray-950/90 backdrop-blur-xl" onClick={onClose} />
    
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 30 }}
      className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 flex items-center justify-center text-white transition-colors z-50 border border-white/30"
      >
        <X size={20} />
      </button>

      <div className="h-64 md:h-80 w-full relative">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        <div className="absolute bottom-6 left-10">
          <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg mb-3 inline-block">
            {post.category}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">{post.title}</h2>
        </div>
      </div>

      <div className="p-10 md:p-14 pt-6 overflow-y-auto">
        <div className="flex items-center gap-6 mb-8 text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-gray-100 pb-6">
          <div className="flex items-center gap-2"><Calendar size={14} className="text-indigo-500" /> {post.date}</div>
          <div className="flex items-center gap-2"><User size={14} className="text-indigo-500" /> {post.author}</div>
        </div>

        <div className="prose prose-indigo max-w-none">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">
              {paragraph.trim()}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors text-xs font-bold uppercase tracking-widest">
              <Share2 size={16} /> Share
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors text-xs font-bold uppercase tracking-widest">
              <Bookmark size={16} /> Save
            </button>
          </div>
          <button 
            onClick={() => {
              onClose();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold transition-all group"
          >
            Start Your Strategy <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const Blog: React.FC<BlogProps> = ({ onReadMoreClick }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    // Optional: Keep external callback for telemetry or additional actions
    if (onReadMoreClick) onReadMoreClick();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 w-full py-12">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Knowledge Hub</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Latest <span className="text-animate-gradient">Insights</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
            Stay ahead of the curve with our technical marketing analysis, AI research, and growth tips.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {posts.map((post, i) => (
          <motion.div 
            key={post.id} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-500"
            onClick={() => handleReadMore(post)}
          >
            <div className="rounded-[2rem] overflow-hidden mb-8 aspect-[16/10] shadow-inner border border-gray-100 relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest border border-white/50">
                  {post.category}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
               <span className="flex items-center gap-1.5"><Calendar size={12} className="text-indigo-400" /> {post.date}</span>
               <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
               <span className="flex items-center gap-1.5"><User size={12} className="text-indigo-400" /> {post.author}</span>
            </div>

            <h3 className="text-2xl font-extrabold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
              {post.title}
            </h3>
            
            <p className="text-gray-500 mb-8 leading-relaxed font-medium">
              {post.excerpt}
            </p>
            
            <motion.button 
              whileHover={{ x: 5 }}
              className="text-xs font-black text-indigo-600 flex items-center gap-3 uppercase tracking-widest group-hover:gap-4 transition-all"
            >
              Expand Protocol <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPost && (
          <BlogDetailModal 
            post={selectedPost} 
            onClose={() => setSelectedPost(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;
