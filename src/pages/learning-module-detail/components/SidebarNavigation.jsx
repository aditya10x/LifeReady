import React from 'react';
import Icon from '../../../components/AppIcon';

const SidebarNavigation = ({ module, activeStep, onStepClick, className = '' }) => {
  if (!module?.steps) return null;

  const scrollToStep = (stepIndex) => {
    onStepClick(stepIndex);
    // Smooth scroll to step element
    const stepElement = document.getElementById(`step-${stepIndex}`);
    if (stepElement) {
      stepElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 sticky top-24 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Icon name="List" size={18} className="text-primary" />
        <h3 className="font-semibold text-foreground">Module Outline</h3>
      </div>
      <div className="space-y-2">
        {module.steps?.map((step, index) => (
          <button
            key={index}
            onClick={() => scrollToStep(index)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-150 ${
              activeStep === index
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5 ${
                step?.completed
                  ? 'bg-success text-success-foreground'
                  : activeStep === index
                  ? 'bg-primary-foreground text-primary'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step?.completed ? <Icon name="Check" size={12} /> : index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium line-clamp-2 ${
                  activeStep === index ? 'text-primary-foreground' : ''
                }`}>
                  {step?.title}
                </div>
                <div className={`text-xs mt-1 flex items-center gap-2 ${
                  activeStep === index ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }`}>
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={10} />
                    {step?.estimatedTime}
                  </span>
                  {step?.subtasks && (
                    <span className="flex items-center gap-1">
                      <Icon name="CheckSquare" size={10} />
                      {step?.subtasks?.length}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Progress Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-sm text-muted-foreground">
            {module.steps?.filter(step => step?.completed)?.length}/{module.steps?.length}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ 
              width: `${(module.steps?.filter(step => step?.completed)?.length / module.steps?.length) * 100}%` 
            }}
          />
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-4 space-y-2">
        <button className="w-full flex items-center gap-2 p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-150">
          <Icon name="Printer" size={14} />
          Print Module
        </button>
        <button className="w-full flex items-center gap-2 p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-150">
          <Icon name="Download" size={14} />
          Download PDF
        </button>
        <button className="w-full flex items-center gap-2 p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-150">
          <Icon name="Share2" size={14} />
          Share Progress
        </button>
      </div>
    </div>
  );
};

export default SidebarNavigation;