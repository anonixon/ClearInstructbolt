import React from 'react';

const locations = [
  { name: 'Classroom', incidents: 215 },
  { name: 'Corridors', incidents: 98 },
  { name: 'Playground', incidents: 64 },
  { name: 'Dining Hall', incidents: 32 },
  { name: 'Other', incidents: 18 }
];

const LocationAnalysis = () => {
  const maxIncidents = Math.max(...locations.map(l => l.incidents));

  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-2">Location Analysis</h2>
      <p className="text-gray-400 mb-6">Where incidents are occurring</p>

      <div className="space-y-4">
        {locations.map((location) => (
          <div key={location.name}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white">{location.name}</span>
              <span className="text-gray-400">{location.incidents} incidents</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${(location.incidents / maxIncidents) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationAnalysis;