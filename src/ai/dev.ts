import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-content-credibility.ts';
import '@/ai/flows/explain-credibility-findings.ts';
import '@/ai/tools/evidence-retriever.ts';
