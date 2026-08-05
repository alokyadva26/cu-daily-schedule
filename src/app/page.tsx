"use client";

import { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import timetableData from "@/data/timetable.json";
import { ClassSession, Timetable } from "@/types";
import { Header } from "@/components/Header";
import { ScheduleCard } from "@/components/ScheduleCard";
import { ClassDetails } from "@/components/ClassDetails";
import { EmptyState } from "@/components/EmptyState";
import { EndOfDayState } from "@/components/EndOfDayState";
import { parseTime, getCountdownString } from "@/lib/utils";

type EnrichedSession = ClassSession & {
  mode: "normal" | "active" | "next";
  countdown?: string;
  originalIndex: number;
};

export default function Home() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [todayClasses, setTodayClasses] = useState<ClassSession[]>([]);
  const [tomorrowClasses, setTomorrowClasses] = useState<ClassSession[]>([]);
  
  const [selectedSession, setSelectedSession] = useState<ClassSession | null>(null);
  
  const [viewState, setViewState] = useState<"weekend" | "active" | "next" | "end-of-day" | "tomorrow">("weekend");
  const [displaySession, setDisplaySession] = useState<EnrichedSession | null>(null);

  // Initialize clock
  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  // Main logic
  useEffect(() => {
    if (!currentTime) return;
    
    // Check if we are forcibly looking at tomorrow
    if (viewState === "tomorrow") {
      return; 
    }

    const dayName = format(currentTime, "EEEE");
    
    if (dayName === "Saturday" || dayName === "Sunday") {
      setViewState("weekend");
      return;
    }

    // Load today's classes
    const classesForToday = (timetableData as Timetable).filter(
      (session) => session.day === dayName
    );

    if (classesForToday.length === 0) {
      setViewState("weekend");
      return;
    }

    setTodayClasses(classesForToday);

    // Prepare tomorrow's classes just in case
    const tomorrowDate = addDays(currentTime, 1);
    const tomorrowName = format(tomorrowDate, "EEEE");
    const classesForTomorrow = (timetableData as Timetable).filter(
      (session) => session.day === tomorrowName
    );
    setTomorrowClasses(classesForTomorrow);

    // Determine current state
    let activeFound = false;
    let nextFound = false;
    let lastClassEnded = false;

    for (let i = 0; i < classesForToday.length; i++) {
      const session = classesForToday[i];
      const start = parseTime(session.startTime, currentTime);
      const end = parseTime(session.endTime, currentTime);

      if (currentTime >= start && currentTime <= end) {
        // Active class
        setDisplaySession({
          ...session,
          mode: "active",
          countdown: getCountdownString(end, currentTime),
          originalIndex: i
        });
        if (selectedSession?.day !== session.day || selectedSession?.startTime !== session.startTime) {
          setSelectedSession(session);
        }
        setViewState("active");
        activeFound = true;
        break;
      }
    }

    if (!activeFound) {
      // Find the NEXT class
      for (let i = 0; i < classesForToday.length; i++) {
        const session = classesForToday[i];
        const start = parseTime(session.startTime, currentTime);
        
        if (currentTime < start) {
          setDisplaySession({
            ...session,
            mode: "next",
            countdown: getCountdownString(start, currentTime),
            originalIndex: i
          });
          if (selectedSession?.day !== session.day || selectedSession?.startTime !== session.startTime) {
            setSelectedSession(session);
          }
          setViewState("next");
          nextFound = true;
          break;
        }
      }
    }

    if (!activeFound && !nextFound) {
      // All classes are in the past for today
      setViewState("end-of-day");
      // keep selectedSession as whatever it was, or null
    }

  }, [currentTime, viewState]);

  // If we don't have current time yet, don't render content to avoid hydration mismatch
  if (!currentTime) return null;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Header />
      
      {viewState === "weekend" ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
          {/* LEFT SIDE */}
          <section className="order-2 lg:order-1 flex flex-col gap-4">
            
            {viewState === "end-of-day" && (
              <EndOfDayState 
                onViewTomorrow={() => {
                  setViewState("tomorrow");
                  if (tomorrowClasses.length > 0) {
                    setSelectedSession(tomorrowClasses[0]);
                  }
                }} 
              />
            )}



            {viewState === "tomorrow" && (
              <>
                <h2 className="text-xl font-bold mb-2 px-1 text-accent flex items-center justify-between">
                  Tomorrow's Classes
                  <button 
                    onClick={() => {
                      setViewState("weekend"); // Triggers re-evaluation of current day
                      setCurrentTime(new Date()); // force re-eval
                    }}
                    className="text-sm font-medium text-foreground/60 hover:text-foreground underline decoration-dashed"
                  >
                    Back to Today
                  </button>
                </h2>
                {tomorrowClasses.length > 0 ? (
                  tomorrowClasses.map((session, idx) => (
                    <ScheduleCard
                      key={idx}
                      session={session}
                      isSelected={selectedSession === session}
                      onClick={() => setSelectedSession(session)}
                      mode="normal"
                    />
                  ))
                ) : (
                  <div className="glass rounded-2xl p-8 text-center text-foreground/60">
                    No classes scheduled for tomorrow! 🎉
                  </div>
                )}
              </>
            )}

            {viewState !== "tomorrow" && todayClasses.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold px-1 flex items-center gap-2">
                  📅 Today's Schedule
                </h2>
                <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {todayClasses.map((session, idx) => {
                    const start = parseTime(session.startTime, currentTime);
                    const end = parseTime(session.endTime, currentTime);
                    let mode: "normal" | "active" | "next" | "completed" = "normal";
                    let countdown = undefined;
                    
                    if (currentTime > end) {
                      mode = "completed";
                    } else if (currentTime >= start && currentTime <= end) {
                      mode = "active";
                      countdown = getCountdownString(end, currentTime);
                    } else if (displaySession?.originalIndex === idx && viewState === "next") {
                      mode = "next";
                      countdown = getCountdownString(start, currentTime);
                    }

                    return (
                      <ScheduleCard
                        key={idx}
                        session={session}
                        isSelected={selectedSession === session}
                        onClick={() => setSelectedSession(session)}
                        mode={mode}
                        countdown={countdown}
                      />
                    );
                  })}
                </div>
              </div>
            )}

          </section>

          {/* RIGHT SIDE */}
          <section className="order-1 lg:order-2">
            {(viewState !== "end-of-day" || selectedSession) && (
              <ClassDetails session={selectedSession} />
            )}
          </section>
        </div>
      )}
    </main>
  );
}
