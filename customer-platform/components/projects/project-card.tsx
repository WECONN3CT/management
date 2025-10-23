'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { getCustomerById, getProjectStoryCount } from '@/lib/mock-data';
import { Calendar, User, Layers } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const statusBadgeClasses = {
  planning: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  in_development: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  review: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  archived: 'bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-400',
  on_hold: 'bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-400',
} as const;

const typeColors = {
  website: 'bg-blue-500',
  app: 'bg-purple-500',
  software: 'bg-green-500',
  marketing: 'bg-orange-500',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const customer = getCustomerById(project.customerId);
  const storyCount = getProjectStoryCount(project.id);

  return (
    <Card
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 cursor-pointer group hover:-translate-y-1 animate-fade-in shadow-lg"
      onClick={() => router.push(`/projects/${project.id}`)}
    >
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg line-clamp-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>
            <Badge className={statusBadgeClasses[project.status]}>
              {project.status === 'in_development' ? 'In Dev' : project.status}
            </Badge>
          </div>

          {/* Type Badge */}
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${typeColors[project.type]}`} />
            <span className="text-xs text-muted-foreground">
              {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Customer */}
        {customer && (
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{customer.name}</span>
          </div>
        )}

        {/* Stories Count */}
        <div className="flex items-center gap-2 text-sm">
          <Layers className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {storyCount} {storyCount === 1 ? 'Story' : 'Stories'}
          </span>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="font-semibold text-gray-900 dark:text-white">{project.progress}%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all rounded-full"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Deadline */}
        {project.deadline && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Deadline: {formatDate(project.deadline)}</span>
          </div>
        )}

        {/* Description */}
        {project.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/projects/${project.id}`);
          }}
        >
          Details
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/projects/${project.id}/kanban`);
          }}
        >
          Kanban →
        </Button>
      </CardFooter>
    </Card>
  );
}
