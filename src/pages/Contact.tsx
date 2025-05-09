
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real application, you would send this data to your API
      console.log('Form submitted:', values);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully! We will get back to you soon.');
      form.reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="heading-lg mb-4">Get in Touch</h1>
          <p className="subtitle max-w-2xl mx-auto">
            Have questions about our AI agents or need help implementing a custom solution? Contact our team for assistance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-custom p-8">
              <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="What's this regarding?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us how we can help you..." 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-xl shadow-custom p-8">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <Mail className="h-5 w-5 text-keysai-accent mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-keysai-textBody">support@keys-ai.com</p>
                  </div>
                </div>
                
                <div className="flex">
                  <Phone className="h-5 w-5 text-keysai-accent mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-keysai-textBody">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex">
                  <MapPin className="h-5 w-5 text-keysai-accent mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold">Office Location</h4>
                    <p className="text-keysai-textBody">
                      123 AI Innovation Ave<br />
                      Tech City, TC 12345<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
              
              <hr className="my-6 border-gray-200" />
              
              <div>
                <h4 className="font-semibold mb-3">Business Hours</h4>
                <p className="text-keysai-textBody mb-1">Monday - Friday: 9am - 5pm EST</p>
                <p className="text-keysai-textBody">Saturday - Sunday: Closed</p>
                <p className="mt-4 text-sm text-keysai-textBody">
                  Our AI agents are available 24/7 for subscribers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
