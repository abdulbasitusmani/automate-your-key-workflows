
import React from 'react';
import AgentCard from '@/components/AgentCard';
import { Agent } from '@/types';
import { getAgents } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const AgentsPage = () => {
  const { data: agents, isLoading, error } = useQuery({
    queryKey: ['agents'],
    queryFn: getAgents,
  });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-keysai-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading agents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading agents. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-keysai-textDark">Our AI Agents</h1>
          <p className="text-lg text-keysai-textBody max-w-2xl mx-auto">
            Choose from our specialized AI agents to automate your business workflows and increase productivity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {agents?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;
