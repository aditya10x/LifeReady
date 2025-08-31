import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ModuleHeader from './components/ModuleHeader';
import ModuleTabs from './components/ModuleTabs';
import SidebarNavigation from './components/SidebarNavigation';
import InteractiveCalculator from './components/InteractiveCalculator';
import VideoPlaceholder, { VideoPlaylist } from './components/VideoPlaceholder';
import SocialSharing, { AchievementCelebration } from './components/SocialSharing';



const LearningModuleDetail = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeStep, setActiveStep] = useState(0);
  const [userProgress, setUserProgress] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedAchievement, setCompletedAchievement] = useState(null);

  // Mock module data
  const moduleData = {
    id: 'salary-negotiation',
    title: 'Master Salary Negotiation',
    description: `Learn proven strategies to negotiate your salary with confidence. This comprehensive module covers market research, preparation techniques, conversation scripts, and follow-up strategies to help you secure the compensation you deserve.`,
    icon: 'TrendingUp',
    difficulty: 'Intermediate',
    estimatedTime: '2-3 hours',
    enrolledCount: '12,847',
    totalSteps: 8,
    prerequisites: ['Basic Career Planning', 'Professional Communication Basics'],
    steps: [
      {
        id: 1,
        title: 'Research Market Rates',
        description: 'Learn how to research and benchmark your role against market standards using multiple data sources.',
        estimatedTime: '30 min',
        completed: true,
        subtasks: [
          { task: 'Use salary comparison websites (Glassdoor, PayScale, Salary.com)', completed: true, tip: 'Check multiple sources for accuracy' },
          { task: 'Research company-specific salary data', completed: true, tip: 'Look for recent reviews and salary reports' },
          { task: 'Network with industry professionals', completed: false, tip: 'LinkedIn is great for connecting with peers' },
          { task: 'Document your findings in a spreadsheet', completed: false, tip: 'Include source, date, and salary range' }
        ],
        tools: ['Salary Calculator', 'Market Research Template', 'Networking Scripts']
      },
      {
        id: 2,
        title: 'Document Your Achievements',
        description: 'Create a comprehensive record of your accomplishments, quantifying your impact wherever possible.',
        estimatedTime: '45 min',
        completed: true,
        subtasks: [
          { task: 'List major projects and their outcomes', completed: true, tip: 'Focus on measurable results' },
          { task: 'Quantify your contributions with numbers', completed: false, tip: 'Use percentages, dollar amounts, time saved' },
          { task: 'Gather performance reviews and feedback', completed: false, tip: 'Include both formal and informal feedback' },
          { task: 'Create an achievement portfolio', completed: false, tip: 'Organize by impact and relevance' }
        ],
        tools: ['Achievement Template', 'Impact Calculator', 'Portfolio Builder']
      },
      {
        id: 3,
        title: 'Prepare Your Negotiation Strategy',
        description: 'Develop a clear strategy including your target range, minimum acceptable offer, and negotiation tactics.',
        estimatedTime: '25 min',
        completed: false,
        subtasks: [
          { task: 'Set your target salary range', completed: false, tip: 'Aim 10-20% above current market rate' },
          { task: 'Determine your walk-away point', completed: false, tip: 'Know your minimum before you start' },
          { task: 'Plan your negotiation timeline', completed: false, tip: 'Consider performance review cycles' },
          { task: 'Prepare for common objections', completed: false, tip: 'Have responses ready for budget constraints' }
        ],
        tools: ['Strategy Planner', 'Objection Handler', 'Timeline Template']
      },
      {
        id: 4,
        title: 'Practice Conversation Scripts',
        description: 'Master the art of salary negotiation conversations with proven scripts and practice scenarios.',
        estimatedTime: '40 min',
        completed: false,
        subtasks: [
          { task: 'Learn opening conversation techniques', completed: false, tip: 'Start with appreciation and context' },
          { task: 'Practice presenting your case', completed: false, tip: 'Use the STAR method for examples' },
          { task: 'Master handling counteroffers', completed: false, tip: 'Always ask for time to consider' },
          { task: 'Role-play with a trusted friend', completed: false, tip: 'Practice until it feels natural' }
        ],
        tools: ['Conversation Scripts', 'Practice Scenarios', 'Feedback Forms']
      },
      {
        id: 5,
        title: 'Schedule the Negotiation Meeting',
        description: 'Learn the best practices for timing and setting up your salary negotiation conversation.',
        estimatedTime: '15 min',
        completed: false,
        subtasks: [
          { task: 'Choose optimal timing for the request', completed: false, tip: 'After successful projects or reviews' },
          { task: 'Request a formal meeting', completed: false, tip: 'Give your manager time to prepare' },
          { task: 'Prepare your materials and notes', completed: false, tip: 'Bring printed copies of key documents' },
          { task: 'Set the right tone and environment', completed: false, tip: 'Choose a private, comfortable setting' }
        ],
        tools: ['Meeting Request Template', 'Preparation Checklist', 'Environment Guide']
      },
      {
        id: 6,
        title: 'Conduct the Negotiation',
        description: 'Execute your negotiation strategy with confidence, professionalism, and strategic thinking.',
        estimatedTime: '30 min',
        completed: false,
        subtasks: [
          { task: 'Present your case clearly and confidently', completed: false, tip: 'Stick to facts and achievements' },
          { task: 'Listen actively to feedback and concerns', completed: false, tip: 'Show you value their perspective' },
          { task: 'Negotiate beyond just salary', completed: false, tip: 'Consider benefits, PTO, flexibility' },
          { task: 'Maintain professionalism throughout', completed: false, tip: 'Stay positive regardless of outcome' }
        ],
        tools: ['Negotiation Checklist', 'Active Listening Guide', 'Benefits Calculator']
      },
      {
        id: 7,
        title: 'Handle the Response',
        description: 'Navigate different types of responses professionally, whether positive, negative, or somewhere in between.',
        estimatedTime: '20 min',
        completed: false,
        subtasks: [
          { task: 'Respond gracefully to any outcome', completed: false, tip: 'Thank them regardless of the decision' },
          { task: 'Ask for specific feedback if declined', completed: false, tip: 'Understand what you need to improve' },
          { task: 'Negotiate implementation timeline', completed: false, tip: 'Get clarity on when changes take effect' },
          { task: 'Document the conversation outcomes', completed: false, tip: 'Keep records for future reference' }
        ],
        tools: ['Response Scripts', 'Feedback Forms', 'Documentation Template']
      },
      {
        id: 8,
        title: 'Follow Up and Plan Next Steps',
        description: 'Ensure proper follow-through and set yourself up for future success in salary negotiations.',
        estimatedTime: '15 min',
        completed: false,
        subtasks: [
          { task: 'Send a thank-you email within 24 hours', completed: false, tip: 'Reiterate key points discussed' },
          { task: 'Track progress on agreed-upon changes', completed: false, tip: 'Set calendar reminders for follow-ups' },
          { task: 'Plan your next career development steps', completed: false, tip: 'Use feedback to guide growth' },
          { task: 'Schedule regular salary review check-ins', completed: false, tip: 'Make it an ongoing conversation' }
        ],
        tools: ['Follow-up Templates', 'Progress Tracker', 'Career Planning Guide']
      }
    ]
  };

  // Mock user progress
  useEffect(() => {
    setUserProgress({
      completedSteps: 2,
      currentStep: 2,
      timeSpent: '1h 15m',
      lastAccessed: new Date()?.toISOString()
    });
  }, []);

  // Mock tab data
  const tabsData = {
    stepsCount: moduleData?.steps?.length,
    resourcesCount: 24,
    overview: {
      objectives: [
        'Research and benchmark your current salary against market rates',
        'Document and quantify your professional achievements effectively',
        'Develop a strategic approach to salary negotiation conversations',
        'Master proven scripts and techniques for negotiation success',
        'Handle various responses and outcomes professionally',
        'Create a sustainable system for ongoing salary growth'
      ],
      materials: [
        { name: 'Salary Research Spreadsheet', description: 'Track market data from multiple sources', icon: 'FileSpreadsheet' },
        { name: 'Achievement Documentation', description: 'Template for recording accomplishments', icon: 'Award' },
        { name: 'Negotiation Scripts', description: 'Proven conversation starters and responses', icon: 'MessageSquare' },
        { name: 'Practice Scenarios', description: 'Role-play exercises for confidence building', icon: 'Users' },
        { name: 'Follow-up Templates', description: 'Professional email templates for after negotiation', icon: 'Mail' },
        { name: 'Benefits Calculator', description: 'Tool to evaluate total compensation packages', icon: 'Calculator' }
      ],
      metrics: [
        { label: 'Average Salary Increase', value: '15-25%' },
        { label: 'Success Rate', value: '78%' },
        { label: 'Completion Time', value: '2-3 hrs' }
      ]
    },
    steps: moduleData?.steps,
    resources: {
      templates: [
        { name: 'Salary Research Template', description: 'Comprehensive spreadsheet for market analysis', type: 'Excel', downloads: '3.2k', icon: 'FileSpreadsheet' },
        { name: 'Achievement Portfolio', description: 'Professional template for documenting accomplishments', type: 'Word', downloads: '2.8k', icon: 'Award' },
        { name: 'Negotiation Email Scripts', description: 'Ready-to-use email templates for all scenarios', type: 'PDF', downloads: '4.1k', icon: 'Mail' },
        { name: 'Benefits Comparison Sheet', description: 'Compare total compensation packages', type: 'Excel', downloads: '1.9k', icon: 'BarChart' }
      ],
      checklists: [
        { name: 'Pre-Negotiation Checklist', description: 'Ensure you\'re fully prepared before the conversation', type: 'PDF', downloads: '5.3k', icon: 'CheckSquare' },
        { name: 'Meeting Preparation Guide', description: 'Step-by-step preparation for the negotiation meeting', type: 'PDF', downloads: '3.7k', icon: 'ClipboardList' },
        { name: 'Post-Negotiation Actions', description: 'Follow-up steps after your negotiation', type: 'PDF', downloads: '2.4k', icon: 'CheckCircle' }
      ],
      calculators: [
        { name: 'Salary Negotiation Calculator', description: 'Calculate your target salary range based on market data', type: 'Web Tool', downloads: '8.1k', icon: 'Calculator' },
        { name: 'Total Compensation Calculator', description: 'Evaluate the full value of job offers', type: 'Web Tool', downloads: '6.2k', icon: 'DollarSign' },
        { name: 'Cost of Living Adjuster', description: 'Adjust salary expectations for different locations', type: 'Web Tool', downloads: '4.5k', icon: 'MapPin' }
      ]
    },
    progress: {
      overallProgress: 25,
      completedSteps: 2,
      totalSteps: 8,
      timeSpent: '1h 15m',
      estimatedRemaining: '1h 45m',
      currentStreak: 3,
      longestStreak: 7,
      totalDays: 12,
      achievements: [
        { title: 'Research Master', description: 'Completed market research phase', icon: 'Search', unlocked: true, unlockedDate: '2025-08-29' },
        { title: 'Achievement Hunter', description: 'Documented 10+ professional accomplishments', icon: 'Target', unlocked: true, unlockedDate: '2025-08-30' },
        { title: 'Strategy Planner', description: 'Developed comprehensive negotiation strategy', icon: 'Map', unlocked: false },
        { title: 'Conversation Master', description: 'Completed all practice scenarios', icon: 'MessageCircle', unlocked: false },
        { title: 'Negotiation Ninja', description: 'Successfully completed first salary negotiation', icon: 'Award', unlocked: false },
        { title: 'Growth Mindset', description: 'Completed 3 salary negotiation modules', icon: 'TrendingUp', unlocked: false }
      ]
    }
  };

  // Mock video data
  const videoData = [
    {
      title: 'Introduction to Salary Negotiation',
      duration: '8:32',
      description: 'Overview of the salary negotiation process and mindset preparation',
      comingSoon: true
    },
    {
      title: 'Market Research Techniques',
      duration: '12:45',
      description: 'Step-by-step guide to researching salary data effectively',
      comingSoon: true
    },
    {
      title: 'Building Your Achievement Portfolio',
      duration: '15:20',
      description: 'How to document and present your professional accomplishments',
      comingSoon: true
    },
    {
      title: 'Negotiation Conversation Practice',
      duration: '18:15',
      description: 'Real-world examples and practice scenarios',
      comingSoon: true
    },
    {
      title: 'Handling Difficult Responses',
      duration: '10:30',
      description: 'Professional strategies for challenging negotiation outcomes',
      comingSoon: true
    }
  ];

  const handleStartContinue = () => {
    setActiveTab('steps');
    if (userProgress && userProgress?.currentStep < moduleData?.steps?.length) {
      setActiveStep(userProgress?.currentStep);
    }
  };

  const handleStepClick = (stepIndex) => {
    setActiveStep(stepIndex);
  };

  const handleStepComplete = (stepIndex) => {
    // Mock step completion logic
    const updatedSteps = [...moduleData?.steps];
    updatedSteps[stepIndex].completed = true;
    
    // Check for achievements
    const completedCount = updatedSteps?.filter(step => step?.completed)?.length;
    if (completedCount === 3 && !tabsData?.progress?.achievements?.[2]?.unlocked) {
      setCompletedAchievement('Strategy Planner');
      setShowCelebration(true);
    }
    
    setUserProgress(prev => ({
      ...prev,
      completedSteps: completedCount,
      currentStep: Math.min(stepIndex + 1, moduleData?.steps?.length - 1)
    }));
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/dashboard-home', icon: 'LayoutDashboard' },
    { label: 'Skills', path: '/skill-category-overview', icon: 'BookOpen' },
    { label: 'Salary Negotiation', path: '/learning-module-detail', icon: 'TrendingUp', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-18 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="py-6">
            <Breadcrumb customItems={breadcrumbItems} />
            
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Main Content */}
              <div className="xl:col-span-3 space-y-6">
                <ModuleHeader
                  module={moduleData}
                  onStartContinue={handleStartContinue}
                  userProgress={userProgress}
                />

                <ModuleTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  tabsData={tabsData}
                />

                {/* Interactive Elements */}
                {activeTab === 'steps' && (
                  <div className="space-y-6">
                    {/* Salary Calculator */}
                    <InteractiveCalculator
                      type="salaryNegotiation"
                      onCalculate={(result) => console.log('Salary calculation:', result)}
                    />

                    {/* Video Tutorials */}
                    <VideoPlaylist videos={videoData} />
                  </div>
                )}

                {/* Social Sharing */}
                <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Share Your Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      Celebrate your learning journey with your network
                    </p>
                  </div>
                  <SocialSharing
                    moduleTitle={moduleData?.title}
                    progress={tabsData?.progress?.overallProgress}
                    achievement={completedAchievement}
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="xl:col-span-1">
                <SidebarNavigation
                  module={moduleData}
                  activeStep={activeStep}
                  onStepClick={handleStepClick}
                  className="hidden xl:block"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Achievement Celebration Modal */}
      <AchievementCelebration
        achievement={completedAchievement}
        isVisible={showCelebration}
        onClose={() => {
          setShowCelebration(false);
          setCompletedAchievement(null);
        }}
        onShare={() => {
          setShowCelebration(false);
          // Trigger social sharing
        }}
      />
      {/* Mobile Bottom Navigation Spacer */}
      <div className="h-16 lg:hidden" />
    </div>
  );
};

export default LearningModuleDetail;