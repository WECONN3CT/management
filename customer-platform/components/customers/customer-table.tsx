'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Customer } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { getCustomerProjectCount } from '@/lib/mock-data';
import { ArrowUpDown } from 'lucide-react';

interface CustomerTableProps {
  customers: Customer[];
  onRowClick: (customer: Customer) => void;
}

type SortField = 'name' | 'email' | 'status' | 'projects' | 'lastContact';
type SortDirection = 'asc' | 'desc';

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

export function CustomerTable({ customers, onRowClick }: CustomerTableProps) {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    let aVal: any = a[sortField as keyof Customer];
    let bVal: any = b[sortField as keyof Customer];

    if (sortField === 'projects') {
      aVal = getCustomerProjectCount(a.id);
      bVal = getCustomerProjectCount(b.id);
    }

    if (aVal === undefined) return 1;
    if (bVal === undefined) return -1;

    const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8"
      onClick={() => handleSort(field)}
    >
      {children}
      <ArrowUpDown className="ml-2 h-3.5 w-3.5" />
    </Button>
  );

  return (
    <div className="rounded-md border overflow-x-auto -mx-4 sm:mx-0">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">
              <SortButton field="name">Name</SortButton>
            </TableHead>
            <TableHead className="min-w-[200px] hidden sm:table-cell">
              <SortButton field="email">Email</SortButton>
            </TableHead>
            <TableHead className="min-w-[100px]">
              <SortButton field="status">Status</SortButton>
            </TableHead>
            <TableHead className="min-w-[100px] hidden md:table-cell">
              <SortButton field="projects">Projects</SortButton>
            </TableHead>
            <TableHead className="min-w-[120px] hidden lg:table-cell">
              <SortButton field="lastContact">Last Contact</SortButton>
            </TableHead>
            <TableHead className="min-w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCustomers.map((customer) => (
            <TableRow
              key={customer.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onRowClick(customer)}
            >
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell className="text-muted-foreground hidden sm:table-cell">
                {customer.email || '-'}
              </TableCell>
              <TableCell>
                <Badge variant={statusVariants[customer.status]}>
                  {statusLabels[customer.status]}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{getCustomerProjectCount(customer.id)}</TableCell>
              <TableCell className="text-muted-foreground hidden lg:table-cell">
                {customer.lastContact ? formatDate(customer.lastContact) : '-'}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRowClick(customer);
                  }}
                  className="min-h-touch"
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
