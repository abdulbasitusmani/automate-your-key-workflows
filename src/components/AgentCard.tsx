
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Agent } from '@/types';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <div className="bg-white rounded-xl shadow-custom p-6 flex flex-col h-full">
      <h3 className="text-xl font-bold mb-2">{agent.name}</h3>
      <p className="text-keysai-textBody mb-4 flex-grow">{agent.description.substring(0, 100)}...</p>
      
      <div className="mt-auto">
        <div className="mb-4">
          {agent.promo_price ? (
            <div className="space-y-1">
              <p className="text-2xl font-bold text-keysai-accent">
                {agent.promo_price}€<span className="text-sm font-normal">/month</span>
              </p>
              <p className="text-sm text-keysai-textBody">
                for first {agent.promo_duration} months, then {agent.base_price}€/month
              </p>
            </div>
          ) : (
            <p className="text-2xl font-bold text-keysai-accent">
              {agent.base_price}€<span className="text-sm font-normal">/month</span>
            </p>
          )}
        </div>
        
        <Link to={`/agents/${agent.id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default AgentCard;
