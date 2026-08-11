import { getTeacherByEmployeeId, getTeacherSchedule } from '@/lib/db';
import TeacherScheduleView from '@/components/teacher/TeacherScheduleView';
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
      <div className="min-h-[100dvh] bg-background p-6 flex flex-col items-center justify-center">
        <div className="cuims-card p-8 bg-white border border-card-border rounded-[24px] shadow-sm text-center max-w-sm w-full">
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
  
  // Since we want dynamic day, the Client Component will filter them based on the local browser date.
  // We pass all entries to the client.

  return (
    <div className="min-h-[100dvh] bg-background pb-24">
      {/* Header */}
      <header className="bg-white border-b border-card-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/teacher" className="p-2 -ml-2 text-secondary hover:text-foreground transition-colors rounded-full hover:bg-background">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="font-bold text-foreground text-sm uppercase tracking-wider">Teacher Schedule</div>
          <div className="w-9"></div> {/* Balancer */}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-6">
        {/* Profile Card */}
        <div className="cuims-card p-6 bg-white border border-card-border rounded-[24px] shadow-sm mb-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center text-xl font-black shrink-0">
            {teacher.employee_name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-black text-foreground truncate">{teacher.employee_name}</h1>
            <p className="text-secondary text-sm font-medium flex gap-2 items-center">
              <span className="bg-background px-2 py-0.5 rounded text-xs font-bold uppercase">{teacher.employee_id}</span>
              <span>{teacher.department}</span>
            </p>
          </div>
        </div>

        <TeacherScheduleView entries={allEntries} />
      </main>
    </div>
  );
}
