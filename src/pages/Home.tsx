
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, Bell, Home as HomeIcon, DollarSign } from 'lucide-react';
import StepCard from '@/components/StepCard';
import FeatureCard from '@/components/FeatureCard';
import AgentHeroCard from '@/components/AgentHeroCard';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { getAgents } from '@/lib/api';

const HomePage = () => {
  const { user } = useAuth();
  const { data: agents, isLoading } = useQuery({
    queryKey: ['agents-home'],
    queryFn: getAgents,
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-keysai-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="heading-xl mb-6">
              Automate Your Business Workflows
            </h1>
            <p className="subtitle mb-8 max-w-3xl mx-auto">
              Keys-AI gives you the power to automate Instagram DMs, WhatsApp reminders, and bill management with intelligent AI workflows.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {!user ? (
                <>
                  <Link to="/signup">
                    <Button className="btn-primary">Get Started</Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="btn-secondary">Login</Button>
                  </Link>
                </>
              ) : (
                <Link to="/agents">
                  <Button className="btn-primary">View Agents</Button>
                </Link>
              )}
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-8">Our AI Agents</h2>
            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-keysai-accent border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {agents?.slice(0, 4).map((agent) => (
                  <AgentHeroCard key={agent.id} agent={agent} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">How Keys-AI Works</h2>
            <p className="subtitle max-w-2xl mx-auto">
              Our platform makes automation simple. Choose a package, connect your accounts, and let AI handle the rest.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard 
              number={1} 
              title="Choose a Package" 
              description="Select from our Instagram DM Automation, WhatsApp Reminders, or Bill Management packages."
            />
            <StepCard 
              number={2} 
              title="Connect Your Accounts" 
              description="Link your Instagram, WhatsApp, or Google Calendar with our secure authentication."
            />
            <StepCard 
              number={3} 
              title="Enjoy Automation" 
              description="Watch as Keys-AI handles your tasks, with detailed stats in your dashboard."
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Our Intelligent Agents</h2>
            <p className="subtitle max-w-2xl mx-auto">
              Keys-AI offers specialized agents built to handle specific business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<MessageSquare size={24} />}
              title="Pack Social" 
              description="Automate Instagram and social media responses, handle inquiries 24/7."
            />
            <FeatureCard 
              icon={<Bell size={24} />}
              title="Pack Office" 
              description="Manage schedules, automate reminders, and organize your workspace efficiently."
            />
            <FeatureCard 
              icon={<HomeIcon size={24} />}
              title="Pack Manager" 
              description="Track expenses, handle invoices, and optimize your business operations."
            />
            <FeatureCard 
              icon={<DollarSign size={24} />}
              title="Pack Closer" 
              description="Convert leads to sales with automated follow-ups and personalized messaging."
            />
          </div>
          
          <div className="text-center mt-12">
            <Link to="/agents">
              <Button className="btn-primary">View All Agents</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-keysai-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Automate Your Business?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join Keys-AI today and transform how you handle Instagram DMs, WhatsApp reminders, and bill payments.
          </p>
          
          <Link to={user ? "/agents" : "/signup"}>
            <Button variant="outline" className="bg-white text-keysai-accent hover:bg-gray-100 border-white">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
