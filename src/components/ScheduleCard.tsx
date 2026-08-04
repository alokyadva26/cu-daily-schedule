import { ClassSession } from "@/types";
import { cn } from "@/lib/utils";
import { Clock, MapPin, BookOpen } from "lucide-react";

interface ScheduleCardProps {
  session: ClassSession;
  isSelected: boolean;
  onClick: () => void;
}

export function ScheduleCard({ session, isSelected, onClick }: ScheduleCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "glass rounded-2xl p-5 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl",
        isSelected 
          ? "ring-2 ring-accent shadow-lg bg-accent/5 dark:bg-accent/10" 
          : "hover:bg-foreground/5 shadow-md"
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center text-accent font-semibold bg-accent/10 px-3 py-1 rounded-full text-sm">
          <Clock className="w-4 h-4 mr-2" />
          {session.startTime} - {session.endTime}
        </div>
      </div>
      
      <h3 className="text-lg font-bold mb-2 flex items-start gap-2">
        <BookOpen className="w-5 h-5 mt-0.5 text-foreground/60 shrink-0" />
        <span className="leading-tight">{session.subject}</span>
      </h3>
      
      <div className="flex items-center text-foreground/70 mt-3 font-medium">
        <MapPin className="w-4 h-4 mr-2 text-red-400 shrink-0" />
        {session.room}
      </div>
    </div>
  );
}
