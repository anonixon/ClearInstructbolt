import React, { useState, useEffect } from 'react';
import { useOptimizedSubscription, supabase } from '../../../lib/supabase';
import { Database } from '../../../lib/database.types';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/shared/ui/card';
import { Progress } from '../../../components/shared/ui/progress';
import { Badge } from '../../../components/shared/ui/badge';
import { Alert, AlertDescription } from '../../../components/shared/ui/alert';
import { Button } from '../../../components/shared/ui/button';
import { Table } from '../../../components/shared/ui/table';
import { Bell, BookOpen, GraduationCap, TrendingUp, MessageSquare } from 'lucide-react';

type Student = Database['public']['Tables']['students']['Row'];
type Assignment = Database['public']['Tables']['assignments']['Row'];
type Message = Database['public']['Tables']['messages']['Row'];
type ParentStudent = Database['public']['Tables']['parent_students']['Row'];

interface ParentDashboardProps {
  parentId: string;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ parentId }) => {
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

  // Subscribe to student updates for this parent
  useOptimizedSubscription({
    table: 'parent_students',
    event: '*',
    filter: `parent_id=eq.${parentId}`,
    callback: async (payload) => {
      if (payload.eventType === 'INSERT') {
        const parentStudent = payload.new as ParentStudent;
        const { data: studentData } = await supabase
          .from('students')
          .select('*')
          .eq('id', parentStudent.student_id)
          .single();
        
        if (studentData) {
          setStudents(prev => [...prev, studentData]);
        }
      } else if (payload.eventType === 'DELETE') {
        const parentStudent = payload.old as ParentStudent;
        setStudents(prev => prev.filter(student => student.id !== parentStudent.student_id));
      }
    },
    debounceMs: 200,
    batchSize: 5
  });

  // Subscribe to assignment updates for this parent's students
  useOptimizedSubscription({
    table: 'assignments',
    event: '*',
    filter: `student_id=in.(${students.map(s => s.id).join(',')})`,
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
    filter: `recipient_id=eq.${parentId}`,
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
        
        // Fetch parent's students
        const { data: parentStudentsData, error: parentStudentsError } = await supabase
          .from('parent_students')
          .select('student_id')
          .eq('parent_id', parentId);

        if (parentStudentsError) throw parentStudentsError;

        const studentIds = parentStudentsData?.map(ps => ps.student_id) || [];
        
        // Fetch students
        const { data: studentsData, error: studentsError } = await supabase
          .from('students')
          .select('*')
          .in('id', studentIds)
          .order('name');

        if (studentsError) throw studentsError;
        setStudents(studentsData || []);

        // Fetch assignments for students
        const { data: assignmentsData, error: assignmentsError } = await supabase
          .from('assignments')
          .select('*')
          .in('student_id', studentIds)
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
  }, [parentId]);

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

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Children</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Assignments</p>
                <p className="text-2xl font-bold">
                  {assignments.filter(a => a.status !== 'completed').length}
                </p>
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
          <CardTitle>Assignments</CardTitle>
          <Button size="sm">
            View All
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