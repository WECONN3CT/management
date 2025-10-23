import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface KanbanFiltersProps {
  assignees: string[];
  selectedAssignee: string;
  onAssigneeChange: (value: string) => void;
  selectedPriority: string;
  onPriorityChange: (value: string) => void;
}

export function KanbanFilters({
  assignees,
  selectedAssignee,
  onAssigneeChange,
  selectedPriority,
  onPriorityChange,
}: KanbanFiltersProps) {
  return (
    <div className="flex gap-2">
      <Select value={selectedAssignee} onValueChange={onAssigneeChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Assignee" />
        </SelectTrigger>
        <SelectContent>
          {assignees.map(assignee => (
            <SelectItem key={assignee} value={assignee}>
              {assignee === 'all' ? 'All Assignees' : assignee}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedPriority} onValueChange={onPriorityChange}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
