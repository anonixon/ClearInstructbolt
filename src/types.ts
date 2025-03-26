// Existing types...

export interface Student {
  id: string;
  name: string;
  grade: string;
  yearGroup: string;
  attendance: number;
  performance: number;
  behaviorScore: number;
  wellbeingStatus: string;
}

export interface BehaviorRecord {
  id: string;
  studentId: string;
  date: Date;
  type: 'positive' | 'negative';
  category: string;
  severity: 'Low' | 'Medium' | 'High';
  points: number;
  description: string;
  location: string;
  createdBy: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface BehaviorIntervention {
  id: string;
  studentId: string;
  type: string;
  status: 'In Progress' | 'Completed' | 'Planned';
  startDate: Date;
  description: string;
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: Date;
  status: 'present' | 'absent' | 'late' | 'authorized';
  modifiedBy: string;
  modifiedAt: Date;
}

export interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  authorized: number;
  total: number;
  percentage: number;
}

export interface BehaviorStats {
  positive: number;
  negative: number;
  total: number;
  pointsBalance: number;
  recentTrend: 'improving' | 'declining' | 'stable';
  interventionsActive: number;
}

export interface Parent {
  id: string;
  name: string;
  children: Student[];
  selectedChildId: string;
}

export interface BehaviorMetrics {
  totalIncidents: number;
  positiveRecognitions: number;
  fixedTermExclusions: number;
  rewardPoints: number;
}

export interface LocationMetrics {
  name: string;
  incidents: number;
}

export interface IncidentTypeData {
  name: string;
  value: number;
  color: string;
}

export interface YearGroupData {
  year: string;
  incidents: number;
  rewards: number;
}