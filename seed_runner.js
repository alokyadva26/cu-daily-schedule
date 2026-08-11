const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function seed() {
  console.log('Seeding timetables...');
  const { error: tErr } = await supabase.from('timetables').upsert([
    { id: '00000000-0000-0000-0000-000000000001', timetable_name: 'Neeraj_Timetable', timetable_type: 'teacher' },
    { id: '00000000-0000-0000-0000-000000000002', timetable_name: 'Gitanjali_Timetable', timetable_type: 'teacher' }
  ]);
  if (tErr) throw tErr;

  console.log('Seeding teachers...');
  const { error: teErr } = await supabase.from('teachers').upsert(
    [
      { employee_id: 'E19761', employee_name: 'Neeraj', department: 'CSE', timetable_id: '00000000-0000-0000-0000-000000000001' },
      { employee_id: 'E16525', employee_name: 'Gitanjali', department: 'CSE', timetable_id: '00000000-0000-0000-0000-000000000002' }
    ],
    { onConflict: 'employee_id' }
  );
  if (teErr) throw teErr;

  console.log('Clearing old schedule entries...');
  await supabase.from('schedule_entries').delete().in('timetable_id', ['00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002']);

  console.log('Seeding schedule entries for Neeraj...');
  const neerajEntries = [
    { timetable_id: '00000000-0000-0000-0000-000000000001', day_of_week: 'Tuesday', course_name: 'Logical Thinking and Problem Solving', course_code: '26CSH-101', start_time: '09:30 AM', end_time: '10:20 AM', section: '26ADS-513', course_type: 'Tutorial', student_group: 'B', block_no: 'Block-C3', room_no: '613', partition: 'A' },
    { timetable_id: '00000000-0000-0000-0000-000000000001', day_of_week: 'Tuesday', course_name: 'Logical Thinking and Problem Solving', course_code: '26CSH-101', start_time: '01:40 PM', end_time: '02:30 PM', section: '26AML-505', course_type: 'Tutorial', student_group: 'B', block_no: 'Block-C3', room_no: '701', partition: 'empty' },
    { timetable_id: '00000000-0000-0000-0000-000000000001', day_of_week: 'Wednesday', course_name: 'Logical Thinking and Problem Solving', course_code: '26CSH-101', start_time: '11:10 AM', end_time: '12:00 PM', section: '26ADS-513', course_type: 'Practical', student_group: 'B', block_no: 'Block-C3', room_no: '604', partition: 'empty' },
    { timetable_id: '00000000-0000-0000-0000-000000000001', day_of_week: 'Wednesday', course_name: 'Logical Thinking and Problem Solving', course_code: '26CSH-101', start_time: '12:00 PM', end_time: '12:50 PM', section: '26ADS-513', course_type: 'Practical', student_group: 'B', block_no: 'Block-C3', room_no: '604', partition: 'empty' },
    { timetable_id: '00000000-0000-0000-0000-000000000001', day_of_week: 'Wednesday', course_name: 'Logical Thinking and Problem Solving', course_code: '26CSH-101', start_time: '03:20 PM', end_time: '04:10 PM', section: '26ADS-515', course_type: 'Tutorial', student_group: 'B', block_no: 'Block-C3', room_no: '702', partition: 'empty' },
    { timetable_id: '00000000-0000-0000-0000-000000000001', day_of_week: 'Thursday', course_name: 'Logical Thinking and Problem Solving', course_code: '26CSH-101', start_time: '11:10 AM', end_time: '12:00 PM', section: '26ADS-515', course_type: 'Tutorial', student_group: 'B', block_no: 'Block-C3', room_no: '613', partition: 'A' },
    { timetable_id: '00000000-0000-0000-0000-000000000001', day_of_week: 'Thursday', course_name: 'Logical Thinking and Problem Solving', course_code: '26CSH-101', start_time: '01:40 PM', end_time: '02:30 PM', section: '26ADS-513', course_type: 'Tutorial', student_group: 'B', block_no: 'Block-C3', room_no: '709', partition: 'empty' },
    { timetable_id: '00000000-0000-0000-0000-000000000001', day_of_week: 'Thursday', course_name: 'Logical Thinking and Problem Solving', course_code: '26CSH-101', start_time: '02:30 PM', end_time: '03:20 PM', section: '26AML-505', course_type: 'Tutorial', student_group: 'B', block_no: 'Block-C3', room_no: '611', partition: 'empty' },
    { timetable_id: '00000000-0000-0000-0000-000000000001', day_of_week: 'Saturday', course_name: 'Logical Thinking and Problem Solving', course_code: '26CSH-101', start_time: '11:10 AM', end_time: '12:00 PM', section: '26ADS-513', course_type: 'Practical', student_group: 'B', block_no: 'Block-C3', room_no: '710', partition: 'empty' },
    { timetable_id: '00000000-0000-0000-0000-000000000001', day_of_week: 'Saturday', course_name: 'Logical Thinking and Problem Solving', course_code: '26CSH-101', start_time: '12:00 PM', end_time: '12:50 PM', section: '26ADS-513', course_type: 'Practical', student_group: 'B', block_no: 'Block-C3', room_no: '710', partition: 'empty' }
  ];
  const { error: nErr } = await supabase.from('schedule_entries').insert(neerajEntries);
  if (nErr) throw nErr;

  console.log('Seeding schedule entries for Gitanjali...');
  const gitanjaliEntries = [
    { timetable_id: '00000000-0000-0000-0000-000000000002', day_of_week: 'Monday', course_name: 'Database Management System', course_code: '25CSH-204', start_time: '10:20 AM', end_time: '11:10 AM', section: '25BCS-615', course_type: 'Lecture', student_group: 'All', block_no: 'Block-B1', room_no: '511', partition: 'empty' },
    { timetable_id: '00000000-0000-0000-0000-000000000002', day_of_week: 'Monday', course_name: 'Competitive Coding-II', course_code: '24CSP-305', start_time: '11:10 AM', end_time: '12:00 PM', section: '24BCS_TPP-610', course_type: 'Practical', student_group: 'A', block_no: 'Block-B1', room_no: '407', partition: 'empty' },
    { timetable_id: '00000000-0000-0000-0000-000000000002', day_of_week: 'Monday', course_name: 'Competitive Coding-II', course_code: '24CSP-305', start_time: '12:00 PM', end_time: '12:50 PM', section: '24BCS_TPP-610', course_type: 'Practical', student_group: 'A', block_no: 'Block-B1', room_no: '407', partition: 'empty' },
    { timetable_id: '00000000-0000-0000-0000-000000000002', day_of_week: 'Tuesday', course_name: 'Competitive Coding-II', course_code: '24CSP-305', start_time: '09:30 AM', end_time: '10:20 AM', section: '24BCS_TPP-610', course_type: 'Practical', student_group: 'A', block_no: 'Block-B1', room_no: '402', partition: 'empty' },
    { timetable_id: '00000000-0000-0000-0000-000000000002', day_of_week: 'Tuesday', course_name: 'Competitive Coding-II', course_code: '24CSP-305', start_time: '10:20 AM', end_time: '11:10 AM', section: '24BCS_TPP-610', course_type: 'Practical', student_group: 'A', block_no: 'Block-B1', room_no: '402', partition: 'empty' }
  ];
  const { error: gErr } = await supabase.from('schedule_entries').insert(gitanjaliEntries);
  if (gErr) throw gErr;

  console.log('Seeding complete.');
}

seed().catch(console.error);
