import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../store/useStore';
import { Bell, BookOpen, Calendar, TrendingUp, Target, AlertCircle, CheckCircle2, Clock, Award, FileText, Users, CheckCircle } from 'lucide-react';
import { Student, StudentMetrics } from '../types';

interface StudentDashboardProps {
  student?: Student;
}

const StudentDashboard = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<StudentMetrics>({
    overall_grade: 0,
    attendance_rate: 0,
    pending_assignments: 0,
    average_score: 0,
  });

  useEffect(() => {
    // Fetch student data and metrics
    const fetchData = async () => {
      try {
        // TODO: Implement API call to fetch student data
        const newData = {
          overall_grade: 85,
          attendance_rate: 95,
          pending_assignments: 3,
          average_score: 88,
        };
        setMetrics(newData);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.first_name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overall Grade</p>
              <h3 className="text-2xl font-bold">{metrics.overall_grade}%</h3>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Attendance Rate</p>
              <h3 className="text-2xl font-bold">{metrics.attendance_rate}%</h3>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Assignments</p>
              <h3 className="text-2xl font-bold">{metrics.pending_assignments}</h3>
            </div>
            <FileText className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <h3 className="text-2xl font-bold">{metrics.average_score}%</h3>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Assignments</h2>
          {/* Add upcoming assignments content */}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          {/* Add recent activity content */}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 