
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Agent } from '@/types';
import { subscribeToAgent } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, agent }) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubscribe = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (!user) {
        throw new Error('You must be logged in to subscribe');
      }
      
      // This is a mock implementation
      await subscribeToAgent(agent.id);
      
      toast.success(`Subscribed to ${agent.name} successfully!`);
      onClose();
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Error processing subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subscribe to {agent.name}</DialogTitle>
          <DialogDescription>
            {agent.promo_price ? (
              <>
                {agent.promo_price}€/month for first {agent.promo_duration} months, 
                then {agent.base_price}€/month
              </>
            ) : (
              <>{agent.base_price}€/month</>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              name="cardName"
              placeholder="John Doe"
              value={formData.cardName}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                placeholder="123"
                value={formData.cvv}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubscribe}
            disabled={isSubmitting}
            className="bg-keysai-accent hover:bg-blue-600"
          >
            {isSubmitting ? 'Processing...' : 'Subscribe Now'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
