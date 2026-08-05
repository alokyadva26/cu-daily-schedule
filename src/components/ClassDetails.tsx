import { ClassSession } from "@/types";
import { Clock, MapPin, User, BookOpen } from "lucide-react";
import { getSubjectName, parseTime } from "@/lib/utils";
import { useState, useEffect } from "react";

interface ClassDetailsProps {
  session: ClassSession | null;
}

export function ClassDetails({ session }: ClassDetailsProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!session) {
    return (
      <div className="h-full min-h-[400px] flex items-center justify-center cuims-card p-10">
        <p className="text-secondary text-xl font-medium">Select a class to view details</p>
      </div>
    );
  }

  const start = parseTime(session.startTime, now);
  const end = parseTime(session.endTime, now);
  
  const totalSeconds = (end.getTime() - start.getTime()) / 1000;
  const elapsedSeconds = (now.getTime() - start.getTime()) / 1000;
  
  let isCurrent = false;
  let remainingSeconds = 0;
  let progressPercentage = 0;

  if (now >= start && now <= end) {
    isCurrent = true;
    remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds);
    progressPercentage = Math.min(100, Math.max(0, (elapsedSeconds / totalSeconds) * 100));
  }

  const formatRemaining = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = Math.floor(totalSecs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const circleRadius = 40;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference - (progressPercentage / 100) * circleCircumference;

  return (
    <div className="sticky top-8 h-fit cuims-card p-8 sm:p-10 shadow-sm flex flex-col justify-center animate-in fade-in duration-300 rounded-[24px]">
      
      {/* Top Time Pill */}
      <div className="inline-flex items-center self-start text-accent font-semibold bg-[#FFF5F5] px-5 py-2.5 rounded-full mb-8 text-sm">
        <Clock className="w-4 h-4 mr-2 stroke-[2.5]" />
        {session.startTime} - {session.endTime}
      </div>

      {/* Subject */}
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest font-bold text-accent mb-2.5 flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> {isCurrent ? "CURRENT CLASS" : "CLASS"}
        </div>
        <h2 className="text-[32px] sm:text-[40px] font-extrabold leading-[1.1] text-foreground">
          {getSubjectName(session.subject)}
        </h2>
      </div>

      <div className="w-12 h-0.5 bg-card-border mb-8"></div>

      {/* Faculty */}
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest font-bold text-secondary mb-2 flex items-center gap-2">
          <User className="w-4 h-4" /> FACULTY
        </div>
        <p className="text-2xl font-bold text-foreground">
          {session.faculty}
        </p>
      </div>

      {/* Classroom */}
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest font-bold text-secondary mb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4" /> CLASSROOM
        </div>
        <div className="inline-flex bg-[#FFF5F5] px-4 py-2 rounded-[12px] border border-accent/20">
          <p className="text-xl font-bold text-accent">
            {session.room}
          </p>
        </div>
      </div>

      {/* Time Remaining */}
      {isCurrent && (
        <div className="mt-2">
          <div className="text-xs uppercase tracking-widest font-bold text-secondary mb-4">
            TIME REMAINING
          </div>
          <div className="flex items-center gap-6">
            
            {/* Circular Progress */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="transform -rotate-90 w-32 h-32" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={circleRadius}
                  stroke="#F3F4F6"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={circleRadius}
                  stroke="#E30613"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: circleCircumference,
                    strokeDashoffset: strokeDashoffset,
                    transition: "stroke-dashoffset 1s linear",
                  }}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-foreground leading-none mb-1">
                  {formatRemaining(remainingSeconds)}
                </span>
                <span className="text-[10px] uppercase font-bold text-accent tracking-wider">
                  Remaining
                </span>
              </div>
            </div>

            {/* Ends At */}
            <div className="bg-[#FFF5F5] px-5 py-4 rounded-2xl flex flex-col justify-center">
              <div className="text-[11px] font-semibold text-secondary flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-accent" /> Ends At
              </div>
              <div className="text-accent font-bold text-lg">
                {session.endTime}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
