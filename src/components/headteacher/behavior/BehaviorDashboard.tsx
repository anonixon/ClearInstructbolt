import React, { useState } from 'react';
import { Download } from 'lucide-react';
import BehaviorOverview from './BehaviorOverview';
import BehaviorIncidents from './BehaviorIncidents';
import LocationAnalysis from './LocationAnalysis';
import RewardsPanel from './RewardsPanel';
import InterventionsPanel from './InterventionsPanel';
import { useStore } from '../../../store/useStore';

const BehaviorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('Jan 01, 2023 - Mar 15, 2025');
  const behaviorRecords = useStore((state) => state.behaviorRecords);
  const behaviorInterventions = useStore((state) => state.behaviorInterventions);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Behavior Dashboard</h1>
          <p className="text-gray-400">
            Monitor and analyze behavior patterns across the school
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-gray-400">{dateRange}</div>
          <button className="flex items-center gap-2 bg-gray-800/50 text-white px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-colors">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gray-800">
        <TabButton
          label="Overview"
          active={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
        />
        <TabButton
          label="Incidents"
          active={activeTab === 'incidents'}
          onClick={() => setActiveTab('incidents')}
        />
        <TabButton
          label="Rewards"
          active={activeTab === 'rewards'}
          onClick={() => setActiveTab('rewards')}
        />
        <TabButton
          label="Interventions"
          active={activeTab === 'interventions'}
          onClick={() => setActiveTab('interventions')}
        />
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <BehaviorOverview />
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <BehaviorIncidents />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <LocationAnalysis />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'incidents' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Detailed Incident Analysis</h2>
          <p className="text-gray-400">Comprehensive breakdown of behavior incidents</p>
          <p className="text-gray-400">Analyze behavior incidents by type, location, time of day, and more.</p>
        </div>
      )}

      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Rewards and Recognition</h2>
          <p className="text-gray-400">Analysis of positive behavior recognition</p>
          <p className="text-gray-400">Track rewards, recognition, and positive behavior reinforcement.</p>
        </div>
      )}

      {activeTab === 'interventions' && <InterventionsPanel />}
    </div>
  );
};

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ 
  label, 
  active, 
  onClick 
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

export default BehaviorDashboard;