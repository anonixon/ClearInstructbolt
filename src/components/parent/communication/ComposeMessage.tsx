import React, { useState } from 'react';
import { X, Paperclip, Send } from 'lucide-react';

interface ComposeMessageProps {
  onClose: () => void;
}

const ComposeMessage: React.FC<ComposeMessageProps> = ({ onClose }) => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Send Message</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Recipient
            </label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full bg-gray-800/50 px-4 py-2 rounded-lg text-white"
            >
              <option value="">Select recipient</option>
              <option value="smith">Ms. Smith (English)</option>
              <option value="johnson">Mr. Johnson (Mathematics)</option>
              <option value="davis">Mrs. Davis (Science)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter message subject"
              className="w-full bg-gray-800/50 px-4 py-2 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={6}
              className="w-full bg-gray-800/50 px-4 py-2 rounded-lg text-white resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                <Paperclip className="w-5 h-5" />
                Attach File
              </button>
              <span className="text-sm text-gray-500">Max file size: 5MB</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                Typical response time: 1-2 school days
              </span>
              <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeMessage;