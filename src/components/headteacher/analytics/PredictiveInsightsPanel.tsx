import React from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';

interface Prediction {
  category: string;
  prediction: string;
  confidence: number;
  impact: string;
  timeframe: string;
}

interface PredictiveInsightsPanelProps {
  predictions: Prediction[];
}

const PredictiveInsightsPanel: React.FC<PredictiveInsightsPanelProps> = ({ predictions }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Predictive Insights</h2>
        <p className="text-gray-400">AI-powered predictions and recommendations</p>
      </div>

      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <div
            key={index}
            className="p-4 bg-gray-700/50 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-white">{prediction.category}</h3>
              <div className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-500 rounded-full">
                {prediction.confidence}% confidence
              </div>
            </div>
            <p className="text-gray-300 mb-3">{prediction.prediction}</p>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <AlertCircle className="w-4 h-4" />
                <span>{prediction.impact} Impact</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <TrendingUp className="w-4 h-4" />
                <span>{prediction.timeframe}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictiveInsightsPanel;