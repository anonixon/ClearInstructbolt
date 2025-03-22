import { AI_CONFIG, isAIEnabled } from '../config/ai';

interface AIAnalysisRequest {
  studentId: string;
  context: string;
  analysisType: 'behavior' | 'academic' | 'wellbeing';
}

interface AIAnalysisResponse {
  analysis: string;
  recommendations: string[];
  riskLevel?: 'low' | 'medium' | 'high';
}

export class AIService {
  static async generateAnalysis({ studentId, context, analysisType }: AIAnalysisRequest): Promise<AIAnalysisResponse> {
    if (!isAIEnabled) {
      throw new Error('AI features are disabled. Please configure your DeepSeek API key.');
    }

    try {
      const response = await fetch(`${AI_CONFIG.baseUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
        },
        body: JSON.stringify({
          studentId,
          context,
          analysisType,
          ...AI_CONFIG.defaultParams,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate AI analysis');
      }

      return await response.json();
    } catch (error) {
      console.error('AI Analysis Error:', error);
      throw error;
    }
  }

  static async generateWellbeingInsights(studentId: string, behaviorData: any): Promise<AIAnalysisResponse> {
    return this.generateAnalysis({
      studentId,
      context: JSON.stringify(behaviorData),
      analysisType: 'wellbeing',
    });
  }

  static async generateBehaviorRecommendations(studentId: string, behaviorData: any): Promise<AIAnalysisResponse> {
    return this.generateAnalysis({
      studentId,
      context: JSON.stringify(behaviorData),
      analysisType: 'behavior',
    });
  }

  static async generateAcademicInsights(studentId: string, academicData: any): Promise<AIAnalysisResponse> {
    return this.generateAnalysis({
      studentId,
      context: JSON.stringify(academicData),
      analysisType: 'academic',
    });
  }
}