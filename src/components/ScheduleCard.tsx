import { ClassSession } from "@/types";
import { cn, getSubjectName } from "@/lib/utils";
import { Clock, MapPin, BookOpen, PlayCircle, FastForward, User } from "lucide-react";

interface ScheduleCardProps {
  session: ClassSession;
  isSelected: boolean;
  onClick: () => void;
  mode?: "normal" | "active" | "next" | "completed";
  countdown?: string;
}

export function ScheduleCard({ session, isSelected, onClick, mode = "normal", countdown }: ScheduleCardProps) {
  const isActive = mode === "active";
  const isNext = mode === "next";
  const isCompleted = mode === "completed";

  return (
    <div
      onClick={onClick}
      className={cn(
        "cuims-card p-5 cursor-pointer transition-all duration-300 transform relative overflow-hidden",
        isSelected 
          ? isActive ? "ring-2 ring-accent bg-accent/5" : "ring-1 ring-card-border bg-foreground/5" 
          : "hover:bg-foreground/[0.02]",
        isActive && "border-l-4 border-l-accent scale-[1.02] shadow-[0_0_15px_rgba(227,6,19,0.15)]",
        isCompleted && "opacity-60"
      )}
    >
      {isActive && (
        <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center shadow-sm animate-pulse">
          <PlayCircle className="w-3 h-3 mr-1" /> NOW
        </div>
      )}
      
      {isNext && (
        <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center shadow-md">
          <FastForward className="w-3 h-3 mr-1" /> NEXT CLASS
        </div>
      )}

      {isCompleted && (
        <div className="absolute top-0 right-0 bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center">
          <span className="mr-1">✓</span> COMPLETED
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <div className={cn(
          "flex items-center font-semibold px-3 py-1 rounded-full text-sm",
          isActive ? "bg-accent/10 text-accent" : "bg-secondary/10 text-secondary"
        )}>
          <Clock className="w-4 h-4 mr-2" />
          {session.startTime} - {session.endTime}
        </div>
      </div>
      
      <h3 className="text-lg font-bold mb-1 flex items-start gap-2 pr-20 text-foreground">
        <BookOpen className="w-5 h-5 mt-0.5 text-secondary shrink-0" />
        <span className="leading-tight">{getSubjectName(session.subject)}</span>
      </h3>
      
      <div className="flex items-center text-secondary font-medium mb-3 pl-7 text-sm">
        <User className="w-4 h-4 mr-2 text-accent opacity-70 shrink-0" />
        {session.faculty}
      </div>
      
      <div className="flex justify-between items-end mt-3">
        <div className="flex items-center text-secondary font-medium">
          <MapPin className="w-4 h-4 mr-2 text-accent opacity-70 shrink-0" />
          {session.room}
        </div>
        
        {countdown && (
          <div className={cn(
            "text-sm font-bold flex flex-col items-end",
            isActive ? "text-accent" : "text-secondary"
          )}>
            <span className="text-xs font-medium opacity-70 uppercase tracking-wider">{isActive ? "Ends in" : "Starts in"}</span>
            <span>{countdown}</span>
          </div>
        )}
      </div>
    </div>
  );
}
