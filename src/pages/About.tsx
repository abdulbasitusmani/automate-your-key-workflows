
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Lightbulb, Loader, Users } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-keysai-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="heading-xl mb-6">About Keys-AI</h1>
              <p className="subtitle mb-8">
                We're on a mission to help businesses save time and increase efficiency by automating routine tasks with advanced AI technology.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-custom p-8">
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p className="text-keysai-textBody">
                At Keys-AI, we believe that businesses should focus on what they do best: creating value for their customers. Our AI agents handle the repetitive tasks, giving you back hours in your day to focus on growth and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gray-100 rounded-xl h-64 md:h-96"></div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="heading-lg mb-6">Our Story</h2>
              <p className="text-keysai-textBody mb-6">
                Keys-AI was founded in 2024 by a team of AI specialists and business consultants who recognized a common pattern: businesses were spending countless hours on repetitive tasks that could be automated with the right technology.
              </p>
              <p className="text-keysai-textBody mb-6">
                After developing several successful internal tools for clients, our team decided to build a platform that would make AI automation accessible to businesses of all sizes. The result is Keys-AI: a suite of AI agents designed to handle specific business workflows with minimal setup time.
              </p>
              <p className="text-keysai-textBody">
                Today, we help hundreds of businesses save time and reduce costs by automating social media responses, scheduling reminders, and managing finances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Our Values</h2>
            <p className="subtitle max-w-2xl mx-auto">
              These core principles guide everything we do at Keys-AI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-custom p-8">
              <div className="bg-blue-100 p-3 rounded-full text-keysai-accent w-12 h-12 flex items-center justify-center mb-4">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-keysai-textBody">
                We continuously push the boundaries of AI technology to develop smarter, more efficient automation solutions.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-custom p-8">
              <div className="bg-blue-100 p-3 rounded-full text-keysai-accent w-12 h-12 flex items-center justify-center mb-4">
                <Loader size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Reliability</h3>
              <p className="text-keysai-textBody">
                We build our AI agents to be dependable and consistent, ensuring your business operations run smoothly.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-custom p-8">
              <div className="bg-blue-100 p-3 rounded-full text-keysai-accent w-12 h-12 flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Security</h3>
              <p className="text-keysai-textBody">
                We prioritize the security and privacy of your data, implementing robust protections across all our systems.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-custom p-8">
              <div className="bg-blue-100 p-3 rounded-full text-keysai-accent w-12 h-12 flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Success</h3>
              <p className="text-keysai-textBody">
                We measure our success by the positive impact our solutions have on your business outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-keysai-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join Keys-AI today and discover how our AI agents can transform your business operations.
          </p>
          
          <Link to="/signup">
            <Button variant="outline" className="bg-white text-keysai-accent hover:bg-gray-100 border-white">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
