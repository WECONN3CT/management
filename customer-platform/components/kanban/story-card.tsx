import { useDraggable } from '@dnd-kit/core';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Story } from '@/lib/types';
import { Calendar, AlertCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface StoryCardProps {
  story: Story;
  onClick: () => void;
  isDragging?: boolean;
}

const priorityVariants = {
  low: 'secondary',
  medium: 'warning',
  high: 'destructive',
} as const;

export function StoryCard({ story, onClick, isDragging = false }: StoryCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging: isDrag } = useDraggable({
    id: story.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        'transition-opacity',
        (isDrag || isDragging) && 'opacity-50'
      )}
    >
      <Card
        className="cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 animate-fade-in"
        onClick={(e) => {
          if (!isDrag) {
            onClick();
          }
        }}
      >
        <CardContent className="p-3 space-y-2">
          {/* Story ID & Priority */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground">
              {story.id}
            </span>
            <Badge variant={priorityVariants[story.priority]} className="text-xs">
              {story.priority}
            </Badge>
          </div>

          {/* Title */}
          <h4 className="text-sm font-medium line-clamp-2">
            {story.title}
          </h4>

          {/* Assignee */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
              {story.assignee.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-xs text-muted-foreground">
              {story.assignee}
            </span>
          </div>

          {/* Deadline */}
          {story.deadline && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(story.deadline)}</span>
              {new Date(story.deadline) < new Date() && (
                <AlertCircle className="h-3 w-3 text-red-500 ml-1" />
              )}
            </div>
          )}

          {/* Acceptance Criteria Count */}
          <div className="text-xs text-muted-foreground">
            {story.acceptanceCriteria.length} criteria
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
