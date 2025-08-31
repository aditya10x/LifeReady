import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard-home', icon: 'LayoutDashboard' },
    { label: 'Skills', path: '/skill-category-overview', icon: 'BookOpen' },
    { label: 'Learn', path: '/learning-module-detail', icon: 'GraduationCap' },
    { label: 'Resources', path: '/resource-library', icon: 'Library' }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    // Handle search functionality
    setIsSearchOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 lg:h-18 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/dashboard-home" className="flex items-center space-x-2 flex-shrink-0">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={20} color="white" className="lg:w-6 lg:h-6" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg lg:text-xl font-semibold text-foreground">
              LifeReady
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-out ${
                isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          {/* Search */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSearchToggle}
              className="w-9 h-9 lg:w-10 lg:h-10"
            >
              <Icon name="Search" size={18} />
            </Button>
            
            {isSearchOpen && (
              <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg shadow-lg p-4 animate-in">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <Icon 
                      name="Search" 
                      size={16} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                    />
                    <input
                      type="text"
                      placeholder="Search skills, modules, resources..."
                      className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      autoFocus
                    />
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 lg:w-10 lg:h-10 relative"
          >
            <Icon name="Bell" size={18} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full"></span>
          </Button>

          {/* Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleProfileToggle}
              className="w-9 h-9 lg:w-10 lg:h-10"
            >
              <div className="w-6 h-6 lg:w-7 lg:h-7 bg-accent rounded-full flex items-center justify-center">
                <Icon name="User" size={14} color="white" className="lg:w-4 lg:h-4" />
              </div>
            </Button>

            {isProfileOpen && (
              <div className="absolute right-0 top-12 w-56 bg-popover border border-border rounded-lg shadow-lg py-2 animate-in">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium text-foreground">Alex Johnson</p>
                  <p className="text-xs text-muted-foreground">alex@example.com</p>
                </div>
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150">
                    <Icon name="User" size={16} className="mr-3" />
                    Profile
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150">
                    <Icon name="Settings" size={16} className="mr-3" />
                    Settings
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150">
                    <Icon name="HelpCircle" size={16} className="mr-3" />
                    Help
                  </button>
                  <div className="border-t border-border my-1"></div>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150">
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-1000 bg-card border-t border-border">
        <div className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-md transition-colors duration-150 ease-out ${
                isActiveRoute(item?.path)
                  ? 'text-primary' :'text-muted-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-medium">{item?.label}</span>
            </Link>
          ))}
        </div>
      </nav>
      {/* Overlay for dropdowns */}
      {(isSearchOpen || isProfileOpen) && (
        <div 
          className="fixed inset-0 z-50 bg-black/20 lg:bg-transparent"
          onClick={() => {
            setIsSearchOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;