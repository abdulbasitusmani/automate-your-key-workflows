
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-custom p-6 transition-all hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-3 rounded-full text-keysai-accent mr-4">
          {icon}
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="text-keysai-textBody">{description}</p>
    </div>
  );
};

export default FeatureCard;
