import React from 'react';
import { Users, Coins, LayoutGrid } from 'lucide-react';

interface ResourceData {
  staffing: {
    current: number;
    optimal: number;
    gap: number;
    efficiency: number;
  };
  resources: {
    current: number;
    allocated: number;
    remaining: number;
    efficiency: number;
  };
  utilization: {
    classrooms: number;
    equipment: number;
    digital: number;
  };
}

interface ResourceOptimizationPanelProps {
  data: ResourceData;
}

const ResourceOptimizationPanel: React.FC<ResourceOptimizationPanelProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800/50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-500">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">Staffing Optimization</h3>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Current Staff</span>
              <span className="text-white">{data.staffing.current}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Optimal Level</span>
              <span className="text-white">{data.staffing.optimal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Efficiency</span>
              <span className="text-emerald-500">{data.staffing.efficiency}%</span>
            </div>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${data.staffing.efficiency}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-500">
            <Coins className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">Resource Allocation</h3>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Budget</span>
              <span className="text-white">£{data.resources.current.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Allocated</span>
              <span className="text-white">£{data.resources.allocated.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Remaining</span>
              <span className="text-emerald-500">£{data.resources.remaining.toLocaleString()}</span>
            </div>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${(data.resources.allocated / data.resources.current) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-purple-500/20 text-purple-500">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">Space Utilization</h3>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Classrooms</span>
              <span className="text-white">{data.utilization.classrooms}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${data.utilization.classrooms}%` }}
              />
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Equipment</span>
              <span className="text-white">{data.utilization.equipment}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${data.utilization.equipment}%` }}
              />
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Digital Resources</span>
              <span className="text-white">{data.utilization.digital}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500 rounded-full"
                style={{ width: `${data.utilization.digital}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceOptimizationPanel;