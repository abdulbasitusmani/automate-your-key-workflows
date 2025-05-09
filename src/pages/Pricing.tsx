
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAgents } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

// Define Package interface for static data
interface PackageItem {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  promoPrice?: number;
  promoDuration?: number;
  features: string[];
}

// Static package data
const packages: PackageItem[] = [
  {
    id: 1,
    name: 'Pack Social',
    description: 'Automate your social media engagement with our AI-powered social media assistant.',
    basePrice: 300,
    promoPrice: 250,
    promoDuration: 2, // months
    features: [
      'AI-powered Instagram DM responses',
      'Automated content scheduling',
      'Sentiment analysis for messages',
      'Custom reply templates',
      'Follower engagement tracking'
    ]
  },
  {
    id: 2,
    name: 'Pack Office',
    description: 'Streamline your office workflows with intelligent scheduling and reminders.',
    basePrice: 450,
    features: [
      'WhatsApp reminder automation',
      'Meeting scheduler and organizer',
      'Document processing and sorting',
      'Email template management',
      'Client communication tracking'
    ]
  },
  {
    id: 3,
    name: 'Pack Manager',
    description: 'Take control of your finances with automated bill management and expense tracking.',
    basePrice: 500,
    features: [
      'Expense tracking and categorization',
      'Bill payment automation',
      'Invoice generation and sending',
      'Financial reporting and analytics',
      'Budget optimization suggestions'
    ]
  },
  {
    id: 4,
    name: 'Pack Closer',
    description: 'Convert leads to sales with automated follow-ups and personalized messaging.',
    basePrice: 600,
    features: [
      'Lead qualification automation',
      'Personalized follow-up sequences',
      'Deal progress tracking',
      'Proposal generation assistance',
      'Sales performance analytics'
    ]
  }
];

const PricingPage = () => {
  const { data: agents, isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: getAgents,
  });
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleSelectPlan = (packageId: number) => {
    if (!user) {
      toast.info('Please log in to subscribe to this plan.', {
        action: {
          label: 'Log In',
          onClick: () => navigate('/login'),
        },
      });
      return;
    }
    
    toast.success('This feature is coming soon!');
    // Future implementation: navigate(`/packages/${packageId}`);
  };
  
  if (isLoading) {
    return (
      <div className="py-24 flex justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-keysai-accent border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="heading-lg mb-4">Pricing Plans</h1>
          <p className="subtitle max-w-2xl mx-auto">
            Choose the perfect AI package for your business needs. All plans include our core automation features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-xl shadow-custom p-6 flex flex-col h-full">
              <div className="mb-6 flex-grow">
                <h3 className="text-xl font-bold text-keysai-accent mb-2">{pkg.name}</h3>
                <p className="text-keysai-textBody text-sm mb-6">{pkg.description}</p>
                
                <div className="mt-auto mb-6">
                  {pkg.promoPrice ? (
                    <div>
                      <p className="text-3xl font-bold text-keysai-accent">
                        {pkg.promoPrice}€<span className="text-sm font-normal">/month</span>
                      </p>
                      <p className="text-sm text-gray-500 line-through">{pkg.basePrice}€/month</p>
                      <p className="text-sm text-keysai-textBody">
                        for first {pkg.promoDuration} months
                      </p>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold text-keysai-accent">
                      {pkg.basePrice}€<span className="text-sm font-normal">/month</span>
                    </p>
                  )}
                </div>
                
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-keysai-accent mr-2 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                className="w-full mt-auto" 
                onClick={() => handleSelectPlan(pkg.id)}
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Need a custom solution?</h3>
          <p className="text-keysai-textBody mb-4">
            Contact our team for a tailored AI solution that fits your specific business requirements.
          </p>
          <Link to="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
