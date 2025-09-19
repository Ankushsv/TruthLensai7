'use server';

import { analyzeContentCredibility, AnalyzeContentCredibilityOutput } from '@/ai/flows/analyze-content-credibility';
import { explainCredibilityFindings, ExplainCredibilityFindingsOutput } from '@/ai/flows/explain-credibility-findings';
import { createAnalysisRecord, AnalysisRecord } from '@/services/analysis-records';

export async function runAnalysis(content: string): Promise<AnalysisRecord | null> {
    try {
        const result = await analyzeContentCredibility({ content });
        if (result) {
            const newRecord = await createAnalysisRecord({
                content,
                ...result,
            });
            return newRecord;
        }
        return null;
    } catch (error) {
        console.error('Error in runAnalysis:', error);
        return null;
    }
}

export async function getExplanation(analysis: string, content: string): Promise<ExplainCredibilityFindingsOutput | null> {
    try {
        const result = await explainCredibilityFindings({ analysis, content });
        return result;
    } catch (error) {
        console.error('Error in getExplanation:', error);
        return null;
    }
}
