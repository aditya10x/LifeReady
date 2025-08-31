import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  progress = 0, 
  total = 100, 
  variant = 'bar', 
  size = 'default',
  showPercentage = true,
  showLabel = true,
  label = 'Progress',
  className = ''
}) => {
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100);
  
  const sizeClasses = {
    sm: 'h-1',
    default: 'h-2',
    lg: 'h-3'
  };

  const circleSizes = {
    sm: { size: 32, strokeWidth: 2 },
    default: { size: 40, strokeWidth: 3 },
    lg: { size: 48, strokeWidth: 4 }
  };

  if (variant === 'circle') {
    const { size: circleSize, strokeWidth } = circleSizes?.[size];
    const radius = (circleSize - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        {showLabel && (
          <span className="text-sm font-medium text-foreground">{label}</span>
        )}
        <div className="relative">
          <svg
            width={circleSize}
            height={circleSize}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radius}
              stroke="var(--color-muted)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx={circleSize / 2}
              cy={circleSize / 2}
              r={radius}
              stroke="var(--color-primary)"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
          </svg>
          {showPercentage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-foreground">
                {Math.round(percentage)}%
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {(showLabel || showPercentage) && (
        <div className="flex items-center justify-between">
          {showLabel && (
            <span className="text-sm font-medium text-foreground">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm text-muted-foreground">
              {progress}/{total} ({Math.round(percentage)}%)
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-muted rounded-full overflow-hidden ${sizeClasses?.[size]}`}>
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full" />
          )}
        </div>
      </div>
      {percentage === 100 && (
        <div className="flex items-center space-x-1 text-success animate-in">
          <Icon name="CheckCircle" size={16} />
          <span className="text-sm font-medium">Complete!</span>
        </div>
      )}
    </div>
  );
};

// Achievement Badge Component
export const AchievementBadge = ({ 
  title, 
  description, 
  icon = 'Award', 
  variant = 'default',
  isUnlocked = false,
  className = ''
}) => {
  const variantClasses = {
    default: 'bg-accent text-accent-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    secondary: 'bg-secondary text-secondary-foreground'
  };

  return (
    <div className={`
      inline-flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium
      ${isUnlocked ? variantClasses?.[variant] : 'bg-muted text-muted-foreground'}
      ${isUnlocked ? 'animate-in' : 'opacity-60'}
      ${className}
    `}>
      <Icon 
        name={icon} 
        size={16} 
        className={isUnlocked ? '' : 'opacity-50'} 
      />
      <div>
        <div className="font-semibold">{title}</div>
        {description && (
          <div className="text-xs opacity-90">{description}</div>
        )}
      </div>
    </div>
  );
};

// Progress Stats Component
export const ProgressStats = ({ 
  stats = [], 
  className = '' 
}) => {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={stat?.icon} size={20} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              {stat?.label}
            </span>
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">
            {stat?.value}
          </div>
          {stat?.change && (
            <div className={`text-xs flex items-center space-x-1 ${
              stat?.change > 0 ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={stat?.change > 0 ? 'TrendingUp' : 'TrendingDown'} 
                size={12} 
              />
              <span>{Math.abs(stat?.change)}%</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;