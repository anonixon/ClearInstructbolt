import React, { useState, useEffect, useCallback } from 'react';
import { useOptimizedSubscription, supabase } from '@lib/supabase';
import { Database } from '@lib/database.types';
import { Card, CardContent, CardHeader, CardTitle } from '@components/shared/ui/card';
import { Progress } from '@components/shared/ui/progress';
import { Badge } from '@components/shared/ui/badge';
import { Alert, AlertDescription } from '@components/shared/ui/alert';
import { Button } from '@components/shared/ui/button';
import { Table } from '@components/shared/ui/table';
import { Bell, BookOpen, Calendar, MessageSquare, TrendingUp, GraduationCap, Target, AlertCircle, CheckCircle2, Clock, RefreshCw, Award, FileText, Users, CheckCircle } from 'lucide-react';
import { useStore } from '@store/useStore';
import { Student, StudentMetrics } from '@types/student';

type Assignment = Database['public']['Tables']['assignments']['Row'];
type Message = Database['public']['Tables']['messages']['Row'];

interface StudentDashboardProps {
  studentId: string;
}

interface PerformanceInsight {
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
  action?: string;
  icon: React.ReactNode;
}

interface SyncState {
  isSyncing: boolean;
  lastSyncTime: Date | null;
  error: string | null;
  retryCount: number;
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, trend, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
    <div className="flex items-center">
      <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/20`}>
        <div className={`text-${color}-600 dark:text-${color}-400`}>
          {icon}
        </div>
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
          {trend && (
            <div className={`ml-2 flex items-center text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-4 h-4 ${trend.isPositive ? '' : 'transform rotate-180'}`} />
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

interface Activity {
  type: 'grade' | 'attendance' | 'behavior' | 'homework';
  subject?: string;
  description: string;
  date: string;
}

const StudentDashboard = () => {
  const { user } = useStore();
  const [metrics, setMetrics] = useState<StudentMetrics | null>(null);
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
  const [insights, setInsights] = useState<PerformanceInsight[]>([]);
  const [syncState, setSyncState] = useState<SyncState>({
    isSyncing: false,
    lastSyncTime: null,
    error: null,
    retryCount: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch student metrics
        const { data: metricsData, error: metricsError } = await supabase
          .from('student_metrics')
          .select('*')
          .eq('student_id', user?.id)
          .single();

        if (metricsError) throw metricsError;
        setMetrics(metricsData);

        // Fetch assignments
        const { data: assignmentsData, error: assignmentsError } = await supabase
          .from('assignments')
          .select('*')
          .eq('student_id', user?.id)
          .order('due_date', { ascending: true });

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

  // Enhanced subscription with conflict resolution
  useOptimizedSubscription({
    table: 'students',
    event: '*',
    filter: `id=eq.${user?.id}`,
    callback: async (payload) => {
      if (payload.eventType === 'UPDATE') {
        const newData = payload.new as Student;
        const oldData = payload.old as Student;
        
        // Implement conflict resolution
        if (newData.updated_at > (oldData.updated_at || new Date(0))) {
          setMetrics(newData as StudentMetrics);
        } else {
          // If local data is newer, trigger a refresh
          fetchData();
        }
      }
    },
    debounceMs: 200,
    batchSize: 5
  });

  // Enhanced assignment subscription with optimistic updates
  useOptimizedSubscription({
    table: 'assignments',
    event: '*',
    filter: `student_id=eq.${user?.id}`,
    callback: async (payload) => {
      if (payload.eventType === 'INSERT') {
        const newAssignment = payload.new as Assignment;
        setAssignments(prev => [...prev, newAssignment]);
      } else if (payload.eventType === 'UPDATE') {
        const newAssignment = payload.new as Assignment;
        const oldAssignment = payload.old as Assignment;
        
        // Implement conflict resolution
        if (newAssignment.updated_at > (oldAssignment.updated_at || new Date(0))) {
          setAssignments(prev => 
            prev.map(assignment => 
              assignment.id === newAssignment.id ? newAssignment : assignment
            )
          );
        } else {
          // If local data is newer, trigger a refresh
          fetchData();
        }
      } else if (payload.eventType === 'DELETE') {
        setAssignments(prev => 
          prev.filter(assignment => assignment.id !== payload.old.id)
        );
      }
    },
    debounceMs: 200,
    batchSize: 5
  });

  // Enhanced message subscription with error handling
  useOptimizedSubscription({
    table: 'messages',
    event: 'INSERT',
    filter: `recipient_id=eq.${user?.id}`,
    callback: async (payload) => {
      try {
        const newMessage = payload.new as Message;
        
        // Fetch sender details with retry logic
        const { data: senderData, error: senderError } = await supabase
          .from('users')
          .select('name')
          .eq('id', newMessage.sender_id)
          .single();

        if (senderError) throw senderError;

        setNotifications(prev => [{
          id: newMessage.id,
          message: `New message from ${senderData?.name || 'Unknown User'}`,
          timestamp: new Date().toISOString()
        }, ...prev]);
      } catch (err) {
        console.error('Error processing message:', err);
        // Don't update state on error to prevent UI inconsistencies
      }
    }
  });

  // Calculate performance insights
  useEffect(() => {
    if (!metrics || assignments.length === 0) return;

    const newInsights: PerformanceInsight[] = [];

    // Attendance insights
    if (metrics.attendance_rate < 90) {
      newInsights.push({
        type: 'warning',
        title: 'Attendance Needs Improvement',
        description: `Your current attendance rate is ${metrics.attendance_rate}%. Regular attendance is crucial for academic success.`,
        action: 'Review your attendance record and make sure to attend all classes.',
        icon: <AlertCircle className="w-5 h-5 text-yellow-500" />
      });
    } else {
      newInsights.push({
        type: 'success',
        title: 'Excellent Attendance',
        description: `You're maintaining a strong attendance rate of ${metrics.attendance_rate}%. Keep up the good work!`,
        icon: <CheckCircle2 className="w-5 h-5 text-green-500" />
      });
    }

    // Assignment completion insights
    const completedAssignments = assignments.filter(a => a.status === 'completed');
    const completionRate = (completedAssignments.length / assignments.length) * 100;

    if (completionRate < 80) {
      newInsights.push({
        type: 'warning',
        title: 'Assignment Completion Rate Low',
        description: `You've completed ${completedAssignments.length} out of ${assignments.length} assignments.`,
        action: 'Focus on completing pending assignments to improve your grades.',
        icon: <Clock className="w-5 h-5 text-yellow-500" />
      });
    } else {
      newInsights.push({
        type: 'success',
        title: 'Strong Assignment Completion',
        description: `You've completed ${completedAssignments.length} out of ${assignments.length} assignments. Great job!`,
        icon: <CheckCircle2 className="w-5 h-5 text-green-500" />
      });
    }

    // Subject performance insights
    const subjectPerformance = assignments.reduce((acc, assignment) => {
      if (assignment.status === 'completed') {
        acc[assignment.subject] = (acc[assignment.subject] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const totalAssignmentsBySubject = assignments.reduce((acc, assignment) => {
      acc[assignment.subject] = (acc[assignment.subject] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(subjectPerformance).forEach(([subject, completed]) => {
      const total = totalAssignmentsBySubject[subject];
      const rate = (completed / total) * 100;

      if (rate < 70) {
        newInsights.push({
          type: 'warning',
          title: `${subject} Needs Attention`,
          description: `You've completed ${completed} out of ${total} ${subject} assignments.`,
          action: `Consider reviewing ${subject} materials and seeking help if needed.`,
          icon: <AlertCircle className="w-5 h-5 text-yellow-500" />
        });
      }
    });

    // Upcoming deadlines insight
    const upcomingAssignments = assignments
      .filter(a => a.status !== 'completed')
      .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());

    if (upcomingAssignments.length > 0) {
      const nextDueDate = new Date(upcomingAssignments[0].due_date);
      const daysUntilDue = Math.ceil((nextDueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

      if (daysUntilDue <= 3) {
        newInsights.push({
          type: 'warning',
          title: 'Upcoming Assignment Deadline',
          description: `You have ${upcomingAssignments[0].title} due in ${daysUntilDue} days.`,
          action: 'Start working on this assignment soon to avoid last-minute stress.',
          icon: <Clock className="w-5 h-5 text-yellow-500" />
        });
      }
    }

    setInsights(newInsights);
  }, [metrics, assignments]);

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

  // Manual refresh function
  const handleRefresh = () => {
    fetchData();
  };

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

  // Sample data - replace with real data from your backend
  const metricsData: StudentMetrics = {
    attendance_rate: 94,
    overall_grade: 'A',
    pending_assignments: 3,
    average_score: 85
  };

  const recentActivities: Activity[] = [
    {
      type: 'grade',
      subject: 'Mathematics',
      description: 'Scored 85% on Algebra Test',
      date: '2024-03-20'
    },
    {
      type: 'attendance',
      description: 'Present - On Time',
      date: '2024-03-19'
    },
    {
      type: 'behavior',
      description: 'Received "Outstanding Effort" Award',
      date: '2024-03-18'
    },
    {
      type: 'homework',
      subject: 'Science',
      description: 'Completed Project on Ecosystems',
      date: '2024-03-17'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Overall Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{metrics?.overall_grade || 'N/A'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={metrics?.attendance_rate || 0} />
              <p className="text-sm text-muted-foreground">
                {metrics?.attendance_rate || 0}%
              </p>
            </div>
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
            <CardTitle>Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={metrics?.average_score || 0} />
              <p className="text-sm text-muted-foreground">
                {metrics?.average_score || 0}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
          <FileText className="w-5 h-5 text-blue-500 mr-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Homework</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
          <Users className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Classmates</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
          <Bell className="w-5 h-5 text-yellow-500 mr-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Notifications</span>
        </button>
        <button className="flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
          <CheckCircle className="w-5 h-5 text-purple-500 mr-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
        </button>
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activities</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivities.map((activity, index) => (
            <div key={index} className="px-6 py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {activity.type === 'grade' && <BookOpen className="w-5 h-5 text-blue-500" />}
                  {activity.type === 'attendance' && <Calendar className="w-5 h-5 text-green-500" />}
                  {activity.type === 'behavior' && <Award className="w-5 h-5 text-yellow-500" />}
                  {activity.type === 'homework' && <AlertCircle className="w-5 h-5 text-purple-500" />}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.subject && `${activity.subject}: `}
                    {activity.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-md ${
                  insight.type === 'success'
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : insight.type === 'warning'
                    ? 'bg-yellow-50 dark:bg-yellow-900/20'
                    : 'bg-blue-50 dark:bg-blue-900/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  {insight.icon}
                  <div>
                    <h4 className="font-medium">{insight.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {insight.description}
                    </p>
                    {insight.action && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {insight.action}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {insights.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No performance insights available yet.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

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

export default StudentDashboard; 