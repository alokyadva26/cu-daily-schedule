export interface ClassSession {
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  faculty: string;
  room: string;
}

export type Timetable = ClassSession[];
