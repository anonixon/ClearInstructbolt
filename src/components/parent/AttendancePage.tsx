import React, { useState } from 'react';
import { Calendar, Download, Clock, AlertCircle, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import AttendanceCalendar from './attendance/AttendanceCalendar';
import AttendanceRecords from './attendance/AttendanceRecords';
import DailyRecord from './attendance/DailyRecord';
import AbsenceRequest from './attendance/AbsenceRequest';

const AttendancePage = () => {
  const [activeTab, setActiveTab] = useState('calendar-view');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const stats = {
    overall: 96.5,
    present: 58,
    authorizedAbsence: 1,
    unauthorizedAbsence: 1,
    lateArrivals: 3
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Attendance Monitoring</h1>
          <p className="text-gray-400">
            Track attendance records, absences, and punctuality
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select className="bg-gray-800/50 text-white px-4 py-2 rounded-lg">
            <option>Current Month</option>
            <option>Previous Month</option>
            <option>Full Year</option>
          </select>
          <button className="p-2 text-gray-400 hover:text-white bg-gray-800/50 rounded-lg">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Attendance Overview</h2>
        <p className="text-gray-400 mb-6">Summary of attendance records for the current academic year</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 rounded-lg p-6">
            <div className="relative w-48 h-48 mx-auto">
              <svg className="transform -rotate-90 w-full h-full">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="12"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="12"
                  strokeDasharray={`${stats.overall * 5.52} 552`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-white">{stats.overall}%</div>
                <div className="text-sm text-gray-400">Overall Attendance</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4 text-emerald-500">
              <Check className="w-5 h-5" />
              <span>Excellent attendance</span>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Attendance Breakdown</h3>
            <div className="space-y-4">
              <StatBar label="Present" value={stats.present} total={60} color="emerald" />
              <StatBar label="Authorized Absence" value={stats.authorizedAbsence} total={60} color="amber" />
              <StatBar label="Unauthorized Absence" value={stats.unauthorizedAbsence} total={60} color="red" />
              <StatBar label="Late Arrivals" value={stats.lateArrivals} total={60} color="blue" />
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Monthly Trend</h3>
            <div className="h-48 flex items-center justify-center">
              <span className="text-gray-400">Attendance trend chart</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gray-800">
        <TabButton
          label="Calendar View"
          active={activeTab === 'calendar-view'}
          onClick={() => setActiveTab('calendar-view')}
        />
        <TabButton
          label="Attendance Records"
          active={activeTab === 'attendance-records'}
          onClick={() => setActiveTab('attendance-records')}
        />
        <TabButton
          label="Daily Record"
          active={activeTab === 'daily-record'}
          onClick={() => setActiveTab('daily-record')}
        />
        <TabButton
          label="Absence Request"
          active={activeTab === 'absence-request'}
          onClick={() => setActiveTab('absence-request')}
        />
      </div>

      {activeTab === 'calendar-view' && <AttendanceCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />}
      {activeTab === 'attendance-records' && <AttendanceRecords />}
      {activeTab === 'daily-record' && <DailyRecord selectedDate={selectedDate} />}
      {activeTab === 'absence-request' && <AbsenceRequest />}
    </div>
  );
};

const TabButton = ({ 
  label, 
  active, 
  onClick 
}: { 
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
      active 
        ? 'text-white border-blue-500' 
        : 'text-gray-400 border-transparent hover:text-white hover:border-gray-700'
    }`}
  >
    {label}
  </button>
);

const StatBar = ({
  label,
  value,
  total,
  color
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value} days</span>
    </div>
    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
      <div 
        className={`h-full bg-${color}-500 rounded-full`}
        style={{ width: `${(value / total) * 100}%` }}
      />
    </div>
  </div>
);

export default AttendancePage;