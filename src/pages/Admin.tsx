
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { getAllUsers, getAllSubscriptions, updateUserRole } from '@/lib/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus, Trash2, Edit2, Save, Shield, Package, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';
import AddPackageForm from '@/components/AddPackageForm';

// Define the type for package items
interface PackageItem {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  promoPrice?: number;
  promoDuration?: number;
  features: string[];
}

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Contact Information State
  const [contactInfo, setContactInfo] = useState({
    email: 'contact@keys-ai.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Street, Tech City, TC 12345'
  });

  // About Section State
  const [aboutInfo, setAboutInfo] = useState({
    mission: 'At Keys-AI, we believe that businesses should focus on what they do best: creating value for their customers.',
    story: 'Keys-AI was founded in 2024 by a team of AI specialists and business consultants who recognized a common pattern: businesses were spending countless hours on repetitive tasks that could be automated with the right technology.',
    values: {
      innovation: 'We continuously push the boundaries of AI technology to develop smarter, more efficient automation solutions.',
      reliability: 'We build our AI agents to be dependable and consistent, ensuring your business operations run smoothly.',
      security: 'We prioritize the security and privacy of your data, implementing robust protections across all our systems.',
      customerSuccess: 'We measure our success by the positive impact our solutions have on your business outcomes.'
    }
  });

  // Fetch agents from Supabase
  const { data: adminAgents, isLoading: agentsLoading } = useQuery({
    queryKey: ['admin-agents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user && role === 'admin',
  });
  
  // Packages State
  const [packages, setPackages] = useState<PackageItem[]>([
    {
      id: 1,
      name: 'Pack Social',
      description: 'Automate your social media engagement with our AI-powered social media assistant.',
      basePrice: 300,
      promoPrice: 250,
      promoDuration: 2, // months
      features: [
        'AI-powered Instagram DM responses',
        'Automated content scheduling',
        'Sentiment analysis for messages',
        'Custom reply templates',
        'Follower engagement tracking'
      ]
    },
    {
      id: 2,
      name: 'Pack Office',
      description: 'Streamline your office workflows with intelligent scheduling and reminders.',
      basePrice: 450,
      features: [
        'WhatsApp reminder automation',
        'Meeting scheduler and organizer',
        'Document processing and sorting',
        'Email template management',
        'Client communication tracking'
      ]
    },
    {
      id: 3,
      name: 'Pack Manager',
      description: 'Take control of your finances with automated bill management and expense tracking.',
      basePrice: 500,
      features: [
        'Expense tracking and categorization',
        'Bill payment automation',
        'Invoice generation and sending',
        'Financial reporting and analytics',
        'Budget optimization suggestions'
      ]
    },
    {
      id: 4,
      name: 'Pack Closer',
      description: 'Convert leads to sales with automated follow-ups and personalized messaging.',
      basePrice: 600,
      features: [
        'Lead qualification automation',
        'Personalized follow-up sequences',
        'Deal progress tracking',
        'Proposal generation assistance',
        'Sales performance analytics'
      ]
    }
  ]);

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

  const handleSaveContact = () => {
    // Here you would typically make an API call to update the contact information
    toast.success('Contact information updated successfully!');
    setIsEditing(false);
  };

  const handleSaveAbout = () => {
    // Here you would typically make an API call to update the about section
    toast.success('About section updated successfully!');
    setIsEditing(false);
  };

  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      await updateUserRole(userId, newRole);
      toast.success('User role updated successfully!');
      // Invalidate and refetch users query
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    } catch (error: any) {
      toast.error(error.message || 'Failed to update user role');
    }
  };

  const handleSavePackage = (packageId: number) => {
    // Here you would typically make an API call to update the package
    toast.success('Package updated successfully!');
  };

  const handleDeletePackage = (packageId: number) => {
    // Here you would typically make an API call to delete the package
    const updatedPackages = packages.filter(pkg => pkg.id !== packageId);
    setPackages(updatedPackages);
    toast.success('Package deleted successfully!');
  };

  const handleAddPackageFeature = (packageId: number) => {
    const updatedPackages = packages.map(p => {
      if (p.id === packageId) {
        return {
          ...p,
          features: [...p.features, '']
        };
      }
      return p;
    });
    setPackages(updatedPackages);
  };

  const handleUpdatePackageFeature = (packageId: number, featureIndex: number, value: string) => {
    const updatedPackages = packages.map(p => {
      if (p.id === packageId) {
        const updatedFeatures = [...p.features];
        updatedFeatures[featureIndex] = value;
        return {
          ...p,
          features: updatedFeatures
        };
      }
      return p;
    });
    setPackages(updatedPackages);
  };

  const handleRemovePackageFeature = (packageId: number, featureIndex: number) => {
    const updatedPackages = packages.map(p => {
      if (p.id === packageId) {
        return {
          ...p,
          features: p.features.filter((_, i) => i !== featureIndex)
        };
      }
      return p;
    });
    setPackages(updatedPackages);
  };

  const handleUpdatePackageField = (packageId: number, field: keyof PackageItem, value: any) => {
    const updatedPackages = packages.map(p => {
      if (p.id === packageId) {
        return {
          ...p,
          [field]: value
        };
      }
      return p;
    });
    setPackages(updatedPackages);
  };

  const handleAddNewPackage = (newPackage: Omit<PackageItem, 'id'>) => {
    // Generate a new ID (in a real app, this would be handled by the database)
    const newId = Math.max(...packages.map(p => p.id)) + 1;
    const packageToAdd = {
      ...newPackage,
      id: newId
    };
    
    setPackages([...packages, packageToAdd]);
    setIsAddPackageOpen(false);
    toast.success('Package added successfully!');
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="heading-lg mb-8">Admin Panel</h1>
        
        <Tabs defaultValue="packages" className="space-y-6">
          <TabsList className="mb-8 flex flex-wrap overflow-auto">
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          </TabsList>

          {/* Packages Management */}
          <TabsContent value="packages">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Package Management</h2>
                  <Dialog open={isAddPackageOpen} onOpenChange={setIsAddPackageOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add New Package
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <div className="flex justify-between items-center">
                          <DialogTitle>Add New Package</DialogTitle>
                          <DialogClose className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                          </DialogClose>
                        </div>
                        <DialogDescription>
                          Create a new package for your customers to subscribe to.
                        </DialogDescription>
                      </DialogHeader>
                      <AddPackageForm onSubmit={handleAddNewPackage} />
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="space-y-6">
                  {packages.map((pkg) => (
                    <Card key={pkg.id} className="p-4">
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                          <div className="w-full md:w-3/4">
                            <h3 className="text-lg font-semibold">{pkg.name}</h3>
                            <p className="text-sm text-keysai-textBody">{pkg.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-2 w-full md:w-auto">
                            <Button
                              variant="outline"
                              size={isMobile ? "sm" : "default"}
                              onClick={() => handleSavePackage(pkg.id)}
                              className="flex items-center gap-2"
                            >
                              <Save className="h-4 w-4" />
                              Save
                            </Button>
                            <Button
                              variant="destructive"
                              size={isMobile ? "sm" : "default"}
                              onClick={() => handleDeletePackage(pkg.id)}
                              className="flex items-center gap-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Base Price (€/month)</Label>
                            <Input
                              type="number"
                              value={pkg.basePrice}
                              onChange={(e) => handleUpdatePackageField(pkg.id, 'basePrice', Number(e.target.value))}
                            />
                          </div>
                          <div>
                            <Label>Promo Price (€/month)</Label>
                            <Input
                              type="number"
                              value={pkg.promoPrice || ''}
                              onChange={(e) => handleUpdatePackageField(pkg.id, 'promoPrice', e.target.value ? Number(e.target.value) : undefined)}
                              placeholder="Optional"
                            />
                          </div>
                          {pkg.promoPrice && (
                            <div>
                              <Label>Promo Duration (months)</Label>
                              <Input
                                type="number"
                                value={pkg.promoDuration || ''}
                                onChange={(e) => handleUpdatePackageField(pkg.id, 'promoDuration', e.target.value ? Number(e.target.value) : undefined)}
                              />
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <Label>Features</Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddPackageFeature(pkg.id)}
                              className="flex items-center gap-2"
                            >
                              <Plus className="h-4 w-4" />
                              Add Feature
                            </Button>
                          </div>
                          <div className="mt-2 space-y-2">
                            {pkg.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Input
                                  value={feature}
                                  onChange={(e) => handleUpdatePackageFeature(pkg.id, index, e.target.value)}
                                  className="flex-grow"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemovePackageFeature(pkg.id, index)}
                                  className="shrink-0"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Information Management */}
          <TabsContent value="contact">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Contact Information</h2>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Textarea
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex justify-end">
                      <Button
                        onClick={handleSaveContact}
                        className="bg-keysai-accent hover:bg-blue-600"
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Section Management */}
          <TabsContent value="about">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">About Section</h2>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Mission Statement</Label>
                    <Textarea
                      value={aboutInfo.mission}
                      onChange={(e) => setAboutInfo({ ...aboutInfo, mission: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Our Story</Label>
                    <Textarea
                      value={aboutInfo.story}
                      onChange={(e) => setAboutInfo({ ...aboutInfo, story: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-4">
                    <Label>Our Values</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Innovation</Label>
                        <Textarea
                          value={aboutInfo.values.innovation}
                          onChange={(e) => setAboutInfo({
                            ...aboutInfo,
                            values: { ...aboutInfo.values, innovation: e.target.value }
                          })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Reliability</Label>
                        <Textarea
                          value={aboutInfo.values.reliability}
                          onChange={(e) => setAboutInfo({
                            ...aboutInfo,
                            values: { ...aboutInfo.values, reliability: e.target.value }
                          })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Security</Label>
                        <Textarea
                          value={aboutInfo.values.security}
                          onChange={(e) => setAboutInfo({
                            ...aboutInfo,
                            values: { ...aboutInfo.values, security: e.target.value }
                          })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Customer Success</Label>
                        <Textarea
                          value={aboutInfo.values.customerSuccess}
                          onChange={(e) => setAboutInfo({
                            ...aboutInfo,
                            values: { ...aboutInfo.values, customerSuccess: e.target.value }
                          })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end">
                      <Button
                        onClick={handleSaveAbout}
                        className="bg-keysai-accent hover:bg-blue-600"
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management */}
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Shield className="h-4 w-4 mr-2" />
                                  Manage Role
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleUpdateUserRole(user.id, 'admin')}
                                  className={user.role === 'admin' ? 'bg-purple-50' : ''}
                                >
                                  Make Admin
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleUpdateUserRole(user.id, 'user')}
                                  className={user.role === 'user' ? 'bg-green-50' : ''}
                                >
                                  Make User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions Management */}
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
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline"
                                  size="sm"
                                >
                                  Manage
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <div className="flex justify-between items-center">
                                    <DialogTitle>Manage Subscription</DialogTitle>
                                    <DialogClose className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100">
                                      <X className="h-4 w-4" />
                                      <span className="sr-only">Close</span>
                                    </DialogClose>
                                  </div>
                                </DialogHeader>
                                <div className="space-y-4 pt-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label>Status</Label>
                                      <select 
                                        className="w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2" 
                                        defaultValue={sub.status}
                                      >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="suspended">Suspended</option>
                                      </select>
                                    </div>
                                    <div>
                                      <Label>Promo End Date</Label>
                                      <Input 
                                        type="date" 
                                        defaultValue={sub.promo_end_date ? new Date(sub.promo_end_date).toISOString().split('T')[0] : ''} 
                                      />
                                    </div>
                                  </div>
                                  <div className="flex justify-end">
                                    <Button onClick={() => toast.success('Subscription updated')}>
                                      Save Changes
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
