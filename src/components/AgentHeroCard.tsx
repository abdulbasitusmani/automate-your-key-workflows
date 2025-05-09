
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Agent } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

interface AgentHeroCardProps {
  agent: Agent;
}

const AgentHeroCard: React.FC<AgentHeroCardProps> = ({ agent }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col h-full">
      <h3 className="text-lg font-bold mb-2 text-keysai-accent">{agent.name}</h3>
      <p className="text-sm text-keysai-textBody mb-3 flex-grow line-clamp-2">{agent.description}</p>
      
      <div className="mt-auto">
        <div className="mb-3">
          {agent.promo_price ? (
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold text-keysai-accent">
                {agent.promo_price}€
              </p>
              <p className="text-xs text-gray-500 line-through">
                {agent.base_price}€
              </p>
            </div>
          ) : (
            <p className="text-xl font-bold text-keysai-accent">
              {agent.base_price}€
            </p>
          )}
          <p className="text-xs text-gray-600">/month</p>
        </div>
        
        <Link to={`/agents/${agent.id}`} className="w-full block">
          <Button size={isMobile ? "sm" : "default"} className="w-full">Learn More</Button>
        </Link>
      </div>
    </div>
  );
};

export default AgentHeroCard;
