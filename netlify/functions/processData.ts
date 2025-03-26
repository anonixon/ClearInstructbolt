import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface ProcessDataEvent {
  type: 'process_student_data' | 'generate_report' | 'sync_attendance';
  data: any;
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { type, data } = JSON.parse(event.body!) as ProcessDataEvent;

    switch (type) {
      case 'process_student_data':
        return await processStudentData(data);
      case 'generate_report':
        return await generateReport(data);
      case 'sync_attendance':
        return await syncAttendance(data);
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid process type' })
        };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

async function processStudentData(data: any) {
  const { studentId, startDate, endDate } = data;

  // Fetch student data
  const { data: studentData, error: studentError } = await supabase
    .from('students')
    .select('*')
    .eq('id', studentId)
    .single();

  if (studentError) throw studentError;

  // Fetch attendance data
  const { data: attendanceData, error: attendanceError } = await supabase
    .from('attendance')
    .select('*')
    .eq('student_id', studentId)
    .gte('date', startDate)
    .lte('date', endDate);

  if (attendanceError) throw attendanceError;

  // Process and aggregate data
  const processedData = {
    student: studentData,
    attendance: attendanceData,
    statistics: {
      totalDays: attendanceData.length,
      presentDays: attendanceData.filter(a => a.status === 'present').length,
      absentDays: attendanceData.filter(a => a.status === 'absent').length,
      lateDays: attendanceData.filter(a => a.status === 'late').length
    }
  };

  // Store processed data
  const { error: insertError } = await supabase
    .from('student_analytics')
    .insert({
      student_id: studentId,
      data: processedData,
      processed_at: new Date().toISOString()
    });

  if (insertError) throw insertError;

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, data: processedData })
  };
}

async function generateReport(data: any) {
  const { reportType, filters } = data;

  // Fetch relevant data based on report type
  let query = supabase.from('students').select('*');

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
  }

  const { data: reportData, error } = await query;
  if (error) throw error;

  // Generate report
  const report = {
    type: reportType,
    generated_at: new Date().toISOString(),
    data: reportData,
    summary: {
      totalStudents: reportData.length,
      // Add more summary statistics as needed
    }
  };

  // Store report
  const { error: insertError } = await supabase
    .from('reports')
    .insert(report);

  if (insertError) throw insertError;

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, report })
  };
}

async function syncAttendance(data: any) {
  const { date } = data;

  // Fetch all students
  const { data: students, error: studentsError } = await supabase
    .from('students')
    .select('*');

  if (studentsError) throw studentsError;

  // Process attendance for each student
  const attendanceRecords = students.map(student => ({
    student_id: student.id,
    date,
    status: 'absent', // Default status
    synced_at: new Date().toISOString()
  }));

  // Batch insert attendance records
  const { error: insertError } = await supabase
    .from('attendance')
    .insert(attendanceRecords);

  if (insertError) throw insertError;

  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: `Synced attendance for ${students.length} students`
    })
  };
}

export { handler }; 