import type { CalendarEvent } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const EVENT_COLORS = {
  deadline: 'bg-red-500',
  meeting: 'bg-blue-500',
  milestone: 'bg-green-500',
};

export function CalendarGrid({ currentDate, events, onEventClick }: CalendarGridProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and total days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

  // Create array of days
  const days: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const isToday = (day: number) => {
    return isCurrentMonth && day === today.getDate();
  };

  return (
    <div className="rounded-lg border bg-card">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b">
        {WEEKDAYS.map(day => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dayEvents = day ? getEventsForDay(day) : [];

          return (
            <div
              key={index}
              className={cn(
                'min-h-[100px] border-r border-b p-2',
                !day && 'bg-muted/30',
                index % 7 === 6 && 'border-r-0'
              )}
            >
              {day && (
                <>
                  <div
                    className={cn(
                      'mb-1 flex h-6 w-6 items-center justify-center rounded-full text-sm',
                      isToday(day) && 'bg-primary text-primary-foreground font-semibold'
                    )}
                  >
                    {day}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.map(event => (
                      <button
                        key={event.id}
                        onClick={() => onEventClick(event)}
                        className={cn(
                          'w-full rounded px-1 py-0.5 text-left text-xs text-white hover:opacity-80 truncate',
                          EVENT_COLORS[event.type]
                        )}
                        title={event.title}
                      >
                        {event.title}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
