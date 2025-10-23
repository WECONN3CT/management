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

const statusVariants = {
  active: 'default',
  on_hold: 'secondary',
  completed: 'outline',
} as const;

const statusLabels = {
  active: 'Active',
  on_hold: 'On Hold',
  completed: 'Completed',
};

export function CustomerCard({ customer, onClick }: CustomerCardProps) {
  const projectCount = getCustomerProjectCount(customer.id);

  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1 animate-fade-in" onClick={onClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg line-clamp-1">{customer.name}</h3>
          <Badge variant={statusVariants[customer.status]}>
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
