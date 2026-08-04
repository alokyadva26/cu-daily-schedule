"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import timetableData from "@/data/timetable.json";
import { ClassSession, Timetable } from "@/types";
import { Header } from "@/components/Header";
import { ScheduleList } from "@/components/ScheduleList";
import { ClassDetails } from "@/components/ClassDetails";
import { EmptyState } from "@/components/EmptyState";

export default function Home() {
  const [todayClasses, setTodayClasses] = useState<ClassSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<ClassSession | null>(null);
  const [isWeekend, setIsWeekend] = useState(false);

  useEffect(() => {
    // Determine today's day string
    const today = new Date();
    const dayName = format(today, "EEEE"); // "Monday", "Tuesday", etc.
    
    if (dayName === "Saturday" || dayName === "Sunday") {
      setIsWeekend(true);
      return;
    }

    // Filter timetable for today
    const classesForToday = (timetableData as Timetable).filter(
      (session) => session.day === dayName
    );

    setTodayClasses(classesForToday);

    if (classesForToday.length > 0) {
      setSelectedSession(classesForToday[0]);
    } else {
      // If a weekday has no classes mapped
      setIsWeekend(true);
    }
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Header />
      
      {isWeekend ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
          {/* LEFT SIDE */}
          <section className="order-2 lg:order-1">
            <ScheduleList 
              sessions={todayClasses} 
              selectedSession={selectedSession} 
              onSelect={setSelectedSession} 
            />
          </section>

          {/* RIGHT SIDE */}
          <section className="order-1 lg:order-2">
            <ClassDetails session={selectedSession} />
          </section>
        </div>
      )}
    </main>
  );
}
