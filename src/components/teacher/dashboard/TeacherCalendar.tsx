import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/shared/ui/card';
import { Button } from '../../../components/shared/ui/button';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'class' | 'meeting' | 'assignment' | 'other';
}

export const TeacherCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Math Class',
      date: '2024-03-20',
      time: '09:00 - 10:00',
      type: 'class'
    },
    {
      id: '2',
      title: 'Parent Meeting',
      date: '2024-03-20',
      time: '14:00 - 15:00',
      type: 'meeting'
    }
  ]);

  const getEventColor = (type: Event['type']) => {
    switch (type) {
      case 'class':
        return 'bg-blue-100 text-blue-800';
      case 'meeting':
        return 'bg-green-100 text-green-800';
      case 'assignment':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Calendar</CardTitle>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h3 className="font-medium">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          <Button variant="ghost" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getEventColor(event.type)}`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 