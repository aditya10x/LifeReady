import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import WelcomeSection from './components/WelcomeSection';
import ContinueLearningSection from './components/ContinueLearningSection';
import SkillCategoriesGrid from './components/SkillCategoriesGrid';
import AchievementsSection from './components/AchievementsSection';
import QuickStatsCards from './components/QuickStatsCards';
import RecommendedSection from './components/RecommendedSection';
import FloatingActionButton from './components/FloatingActionButton';

const DashboardHome = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock user data
  const userData = {
    name: "Aditya Patibandha",
    overallProgress: 68,
    totalModules: 47
  };

  // Mock in-progress modules
  const inProgressModules = [
    {
      id: 1,
      title: "Salary Negotiation Mastery",
      description: "Learn proven strategies to negotiate your worth and secure better compensation packages.",
      icon: "DollarSign",
      progress: 75,
      timeRemaining: "15 min",
      difficulty: "Intermediate"
    },
    {
      id: 2,
      title: "Emergency Fund Calculator",
      description: "Build a solid financial foundation with our step-by-step emergency fund planning guide.",
      icon: "Shield",
      progress: 40,
      timeRemaining: "25 min",
      difficulty: "Beginner"
    }
  ];

  // Mock skill categories
  const skillCategories = [
    {
      id: 1,
      name: "Financial Literacy",
      icon: "DollarSign",
      bgColor: "bg-success/10",
      iconColor: "text-success",
      completedModules: 8,
      totalModules: 12,
      difficultyLevel: 2
    },
    {
      id: 2,
      name: "Career Advancement",
      icon: "TrendingUp",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
      completedModules: 5,
      totalModules: 10,
      difficultyLevel: 3
    },
    {
      id: 3,
      name: "Home Management",
      icon: "Home",
      bgColor: "bg-accent/10",
      iconColor: "text-accent",
      completedModules: 3,
      totalModules: 8,
      difficultyLevel: 1
    },
    {
      id: 4,
      name: "Healthcare Navigation",
      icon: "Heart",
      bgColor: "bg-error/10",
      iconColor: "text-error",
      completedModules: 2,
      totalModules: 7,
      difficultyLevel: 2
    },
    {
      id: 5,
      name: "Professional Communication",
      icon: "MessageSquare",
      bgColor: "bg-warning/10",
      iconColor: "text-warning",
      completedModules: 6,
      totalModules: 10,
      difficultyLevel: 2
    }
  ];

  // Mock recent achievements
  const recentAchievements = [
    {
      id: 1,
      title: "Budget Master",
      description: "Created your first monthly budget",
      icon: "Award",
      variant: "success",
      earnedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Communication Pro",
      description: "Completed 5 communication modules",
      icon: "MessageCircle",
      variant: "default",
      earnedDate: "1 week ago"
    },
    {
      id: 3,
      title: "Goal Setter",
      description: "Set your first learning goal",
      icon: "Target",
      variant: "secondary",
      earnedDate: "2 weeks ago"
    }
  ];

  // Mock quick stats
  const quickStats = {
    totalLearningTime: "24h 30m",
    learningTimeChange: 15,
    skillsMastered: 24,
    skillsChange: 8,
    costSavings: 2450,
    savingsChange: 12,
    goalsAchieved: 7,
    goalsChange: 3
  };

  // Mock recommended modules
  const recommendedModules = [
    {
      id: 1,
      title: "Credit Score Improvement Plan",
      description: "90-day action plan to boost your credit score and unlock better financial opportunities.",
      icon: "TrendingUp",
      bgColor: "bg-success/10",
      iconColor: "text-success",
      estimatedTime: "45 min",
      difficulty: "Intermediate"
    },
    {
      id: 2,
      title: "Professional Email Templates",
      description: "Master workplace communication with proven email templates for every situation.",
      icon: "Mail",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
      estimatedTime: "20 min",
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Home Maintenance Checklist",
      description: "Monthly inspection guide to prevent costly repairs and maintain your living space.",
      icon: "CheckSquare",
      bgColor: "bg-accent/10",
      iconColor: "text-accent",
      estimatedTime: "30 min",
      difficulty: "Beginner"
    }
  ];

  // Pull to refresh functionality
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  useEffect(() => {
    // Add pull-to-refresh event listener for mobile
    let startY = 0;
    let currentY = 0;
    let pullDistance = 0;

    const handleTouchStart = (e) => {
      startY = e?.touches?.[0]?.clientY;
    };

    const handleTouchMove = (e) => {
      currentY = e?.touches?.[0]?.clientY;
      pullDistance = currentY - startY;

      if (pullDistance > 0 && window.scrollY === 0) {
        e?.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > 100 && window.scrollY === 0) {
        handleRefresh();
      }
      pullDistance = 0;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-18 pb-20 lg:pb-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <Breadcrumb />
          
          {/* Refresh indicator */}
          {isRefreshing && (
            <div className="fixed top-16 lg:top-18 left-0 right-0 z-40 bg-primary text-primary-foreground text-center py-2 text-sm animate-in">
              Refreshing your progress...
            </div>
          )}

          {/* Welcome Section */}
          <WelcomeSection 
            userName={userData?.name}
            overallProgress={userData?.overallProgress}
            totalModules={userData?.totalModules}
          />

          {/* Continue Learning Section */}
          <ContinueLearningSection inProgressModules={inProgressModules} />

          {/* Skill Categories Grid */}
          <SkillCategoriesGrid categories={skillCategories} />

          {/* Quick Stats Cards */}
          <QuickStatsCards stats={quickStats} />

          {/* Two Column Layout for Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Achievements Section */}
            <AchievementsSection 
              recentAchievements={recentAchievements}
              totalAchievements={15}
            />

            {/* Recommended Section */}
            <RecommendedSection recommendedModules={recommendedModules} />
          </div>
        </div>
      </main>
      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default DashboardHome;