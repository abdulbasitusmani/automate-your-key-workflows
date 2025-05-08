
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { getUserSubscriptions } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: subscriptions, isLoading, error } = useQuery({
    queryKey: ['subscriptions', user?.id],
    queryFn: () => getUserSubscriptions(user!.id),
    enabled: !!user,
  });

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      toast.error('Please log in to access your dashboard');
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-keysai-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your subscriptions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading your subscriptions. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="heading-lg mb-8">Your Dashboard</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your Active Subscriptions</h2>
          
          {subscriptions && subscriptions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptions.map((subscription) => (
                <Card key={subscription.id} className="h-full">
                  <CardHeader>
                    <CardTitle>{subscription.agent?.name}</CardTitle>
                    <CardDescription>
                      Subscribed since: {new Date(subscription.start_date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-sm text-gray-500">Status</h3>
                        <p className="font-medium">
                          {subscription.status === 'active' ? (
                            <span className="text-green-500">Active</span>
                          ) : (
                            <span className="text-red-500">Cancelled</span>
                          )}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-sm text-gray-500">Current Price</h3>
                        <p className="font-medium">
                          {subscription.promo_end_date && new Date(subscription.promo_end_date) > new Date() ? (
                            <>
                              {subscription.agent?.promo_price}€/month
                              <span className="text-sm text-gray-500 block">
                                Promotional price until {new Date(subscription.promo_end_date).toLocaleDateString()}
                              </span>
                            </>
                          ) : (
                            <>{subscription.agent?.base_price}€/month</>
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => toast.info('Manage subscription feature coming soon!')}>
                      Manage
                    </Button>
                    <Button onClick={() => navigate(`/agents/${subscription.agent_id}`)}>
                      View Agent
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-custom p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">You don't have any active subscriptions</h3>
              <p className="text-keysai-textBody mb-6">
                Explore our AI agents and choose the right automation solution for your business needs.
              </p>
              <Button 
                className="bg-keysai-accent hover:bg-blue-600"
                onClick={() => navigate('/agents')}
              >
                Browse Agents
              </Button>
            </div>
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
          
          <div className="bg-white rounded-xl shadow-custom p-8">
            <h3 className="text-xl font-semibold mb-4">Unlock More Automation Potential</h3>
            <p className="text-keysai-textBody mb-6">
              Based on your current subscriptions, these agents would complement your automation strategy:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="p-6 h-auto"
                onClick={() => navigate('/agents')}
              >
                <div className="text-left">
                  <h4 className="font-semibold mb-1 text-keysai-accent">Pack Social</h4>
                  <p className="text-sm text-keysai-textBody">
                    Automate your social media engagement with our AI-powered social media assistant.
                  </p>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="p-6 h-auto"
                onClick={() => navigate('/agents')}
              >
                <div className="text-left">
                  <h4 className="font-semibold mb-1 text-keysai-accent">Pack Office</h4>
                  <p className="text-sm text-keysai-textBody">
                    Streamline your office workflows with intelligent scheduling and reminders.
                  </p>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="p-6 h-auto"
                onClick={() => navigate('/agents')}
              >
                <div className="text-left">
                  <h4 className="font-semibold mb-1 text-keysai-accent">Pack Manager</h4>
                  <p className="text-sm text-keysai-textBody">
                    Take control of your finances with automated bill management and expense tracking.
                  </p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
