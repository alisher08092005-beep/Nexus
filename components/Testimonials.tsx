
import React from 'react';
import { Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Sarah Jenkins',
    role: 'CEO, BrightPath',
    text: 'Nexus completely transformed our digital strategy. Our leads have tripled in just six months.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Dir, TechCore',
    text: 'The best agency we’ve ever worked with. Their attention to detail and ROI-driven approach is unmatched.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    name: 'Emily Davis',
    role: 'Founder, EcoThread',
    text: 'Professional, creative, and highly technical. They delivered a brand that truly represents our vision.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Client Feedback</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">Don’t just take our word for it. Hear what our partners have to say.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((rev, i) => (
          <div key={i} className="alive-card p-10 bg-white border border-gray-100 rounded-3xl relative group">
            <div className="card-icon-bounce absolute top-8 left-8">
              <Quote className="text-indigo-100 w-12 h-12" />
            </div>
            <div className="relative z-10">
              <p className="text-gray-700 italic mb-8 leading-relaxed mt-4">"{rev.text}"</p>
              <div className="flex items-center gap-4">
                <img src={rev.avatar} alt={rev.name} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-50" />
                <div>
                  <h4 className="font-bold text-gray-900">{rev.name}</h4>
                  <p className="text-xs text-gray-400 font-medium">{rev.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
