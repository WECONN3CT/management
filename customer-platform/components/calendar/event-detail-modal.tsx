import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { CalendarEvent } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Calendar, ExternalLink } from 'lucide-react';
import { MOCK_DATA } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';

interface EventDetailModalProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

const typeVariants = {
  deadline: 'destructive',
  meeting: 'default',
  milestone: 'outline',
} as const;

const typeLabels = {
  deadline: 'Deadline',
  meeting: 'Meeting',
  milestone: 'Milestone',
};

export function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const router = useRouter();

  if (!event) return null;

  const project = event.projectId
    ? MOCK_DATA.projects.find(p => p.id === event.projectId)
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="line-clamp-1">{event.title}</span>
            <Badge variant={typeVariants[event.type]}>
              {typeLabels[event.type]}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>

          {/* Description */}
          {event.description && (
            <div>
              <p className="text-sm text-muted-foreground">
                {event.description}
              </p>
            </div>
          )}

          {/* Project Link */}
          {project && (
            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground mb-2">Related Project</p>
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => {
                  onClose();
                  router.push(`/projects/${project.id}`);
                }}
              >
                <span>{project.title}</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
