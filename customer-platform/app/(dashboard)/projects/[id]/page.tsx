'use client';

import { use } from 'react';
import { MOCK_PROJECTS, getCustomerById, getStoriesByProjectId } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = MOCK_PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const customer = getCustomerById(project.customerId);
  const stories = getStoriesByProjectId(project.id);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{project.title}</h1>
          {customer && (
            <p className="text-muted-foreground">{customer.name}</p>
          )}
        </div>
        <Link href={`/projects/${project.id}/kanban`}>
          <Button>View Kanban Board</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge>{project.status}</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{project.progress}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stories.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{project.description || 'No description available'}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stories</CardTitle>
          <CardDescription>{stories.length} stories in this project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {stories.map((story) => (
              <div
                key={story.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{story.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {story.id}
                  </p>
                </div>
                <Badge
                  variant={
                    story.status === 'done'
                      ? 'secondary'
                      : story.status === 'in_development'
                      ? 'default'
                      : 'outline'
                  }
                >
                  {story.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
