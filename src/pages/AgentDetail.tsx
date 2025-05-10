import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAgentById } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showError, setShowError] = useState(false);
  
  const { data: agent, isLoading } = useQuery({
    queryKey: ['agent', id],
    queryFn: () => getAgentById(id!),
    enabled: !!id,
  });

  const handleSelectAgent = () => {
    setShowError(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-keysai-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading agent details...</p>
        </div>
      </div>
    );
  }

  if (showError) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading agent details. Please try again later.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/agents')}
          >
            Back to Agents
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button 
          variant="outline" 
          className="mb-8"
          onClick={() => navigate('/agents')}
        >
          ← Back to Agents
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Agent details */}
          <div className="lg:col-span-2">
            <h1 className="heading-lg mb-4">{agent?.name || 'Agent Name'}</h1>
            
            <div className="bg-white rounded-xl shadow-custom p-8 mb-8">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="text-keysai-textBody mb-6">{agent?.description || 'Agent description goes here.'}</p>
              
              <h3 className="font-semibold text-lg mb-3">Key Features</h3>
              <ul className="space-y-2">
                {getAgentFeatures(agent?.name || '').map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-keysai-accent mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-custom p-8">
              <h2 className="text-xl font-semibold mb-4">How It Works</h2>
              <ol className="list-decimal ml-6 space-y-4">
                {getAgentSteps(agent?.name || '').map((step, index) => (
                  <li key={index} className="pl-2">
                    <p className="font-medium">{step.title}</p>
                    <p className="text-keysai-textBody">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          
          {/* Right column - Pricing */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-custom p-8 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Subscription</h2>
              
              {agent?.promo_price ? (
                <div className="mb-6">
                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-3xl font-bold text-keysai-accent">{agent.promo_price}€</span>
                    <span className="text-sm text-keysai-textBody">/month</span>
                  </div>
                  <p className="text-keysai-textBody text-sm">
                    for first {agent.promo_duration} months, then {agent.base_price}€/month
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-keysai-accent">{agent?.base_price || '29.99'}€</span>
                    <span className="text-sm text-keysai-textBody">/month</span>
                  </div>
                </div>
              )}
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-keysai-accent mr-2 flex-shrink-0" />
                  <span>24/7 Automated Responses</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-keysai-accent mr-2 flex-shrink-0" />
                  <span>Advanced Analytics Dashboard</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-keysai-accent mr-2 flex-shrink-0" />
                  <span>Priority Customer Support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-keysai-accent mr-2 flex-shrink-0" />
                  <span>Cancel Anytime</span>
                </li>
              </ul>
              
              <Button 
                className="w-full bg-keysai-accent hover:bg-blue-600"
                onClick={handleSelectAgent}
              >
                Select Agent
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions to return agent-specific content
const getAgentFeatures = (agentName: string) => {
  switch (agentName) {
    case 'Pack Social':
      return [
        'AI-powered Instagram DM responses',
        'Automated content scheduling',
        'Sentiment analysis for messages',
        'Custom reply templates',
        'Follower engagement tracking'
      ];
    case 'Pack Office':
      return [
        'WhatsApp reminder automation',
        'Meeting scheduler and organizer',
        'Document processing and sorting',
        'Email template management',
        'Client communication tracking'
      ];
    case 'Pack Manager':
      return [
        'Expense tracking and categorization',
        'Bill payment automation',
        'Invoice generation and sending',
        'Financial reporting and analytics',
        'Budget optimization suggestions'
      ];
    case 'Pack Closer':
      return [
        'Lead qualification automation',
        'Personalized follow-up sequences',
        'Deal progress tracking',
        'Proposal generation assistance',
        'Sales performance analytics'
      ];
    default:
      return [
        'AI-powered automation',
        'Customizable workflows',
        '24/7 operation',
        'Detailed analytics',
        'Seamless integration'
      ];
  }
};

const getAgentSteps = (agentName: string) => {
  switch (agentName) {
    case 'Pack Social':
      return [
        {
          title: 'Connect Your Social Accounts',
          description: 'Securely link your Instagram and other social media accounts to Keys-AI.'
        },
        {
          title: 'Set Up Response Templates',
          description: 'Create customized templates for different types of messages and inquiries.'
        },
        {
          title: 'Configure Automation Rules',
          description: 'Define when and how the AI should respond to different message categories.'
        },
        {
          title: 'Monitor Performance',
          description: 'Track engagement metrics and response effectiveness in your dashboard.'
        }
      ];
    case 'Pack Office':
      return [
        {
          title: 'Link Your Calendar and WhatsApp',
          description: 'Connect your Google Calendar and WhatsApp Business account to Keys-AI.'
        },
        {
          title: 'Create Reminder Templates',
          description: 'Set up templates for different types of reminders and notifications.'
        },
        {
          title: 'Schedule Automated Reminders',
          description: 'Configure when reminders should be sent and to whom.'
        },
        {
          title: 'Review Communication Logs',
          description: 'Access detailed logs of all automated communications in your dashboard.'
        }
      ];
    case 'Pack Manager':
      return [
        {
          title: 'Connect Your Financial Accounts',
          description: 'Link your banking and payment processing accounts securely to Keys-AI.'
        },
        {
          title: 'Set Up Bill Categories',
          description: 'Categorize your recurring bills and define payment schedules.'
        },
        {
          title: 'Configure Payment Rules',
          description: 'Define when and how bills should be paid automatically.'
        },
        {
          title: 'Monitor Financial Health',
          description: 'Track expenses, payments, and budget adherence in your dashboard.'
        }
      ];
    case 'Pack Closer':
      return [
        {
          title: 'Import Your Sales Pipeline',
          description: 'Connect your CRM or import your leads to get started.'
        },
        {
          title: 'Define Follow-Up Sequences',
          description: 'Create personalized follow-up sequences for different lead types.'
        },
        {
          title: 'Set Qualification Criteria',
          description: 'Define how the AI should qualify and prioritize leads.'
        },
        {
          title: 'Track Conversion Metrics',
          description: 'Monitor lead-to-close ratios and sales performance in your dashboard.'
        }
      ];
    default:
      return [
        {
          title: 'Connect Your Accounts',
          description: 'Securely link relevant accounts and data sources to Keys-AI.'
        },
        {
          title: 'Configure Automation',
          description: 'Set up your automation preferences and workflows.'
        },
        {
          title: 'Review and Adjust',
          description: 'Monitor performance and fine-tune settings as needed.'
        },
        {
          title: 'Scale Your Results',
          description: 'Leverage analytics to optimize and expand your automation.'
        }
      ];
  }
};

export default AgentDetail;
