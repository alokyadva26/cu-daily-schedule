import { ClassSession } from "@/types";
import { Clock, MapPin, User, BookOpen } from "lucide-react";
import { getSubjectName } from "@/lib/utils";

interface ClassDetailsProps {
  session: ClassSession | null;
}

export function ClassDetails({ session }: ClassDetailsProps) {
  if (!session) {
    return (
      <div className="h-full min-h-[400px] flex items-center justify-center cuims-card p-8">
        <p className="text-secondary text-xl font-medium">Select a class to view details</p>
      </div>
    );
  }

  return (
    <div className="sticky top-8 h-fit cuims-card p-8 sm:p-12 shadow-sm flex flex-col justify-center animate-in fade-in zoom-in duration-300">
      <div className="inline-flex items-center self-start text-accent font-bold bg-accent/10 px-4 py-2 rounded-full mb-8 text-lg">
        <Clock className="w-5 h-5 mr-2" />
        {session.startTime} - {session.endTime}
      </div>

      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-widest font-semibold text-secondary mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Subject
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-foreground">
            {getSubjectName(session.subject)}
          </h2>
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest font-semibold text-secondary mb-2 flex items-center gap-2">
            <User className="w-4 h-4" /> Faculty
          </p>
          <p className="text-2xl sm:text-3xl font-semibold text-foreground">
            {session.faculty}
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest font-semibold text-secondary mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Classroom
          </p>
          <div className="inline-block bg-background px-6 py-4 rounded-2xl border border-card-border">
            <p className="text-3xl sm:text-4xl font-bold text-accent">
              {session.room}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
