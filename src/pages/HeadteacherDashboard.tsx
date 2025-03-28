import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SchoolMetricsPanel from '../components/headteacher/dashboard/SchoolMetricsPanel';
import OfstedMetricsPanel from '../components/headteacher/dashboard/OfstedMetricsPanel';
import PerformanceChart from '../components/headteacher/dashboard/PerformanceChart';
import { SchoolMetrics, OfstedMetric, PerformanceData } from '../types';

const HeadteacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [schoolMetrics, setSchoolMetrics] = useState<SchoolMetrics>({
    total_students: 0,
    total_teachers: 0,
    average_attendance: 0,
    average_grades: 0,
  });
  const [ofstedMetrics, setOfstedMetrics] = useState<OfstedMetric[]>([
    { category: 'Teaching', score: 0 },
    { category: 'Learning', score: 0 },
    { category: 'Outcomes', score: 0 },
    { category: 'Leadership', score: 0 },
  ]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([
    { date: '2023-01', value: 0 },
    { date: '2023-02', value: 0 },
    { date: '2023-03', value: 0 },
    { date: '2023-04', value: 0 },
    { date: '2023-05', value: 0 },
    { date: '2023-06', value: 0 },
  ]);

  useEffect(() => {
    // TODO: Fetch actual data from API
    const fetchData = async () => {
      // Simulated data
      setSchoolMetrics({
        total_students: 500,
        total_teachers: 50,
        average_attendance: 95,
        average_grades: 75,
      });
      setOfstedMetrics([
        { category: 'Teaching', score: 85 },
        { category: 'Learning', score: 82 },
        { category: 'Outcomes', score: 88 },
        { category: 'Leadership', score: 90 },
      ]);
      setPerformanceData([
        { date: '2023-01', value: 75 },
        { date: '2023-02', value: 78 },
        { date: '2023-03', value: 80 },
        { date: '2023-04', value: 82 },
        { date: '2023-05', value: 85 },
        { date: '2023-06', value: 88 },
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Headteacher Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.first_name}!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SchoolMetricsPanel metrics={schoolMetrics} />
            </div>
            <div>
              <OfstedMetricsPanel metrics={ofstedMetrics} />
            </div>
          </div>

          <div className="mt-6">
            <PerformanceChart data={performanceData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadteacherDashboard; 