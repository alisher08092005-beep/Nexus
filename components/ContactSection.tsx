
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Instagram, Twitter, Linkedin, Check, MessageCircle } from 'lucide-react';

const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <motion.a 
    href="#" 
    whileHover={{ scale: 1.3, rotate: 15, color: '#4F46E5' }}
    whileTap={{ scale: 0.9 }}
    className="text-gray-500 transition-colors"
  >
    {icon}
  </motion.a>
);

const ContactSection: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    vision: ''
  });
  
  const whatsappLink = "https://wa.me/923079842491";
  const contactEmail = "Alisher03079842491@gmail.com";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  const handleProjectInitiation = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation check (though 'required' attribute handles most of it)
    if (!formData.fullName || !formData.email || !formData.subject || !formData.vision) {
      alert("Please fill in all details before initiating the protocol.");
      return;
    }

    const emailSubject = encodeURIComponent(`Project Inquiry: ${formData.subject}`);
    const emailBody = encodeURIComponent(
      `Full Name: ${formData.fullName}\n` +
      `Sender Email: ${formData.email}\n\n` +
      `Project Vision:\n${formData.vision}`
    );

    // Using mailto: which opens the default mail app (usually Gmail on mobile/desktop)
    const mailtoUrl = `mailto:${contactEmail}?subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 w-full text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 py-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Ready to <br /><span className="text-indigo-400">Outperform?</span></h2>
          <p className="text-gray-400 mb-10 text-lg max-w-md">Reach out today for a custom growth audit and see how we can transform your digital footprint.</p>
          
          <div className="space-y-6 mb-12">
            <motion.a 
              href={`mailto:${contactEmail}`}
              whileHover={{ x: 10 }} 
              className="flex items-center gap-5 group"
            >
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Protocol Email</p>
                <p className="font-bold text-sm">{contactEmail}</p>
              </div>
            </motion.a>
            
            <motion.a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 10 }} 
              className="flex items-center gap-5 group"
            >
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <MessageCircle size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">WhatsApp Support</p>
                <p className="font-bold text-sm">+92 307 9842491</p>
              </div>
            </motion.a>

            <motion.div whileHover={{ x: 10 }} className="flex items-center gap-5 cursor-default group">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Direct Line</p>
                <p className="font-bold text-sm">+1 (800) NEXUS-PRO</p>
              </div>
            </motion.div>
          </div>

          <div className="p-8 bg-gray-800/50 rounded-2xl border border-gray-700">
            <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
              Get Weekly Tips <span className="text-indigo-400 text-xs">● Newsletter</span>
            </h4>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input 
                required 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-sm flex-1 focus:outline-none focus:border-indigo-500 input-glow transition-all"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="alive-btn bg-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                {subscribed ? <Check size={16} /> : 'Join'}
              </motion.button>
            </form>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-10 text-gray-900 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
            <Send size={120} />
          </div>
          <h3 className="text-2xl font-bold mb-8">Inquiry Protocol</h3>
          <form onSubmit={handleProjectInitiation} className="space-y-5 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input 
                required
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 w-full focus:outline-none focus:border-indigo-500 input-glow transition-all text-sm" 
                placeholder="Full Name" 
              />
              <input 
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 w-full focus:outline-none focus:border-indigo-500 input-glow transition-all text-sm" 
                placeholder="Email Address" 
              />
            </div>
            <input 
              required
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 w-full focus:outline-none focus:border-indigo-500 input-glow transition-all text-sm" 
              placeholder="Subject / Goal" 
            />
            <textarea 
              required
              rows={4} 
              value={formData.vision}
              onChange={(e) => setFormData({...formData, vision: e.target.value})}
              className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 w-full focus:outline-none focus:border-indigo-500 input-glow transition-all text-sm resize-none" 
              placeholder="Detail your vision..."
            ></textarea>
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="alive-btn w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
            >
              Initiate Project <Send size={18} />
            </motion.button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-800 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white text-sm">N</div>
          <span className="font-bold tracking-tight text-sm">NEXUS GLOBAL</span>
        </div>
        <div className="flex gap-6">
           <SocialIcon icon={<Twitter size={18} />} />
           <SocialIcon icon={<Instagram size={18} />} />
           <SocialIcon icon={<Linkedin size={18} />} />
        </div>
        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">© 2024 Performance First.</p>
      </div>
    </div>
  );
};

export default ContactSection;
