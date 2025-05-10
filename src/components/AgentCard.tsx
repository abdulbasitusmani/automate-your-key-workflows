import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Agent } from '@/types';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/agents/${agent.id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-custom p-6 flex flex-col h-full">
      <h3 className="text-xl font-bold mb-2">{agent.name}</h3>
      <p className="text-keysai-textBody mb-4 flex-grow">{agent.description.substring(0, 100)}...</p>
      
      <div className="mt-auto">
        <Button 
          className="w-full"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default AgentCard;
