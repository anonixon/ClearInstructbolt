import React from 'react';
import { Bell, CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { Notification } from '../../../types';

export interface NotificationPanelProps {
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose }) => {
  const notifications: Notification[] = [
    {
      id: '1',
      title: 'New Assignment',
      message: 'Your child has a new homework assignment due tomorrow.',
      type: 'info',
      created_at: new Date().toISOString(),
      read: false,
      user_id: '1',
    },
    // Add more sample notifications as needed
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              {notification.type === 'success' && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              {notification.type === 'error' && (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
              {notification.type === 'info' && (
                <Info className="w-5 h-5 text-blue-500" />
              )}
              <div>
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel; 