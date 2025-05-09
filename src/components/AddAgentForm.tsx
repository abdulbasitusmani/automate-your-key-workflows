
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const agentFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  base_price: z.coerce.number().positive('Base price must be positive'),
  has_promo: z.boolean().default(false),
  promo_price: z.coerce.number().positive('Promo price must be positive').optional(),
  promo_duration: z.coerce.number().int().positive('Duration must be a positive integer').optional(),
});

type AgentFormValues = z.infer<typeof agentFormSchema>;

const AddAgentForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  
  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentFormSchema),
    defaultValues: {
      name: '',
      description: '',
      base_price: 0,
      has_promo: false,
      promo_price: undefined,
      promo_duration: undefined,
    },
  });

  const { watch } = form;
  const hasPromo = watch('has_promo');

  const onSubmit = async (data: AgentFormValues) => {
    try {
      const { name, description, base_price, has_promo, promo_price, promo_duration } = data;
      
      const { error } = await supabase.from('agents').insert({
        name,
        description,
        base_price,
        promo_price: has_promo ? promo_price : null,
        promo_duration: has_promo ? promo_duration : null,
      });
      
      if (error) throw error;
      
      toast.success('Agent created successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin-agents'] });
      queryClient.invalidateQueries({ queryKey: ['agents'] });
      
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error('Failed to create agent');
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter agent name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe what this agent does" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="base_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Price (€/month)</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="has_promo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-3">
              <div>
                <FormLabel>Has Promotional Offer</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        {hasPromo && (
          <>
            <FormField
              control={form.control}
              name="promo_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Promotional Price (€/month)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="promo_duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Promotional Duration (months)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" step="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        
        <Button type="submit" className="w-full">
          Create Agent
        </Button>
      </form>
    </Form>
  );
};

export default AddAgentForm;
