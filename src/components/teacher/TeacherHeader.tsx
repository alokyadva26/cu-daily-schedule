'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { getNowInKolkata } from '@/lib/teacherSchedule';

export default function TeacherHeader() {
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
    <header className="bg-[#f8f9fa] border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-4xl mx-auto px-4 h-[76px] flex items-center justify-between relative">
        
        {/* Left: Back Button */}
        <Link href="/teacher" className="w-11 h-11 flex items-center justify-center bg-white border border-slate-200 rounded-[12px] text-slate-600 hover:text-foreground hover:bg-slate-50 transition-colors shadow-sm z-10">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        
        {/* Center: Title */}
        <div className="font-black text-foreground text-[16px] tracking-[0.1em] uppercase absolute left-1/2 -translate-x-1/2 hidden sm:block">
          Teacher Schedule
        </div>

        {/* Right: Date widget */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-[12px] px-3 py-2 shadow-sm min-w-[140px] z-10">
          <div className="w-8 h-8 rounded-full bg-[#f8f9fa] flex items-center justify-center text-slate-400 border border-slate-100">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 leading-tight">
              {now ? dateStr : 'Loading...'}
            </span>
            <span className="text-[11px] font-black text-accent uppercase leading-tight">
              {now ? dayName : '...'}
            </span>
          </div>
        </div>
        
      </div>
    </header>
  );
}
