
import React from 'react';

const AboutPage = () => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="heading-lg mb-4">About Keys-AI</h1>
          <p className="subtitle">
            Revolutionizing business automation with intelligent AI agents
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-custom p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-keysai-textBody mb-6">
            At Keys-AI, we believe that businesses should focus on what they do best: creating value for their customers. That's why we built a suite of AI agents designed to automate time-consuming tasks, streamline workflows, and enhance productivity across your organization.
          </p>
          <p className="text-keysai-textBody">
            Our mission is to make powerful AI automation accessible to businesses of all sizes, empowering them to operate more efficiently and effectively in today's fast-paced digital landscape.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-custom p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-keysai-textBody mb-6">
            Keys-AI was founded in 2024 by a team of AI specialists and business consultants who recognized a common pattern: businesses were spending countless hours on repetitive tasks that could be automated with the right technology.
          </p>
          <p className="text-keysai-textBody mb-6">
            We started by developing Pack Social, our Instagram DM automation agent, which quickly gained popularity among social media managers and small business owners. Encouraged by this success, we expanded our offerings to include Pack Office, Pack Manager, and Pack Closer, each addressing specific business automation needs.
          </p>
          <p className="text-keysai-textBody">
            Today, Keys-AI serves clients across various industries, helping them save time, reduce costs, and improve operational efficiency through intelligent automation.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-custom p-8">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-keysai-accent">Innovation</h3>
              <p className="text-keysai-textBody">
                We continuously push the boundaries of AI technology to develop smarter, more efficient automation solutions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-keysai-accent">Reliability</h3>
              <p className="text-keysai-textBody">
                We build our AI agents to be dependable and consistent, ensuring your business operations run smoothly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-keysai-accent">Security</h3>
              <p className="text-keysai-textBody">
                We prioritize the security and privacy of your data, implementing robust protections across all our systems.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-keysai-accent">Customer Success</h3>
              <p className="text-keysai-textBody">
                We measure our success by the positive impact our solutions have on your business outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
