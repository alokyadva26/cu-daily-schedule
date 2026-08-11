import { getSupabase } from './supabase';

export interface DatabaseScheduleEntry {
  id: string;
  timetable_id: string;
  day_of_week: string;
  course_name: string;
  course_code: string;
  start_time: string;
  end_time: string;
  section: string;
  course_type: string;
  student_group: string;
  block_no: string;
  room_no: string;
  partition: string;
}

export interface TeacherData {
  employee_id: string;
  employee_name: string;
  department: string;
  timetable_id: string;
}

export async function getTeacherByEmployeeId(employeeId: string): Promise<TeacherData | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('teachers')
    .select('*')
    .eq('employee_id', employeeId)
    .single();

  if (error || !data) {
    console.error('Error fetching teacher:', error);
    return null;
  }
  return data;
}

export async function getTimetableEntries(timetableId: string): Promise<DatabaseScheduleEntry[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('schedule_entries')
    .select('*')
    .eq('timetable_id', timetableId);

  if (error) {
    console.error('Error fetching timetable entries:', error);
    return [];
  }
  return data || [];
}

export async function getTeacherSchedule(employeeId: string): Promise<DatabaseScheduleEntry[]> {
  const teacher = await getTeacherByEmployeeId(employeeId);
  if (!teacher || !teacher.timetable_id) return [];
  
  return getTimetableEntries(teacher.timetable_id);
}
