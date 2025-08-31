import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const quickActions = [
    {
      icon: 'Search',
      label: 'Search Skills',
      path: '/skill-category-overview',
      color: 'bg-primary text-primary-foreground'
    },
    {
      icon: 'Bookmark',
      label: 'Bookmarks',
      path: '/resource-library',
      color: 'bg-accent text-accent-foreground'
    },
    {
      icon: 'Target',
      label: 'Set Goal',
      path: '/dashboard-home',
      color: 'bg-secondary text-secondary-foreground'
    }
  ];

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50">
      {/* Quick Actions */}
      {isExpanded && (
        <div className="mb-4 space-y-2 animate-in">
          {quickActions?.map((action, index) => (
            <Link
              key={index}
              to={action?.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ${action?.color}`}
              onClick={() => setIsExpanded(false)}
            >
              <Icon name={action?.icon} size={20} />
              <span className="text-sm font-medium whitespace-nowrap">{action?.label}</span>
            </Link>
          ))}
        </div>
      )}
      {/* Main FAB */}
      <Button
        variant="default"
        size="icon"
        onClick={toggleExpanded}
        className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
      >
        <Icon name="Plus" size={24} />
      </Button>
    </div>
  );
};

export default FloatingActionButton;