import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SuccessStories = ({ stories, categoryTitle }) => {
  if (!stories || stories?.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-6 lg:p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Star" size={20} className="text-success" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Success Stories</h2>
          <p className="text-sm text-muted-foreground">
            Real results from {categoryTitle} learners
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {stories?.map((story, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-6 relative">
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 opacity-20">
              <Icon name="Quote" size={24} className="text-primary" />
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={story?.avatar}
                  alt={story?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{story?.name}</h4>
                <p className="text-sm text-muted-foreground">{story?.role}</p>
              </div>
            </div>

            {/* Story Content */}
            <blockquote className="text-sm text-foreground leading-relaxed mb-4">
              "{story?.testimonial}"
            </blockquote>

            {/* Achievement */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 text-success">
                <Icon name="TrendingUp" size={12} />
                <span className="font-medium">{story?.achievement}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{story?.timeframe}</span>
            </div>

            {/* Modules Completed */}
            {story?.modulesCompleted && (
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="CheckCircle" size={12} />
                  <span>Completed {story?.modulesCompleted} modules in this category</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* View More Stories Link */}
      <div className="text-center mt-6">
        <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200">
          <span>View more success stories</span>
          <Icon name="ArrowRight" size={14} />
        </button>
      </div>
    </div>
  );
};

export default SuccessStories;