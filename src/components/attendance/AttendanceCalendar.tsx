import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface AttendanceCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  selectedDate,
  onDateSelect
}) => {
  const attendanceRecords = useStore((state) => state.attendanceRecords);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getDayAttendance = (date: Date) => {
    const records = attendanceRecords.filter(record => 
      record.date.toDateString() === date.toDateString()
    );
    
    if (records.length === 0) return null;

    const present = records.filter(r => r.status === 'present').length;
    const total = records.length;
    const percentage = (present / total) * 100;

    return {
      percentage,
      color: percentage >= 90 ? 'emerald' : percentage >= 80 ? 'amber' : 'red'
    };
  };

  const days = Array.from({ length: getDaysInMonth(selectedDate) }, (_, i) => i + 1);
  const firstDay = getFirstDayOfMonth(selectedDate);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const changeMonth = (increment: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    onDateSelect(newDate);
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-400">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {blanks.map(i => (
          <div key={`blank-${i}`} className="aspect-square" />
        ))}
        
        {days.map(day => {
          const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
          const attendance = getDayAttendance(date);
          const isToday = date.toDateString() === new Date().toDateString();
          const isSelected = date.toDateString() === selectedDate.toDateString();

          return (
            <button
              key={day}
              onClick={() => onDateSelect(date)}
              className={`
                aspect-square rounded-lg p-2 relative
                ${isSelected ? 'bg-blue-500/20 text-blue-500' : 'hover:bg-gray-700/50'}
                ${isToday ? 'ring-2 ring-blue-500' : ''}
              `}
            >
              <span className="text-sm font-medium">{day}</span>
              {attendance && (
                <div
                  className={`absolute bottom-2 left-2 right-2 h-1 rounded-full bg-${attendance.color}-500/50`}
                  style={{ width: `${attendance.percentage}%` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceCalendar;