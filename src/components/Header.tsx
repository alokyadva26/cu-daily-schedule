import { format } from "date-fns";
import { Calendar } from "lucide-react";

export function Header() {
  const today = new Date();
  const dayName = format(today, "EEEE");
  const dateFormatted = format(today, "MMMM d, yyyy");

  return (
    <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between border-b border-card-border pb-4 pt-4 px-6 bg-white shadow-sm rounded-xl">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
          <Calendar className="w-8 h-8 text-accent" />
          <span>
            <span className="text-accent">CU Daily</span> <span className="text-black">Schedule</span>
          </span>
        </h1>
        <p className="text-foreground/70 mt-1">Manage your daily classes effortlessly</p>
      </div>
      <div className="mt-4 sm:mt-0 text-left sm:text-right">
        <p className="text-2xl font-bold">{dayName}</p>
        <p className="text-foreground/60">{dateFormatted}</p>
      </div>
    </header>
  );
}
