import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Book } from 'lucide-react';

const AssignmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const changeMonth = (increment: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 bg-gray-800/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => changeMonth(-1)}
                className="p-2 text-gray-400 hover:text-white rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-white">
                {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </h2>
              <button
                onClick={() => changeMonth(1)}
                className="p-2 text-gray-400 hover:text-white rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
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
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = date.toDateString() === selectedDate.toDateString();
              const hasAssignment = day === 12; // Example condition

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(date)}
                  className={`
                    aspect-square rounded-lg flex items-center justify-center relative
                    ${isSelected ? 'bg-blue-500/20 text-blue-500' : 'hover:bg-gray-700/50'}
                    ${isToday ? 'ring-2 ring-blue-500' : ''}
                  `}
                >
                  <span className="text-sm font-medium">{day}</span>
                  {hasAssignment && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                      <div className="w-1 h-1 rounded-full bg-blue-500" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-4 space-y-6">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Selected Date: {selectedDate.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Book className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-white">Mathematics: Quadratic Equations</div>
                  <div className="text-sm text-gray-400">
                    Due: Tomorrow
                    <br />
                    Status: Not Started
                    <br />
                    Estimated time: 45 minutes
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Calendar Legend</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-600" />
                <span className="text-gray-400">No Assignments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-gray-400">Has Assignments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-gray-400">Due Tomorrow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-gray-400">Overdue</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">This Week's Workload</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Monday</span>
                <span className="text-white">1 Assignment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCalendar;