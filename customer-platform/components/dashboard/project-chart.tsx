'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project } from '@/lib/types';

interface ProjectChartProps {
  projects: Project[];
}

export function ProjectChart({ projects }: ProjectChartProps) {
  const statusCounts = {
    planning: projects.filter(p => p.status === 'planning').length,
    in_development: projects.filter(p => p.status === 'in_development').length,
    review: projects.filter(p => p.status === 'review').length,
    completed: projects.filter(p => p.status === 'completed').length,
  };

  const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);

  const statusColors = {
    planning: 'bg-blue-500 dark:bg-blue-600',
    in_development: 'bg-purple-500 dark:bg-purple-600',
    review: 'bg-orange-500 dark:bg-orange-600',
    completed: 'bg-green-500 dark:bg-green-600',
  };

  const statusLabels = {
    planning: 'Planning',
    in_development: 'In Development',
    review: 'Review',
    completed: 'Completed',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Simple bar chart */}
        {Object.entries(statusCounts).map(([status, count]) => {
          const percentage = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={status} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{statusLabels[status as keyof typeof statusLabels]}</span>
                <span className="font-medium">{count} ({percentage.toFixed(0)}%)</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={statusColors[status as keyof typeof statusColors]}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
