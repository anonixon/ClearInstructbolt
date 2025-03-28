import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/shared/ui/card';
import { Button } from '../../../components/shared/ui/button';
import { MessageSquare, Send, User } from 'lucide-react';

interface Message {
  id: string;
  parentName: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied';
}

export const ParentCommunication: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      parentName: 'John Smith',
      subject: 'Student Progress',
      message: 'How is my child performing in class?',
      timestamp: '2024-03-20T10:00:00',
      status: 'unread'
    },
    {
      id: '2',
      parentName: 'Sarah Johnson',
      subject: 'Homework Clarification',
      message: 'Could you clarify the homework assignment?',
      timestamp: '2024-03-19T15:30:00',
      status: 'read'
    }
  ]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Parent Communication</CardTitle>
        <Button>
          <MessageSquare className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  <div>
                    <h4 className="font-medium">{message.parentName}</h4>
                    <p className="text-sm text-gray-500">{message.subject}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(message.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{message.message}</p>
              <div className="mt-4 flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Send className="w-4 h-4 mr-2" />
                  Reply
                </Button>
                <span className={`text-sm ${
                  message.status === 'unread' ? 'text-blue-500' :
                  message.status === 'read' ? 'text-gray-500' :
                  'text-green-500'
                }`}>
                  {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 