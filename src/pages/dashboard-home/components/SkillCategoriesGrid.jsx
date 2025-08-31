import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const SkillCategoriesGrid = ({ categories }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Skill Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories?.map((category) => (
          <Link
            key={category?.id}
            to="/skill-category-overview"
            className="group bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/20 transition-all duration-200"
          >
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center ${category?.bgColor}`}>
                <Icon name={category?.icon} size={24} className={category?.iconColor} />
              </div>
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-150 mb-2">
                {category?.name}
              </h3>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  {category?.completedModules}/{category?.totalModules} completed
                </p>
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(3)]?.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full ${
                        index < category?.difficultyLevel 
                          ? 'bg-primary' :'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SkillCategoriesGrid;