import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Story } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface DeadlinesListProps {
  deadlines: Story[];
}

export function DeadlinesList({ deadlines }: DeadlinesListProps) {
  const getUrgencyColor = (deadline: string) => {
    const daysUntil = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntil <= 3) return 'destructive';
    if (daysUntil <= 7) return 'warning';
    return 'default';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Deadlines</CardTitle>
        <Link
          href="/calendar"
          className="text-sm text-primary hover:underline"
        >
          View Calendar
        </Link>
      </CardHeader>
      <CardContent>
        {deadlines.length === 0 ? (
          <p className="text-sm text-muted-foreground">No upcoming deadlines</p>
        ) : (
          <div className="space-y-3">
            {deadlines.map((story) => (
              <div
                key={story.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{story.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Story {story.id}
                  </p>
                </div>
                <Badge variant={getUrgencyColor(story.deadline!)}>
                  {formatDate(story.deadline!)}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
