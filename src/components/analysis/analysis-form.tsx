'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ScanText } from 'lucide-react';

const formSchema = z.object({
  content: z.string().min(10, 'Please enter at least 10 characters.').max(5000, 'Content must be less than 5000 characters.'),
});

type AnalysisFormProps = {
  onSubmit: (content: string) => void;
  isLoading: boolean;
};

export default function AnalysisForm({ onSubmit, isLoading }: AnalysisFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  function onFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values.content);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Paste text or a URL here to analyze its credibility..."
                  className="min-h-[150px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing
            </>
          ) : (
            <>
              <ScanText className="mr-2 h-4 w-4" />
              Analyze Content
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
