
export interface MarketingStrategy {
  targetAudience: string;
  recommendedChannels: string[];
  suggestedTagline: string;
  weeklyRoadmap: {
    week: number;
    tasks: string[];
  }[];
  projectedOutcome: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  benefits: string[];
  features: string[];
}

export enum AppSection {
  HERO = 'home',
  STRATEGY = 'strategy',
  SERVICES = 'services',
  PORTFOLIO = 'portfolio',
  ABOUT = 'about',
  TESTIMONIALS = 'testimonials',
  PRICING = 'pricing',
  BLOG = 'blog',
  CONTACT = 'contact'
}
