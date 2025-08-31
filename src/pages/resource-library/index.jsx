import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import TabNavigation from './components/TabNavigation';
import ResourceSection from './components/ResourceSection';
import ResourceModal from './components/ResourceModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ResourceLibrary = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    type: [],
    difficulty: []
  });
  const [bookmarkedIds, setBookmarkedIds] = useState([1, 5, 8]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [modalType, setModalType] = useState('preview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for resources
  const mockResources = [
    {
      id: 1,
      title: "Salary Negotiation Email Templates",
      category: "Career Advancement",
      type: "template",
      difficulty: "Intermediate",
      description: "Professional email templates for requesting salary reviews, negotiating offers, and following up on compensation discussions.",
      downloadCount: 2847,
      estimatedTime: "15 min",
      isNew: false,
      popularity: 95
    },
    {
      id: 2,
      title: "Emergency Fund Calculator",
      category: "Financial Literacy",
      type: "calculator",
      difficulty: "Beginner",
      description: "Interactive calculator to determine your ideal emergency fund size based on monthly expenses and financial goals.",
      downloadCount: 4521,
      estimatedTime: "10 min",
      isNew: true,
      popularity: 98
    },
    {
      id: 3,
      title: "Home Maintenance Monthly Checklist",
      category: "Home Management",
      type: "checklist",
      difficulty: "Beginner",
      description: "Comprehensive monthly inspection checklist to prevent costly repairs and maintain your home\'s value.",
      downloadCount: 1893,
      estimatedTime: "30 min",
      isNew: false,
      popularity: 87
    },
    {
      id: 4,
      title: "Healthcare Insurance Benefits Decoder",
      category: "Healthcare Navigation",
      type: "guide",
      difficulty: "Advanced",
      description: "Step-by-step guide to understanding your health insurance benefits, deductibles, and maximizing coverage.",
      downloadCount: 1247,
      estimatedTime: "45 min",
      isNew: true,
      popularity: 82
    },
    {
      id: 5,
      title: "Professional Meeting Agenda Template",
      category: "Professional Communication",
      type: "template",
      difficulty: "Beginner",
      description: "Structured meeting agenda templates for different types of professional meetings and team discussions.",
      downloadCount: 3156,
      estimatedTime: "5 min",
      isNew: false,
      popularity: 91
    },
    {
      id: 6,
      title: "Credit Score Improvement 90-Day Plan",
      category: "Financial Literacy",
      type: "guide",
      difficulty: "Intermediate",
      description: "Actionable 90-day plan with weekly tasks to improve your credit score and financial health.",
      downloadCount: 2634,
      estimatedTime: "60 min",
      isNew: false,
      popularity: 94
    },
    {
      id: 7,
      title: "Networking Conversation Starters",
      category: "Professional Communication",
      type: "template",
      difficulty: "Beginner",
      description: "Collection of conversation starters and follow-up templates for professional networking events.",
      downloadCount: 1789,
      estimatedTime: "10 min",
      isNew: true,
      popularity: 78
    },
    {
      id: 8,
      title: "Basic Investment Portfolio Setup",
      category: "Financial Literacy",
      type: "guide",
      difficulty: "Advanced",
      description: "Comprehensive guide to setting up your first investment portfolio with risk assessment and diversification strategies.",
      downloadCount: 1456,
      estimatedTime: "90 min",
      isNew: false,
      popularity: 89
    },
    {
      id: 9,
      title: "Doctor Appointment Preparation Checklist",
      category: "Healthcare Navigation",
      type: "checklist",
      difficulty: "Beginner",
      description: "Essential checklist to prepare for doctor appointments and maximize your healthcare visits.",
      downloadCount: 987,
      estimatedTime: "15 min",
      isNew: true,
      popularity: 76
    },
    {
      id: 10,
      title: "Difficult Conversation Framework",
      category: "Professional Communication",
      type: "template",
      difficulty: "Advanced",
      description: "Structured framework and scripts for handling difficult workplace conversations with confidence.",
      downloadCount: 2341,
      estimatedTime: "20 min",
      isNew: false,
      popularity: 93
    }
  ];

  // Filter options
  const categories = [
    { value: "Financial Literacy", label: "Financial Literacy", count: 3 },
    { value: "Career Advancement", label: "Career Advancement", count: 1 },
    { value: "Home Management", label: "Home Management", count: 1 },
    { value: "Healthcare Navigation", label: "Healthcare Navigation", count: 2 },
    { value: "Professional Communication", label: "Professional Communication", count: 3 }
  ];

  const resourceTypes = [
    { value: "template", label: "Template", count: 4 },
    { value: "checklist", label: "Checklist", count: 2 },
    { value: "calculator", label: "Calculator", count: 1 },
    { value: "guide", label: "Guide", count: 3 }
  ];

  const difficultyLevels = [
    { value: "Beginner", label: "Beginner", count: 4 },
    { value: "Intermediate", label: "Intermediate", count: 2 },
    { value: "Advanced", label: "Advanced", count: 4 }
  ];

  // Filter resources based on active filters and search
  const getFilteredResources = () => {
    let filtered = mockResources;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(resource =>
        resource?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        resource?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        resource?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilters?.category?.length > 0) {
      filtered = filtered?.filter(resource =>
        activeFilters?.category?.includes(resource?.category)
      );
    }

    // Apply type filter
    if (activeFilters?.type?.length > 0) {
      filtered = filtered?.filter(resource =>
        activeFilters?.type?.includes(resource?.type)
      );
    }

    // Apply difficulty filter
    if (activeFilters?.difficulty?.length > 0) {
      filtered = filtered?.filter(resource =>
        activeFilters?.difficulty?.includes(resource?.difficulty)
      );
    }

    return filtered;
  };

  // Get resources based on active tab
  const getTabResources = () => {
    let filtered = getFilteredResources();

    switch (activeTab) {
      case 'favorites':
        return filtered?.filter(resource => bookmarkedIds?.includes(resource?.id));
      case 'recent':
        return filtered?.filter(resource => resource?.isNew)?.slice(0, 6);
      case 'popular':
        return filtered?.sort((a, b) => b?.popularity - a?.popularity)?.slice(0, 6);
      default:
        return filtered;
    }
  };

  const handleFilterChange = (filterType, values) => {
    if (filterType === 'clear') {
      setActiveFilters({
        category: [],
        type: [],
        difficulty: []
      });
    } else {
      setActiveFilters(prev => ({
        ...prev,
        [filterType]: values
      }));
    }
  };

  const handleDownload = async (resource) => {
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Downloaded:', resource?.title);
  };

  const handlePreview = (resource) => {
    setSelectedResource(resource);
    setModalType(resource?.type === 'calculator' ? 'calculator' : 'preview');
    setIsModalOpen(true);
  };

  const handleBookmark = (resource) => {
    setBookmarkedIds(prev => 
      prev?.includes(resource?.id)
        ? prev?.filter(id => id !== resource?.id)
        : [...prev, resource?.id]
    );
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const resources = getTabResources();
  const popularResources = mockResources?.sort((a, b) => b?.popularity - a?.popularity)?.slice(0, 3);
  const recentResources = mockResources?.filter(resource => resource?.isNew)?.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-18 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Breadcrumb */}
          <div className="py-4">
            <Breadcrumb />
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Library" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Resource Library
                </h1>
                <p className="text-muted-foreground">
                  Access templates, calculators, and guides for all your adulting needs
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                iconName="Filter"
                iconPosition="left"
                className="w-full"
              >
                Filters {Object.values(activeFilters)?.flat()?.length > 0 && 
                  `(${Object.values(activeFilters)?.flat()?.length})`}
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">Filters</h3>
                <FilterChips
                  categories={categories}
                  resourceTypes={resourceTypes}
                  difficultyLevels={difficultyLevels}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6">
                <div className="bg-card border border-border rounded-lg p-4">
                  <FilterChips
                    categories={categories}
                    resourceTypes={resourceTypes}
                    difficultyLevels={difficultyLevels}
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                  />
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Tab Navigation */}
              <TabNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                bookmarkedCount={bookmarkedIds?.length}
              />

              {/* Featured Sections - Only show on 'all' tab */}
              {activeTab === 'all' && !searchTerm && Object.values(activeFilters)?.flat()?.length === 0 && (
                <div className="space-y-8">
                  <ResourceSection
                    title="Most Popular"
                    subtitle="Top downloaded resources this month"
                    icon="TrendingUp"
                    resources={popularResources}
                    onDownload={handleDownload}
                    onPreview={handlePreview}
                    onBookmark={handleBookmark}
                    bookmarkedIds={bookmarkedIds}
                    showViewAll
                    onViewAll={() => setActiveTab('popular')}
                  />

                  <ResourceSection
                    title="Recently Added"
                    subtitle="New resources added this week"
                    icon="Clock"
                    resources={recentResources}
                    onDownload={handleDownload}
                    onPreview={handlePreview}
                    onBookmark={handleBookmark}
                    bookmarkedIds={bookmarkedIds}
                    showViewAll
                    onViewAll={() => setActiveTab('recent')}
                  />
                </div>
              )}

              {/* All Resources */}
              <div className="space-y-4">
                {activeTab !== 'all' || searchTerm || Object.values(activeFilters)?.flat()?.length > 0 ? (
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                      {activeTab === 'favorites' && 'My Favorites'}
                      {activeTab === 'recent' && 'Recently Added'}
                      {activeTab === 'popular' && 'Most Popular'}
                      {activeTab === 'all' && 'All Resources'}
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      {resources?.length} resource{resources?.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">All Resources</h2>
                    <span className="text-sm text-muted-foreground">
                      {mockResources?.length} total resources
                    </span>
                  </div>
                )}

                {resources?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {resources?.map((resource) => (
                      <div key={resource?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 group">
                        {/* Header with thumbnail and bookmark */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon 
                              name={resource?.type === 'template' ? 'FileText' : 
                                    resource?.type === 'checklist' ? 'CheckSquare' :
                                    resource?.type === 'calculator' ? 'Calculator' : 'BookOpen'} 
                              size={20} 
                              className="text-primary" 
                            />
                          </div>
                          <button
                            onClick={() => handleBookmark(resource)}
                            className={`p-1 rounded-md transition-colors duration-150 ${
                              bookmarkedIds?.includes(resource?.id)
                                ? 'text-warning hover:text-warning/80' :'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <Icon name={bookmarkedIds?.includes(resource?.id) ? 'Bookmark' : 'BookmarkPlus'} size={16} />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="space-y-2 mb-4">
                          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-150">
                            {resource?.title}
                          </h3>
                          
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                              {resource?.category}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                              resource?.difficulty === 'Beginner' ? 'bg-success text-success-foreground' :
                              resource?.difficulty === 'Intermediate' ? 'bg-warning text-warning-foreground' :
                              'bg-error text-error-foreground'
                            }`}>
                              {resource?.difficulty}
                            </span>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {resource?.description}
                          </p>

                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Icon name="Download" size={12} />
                              <span>{resource?.downloadCount?.toLocaleString()} downloads</span>
                            </div>
                            {resource?.estimatedTime && (
                              <div className="flex items-center space-x-1">
                                <Icon name="Clock" size={12} />
                                <span>{resource?.estimatedTime}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleDownload(resource)}
                            iconName="Download"
                            iconPosition="left"
                            className="flex-1"
                          >
                            Download PDF
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePreview(resource)}
                            iconName="Eye"
                            iconPosition="left"
                          >
                            Preview
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Search" size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No resources found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search terms or filters to find what you're looking for.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setActiveFilters({ category: [], type: [], difficulty: [] });
                        setActiveTab('all');
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Resource Modal */}
      <ResourceModal
        resource={selectedResource}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />
    </div>
  );
};

export default ResourceLibrary;