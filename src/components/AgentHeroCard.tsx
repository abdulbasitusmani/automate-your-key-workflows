import React from 'react';
import { Agent } from '@/types';

interface AgentHeroCardProps {
  agent: Agent;
}

const AgentHeroCard: React.FC<AgentHeroCardProps> = ({ agent }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-xl font-bold mb-3 text-keysai-accent">{agent.name}</h3>
      <p className="text-sm text-keysai-textBody mb-4 flex-grow">{agent.description}</p>
    </div>
  );
};

export default AgentHeroCard;
