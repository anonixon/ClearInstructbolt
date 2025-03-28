export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  attendance: number;
  academic_progress: number;
  behavior_score: number;
  created_at: string;
  updated_at: string;
}

export interface StudentMetrics {
  overall_grade: string;
  attendance_rate: number;
  pending_assignments: number;
  average_score: number;
}

export interface StudentDashboardProps {
  studentId: string;
}

export interface PerformanceInsight {
  type: 'success' | 'warning' | 'error';
  title: string;
  description: string;
  action?: string;
  icon?: React.ReactNode;
} 