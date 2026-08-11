import { DatabaseScheduleEntry } from './db';

/**
 * Normalizes an employee ID from manual input or QR code.
 */
export function parseEmployeeIdFromQr(value: string): string {
  return value.trim().toUpperCase();
}

/**
 * Parses a time string like "09:30 AM" into a Date object for today.
 */
export function parseTime(timeStr: string): Date {
  const [time, modifier] = timeStr.trim().split(' ');
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier.toUpperCase() === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

/**
 * Determines the current status of the schedule.
 */
export function getScheduleStatus(entries: DatabaseScheduleEntry[]) {
  const now = new Date();
  let currentClass: DatabaseScheduleEntry | null = null;
  let nextClass: DatabaseScheduleEntry | null = null;
  let isFinished = false;

  const sortedEntries = [...entries].sort((a, b) => parseTime(a.start_time).getTime() - parseTime(b.start_time).getTime());

  if (sortedEntries.length === 0) {
    return { currentClass: null, nextClass: null, isFinished: true, allFinished: true };
  }

  for (let i = 0; i < sortedEntries.length; i++) {
    const entry = sortedEntries[i];
    const startTime = parseTime(entry.start_time);
    const endTime = parseTime(entry.end_time);

    if (now >= startTime && now < endTime) {
      currentClass = entry;
      nextClass = i + 1 < sortedEntries.length ? sortedEntries[i + 1] : null;
      break;
    } else if (now < startTime) {
      nextClass = entry;
      break;
    }
  }

  if (!currentClass && !nextClass) {
    isFinished = true;
  }

  return { currentClass, nextClass, isFinished };
}

/**
 * Calculates remaining time in format "MM min SS sec"
 */
export function getTimeRemaining(targetTimeStr: string): string {
  const targetTime = parseTime(targetTimeStr);
  const now = new Date();
  const diff = targetTime.getTime() - now.getTime();

  if (diff <= 0) return '0 min 0 sec';

  const minutes = Math.floor(diff / 1000 / 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${minutes} min ${seconds} sec`;
}
