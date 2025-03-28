import React, { useState } from 'react';
import { BarChart2, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Progress } from '../../../components/ui/progress';

interface StudentProgressProps {
  className?: string;
}

interface Student {
  id: string;
  name: string;
  grade: number;
  attendance: number;
  assignments_completed: number;
  total_assignments: number;
}

const StudentProgress: React.FC<StudentProgressProps> = ({ className }) => {
  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'John Smith',
      grade: 85,
      attendance: 95,
      assignments_completed: 18,
      total_assignments: 20,
    },
    {
      id: '2',
      name: 'Emma Johnson',
      grade: 92,
      attendance: 98,
      assignments_completed: 20,
      total_assignments: 20,
    },
    {
      id: '3',
      name: 'Michael Brown',
      grade: 78,
      attendance: 88,
      assignments_completed: 15,
      total_assignments: 20,
    },
  ]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5" />
            Student Progress
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {students.map((student) => (
            <div key={student.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-muted-foreground">Grade: {student.grade}%</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Attendance</span>
                  <span>{student.attendance}%</span>
                </div>
                <Progress value={student.attendance} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Assignments</span>
                  <span>
                    {student.assignments_completed}/{student.total_assignments}
                  </span>
                </div>
                <Progress
                  value={(student.assignments_completed / student.total_assignments) * 100}
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { StudentProgress };
export type { StudentProgressProps }; 