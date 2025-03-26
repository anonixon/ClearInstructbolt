import React from 'react';
import { MessageSquare, Reply } from 'lucide-react';

interface TeacherMessagesProps {
  searchQuery: string;
}

const TeacherMessages: React.FC<TeacherMessagesProps> = ({ searchQuery }) => {
  const messages = [
    {
      id: 1,
      teacher: {
        name: 'Ms. Smith',
        avatar: 'MS'
      },
      subject: 'English Project Feedback',
      content: 'Emma has done an excellent job on her recent English project. Her analysis of Macbeth showed deep understanding and critical thinking. I\'ve provided detailed feedback on the online submission portal.',
      date: 'Today, 10:30 AM',
      isNew: true
    },
    {
      id: 2,
      teacher: {
        name: 'Mr. Johnson',
        avatar: 'MJ'
      },
      subject: 'Math Test Results',
      content: 'I wanted to let you know that Emma performed very well on the recent algebra test, scoring 85%. She showed particular strength in quadratic equations. There are a few areas we\'ll focus on in the coming weeks to further improve her understanding.',
      date: 'Yesterday, 2:15 PM',
      isNew: false
    }
  ];

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">Teacher Messages</h2>
      <p className="text-gray-400">Direct communications from teachers</p>

      <div className="space-y-4">
        {filteredMessages.map(message => (
          <div key={message.id} className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                  {message.teacher.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">{message.subject}</h3>
                  <p className="text-sm text-gray-400">
                    From: {message.teacher.name} • {message.date}
                  </p>
                </div>
              </div>
              {message.isNew && (
                <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-500 rounded-full">
                  New
                </span>
              )}
            </div>

            <p className="text-gray-300 mb-4">{message.content}</p>

            <div className="flex items-center justify-end gap-4">
              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Reply className="w-5 h-5" />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherMessages;