-- Enable Row Level Security (just to be safe and explicit)
ALTER TABLE timetables ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_entries ENABLE ROW LEVEL SECURITY;

-- Create policies to allow ANYONE to read the data (since this is a public schedule app)
-- Note: We only allow SELECT. Insert/Update/Delete remains blocked for anon users.

CREATE POLICY "Allow public read access on timetables" 
ON timetables FOR SELECT USING (true);

CREATE POLICY "Allow public read access on teachers" 
ON teachers FOR SELECT USING (true);

CREATE POLICY "Allow public read access on students" 
ON students FOR SELECT USING (true);

CREATE POLICY "Allow public read access on schedule_entries" 
ON schedule_entries FOR SELECT USING (true);
