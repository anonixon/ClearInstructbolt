import React, { useState, useEffect } from 'react';
import { useOptimizedSubscription, supabase } from '@lib/supabase';
import { Database } from '@lib/database.types';
import { Card, CardContent, CardHeader, CardTitle } from '@components/shared/ui/card';
import { Progress } from '@components/shared/ui/progress';
import { Badge } from '@components/shared/ui/badge';
import { Alert, AlertDescription } from '@components/shared/ui/alert';
import { Button } from '@components/shared/ui/button';
import { Table } from '@components/shared/ui/table';
import { Bell, BookOpen, Calendar, MessageSquare, TrendingUp, GraduationCap, Users } from 'lucide-react';
import { useStore } from '@store/useStore';
import { Teacher, TeacherMetrics } from '@types/teacher';

type Student = Database['public']['Tables']['students']['Row'];
type Assignment = Database['public']['Tables']['assignments']['Row'];
type Message = Database['public']['Tables']['messages']['Row'];
type TeacherStudent = Database['public']['Tables']['teacher_students']['Row'];

interface TeacherDashboardProps {
  teacherId: string;
}

const TeacherDashboard = () => {
  const { user } = useStore();
  const [metrics, setMetrics] = useState<TeacherMetrics | null>(null);
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
    filter: `teacher_id=eq.${user?.id}`,
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
    filter: `teacher=eq.${user?.id}`,
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
    filter: `recipient_id=eq.${user?.id}`,
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
    const fetchData = async () => {
      try {
        // Fetch teacher metrics
        const { data: metricsData, error: metricsError } = await supabase
          .from('teacher_metrics')
          .select('*')
          .eq('teacher_id', user?.id)
          .single();

        if (metricsError) throw metricsError;
        setMetrics(metricsData);

        // Fetch assignments
        const { data: assignmentsData, error: assignmentsError } = await supabase
          .from('assignments')
          .select('*')
          .eq('teacher_id', user?.id)
          .order('created_at', { ascending: false });

        if (assignmentsError) throw assignmentsError;
        setAssignments(assignmentsData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Teacher Dashboard</h1>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics?.total_students || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics?.active_classes || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics?.pending_assignments || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={metrics?.average_performance || 0} />
              <p className="text-sm text-muted-foreground">
                {metrics?.average_performance || 0}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Assignments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Assignments</CardTitle>
          <Button>Create New Assignment</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.title}</td>
                  <td>{new Date(assignment.due_date).toLocaleDateString()}</td>
                  <td>
                    <Badge variant={assignment.status === 'active' ? 'default' : 'secondary'}>
                      {assignment.status}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard; 