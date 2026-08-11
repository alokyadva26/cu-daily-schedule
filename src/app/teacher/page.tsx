'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QRScanner from '@/components/teacher/QRScanner';
import { User, ArrowRight } from 'lucide-react';
import { parseEmployeeIdFromQr } from '@/lib/teacherSchedule';

export default function TeacherLandingPage() {
  const [employeeId, setEmployeeId] = useState('');
  const router = useRouter();

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeId.trim()) {
      router.push(`/teacher/${parseEmployeeIdFromQr(employeeId)}`);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background p-4 md:p-8 flex flex-col items-center justify-center pb-24">
      <div className="w-full max-w-md cuims-card p-6 md:p-8 bg-white border border-card-border rounded-[24px] shadow-sm text-center">
        <h1 className="text-2xl font-black text-foreground tracking-tight mb-2 uppercase">
          CU Daily Schedule
        </h1>
        <div className="bg-accent/10 text-accent font-bold px-4 py-1.5 rounded-full inline-block mb-6 uppercase tracking-wider text-[11px]">
          Teacher Mode
        </div>
        
        <p className="text-secondary font-medium mb-8 text-sm">
          View your teaching schedule
        </p>

        <form onSubmit={handleManualSubmit} className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-secondary" />
            </div>
            <input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="Enter Employee ID (e.g. E19761)"
              className="w-full pl-11 pr-4 py-3.5 bg-background border border-timeline rounded-[12px] focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-foreground font-bold placeholder:font-medium transition-all uppercase placeholder:normal-case"
            />
          </div>
          <button
            type="submit"
            disabled={!employeeId.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-foreground text-background rounded-[12px] font-bold hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            View Schedule
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative flex items-center justify-center mb-2">
          <div className="absolute border-t border-timeline w-full"></div>
          <span className="bg-white px-4 text-xs font-bold text-secondary uppercase tracking-widest relative z-10">
            OR
          </span>
        </div>

        <QRScanner />
      </div>
    </div>
  );
}
