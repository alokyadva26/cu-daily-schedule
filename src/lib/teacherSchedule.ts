import { DatabaseScheduleEntry } from './db';

/**
 * Normalizes an employee ID from manual input or QR code.
 */
export function parseEmployeeIdFromQr(value: string): string {
  return value.trim().toUpperCase();
}

/**
 * Returns a Date object containing the current time in Chandigarh (Asia/Kolkata).
 * By parsing the Kolkata time string back into a local Date, we create a
 * predictable container where .getHours() matches Kolkata hours, ensuring
 * that all offset math works flawlessly regardless of the device's local timezone.
 */
export function getNowInKolkata(): Date {
  const now = new Date();
  const str = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  return new Date(str);
}

/**
 * Parses a time string like "09:30 AM" into a Date object for today.
 */
export function parseTime(timeStr: string, referenceDate: Date): Date {
  const [time, modifier] = timeStr.trim().split(' ');
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier.toUpperCase() === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  const date = new Date(referenceDate.getTime());
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export type ScheduleStatusState = {
  status: "before" | "ongoing" | "completed";
  currentClass: DatabaseScheduleEntry | null;
  nextClass: DatabaseScheduleEntry | null;
  remainingSeconds: number;
  isFinished: boolean;
};

/**
 * Determines the current status of the schedule based purely on the provided currentTime.
 * This guarantees the result is perfectly synced with real time and never drifts.
 */
export function getScheduleStatus(entries: DatabaseScheduleEntry[], currentTime: Date): ScheduleStatusState {
  let currentClass: DatabaseScheduleEntry | null = null;
  let nextClass: DatabaseScheduleEntry | null = null;

  const sortedEntries = [...entries].sort((a, b) => 
    parseTime(a.start_time, currentTime).getTime() - parseTime(b.start_time, currentTime).getTime()
  );

  if (sortedEntries.length === 0) {
    return { status: "completed", currentClass: null, nextClass: null, remainingSeconds: 0, isFinished: true };
  }

  for (let i = 0; i < sortedEntries.length; i++) {
    const entry = sortedEntries[i];
    const startTime = parseTime(entry.start_time, currentTime);
    const endTime = parseTime(entry.end_time, currentTime);

    if (currentTime >= startTime && currentTime < endTime) {
      currentClass = entry;
      nextClass = i + 1 < sortedEntries.length ? sortedEntries[i + 1] : null;
      break;
    } else if (currentTime < startTime) {
      nextClass = entry;
      break;
    }
  }

  if (!currentClass && !nextClass) {
    return { status: "completed", currentClass: null, nextClass: null, remainingSeconds: 0, isFinished: true };
  }

  if (currentClass) {
    const end = parseTime(currentClass.end_time, currentTime);
    const remainingMs = end.getTime() - currentTime.getTime();
    const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));
    return { status: "ongoing", currentClass, nextClass, remainingSeconds, isFinished: false };
  } else if (nextClass) {
    const start = parseTime(nextClass.start_time, currentTime);
    const remainingMs = start.getTime() - currentTime.getTime();
    const remainingSeconds = Math.max(0, Math.floor(remainingMs / 1000));
    return { status: "before", currentClass: null, nextClass, remainingSeconds, isFinished: false };
  }

  return { status: "completed", currentClass: null, nextClass: null, remainingSeconds: 0, isFinished: true };
}

export type FormattedTime = {
  unit1: number;
  label1: string;
  unit2: number;
  label2: string;
};

/**
 * Formats seconds into { unit1, label1, unit2, label2 } for custom styling
 */
export function formatRemainingTime(remainingSeconds: number): FormattedTime {
  if (remainingSeconds <= 0) return { unit1: 0, label1: 'min', unit2: 0, label2: 'sec' };
  
  if (remainingSeconds >= 3600) {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    return { unit1: hours, label1: 'hr', unit2: minutes, label2: 'min' };
  }
  
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  return { unit1: minutes, label1: 'min', unit2: seconds, label2: 'sec' };
}
