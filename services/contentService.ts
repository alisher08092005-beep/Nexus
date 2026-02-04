
import { Service } from "../types";

export const fetchServices = async (): Promise<Service[]> => {
  return [
    { 
      id: 'seo',
      title: 'Search Engine Optimization', 
      description: 'Boosting your search rankings and driving organic traffic through technical SEO and content strategy.',
      longDescription: 'Our SEO protocol goes beyond keywords. We perform deep technical audits, semantic content optimization, and high-authority link acquisition to ensure your brand owns the first page of search results.',
      icon: 'Search',
      benefits: ['Technical Audits', 'Keyword Research', 'Backlink Building'],
      features: ['Core Web Vitals Optimization', 'Competitor Gap Analysis', 'Monthly Performance Audits', 'Local SEO Dominance']
    },
    { 
      id: 'smm',
      title: 'Social Media Marketing', 
      description: 'Engaging your target audience where they spend their time with creative content and community management.',
      longDescription: 'Social media is your brand\'s living pulse. We create viral-ready content and manage cross-platform engagement to turn casual followers into a loyal, high-converting community.',
      icon: 'Share2',
      benefits: ['Content Calendar', 'Community Mgmt', 'Influencer Outreach'],
      features: ['Viral Content Production', 'Paid Social Campaigns', 'Sentiment Analysis', 'Real-time Community Engagement']
    },
    { 
      id: 'ppc',
      title: 'Paid Advertising (PPC)', 
      description: 'Maximizing ROI with precision-targeted ads on Google, Facebook, and Instagram.',
      longDescription: 'We don\'t just spend your budget; we invest it. Using advanced pixel tracking and custom audience segmentation, we ensure every cent of your ad spend is directed towards high-intent users.',
      icon: 'Target',
      benefits: ['A/B Testing', 'Conversion Tracking', 'Retargeting'],
      features: ['Dynamic Search Ads', 'Lookalike Audience Modeling', 'Creative Performance Testing', 'Full Funnel Retargeting']
    },
    { 
      id: 'branding',
      title: 'Branding & Design', 
      description: 'Crafting a unique visual identity that resonates with your customers and stands the test of time.',
      longDescription: 'A brand is a promise kept. We develop visual systems and narrative frameworks that establish immediate authority and emotional connection with your target demographic.',
      icon: 'Palette',
      benefits: ['Logo Design', 'Brand Voice', 'Visual Identity'],
      features: ['Brand Identity Systems', 'UI/UX Interface Design', 'Corporate Narrative Development', 'Brand Style Guidelines']
    },
    { 
      id: 'analytics',
      title: 'Data & Analytics', 
      description: 'Tracking every interaction to provide actionable insights that fuel continuous growth.',
      // Fix: Added missing longDescription property required by Service interface
      longDescription: 'Data is the compass of digital growth. We implement advanced tracking infrastructures that capture every touchpoint, turning raw signals into clear, actionable intelligence for strategic decision-making.',
      icon: 'BarChart',
      benefits: ['Custom Dashboards', 'User Journey Mapping', 'Heatmaps'],
      features: ['GA4 Advanced Setup', 'Multi-Touch Attribution', 'Conversion Rate Optimization', 'Predictive Growth Modeling']
    },
    { 
      id: 'webdev',
      title: 'Web Development', 
      description: 'Building high-performance, responsive websites that convert visitors into loyal customers.',
      longDescription: 'Speed is a feature. We build lightning-fast, secure, and conversion-optimized web applications using modern stacks like React and Next.js to ensure your digital storefront never slows down your growth.',
      icon: 'Globe',
      benefits: ['React Apps', 'Mobile First', 'Performance Ops'],
      features: ['Headless CMS Integration', 'Edge Network Deployment', 'Custom API Architecture', 'Progressive Web Apps (PWA)']
    }
  ];
};

export const fetchPortfolio = async () => {
  return [
    {
      title: 'E-commerce Expansion',
      client: 'Velvet & Vine',
      result: 'Increased traffic by 150%',
      image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1200',
      category: 'Growth',
      featured: true
    },
    {
      title: 'SaaS Lead Generation',
      client: 'CloudFlow Pro',
      result: '3.2x ROI on Paid Ads',
      image: 'https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&q=80&w=1200',
      category: 'PPC'
    },
    {
      title: 'Organic Reach Revamp',
      client: 'EcoThread Co.',
      result: '200% Social Engagement',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200',
      category: 'Social'
    },
    {
      title: 'Global Branding Strategy',
      client: 'Astra Dynamics',
      result: 'New Market Entry Secured',
      image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=1200',
      category: 'Branding'
    },
    {
      title: 'Fintech Mobile App Launch',
      client: 'NeoBank',
      result: '500k Downloads in Month 1',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
      category: 'Growth'
    },
    {
      title: 'Hyperlocal SEO Campaign',
      client: 'DineRight Group',
      result: 'Top 3 Map Pack in 48 Locations',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
      category: 'Growth'
    }
  ];
};
