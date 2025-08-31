import React from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const WelcomeSection = ({ userName, overallProgress, totalModules }) => {
  const currentHour = new Date()?.getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-primary-foreground/80 mb-4">
            Ready to continue your adulting journey? You're doing great!
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="BookOpen" size={20} />
              <span className="text-sm">{totalModules} modules available</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={20} />
              <span className="text-sm">Last active today</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <ProgressIndicator
            progress={overallProgress}
            total={100}
            variant="circle"
            size="lg"
            showLabel={false}
            className="text-white"
          />
        </div>
      </div>
      <div className="sm:hidden mt-4">
        <ProgressIndicator
          progress={overallProgress}
          total={100}
          variant="bar"
          size="default"
          label="Overall Progress"
          className="text-white"
        />
      </div>
    </div>
  );
};

export default WelcomeSection;