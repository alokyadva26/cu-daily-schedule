import { ClassSession } from "@/types";
import { cn, getSubjectName } from "@/lib/utils";
import { BookOpen, Coffee, Check, MapPin, User } from "lucide-react";

interface ScheduleCardProps {
  session: ClassSession;
  isSelected: boolean;
  onClick: () => void;
  mode?: "normal" | "active" | "next" | "completed";
  countdown?: string;
  isLast?: boolean;
}

export function ScheduleCard({ session, isSelected, onClick, mode = "normal", countdown, isLast }: ScheduleCardProps) {
  const isActive = mode === "active";
  const isCompleted = mode === "completed";
  
  const isBreak = session.subject.toLowerCase().includes("break");

  return (
    <div className="relative flex gap-4 md:gap-6 group">
      
      {/* TIMELINE COLUMN */}
      <div className="flex flex-col items-center w-20 md:w-24 shrink-0 relative">
        {/* Vertical Line */}
        {!isLast && (
          <div className={cn(
            "absolute top-[40px] bottom-[-32px] w-0.5 z-0",
            isActive || isCompleted ? "bg-accent/40" : "bg-timeline/50"
          )}></div>
        )}

        {/* Time Text */}
        <div className="text-[11px] md:text-xs font-bold text-center mt-6 z-10 flex flex-col items-center leading-tight">
          <span className={cn(isActive ? "text-accent" : "text-foreground")}>{session.startTime}</span>
          <span className="text-secondary my-0.5">-</span>
          <span className={cn(isActive ? "text-accent" : "text-foreground")}>{session.endTime}</span>
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
        onClick={onClick}
        className={cn(
          "flex-1 relative cursor-pointer transition-all duration-300 transform rounded-[16px] border cuims-card",
          isActive 
            ? "border-accent border-l-[6px] bg-active-bg shadow-md scale-[1.01]" 
            : "border-card-border bg-white hover:border-timeline hover:shadow-md",
          isBreak ? "p-4 flex items-center gap-4 min-h-[72px]" : "p-5",
          isCompleted && !isBreak && "opacity-80"
        )}
      >
        {isBreak ? (
          <>
            <div className="w-10 h-10 rounded-full bg-[#FFF5F5] text-accent flex items-center justify-center shrink-0 border border-accent/10">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Break</h3>
          </>
        ) : (
          <div className="flex gap-4">
            {/* Subject Icon */}
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center shrink-0 border",
              isActive ? "bg-white text-accent border-accent/20 shadow-sm" : "bg-background text-accent border-transparent"
            )}>
              <BookOpen className="w-5 h-5" />
            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0 pr-16 md:pr-24">
              <h3 className="text-[17px] font-bold text-foreground mb-1 leading-tight truncate">
                {getSubjectName(session.subject)}
              </h3>
              
              <div className="flex items-center text-secondary text-[13px] font-medium mb-1">
                <User className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                <span className="truncate">{session.faculty}</span>
              </div>
              
              <div className="flex items-center text-secondary text-[13px] font-medium">
                <MapPin className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                <span className="truncate">{session.room}</span>
              </div>
            </div>

            {/* Active Badges */}
            {isActive && (
              <div className="absolute right-4 top-4 bottom-4 flex flex-col justify-between items-end">
                <div className="bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  NOW
                </div>
                {countdown && (
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Ends In</span>
                    <span className="text-sm font-black text-accent">{countdown}</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Completed Badge (Optional but good for clarity) */}
            {isCompleted && !isActive && (
              <div className="absolute right-5 top-5 opacity-40">
                <Check className="w-5 h-5 text-timeline" />
              </div>
            )}
          </div>
        )}
      </div>
      
    </div>
  );
}
