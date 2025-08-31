import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceCard = ({ 
  resource, 
  onDownload, 
  onPreview, 
  onBookmark, 
  isBookmarked = false 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await onDownload(resource);
    setIsDownloading(false);
  };

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

  const getResourceTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'template':
        return 'FileText';
      case 'checklist':
        return 'CheckSquare';
      case 'calculator':
        return 'Calculator';
      case 'guide':
        return 'BookOpen';
      default:
        return 'File';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 group">
      {/* Header with thumbnail and bookmark */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon 
            name={getResourceTypeIcon(resource?.type)} 
            size={20} 
            className="text-primary" 
          />
        </div>
        <button
          onClick={() => onBookmark(resource)}
          className={`p-1 rounded-md transition-colors duration-150 ${
            isBookmarked 
              ? 'text-warning hover:text-warning/80' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name={isBookmarked ? 'Bookmark' : 'BookmarkPlus'} size={16} />
        </button>
      </div>
      {/* Content */}
      <div className="space-y-2 mb-4">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-150">
          {resource?.title}
        </h3>
        
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
            {resource?.category}
          </span>
          <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(resource?.difficulty)}`}>
            {resource?.difficulty}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {resource?.description}
        </p>

        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Download" size={12} />
            <span>{resource?.downloadCount?.toLocaleString()} downloads</span>
          </div>
          {resource?.estimatedTime && (
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{resource?.estimatedTime}</span>
            </div>
          )}
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="default"
          size="sm"
          onClick={handleDownload}
          loading={isDownloading}
          iconName="Download"
          iconPosition="left"
          className="flex-1"
        >
          Download PDF
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPreview(resource)}
          iconName="Eye"
          iconPosition="left"
        >
          Preview
        </Button>
      </div>
    </div>
  );
};

export default ResourceCard;