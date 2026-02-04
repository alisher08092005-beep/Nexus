
import React from 'react';
import { Check } from 'lucide-react';

interface PricingProps {
  onSelectPlan?: () => void;
}

const plans = [
  {
    name: 'Growth Starter',
    price: '$1,499',
    features: ['Basic SEO Audit', '2 Social Media Platforms', 'Weekly Reporting', 'Email Support'],
    popular: false
  },
  {
    name: 'Scale Pro',
    price: '$3,499',
    features: ['Full SEO Strategy', '4 Social Media Platforms', 'Google Ads Management', 'Priority Support', 'Monthly Consultation'],
    popular: true
  },
  {
    name: 'Market Leader',
    price: 'Custom',
    features: ['Custom Digital Architecture', 'Unlimited Platforms', 'Content Production', 'Dedicated Growth Manager', '24/7 Priority Support'],
    popular: false
  }
];

const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Investment Plans</h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">Transparent pricing built for every stage of your business growth.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div 
            key={i} 
            className={`p-10 rounded-3xl bg-white border ${plan.popular ? 'border-indigo-600 shadow-xl scale-105 z-10' : 'border-gray-100 shadow-sm'} flex flex-col`}
          >
            {plan.popular && <span className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-4 block">Most Popular</span>}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
            <div className="text-4xl font-extrabold text-gray-900 mb-8">{plan.price}<span className="text-lg text-gray-400 font-medium">/mo</span></div>
            
            <div className="space-y-4 mb-12 flex-1">
              {plan.features.map((f, fi) => (
                <div key={fi} className="flex items-center gap-3">
                  <Check className="text-emerald-500 w-5 h-5" />
                  <span className="text-sm text-gray-600 font-medium">{f}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={onSelectPlan}
              className={`alive-btn w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
