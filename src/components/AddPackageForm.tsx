
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

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
import { Plus, Trash2 } from 'lucide-react';

const packageFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  basePrice: z.coerce.number().positive('Base price must be positive'),
  hasPromo: z.boolean().default(false),
  promoPrice: z.coerce.number().positive('Promo price must be positive').optional(),
  promoDuration: z.coerce.number().int().positive('Duration must be a positive integer').optional(),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
});

type PackageFormValues = z.infer<typeof packageFormSchema>;

interface AddPackageFormProps {
  onSubmit: (data: Omit<PackageFormValues, 'hasPromo'>) => void;
}

const AddPackageForm = ({ onSubmit }: AddPackageFormProps) => {
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      name: '',
      description: '',
      basePrice: 0,
      hasPromo: false,
      promoPrice: undefined,
      promoDuration: undefined,
      features: [''],
    },
  });

  const { watch } = form;
  const hasPromo = watch('hasPromo');

  const handleSubmit = (data: PackageFormValues) => {
    try {
      const { hasPromo, ...packageData } = data;
      
      // If hasPromo is false, remove promo fields
      const finalData = hasPromo 
        ? packageData 
        : { 
            name: packageData.name,
            description: packageData.description,
            basePrice: packageData.basePrice,
            features: packageData.features
          };
      
      onSubmit(finalData);
    } catch (error) {
      toast.error('Failed to create package');
      console.error(error);
    }
  };

  const addFeature = () => {
    const features = form.getValues('features') || [];
    form.setValue('features', [...features, '']);
  };

  const removeFeature = (index: number) => {
    const features = form.getValues('features') || [];
    form.setValue('features', features.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter package name" {...field} />
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
                  placeholder="Describe what this package offers" 
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
          name="basePrice"
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
          name="hasPromo"
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
              name="promoPrice"
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
              name="promoDuration"
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
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <FormLabel>Features</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addFeature}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Feature
            </Button>
          </div>
          
          {form.watch('features').map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name={`features.${index}`}
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormControl>
                    <div className="flex gap-2">
                      <Input {...field} placeholder={`Feature ${index + 1}`} />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFeature(index)}
                        disabled={form.watch('features').length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        
        <Button type="submit" className="w-full">
          Create Package
        </Button>
      </form>
    </Form>
  );
};

export default AddPackageForm;
