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

const statusVariants = {
  planning: 'secondary',
  in_development: 'default',
  review: 'warning',
  completed: 'outline',
  archived: 'outline',
  on_hold: 'outline',
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
      className="hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => router.push(`/projects/${project.id}`)}
    >
      <CardHeader>
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <Badge variant={statusVariants[project.status]}>
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
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
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
