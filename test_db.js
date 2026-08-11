const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  console.log('Testing Neeraj (E19761)...');
  const { data: neerajData, error: neerajErr } = await supabase
    .from('teachers')
    .select('*')
    .eq('employee_id', 'E19761')
    .single();
    
  if (neerajErr) {
    console.error('Error fetching Neeraj:', neerajErr);
  } else {
    console.log('Teacher Neeraj found:', neerajData);
    const { data: neerajSchedule } = await supabase
      .from('schedule_entries')
      .select('*')
      .eq('timetable_id', neerajData.timetable_id);
    console.log(`Neeraj has ${neerajSchedule?.length || 0} schedule entries.`);
  }

  console.log('\nTesting Gitanjali (E16525)...');
  const { data: gitanjaliData, error: gitanjaliErr } = await supabase
    .from('teachers')
    .select('*')
    .eq('employee_id', 'E16525')
    .single();
    
  if (gitanjaliErr) {
    console.error('Error fetching Gitanjali:', gitanjaliErr);
  } else {
    console.log('Teacher Gitanjali found:', gitanjaliData);
    const { data: gitanjaliSchedule } = await supabase
      .from('schedule_entries')
      .select('*')
      .eq('timetable_id', gitanjaliData.timetable_id);
    console.log(`Gitanjali has ${gitanjaliSchedule?.length || 0} schedule entries.`);
  }
}

test().catch(console.error);
