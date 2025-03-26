import React, { useState } from 'react';
import { Calendar, Download, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { useStore } from '../../../store/useStore';

interface AttendanceStats {
  total: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: number;
  trend: {
    value: number;
    isPositive: boolean;
  };
}

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  time?: string;
  notes?: string;
}

const Attendance = () => {
  const selectedChild = useStore((state) => state.getSelectedChild());
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [showFilters, setShowFilters] = useState(false);

  // Sample data - replace with real data from your backend
  const stats: AttendanceStats = {
    total: 180,
    present: 165,
    absent: 8,
    late: 5,
    excused: 2,
    attendanceRate: 91.7,
    trend: {
      value: 2.3,
      isPositive: true
    }
  };

  const attendanceRecords: AttendanceRecord[] = [
    {
      date: '2024-03-20',
      status: 'present',
      time: '8:30 AM',
      notes: 'On time'
    },
    {
      date: '2024-03-19',
      status: 'late',
      time: '9:15 AM',
      notes: 'Traffic delay'
    },
    {
      date: '2024-03-18',
      status: 'present',
      time: '8:25 AM',
      notes: 'On time'
    },
    {
      date: '2024-03-17',
      status: 'excused',
      notes: 'Doctor appointment'
    },
    {
      date: '2024-03-16',
      status: 'present',
      time: '8:35 AM',
      notes: 'On time'
    }
  ];

  const getStatusColor = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'absent':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'late':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'excused':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track {selectedChild?.name}'s attendance and punctuality
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowFilters(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Month Selection */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Month:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Attendance Rate</h3>
            <div className={`flex items-center ${stats.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {stats.trend.isPositive ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm font-medium">{Math.abs(stats.trend.value)}%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats.attendanceRate}%
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Present</h3>
          <div className="text-3xl font-bold text-green-600">{stats.present}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {((stats.present / stats.total) * 100).toFixed(1)}% of total days
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Absent</h3>
          <div className="text-3xl font-bold text-red-600">{stats.absent}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {((stats.absent / stats.total) * 100).toFixed(1)}% of total days
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Late</h3>
          <div className="text-3xl font-bold text-yellow-600">{stats.late}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {((stats.late / stats.total) * 100).toFixed(1)}% of total days
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Excused</h3>
          <div className="text-3xl font-bold text-purple-600">{stats.excused}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {((stats.excused / stats.total) * 100).toFixed(1)}% of total days
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Total Days</h3>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Current academic year
          </div>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Attendance</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {attendanceRecords.map((record, index) => (
            <div key={index} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(record.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h4>
                  {record.time && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Arrival time: {record.time}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </div>
              </div>
              {record.notes && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {record.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance; 