import React from 'react';
import Icon from '../../../components/AppIcon';
import ResourceCard from './ResourceCard';

const ResourceSection = ({ 
  title, 
  subtitle, 
  icon, 
  resources, 
  onDownload, 
  onPreview, 
  onBookmark, 
  bookmarkedIds = [],
  showViewAll = false,
  onViewAll
}) => {
  if (!resources || resources?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon && <Icon name={icon} size={20} className="text-primary" />}
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        {showViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-150 flex items-center space-x-1"
          >
            <span>View all</span>
            <Icon name="ArrowRight" size={14} />
          </button>
        )}
      </div>
      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources?.map((resource) => (
          <ResourceCard
            key={resource?.id}
            resource={resource}
            onDownload={onDownload}
            onPreview={onPreview}
            onBookmark={onBookmark}
            isBookmarked={bookmarkedIds?.includes(resource?.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourceSection;