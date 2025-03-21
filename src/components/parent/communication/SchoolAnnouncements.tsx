import React from 'react';
import { Bell, Calendar, MapPin } from 'lucide-react';

interface SchoolAnnouncementsProps {
  searchQuery: string;
}

const SchoolAnnouncements: React.FC<SchoolAnnouncementsProps> = ({ searchQuery }) => {
  const announcements = [
    {
      id: 1,
      title: 'Parent-Teacher Conferences',
      content: 'Parent-teacher conferences will be held next Thursday. Please book your slot online through the parent portal.',
      date: '15 Apr 2023',
      priority: 'high'
    },
    {
      id: 2,
      title: 'End of Term Exams',
      content: 'End of term exams will begin in two weeks. Revision materials are available on the school website.',
      date: '10 Apr 2023',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'School Trip Permission',
      content: 'Year 10 Geography field trip permission slips are due by Friday. Please complete the online form.',
      date: '05 Apr 2023',
      priority: 'medium'
    }
  ];

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">School Announcements</h2>
      <p className="text-gray-400">Important updates and information from the school</p>

      <div className="space-y-4">
        {filteredAnnouncements.map(announcement => (
          <div key={announcement.id} className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  announcement.priority === 'high'
                    ? 'bg-red-500/20 text-red-500'
                    : 'bg-amber-500/20 text-amber-500'
                }`}>
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{announcement.title}</h3>
                  <p className="text-sm text-gray-400">Posted: {announcement.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                announcement.priority === 'high'
                  ? 'bg-red-500/20 text-red-500'
                  : 'bg-amber-500/20 text-amber-500'
              }`}>
                {announcement.priority === 'high' ? 'High Priority' : 'Medium Priority'}
              </span>
            </div>

            <p className="text-gray-300">{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolAnnouncements;