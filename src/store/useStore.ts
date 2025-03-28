import { create } from 'zustand';
import { Student, BehaviorRecord, AttendanceRecord, AttendanceStats, BehaviorIntervention, BehaviorStats, Parent } from '../types';
import { User } from '@supabase/supabase-js';

interface DashboardState {
  currentParent: Parent;
  students: Student[];
  behaviorRecords: BehaviorRecord[];
  behaviorInterventions: BehaviorIntervention[];
  attendanceRecords: AttendanceRecord[];
  setSelectedChild: (childId: string) => void;
  addStudent: (student: Student) => void;
  addBehaviorRecord: (record: BehaviorRecord) => void;
  updateBehaviorRecord: (id: string, record: Partial<BehaviorRecord>) => void;
  addBehaviorIntervention: (intervention: BehaviorIntervention) => void;
  updateBehaviorIntervention: (id: string, intervention: Partial<BehaviorIntervention>) => void;
  addAttendanceRecord: (record: AttendanceRecord) => void;
  updateAttendanceRecord: (id: string, record: Partial<AttendanceRecord>) => void;
  getAttendanceStats: (date: Date) => AttendanceStats;
  getBehaviorStats: (studentId: string) => BehaviorStats;
  getSelectedChild: () => Student | undefined;
  user: User | null;
  setUser: (user: User | null) => void;
}

// Sample data for demonstration
const sampleStudents: Student[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    grade: '10A',
    yearGroup: 'Year 10',
    attendance: 95,
    performance: 88,
    behaviorScore: 85,
    wellbeingStatus: 'Good'
  },
  {
    id: '2',
    name: 'James Johnson',
    grade: '8B',
    yearGroup: 'Year 8',
    attendance: 92,
    performance: 76,
    behaviorScore: 90,
    wellbeingStatus: 'Good'
  }
];

const sampleParent: Parent = {
  id: '1',
  name: 'Sarah Johnson',
  children: sampleStudents,
  selectedChildId: '1'
};

const sampleBehaviorRecords: BehaviorRecord[] = [
  {
    id: '1',
    studentId: '1',
    date: new Date(),
    type: 'positive',
    category: 'Academic Excellence',
    severity: 'Medium',
    points: 5,
    description: 'Outstanding contribution in class discussion',
    location: 'Classroom 2B',
    createdBy: 'Ms. Johnson',
    createdAt: new Date(),
    modifiedAt: new Date()
  },
  {
    id: '2',
    studentId: '2',
    date: new Date(),
    type: 'negative',
    category: 'Disruption',
    severity: 'Low',
    points: -2,
    description: 'Talking during independent work time',
    location: 'Classroom 2B',
    createdBy: 'Ms. Johnson',
    createdAt: new Date(),
    modifiedAt: new Date()
  }
];

const sampleInterventions: BehaviorIntervention[] = [
  {
    id: '1',
    studentId: '4',
    type: 'Mentoring',
    status: 'In Progress',
    startDate: new Date(),
    description: 'Weekly mentoring sessions to improve classroom behavior',
    assignedTo: 'Mr. Thompson',
    createdBy: 'Ms. Johnson',
    createdAt: new Date(),
    modifiedAt: new Date()
  }
];

const sampleAttendanceRecords: AttendanceRecord[] = sampleStudents.map(student => ({
  id: `${student.id}-${new Date().toISOString()}`,
  studentId: student.id,
  date: new Date(),
  status: Math.random() > 0.2 ? 'present' : 'absent',
  modifiedBy: 'Current Teacher',
  modifiedAt: new Date(),
}));

export const useStore = create<DashboardState>((set, get) => ({
  currentParent: sampleParent,
  students: sampleStudents,
  behaviorRecords: sampleBehaviorRecords,
  behaviorInterventions: sampleInterventions,
  attendanceRecords: sampleAttendanceRecords,
  user: null,
  
  setSelectedChild: (childId) =>
    set((state) => ({
      currentParent: {
        ...state.currentParent,
        selectedChildId: childId
      }
    })),

  getSelectedChild: () => {
    const state = get();
    return state.currentParent.children.find(
      child => child.id === state.currentParent.selectedChildId
    );
  },
  
  addStudent: (student) =>
    set((state) => ({ students: [...state.students, student] })),
  
  addBehaviorRecord: (record) =>
    set((state) => ({ behaviorRecords: [...state.behaviorRecords, record] })),
  
  updateBehaviorRecord: (id, record) =>
    set((state) => ({
      behaviorRecords: state.behaviorRecords.map(r =>
        r.id === id ? { ...r, ...record, modifiedAt: new Date() } : r
      )
    })),
  
  addBehaviorIntervention: (intervention) =>
    set((state) => ({
      behaviorInterventions: [...state.behaviorInterventions, intervention]
    })),
  
  updateBehaviorIntervention: (id, intervention) =>
    set((state) => ({
      behaviorInterventions: state.behaviorInterventions.map(i =>
        i.id === id ? { ...i, ...intervention, modifiedAt: new Date() } : i
      )
    })),
  
  addAttendanceRecord: (record) =>
    set((state) => ({ attendanceRecords: [...state.attendanceRecords, record] })),
  
  updateAttendanceRecord: (id, record) =>
    set((state) => ({
      attendanceRecords: state.attendanceRecords.map(r =>
        r.id === id ? { ...r, ...record, modifiedAt: new Date() } : r
      )
    })),
  
  getAttendanceStats: (date) => {
    const records = get().attendanceRecords.filter(r => 
      r.date.toDateString() === date.toDateString()
    );
    const total = records.length;
    const present = records.filter(r => r.status === 'present').length;
    const absent = records.filter(r => r.status === 'absent').length;
    const late = records.filter(r => r.status === 'late').length;
    const authorized = records.filter(r => r.status === 'authorized').length;
    
    return {
      present,
      absent,
      late,
      authorized,
      total,
      percentage: total ? (present / total) * 100 : 0
    };
  },
  
  getBehaviorStats: (studentId) => {
    const records = get().behaviorRecords.filter(r => r.studentId === studentId);
    const positive = records.filter(r => r.type === 'positive').length;
    const negative = records.filter(r => r.type === 'negative').length;
    const pointsBalance = records.reduce((sum, r) => sum + r.points, 0);
    const activeInterventions = get().behaviorInterventions.filter(
      i => i.studentId === studentId && i.status === 'In Progress'
    ).length;
    
    // Calculate trend based on recent records
    const recentRecords = records
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);
    const recentPoints = recentRecords.reduce((sum, r) => sum + r.points, 0);
    
    return {
      positive,
      negative,
      total: records.length,
      pointsBalance,
      recentTrend: recentPoints > 0 ? 'improving' : recentPoints < 0 ? 'declining' : 'stable',
      interventionsActive: activeInterventions
    };
  },
  
  setUser: (user) => set({ user }),
}));