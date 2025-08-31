import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const SearchBar = ({ onSearch, placeholder = "Search resources, templates, calculators..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestedTerms = [
    "salary negotiation",
    "emergency fund calculator",
    "budget template",
    "home maintenance checklist",
    "insurance guide",
    "networking templates",
    "credit score improvement",
    "investment basics",
    "healthcare navigation",
    "professional communication"
  ];

  useEffect(() => {
    if (searchTerm?.length > 2) {
      const filtered = suggestedTerms?.filter(term =>
        term?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearch = (term = searchTerm) => {
    onSearch(term);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    handleSearch(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Icon 
          name="Search" 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => searchTerm?.length > 2 && setShowSuggestions(true)}
          className="w-full pl-10 pr-10 py-3 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-150"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
      {/* Search suggestions */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-lg shadow-lg py-2 animate-in">
          {suggestions?.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-colors duration-150 flex items-center space-x-2"
            >
              <Icon name="Search" size={14} className="text-muted-foreground" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}
      {/* Overlay to close suggestions */}
      {showSuggestions && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;