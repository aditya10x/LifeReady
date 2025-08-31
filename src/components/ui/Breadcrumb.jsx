import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const routeMap = {
    '/dashboard-home': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/skill-category-overview': { label: 'Skills', icon: 'BookOpen' },
    '/learning-module-detail': { label: 'Learn', icon: 'GraduationCap' },
    '/resource-library': { label: 'Resources', icon: 'Library' }
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    // Always start with Dashboard as home
    if (location?.pathname !== '/dashboard-home') {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/dashboard-home',
        icon: 'LayoutDashboard'
      });
    }

    // Add current page
    const currentRoute = routeMap?.[location?.pathname];
    if (currentRoute) {
      breadcrumbs?.push({
        label: currentRoute?.label,
        path: location?.pathname,
        icon: currentRoute?.icon,
        isActive: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1 && location?.pathname === '/dashboard-home') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((item, index) => (
          <li key={item?.path || index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={14} 
                className="mx-2 text-muted-foreground/60" 
              />
            )}
            
            {item?.isActive ? (
              <span className="flex items-center space-x-1 text-foreground font-medium">
                <Icon name={item?.icon} size={14} />
                <span className="hidden sm:inline">{item?.label}</span>
                <span className="sm:hidden">{item?.label?.slice(0, 8)}...</span>
              </span>
            ) : (
              <Link
                to={item?.path}
                className="flex items-center space-x-1 hover:text-foreground transition-colors duration-150 ease-out"
              >
                <Icon name={item?.icon} size={14} />
                <span className="hidden sm:inline">{item?.label}</span>
                <span className="sm:hidden">{item?.label?.slice(0, 8)}...</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;