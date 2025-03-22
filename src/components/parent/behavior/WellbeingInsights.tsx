import React from 'react';
import { Brain } from 'lucide-react';

const WellbeingInsights = () => {
  const insights = [
    {
      category: 'Social Engagement',
      score: 85,
      status: 'Improving',
      description: 'Emma shows strong social connections and positive peer relationships.'
    },
    {
      category: 'Emotional Regulation',
      score: 75,
      status: 'Stable',
      description: 'Generally manages emotions well, occasional minor frustrations.'
    },
    {
      category: 'Academic Engagement',
      score: 90,
      status: 'Improving',
      description: 'Highly engaged in learning with consistent participation.'
    },
    {
      category: 'Stress Management',
      score: 70,
      status: 'Fluctuating',
      description: 'Some signs of exam-related stress, but generally coping well.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight) => (
          <div key={insight.category} className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-blue-500" />
                <h2 className="text-lg font-semibold text-white">{insight.category}</h2>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                insight.score >= 85 ? 'bg-emerald-500/20 text-emerald-500' :
                insight.score >= 75 ? 'bg-amber-500/20 text-amber-500' :
                'bg-blue-500/20 text-blue-500'
              }`}>
                {insight.score}/100
              </div>
            </div>
            <p className="text-gray-300 mb-4">{insight.description}</p>
            <div className={`text-sm ${
              insight.status === 'Improving' ? 'text-emerald-500' :
              insight.status === 'Stable' ? 'text-blue-500' :
              'text-amber-500'
            }`}>
              {insight.status}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Overall Well-being Assessment</h2>
        <p className="text-gray-300">
          Emma demonstrates positive social-emotional development with strong peer relationships
          and academic engagement. She shows good emotional regulation in most situations,
          though there are signs of exam-related stress that may benefit from additional support.
          Her behavior record reflects her strengths in academic excellence and helpfulness,
          with minor areas for improvement in punctuality and classroom conduct.
        </p>
      </div>
    </div>
  );
};

export default WellbeingInsights;