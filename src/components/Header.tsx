import { format } from "date-fns";
import { Calendar } from "lucide-react";

export function Header() {
  const today = new Date();
  const dayName = format(today, "EEEE");
  const dateFormatted = format(today, "MMMM d, yyyy");

  return (
    <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between p-8 bg-white shadow-sm rounded-3xl cuims-card">
      <div className="flex items-center gap-5">
        <div className="bg-accent text-white p-3.5 rounded-xl shadow-md">
          <Calendar className="w-8 h-8" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-accent">
            CU Daily Schedule
          </h1>
          <p className="text-secondary font-medium text-[15px] mt-0.5">Manage your daily classes effortlessly</p>
        </div>
      </div>
      
      <div className="mt-6 md:mt-0 flex items-center justify-end gap-4">
        <div className="bg-accent/10 p-3 rounded-full text-accent hidden md:block">
          <Calendar className="w-6 h-6" />
        </div>
        <div className="text-left md:text-right">
          <p className="text-xl font-bold text-foreground">{dayName}</p>
          <p className="text-accent font-semibold text-sm mt-0.5">{dateFormatted}</p>
        </div>
      </div>
    </header>
  );
}
