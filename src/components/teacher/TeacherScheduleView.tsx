'use client';

import { useState, useEffect, useMemo } from 'react';
import { DatabaseScheduleEntry } from '@/lib/db';
import { getScheduleStatus, formatRemainingTime, parseTime, getNowInKolkata } from '@/lib/teacherSchedule';
import { TeacherScheduleCard } from './TeacherScheduleCard';
import { Coffee, Calendar as CalendarIcon, Clock, BookOpen, MapPin, Users, Hash, RefreshCw, AlertCircle, Check, User as UserIcon } from 'lucide-react';

interface TeacherScheduleViewProps {
  entries: DatabaseScheduleEntry[];
  teacherName?: string;
  teacherId?: string;
}

export default function TeacherScheduleView({ entries, teacherName, teacherId }: TeacherScheduleViewProps) {
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

  const renderDynamicPanel = () => {
    if (isFinished) {
      return (
        <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-[0_2px_12px_rgb(0,0,0,0.02)] flex flex-col items-center text-center h-full justify-center min-h-[400px]">
          <div className="w-16 h-16 bg-[#f8f9fa] rounded-full flex items-center justify-center border border-slate-200 mb-6">
            <Check className="w-8 h-8 text-[#28a745]" />
          </div>
          <h3 className="text-[#1a2b4c] font-black text-xl mb-2">DAY COMPLETE</h3>
          <p className="text-slate-500 font-medium">All classes are finished for today.</p>
        </div>
      );
    }

    const activeOrNext = currentClass || nextClass;
    if (!activeOrNext) return null;

    const formattedTime = formatRemainingTime(remainingSeconds);
    const isCurrent = !!currentClass;

    return (
      <div className="flex flex-col h-full gap-4">
        {/* Countdown Card */}
        <div className="bg-white border border-slate-200 rounded-[24px] p-8 shadow-[0_2px_12px_rgb(0,0,0,0.02)] text-center flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#fff5f5] rounded-full flex items-center justify-center text-[#d32f2f]">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-[#868e96] font-bold text-[11px] tracking-wider uppercase">
              {isCurrent ? 'CLASS ENDS IN' : 'NEXT CLASS STARTS IN'}
            </span>
          </div>
          
          <div className="flex items-baseline justify-center gap-3 text-[#1a2b4c] mb-2">
            <span className="text-6xl font-black text-[#d32f2f] tracking-tighter leading-none">{formattedTime.unit1}</span>
            <span className="text-xl font-bold text-[#868e96]">{formattedTime.label1}</span>
            <span className="text-6xl font-black text-[#d32f2f] tracking-tighter leading-none">{formattedTime.unit2}</span>
            <span className="text-xl font-bold text-[#868e96]">{formattedTime.label2}</span>
          </div>
          
          <p className="text-[#868e96] text-sm font-medium mt-4">
            {isCurrent ? 'Class is currently in progress' : 'Get ready for your next class'}
          </p>
        </div>

        {/* Class Details Card */}
        <div className="bg-white border border-slate-200 rounded-[24px] shadow-[0_2px_12px_rgb(0,0,0,0.02)] flex-1 flex flex-col">
          <div className="p-6 border-b border-slate-100 border-dashed">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-[#d32f2f]" />
              <span className="text-[#1a2b4c] font-black text-[13px] tracking-widest uppercase">
                {isCurrent ? 'CURRENT CLASS' : 'NEXT CLASS'}
              </span>
            </div>
            <h3 className="text-2xl font-black text-[#1a2b4c] mb-3 leading-tight">{activeOrNext.course_name}</h3>
            <span className="inline-flex items-center px-3 py-1 bg-[#fff5f5] text-[#d32f2f] text-xs font-bold rounded-[8px] border border-[#d32f2f]/10">
              {activeOrNext.course_code} • {activeOrNext.course_type}
            </span>
          </div>
          
          <div className="flex-1 flex flex-col text-[13px]">
            {/* Faculty Row */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[#868e96] font-medium w-28">
                <UserIcon className="w-4 h-4" /> Faculty
              </div>
              <span className="font-bold text-[#1a2b4c] text-right">
                {teacherName ? `${teacherName} (${teacherId})` : 'Loading...'}
              </span>
            </div>

            {/* Classroom Row */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[#868e96] font-medium w-28">
                <MapPin className="w-4 h-4" /> Classroom
              </div>
              <span className="font-bold text-[#d32f2f] bg-[#fff5f5] px-2 py-0.5 rounded text-right">
                Block-{activeOrNext.block_no} / {activeOrNext.room_no}
              </span>
            </div>
            
            {/* Group Row */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
              <div className="flex items-center gap-3 text-[#868e96] font-medium w-28">
                <Users className="w-4 h-4" /> Group
              </div>
              <span className="font-bold text-[#1a2b4c] text-right">
                {activeOrNext.student_group === 'empty' ? activeOrNext.section : `Group ${activeOrNext.student_group}`}
              </span>
            </div>
            
            {/* Time Row */}
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex items-center gap-3 text-[#868e96] font-medium w-28">
                <Clock className="w-4 h-4" /> Time
              </div>
              <span className="font-bold text-[#1a2b4c] text-right">
                {activeOrNext.start_time} - {activeOrNext.end_time}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Card */}
        <div className="bg-white border border-slate-200 rounded-[16px] p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#fff5f5] flex items-center justify-center text-[#d32f2f]">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#1a2b4c]">Schedule updates automatically</div>
              <div className="text-[11px] font-medium text-[#868e96]">Last updated: {now?.toLocaleTimeString()}</div>
            </div>
          </div>
          <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-[8px] text-[12px] font-bold text-[#d32f2f] hover:bg-slate-50 transition-colors">
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-12 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
      {/* LEFT COLUMN: Timeline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <CalendarIcon className="w-6 h-6 text-[#d32f2f]" />
          <h2 className="text-[22px] font-black text-[#1a2b4c]">Today's Schedule</h2>
        </div>

        {isFinished ? (
          <div className="bg-[#f8f9fa] border border-dashed border-slate-300 rounded-[20px] p-8 text-center flex flex-col items-center mt-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border border-slate-200 mb-4 shadow-sm">
              <Coffee className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-[#1a2b4c] font-black text-xl mb-1 tracking-tight">DAY COMPLETE</h3>
            <p className="text-slate-500 text-sm font-medium">All classes are finished for today.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Continuous Timeline line connecting all cards */}
            <div className="absolute left-[39px] md:left-[59px] top-[24px] bottom-[24px] w-0.5 bg-slate-200 z-0 hidden md:block"></div>

            {todayEntries.map((entry, index) => {
              const isCurrent = currentClass?.id === entry.id;
              const isNext = nextClass?.id === entry.id;
              const entryEndTime = parseTime(entry.end_time, now);
              const isDone = now > entryEndTime;
              const isLast = index === todayEntries.length - 1;

              let mode: "normal" | "active" | "next" | "completed" = "normal";
              if (isCurrent) mode = "active";
              else if (isNext) mode = "next";
              else if (isDone) mode = "completed";

              return (
                <TeacherScheduleCard 
                  key={entry.id} 
                  entry={entry} 
                  mode={mode} 
                  isLast={isLast}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Dynamic Panel */}
      <div className="sticky top-24 h-[calc(100vh-120px)] hidden lg:block">
        {renderDynamicPanel()}
      </div>
      
      {/* Mobile Dynamic Panel (Shows below timeline on small screens) */}
      <div className="lg:hidden mt-8">
        <h2 className="text-[22px] font-black text-[#1a2b4c] mb-6 border-t border-slate-200 pt-8">Status</h2>
        {renderDynamicPanel()}
      </div>
    </div>
  );
}
