'use client';

import { useState, useEffect, useMemo } from 'react';
import { DatabaseScheduleEntry } from '@/lib/db';
import { getScheduleStatus, formatRemainingTime, parseTime, getNowInKolkata } from '@/lib/teacherSchedule';
import { TeacherScheduleCard } from './TeacherScheduleCard';
import { Coffee, Calendar as CalendarIcon, Clock } from 'lucide-react';

interface TeacherScheduleViewProps {
  entries: DatabaseScheduleEntry[];
}

export default function TeacherScheduleView({ entries }: TeacherScheduleViewProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Initialize with actual Kolkata time on mount
    setNow(getNowInKolkata());
    
    // Create lightweight timer to trigger re-renders
    const interval = setInterval(() => {
      setNow(getNowInKolkata());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!now) {
    return <div className="text-center text-secondary py-12 font-medium animate-pulse">Loading schedule...</div>;
  }

  const dayName = now.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Kolkata' });
  const dateStr = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });

  // Filter and sort entries based on current day and time
  const todayEntries = entries
    .filter(e => e.day_of_week.toLowerCase() === dayName.toLowerCase())
    .sort((a, b) => parseTime(a.start_time, now).getTime() - parseTime(b.start_time, now).getTime());

  const scheduleState = getScheduleStatus(todayEntries, now);
  const { currentClass, nextClass, isFinished, remainingSeconds, status } = scheduleState;



  if (todayEntries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-[#FFF5F5] rounded-full flex items-center justify-center mb-6">
          <Coffee className="w-10 h-10 text-accent" />
        </div>
        <h2 className="text-2xl font-black text-foreground mb-2">No classes scheduled today.</h2>
        <p className="text-secondary font-medium">Enjoy your day!</p>
        <div className="mt-8 px-6 py-2 bg-background border border-card-border rounded-full flex items-center gap-2 text-sm font-bold text-foreground">
          <CalendarIcon className="w-4 h-4 text-accent" />
          {dayName}, {dateStr}
        </div>
      </div>
    );
  }



  return (
    <div className="pb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-[28px] font-black text-[#1a2b4c]">Today's Schedule</h2>
        <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-[#d32f2f]/20 text-[#d32f2f] rounded-[8px] text-xs font-bold hover:bg-[#d32f2f]/5 transition-colors shadow-sm">
          <CalendarIcon className="w-3.5 h-3.5" />
          View Full Timetable
        </button>
      </div>

      {isFinished && (
        <div className="bg-[#f8f9fa] border border-dashed border-slate-300 rounded-[20px] p-8 mb-10 text-center flex flex-col items-center">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border border-slate-200 mb-4 shadow-sm">
            <Coffee className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-[#1a2b4c] font-black text-xl mb-1 tracking-tight">DAY COMPLETE</h3>
          <p className="text-slate-500 text-sm font-medium">All classes are finished for today.</p>
        </div>
      )}

      {/* Free Period State (No current class, but there is a next class) */}
      {!currentClass && nextClass && !isFinished && (
        <div className="bg-[#f8f9fa] border border-dashed border-slate-300 rounded-[20px] p-6 md:p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center gap-6 z-10 w-full">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 shrink-0">
              <Coffee className="w-7 h-7 md:w-8 md:h-8 text-slate-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[#1a2b4c] font-black text-xs md:text-sm tracking-widest uppercase mb-1 md:mb-2">FREE PERIOD</h3>
              <div className="text-slate-500 text-lg md:text-2xl font-bold flex flex-wrap items-baseline gap-x-2">
                Next class starts in 
                <span className="text-[#d32f2f]">{formatRemainingTime(remainingSeconds)}</span>
              </div>
            </div>
          </div>
          
          {/* Decorative clock graphic for large screens */}
          <div className="hidden md:flex items-center justify-center w-24 h-24 rounded-full bg-slate-200/50 absolute right-12 z-0">
            <Clock className="w-12 h-12 text-slate-400/50 stroke-[1.5]" />
          </div>
        </div>
      )}

      <div className="relative">
        {/* Continuous Timeline line connecting all cards */}
        <div className="absolute left-[39px] md:left-[59px] top-[24px] bottom-[24px] w-0.5 bg-slate-200 z-0"></div>

        {todayEntries.map((entry, index) => {
          const isCurrent = currentClass?.id === entry.id;
          const isNext = nextClass?.id === entry.id;
          const entryEndTime = parseTime(entry.end_time, now);
          const isDone = now > entryEndTime;
          const isLast = index === todayEntries.length - 1;

          let mode: "normal" | "active" | "next" | "completed" = "normal";
          let countdownStr = undefined;

          if (isCurrent) {
            mode = "active";
            countdownStr = formatRemainingTime(remainingSeconds);
          } else if (isNext) {
            mode = "next";
            countdownStr = formatRemainingTime(remainingSeconds);
          } else if (isDone) {
            mode = "completed";
          }

          return (
            <TeacherScheduleCard 
              key={entry.id} 
              entry={entry} 
              mode={mode} 
              countdown={countdownStr} 
              isLast={isLast}
            />
          );
        })}
      </div>
    </div>
  );
}
