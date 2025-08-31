import React from 'react';

import { ProgressStats } from '../../../components/ui/ProgressIndicator';

const QuickStatsCards = ({ stats }) => {
  const statsData = [
    {
      icon: 'Clock',
      label: 'Learning Time',
      value: stats?.totalLearningTime,
      change: stats?.learningTimeChange
    },
    {
      icon: 'CheckCircle',
      label: 'Skills Mastered',
      value: stats?.skillsMastered,
      change: stats?.skillsChange
    },
    {
      icon: 'DollarSign',
      label: 'Cost Savings',
      value: `$${stats?.costSavings?.toLocaleString()}`,
      change: stats?.savingsChange
    },
    {
      icon: 'Target',
      label: 'Goals Achieved',
      value: stats?.goalsAchieved,
      change: stats?.goalsChange
    }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Your Progress</h2>
      <ProgressStats stats={statsData} />
    </div>
  );
};

export default QuickStatsCards;