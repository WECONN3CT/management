'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Customer } from '@/lib/types';
import { getProjectsByCustomerId } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { Edit, Save, X, Plus, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CustomerDetailModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusLabels = {
  active: 'Active',
  on_hold: 'On Hold',
  completed: 'Completed',
};

export function CustomerDetailModal({ customer, isOpen, onClose }: CustomerDetailModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Customer | null>(null);

  // Initialize form data when customer changes
  if (customer && !formData) {
    setFormData({ ...customer });
  }

  // Reset when modal closes
  const handleClose = () => {
    setIsEditing(false);
    setFormData(null);
    onClose();
  };

  const handleSave = () => {
    // Phase 1: Just show toast, don't actually save
    toast({
      title: 'Customer updated',
      description: 'Changes saved successfully! (Phase 1: Visual only)',
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (customer) {
      setFormData({ ...customer });
    }
    setIsEditing(false);
  };

  if (!customer || !formData) return null;

  const projects = getProjectsByCustomerId(customer.id);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Customer Details</span>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Information</h3>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              ) : (
                <p className="text-sm">{customer.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  {customer.email || '-'}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  {customer.phone || '-'}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              {isEditing ? (
                <Select
                  value={formData.status}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on_hold">On Hold</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge>{statusLabels[customer.status]}</Badge>
              )}
            </div>

            {/* Customer Since */}
            <div className="space-y-2">
              <Label>Customer Since</Label>
              <p className="text-sm text-muted-foreground">
                {formatDate(customer.createdAt)}
              </p>
            </div>

            {/* Last Contact */}
            {customer.lastContact && (
              <div className="space-y-2">
                <Label>Last Contact</Label>
                <p className="text-sm text-muted-foreground">
                  {formatDate(customer.lastContact)}
                </p>
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              {isEditing ? (
                <Textarea
                  id="notes"
                  value={formData.notes || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={4}
                  placeholder="Add notes about this customer..."
                />
              ) : (
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {customer.notes || 'No notes'}
                </p>
              )}
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Projects ({projects.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast({
                    title: 'Coming soon',
                    description: 'New project creation in Phase 2',
                  });
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>

            {projects.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No projects yet
              </p>
            ) : (
              <div className="space-y-3">
                {projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{project.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                            </p>
                          </div>
                          <Badge
                            variant={
                              project.status === 'completed'
                                ? 'default'
                                : 'secondary'
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>

                        {project.deadline && (
                          <p className="text-xs text-muted-foreground">
                            Deadline: {formatDate(project.deadline)}
                          </p>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            handleClose();
                            router.push(`/projects/${project.id}`);
                          }}
                        >
                          Go to Project
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
