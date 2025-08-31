import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, bookmarkedCount = 0 }) => {
  const tabs = [
    {
      id: 'all',
      label: 'All Resources',
      icon: 'Grid3X3'
    },
    {
      id: 'favorites',
      label: 'My Favorites',
      icon: 'Bookmark',
      count: bookmarkedCount
    },
    {
      id: 'recent',
      label: 'Recently Added',
      icon: 'Clock'
    },
    {
      id: 'popular',
      label: 'Most Popular',
      icon: 'TrendingUp'
    }
  ];

  return (
    <div className="border-b border-border">
      <nav className="flex space-x-1 overflow-x-auto">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-150 ${
              activeTab === tab?.id
                ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
            {tab?.count > 0 && (
              <span className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {tab?.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;