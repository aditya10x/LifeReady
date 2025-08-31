import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const ModuleCard = ({ module }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-success bg-success/10';
      case 'intermediate': return 'text-warning bg-warning/10';
      case 'advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in-progress': return 'RotateCcw';
      case 'locked': return 'Lock';
      default: return 'Play';
    }
  };

  const getButtonVariant = (status) => {
    switch (status) {
      case 'completed': return 'secondary';
      case 'in-progress': return 'default';
      case 'locked': return 'outline';
      default: return 'default';
    }
  };

  const getButtonText = (status) => {
    switch (status) {
      case 'completed': return 'Review Module';
      case 'in-progress': return 'Continue Learning';
      case 'locked': return 'Prerequisites Required';
      default: return 'Start Learning';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Module Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={module.thumbnail}
          alt={module.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            module.status === 'completed' ? 'bg-success text-success-foreground' :
            module.status === 'in-progress' ? 'bg-primary text-primary-foreground' :
            module.status === 'locked' ? 'bg-muted text-muted-foreground' :
            'bg-card/90 text-foreground backdrop-blur-sm'
          }`}>
            <Icon name={getStatusIcon(module.status)} size={12} />
            <span className="capitalize">{module.status === 'not-started' ? 'New' : module.status?.replace('-', ' ')}</span>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-3 right-3">
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
            <Icon name="Circle" size={8} />
            <span className="capitalize">{module.difficulty}</span>
          </div>
        </div>

        {/* Achievement Badge for Completed */}
        {module.status === 'completed' && module.achievementBadge && (
          <div className="absolute bottom-3 right-3">
            <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
              <Icon name="Award" size={16} color="white" />
            </div>
          </div>
        )}
      </div>
      {/* Module Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {module.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
            <Icon name="Clock" size={12} />
            <span>{module.estimatedTime}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {module.description}
        </p>

        {/* Module Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Icon name="Users" size={12} />
            <span>{module.enrolledCount} enrolled</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Star" size={12} />
            <span>{module.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="BookOpen" size={12} />
            <span>{module.lessonsCount} lessons</span>
          </div>
        </div>

        {/* Progress Bar for In-Progress Modules */}
        {module.status === 'in-progress' && (
          <div className="mb-4">
            <ProgressIndicator
              progress={module.progress}
              total={100}
              size="sm"
              showPercentage={false}
              showLabel={false}
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">
                {module.completedLessons}/{module.lessonsCount} lessons
              </span>
              <span className="text-xs font-medium text-primary">
                {module.progress}% complete
              </span>
            </div>
          </div>
        )}

        {/* Prerequisites for Locked Modules */}
        {module.status === 'locked' && module.prerequisites && (
          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Lock" size={14} className="text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Prerequisites Required</span>
            </div>
            <div className="space-y-1">
              {module.prerequisites?.map((prereq, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="ArrowRight" size={10} />
                  <span>{prereq}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-2">
          <Button
            variant={getButtonVariant(module.status)}
            size="sm"
            fullWidth
            disabled={module.status === 'locked'}
            iconName={getStatusIcon(module.status)}
            iconPosition="left"
            iconSize={16}
            asChild={module.status !== 'locked'}
          >
            {module.status !== 'locked' ? (
              <Link to="/learning-module-detail" state={{ module }}>
                {getButtonText(module.status)}
              </Link>
            ) : (
              getButtonText(module.status)
            )}
          </Button>
          
          {module.status !== 'locked' && (
            <Button
              variant="ghost"
              size="sm"
              iconName="Bookmark"
              iconSize={16}
              className="flex-shrink-0"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;