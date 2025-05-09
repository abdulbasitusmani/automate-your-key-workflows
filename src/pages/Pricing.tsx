import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleGetStarted = (pkg: any) => {
    if (!user) {
      toast.error('Please log in to subscribe to a package');
      navigate('/login');
      return;
    }
    setSelectedPackage(pkg);
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the payment processing
    toast.success('Payment processed successfully!');
    setShowPaymentForm(false);
    navigate('/dashboard');
  };

  const handleCloseForm = () => {
    setShowPaymentForm(false);
    setSelectedPackage(null);
  };

  const packages = [
    {
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
  ];

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="heading-lg mb-4">Simple, Transparent Pricing</h1>
          <p className="text-keysai-textBody max-w-2xl mx-auto">
            Choose the perfect automation package for your business needs. All packages include our core AI technology and 24/7 support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <div className="text-3xl font-bold">
                    {pkg.promoPrice ? (
                      <>
                        <span className="text-keysai-accent">{pkg.promoPrice}€</span>
                        <span className="text-sm text-gray-500">/month</span>
                        <div className="text-sm text-gray-500 mt-1">
                          First {pkg.promoDuration} months
                        </div>
                        <div className="text-sm text-gray-500">
                          Then {pkg.basePrice}€/month
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-keysai-accent">{pkg.basePrice}€</span>
                        <span className="text-sm text-gray-500">/month</span>
                      </>
                    )}
                  </div>
                </div>
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-keysai-accent hover:bg-blue-600"
                  onClick={() => handleGetStarted(pkg)}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-4 max-w-md w-full mx-auto my-4 relative">
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="max-h-[calc(100vh-2rem)] overflow-y-auto pr-2">
              <h2 className="text-xl font-bold mb-2">Complete Your Subscription</h2>
              <p className="text-sm text-gray-600 mb-3">
                You're subscribing to {selectedPackage.name} for {selectedPackage.promoPrice ? `${selectedPackage.promoPrice}€/month` : `${selectedPackage.basePrice}€/month`}
              </p>

              <form onSubmit={handlePaymentSubmit} className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="cardNumber" className="text-sm">Card Number</Label>
                  <Input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                    required
                    className="h-8"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="cardHolder" className="text-sm">Card Holder Name</Label>
                  <Input
                    id="cardHolder"
                    type="text"
                    placeholder="John Doe"
                    value={paymentDetails.cardHolder}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardHolder: e.target.value })}
                    required
                    className="h-8"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="expiryDate" className="text-sm">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      type="text"
                      placeholder="MM/YY"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                      required
                      className="h-8"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="cvv" className="text-sm">CVV</Label>
                    <Input
                      id="cvv"
                      type="text"
                      placeholder="123"
                      value={paymentDetails.cvv}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                      required
                      className="h-8"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="billingAddress" className="text-sm">Billing Address</Label>
                  <Input
                    id="billingAddress"
                    type="text"
                    placeholder="123 Street Name"
                    value={paymentDetails.billingAddress}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, billingAddress: e.target.value })}
                    required
                    className="h-8"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="city" className="text-sm">City</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="City"
                      value={paymentDetails.city}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, city: e.target.value })}
                      required
                      className="h-8"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="postalCode" className="text-sm">Postal Code</Label>
                    <Input
                      id="postalCode"
                      type="text"
                      placeholder="12345"
                      value={paymentDetails.postalCode}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, postalCode: e.target.value })}
                      required
                      className="h-8"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="country" className="text-sm">Country</Label>
                  <Input
                    id="country"
                    type="text"
                    placeholder="Country"
                    value={paymentDetails.country}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, country: e.target.value })}
                    required
                    className="h-8"
                  />
                </div>

                <Button type="submit" className="w-full bg-keysai-accent hover:bg-blue-600 h-8 mt-3">
                  Complete Payment
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPage; 