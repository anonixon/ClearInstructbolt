import React from 'react';
import { AlertTriangle, ThumbsUp, Shield, Award } from 'lucide-react';

const BehaviorOverview = () => {
  const metrics = [
    {
      title: 'Total Behavior Incidents',
      value: '427',
      change: '-12% from last term',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'red'
    },
    {
      title: 'Positive Recognitions',
      value: '1,842',
      change: '+23% from last term',
      icon: <ThumbsUp className="w-5 h-5" />,
      color: 'emerald'
    },
    {
      title: 'Fixed-Term Exclusions',
      value: '8',
      change: '-2 from last term',
      icon: <Shield className="w-5 h-5" />,
      color: 'amber'
    },
    {
      title: 'Reward Points Issued',
      value: '12,547',
      change: '+1,245 from last term',
      icon: <Award className="w-5 h-5" />,
      color: 'blue'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-gray-800/50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg bg-${metric.color}-500/20 text-${metric.color}-500`}>
              {metric.icon}
            </div>
            <h3 className="text-lg font-semibold text-white">{metric.title}</h3>
          </div>
          <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
          <div className={`text-sm ${
            metric.change.startsWith('+') || metric.change.startsWith('-2') 
              ? 'text-emerald-500' 
              : 'text-red-500'
          }`}>
            {metric.change}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BehaviorOverview;