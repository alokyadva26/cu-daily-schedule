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
        "glass rounded-2xl p-5 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden",
        isSelected 
          ? isActive ? "ring-2 ring-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10" : "ring-2 ring-accent shadow-lg bg-accent/5 dark:bg-accent/10" 
          : "hover:bg-foreground/5 shadow-md",
        isActive && "border-l-4 border-l-emerald-500 scale-[1.02] shadow-[0_0_15px_rgba(16,185,129,0.2)]",
        isCompleted && "opacity-60"
      )}
    >
      {isActive && (
        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center shadow-md animate-pulse">
          <PlayCircle className="w-3 h-3 mr-1" /> NOW
        </div>
      )}
      
      {isNext && (
        <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center shadow-md">
          <FastForward className="w-3 h-3 mr-1" /> NEXT CLASS
        </div>
      )}

      {isCompleted && (
        <div className="absolute top-0 right-0 bg-foreground/20 text-foreground text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center shadow-sm">
          <span className="mr-1">✓</span> COMPLETED
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <div className={cn(
          "flex items-center font-semibold px-3 py-1 rounded-full text-sm",
          isActive ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-accent/10 text-accent"
        )}>
          <Clock className="w-4 h-4 mr-2" />
          {session.startTime} - {session.endTime}
        </div>
      </div>
      
      <h3 className="text-lg font-bold mb-1 flex items-start gap-2 pr-20">
        <BookOpen className="w-5 h-5 mt-0.5 text-foreground/60 shrink-0" />
        <span className="leading-tight">{getSubjectName(session.subject)}</span>
      </h3>
      
      <div className="flex items-center text-foreground/80 font-medium mb-3 pl-7 text-sm">
        <User className="w-4 h-4 mr-2 text-blue-400 shrink-0" />
        {session.faculty}
      </div>
      
      <div className="flex justify-between items-end mt-3">
        <div className="flex items-center text-foreground/70 font-medium">
          <MapPin className="w-4 h-4 mr-2 text-red-400 shrink-0" />
          {session.room}
        </div>
        
        {countdown && (
          <div className={cn(
            "text-sm font-bold flex flex-col items-end",
            isActive ? "text-emerald-600 dark:text-emerald-400" : "text-accent"
          )}>
            <span className="text-xs font-medium opacity-70 uppercase tracking-wider">{isActive ? "Ends in" : "Starts in"}</span>
            <span>{countdown}</span>
          </div>
        )}
      </div>
    </div>
  );
}
