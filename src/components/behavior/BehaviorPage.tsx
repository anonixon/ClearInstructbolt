import React, { useState } from 'react';
import { Search, Filter, Plus, BarChart2, Calendar, AlertTriangle, Award } from 'lucide-react';
import { useStore } from '../../store/useStore';
import BehaviorStats from './BehaviorStats';
import BehaviorGrid from './BehaviorGrid';
import BehaviorTimeline from './BehaviorTimeline';

const BehaviorPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormGroup, setSelectedFormGroup] = useState<string>('all');
  const [view, setView] = useState<'grid' | 'timeline'>('grid');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  
  const students = useStore((state) => state.students);
  const behaviorRecords = useStore((state) => state.behaviorRecords);
  const stats = selectedStudent ? useStore((state) => state.getBehaviorStats(selectedStudent)) : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Behavior Tracking</h1>
        <p className="text-gray-400">
          Monitor and manage student behavior with comprehensive tracking and analytics
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setView('grid')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'grid'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setView('timeline')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'timeline'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Timeline View
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-gray-800/50 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedFormGroup}
            onChange={(e) => setSelectedFormGroup(e.target.value)}
            className="bg-gray-800/50 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Form Groups</option>
            {Array.from(new Set(students.map(s => s.grade))).map(grade => (
              <option key={grade} value={grade}>Form {grade}</option>
            ))}
          </select>

          <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Plus className="w-5 h-5" />
            Record Behavior
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Award className="w-5 h-5" />}
          label="Positive Behaviors"
          value={behaviorRecords.filter(r => r.type === 'positive').length}
          color="emerald"
        />
        <StatCard
          icon={<AlertTriangle className="w-5 h-5" />}
          label="Negative Behaviors"
          value={behaviorRecords.filter(r => r.type === 'negative').length}
          color="red"
        />
        <StatCard
          icon={<BarChart2 className="w-5 h-5" />}
          label="Active Interventions"
          value={useStore.getState().behaviorInterventions.filter(i => i.status === 'In Progress').length}
          color="blue"
        />
        <StatCard
          icon={<Calendar className="w-5 h-5" />}
          label="Records Today"
          value={behaviorRecords.filter(r => r.date.toDateString() === new Date().toDateString()).length}
          color="purple"
        />
      </div>

      {view === 'grid' ? (
        <BehaviorGrid
          searchQuery={searchQuery}
          formGroup={selectedFormGroup}
          onStudentSelect={setSelectedStudent}
        />
      ) : (
        <BehaviorTimeline
          searchQuery={searchQuery}
          formGroup={selectedFormGroup}
          selectedStudent={selectedStudent}
        />
      )}
    </div>
  );
};

const StatCard = ({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) => {
  return (
    <div className={`bg-${color}-500/10 rounded-lg p-6`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-${color}-500/20 text-${color}-500`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{label}</h3>
      </div>
      <div className={`text-4xl font-bold text-${color}-500`}>
        {value}
      </div>
    </div>
  );
};

export default BehaviorPage;