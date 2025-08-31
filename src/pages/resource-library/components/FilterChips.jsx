import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ 
  categories, 
  resourceTypes, 
  difficultyLevels, 
  activeFilters, 
  onFilterChange 
}) => {
  const filterSections = [
    {
      title: 'Category',
      key: 'category',
      options: categories
    },
    {
      title: 'Type',
      key: 'type',
      options: resourceTypes
    },
    {
      title: 'Difficulty',
      key: 'difficulty',
      options: difficultyLevels
    }
  ];

  const handleFilterToggle = (filterType, value) => {
    const currentFilters = activeFilters?.[filterType] || [];
    const newFilters = currentFilters?.includes(value)
      ? currentFilters?.filter(f => f !== value)
      : [...currentFilters, value];
    
    onFilterChange(filterType, newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange('clear', null);
  };

  const getTotalActiveFilters = () => {
    return Object.values(activeFilters)?.reduce((total, filters) => total + filters?.length, 0);
  };

  return (
    <div className="space-y-4">
      {/* Clear filters button */}
      {getTotalActiveFilters() > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {getTotalActiveFilters()} filter{getTotalActiveFilters() !== 1 ? 's' : ''} active
          </span>
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-150"
          >
            Clear all
          </button>
        </div>
      )}
      {/* Filter sections */}
      {filterSections?.map((section) => (
        <div key={section?.key} className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">{section?.title}</h4>
          <div className="flex flex-wrap gap-2">
            {section?.options?.map((option) => {
              const isActive = activeFilters?.[section?.key]?.includes(option?.value) || false;
              return (
                <button
                  key={option?.value}
                  onClick={() => handleFilterToggle(section?.key, option?.value)}
                  className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  }`}
                >
                  <span>{option?.label}</span>
                  {option?.count && (
                    <span className={`text-xs ${
                      isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    }`}>
                      ({option?.count})
                    </span>
                  )}
                  {isActive && (
                    <Icon name="X" size={12} className="ml-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterChips;