import React from 'react';
import Icon from '../../../components/AppIcon';
import { AchievementBadge } from '../../../components/ui/ProgressIndicator';

const AchievementsSection = ({ recentAchievements, totalAchievements }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Recent Achievements</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Award" size={16} />
          <span>{totalAchievements} total</span>
        </div>
      </div>
      {recentAchievements?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Trophy" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">No achievements yet</p>
          <p className="text-sm text-muted-foreground">Complete your first module to earn badges!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentAchievements?.map((achievement) => (
            <div key={achievement?.id} className="animate-in">
              <AchievementBadge
                title={achievement?.title}
                description={achievement?.description}
                icon={achievement?.icon}
                variant={achievement?.variant}
                isUnlocked={true}
                className="w-full justify-start"
              />
              <p className="text-xs text-muted-foreground mt-1 ml-8">
                Earned {achievement?.earnedDate}
              </p>
            </div>
          ))}
          
          {recentAchievements?.length >= 3 && (
            <div className="pt-2 border-t border-border">
              <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-150">
                View all achievements
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AchievementsSection;