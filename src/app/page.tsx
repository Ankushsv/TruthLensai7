'use client';

import { useState } from 'react';
import type { AnalyzeContentCredibilityOutput } from '@/ai/flows/analyze-content-credibility';
import { runAnalysis } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import AnalysisForm from '@/components/analysis/analysis-form';
import AnalysisResults from '@/components/analysis/analysis-results';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function AnalyzePage() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeContentCredibilityOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedContent, setSubmittedContent] = useState('');
  const { toast } = useToast();

  const handleAnalysis = async (content: string) => {
    if (!content.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter some content to analyze.',
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);
    setSubmittedContent(content);

    try {
      const result = await runAnalysis(content);
      if (result) {
        setAnalysisResult(result);
      } else {
        throw new Error('Analysis failed to return a result.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Something went wrong. Please try again later.',
      });
      setAnalysisResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <Card className="mb-8 overflow-hidden border-0 shadow-none md:border md:shadow-sm md:rounded-lg">
        <div className="grid md:grid-cols-2">
            <div className="p-8 flex flex-col justify-center">
                 <h1 className="text-3xl font-headline font-bold mb-2">Clarity in a Click</h1>
                <p className="text-muted-foreground mb-6">
                    Use our AI-powered tool to assess the credibility of articles, posts, or any text. Paste content or a link to get an instant analysis and uncover potential misinformation.
                </p>
                <AnalysisForm onSubmit={handleAnalysis} isLoading={isLoading} />
            </div>
            <div className="hidden md:block relative min-h-[300px]">
                <Image
                    src="https://picsum.photos/seed/1/800/600"
                    alt="Abstract image representing data analysis"
                    fill
                    style={{ objectFit: 'cover' }}
                    data-ai-hint="abstract data analysis"
                />
            </div>
        </div>
      </Card>

      {isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Analyzing...</CardTitle>
            <CardDescription>Our AI is evaluating the content. Please wait a moment.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-12">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </CardContent>
        </Card>
      )}

      {analysisResult && (
        <AnalysisResults result={analysisResult} content={submittedContent} />
      )}
    </div>
  );
}
