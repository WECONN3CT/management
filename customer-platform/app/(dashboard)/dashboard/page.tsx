'use client';

import { MOCK_DATA, getUpcomingDeadlines, getOverdueStories } from '@/lib/mock-data';
import { StatsCard } from '@/components/dashboard/stats-card';
import { ProjectChart } from '@/components/dashboard/project-chart';
import { DeadlinesList } from '@/components/dashboard/deadlines-list';
import { TeamWorkload } from '@/components/dashboard/team-workload';
import { RecentActivity } from '@/components/dashboard/recent-activity';

export default function DashboardPage() {
  // Calculate stats from mock data
  const activeCustomers = MOCK_DATA.customers.filter(c => c.status === 'active').length;
  const activeProjects = MOCK_DATA.projects.filter(p =>
    p.status === 'in_development' || p.status === 'planning'
  ).length;

  const completedThisWeek = MOCK_DATA.stories.filter(s => {
    if (s.status !== 'done') return false;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(s.updatedAt) > weekAgo;
  }).length;

  const overdueTasks = getOverdueStories().length;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Welcome back, {MOCK_DATA.currentUser.name}
        </p>
      </div>

      {/* Stats Cards - Stack on mobile, 2 cols on sm, 4 cols on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard
          title="Active Customers"
          value={activeCustomers}
          icon="users"
          trend="+2 this month"
        />
        <StatsCard
          title="Active Projects"
          value={activeProjects}
          icon="folder"
        />
        <StatsCard
          title="Completed This Week"
          value={completedThisWeek}
          icon="check"
          trend="+50% vs last week"
        />
        <StatsCard
          title="Overdue Tasks"
          value={overdueTasks}
          icon="alert"
          variant={overdueTasks > 0 ? 'warning' : 'default'}
        />
      </div>

      {/* Charts & Lists - Stack on mobile, 2 cols on md */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ProjectChart projects={MOCK_DATA.projects} />
        <DeadlinesList deadlines={getUpcomingDeadlines()} />
      </div>

      {/* Team & Activity - Stack on mobile, 2 cols on md */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <TeamWorkload
          projects={MOCK_DATA.projects}
          stories={MOCK_DATA.stories}
        />
        <RecentActivity stories={MOCK_DATA.stories} />
      </div>
    </div>
  );
}
