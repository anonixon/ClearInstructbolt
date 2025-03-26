import React, { useState } from 'react';
import { Download, TrendingUp, Brain, BookOpen, ArrowUpRight } from 'lucide-react';

const AcademicReports = () => {
  const [activeTab, setActiveTab] = useState('subject-grades');
  const student = {
    name: "Emma Johnson",
    class: "10A",
    currentAverage: 7.0,
    targetAverage: 7.5,
    previousAverage: 6.5,
    subjects: [
      {
        name: "English",
        grade: 7,
        target: 8,
        improvement: 1,
        level: "Grades 7-9"
      },
      {
        name: "Math",
        grade: 8,
        target: 8,
        improvement: 1,
        level: "Grades 7-9"
      },
      {
        name: "Science",
        grade: 6,
        target: 7,
        improvement: 0,
        level: "Grades 4-6"
      }
    ],
    recentAssessments: [
      {
        title: "Macbeth Essay",
        subject: "English",
        date: "15/04/2023",
        grade: 7
      },
      {
        title: "Algebra Test",
        subject: "Mathematics",
        date: "22/04/2023",
        grade: 8
      },
      {
        title: "Chemistry Exam",
        subject: "Science",
        date: "01/05/2023",
        grade: 6
      },
      {
        title: "World War II Project",
        subject: "History",
        date: "10/05/2023",
        grade: 7
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Academic Reports</h1>
          <p className="text-gray-400">
            Detailed academic performance for {student.name} ({student.class})
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

      <div className="bg-gray-800/50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Overall Academic Progress</h2>
        <p className="text-gray-400 mb-6">Summary of performance across all subjects</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 rounded-lg p-6">
            <div className="text-sm text-gray-400 mb-2">Current Average</div>
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold text-white">{student.currentAverage}</div>
              <div className="px-2 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-500 rounded-full">
                High
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-emerald-500 mt-2">
              <TrendingUp className="w-4 h-4" />
              <span>+{student.currentAverage - student.previousAverage} from previous</span>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6">
            <div className="text-sm text-gray-400 mb-2">Target Average</div>
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold text-white">{student.targetAverage}</div>
              <div className="px-2 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-500 rounded-full">
                High
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-amber-500 mt-2">
              <span>{student.targetAverage - student.currentAverage} below target</span>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-lg p-6">
            <div className="text-sm text-gray-400 mb-2">Progress Trend</div>
            <div className="h-12 flex items-center">
              <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-blue-500 rounded-full" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-blue-500 mt-2">
              <TrendingUp className="w-4 h-4" />
              <span>Consistent improvement</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gray-800">
        <TabButton
          label="Subject Grades"
          active={activeTab === 'subject-grades'}
          onClick={() => setActiveTab('subject-grades')}
        />
        <TabButton
          label="Performance Chart"
          active={activeTab === 'performance-chart'}
          onClick={() => setActiveTab('performance-chart')}
        />
        <TabButton
          label="Recent Assessments"
          active={activeTab === 'recent-assessments'}
          onClick={() => setActiveTab('recent-assessments')}
        />
        <TabButton
          label="AI Insights"
          active={activeTab === 'ai-insights'}
          onClick={() => setActiveTab('ai-insights')}
        />
      </div>

      {activeTab === 'subject-grades' && (
        <div className="bg-gray-800/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-2">Subject Grades</h2>
          <p className="text-gray-400 mb-6">Detailed breakdown by subject</p>

          <div className="space-y-8">
            {student.subjects.map((subject) => (
              <div key={subject.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-medium text-white">{subject.name}</h3>
                    <div className="px-2 py-1 text-sm bg-emerald-500/20 text-emerald-500 rounded-full">
                      {subject.grade}
                    </div>
                    <div className="text-gray-400">Target: {subject.target}</div>
                  </div>
                  <div className="text-sm text-gray-400">{subject.grade}/9</div>
                </div>

                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-500 bg-red-500/20">
                        Grades 1-3
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-amber-500 bg-amber-500/20">
                        Grades 4-6
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-500 bg-emerald-500/20">
                        Grades 7-9
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-700">
                    <div className="w-1/3 bg-red-500/50" />
                    <div className="w-1/3 bg-amber-500/50" />
                    <div className="w-1/3 bg-emerald-500/50" />
                    <div 
                      className="absolute top-1/2 w-2 h-2 bg-white rounded-full transform -translate-y-1/2"
                      style={{ left: `${(subject.grade / 9) * 100}%` }}
                    />
                  </div>
                </div>

                {subject.improvement > 0 && (
                  <div className="flex items-center gap-1 text-sm text-emerald-500">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Improved by {subject.improvement} grade(s) since last term</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'recent-assessments' && (
        <div className="bg-gray-800/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-2">Recent Assessments</h2>
          <p className="text-gray-400 mb-6">Latest tests, exams and assignments</p>

          <div className="space-y-4">
            {student.recentAssessments.map((assessment) => (
              <div 
                key={assessment.title}
                className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{assessment.title}</h3>
                    <p className="text-sm text-gray-400">
                      {assessment.subject} • {assessment.date}
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 text-sm bg-emerald-500/20 text-emerald-500 rounded-full">
                  Grade {assessment.grade}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ai-insights' && (
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-white">Learning Style Analysis</h2>
            </div>
            <p className="text-gray-300">
              Emma demonstrates strong visual and verbal learning preferences. Her high performance
              in Art and Languages suggests she processes information effectively through visual
              aids and written content. Recommend incorporating more visual learning strategies
              in subjects like Geography and Science where she's currently performing at a lower level.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-emerald-500" />
              <h2 className="text-xl font-semibold text-white">Strengths & Opportunities</h2>
            </div>
            <p className="text-gray-300">
              Emma excels in creative and language-based subjects, showing particular aptitude
              in Art (Grade 9) and Languages (Grade 8). There's significant opportunity to
              improve in Geography (Grade 5) where focused study sessions with visual mapping
              techniques could help bridge the gap. Her consistent improvement in Mathematics
              shows good response to current teaching methods.
            </p>
          </div>
        </div>
      )}
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

export default AcademicReports;