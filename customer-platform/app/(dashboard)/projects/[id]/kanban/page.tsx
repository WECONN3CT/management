'use client';

import { use } from 'react';
import { MOCK_PROJECTS, getStoriesByProjectId } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';

export default function KanbanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = MOCK_PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const stories = getStoriesByProjectId(project.id);

  const columns = [
    { id: 'backlog', title: 'Backlog', status: 'backlog' as const },
    { id: 'ready', title: 'Ready', status: 'ready' as const },
    { id: 'in_development', title: 'In Development', status: 'in_development' as const },
    { id: 'review', title: 'Review', status: 'review' as const },
    { id: 'done', title: 'Done', status: 'done' as const },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{project.title} - Kanban Board</h1>
        <p className="text-muted-foreground">
          Drag and drop stories to update their status
        </p>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {columns.map((column) => {
          const columnStories = stories.filter((s) => s.status === column.status);
          return (
            <Card key={column.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  {column.title}
                  <Badge variant="outline">{columnStories.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-2">
                {columnStories.map((story) => (
                  <Card key={story.id} className="p-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{story.id}</p>
                      <p className="text-sm font-medium">{story.title}</p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            story.priority === 'high'
                              ? 'destructive'
                              : story.priority === 'medium'
                              ? 'default'
                              : 'secondary'
                          }
                          className="text-xs"
                        >
                          {story.priority}
                        </Badge>
                        {story.deadline && (
                          <p className="text-xs text-muted-foreground">
                            {new Date(story.deadline).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
