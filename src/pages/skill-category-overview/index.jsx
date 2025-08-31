import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CategoryHero from './components/CategoryHero';
import FilterChips from './components/FilterChips';
import SearchBar from './components/SearchBar';
import ModuleCard from './components/ModuleCard';
import SuccessStories from './components/SuccessStories';
import CategorySidebar from './components/CategorySidebar';
import Icon from '../../components/AppIcon';

const SkillCategoryOverview = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTimeCommitment, setSelectedTimeCommitment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for categories
  const categories = [
    {
      id: 'financial-literacy',
      title: 'Financial Literacy',
      description: 'Master your money with practical skills for budgeting, investing, and building wealth. Learn to make informed financial decisions that secure your future.',
      icon: 'DollarSign',
      bgColor: 'bg-success',
      estimatedTime: '8-12 hours',
      enrolledUsers: '2,847',
      moduleCount: 8
    },
    {
      id: 'career-advancement',
      title: 'Career Advancement',
      description: 'Accelerate your professional growth with negotiation tactics, networking strategies, and leadership skills that get you noticed and promoted.',
      icon: 'TrendingUp',
      bgColor: 'bg-primary',
      estimatedTime: '6-10 hours',
      enrolledUsers: '3,156',
      moduleCount: 6
    },
    {
      id: 'home-management',
      title: 'Home Management',
      description: 'Transform your living space into an organized, efficient home. Learn maintenance, organization, and management skills for independent living.',
      icon: 'Home',
      bgColor: 'bg-accent',
      estimatedTime: '4-8 hours',
      enrolledUsers: '1,923',
      moduleCount: 5
    },
    {
      id: 'healthcare-navigation',
      title: 'Healthcare Navigation',
      description: 'Navigate the complex healthcare system with confidence. Understand insurance, find quality care, and advocate for your health needs.',
      icon: 'Heart',
      bgColor: 'bg-error',
      estimatedTime: '3-6 hours',
      enrolledUsers: '1,654',
      moduleCount: 4
    },
    {
      id: 'professional-communication',
      title: 'Professional Communication',
      description: 'Master the art of professional communication. From emails to presentations, learn to communicate with clarity, confidence, and impact.',
      icon: 'MessageSquare',
      bgColor: 'bg-secondary',
      estimatedTime: '5-8 hours',
      enrolledUsers: '2,341',
      moduleCount: 7
    }
  ];

  // Get current category from location state or default to first category
  const currentCategory = location?.state?.category || categories?.[0];

  // Mock data for modules based on current category
  const allModules = {
    'financial-literacy': [
      {
        id: 1,
        title: 'Emergency Fund Essentials',
        description: 'Build a solid financial foundation with a properly sized emergency fund. Learn how much to save, where to keep it, and when to use it.',
        difficulty: 'beginner',
        estimatedTime: '25 min',
        timeCommitment: 'quick',
        status: 'completed',
        thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
        enrolledCount: 1247,
        rating: 4.8,
        lessonsCount: 4,
        progress: 100,
        completedLessons: 4,
        achievementBadge: true
      },
      {
        id: 2,
        title: 'Credit Score Mastery',
        description: 'Understand and improve your credit score with proven strategies. Learn what affects your score and how to optimize it for better rates.',
        difficulty: 'intermediate',
        estimatedTime: '45 min',
        timeCommitment: 'deep',
        status: 'in-progress',
        thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
        enrolledCount: 892,
        rating: 4.7,
        lessonsCount: 6,
        progress: 67,
        completedLessons: 4
      },
      {
        id: 3,
        title: 'Investment Fundamentals',
        description: 'Start your investment journey with confidence. Learn about different investment types, risk management, and building a diversified portfolio.',
        difficulty: 'intermediate',
        estimatedTime: '55 min',
        timeCommitment: 'deep',
        status: 'not-started',
        thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
        enrolledCount: 1156,
        rating: 4.9,
        lessonsCount: 8
      },
      {
        id: 4,
        title: 'Advanced Tax Strategies',
        description: 'Maximize your tax efficiency with advanced planning strategies. Learn about deductions, credits, and long-term tax optimization.',
        difficulty: 'advanced',
        estimatedTime: '60 min',
        timeCommitment: 'deep',
        status: 'locked',
        thumbnail: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=400&h=300&fit=crop',
        enrolledCount: 634,
        rating: 4.6,
        lessonsCount: 10,
        prerequisites: ['Investment Fundamentals', 'Credit Score Mastery']
      },
      {
        id: 5,
        title: 'Budget Like a Pro',
        description: 'Create and maintain a budget that actually works. Learn different budgeting methods and find the one that fits your lifestyle.',
        difficulty: 'beginner',
        estimatedTime: '30 min',
        timeCommitment: 'quick',
        status: 'not-started',
        thumbnail: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400&h=300&fit=crop',
        enrolledCount: 1834,
        rating: 4.5,
        lessonsCount: 5
      },
      {
        id: 6,
        title: 'Retirement Planning 101',
        description: 'Start planning for retirement early with smart strategies. Understand 401(k)s, IRAs, and how compound interest works in your favor.',
        difficulty: 'intermediate',
        estimatedTime: '50 min',
        timeCommitment: 'deep',
        status: 'not-started',
        thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop',
        enrolledCount: 967,
        rating: 4.8,
        lessonsCount: 7
      }
    ],
    'career-advancement': [
      {
        id: 7,
        title: 'Salary Negotiation Mastery',
        description: 'Learn proven techniques to negotiate your worth. Get scripts, research methods, and confidence-building strategies for better compensation.',
        difficulty: 'intermediate',
        estimatedTime: '40 min',
        timeCommitment: 'deep',
        status: 'completed',
        thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop',
        enrolledCount: 2156,
        rating: 4.9,
        lessonsCount: 6,
        progress: 100,
        completedLessons: 6,
        achievementBadge: true
      },
      {
        id: 8,
        title: 'Professional Networking',
        description: 'Build meaningful professional relationships that advance your career. Learn networking strategies that feel natural and authentic.',
        difficulty: 'beginner',
        estimatedTime: '35 min',
        timeCommitment: 'quick',
        status: 'in-progress',
        thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
        enrolledCount: 1743,
        rating: 4.7,
        lessonsCount: 5,
        progress: 40,
        completedLessons: 2
      },
      {
        id: 9,
        title: 'Leadership Fundamentals',
        description: 'Develop essential leadership skills that get you noticed. Learn to influence, motivate, and guide teams toward success.',
        difficulty: 'advanced',
        estimatedTime: '60 min',
        timeCommitment: 'deep',
        status: 'locked',
        thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
        enrolledCount: 892,
        rating: 4.8,
        lessonsCount: 9,
        prerequisites: ['Professional Networking', 'Salary Negotiation Mastery']
      }
    ]
  };

  // Get modules for current category
  const categoryModules = allModules?.[currentCategory?.id] || allModules?.['financial-literacy'];

  // Success stories data
  const successStories = [
    {
      name: 'Sarah Chen',
      role: 'Marketing Manager',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      testimonial: `The ${currentCategory?.title?.toLowerCase()} modules completely transformed my approach. The step-by-step guidance made complex topics feel manageable and actionable.`,
      achievement: '$15K salary increase',
      timeframe: '6 months',
      modulesCompleted: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Software Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      testimonial: `I went from feeling overwhelmed to confident in just a few weeks. The practical templates and real-world examples made all the difference in my success.`,
      achievement: 'Promoted to Senior Role',
      timeframe: '4 months',
      modulesCompleted: 7
    }
  ];

  // Filter modules based on search and filters
  const filteredModules = useMemo(() => {
    return categoryModules?.filter(module => {
      const matchesSearch = module.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           module.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesDifficulty = selectedDifficulty === 'all' || module.difficulty === selectedDifficulty;
      
      const matchesTimeCommitment = selectedTimeCommitment === 'all' || 
                                   (selectedTimeCommitment === 'quick' && module.timeCommitment === 'quick') ||
                                   (selectedTimeCommitment === 'deep' && module.timeCommitment === 'deep');
      
      const matchesStatus = selectedStatus === 'all' || module.status === selectedStatus;

      return matchesSearch && matchesDifficulty && matchesTimeCommitment && matchesStatus;
    });
  }, [categoryModules, searchTerm, selectedDifficulty, selectedTimeCommitment, selectedStatus]);

  // Calculate progress stats
  const totalModules = categoryModules?.length;
  const completedModules = categoryModules?.filter(m => m?.status === 'completed')?.length;
  const progress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  const handleClearFilters = () => {
    setSelectedDifficulty('all');
    setSelectedTimeCommitment('all');
    setSelectedStatus('all');
    setSearchTerm('');
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard-home', icon: 'LayoutDashboard' },
    { label: 'Skills', path: '/skill-category-overview', icon: 'BookOpen' },
    { label: currentCategory?.title, path: '/skill-category-overview', icon: currentCategory?.icon, isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 lg:pt-18 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex gap-8">
            {/* Sidebar */}
            <CategorySidebar 
              categories={categories} 
              currentCategory={currentCategory} 
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <Breadcrumb customItems={breadcrumbItems} />
              
              <CategoryHero 
                category={currentCategory}
                progress={progress}
                totalModules={totalModules}
                completedModules={completedModules}
              />

              <SearchBar 
                onSearch={setSearchTerm}
                placeholder={`Search ${currentCategory?.title?.toLowerCase()} modules...`}
              />

              <FilterChips
                selectedDifficulty={selectedDifficulty}
                selectedTimeCommitment={selectedTimeCommitment}
                selectedStatus={selectedStatus}
                onDifficultyChange={setSelectedDifficulty}
                onTimeCommitmentChange={setSelectedTimeCommitment}
                onStatusChange={setSelectedStatus}
                onClearFilters={handleClearFilters}
              />

              {/* Results Summary */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Icon name="BookOpen" size={18} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {filteredModules?.length} of {totalModules} modules
                    {searchTerm && ` matching "${searchTerm}"`}
                  </span>
                </div>
                
                {filteredModules?.length > 0 && (
                  <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Beginner</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <span>Intermediate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-error rounded-full"></div>
                      <span>Advanced</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Module Grid */}
              {filteredModules?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {filteredModules?.map((module) => (
                    <ModuleCard key={module.id} module={module} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No modules found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              <SuccessStories 
                stories={successStories} 
                categoryTitle={currentCategory?.title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCategoryOverview;