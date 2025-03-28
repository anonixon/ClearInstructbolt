export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'teacher' | 'parent' | 'student' | 'headteacher' | 'school_admin';
  created_at: string;
  updated_at: string;
  profile_image?: string;
  phone_number?: string;
  address?: string;
}

export interface Student {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  grade: string;
  class: string;
  parent_id: string;
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id: string;
  user_id: string;
  school_id: string;
  first_name: string;
  last_name: string;
  subjects: string[];
  classes: string[];
  created_at: string;
  updated_at: string;
}

export interface Parent {
  id: string;
  user_id: string;
  school_id: string;
  first_name: string;
  last_name: string;
  children: string[];
  created_at: string;
  updated_at: string;
  email?: string;
  phone_number?: string;
  address?: string;
  profile_image?: string;
}

export interface SchoolAdmin {
  id: string;
  user_id: string;
  school_id: string;
  created_at: string;
  updated_at: string;
}

export interface StudentMetrics {
  overall_grade: number;
  attendance_rate: number;
  pending_assignments: number;
  average_score: number;
  behavior_score?: number;
  participation_rate?: number;
  subjects: {
    [key: string]: {
      grade: number;
      attendance: number;
      assignments_completed: number;
      total_assignments: number;
    };
  };
}

export interface TeacherMetrics {
  total_students: number;
  average_attendance: number;
  average_grades: number;
  pending_assignments: number;
  upcoming_events: number;
  recent_submissions: number;
}

export interface WellbeingMetrics {
  id: string;
  student_id: string;
  emotional_state: number;
  stress_level: number;
  engagement: number;
  social_interaction: number;
  attendance_rate: number;
  behavior_incidents: number;
  support_accessed: boolean;
  timestamp: string;
}

export interface PastoralLog {
  id: string;
  student_id: string;
  staff_id: string;
  type: 'observation' | 'intervention' | 'meeting' | 'referral';
  description: string;
  action_taken: string;
  follow_up_required: boolean;
  follow_up_date?: string;
  status: 'open' | 'in_progress' | 'resolved' | 'monitoring';
  created_at: string;
  updated_at: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: 'draft' | 'published' | 'archived' | 'completed';
  subject: string;
  grade_level: string;
  created_by: string;
  created_at: string;
  attachments?: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  type: 'class' | 'meeting' | 'activity' | 'other';
  location?: string;
  attendees?: string[];
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  subject: string;
  content: string;
  read: boolean;
  created_at: string;
  attachments?: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'link' | 'other';
  url: string;
  created_by: string;
  created_at: string;
  subject?: string;
  grade_level?: string;
}

export interface AttendanceSummary {
  present: number;
  absent: number;
  late: number;
  excused: number;
  total: number;
}

export interface SchoolMetrics {
  total_students: number;
  total_teachers: number;
  average_attendance: number;
  average_grades: number;
  student_teacher_ratio: number;
  behavior_incidents: number;
}

export interface OfstedMetric {
  category: string;
  score: number;
  previous_score?: number;
  trend?: 'up' | 'down' | 'stable';
  last_updated: string;
}

export interface PerformanceData {
  date: string;
  value: number;
  category?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface SyncState {
  lastSync: string;
  status: 'idle' | 'syncing' | 'error';
  error?: string;
} 