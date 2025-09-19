import Image from 'next/image';
import type { LearningModule } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type ModuleCardProps = {
  module: LearningModule;
};

const getStatusInfo = (status: LearningModule['status']) => {
    switch (status) {
        case 'Completed':
            return {
                badgeVariant: 'default' as const,
                badgeClass: 'bg-accent hover:bg-accent/90 text-accent-foreground',
                progress: 100,
            };
        case 'In Progress':
            return {
                badgeVariant: 'secondary' as const,
                badgeClass: '',
                progress: 50,
            };
        case 'Not Started':
        default:
            return {
                badgeVariant: 'outline' as const,
                badgeClass: '',
                progress: 0,
            };
    }
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const { badgeVariant, badgeClass, progress } = getStatusInfo(module.status);

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="relative aspect-video mb-4 overflow-hidden rounded-md">
            <Image
                src={module.image}
                alt={module.title}
                fill
                className="object-cover"
                data-ai-hint={module.imageHint}
            />
        </div>
        <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-lg font-bold">{module.title}</CardTitle>
            <Badge variant={badgeVariant} className={cn('shrink-0', badgeClass)}>{module.status}</Badge>
        </div>
        <CardDescription>{module.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{module.description}</p>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 pt-4">
        <div>
            <Progress value={progress} className="h-2" />
        </div>
        <Button className="w-full">
            {progress === 100 ? 'Review Module' : progress > 0 ? 'Continue Learning' : 'Start Module'}
        </Button>
      </CardFooter>
    </Card>
  );
}
