import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ 
  selectedDifficulty, 
  selectedTimeCommitment, 
  selectedStatus, 
  onDifficultyChange, 
  onTimeCommitmentChange, 
  onStatusChange,
  onClearFilters 
}) => {
  const difficultyOptions = [
    { value: 'all', label: 'All Levels', icon: 'Filter' },
    { value: 'beginner', label: 'Beginner', icon: 'Circle', color: 'text-success' },
    { value: 'intermediate', label: 'Intermediate', icon: 'Circle', color: 'text-warning' },
    { value: 'advanced', label: 'Advanced', icon: 'Circle', color: 'text-error' }
  ];

  const timeOptions = [
    { value: 'all', label: 'Any Duration', icon: 'Clock' },
    { value: 'quick', label: 'Quick Win (5-30min)', icon: 'Zap' },
    { value: 'deep', label: 'Deep Dive (30-60min)', icon: 'Target' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Modules', icon: 'List' },
    { value: 'not-started', label: 'Not Started', icon: 'Play' },
    { value: 'in-progress', label: 'In Progress', icon: 'RotateCcw' },
    { value: 'completed', label: 'Completed', icon: 'CheckCircle' }
  ];

  const hasActiveFilters = selectedDifficulty !== 'all' || selectedTimeCommitment !== 'all' || selectedStatus !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filter by:</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {/* Difficulty Filter */}
          <div className="flex flex-wrap gap-2">
            {difficultyOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => onDifficultyChange(option?.value)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedDifficulty === option?.value
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                <Icon 
                  name={option?.icon} 
                  size={12} 
                  className={option?.color || ''} 
                />
                <span>{option?.label}</span>
              </button>
            ))}
          </div>

          {/* Time Commitment Filter */}
          <div className="flex flex-wrap gap-2">
            {timeOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => onTimeCommitmentChange(option?.value)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedTimeCommitment === option?.value
                    ? 'bg-secondary text-secondary-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                <Icon name={option?.icon} size={12} />
                <span>{option?.label}</span>
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            {statusOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => onStatusChange(option?.value)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedStatus === option?.value
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                <Icon name={option?.icon} size={12} />
                <span>{option?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
            className="self-start lg:self-center"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterChips;