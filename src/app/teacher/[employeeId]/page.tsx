import { getTeacherByEmployeeId, getTeacherSchedule } from '@/lib/db';
import TeacherScheduleView from '@/components/teacher/TeacherScheduleView';
import TeacherProfileHeader from '@/components/teacher/TeacherProfileHeader';
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
      <main className="max-w-[1200px] mx-auto px-4 md:px-6 pt-6 md:pt-10">
        
        {/* Back Button */}
        <Link href="/teacher" className="inline-flex items-center gap-2 text-slate-500 hover:text-foreground transition-colors font-bold text-sm mb-6 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Link>

        {/* Profile Card / Header */}
        <TeacherProfileHeader teacher={teacher} />

        {/* Two-Column Main Content */}
        <TeacherScheduleView 
          entries={allEntries} 
          teacherName={teacher.employee_name}
          teacherId={teacher.employee_id}
        />
      </main>
    </div>
  );
}
