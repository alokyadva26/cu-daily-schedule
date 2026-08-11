import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local before anything else
config({ path: resolve(process.cwd(), '.env.local') });

import { getTeacherSchedule, getTeacherByEmployeeId } from './src/lib/db';

async function verify() {
  console.log('--- Verifying E19761 (Neeraj) ---');
  const teacher1 = await getTeacherByEmployeeId('E19761');
  console.log('Teacher Record:', teacher1);
  if (teacher1) {
    const schedule1 = await getTeacherSchedule('E19761');
    console.log(`Found ${schedule1.length} schedule entries.`);
    console.log(schedule1.slice(0, 2), '... (truncated)');
  } else {
    console.log('No teacher record found!');
  }

  console.log('\n--- Verifying E16525 (Gitanjali) ---');
  const teacher2 = await getTeacherByEmployeeId('E16525');
  console.log('Teacher Record:', teacher2);
  if (teacher2) {
    const schedule2 = await getTeacherSchedule('E16525');
    console.log(`Found ${schedule2.length} schedule entries.`);
    console.log(schedule2.slice(0, 2), '... (truncated)');
  } else {
    console.log('No teacher record found!');
  }
}

verify().catch(console.error);
