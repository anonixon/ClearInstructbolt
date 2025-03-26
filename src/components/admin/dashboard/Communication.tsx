import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Send, Settings, Users, X, Calendar, FileText } from 'lucide-react';
import FileUpload from '../../shared/FileUpload';
import FilePreviewModal from '../../shared/FilePreviewModal';

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  targetAudience: ('all' | 'teachers' | 'parents' | 'students')[];
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  publishDate: string;
  scheduledDate?: string;
  author: string;
}

interface Message {
  id: string;
  sender: string;
  recipients: string[];
  subject: string;
  content: string;
  status: 'draft' | 'sent' | 'delivered' | 'read';
  sentDate: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: 'general' | 'emergency' | 'event' | 'academic';
  defaultRecipients: string[];
}

const Communication = () => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'messages' | 'settings'>('announcements');
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showScheduleAnnouncement, setShowScheduleAnnouncement] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'School Closure Due to Weather',
      content: 'Due to severe weather conditions, the school will be closed tomorrow. All classes will be conducted online.',
      priority: 'high',
      targetAudience: ['all'],
      status: 'published',
      publishDate: '2024-03-20T10:00:00',
      author: 'Principal Smith'
    },
    {
      id: '2',
      title: 'Parent-Teacher Conference Schedule',
      content: 'Parent-teacher conferences will be held next week. Please sign up for a time slot through the portal.',
      priority: 'medium',
      targetAudience: ['parents', 'teachers'],
      status: 'scheduled',
      publishDate: '2024-03-25T09:00:00',
      author: 'Vice Principal Johnson'
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Principal Smith',
      recipients: ['All Teachers'],
      subject: 'Monthly Staff Meeting',
      content: 'Please join us for the monthly staff meeting tomorrow at 3 PM in the conference room.',
      status: 'sent',
      sentDate: '2024-03-19T14:30:00'
    },
    {
      id: '2',
      sender: 'Vice Principal Johnson',
      recipients: ['Grade 10 Parents'],
      subject: 'College Application Workshop',
      content: 'We will be hosting a college application workshop next week. Please RSVP if you plan to attend.',
      status: 'draft',
      sentDate: '2024-03-18T16:00:00'
    }
  ]);

  const [templates, setTemplates] = useState<MessageTemplate[]>([
    {
      id: '1',
      name: 'Emergency Alert',
      subject: 'Emergency Alert: {school_name}',
      content: 'This is an emergency alert from {school_name}. {message_content}',
      category: 'emergency',
      defaultRecipients: ['all']
    },
    {
      id: '2',
      name: 'Parent-Teacher Conference',
      subject: 'Parent-Teacher Conference Schedule',
      content: 'Dear Parents,\n\nParent-teacher conferences will be held on {date}. Please sign up for a time slot through the portal.\n\nBest regards,\n{school_name}',
      category: 'event',
      defaultRecipients: ['parents']
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    priority: 'medium',
    targetAudience: [] as ('all' | 'teachers' | 'parents' | 'students')[],
    status: 'draft'
  });

  const [newMessage, setNewMessage] = useState<Partial<Message>>({
    recipients: [],
    subject: '',
    content: '',
    status: 'draft'
  });

  const [newTemplate, setNewTemplate] = useState<Partial<MessageTemplate>>({
    name: '',
    subject: '',
    content: '',
    category: 'general',
    defaultRecipients: []
  });

  const [scheduledAnnouncement, setScheduledAnnouncement] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    priority: 'medium',
    targetAudience: [] as ('all' | 'teachers' | 'parents' | 'students')[],
    status: 'scheduled',
    scheduledDate: ''
  });

  const [previewFile, setPreviewFile] = useState<{ name: string; url: string; type: string } | null>(null);

  const handlePublishAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      const announcement: Announcement = {
        ...newAnnouncement,
        id: Date.now().toString(),
        publishDate: new Date().toISOString(),
        author: 'Admin User'
      } as Announcement;

      setAnnouncements([announcement, ...announcements]);
      setShowNewAnnouncement(false);
      setNewAnnouncement({
        title: '',
        content: '',
        priority: 'medium',
        targetAudience: [],
        status: 'draft'
      });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.subject && newMessage.content) {
      const message: Message = {
        ...newMessage,
        id: Date.now().toString(),
        sender: 'Admin User',
        sentDate: new Date().toISOString(),
        status: 'sent'
      } as Message;

      setMessages([message, ...messages]);
      setShowNewMessage(false);
      setNewMessage({
        recipients: [],
        subject: '',
        content: '',
        status: 'draft'
      });
    }
  };

  const handleUseTemplate = (template: MessageTemplate) => {
    setNewMessage({
      subject: template.subject,
      content: template.content,
      recipients: template.defaultRecipients,
      status: 'draft'
    });
    setShowTemplates(false);
    setShowNewMessage(true);
  };

  const handleSaveTemplate = () => {
    if (newTemplate.name && newTemplate.subject && newTemplate.content) {
      const template: MessageTemplate = {
        ...newTemplate,
        id: Date.now().toString()
      } as MessageTemplate;

      setTemplates([template, ...templates]);
      setShowTemplates(false);
      setNewTemplate({
        name: '',
        subject: '',
        content: '',
        category: 'general',
        defaultRecipients: []
      });
    }
  };

  const handleScheduleAnnouncement = () => {
    if (scheduledAnnouncement.title && scheduledAnnouncement.content && scheduledAnnouncement.scheduledDate) {
      const announcement: Announcement = {
        ...scheduledAnnouncement,
        id: Date.now().toString(),
        publishDate: scheduledAnnouncement.scheduledDate,
        author: 'Admin User'
      } as Announcement;

      setAnnouncements([announcement, ...announcements]);
      setShowScheduleAnnouncement(false);
      setScheduledAnnouncement({
        title: '',
        content: '',
        priority: 'medium',
        targetAudience: [],
        status: 'scheduled',
        scheduledDate: ''
      });
    }
  };

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

  const getStatusColor = (status: Announcement['status'] | Message['status']) => {
    switch (status) {
      case 'published':
      case 'sent':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'scheduled':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'draft':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'archived':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Communication</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage announcements, messages, and communication settings
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
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
            onClick={() => setActiveTab('settings')}
            className={`${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {activeTab === 'announcements' && 'Announcements'}
              {activeTab === 'messages' && 'Messages'}
              {activeTab === 'settings' && 'Communication Settings'}
            </h3>
            {activeTab === 'announcements' && (
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowScheduleAnnouncement(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Announcement
                </button>
                <button
                  onClick={() => setShowNewAnnouncement(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  New Announcement
                </button>
              </div>
            )}
            {activeTab === 'messages' && (
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowTemplates(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Templates
                </button>
                <button
                  onClick={() => setShowNewMessage(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  New Message
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'announcements' && (
            <div className="space-y-6">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {announcement.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        By {announcement.author} • {new Date(announcement.publishDate).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(announcement.status)}`}>
                        {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {announcement.content}
                  </p>
                  <div className="mt-4 flex items-center space-x-2">
                    {announcement.targetAudience.map((audience) => (
                      <span
                        key={audience}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {audience.charAt(0).toUpperCase() + audience.slice(1)}
                      </span>
                    ))}
                  </div>
                  {announcement.attachments && announcement.attachments.length > 0 && (
                    <div className="mt-4 flex items-center space-x-2">
                      {announcement.attachments.map((attachment, index) => (
                        <button
                          key={index}
                          onClick={() => setPreviewFile(attachment)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          {attachment.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {message.subject}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        From {message.sender} • To {message.recipients.join(', ')} • {new Date(message.sentDate).toLocaleString()}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                      {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {message.content}
                  </p>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-4 flex items-center space-x-2">
                      {message.attachments.map((attachment, index) => (
                        <button
                          key={index}
                          onClick={() => setPreviewFile(attachment)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          {attachment.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Notification Settings</h4>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Email notifications for new messages
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Push notifications for announcements
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      SMS notifications for urgent announcements
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Message Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300">
                      Default Message Expiry (days)
                    </label>
                    <input
                      type="number"
                      defaultValue={30}
                      min="1"
                      max="365"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300">
                      Maximum Recipients per Message
                    </label>
                    <input
                      type="number"
                      defaultValue={100}
                      min="1"
                      max="1000"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Announcement Modal */}
      {showNewAnnouncement && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">New Announcement</h3>
                <button
                  onClick={() => setShowNewAnnouncement(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Content
                  </label>
                  <textarea
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Priority
                  </label>
                  <select
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value as Announcement['priority'] })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Target Audience
                  </label>
                  <div className="mt-2 space-y-2">
                    {['all', 'teachers', 'parents', 'students'].map((audience) => (
                      <label key={audience} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newAnnouncement.targetAudience?.includes(audience as 'all' | 'teachers' | 'parents' | 'students')}
                          onChange={(e) => {
                            const newAudience = newAnnouncement.targetAudience || [];
                            setNewAnnouncement({
                              ...newAnnouncement,
                              targetAudience: e.target.checked
                                ? [...newAudience, audience as 'all' | 'teachers' | 'parents' | 'students']
                                : newAudience.filter(a => a !== audience)
                            });
                          }}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {audience.charAt(0).toUpperCase() + audience.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Attachments
                  </label>
                  <FileUpload
                    onFileUpload={(files) => {
                      // Handle initial file upload if needed
                    }}
                    onFileComplete={(file, url) => {
                      const newAttachment = {
                        name: file.name,
                        url,
                        type: file.type.split('/')[1]
                      };

                      setNewAnnouncement({
                        ...newAnnouncement,
                        attachments: [...(newAnnouncement.attachments || []), newAttachment]
                      });
                    }}
                    onFileRemove={(index) => {
                      setNewAnnouncement({
                        ...newAnnouncement,
                        attachments: newAnnouncement.attachments?.filter((_, i) => i !== index)
                      });
                    }}
                    attachments={newAnnouncement.attachments || []}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    maxSize={10}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewAnnouncement(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublishAnnouncement}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">New Message</h3>
                <button
                  onClick={() => setShowNewMessage(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Recipients
                  </label>
                  <select
                    multiple
                    value={newMessage.recipients}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                      setNewMessage({ ...newMessage, recipients: selectedOptions });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="All Teachers">All Teachers</option>
                    <option value="All Parents">All Parents</option>
                    <option value="All Students">All Students</option>
                    <option value="Grade 10 Parents">Grade 10 Parents</option>
                    <option value="Grade 11 Parents">Grade 11 Parents</option>
                    <option value="Grade 12 Parents">Grade 12 Parents</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Attachments
                  </label>
                  <FileUpload
                    onFileUpload={(files) => {
                      // Handle initial file upload if needed
                    }}
                    onFileComplete={(file, url) => {
                      const newAttachment = {
                        name: file.name,
                        url,
                        type: file.type.split('/')[1]
                      };

                      setNewMessage({
                        ...newMessage,
                        attachments: [...(newMessage.attachments || []), newAttachment]
                      });
                    }}
                    onFileRemove={(index) => {
                      setNewMessage({
                        ...newMessage,
                        attachments: newMessage.attachments?.filter((_, i) => i !== index)
                      });
                    }}
                    attachments={newMessage.attachments || []}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    maxSize={10}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewMessage(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Message Templates</h3>
                <button
                  onClick={() => setShowTemplates(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {template.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Category: {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-xs font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Use Template
                      </button>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Subject:</span> {template.subject}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        <span className="font-medium">Content:</span> {template.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">New Template</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Template Name
                    </label>
                    <input
                      type="text"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category
                    </label>
                    <select
                      value={newTemplate.category}
                      onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value as MessageTemplate['category'] })}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="general">General</option>
                      <option value="emergency">Emergency</option>
                      <option value="event">Event</option>
                      <option value="academic">Academic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Subject Template
                    </label>
                    <input
                      type="text"
                      value={newTemplate.subject}
                      onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Content Template
                    </label>
                    <textarea
                      value={newTemplate.content}
                      onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowTemplates(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTemplate}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Announcement Modal */}
      {showScheduleAnnouncement && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-50 z-50">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Schedule Announcement</h3>
                <button
                  onClick={() => setShowScheduleAnnouncement(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    value={scheduledAnnouncement.title}
                    onChange={(e) => setScheduledAnnouncement({ ...scheduledAnnouncement, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Content
                  </label>
                  <textarea
                    value={scheduledAnnouncement.content}
                    onChange={(e) => setScheduledAnnouncement({ ...scheduledAnnouncement, content: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Priority
                  </label>
                  <select
                    value={scheduledAnnouncement.priority}
                    onChange={(e) => setScheduledAnnouncement({ ...scheduledAnnouncement, priority: e.target.value as Announcement['priority'] })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Target Audience
                  </label>
                  <div className="mt-2 space-y-2">
                    {['all', 'teachers', 'parents', 'students'].map((audience) => (
                      <label key={audience} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={scheduledAnnouncement.targetAudience?.includes(audience as 'all' | 'teachers' | 'parents' | 'students')}
                          onChange={(e) => {
                            const newAudience = scheduledAnnouncement.targetAudience || [];
                            setScheduledAnnouncement({
                              ...scheduledAnnouncement,
                              targetAudience: e.target.checked
                                ? [...newAudience, audience as 'all' | 'teachers' | 'parents' | 'students']
                                : newAudience.filter(a => a !== audience)
                            });
                          }}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {audience.charAt(0).toUpperCase() + audience.slice(1)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Schedule Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledAnnouncement.scheduledDate}
                    onChange={(e) => setScheduledAnnouncement({ ...scheduledAnnouncement, scheduledDate: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowScheduleAnnouncement(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleScheduleAnnouncement}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* File Preview Modal */}
      {previewFile && (
        <FilePreviewModal
          isOpen={!!previewFile}
          onClose={() => setPreviewFile(null)}
          file={previewFile}
        />
      )}
    </div>
  );
};

export default Communication; 