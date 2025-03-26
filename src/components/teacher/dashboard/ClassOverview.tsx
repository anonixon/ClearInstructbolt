import React from 'react';
import { Users, TrendingUp, AlertCircle, Calendar } from 'lucide-react';

interface ClassMetrics {
  totalStudents: number;
  averageProgress: number;
  attendanceRate: number;
  upcomingEvents: number;
}

interface Student {
  id: string;
  name: string;
  progress: number;
  attendance: number;
  status: 'Above Target' | 'On Target' | 'Below Target';
}

const sampleMetrics: ClassMetrics = {
  totalStudents: 28,
  averageProgress: 85,
  attendanceRate: 94,
  upcomingEvents: 3
};

const sampleStudents: Student[] = [
  {
    id: '1',
    name: 'Emma Thompson',
    progress: 92,
    attendance: 98,
    status: 'Above Target'
  },
  {
    id: '2',
    name: 'James Wilson',
    progress: 78,
    attendance: 92,
    status: 'On Target'
  },
  {
    id: '3',
    name: 'Sophia Martinez',
    progress: 65,
    attendance: 85,
    status: 'Below Target'
  }
];

const ClassOverview = () => {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          icon={<Users className="w-6 h-6" />}
          label="Total Students"
          value={sampleMetrics.totalStudents}
          color="blue"
        />
        <MetricCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Average Progress"
          value={`${sampleMetrics.averageProgress}%`}
          color="green"
        />
        <MetricCard
          icon={<AlertCircle className="w-6 h-6" />}
          label="Attendance Rate"
          value={`${sampleMetrics.attendanceRate}%`}
          color="yellow"
        />
        <MetricCard
          icon={<Calendar className="w-6 h-6" />}
          label="Upcoming Events"
          value={sampleMetrics.upcomingEvents}
          color="purple"
        />
      </div>

      {/* Student List */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Class Overview</h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Attendance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sampleStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {student.progress}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {student.attendance}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          student.status === 'Above Target'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : student.status === 'On Target'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, color }) => (
  <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/20`}>
        <div className={`text-${color}-600 dark:text-${color}-400`}>{icon}</div>
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  </div>
);

export default ClassOverview; 