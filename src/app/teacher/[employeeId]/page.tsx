import { getTeacherByEmployeeId, getTeacherSchedule } from '@/lib/db';
import TeacherScheduleView from '@/components/teacher/TeacherScheduleView';
import TeacherHeader from '@/components/teacher/TeacherHeader';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ employeeId: string }>;
}

export default async function TeacherSchedulePage({ params }: PageProps) {
  const { employeeId } = await params;
  
  // Validate and fetch teacher
  const teacher = await getTeacherByEmployeeId(employeeId.toUpperCase());
  
  if (!teacher) {
    return (
      <div className="min-h-[100dvh] bg-[#f8f9fa] p-6 flex flex-col items-center justify-center">
        <div className="cuims-card p-8 bg-white border border-slate-200 rounded-[24px] shadow-sm text-center max-w-sm w-full">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-black">!</span>
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">Teacher Not Found</h1>
          <p className="text-secondary text-sm mb-8 font-medium">
            Please check the Employee ID or scan the QR code again.
          </p>
          <Link 
            href="/teacher"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-[12px] font-bold hover:bg-foreground/90 transition-colors shadow-md w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  // Fetch all schedule entries for this teacher
  const allEntries = await getTeacherSchedule(teacher.employee_id);

  return (
    <div className="min-h-[100dvh] bg-[#f8f9fa] pb-24">
      {/* Header */}
      <TeacherHeader />

      <main className="max-w-4xl mx-auto px-4 pt-8">
        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-[24px] shadow-[0_4px_24px_rgb(0,0,0,0.02)] p-6 md:p-8 mb-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#d32f2f] text-white flex items-center justify-center text-3xl font-black shrink-0 shadow-sm">
            {teacher.employee_name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0 text-center md:text-left flex flex-col items-center md:items-start">
            <h1 className="text-2xl md:text-[28px] font-black text-[#1a2b4c] mb-2">{teacher.employee_name}</h1>
            <div className="flex items-center gap-3">
              <span className="bg-[#f1f3f5] text-[#495057] px-3 py-1 rounded-[8px] text-xs font-bold uppercase tracking-wide">
                {teacher.employee_id}
              </span>
              <span className="text-[#6c757d] text-sm font-bold uppercase tracking-wider">{teacher.department}</span>
            </div>
          </div>
        </div>

        <TeacherScheduleView entries={allEntries} />
      </main>
    </div>
  );
}
