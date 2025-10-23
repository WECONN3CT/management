import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Project, Story } from '@/lib/types';
import { TEAM_MEMBERS } from '@/lib/mock-data';

interface TeamWorkloadProps {
  projects: Project[];
  stories: Story[];
}

export function TeamWorkload({ projects, stories }: TeamWorkloadProps) {
  const getWorkload = (memberName: string) => {
    const activeStories = stories.filter(
      s => s.assignee === memberName && s.status !== 'done'
    ).length;

    // Simple workload calculation
    const workloadPercentage = Math.min(activeStories * 15, 100);

    return {
      count: activeStories,
      percentage: workloadPercentage,
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Workload</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {TEAM_MEMBERS.map((member) => {
          const workload = getWorkload(member.name);

          return (
            <div key={member.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="font-medium">{member.name}</span>
                </div>
                <span className="text-muted-foreground">
                  {workload.count} tasks ({workload.percentage}%)
                </span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${workload.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
