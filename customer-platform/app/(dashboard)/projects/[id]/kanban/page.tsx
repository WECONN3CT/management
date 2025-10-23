'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { MOCK_DATA, getStoriesByProjectId } from '@/lib/mock-data';
import type { Story, StoryStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { KanbanColumn } from '@/components/kanban/kanban-column';
import { StoryCard } from '@/components/kanban/story-card';
import { KanbanFilters } from '@/components/kanban/kanban-filters';

const COLUMNS: { id: StoryStatus; label: string; color: string }[] = [
  { id: 'backlog', label: 'Backlog', color: 'bg-gray-500' },
  { id: 'ready', label: 'Ready', color: 'bg-blue-500' },
  { id: 'in_development', label: 'In Development', color: 'bg-purple-500' },
  { id: 'review', label: 'Review', color: 'bg-orange-500' },
  { id: 'done', label: 'Done', color: 'bg-green-500' },
];

export default function KanbanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const project = MOCK_DATA.projects.find(p => p.id === id);
  const allStories = getStoriesByProjectId(id);

  const [stories, setStories] = useState<Story[]>(allStories);
  const [searchQuery, setSearchQuery] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [activeId, setActiveId] = useState<string | null>(null);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Button onClick={() => router.push('/projects')} className="mt-4">
          Back to Projects
        </Button>
      </div>
    );
  }

  // Apply filters
  let filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAssignee = assigneeFilter === 'all' || story.assignee === assigneeFilter;
    const matchesPriority = priorityFilter === 'all' || story.priority === priorityFilter;
    return matchesSearch && matchesAssignee && matchesPriority;
  });

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const storyId = active.id as string;
    const newStatus = over.id as StoryStatus;

    // Phase 1: Visual only, update local state
    setStories(prev =>
      prev.map(story =>
        story.id === storyId
          ? { ...story, status: newStatus }
          : story
      )
    );

    setActiveId(null);
  };

  const getStoriesForColumn = (status: StoryStatus) => {
    return filteredStories.filter(s => s.status === status);
  };

  const activeStory = activeId ? stories.find(s => s.id === activeId) : null;

  // Get unique assignees for filter
  const assignees = ['all', ...Array.from(new Set(allStories.map(s => s.assignee)))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push(`/projects/${id}`)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-sm text-muted-foreground">Kanban Board</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search stories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <KanbanFilters
          assignees={assignees}
          selectedAssignee={assigneeFilter}
          onAssigneeChange={setAssigneeFilter}
          selectedPriority={priorityFilter}
          onPriorityChange={setPriorityFilter}
        />
      </div>

      {/* Kanban Board */}
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map(column => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              label={column.label}
              color={column.color}
              stories={getStoriesForColumn(column.id)}
              onStoryClick={(story) => router.push(`/stories/${story.id}`)}
            />
          ))}
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeStory ? (
            <div className="rotate-3">
              <StoryCard story={activeStory} onClick={() => {}} isDragging />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
