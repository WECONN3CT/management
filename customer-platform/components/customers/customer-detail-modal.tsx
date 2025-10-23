import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { Customer } from '@/lib/types';

interface CustomerDetailModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerDetailModal({ customer, isOpen, onClose }: CustomerDetailModalProps) {
  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <h2 className="text-2xl font-bold">{customer.name}</h2>
        <p className="text-muted-foreground">
          Customer detail view will be implemented in Story 4.2
        </p>
      </DialogContent>
    </Dialog>
  );
}
