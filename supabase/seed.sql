-- Insert Timetables
INSERT INTO timetables (id, timetable_name, timetable_type) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Neeraj_Timetable', 'teacher'),
    ('00000000-0000-0000-0000-000000000002', 'Gitanjali_Timetable', 'teacher'),
    ('00000000-0000-0000-0000-000000000003', 'Jaspreet_Timetable', 'teacher')
ON CONFLICT DO NOTHING;

-- Insert Teachers
INSERT INTO teachers (employee_id, employee_name, department, timetable_id) VALUES
    ('E19761', 'Neeraj', 'CSE', '00000000-0000-0000-0000-000000000001'),
    ('E16525', 'Gitanjali', 'CSE', '00000000-0000-0000-0000-000000000002'),
    ('E10279', 'Jaspreet Singh Baith', 'CSE', '00000000-0000-0000-0000-000000000003')
ON CONFLICT (employee_id) DO UPDATE SET timetable_id = EXCLUDED.timetable_id;

-- Clear existing entries for these timetables (for safe re-running of seed)
DELETE FROM schedule_entries WHERE timetable_id IN ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003');

-- Insert Schedule Entries for Neeraj
INSERT INTO schedule_entries 
(timetable_id, day_of_week, course_name, course_code, start_time, end_time, section, course_type, student_group, block_no, room_no, partition) 
VALUES
    ('00000000-0000-0000-0000-000000000001', 'Tuesday', 'Logical Thinking and Problem Solving', '26CSH-101', '09:30 AM', '10:20 AM', '26ADS-513', 'Tutorial', 'B', 'Block-C3', '613', 'A'),
    ('00000000-0000-0000-0000-000000000001', 'Tuesday', 'Logical Thinking and Problem Solving', '26CSH-101', '01:40 PM', '02:30 PM', '26AML-505', 'Tutorial', 'B', 'Block-C3', '701', 'empty'),
    ('00000000-0000-0000-0000-000000000001', 'Wednesday', 'Logical Thinking and Problem Solving', '26CSH-101', '11:10 AM', '12:00 PM', '26ADS-513', 'Practical', 'B', 'Block-C3', '604', 'empty'),
    ('00000000-0000-0000-0000-000000000001', 'Wednesday', 'Logical Thinking and Problem Solving', '26CSH-101', '12:00 PM', '12:50 PM', '26ADS-513', 'Practical', 'B', 'Block-C3', '604', 'empty'),
    ('00000000-0000-0000-0000-000000000001', 'Wednesday', 'Logical Thinking and Problem Solving', '26CSH-101', '03:20 PM', '04:10 PM', '26ADS-515', 'Tutorial', 'B', 'Block-C3', '702', 'empty'),
    ('00000000-0000-0000-0000-000000000001', 'Thursday', 'Logical Thinking and Problem Solving', '26CSH-101', '11:10 AM', '12:00 PM', '26ADS-515', 'Tutorial', 'B', 'Block-C3', '613', 'A'),
    ('00000000-0000-0000-0000-000000000001', 'Thursday', 'Logical Thinking and Problem Solving', '26CSH-101', '01:40 PM', '02:30 PM', '26ADS-513', 'Tutorial', 'B', 'Block-C3', '709', 'empty'),
    ('00000000-0000-0000-0000-000000000001', 'Thursday', 'Logical Thinking and Problem Solving', '26CSH-101', '02:30 PM', '03:20 PM', '26AML-505', 'Tutorial', 'B', 'Block-C3', '611', 'empty'),
    ('00000000-0000-0000-0000-000000000001', 'Saturday', 'Logical Thinking and Problem Solving', '26CSH-101', '11:10 AM', '12:00 PM', '26ADS-513', 'Practical', 'B', 'Block-C3', '710', 'empty'),
    ('00000000-0000-0000-0000-000000000001', 'Saturday', 'Logical Thinking and Problem Solving', '26CSH-101', '12:00 PM', '12:50 PM', '26ADS-513', 'Practical', 'B', 'Block-C3', '710', 'empty');


-- Insert Schedule Entries for Gitanjali
INSERT INTO schedule_entries 
(timetable_id, day_of_week, course_name, course_code, start_time, end_time, section, course_type, student_group, block_no, room_no, partition) 
VALUES
    ('00000000-0000-0000-0000-000000000002', 'Monday', 'Database Management System', '25CSH-204', '10:20 AM', '11:10 AM', '25BCS-615', 'Lecture', 'All', 'Block-B1', '511', 'empty'),
    ('00000000-0000-0000-0000-000000000002', 'Monday', 'Competitive Coding-II', '24CSP-305', '11:10 AM', '12:00 PM', '24BCS_TPP-610', 'Practical', 'A', 'Block-B1', '407', 'empty'),
    ('00000000-0000-0000-0000-000000000002', 'Monday', 'Competitive Coding-II', '24CSP-305', '12:00 PM', '12:50 PM', '24BCS_TPP-610', 'Practical', 'A', 'Block-B1', '407', 'empty'),
    ('00000000-0000-0000-0000-000000000002', 'Tuesday', 'Competitive Coding-II', '24CSP-305', '09:30 AM', '10:20 AM', '24BCS_TPP-610', 'Practical', 'A', 'Block-B1', '402', 'empty'),
    ('00000000-0000-0000-0000-000000000002', 'Tuesday', 'Competitive Coding-II', '24CSP-305', '10:20 AM', '11:10 AM', '24BCS_TPP-610', 'Practical', 'A', 'Block-B1', '402', 'empty');

-- Insert Schedule Entries for Jaspreet
INSERT INTO schedule_entries 
(timetable_id, day_of_week, course_name, course_code, start_time, end_time, section, course_type, student_group, block_no, room_no, partition) 
VALUES
    ('00000000-0000-0000-0000-000000000003', 'Tuesday', 'Computer Networks', '24CST-302', '11:10 AM', '12:00 PM', '24BCS_TPP-615', 'Lecture', 'All', 'Block-B1', '501', 'empty'),
    ('00000000-0000-0000-0000-000000000003', 'Wednesday', 'Computer Networks', '24CST-302', '11:10 AM', '12:00 PM', '24BCS_TPP-615', 'Lecture', 'All', 'Block-B1', '501', 'empty'),
    ('00000000-0000-0000-0000-000000000003', 'Thursday', 'Computer Networks', '24CST-302', '11:10 AM', '12:00 PM', '24BCS_TPP-615', 'Lecture', 'All', 'Block-B1', '501', 'empty');
