import React, { useState } from 'react';
import { MessageSquare, Bell, Calendar, Paperclip, Send, Search, Filter, MoreVertical, Check, Clock } from 'lucide-react';
import { useStore } from '../../../store/useStore';

interface Message {
  id: string;
  sender: string;
  senderRole: 'teacher' | 'parent';
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: {
    name: string;
    type: string;
    size: string;
  }[];
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  sender: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  teacher: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

const Communication = () => {
  const selectedChild = useStore((state) => state.getSelectedChild());
  const [activeTab, setActiveTab] = useState<'messages' | 'announcements' | 'meetings'>('messages');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  // Sample data - replace with real data from your backend
  const messages: Message[] = [
    {
      id: '1',
      sender: 'Mrs. Smith',
      senderRole: 'teacher',
      content: 'Your child has been doing excellent work in class lately. Would you like to schedule a meeting to discuss their progress?',
      timestamp: '2024-03-20T10:30:00',
      read: false,
      attachments: [
        { name: 'Progress Report.pdf', type: 'PDF', size: '2.4 MB' }
      ]
    },
    {
      id: '2',
      sender: 'Parent',
      senderRole: 'parent',
      content: 'Thank you for the update. Yes, I would love to schedule a meeting.',
      timestamp: '2024-03-20T11:15:00',
      read: true
    }
  ];

  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'Parent-Teacher Conference Week',
      content: 'Next week is Parent-Teacher Conference Week. Please schedule your meeting through the portal.',
      sender: 'School Administration',
      timestamp: '2024-03-19T09:00:00',
      priority: 'high',
      read: false
    },
    {
      id: '2',
      title: 'School Holiday Reminder',
      content: 'School will be closed next Friday for staff development day.',
      sender: 'School Administration',
      timestamp: '2024-03-18T14:30:00',
      priority: 'medium',
      read: true
    }
  ];

  const meetings: Meeting[] = [
    {
      id: '1',
      title: 'Progress Review Meeting',
      date: '2024-03-25',
      time: '14:00',
      duration: '30 minutes',
      teacher: 'Mrs. Smith',
      status: 'scheduled',
      notes: 'Please prepare any questions about your child\'s progress.'
    },
    {
      id: '2',
      title: 'Quarterly Review',
      date: '2024-03-28',
      time: '15:30',
      duration: '45 minutes',
      teacher: 'Mr. Johnson',
      status: 'scheduled'
    }
  ];

  const getPriorityColor = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getMeetingStatusColor = (status: Meeting['status']) => {
    switch (status) {
      case 'scheduled':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'cancelled':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Communication</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Stay connected with teachers and school administration
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
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('messages')}
            className={`${
              activeTab === 'messages'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`${
              activeTab === 'announcements'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Bell className="w-4 h-4 mr-2" />
            Announcements
          </button>
          <button
            onClick={() => setActiveTab('meetings')}
            className={`${
              activeTab === 'meetings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Meetings
          </button>
        </nav>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search messages, announcements, or meetings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {activeTab === 'messages' && (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {messages.map((message) => (
              <div key={message.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {message.sender}
                      </h4>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        {new Date(message.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {message.content}
                    </p>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 flex space-x-2">
                        {message.attachments.map((attachment, index) => (
                          <button
                            key={index}
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <Paperclip className="w-3 h-3 mr-1" />
                            {attachment.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {!message.read && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                        New
                      </span>
                    )}
                    <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'announcements' && (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {announcement.title}
                      </h4>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {announcement.content}
                    </p>
                    <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>{announcement.sender}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(announcement.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!announcement.read && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                        New
                      </span>
                    )}
                    <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {meeting.title}
                      </h4>
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMeetingStatusColor(meeting.status)}`}>
                        {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{new Date(meeting.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{meeting.time} ({meeting.duration})</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Teacher:</span> {meeting.teacher}
                    </div>
                    {meeting.notes && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        {meeting.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Message Input (only shown in messages tab) */}
      {activeTab === 'messages' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              disabled={!newMessage.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Communication; 