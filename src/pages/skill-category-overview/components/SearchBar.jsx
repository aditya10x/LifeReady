import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, placeholder = "Search modules..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative mb-6">
      <div className="relative">
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        <Input
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 pr-10 h-12 text-base"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="X" size={18} />
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg p-3 z-50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Search" size={14} />
            <span>Searching for "{searchTerm}"</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;