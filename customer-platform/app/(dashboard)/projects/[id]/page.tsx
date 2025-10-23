'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_DATA, getCustomerById, getStoriesByProjectId } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, ExternalLink, Calendar, User, Layers, Plus } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const project = MOCK_DATA.projects.find(p => p.id === id);

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

  const customer = getCustomerById(project.customerId);
  const stories = getStoriesByProjectId(project.id);

  const storiesByStatus = {
    backlog: stories.filter(s => s.status === 'backlog').length,
    ready: stories.filter(s => s.status === 'ready').length,
    in_development: stories.filter(s => s.status === 'in_development').length,
    review: stories.filter(s => s.status === 'review').length,
    done: stories.filter(s => s.status === 'done').length,
  };

  const statusVariants = {
    planning: 'secondary',
    in_development: 'default',
    review: 'warning',
    completed: 'outline',
    archived: 'outline',
  } as const;

  const typeColors = {
    website: 'bg-blue-500',
    app: 'bg-purple-500',
    software: 'bg-green-500',
    marketing: 'bg-orange-500',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/projects')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className={`h-2 w-2 rounded-full ${typeColors[project.type]}`} />
              <span className="text-sm text-muted-foreground">
                {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => alert('Edit project in Phase 2!')}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button onClick={() => router.push(`/projects/${id}/kanban`)}>
            Go to Kanban →
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Overview Card */}
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant={statusVariants[project.status]}>
                  {project.status}
                </Badge>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Progress</span>
                  <span className="font-bold text-lg">{project.progress}%</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Description */}
              {project.description && (
                <div>
                  <p className="text-sm font-medium mb-2">Description</p>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              )}

              {/* Assignee */}
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Assignee:</span>
                <span className="text-muted-foreground">{project.assignee}</span>
              </div>

              {/* Deadline */}
              {project.deadline && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Deadline:</span>
                  <span className="text-muted-foreground">
                    {formatDate(project.deadline)}
                  </span>
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm font-medium">{formatDate(project.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-medium">{formatDate(project.updatedAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stories Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Stories ({stories.length})
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/projects/${id}/kanban`)}
                >
                  View Kanban
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Status Breakdown */}
                <div className="grid grid-cols-5 gap-2 text-center">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{storiesByStatus.backlog}</p>
                    <p className="text-xs text-muted-foreground">Backlog</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{storiesByStatus.ready}</p>
                    <p className="text-xs text-muted-foreground">Ready</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{storiesByStatus.in_development}</p>
                    <p className="text-xs text-muted-foreground">In Dev</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{storiesByStatus.review}</p>
                    <p className="text-xs text-muted-foreground">Review</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-green-600">{storiesByStatus.done}</p>
                    <p className="text-xs text-muted-foreground">Done</p>
                  </div>
                </div>

                {/* Recent Stories */}
                {stories.length > 0 && (
                  <div className="space-y-2 pt-4 border-t">
                    <p className="text-sm font-medium">Recent Stories</p>
                    {stories.slice(0, 5).map((story) => (
                      <div
                        key={story.id}
                        className="flex items-center justify-between p-2 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium">{story.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Story {story.id} • {story.status}
                          </p>
                        </div>
                        <Badge
                          variant={
                            story.priority === 'high'
                              ? 'destructive'
                              : story.priority === 'medium'
                              ? 'warning'
                              : 'secondary'
                          }
                        >
                          {story.priority}
                        </Badge>
                      </div>
                    ))}
                    {stories.length > 5 && (
                      <p className="text-xs text-muted-foreground text-center pt-2">
                        + {stories.length - 5} more stories
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Card */}
          {customer && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Customer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold">{customer.name}</p>
                  <Badge variant="outline" className="mt-1">
                    {customer.status}
                  </Badge>
                </div>

                {customer.email && (
                  <p className="text-sm text-muted-foreground">{customer.email}</p>
                )}

                {customer.phone && (
                  <p className="text-sm text-muted-foreground">{customer.phone}</p>
                )}

                <Link href="/customers">
                  <Button variant="outline" size="sm" className="w-full">
                    View Customer
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => router.push(`/projects/${id}/kanban`)}
              >
                <Layers className="mr-2 h-4 w-4" />
                Open Kanban Board
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => alert('Add story in Phase 2!')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Story
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
