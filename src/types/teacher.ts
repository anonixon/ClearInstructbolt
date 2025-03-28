export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  grade_level: string;
  created_at: string;
  updated_at: string;
}

export interface TeacherMetrics {
  total_students: number;
  active_classes: number;
  pending_assignments: number;
  average_performance: number;
}

export interface TeacherDashboardProps {
  teacherId: string;
}

export interface ClassInsight {
  type: 'success' | 'warning' | 'error';
  title: string;
  description: string;
  action?: string;
  icon?: React.ReactNode;
} 