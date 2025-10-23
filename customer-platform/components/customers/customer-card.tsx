import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Customer } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { getCustomerProjectCount } from '@/lib/mock-data';
import { Mail, Phone, Calendar } from 'lucide-react';

interface CustomerCardProps {
  customer: Customer;
  onClick: () => void;
}

const statusBadgeClasses = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  on_hold: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  completed: 'bg-gray-100 text-gray-700 dark:bg-gray-800/30 dark:text-gray-400',
} as const;

const statusLabels = {
  active: 'Active',
  on_hold: 'On Hold',
  completed: 'Completed',
};

export function CustomerCard({ customer, onClick }: CustomerCardProps) {
  const projectCount = getCustomerProjectCount(customer.id);

  return (
    <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 cursor-pointer hover:-translate-y-1 animate-fade-in shadow-lg" onClick={onClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg line-clamp-1 text-gray-900 dark:text-white">{customer.name}</h3>
          <Badge className={statusBadgeClasses[customer.status]}>
            {statusLabels[customer.status]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {customer.email && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            <span className="truncate">{customer.email}</span>
          </div>
        )}
        {customer.phone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-3.5 w-3.5" />
            <span>{customer.phone}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">{projectCount}</span>
          <span className="text-muted-foreground">
            {projectCount === 1 ? 'Project' : 'Projekte'}
          </span>
        </div>
        {customer.lastContact && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Last contact: {formatDate(customer.lastContact)}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Details →
        </Button>
      </CardFooter>
    </Card>
  );
}
