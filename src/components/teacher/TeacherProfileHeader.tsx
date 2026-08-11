'use client';

import { useState, useEffect } from 'react';
import { getNowInKolkata } from '@/lib/teacherSchedule';
import { Calendar as CalendarIcon, User as UserIcon } from 'lucide-react';
import { TeacherData } from '@/lib/db';

export default function TeacherProfileHeader({ teacher }: { teacher: TeacherData }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(getNowInKolkata());
    const interval = setInterval(() => setNow(getNowInKolkata()), 60000); // Update once a minute
    return () => clearInterval(interval);
  }, []);

  let dateStr = '';
  let dayName = '';

  if (now) {
    dateStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Asia/Kolkata' });
    dayName = now.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Kolkata' });
  }

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

      {/* Date Widget */}
      <div className="flex items-center gap-4 bg-white md:bg-transparent px-2 py-2 min-w-[140px] opacity-0 animate-in fade-in duration-500 fill-mode-forwards" style={{ animationDelay: '100ms' }}>
        <div className="w-10 h-10 rounded-[10px] bg-[#fff5f5] flex items-center justify-center text-[#d32f2f] border border-[#d32f2f]/10">
          <CalendarIcon className="w-5 h-5" strokeWidth={2} />
        </div>
        <div className="flex flex-col">
          <span className="text-[14px] font-black text-[#1a2b4c] leading-tight">
            {now ? dayName : '...'}
          </span>
          <span className="text-[13px] font-bold text-[#d32f2f] leading-tight">
            {now ? dateStr : 'Loading...'}
          </span>
        </div>
      </div>
      
    </div>
  );
}
