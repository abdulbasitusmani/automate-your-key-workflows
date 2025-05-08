
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { getAllUsers, getAllSubscriptions } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, role } = useAuth();
  
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: getAllUsers,
    enabled: !!user && role === 'admin',
  });
  
  const { data: subscriptions, isLoading: subscriptionsLoading } = useQuery({
    queryKey: ['admin-subscriptions'],
    queryFn: getAllSubscriptions,
    enabled: !!user && role === 'admin',
  });

  // Redirect if not admin
  React.useEffect(() => {
    if (user && role !== 'admin') {
      toast.error('Access denied. Admin privileges required.');
      navigate('/dashboard');
    } else if (!user) {
      toast.error('Please log in to access this page.');
      navigate('/login');
    }
  }, [user, role, navigate]);

  if (!user || role !== 'admin') {
    return null;
  }

  const isLoading = usersLoading || subscriptionsLoading;

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-keysai-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading admin data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="heading-lg mb-8">Admin Panel</h1>
        
        <Tabs defaultValue="users">
          <TabsList className="mb-8">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">User Management</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users?.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.first_name} {user.last_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => toast.info('User management features coming soon!')}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscriptions">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Subscription Management</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Agent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Start Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Promo End Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {subscriptions?.map((sub) => (
                        <tr key={sub.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {sub.user?.first_name} {sub.user?.last_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {sub.agent?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              sub.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(sub.start_date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {sub.promo_end_date ? new Date(sub.promo_end_date).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => toast.info('Subscription management features coming soon!')}
                            >
                              Manage
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="agents">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Agent Management</h2>
                  <Button 
                    onClick={() => toast.info('Agent creation feature coming soon!')}
                  >
                    Add New Agent
                  </Button>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <p className="text-lg font-medium mb-2">Agent Management Interface</p>
                  <p className="text-keysai-textBody mb-4">
                    This section will allow you to create, edit, and manage AI agents.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => toast.info('Agent management features coming soon!')}
                  >
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
