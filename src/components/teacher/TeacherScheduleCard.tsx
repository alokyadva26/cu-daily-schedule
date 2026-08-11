import { DatabaseScheduleEntry } from "@/lib/db";
import { cn } from "@/lib/utils";
import { BookOpen, Check, MapPin, Users, Hash } from "lucide-react";

interface TeacherScheduleCardProps {
  entry: DatabaseScheduleEntry;
  mode?: "normal" | "active" | "next" | "completed";
  countdown?: string;
  isLast?: boolean;
}

export function TeacherScheduleCard({ entry, mode = "normal", countdown, isLast }: TeacherScheduleCardProps) {
  const isActive = mode === "active";
  const isCompleted = mode === "completed";
  const isNext = mode === "next";

  return (
    <div className="relative flex gap-4 md:gap-6 group mb-4">
      
      {/* TIMELINE COLUMN */}
      <div className="flex flex-col items-center w-20 md:w-24 shrink-0 relative">
        {/* Vertical Line */}
        {!isLast && (
          <div className={cn(
            "absolute top-[40px] bottom-[-48px] w-0.5 z-0",
            isActive || isCompleted ? "bg-accent/40" : "bg-timeline/50"
          )}></div>
        )}

        {/* Time Text */}
        <div className="text-[11px] md:text-xs font-bold text-center mt-6 z-10 flex flex-col items-center leading-tight">
          <span className={cn(isActive ? "text-accent" : "text-foreground")}>{entry.start_time}</span>
          <span className="text-secondary my-0.5">-</span>
          <span className={cn(isActive ? "text-accent" : "text-foreground")}>{entry.end_time}</span>
        </div>

        {/* Timeline Node */}
        <div className={cn(
          "absolute right-[-14px] md:right-[-17px] top-[26px] z-10 w-[14px] h-[14px] rounded-full flex items-center justify-center bg-background border-2",
          isActive ? "border-accent bg-accent ring-4 ring-accent/20" 
            : isCompleted ? "border-timeline bg-transparent" 
            : "border-timeline bg-background"
        )}>
          {isCompleted && <Check className="w-2.5 h-2.5 text-timeline stroke-[3]" />}
        </div>
      </div>

      {/* CARD CONTENT */}
      <div 
        className={cn(
          "flex-1 relative transition-all duration-300 transform rounded-[16px] border cuims-card",
          isActive 
            ? "border-accent border-l-[6px] bg-active-bg shadow-md scale-[1.01]" 
            : isNext 
              ? "border-accent/40 bg-white hover:border-timeline hover:shadow-sm"
              : "border-card-border bg-white hover:border-timeline hover:shadow-sm",
          "p-5",
          isCompleted && "opacity-60"
        )}
      >
        <div className="flex gap-4">
          {/* Subject Icon */}
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center shrink-0 border",
            isActive ? "bg-white text-accent border-accent/20 shadow-sm" : "bg-background text-accent border-transparent"
          )}>
            <BookOpen className="w-5 h-5" />
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0 pr-2">
            {isActive && (
              <div className="text-accent text-[10px] font-black uppercase tracking-wider mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                CURRENT CLASS
              </div>
            )}
            {isNext && (
              <div className="text-secondary text-[10px] font-black uppercase tracking-wider mb-1">
                NEXT CLASS
              </div>
            )}

            <h3 className="text-[16px] font-bold text-foreground mb-1 leading-tight line-clamp-2">
              {entry.course_name}
            </h3>
            <div className="text-xs font-bold text-accent mb-3">{entry.course_code} • {entry.course_type}</div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div className="flex items-center text-secondary text-[13px] font-medium">
                <MapPin className="w-3.5 h-3.5 mr-2 shrink-0 text-foreground/40" />
                <span className="truncate">{entry.block_no} / {entry.room_no}</span>
              </div>
              <div className="flex items-center text-secondary text-[13px] font-medium">
                <Hash className="w-3.5 h-3.5 mr-2 shrink-0 text-foreground/40" />
                <span className="truncate">{entry.section}</span>
              </div>
              {entry.student_group && entry.student_group !== 'empty' && (
                <div className="flex items-center text-secondary text-[13px] font-medium">
                  <Users className="w-3.5 h-3.5 mr-2 shrink-0 text-foreground/40" />
                  <span className="truncate">Group {entry.student_group}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Countdown */}
        {(isActive || isNext) && countdown && (
          <div className={cn(
            "mt-4 pt-3 border-t flex justify-between items-center",
            isActive ? "border-accent/10" : "border-card-border"
          )}>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">
              {isActive ? 'Ends In' : 'Starts In'}
            </span>
            <span className={cn(
              "font-black text-sm",
              isActive ? "text-accent" : "text-foreground"
            )}>{countdown}</span>
          </div>
        )}
      </div>
      
    </div>
  );
}
