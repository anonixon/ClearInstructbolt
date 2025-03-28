import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/shared/ui/card';
import { Button } from '../../../components/shared/ui/button';
import { Table } from '../../../components/shared/ui/table';
import { Plus, FileText, Calendar, Users, CheckCircle, Clock } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  students: number;
}

export const AssignmentManager: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch assignments from your backend
    const mockAssignments: Assignment[] = [
      {
        id: '1',
        title: 'Math Homework',
        subject: 'Mathematics',
        dueDate: '2024-03-25',
        status: 'pending',
        students: 25
      },
      {
        id: '2',
        title: 'Science Project',
        subject: 'Science',
        dueDate: '2024-03-28',
        status: 'submitted',
        students: 20
      }
    ];
    setAssignments(mockAssignments);
    setLoading(false);
  }, []);

  const columns = [
    {
      key: 'title',
      header: 'Title',
      render: (assignment: Assignment) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-500" />
          <span>{assignment.title}</span>
        </div>
      )
    },
    {
      key: 'subject',
      header: 'Subject',
      render: (assignment: Assignment) => (
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-green-500" />
          <span>{assignment.subject}</span>
        </div>
      )
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      render: (assignment: Assignment) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-yellow-500" />
          <span>{new Date(assignment.dueDate).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      key: 'students',
      header: 'Students',
      render: (assignment: Assignment) => (
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-purple-500" />
          <span>{assignment.students}</span>
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (assignment: Assignment) => (
        <div className="flex items-center gap-2">
          {assignment.status === 'pending' && (
            <Clock className="w-4 h-4 text-yellow-500" />
          )}
          {assignment.status === 'submitted' && (
            <CheckCircle className="w-4 h-4 text-green-500" />
          )}
          {assignment.status === 'graded' && (
            <CheckCircle className="w-4 h-4 text-blue-500" />
          )}
          <span className="capitalize">{assignment.status}</span>
        </div>
      )
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Assignment Manager</CardTitle>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Assignment
        </Button>
      </CardHeader>
      <CardContent>
        <Table
          data={assignments}
          columns={columns}
          isLoading={loading}
        />
      </CardContent>
    </Card>
  );
}; 