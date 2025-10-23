import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FolderKanban, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  icon: 'users' | 'folder' | 'check' | 'alert';
  trend?: string;
  variant?: 'default' | 'warning';
}

const icons = {
  users: Users,
  folder: FolderKanban,
  check: CheckCircle,
  alert: AlertCircle,
};

export function StatsCard({ title, value, icon, trend, variant = 'default' }: StatsCardProps) {
  const Icon = icons[icon];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn(
          'h-4 w-4',
          variant === 'warning' ? 'text-orange-500' : 'text-muted-foreground'
        )} />
      </CardHeader>
      <CardContent>
        <div className={cn(
          'text-3xl font-bold',
          variant === 'warning' && value > 0 && 'text-orange-500'
        )}>
          {value}
        </div>
        {trend && (
          <p className="text-xs text-muted-foreground mt-1">
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
