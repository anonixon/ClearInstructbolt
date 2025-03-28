import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { StudentProgress } from '../components/teacher/dashboard/StudentProgress';
import { AttendanceManager } from '../components/teacher/dashboard/AttendanceManager';
import { User } from '../types';

interface TeacherDashboardProps {
  currentUser: User;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ currentUser }) => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Welcome, {currentUser.first_name}!</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StudentProgress className="col-span-1" />
        <AttendanceManager className="col-span-1" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No upcoming classes scheduled.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent activity to display.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { TeacherDashboard };
export type { TeacherDashboardProps }; 