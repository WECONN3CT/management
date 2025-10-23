'use client';

import { MOCK_CUSTOMERS } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CustomersPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground">
          Manage your customer relationships
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_CUSTOMERS.map((customer) => (
          <Card key={customer.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{customer.name}</CardTitle>
                <Badge
                  variant={
                    customer.status === 'active'
                      ? 'default'
                      : customer.status === 'completed'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {customer.status}
                </Badge>
              </div>
              {customer.email && (
                <CardDescription>{customer.email}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {customer.phone && (
                <p className="text-sm text-muted-foreground">{customer.phone}</p>
              )}
              {customer.notes && (
                <p className="text-sm mt-2">{customer.notes}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
