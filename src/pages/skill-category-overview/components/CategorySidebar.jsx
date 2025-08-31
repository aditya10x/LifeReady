import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CategorySidebar = ({ categories, currentCategory }) => {
  const location = useLocation();

  return (
    <div className="hidden lg:block w-80 flex-shrink-0">
      <div className="sticky top-24 space-y-6">
        {/* Category Navigation */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Skill Categories
          </h3>
          <nav className="space-y-2">
            {categories?.map((category) => (
              <Link
                key={category?.id}
                to="/skill-category-overview"
                state={{ category }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  currentCategory?.id === category?.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  currentCategory?.id === category?.id ? 'bg-white/20' : category?.bgColor
                }`}>
                  <Icon 
                    name={category?.icon} 
                    size={16} 
                    color={currentCategory?.id === category?.id ? 'white' : 'white'} 
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{category?.title}</div>
                  <div className="text-xs opacity-80">
                    {category?.moduleCount} modules
                  </div>
                </div>
                {currentCategory?.id === category?.id && (
                  <Icon name="ChevronRight" size={16} />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Quick Stats */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Your Progress
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="BookOpen" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Total Modules</span>
              </div>
              <span className="text-sm font-medium text-foreground">24</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">Completed</span>
              </div>
              <span className="text-sm font-medium text-foreground">8</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="RotateCcw" size={16} className="text-warning" />
                <span className="text-sm text-muted-foreground">In Progress</span>
              </div>
              <span className="text-sm font-medium text-foreground">3</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Award" size={16} className="text-accent" />
                <span className="text-sm text-muted-foreground">Achievements</span>
              </div>
              <span className="text-sm font-medium text-foreground">12</span>
            </div>
          </div>
        </div>

        {/* Learning Streak */}
        <div className="bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
              <Icon name="Flame" size={20} className="text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Learning Streak</h3>
              <p className="text-sm text-muted-foreground">Keep it up!</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-warning mb-2">7 days</div>
          <p className="text-xs text-muted-foreground">
            Complete a module today to maintain your streak
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;