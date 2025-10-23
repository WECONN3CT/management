import { useDroppable } from '@dnd-kit/core';
import { StoryCard } from './story-card';
import type { Story, StoryStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  id: StoryStatus;
  label: string;
  color: string;
  stories: Story[];
  onStoryClick: (story: Story) => void;
}

export function KanbanColumn({ id, label, color, stories, onStoryClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-col min-w-[280px] sm:min-w-[300px] max-w-[85vw] sm:max-w-none rounded-lg border bg-muted/30 transition-colors snap-center',
        isOver && 'bg-muted/60'
      )}
    >
      {/* Column Header */}
      <div className="p-3 sm:p-4 border-b">
        <div className="flex items-center gap-2">
          <div className={cn('h-2 w-2 rounded-full flex-shrink-0', color)} />
          <h3 className="font-semibold text-sm sm:text-base">{label}</h3>
          <span className="ml-auto text-xs sm:text-sm text-muted-foreground">
            {stories.length}
          </span>
        </div>
      </div>

      {/* Story Cards */}
      <div className="flex-1 p-2 sm:p-3 space-y-2 sm:space-y-3 min-h-[200px]">
        {stories.length === 0 ? (
          <p className="text-xs sm:text-sm text-muted-foreground text-center py-8">
            No stories
          </p>
        ) : (
          stories.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              onClick={() => onStoryClick(story)}
            />
          ))
        )}
      </div>
    </div>
  );
}
