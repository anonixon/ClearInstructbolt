import React, { useState } from 'react';
import { MessageSquare, Bell, Download, Search, Paperclip, Send, Phone, Mail } from 'lucide-react';
import TeacherMessages from './communication/TeacherMessages';
import SchoolAnnouncements from './communication/SchoolAnnouncements';
import PSHEUpdates from './communication/PSHEUpdates';
import StaffContacts from './communication/StaffContacts';
import ComposeMessage from './communication/ComposeMessage';

const CommunicationPage = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [showCompose, setShowCompose] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">School Communication</h1>
          <p className="text-gray-400">
            Messages, announcements, and PSHE updates
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search communications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-gray-800/50 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-800/50 text-white px-4 py-2 rounded-lg"
          >
            <option value="all">All Communications</option>
            <option value="messages">Messages</option>
            <option value="announcements">Announcements</option>
            <option value="pshe">PSHE Updates</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gray-800">
        <TabButton
          label="Messages"
          active={activeTab === 'messages'}
          onClick={() => setActiveTab('messages')}
        />
        <TabButton
          label="Announcements"
          active={activeTab === 'announcements'}
          onClick={() => setActiveTab('announcements')}
        />
        <TabButton
          label="PSHE Updates"
          active={activeTab === 'pshe'}
          onClick={() => setActiveTab('pshe')}
        />
        <TabButton
          label="Staff Contacts"
          active={activeTab === 'staff'}
          onClick={() => setActiveTab('staff')}
        />
      </div>

      {activeTab === 'messages' && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowCompose(true)}
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            New Message
          </button>
        </div>
      )}

      {activeTab === 'messages' && <TeacherMessages searchQuery={searchQuery} />}
      {activeTab === 'announcements' && <SchoolAnnouncements searchQuery={searchQuery} />}
      {activeTab === 'pshe' && <PSHEUpdates searchQuery={searchQuery} />}
      {activeTab === 'staff' && <StaffContacts searchQuery={searchQuery} />}

      {showCompose && (
        <ComposeMessage onClose={() => setShowCompose(false)} />
      )}
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

export default CommunicationPage;