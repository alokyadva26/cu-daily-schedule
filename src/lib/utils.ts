import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { parse, differenceInMinutes, differenceInHours } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseTime(timeStr: string, referenceDate: Date = new Date()): Date {
  // timetable format: "09:30 AM"
  return parse(timeStr, "hh:mm a", referenceDate);
}

export function getCountdownString(targetDate: Date, fromDate: Date = new Date()): string {
  const diffMins = differenceInMinutes(targetDate, fromDate);
  if (diffMins < 0) return "";
  
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

const subjectMap: Record<string, string> = {
  "24CSH-318": "ServiceNow-I",
  "24CSP-304": "Full Stack Development - II",
  "24CSP-305": "Competitive Coding-II",
  "24CST-302": "Computer Networks",
  "24CSH-301": "Project Based Learning in Java",
  "24SMT-341": "Probability and Statistics",
  "24TDP-311": "Soft Skills-III",
  "24TDT-312": "Aptitude-III",
  "24CST-331": "Big Data Fundamentals (Through SWAYAM)",
  "24CSI-305": "Institute/Industrial Summer Training"
};

export function getSubjectName(subjectRaw: string): string {
  // Extract code before ".." (e.g., "24CST-302..L::GP-All" -> "24CST-302")
  const code = subjectRaw.split("..")[0];
  
  // Return the mapped name if it exists, otherwise fallback to the raw code (or just the parsed code)
  return subjectMap[code] || subjectRaw;
}

