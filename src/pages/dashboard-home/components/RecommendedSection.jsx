import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendedSection = ({ recommendedModules }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Recommended for You</h2>
        <Icon name="Sparkles" size={20} className="text-accent" />
      </div>
      <div className="space-y-4">
        {recommendedModules?.map((module) => (
          <div key={module.id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${module.bgColor}`}>
              <Icon name={module.icon} size={20} className={module.iconColor} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground mb-1">{module.title}</h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {module.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{module.estimatedTime}</span>
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    module.difficulty === 'Beginner' ? 'bg-success/10 text-success' :
                    module.difficulty === 'Intermediate'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                  }`}>
                    {module.difficulty}
                  </span>
                </div>
                <Link to="/learning-module-detail">
                  <Button variant="outline" size="sm">
                    Start
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Link to="/skill-category-overview">
          <Button variant="ghost" className="w-full">
            Browse All Skills
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecommendedSection;