import { Card, CardContent } from '@/components/ui/card';
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

const iconGradients = {
  users: 'bg-gradient-to-br from-pink-500 to-pink-600',
  folder: 'bg-gradient-to-br from-purple-500 to-purple-600',
  check: 'bg-gradient-to-br from-green-500 to-green-600',
  alert: 'bg-gradient-to-br from-orange-500 to-orange-600',
};

export function StatsCard({ title, value, icon, trend, variant = 'default' }: StatsCardProps) {
  const Icon = icons[icon];

  return (
    <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            'p-3 rounded-xl shadow-lg',
            iconGradients[icon]
          )}>
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <div className={cn(
            'text-3xl font-bold text-gray-900 dark:text-white',
            variant === 'warning' && value > 0 && 'text-orange-600 dark:text-orange-500'
          )}>
            {value}
          </div>
          {trend && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {trend}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
