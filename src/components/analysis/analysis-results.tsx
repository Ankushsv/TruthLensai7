'use client';

import { useState } from 'react';
import type { AnalyzeContentCredibilityOutput } from '@/ai/flows/analyze-content-credibility';
import { getExplanation } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertCircle, CheckCircle, HelpCircle, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type AnalysisResultsProps = {
  result: AnalyzeContentCredibilityOutput;
  content: string;
};

export default function AnalysisResults({ result, content }: AnalysisResultsProps) {
  const [detailedExplanation, setDetailedExplanation] = useState<string | null>(null);
  const [isExplanationLoading, setIsExplanationLoading] = useState(false);
  const { toast } = useToast();

  const credibilityPercent = Math.round(result.credibilityScore * 100);

  const handleGetExplanation = async () => {
    if (detailedExplanation) return;
    setIsExplanationLoading(true);
    try {
        const explanationResult = await getExplanation(JSON.stringify(result), content);
        if (explanationResult?.explanation) {
            setDetailedExplanation(explanationResult.explanation);
        } else {
            throw new Error('Failed to get detailed explanation.');
        }
    } catch (error) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not fetch detailed explanation. Please try again.'
        });
    } finally {
        setIsExplanationLoading(false);
    }
  }

  const getCredibilityInfo = () => {
    if (credibilityPercent >= 70) {
        return {
            Icon: CheckCircle,
            colorClass: 'text-green-600',
            label: 'High Credibility'
        };
    }
    if (credibilityPercent >= 40) {
        return {
            Icon: AlertCircle,
            colorClass: 'text-yellow-600',
            label: 'Moderate Credibility'
        };
    }
    return {
        Icon: HelpCircle,
        colorClass: 'text-red-600',
        label: 'Low Credibility'
    };
  };
  
  const { Icon, colorClass, label } = getCredibilityInfo();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Icon className={cn('size-6', colorClass)} />
            Credibility Analysis: {label}
        </CardTitle>
        <CardDescription>
            Here's the breakdown of our AI-powered credibility assessment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold">Credibility Score</h3>
                <span className={cn('text-2xl font-bold', colorClass)}>{credibilityPercent}%</span>
            </div>
            <Progress value={credibilityPercent} />
            <p className="text-sm text-muted-foreground">
                This score represents the estimated trustworthiness of the content based on multiple factors.
            </p>
        </div>

        <div className="space-y-2">
            <h3 className="text-lg font-semibold">Key Findings</h3>
            <p className="text-sm text-muted-foreground">{result.explanation}</p>
        </div>
        
        {result.flags && result.flags.length > 0 && (
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Potential Issues Flagged</h3>
                <div className="flex flex-wrap gap-2">
                {result.flags.map((flag, index) => (
                    <Badge key={index} variant="destructive">
                        {flag}
                    </Badge>
                ))}
                </div>
            </div>
        )}

        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger onClick={handleGetExplanation} className="[&[data-state=open]>div>button]:text-accent">
                    <div className="flex items-center cursor-pointer w-full">
                        <Button variant="link" className="p-0 h-auto text-base text-muted-foreground hover:text-accent transition-colors">
                            <Sparkles className="mr-2 size-4"/> Need more clarity? Get a detailed AI explanation.
                        </Button>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 border-t">
                    {isExplanationLoading && (
                         <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="animate-spin size-4"/> Generating detailed explanation...
                         </div>
                    )}
                    {detailedExplanation && (
                        <div className="text-sm text-foreground/90 leading-relaxed">
                            <p>{detailedExplanation}</p>
                        </div>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>

      </CardContent>
    </Card>
  );
}
