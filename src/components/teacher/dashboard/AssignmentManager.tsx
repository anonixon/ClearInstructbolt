import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { Plus, FileText, Calendar, Users, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  students: number;
}

interface Column<T> {
  key: keyof T;
  header: string;
  render: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
}

interface SupabaseAssignment {
  id: string;
  title: string;
  subject: string;
  due_date: string;
  status: Assignment['status'];
  student_count: number;
}

interface AssignmentTableProps extends Omit<TableProps<Assignment>, 'columns'> {
  columns: Column<Assignment>[];
}

type SupabaseResponse = {
  data: SupabaseAssignment[] | null;
  error: Error | null;
}

export const AssignmentManager: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('assignments')
          .select('*') as SupabaseResponse;

        if (error) throw error;

        const formattedAssignments = data?.map((item): Assignment => ({
          id: item.id,
          title: item.title,
          subject: item.subject,
          dueDate: item.due_date,
          status: item.status,
          students: item.student_count || 0
        })) || [];

        setAssignments(formattedAssignments);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch assignments');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const columns: Column<Assignment>[] = [
    {
      key: 'title',
      header: 'Title',
      render: (assignment) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-500" aria-hidden="true" />
          <span>{assignment.title}</span>
        </div>
      )
    },
    {
      key: 'subject',
      header: 'Subject',
      render: (assignment) => (
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-green-500" aria-hidden="true" />
          <span>{assignment.subject}</span>
        </div>
      )
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      render: (assignment) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-yellow-500" aria-hidden="true" />
          <span>{new Date(assignment.dueDate).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      key: 'students',
      header: 'Students',
      render: (assignment) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-purple-500" aria-hidden="true" />
          <span>{assignment.students}</span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (assignment) => (
        <div className="flex items-center gap-2">
          {assignment.status === 'pending' && (
            <Clock className="w-4 h-4 text-yellow-500" aria-hidden="true" />
          )}
          {assignment.status === 'submitted' && (
            <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
          )}
          {assignment.status === 'graded' && (
            <CheckCircle className="w-4 h-4 text-blue-500" aria-hidden="true" />
          )}
          <span className="capitalize">{assignment.status}</span>
        </div>
      )
    }
  ];

  const handleCreateAssignment = () => {
    // TODO: Implement assignment creation
    console.log('Create assignment clicked');
  };

  if (error) {
    return (
      <Card>
        <CardContent>
          <p className="text-red-500" role="alert">
            {error}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Assignment Manager</CardTitle>
        <Button onClick={handleCreateAssignment}>
          <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
          <span>New Assignment</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table<Assignment>
          data={assignments}
          columns={columns}
          isLoading={loading}
        />
      </CardContent>
    </Card>
  );
};

export default AssignmentManager; 