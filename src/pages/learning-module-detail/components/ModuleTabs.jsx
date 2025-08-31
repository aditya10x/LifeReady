import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ModuleTabs = ({ activeTab, onTabChange, tabsData }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'steps', label: 'Steps', icon: 'CheckSquare' },
    { id: 'resources', label: 'Resources', icon: 'Download' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg mb-6">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-150 ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              {tab?.id === 'steps' && tabsData?.stepsCount && (
                <span className="ml-1 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                  {tabsData?.stepsCount}
                </span>
              )}
              {tab?.id === 'resources' && tabsData?.resourcesCount && (
                <span className="ml-1 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                  {tabsData?.resourcesCount}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <OverviewTab data={tabsData?.overview} />
        )}
        {activeTab === 'steps' && (
          <StepsTab data={tabsData?.steps} />
        )}
        {activeTab === 'resources' && (
          <ResourcesTab data={tabsData?.resources} />
        )}
        {activeTab === 'progress' && (
          <ProgressTab data={tabsData?.progress} />
        )}
      </div>
    </div>
  );
};

const OverviewTab = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Learning Objectives */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="Target" size={20} />
          Learning Objectives
        </h3>
        <ul className="space-y-2">
          {data?.objectives?.map((objective, index) => (
            <li key={index} className="flex items-start gap-3">
              <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{objective}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Required Materials */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="Package" size={20} />
          Required Materials
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data?.materials?.map((material, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Icon name={material?.icon} size={18} className="text-primary flex-shrink-0" />
              <div>
                <div className="font-medium text-foreground">{material?.name}</div>
                {material?.description && (
                  <div className="text-sm text-muted-foreground">{material?.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Success Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="Award" size={20} />
          Success Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data?.metrics?.map((metric, index) => (
            <div key={index} className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="text-2xl font-bold text-primary mb-1">{metric?.value}</div>
              <div className="text-sm text-muted-foreground">{metric?.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StepsTab = ({ data }) => {
  const [expandedSteps, setExpandedSteps] = useState(new Set([0]));

  const toggleStep = (stepIndex) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded?.has(stepIndex)) {
      newExpanded?.delete(stepIndex);
    } else {
      newExpanded?.add(stepIndex);
    }
    setExpandedSteps(newExpanded);
  };

  if (!data) return null;

  return (
    <div className="space-y-4">
      {data?.map((step, index) => (
        <div key={index} className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleStep(index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors duration-150"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step?.completed 
                  ? 'bg-success text-success-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step?.completed ? <Icon name="Check" size={16} /> : index + 1}
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{step?.title}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    {step?.estimatedTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="CheckSquare" size={14} />
                    {step?.subtasks?.length || 0} tasks
                  </span>
                </div>
              </div>
            </div>
            <Icon 
              name={expandedSteps?.has(index) ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-muted-foreground" 
            />
          </button>

          {expandedSteps?.has(index) && (
            <div className="border-t border-border p-4 bg-muted/20">
              <p className="text-muted-foreground mb-4">{step?.description}</p>
              
              {step?.subtasks && step?.subtasks?.length > 0 && (
                <div className="space-y-3">
                  <h5 className="font-medium text-foreground">Tasks:</h5>
                  {step?.subtasks?.map((subtask, subtaskIndex) => (
                    <label key={subtaskIndex} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={subtask?.completed}
                        className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                      />
                      <div className="flex-1">
                        <span className={`${subtask?.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {subtask?.task}
                        </span>
                        {subtask?.tip && (
                          <div className="mt-1 text-sm text-muted-foreground italic">
                            💡 {subtask?.tip}
                          </div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {step?.tools && step?.tools?.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <h5 className="font-medium text-foreground mb-2">Tools & Resources:</h5>
                  <div className="flex flex-wrap gap-2">
                    {step?.tools?.map((tool, toolIndex) => (
                      <span key={toolIndex} className="px-2 py-1 bg-accent/10 text-accent text-sm rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ResourcesTab = ({ data }) => {
  if (!data) return null;

  const handleDownload = (resource) => {
    // Mock download functionality
    console.log(`Downloading ${resource?.name}`);
  };

  return (
    <div className="space-y-6">
      {Object.entries(data)?.map(([category, resources]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-foreground mb-4 capitalize">
            {category?.replace(/([A-Z])/g, ' $1')?.trim()}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources?.map((resource, index) => (
              <div key={index} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-150">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={resource?.icon} size={20} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground mb-1">{resource?.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{resource?.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="FileText" size={12} />
                          {resource?.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Download" size={12} />
                          {resource?.downloads}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDownload(resource)}
                        className="text-primary hover:text-primary/80 text-sm font-medium"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ProgressTab = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Overall Progress</h3>
          <span className="text-2xl font-bold text-primary">{data?.overallProgress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 mb-4">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${data?.overallProgress}%` }}
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-foreground">{data?.completedSteps}</div>
            <div className="text-sm text-muted-foreground">Steps Done</div>
          </div>
          <div>
            <div className="text-xl font-bold text-foreground">{data?.totalSteps}</div>
            <div className="text-sm text-muted-foreground">Total Steps</div>
          </div>
          <div>
            <div className="text-xl font-bold text-foreground">{data?.timeSpent}</div>
            <div className="text-sm text-muted-foreground">Time Spent</div>
          </div>
          <div>
            <div className="text-xl font-bold text-foreground">{data?.estimatedRemaining}</div>
            <div className="text-sm text-muted-foreground">Time Left</div>
          </div>
        </div>
      </div>
      {/* Achievements */}
      {data?.achievements && data?.achievements?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Achievements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.achievements?.map((achievement, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                achievement?.unlocked 
                  ? 'bg-success/5 border-success/20' :'bg-muted/50 border-border'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  <Icon 
                    name={achievement?.icon} 
                    size={24} 
                    className={achievement?.unlocked ? 'text-success' : 'text-muted-foreground'} 
                  />
                  <div>
                    <h4 className={`font-semibold ${
                      achievement?.unlocked ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {achievement?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{achievement?.description}</p>
                  </div>
                </div>
                {achievement?.unlocked && (
                  <div className="text-xs text-success font-medium">
                    Unlocked on {achievement?.unlockedDate}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Learning Streak */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Flame" size={20} className="text-warning" />
          Learning Streak
        </h3>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-warning">{data?.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{data?.longestStreak}</div>
            <div className="text-sm text-muted-foreground">Longest Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">{data?.totalDays}</div>
            <div className="text-sm text-muted-foreground">Total Days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleTabs;