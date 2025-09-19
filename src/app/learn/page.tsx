import { learningModules } from '@/lib/data';
import LearningModulesClient from '@/components/learn/learning-modules-client';

export default function LearnPage() {
  const modules = learningModules;

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-bold">Learning Modules</h1>
        <p className="text-muted-foreground mt-2">
          Strengthen your critical thinking and media literacy skills with these interactive modules.
        </p>
      </div>
      <LearningModulesClient modules={modules} />
    </div>
  );
}
