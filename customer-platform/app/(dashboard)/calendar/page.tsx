'use client';

import { MOCK_EVENTS, MOCK_PROJECTS } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CalendarPage() {
  // Group events by date
  const eventsByDate = MOCK_EVENTS.reduce((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, typeof MOCK_EVENTS>);

  const sortedDates = Object.keys(eventsByDate).sort();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Calendar</h1>
        <p className="text-muted-foreground">
          View all deadlines and events
        </p>
      </div>

      <div className="space-y-4">
        {sortedDates.map((date) => (
          <Card key={date}>
            <CardHeader>
              <CardTitle className="text-lg">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {eventsByDate[date].map((event) => {
                const project = event.projectId
                  ? MOCK_PROJECTS.find((p) => p.id === event.projectId)
                  : null;
                return (
                  <div
                    key={event.id}
                    className="flex items-start justify-between p-3 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{event.title}</p>
                      {project && (
                        <p className="text-sm text-muted-foreground">
                          Project: {project.title}
                        </p>
                      )}
                      {event.description && (
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant={
                        event.type === 'deadline'
                          ? 'destructive'
                          : event.type === 'meeting'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {event.type}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
