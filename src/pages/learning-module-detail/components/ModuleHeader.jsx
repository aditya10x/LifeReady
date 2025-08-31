import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModuleHeader = ({ module, onStartContinue, userProgress }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-success text-success-foreground';
      case 'intermediate':
        return 'bg-warning text-warning-foreground';
      case 'advanced':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getProgressPercentage = () => {
    if (!userProgress || !module.totalSteps) return 0;
    return Math.round((userProgress?.completedSteps / module.totalSteps) * 100);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={module.icon} size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                {module.title}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                  {module.difficulty}
                </span>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Icon name="Clock" size={14} />
                  <span>{module.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Icon name="Users" size={14} />
                  <span>{module.enrolledCount} enrolled</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {module.description}
          </p>

          {userProgress && userProgress?.completedSteps > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {userProgress?.completedSteps}/{module.totalSteps} steps ({getProgressPercentage()}%)
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[200px]">
          <Button
            variant="default"
            size="lg"
            onClick={onStartContinue}
            iconName={userProgress?.completedSteps > 0 ? "Play" : "PlayCircle"}
            iconPosition="left"
            className="w-full sm:w-auto lg:w-full"
          >
            {userProgress?.completedSteps > 0 ? "Continue Learning" : "Start Module"}
          </Button>
          
          <div className="flex gap-2 sm:flex-col lg:flex-row">
            <Button
              variant="outline"
              size="default"
              iconName="Bookmark"
              className="flex-1 sm:w-full lg:flex-1"
            >
              Save
            </Button>
            <Button
              variant="outline"
              size="default"
              iconName="Share2"
              className="flex-1 sm:w-full lg:flex-1"
            >
              Share
            </Button>
          </div>
        </div>
      </div>
      {module.prerequisites && module.prerequisites?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="AlertCircle" size={16} />
            Prerequisites
          </h3>
          <div className="flex flex-wrap gap-2">
            {module.prerequisites?.map((prereq, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
              >
                {prereq}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleHeader;