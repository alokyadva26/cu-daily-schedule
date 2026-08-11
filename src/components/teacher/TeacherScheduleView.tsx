'use client';

import { useState, useEffect } from 'react';
import { DatabaseScheduleEntry } from '@/lib/db';
import { getScheduleStatus, getTimeRemaining, parseTime } from '@/lib/teacherSchedule';
import { TeacherScheduleCard } from './TeacherScheduleCard';
import { Coffee, Calendar as CalendarIcon } from 'lucide-react';

interface TeacherScheduleViewProps {
  entries: DatabaseScheduleEntry[];
}

export default function TeacherScheduleView({ entries }: TeacherScheduleViewProps) {
  const [todayEntries, setTodayEntries] = useState<DatabaseScheduleEntry[]>([]);
  const [currentDay, setCurrentDay] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [status, setStatus] = useState<ReturnType<typeof getScheduleStatus> | null>(null);
  const [currentCountdown, setCurrentCountdown] = useState<string>('');
  const [nextCountdown, setNextCountdown] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Determine today's day locally
    const now = new Date();
    const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
    const dateStr = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    
    setCurrentDay(dayName);
    setCurrentDate(dateStr);

    const filtered = entries.filter(e => e.day_of_week.toLowerCase() === dayName.toLowerCase());
    
    // Sort chronologically
    filtered.sort((a, b) => parseTime(a.start_time).getTime() - parseTime(b.start_time).getTime());
    
    setTodayEntries(filtered);
    setStatus(getScheduleStatus(filtered));
  }, [entries]);

  // Timer for countdowns and status recalculation
  useEffect(() => {
    if (todayEntries.length === 0) return;

    const interval = setInterval(() => {
      const newStatus = getScheduleStatus(todayEntries);
      setStatus(newStatus);
      
      if (newStatus.currentClass) {
        setCurrentCountdown(getTimeRemaining(newStatus.currentClass.end_time));
      }
      
      if (newStatus.nextClass) {
        setNextCountdown(getTimeRemaining(newStatus.nextClass.start_time));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [todayEntries]);

  if (!isClient) {
    return <div className="text-center text-secondary py-12 font-medium animate-pulse">Loading schedule...</div>;
  }

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
          {currentDay}, {currentDate}
        </div>
      </div>
    );
  }

  const { currentClass, nextClass, isFinished } = status || { currentClass: null, nextClass: null, isFinished: false };

  return (
    <div className="pb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[22px] font-black text-foreground">Today's Schedule</h2>
        <div className="text-right">
          <div className="text-accent font-bold text-sm uppercase">{currentDay}</div>
          <div className="text-secondary text-xs font-bold">{currentDate}</div>
        </div>
      </div>

      {isFinished && (
        <div className="bg-active-bg border border-accent/20 rounded-[20px] p-6 mb-8 text-center shadow-sm">
          <h3 className="text-accent font-black text-lg mb-1">Day Complete</h3>
          <p className="text-secondary text-sm font-medium">All classes completed for today.</p>
        </div>
      )}

      {/* Free Period State (No current class, but there is a next class) */}
      {!currentClass && nextClass && !isFinished && (
        <div className="bg-background border-2 border-timeline border-dashed rounded-[24px] p-6 mb-8 text-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-card-border">
            <Coffee className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="text-foreground font-black text-lg mb-1 tracking-tight">FREE PERIOD</h3>
          <p className="text-secondary text-sm font-bold mb-4">
            Next class starts in: <span className="text-foreground">{nextCountdown}</span>
          </p>
        </div>
      )}

      <div className="relative">
        {/* Continuous Timeline line connecting all cards */}
        <div className="absolute left-[39px] md:left-[47px] top-[40px] bottom-10 w-0.5 bg-timeline/50 z-0"></div>

        {todayEntries.map((entry, index) => {
          const isCurrent = currentClass?.id === entry.id;
          const isNext = nextClass?.id === entry.id;
          const entryEndTime = parseTime(entry.end_time);
          const isDone = new Date() > entryEndTime;
          const isLast = index === todayEntries.length - 1;

          let mode: "normal" | "active" | "next" | "completed" = "normal";
          let countdownStr = undefined;

          if (isCurrent) {
            mode = "active";
            countdownStr = currentCountdown;
          } else if (isNext) {
            mode = "next";
            countdownStr = nextCountdown;
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
