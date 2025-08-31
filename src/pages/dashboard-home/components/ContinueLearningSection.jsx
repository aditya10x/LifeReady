import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

import ProgressIndicator from '../../../components/ui/ProgressIndicator';
import Button from '../../../components/ui/Button';

const ContinueLearningSection = ({ inProgressModules }) => {
  if (!inProgressModules || inProgressModules?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Continue Learning</h2>
        <div className="text-center py-8">
          <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">No modules in progress yet</p>
          <Link to="/skill-category-overview">
            <Button variant="default">Start Learning</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Continue Learning</h2>
        <Link to="/learning-module-detail">
          <Button variant="ghost" size="sm">
            View All
            <Icon name="ArrowRight" size={16} className="ml-1" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inProgressModules?.map((module) => (
          <Link
            key={module.id}
            to="/learning-module-detail"
            className="group block bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors duration-150"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={module.icon} size={24} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-150 mb-1">
                  {module.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {module.description}
                </p>
                <div className="space-y-2">
                  <ProgressIndicator
                    progress={module.progress}
                    total={100}
                    variant="bar"
                    size="sm"
                    showLabel={false}
                    showPercentage={true}
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{module.timeRemaining} remaining</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      module.difficulty === 'Beginner' ? 'bg-success/10 text-success' :
                      module.difficulty === 'Intermediate'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                    }`}>
                      {module.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContinueLearningSection;