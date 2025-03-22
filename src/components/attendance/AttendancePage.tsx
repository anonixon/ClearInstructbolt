import React, { useState } from 'react';
import { Calendar as CalendarIcon, Search, Check, Clock, X, AlertCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import AttendanceGrid from './AttendanceGrid';
import AttendanceStats from './AttendanceStats';
import AttendanceCalendar from './AttendanceCalendar';

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormGroup, setSelectedFormGroup] = useState<string>('all');
  const [view, setView] = useState<'daily' | 'calendar'>('daily');
  
  const students = useStore((state) => state.students);
  const stats = useStore((state) => state.getAttendanceStats(selectedDate));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Attendance</h1>
        <p className="text-gray-400">
          Take attendance and monitor student presence across your form groups
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg">
            <CalendarIcon className="w-5 h-5 text-gray-400" />
            <span className="text-white">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setView('daily')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'daily'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Daily View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'calendar'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-gray-800/50 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedFormGroup}
            onChange={(e) => setSelectedFormGroup(e.target.value)}
            className="bg-gray-800/50 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Form Groups</option>
            {Array.from(new Set(students.map(s => s.grade))).map(grade => (
              <option key={grade} value={grade}>Form {grade}</option>
            ))}
          </select>
        </div>
      </div>

      <AttendanceStats stats={stats} />

      {view === 'daily' ? (
        <AttendanceGrid
          date={selectedDate}
          searchQuery={searchQuery}
          formGroup={selectedFormGroup}
        />
      ) : (
        <AttendanceCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      )}
    </div>
  );
};

export default AttendancePage;