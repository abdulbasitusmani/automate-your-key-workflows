
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This would normally send data to a backend API
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="heading-lg mb-4">Contact Us</h1>
          <p className="subtitle">
            Have questions about Keys-AI? We're here to help!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-custom p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              
              <Button 
                className="w-full bg-keysai-accent hover:bg-blue-600"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
              
              <p className="text-sm text-keysai-textBody">
                * Required fields
              </p>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-xl shadow-custom p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-keysai-accent">Email</h3>
                  <p className="text-keysai-textBody">info@keys-ai.com</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-keysai-accent">Phone</h3>
                  <p className="text-keysai-textBody">(123) 456-7890</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-keysai-accent">Hours</h3>
                  <p className="text-keysai-textBody">Monday - Friday: 9am - 6pm CET</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-custom p-8">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold">How quickly can I get started with Keys-AI?</h3>
                  <p className="text-keysai-textBody">
                    You can sign up and subscribe to an agent in minutes. Depending on the complexity of your setup, you might be fully operational within a few hours.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Is my data secure with Keys-AI?</h3>
                  <p className="text-keysai-textBody">
                    Yes, we implement industry-standard security measures to protect your data. We never share your information with third parties.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Can I cancel my subscription anytime?</h3>
                  <p className="text-keysai-textBody">
                    Yes, all our subscriptions are flexible and can be cancelled at any time without penalties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
