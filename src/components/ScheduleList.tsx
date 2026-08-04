import { ClassSession } from "@/types";
import { ScheduleCard } from "./ScheduleCard";

interface ScheduleListProps {
  sessions: ClassSession[];
  selectedSession: ClassSession | null;
  onSelect: (session: ClassSession) => void;
}

export function ScheduleList({ sessions, selectedSession, onSelect }: ScheduleListProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-2 px-1">Today's Classes</h2>
      {sessions.map((session, index) => (
        <ScheduleCard
          key={`${session.startTime}-${index}`}
          session={session}
          isSelected={selectedSession === session}
          onClick={() => onSelect(session)}
        />
      ))}
    </div>
  );
}
