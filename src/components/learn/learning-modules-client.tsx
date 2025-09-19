'use client';

import { useState } from 'react';
import type { LearningModule } from '@/lib/data';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModuleCard from './module-card';

type LearningModulesClientProps = {
  modules: LearningModule[];
};

type FilterStatus = 'All' | 'In Progress' | 'Completed' | 'Not Started';

export default function LearningModulesClient({ modules }: LearningModulesClientProps) {
  const [filter, setFilter] = useState<FilterStatus>('All');

  const filteredModules = modules.filter(module => {
    if (filter === 'All') return true;
    return module.status === filter;
  });

  const tabs: FilterStatus[] = ['All', 'In Progress', 'Completed', 'Not Started'];

  return (
    <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterStatus)}>
      <TabsList className="mb-6 grid w-full grid-cols-2 sm:w-auto sm:inline-flex h-auto sm:h-10">
        {tabs.map(tab => (
            <TabsTrigger key={tab} value={tab}>{tab}</TabsTrigger>
        ))}
      </TabsList>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.length > 0 ? (
              filteredModules.map(module => <ModuleCard key={module.id} module={module} />)
          ) : (
              <div className="col-span-full text-center text-muted-foreground py-12">
                  <p>No modules found for this status.</p>
              </div>
          )}
      </div>
    </Tabs>
  );
}
