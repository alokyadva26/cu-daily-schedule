import { DatabaseScheduleEntry } from "@/lib/db";
import { cn } from "@/lib/utils";
import { BookOpen, MapPin, Users, Hash, ChevronRight, Check } from "lucide-react";

interface TeacherScheduleCardProps {
  entry: DatabaseScheduleEntry;
  mode?: "normal" | "active" | "next" | "completed";
  isLast?: boolean;
}

export function TeacherScheduleCard({ entry, mode = "normal", isLast }: TeacherScheduleCardProps) {
  const isActive = mode === "active";
  const isCompleted = mode === "completed";
  const isNext = mode === "next";
  
  // Highlight active or next in red for the timeline dot
  const isHighlighted = isActive || isNext;

  return (
    <div className="relative flex gap-4 md:gap-8 group mb-6 md:mb-8">
      
      {/* TIMELINE COLUMN */}
      <div className="flex flex-col items-end md:items-center w-20 md:w-28 shrink-0 relative pr-4 md:pr-0">
        
        {/* Vertical Line */}
        {!isLast && (
          <div className="absolute top-[24px] bottom-[-48px] right-[7px] md:right-auto w-0.5 bg-slate-200 z-0 hidden md:block"></div>
        )}

        {/* Time Text */}
        <div className="text-[11px] md:text-[13px] font-bold text-right md:text-center mt-1 z-10 flex flex-col leading-[1.4] text-[#1a2b4c]">
          <span>{entry.start_time}</span>
          <span>{entry.end_time}</span>
        </div>

        {/* Timeline Node */}
        <div className={cn(
          "absolute right-[-1px] md:right-auto top-[6px] md:top-[8px] z-10 w-5 h-5 rounded-full flex items-center justify-center border-[2.5px] bg-white shadow-sm hidden md:flex",
          isHighlighted ? "border-[#d32f2f] bg-[#d32f2f]" : isCompleted ? "border-[#28a745] bg-[#28a745]" : "border-slate-300"
        )}>
          {isCompleted && <Check className="w-3 h-3 text-white stroke-[3]" />}
        </div>
      </div>

      {/* CARD CONTENT */}
      <div 
        className={cn(
          "flex-1 relative transition-all duration-300 rounded-[16px] border bg-white shadow-[0_2px_12px_rgb(0,0,0,0.02)] hover:shadow-[0_4px_24px_rgb(0,0,0,0.06)]",
          isHighlighted ? "border-[#d32f2f]/30" : "border-slate-200",
          isCompleted && "opacity-70"
        )}
      >
        <div className="p-5 md:p-6 flex gap-4 md:gap-5">
          {/* Subject Icon */}
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0 bg-[#fff5f5] border border-[#d32f2f]/10 text-[#d32f2f]">
            <BookOpen className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0 pr-2">
            {isActive && (
              <div className="text-[#868e96] text-[10px] md:text-[11px] font-bold uppercase tracking-wider mb-1">
                CURRENT CLASS
              </div>
            )}
            {isNext && (
              <div className="text-[#868e96] text-[10px] md:text-[11px] font-bold uppercase tracking-wider mb-1">
                NEXT CLASS
              </div>
            )}

            <div className="flex justify-between items-start">
              <h3 className="text-[15px] md:text-[17px] font-black text-[#1a2b4c] mb-1 leading-tight pr-4">
                {entry.course_name}
              </h3>
            </div>
            
            <div className="text-[12px] md:text-[13px] font-bold text-[#d32f2f] mb-4">
              {entry.course_code} • {entry.course_type}
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[#868e96] text-[12px] md:text-[13px] font-medium">
              <div className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                <span className="truncate">Block-{entry.block_no} / {entry.room_no}</span>
              </div>
              
              {entry.student_group && entry.student_group !== 'empty' && (
                <>
                  <div className="w-[1px] h-3 bg-slate-300 hidden sm:block"></div>
                  <div className="flex items-center">
                    <Users className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                    <span className="truncate">Group {entry.student_group}</span>
                  </div>
                </>
              )}
              
              <div className="w-[1px] h-3 bg-slate-300 hidden sm:block"></div>
              <div className="flex items-center">
                <Hash className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                <span className="truncate">{entry.section}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
