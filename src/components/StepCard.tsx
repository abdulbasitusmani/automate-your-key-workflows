
import React from 'react';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-custom p-6 flex flex-col items-start">
      <div className="bg-keysai-accent text-white rounded-full w-10 h-10 flex items-center justify-center mb-4 font-bold">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-keysai-textBody">{description}</p>
    </div>
  );
};

export default StepCard;
