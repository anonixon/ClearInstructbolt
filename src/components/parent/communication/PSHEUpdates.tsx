import React from 'react';
import { FileText, Download, Info } from 'lucide-react';

interface PSHEUpdatesProps {
  searchQuery: string;
}

const PSHEUpdates: React.FC<PSHEUpdatesProps> = ({ searchQuery }) => {
  const updates = [
    {
      id: 1,
      title: 'Mental Health Awareness',
      content: 'This week\'s PSHE focus is on mental health awareness and developing healthy coping strategies for stress and anxiety.',
      resources: [
        { name: 'Mental Health Guide', url: '#' },
        { name: 'Stress Management Techniques', url: '#' }
      ],
      discussionPrompt: 'Consider discussing these mental health topics with your child at home to reinforce the concepts covered in class.',
      status: 'current'
    },
    {
      id: 2,
      title: 'Online Safety',
      content: 'Last week we covered important aspects of online safety, including social media awareness and cyberbullying prevention.',
      resources: [
        { name: 'Internet Safety Guide', url: '#' },
        { name: 'Digital Citizenship Workbook', url: '#' }
      ],
      discussionPrompt: 'Review online safety guidelines with your child and establish family rules for internet use.',
      status: 'previous'
    }
  ];

  const filteredUpdates = updates.filter(update =>
    update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    update.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">PSHE Updates</h2>
      <p className="text-gray-400">Personal, Social, Health and Economic education topics</p>

      <div className="space-y-6">
        {filteredUpdates.map(update => (
          <div 
            key={update.id}
            className={`rounded-lg overflow-hidden ${
              update.status === 'current'
                ? 'bg-emerald-500/10 border border-emerald-500/20'
                : 'bg-gray-800/50'
            }`}
          >
            <div className={`p-4 ${
              update.status === 'current'
                ? 'bg-emerald-500/20'
                : 'bg-amber-500/20'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">{update.title}</h3>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  update.status === 'current'
                    ? 'bg-emerald-500/20 text-emerald-500'
                    : 'bg-amber-500/20 text-amber-500'
                }`}>
                  {update.status === 'current' ? 'Current Week' : 'Previous Week'}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-gray-300">{update.content}</p>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white">Resources:</h4>
                {update.resources.map(resource => (
                  <div
                    key={resource.name}
                    className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-300">{resource.name}</span>
                    </div>
                    <button className="text-blue-500 hover:text-blue-400">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-500/10 rounded-lg">
                <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-500 mb-1">Discussion at Home</h4>
                  <p className="text-sm text-blue-400">{update.discussionPrompt}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PSHEUpdates;