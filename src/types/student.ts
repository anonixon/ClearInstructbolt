export interface Student {
  id: string;
  name: string;
  grade: string;
  status: 'active' | 'inactive';
  attendance: number;
  performance: number;
  behaviorScore: string;
  created_at: string;
  updated_at: string;
}

export interface StudentMetrics {
  attendance: {
    value: string;
    trend: {
      value: number;
      isPositive: boolean;
    };
  };
  academicProgress: {
    value: string;
    trend: {
      value: number;
      isPositive: boolean;
    };
  };
  behaviorScore: {
    value: string;
    trend: {
      value: number;
      isPositive: boolean;
    };
  };
  upcomingEvents: {
    value: string;
    trend: {
      value: number;
      isPositive: boolean;
    };
  };
} 