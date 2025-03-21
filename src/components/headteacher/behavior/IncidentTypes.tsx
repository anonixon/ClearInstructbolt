import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Disruption', value: 45, color: '#EF4444' },
  { name: 'Defiance', value: 20, color: '#F97316' },
  { name: 'Late to Class', value: 15, color: '#F59E0B' },
  { name: 'Uniform', value: 10, color: '#EAB308' },
  { name: 'Other', value: 10, color: '#EC4899' }
];

const IncidentTypes = () => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-2">Incident Types</h2>
      <p className="text-gray-400 mb-6">Breakdown of behavior incidents by type</p>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-400">{item.name}: {item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentTypes;