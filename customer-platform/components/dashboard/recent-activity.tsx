import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Story } from '@/lib/types';
import { formatDateTime } from '@/lib/utils';
import { CheckCircle, Edit } from 'lucide-react';

interface RecentActivityProps {
  stories: Story[];
}

export function RecentActivity({ stories }: RecentActivityProps) {
  // Get last 10 updated stories
  const recentStories = [...stories]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 10);

  const getActivityIcon = (story: Story) => {
    if (story.status === 'done') return CheckCircle;
    return Edit;
  };

  const getActivityText = (story: Story) => {
    if (story.status === 'done') return 'completed';
    return 'updated';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentStories.map((story) => {
            const Icon = getActivityIcon(story);
            const action = getActivityText(story);

            return (
              <div
                key={story.id}
                className="flex items-start gap-3 text-sm"
              >
                <Icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p>
                    <span className="font-medium">{story.assignee}</span>
                    {' '}{action}{' '}
                    <span className="font-medium">{story.title}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDateTime(story.updatedAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
