import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/shared/ui/card';
import { Button } from '../../../components/shared/ui/button';
import { FileText, Folder, Upload, Download, Trash2 } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  type: 'document' | 'folder';
  size: string;
  lastModified: string;
  subject: string;
}

export const ResourceManager: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      name: 'Math Lesson Plan',
      type: 'document',
      size: '2.5 MB',
      lastModified: '2024-03-20T10:00:00',
      subject: 'Mathematics'
    },
    {
      id: '2',
      name: 'Science Materials',
      type: 'folder',
      size: '15 MB',
      lastModified: '2024-03-19T15:30:00',
      subject: 'Science'
    }
  ]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Resource Manager</CardTitle>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Resource
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {resource.type === 'document' ? (
                    <FileText className="w-5 h-5 text-blue-500" />
                  ) : (
                    <Folder className="w-5 h-5 text-yellow-500" />
                  )}
                  <div>
                    <h4 className="font-medium">{resource.name}</h4>
                    <p className="text-sm text-gray-500">{resource.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                <span>{resource.size}</span>
                <span>Last modified: {new Date(resource.lastModified).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 