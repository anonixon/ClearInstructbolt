import React, { useState } from 'react';
import { Download, ThumbsUp, ThumbsDown, Brain, TrendingUp, Award } from 'lucide-react';
import BehaviorOverview from './behavior/BehaviorOverview';
import BehaviorRecords from './behavior/BehaviorRecords';
import CategoryAnalysis from './behavior/CategoryAnalysis';
import WellbeingInsights from './behavior/WellbeingInsights';
import RewardsRecognition from './behavior/RewardsRecognition';

const BehaviorPage = () => {
  const [activeTab, setActiveTab] = useState('behavior-records');
  
  const stats = {
    netPoints: 37,
    positive: {
      points: 45,
      incidents: 15
    },
    negative: {
      points: 8,
      incidents: 4
    },
    categories: {
      positive: [
        { name: 'Academic Excellence', points: 20, incidents: 5 },
        { name: 'Helpfulness', points: 10, incidents: 4 },
        { name: 'Community Spirit', points: 8, incidents: 3 }
      ],
      negative: [
        { name: 'Punctuality', points: -2, incidents: 2 },
        { name: 'Classroom Behavior', points: -2, incidents: 1 },
        { name: 'Homework Completion', points: -4, incidents: 1 }
      ]
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Behavior Tracking</h1>
          <p className="text-gray-400">
            Monitor behavior points, incidents, and well-being insights
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select className="bg-gray-800/50 text-white px-4 py-2 rounded-lg">
            <option>Current Term</option>
            <option>Previous Term</option>
            <option>Full Year</option>
          </select>
          <button className="p-2 text-gray-400 hover:text-white bg-gray-800/50 rounded-lg">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <BehaviorOverview stats={stats} />

      <div className="flex gap-2 border-b border-gray-800">
        <TabButton
          label="Behavior Records"
          active={activeTab === 'behavior-records'}
          onClick={() => setActiveTab('behavior-records')}
        />
        <TabButton
          label="Category Analysis"
          active={activeTab === 'category-analysis'}
          onClick={() => setActiveTab('category-analysis')}
        />
        <TabButton
          label="Well-being Insights"
          active={activeTab === 'well-being-insights'}
          onClick={() => setActiveTab('well-being-insights')}
        />
        <TabButton
          label="Rewards & Recognition"
          active={activeTab === 'rewards-recognition'}
          onClick={() => setActiveTab('rewards-recognition')}
        />
      </div>

      {activeTab === 'behavior-records' && <BehaviorRecords />}
      {activeTab === 'category-analysis' && <CategoryAnalysis stats={stats} />}
      {activeTab === 'well-being-insights' && <WellbeingInsights />}
      {activeTab === 'rewards-recognition' && <RewardsRecognition />}
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

export default BehaviorPage;