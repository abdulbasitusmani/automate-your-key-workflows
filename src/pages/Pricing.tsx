
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAgents } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const PricingPage = () => {
  const { data: agents, isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: getAgents,
  });
  
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleSelectPlan = (agentId: string) => {
    if (!user) {
      toast.info('Please log in to subscribe to this plan.', {
        action: {
          label: 'Log In',
          onClick: () => navigate('/login'),
        },
      });
      return;
    }
    
    navigate(`/agents/${agentId}`);
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
            Choose the perfect AI agent for your business needs. All plans include our core automation features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {agents?.map((agent) => (
            <div key={agent.id} className="bg-white rounded-xl shadow-custom p-6 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-keysai-accent mb-2">{agent.name}</h3>
                <p className="text-keysai-textBody text-sm mb-6">{agent.description}</p>
                
                <div className="mt-auto mb-6">
                  {agent.promo_price ? (
                    <div>
                      <p className="text-3xl font-bold text-keysai-accent">
                        {agent.promo_price}€<span className="text-sm font-normal">/month</span>
                      </p>
                      <p className="text-sm text-gray-500 line-through">{agent.base_price}€/month</p>
                      <p className="text-sm text-keysai-textBody">
                        for first {agent.promo_duration} months
                      </p>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold text-keysai-accent">
                      {agent.base_price}€<span className="text-sm font-normal">/month</span>
                    </p>
                  )}
                </div>
                
                <ul className="space-y-3 mb-6">
                  {/* Example features - ideally these would come from the database */}
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-keysai-accent mr-2 mt-0.5" />
                    <span className="text-sm">24/7 Automated Responses</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-keysai-accent mr-2 mt-0.5" />
                    <span className="text-sm">Custom Integration Settings</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-keysai-accent mr-2 mt-0.5" />
                    <span className="text-sm">Usage Analytics Dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-keysai-accent mr-2 mt-0.5" />
                    <span className="text-sm">Email Support</span>
                  </li>
                </ul>
              </div>
              
              <Button 
                className="w-full mt-auto" 
                onClick={() => handleSelectPlan(agent.id)}
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
