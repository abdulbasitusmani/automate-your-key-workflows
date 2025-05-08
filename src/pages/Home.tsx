
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, Bell, Home } from 'lucide-react';
import StepCard from '@/components/StepCard';
import FeatureCard from '@/components/FeatureCard';
import { useAuth } from '@/hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-keysai-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="heading-xl mb-6">
                Automate Your Business Workflows
              </h1>
              <p className="subtitle mb-8">
                Keys-AI gives you the power to automate Instagram DMs, WhatsApp reminders, and bill management with intelligent AI workflows.
              </p>
              <div className="flex flex-wrap gap-4">
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
            
            <div>
              <div className="bg-white rounded-xl shadow-custom p-8">
                <h3 className="text-xl font-bold mb-6 text-keysai-accent">AI-Powered Automations</h3>
                <ul className="space-y-6">
                  <li className="flex">
                    <div className="bg-blue-100 p-2 rounded-full text-keysai-accent mr-4 h-min">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Instagram DM Automation</h4>
                      <p className="text-keysai-textBody text-sm">Respond to messages with AI.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="bg-blue-100 p-2 rounded-full text-keysai-accent mr-4 h-min">
                      <Bell size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">WhatsApp Reminders</h4>
                      <p className="text-keysai-textBody text-sm">Schedule and send automatically.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="bg-blue-100 p-2 rounded-full text-keysai-accent mr-4 h-min">
                      <Home size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Bill Management</h4>
                      <p className="text-keysai-textBody text-sm">Never miss a payment with smart scheduling.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
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
              icon={<Home size={24} />}
              title="Pack Manager" 
              description="Track expenses, handle invoices, and optimize your business operations."
            />
            <FeatureCard 
              icon={<MessageSquare size={24} />}
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
