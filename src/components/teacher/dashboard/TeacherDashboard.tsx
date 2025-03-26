import React, { useState, useEffect } from 'react';
import { useOptimizedSubscription, supabase } from '../../../lib/supabase';
import { Database } from '../../../lib/database.types';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/shared/ui/card';
import { Progress } from '../../../components/shared/ui/progress';
import { Badge } from '../../../components/shared/ui/badge';
import { Alert, AlertDescription } from '../../../components/shared/ui/alert';
import { Button } from '../../../components/shared/ui/button';
import { Table } from '../../../components/shared/ui/table';
import { Bell, BookOpen, Calendar, MessageSquare, TrendingUp, GraduationCap, Users } from 'lucide-react';

type Student = Database['public']['Tables']['students']['Row'];
type Assignment = Database['public']['Tables']['assignments']['Row'];
type Message = Database['public']['Tables']['messages']['Row'];
type TeacherStudent = Database['public']['Tables']['teacher_students']['Row'];

interface TeacherDashboardProps {
  teacherId: string;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ teacherId }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    message: string;
    timestamp: string;
  }>>([]);
  const [sortKey, setSortKey] = useState<keyof Assignment>('due_date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Subscribe to student updates for this teacher
  useOptimizedSubscription({
    table: 'teacher_students',
    event: '*',
    filter: `teacher_id=eq.${teacherId}`,
    callback: async (payload) => {
      if (payload.eventType === 'INSERT') {
        const teacherStudent = payload.new as TeacherStudent;
        const { data: studentData } = await supabase
          .from('students')
          .select('*')
          .eq('id', teacherStudent.student_id)
          .single();
        
        if (studentData) {
          setStudents(prev => [...prev, studentData]);
        }
      } else if (payload.eventType === 'DELETE') {
        const teacherStudent = payload.old as TeacherStudent;
        setStudents(prev => prev.filter(student => student.id !== teacherStudent.student_id));
      }
    },
    debounceMs: 200,
    batchSize: 5
  });

  // Subscribe to assignment updates for this teacher
  useOptimizedSubscription({
    table: 'assignments',
    event: '*',
    filter: `teacher=eq.${teacherId}`,
    callback: (payload) => {
      if (payload.eventType === 'INSERT') {
        setAssignments(prev => [...prev, payload.new as Assignment]);
      } else if (payload.eventType === 'UPDATE') {
        setAssignments(prev => 
          prev.map(assignment => 
            assignment.id === payload.new.id ? payload.new as Assignment : assignment
          )
        );
      } else if (payload.eventType === 'DELETE') {
        setAssignments(prev => 
          prev.filter(assignment => assignment.id !== payload.old.id)
        );
      }
    },
    debounceMs: 200,
    batchSize: 5
  });

  // Subscribe to messages
  useOptimizedSubscription({
    table: 'messages',
    event: 'INSERT',
    filter: `recipient_id=eq.${teacherId}`,
    callback: async (payload) => {
      const newMessage = payload.new as Message;
      
      // Fetch sender details
      const { data: senderData } = await supabase
        .from('users')
        .select('name')
        .eq('id', newMessage.sender_id)
        .single();

      setNotifications(prev => [{
        id: newMessage.id,
        message: `New message from ${senderData?.name || 'Unknown User'}`,
        timestamp: new Date().toISOString()
      }, ...prev]);
    }
  });

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch teacher's students
        const { data: teacherStudentsData, error: teacherStudentsError } = await supabase
          .from('teacher_students')
          .select('student_id')
          .eq('teacher_id', teacherId);

        if (teacherStudentsError) throw teacherStudentsError;

        const studentIds = teacherStudentsData?.map(ts => ts.student_id) || [];
        
        // Fetch students
        const { data: studentsData, error: studentsError } = await supabase
          .from('students')
          .select('*')
          .in('id', studentIds)
          .order('name');

        if (studentsError) throw studentsError;
        setStudents(studentsData || []);

        // Fetch assignments for this teacher
        const { data: assignmentsData, error: assignmentsError } = await supabase
          .from('assignments')
          .select('*')
          .eq('teacher', teacherId)
          .order('due_date', { ascending: true });

        if (assignmentsError) throw assignmentsError;
        setAssignments(assignmentsData || []);

        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [teacherId]);

  const handleSort = (key: keyof Assignment, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const assignmentColumns = [
    { key: 'title', header: 'Title', sortable: true },
    { key: 'subject', header: 'Subject', sortable: true },
    { key: 'due_date', header: 'Due Date', sortable: true },
    {
      key: 'status',
      header: 'Status',
      render: (assignment: Assignment) => (
        <Badge variant={assignment.status === 'completed' ? 'default' : 'secondary'}>
          {assignment.status}
        </Badge>
      )
    }
  ];

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const pendingAssignments = assignments.filter(a => a.status !== 'completed');
  const upcomingDueDates = pendingAssignments
    .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Assignments</p>
                <p className="text-2xl font-bold">{pendingAssignments.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Attendance</p>
                <p className="text-2xl font-bold">
                  {students.length > 0
                    ? `${Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)}%`
                    : '0%'}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">New Messages</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Due Dates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Due Dates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDueDates.map(assignment => (
              <div key={assignment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <div>
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{assignment.subject}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {new Date(assignment.due_date).toLocaleDateString()}
                  </p>
                  <Badge variant="secondary">
                    {new Date(assignment.due_date).toLocaleTimeString()}
                  </Badge>
                </div>
              </div>
            ))}
            {upcomingDueDates.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">No upcoming assignments</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      {notifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {notifications.map(notification => (
                <div key={notification.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <span>{notification.message}</span>
                  <Badge variant="secondary">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assignments Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Assignments</CardTitle>
          <Button size="sm">
            Create Assignment
          </Button>
        </CardHeader>
        <CardContent>
          <Table
            data={assignments}
            columns={assignmentColumns}
            onSort={handleSort}
            sortKey={sortKey}
            sortDirection={sortDirection}
            isLoading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
}; 