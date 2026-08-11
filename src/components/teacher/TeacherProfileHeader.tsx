'use client';

import { useState, useEffect, useMemo } from 'react';
import { getNowInKolkata, getScheduleStatus, formatRemainingTime, parseTime } from '@/lib/teacherSchedule';
import { Clock, User as UserIcon } from 'lucide-react';
import { TeacherData, DatabaseScheduleEntry } from '@/lib/db';

export default function TeacherProfileHeader({ teacher, entries = [] }: { teacher: TeacherData, entries?: DatabaseScheduleEntry[] }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(getNowInKolkata());
    const interval = setInterval(() => setNow(getNowInKolkata()), 1000); // Update every second for the timer
    return () => clearInterval(interval);
  }, []);

  const timerWidget = useMemo(() => {
    if (!now || entries.length === 0) return null;

    const dayName = now.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Kolkata' });
    const todayEntries = entries
      .filter(e => e.day_of_week.toLowerCase() === dayName.toLowerCase())
      .sort((a, b) => parseTime(a.start_time, now).getTime() - parseTime(b.start_time, now).getTime());

    const { currentClass, nextClass, remainingSeconds, isFinished } = getScheduleStatus(todayEntries, now);
    
    if (isFinished || (!currentClass && !nextClass)) return null;

    const formattedTime = formatRemainingTime(remainingSeconds);
    const isCurrent = !!currentClass;

    return (
      <div className="flex items-center gap-4 bg-slate-50/80 rounded-[16px] px-4 py-2">
        <div className="w-10 h-10 rounded-[10px] bg-white flex flex-col items-center justify-center text-[#d32f2f] border border-[#d32f2f]/10 shadow-sm shrink-0">
          <Clock className="w-5 h-5 mb-0.5" strokeWidth={2} />
        </div>
        <div className="flex flex-col">
          <span className="text-[#868e96] font-bold text-[10px] tracking-wider uppercase mb-0.5 leading-none">
            {isCurrent ? 'CLASS ENDS IN' : 'NEXT CLASS IN'}
          </span>
          <div className="flex items-baseline gap-1.5 text-[#1a2b4c]">
            <span className="text-2xl font-black text-[#d32f2f] tracking-tighter leading-none">{formattedTime.unit1}</span>
            <span className="text-[11px] font-bold text-[#868e96]">{formattedTime.label1}</span>
            <span className="text-2xl font-black text-[#d32f2f] tracking-tighter leading-none">{formattedTime.unit2}</span>
            <span className="text-[11px] font-bold text-[#868e96]">{formattedTime.label2}</span>
          </div>
        </div>
      </div>
    );
  }, [now, entries]);

  return (
    <div className="bg-white border border-slate-200 rounded-[16px] shadow-[0_2px_12px_rgb(0,0,0,0.02)] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between w-full mb-8">
      
      {/* Teacher Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto text-center md:text-left">
        <div className="w-20 h-20 md:w-[88px] md:h-[88px] rounded-full bg-[#d32f2f] text-white flex items-center justify-center text-3xl font-black shrink-0 shadow-sm">
          {teacher.employee_name.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-[26px] font-black text-[#1a2b4c] mb-1 leading-tight">{teacher.employee_name}</h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-[14px] font-medium text-[#868e96] mb-1">
            <span>{teacher.employee_id}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>{teacher.department}</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-[13px] font-medium text-[#868e96]">
            <UserIcon className="w-4 h-4" />
            Assistant Professor
          </div>
        </div>
      </div>

      {/* Dynamic Timer Widget */}
      {timerWidget}
      
    </div>
  );
}
