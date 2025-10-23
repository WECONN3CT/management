'use client';

import { useState } from 'react';
import { MOCK_DATA, searchCustomers } from '@/lib/mock-data';
import type { CustomerStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { CustomerCard } from '@/components/customers/customer-card';
import { CustomerTable } from '@/components/customers/customer-table';
import { CustomerDetailModal } from '@/components/customers/customer-detail-modal';
import type { Customer } from '@/lib/types';

type ViewMode = 'card' | 'table';

export default function CustomersPage() {
  const [viewMode, setViewMode] = useState<ViewMode>(
    (typeof window !== 'undefined' ? localStorage.getItem('customerViewMode') : null) as ViewMode || 'card'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | 'all'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Filter customers
  let filteredCustomers = searchQuery
    ? searchCustomers(searchQuery)
    : MOCK_DATA.customers;

  if (statusFilter !== 'all') {
    filteredCustomers = filteredCustomers.filter(c => c.status === statusFilter);
  }

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('customerViewMode', mode);
  };

  const statusCounts = {
    all: MOCK_DATA.customers.length,
    active: MOCK_DATA.customers.filter(c => c.status === 'active').length,
    on_hold: MOCK_DATA.customers.filter(c => c.status === 'on_hold').length,
    completed: MOCK_DATA.customers.filter(c => c.status === 'completed').length,
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Responsive stack on mobile */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Kunden</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-0.5">
            {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button
          onClick={() => alert('New customer form coming in Phase 2!')}
          className="w-full sm:w-auto min-h-touch"
        >
          <Plus className="mr-2 h-4 w-4" />
          Neuer Kunde
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {/* Search */}
        <Input
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-sm min-h-touch"
        />

        {/* Status Filters - Scrollable on mobile */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {(['all', 'active', 'on_hold', 'completed'] as const).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="min-h-touch whitespace-nowrap"
              >
                {status === 'all' ? 'All' : status === 'on_hold' ? 'On Hold' : status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-1 text-xs opacity-60">
                  ({statusCounts[status]})
                </span>
              </Button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 border-l pl-2">
            <Button
              variant={viewMode === 'card' ? 'default' : 'outline'}
              size="icon"
              onClick={() => handleViewChange('card')}
              className="min-h-touch min-w-touch"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'outline'}
              size="icon"
              onClick={() => handleViewChange('table')}
              className="min-h-touch min-w-touch"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Customer List */}
      {filteredCustomers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">No customers found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {searchQuery ? 'Try adjusting your search' : 'Get started by adding a customer'}
          </p>
        </div>
      ) : viewMode === 'card' ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onClick={() => setSelectedCustomer(customer)}
            />
          ))}
        </div>
      ) : (
        <CustomerTable
          customers={filteredCustomers}
          onRowClick={(customer) => setSelectedCustomer(customer)}
        />
      )}

      {/* Customer Detail Modal */}
      <CustomerDetailModal
        customer={selectedCustomer}
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
}
