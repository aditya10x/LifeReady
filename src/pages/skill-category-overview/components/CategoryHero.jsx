import React from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const CategoryHero = ({ category, progress, totalModules, completedModules }) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-xl p-6 lg:p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-xl flex items-center justify-center ${category?.bgColor}`}>
            <Icon name={category?.icon} size={32} color="white" className="lg:w-10 lg:h-10" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              {category?.title}
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-4">
              {category?.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="BookOpen" size={16} />
                <span>{totalModules} modules</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={16} />
                <span>{category?.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Users" size={16} />
                <span>{category?.enrolledUsers} enrolled</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-80">
          <ProgressIndicator
            progress={completedModules}
            total={totalModules}
            label="Category Progress"
            showPercentage={true}
            size="lg"
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-4"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;