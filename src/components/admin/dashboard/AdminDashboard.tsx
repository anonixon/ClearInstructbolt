import React, { useState, useEffect } from 'react';
import { useOptimizedSubscription, supabase } from '../../../lib/supabase';
import { Database } from '../../../lib/database.types';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/shared/ui/card';
import { Progress } from '../../../components/shared/ui/progress';
import { Badge } from '../../../components/shared/ui/badge';
import { Alert, AlertDescription } from '../../../components/shared/ui/alert';
import { Button } from '../../../components/shared/ui/button';
import { Table } from '../../../components/shared/ui/table';
import { Bell, Users, BookOpen, GraduationCap, TrendingUp } from 'lucide-react';

type Student = Database['public']['Tables']['students']['Row'];
type Teacher = Database['public']['Tables']['teachers']['Row'];
type Assignment = Database['public']['Tables']['assignments']['Row'];
type Message = Database['public']['Tables']['messages']['Row'];

interface AdminDashboardProps {
  adminId: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ adminId }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    message: string;
    timestamp: string;
  }>>([]);
  const [sortKey, setSortKey] = useState<keyof Student>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Subscribe to student updates
  useOptimizedSubscription({
    table: 'students',
    event: '*',
    callback: (payload) => {
      if (payload.eventType === 'INSERT') {
        setStudents(prev => [...prev, payload.new as Student]);
      } else if (payload.eventType === 'UPDATE') {
        setStudents(prev => 
          prev.map(student => 
            student.id === payload.new.id ? payload.new as Student : student
          )
        );
      } else if (payload.eventType === 'DELETE') {
        setStudents(prev => 
          prev.filter(student => student.id !== payload.old.id)
        );
      }
    },
    debounceMs: 200,
    batchSize: 5
  });

  // Subscribe to teacher updates
  useOptimizedSubscription({
    table: 'teachers',
    event: '*',
    callback: (payload) => {
      if (payload.eventType === 'INSERT') {
        setTeachers(prev => [...prev, payload.new as Teacher]);
      } else if (payload.eventType === 'UPDATE') {
        setTeachers(prev => 
          prev.map(teacher => 
            teacher.id === payload.new.id ? payload.new as Teacher : teacher
          )
        );
      } else if (payload.eventType === 'DELETE') {
        setTeachers(prev => 
          prev.filter(teacher => teacher.id !== payload.old.id)
        );
      }
    },
    debounceMs: 200,
    batchSize: 5
  });

  // Subscribe to assignment updates
  useOptimizedSubscription({
    table: 'assignments',
    event: '*',
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
    filter: `recipient_id=eq.${adminId}`,
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
        
        // Fetch students
        const { data: studentsData, error: studentsError } = await supabase
          .from('students')
          .select('*')
          .order('name');

        if (studentsError) throw studentsError;
        setStudents(studentsData || []);

        // Fetch teachers
        const { data: teachersData, error: teachersError } = await supabase
          .from('teachers')
          .select('*')
          .order('name');

        if (teachersError) throw teachersError;
        setTeachers(teachersData || []);

        // Fetch assignments
        const { data: assignmentsData, error: assignmentsError } = await supabase
          .from('assignments')
          .select('*')
          .order('created_at', { ascending: false });

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
  }, [adminId]);

  const handleSort = (key: keyof Student, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const studentColumns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'grade', header: 'Grade', sortable: true },
    { key: 'attendance', header: 'Attendance', sortable: true },
    {
      key: 'status',
      header: 'Status',
      render: (student: Student) => (
        <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
          {student.status}
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
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Teachers</p>
                <p className="text-2xl font-bold">{teachers.length}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Assignments</p>
                <p className="text-2xl font-bold">{assignments.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Attendance</p>
                <p className="text-2xl font-bold">95%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
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

      {/* Students Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Students</CardTitle>
          <Button size="sm">
            Add Student
          </Button>
        </CardHeader>
        <CardContent>
          <Table
            data={students}
            columns={studentColumns}
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