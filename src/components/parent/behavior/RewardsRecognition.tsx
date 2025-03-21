import React from 'react';
import { Award, Star, Medal, Trophy } from 'lucide-react';

const RewardsRecognition = () => {
  const achievements = [
    {
      title: 'Academic Excellence',
      description: 'Consistently high performance in class participation and assignments',
      date: 'April 2023',
      icon: Star,
      color: 'emerald'
    },
    {
      title: 'Helpful Student',
      description: 'Recognition for supporting peers and contributing to school community',
      date: 'March 2023',
      icon: Medal,
      color: 'blue'
    },
    {
      title: 'Perfect Attendance',
      description: 'Maintained excellent attendance record for the term',
      date: 'February 2023',
      icon: Trophy,
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div 
                key={achievement.title}
                className="bg-gray-900/50 rounded-lg p-6 flex flex-col items-center text-center"
              >
                <div className={`p-3 rounded-full bg-${achievement.color}-500/20 text-${achievement.color}-500 mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{achievement.description}</p>
                <div className="text-sm text-gray-500">{achievement.date}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Available Rewards</h2>
          <div className="space-y-4">
            <RewardItem
              points={50}
              title="Free Time Voucher"
              description="30 minutes of chosen activity"
              progress={37}
            />
            <RewardItem
              points={75}
              title="Achievement Certificate"
              description="Recognition in school assembly"
              progress={37}
            />
            <RewardItem
              points={100}
              title="Special Privilege Pass"
              description="Access to special school activities"
              progress={37}
            />
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Badges Earned</h2>
          <div className="grid grid-cols-3 gap-4">
            <BadgeItem
              icon={Star}
              title="Academic Star"
              level={3}
            />
            <BadgeItem
              icon={Medal}
              title="Helper"
              level={2}
            />
            <BadgeItem
              icon={Trophy}
              title="Attendance"
              level={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const RewardItem = ({
  points,
  title,
  description,
  progress
}: {
  points: number;
  title: string;
  description: string;
  progress: number;
}) => (
  <div className="p-4 bg-gray-900/50 rounded-lg">
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-medium text-white">{title}</h3>
      <div className="text-sm text-gray-400">{progress}/{points} points</div>
    </div>
    <p className="text-sm text-gray-400 mb-3">{description}</p>
    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
      <div 
        className="h-full bg-blue-500 rounded-full"
        style={{ width: `${(progress / points) * 100}%` }}
      />
    </div>
  </div>
);

const BadgeItem = ({
  icon: Icon,
  title,
  level
}: {
  icon: React.ElementType;
  title: string;
  level: number;
}) => (
  <div className="p-4 bg-gray-900/50 rounded-lg flex flex-col items-center text-center">
    <Icon className="w-8 h-8 text-amber-500 mb-2" />
    <div className="text-sm font-medium text-white mb-1">{title}</div>
    <div className="text-xs text-gray-400">Level {level}</div>
  </div>
);

export default RewardsRecognition;