import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const InteractiveCalculator = ({ type, onCalculate, className = '' }) => {
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const calculatorConfigs = {
    emergencyFund: {
      title: 'Emergency Fund Calculator',
      icon: 'Shield',
      description: 'Calculate how much you should save for emergencies',
      inputs: [
        { key: 'monthlyExpenses', label: 'Monthly Expenses', type: 'number', placeholder: '3000', required: true },
        { key: 'currentSavings', label: 'Current Emergency Savings', type: 'number', placeholder: '1000', required: true },
        { key: 'targetMonths', label: 'Target Months Coverage', type: 'number', placeholder: '6', required: true }
      ],
      calculate: (data) => {
        const target = data?.monthlyExpenses * data?.targetMonths;
        const remaining = Math.max(0, target - data?.currentSavings);
        const monthsToSave = remaining > 0 ? Math.ceil(remaining / (data?.monthlyExpenses * 0.1)) : 0;
        
        return {
          targetAmount: target,
          currentAmount: data?.currentSavings,
          remainingAmount: remaining,
          monthsToReach: monthsToSave,
          monthlySavingNeeded: remaining > 0 ? Math.ceil(remaining / monthsToSave) : 0,
          progressPercentage: Math.round((data?.currentSavings / target) * 100)
        };
      }
    },
    salaryNegotiation: {
      title: 'Salary Negotiation Calculator',
      icon: 'TrendingUp',
      description: 'Calculate your target salary range for negotiations',
      inputs: [
        { key: 'currentSalary', label: 'Current Annual Salary', type: 'number', placeholder: '65000', required: true },
        { key: 'marketRate', label: 'Market Rate (Annual)', type: 'number', placeholder: '75000', required: true },
        { key: 'experienceYears', label: 'Years of Experience', type: 'number', placeholder: '3', required: true },
        { key: 'performanceRating', label: 'Performance Rating (1-5)', type: 'number', placeholder: '4', min: 1, max: 5, required: true }
      ],
      calculate: (data) => {
        const baseIncrease = (data?.marketRate - data?.currentSalary) * 0.8;
        const experienceBonus = data?.experienceYears * 1000;
        const performanceBonus = (data?.performanceRating - 3) * 2000;
        
        const targetSalary = data?.currentSalary + baseIncrease + experienceBonus + performanceBonus;
        const minTarget = targetSalary * 0.9;
        const maxTarget = targetSalary * 1.1;
        const increasePercentage = ((targetSalary - data?.currentSalary) / data?.currentSalary) * 100;
        
        return {
          targetSalary: Math.round(targetSalary),
          minTarget: Math.round(minTarget),
          maxTarget: Math.round(maxTarget),
          increaseAmount: Math.round(targetSalary - data?.currentSalary),
          increasePercentage: Math.round(increasePercentage),
          monthlyIncrease: Math.round((targetSalary - data?.currentSalary) / 12)
        };
      }
    },
    budgetPlanner: {
      title: 'Monthly Budget Planner',
      icon: 'PieChart',
      description: 'Plan your monthly budget using the 50/30/20 rule',
      inputs: [
        { key: 'monthlyIncome', label: 'Monthly After-Tax Income', type: 'number', placeholder: '5000', required: true },
        { key: 'currentNeeds', label: 'Current Needs Spending', type: 'number', placeholder: '2200', required: false },
        { key: 'currentWants', label: 'Current Wants Spending', type: 'number', placeholder: '1800', required: false }
      ],
      calculate: (data) => {
        const needs = data?.monthlyIncome * 0.5;
        const wants = data?.monthlyIncome * 0.3;
        const savings = data?.monthlyIncome * 0.2;
        
        const needsVariance = data?.currentNeeds ? data?.currentNeeds - needs : 0;
        const wantsVariance = data?.currentWants ? data?.currentWants - wants : 0;
        
        return {
          recommendedNeeds: Math.round(needs),
          recommendedWants: Math.round(wants),
          recommendedSavings: Math.round(savings),
          needsVariance: Math.round(needsVariance),
          wantsVariance: Math.round(wantsVariance),
          totalBudget: data?.monthlyIncome,
          isOverBudget: (data?.currentNeeds || 0) + (data?.currentWants || 0) > data?.monthlyIncome * 0.8
        };
      }
    }
  };

  const config = calculatorConfigs?.[type];

  const handleInputChange = (key, value) => {
    setInputs(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  const handleCalculate = () => {
    const requiredInputs = config?.inputs?.filter(input => input?.required);
    const hasAllRequired = requiredInputs?.every(input => inputs?.[input?.key] && inputs?.[input?.key] > 0);
    
    if (!hasAllRequired) {
      alert('Please fill in all required fields');
      return;
    }

    const calculatedResult = config?.calculate(inputs);
    setResult(calculatedResult);
    setShowResult(true);
    
    if (onCalculate) {
      onCalculate(calculatedResult);
    }
  };

  const handleReset = () => {
    setInputs({});
    setResult(null);
    setShowResult(false);
  };

  if (!config) return null;

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name={config?.icon} size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{config?.title}</h3>
          <p className="text-sm text-muted-foreground">{config?.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Input Details</h4>
          {config?.inputs?.map((input) => (
            <Input
              key={input?.key}
              label={input?.label}
              type={input?.type}
              placeholder={input?.placeholder}
              value={inputs?.[input?.key] || ''}
              onChange={(e) => handleInputChange(input?.key, e?.target?.value)}
              required={input?.required}
              min={input?.min}
              max={input?.max}
            />
          ))}
          
          <div className="flex gap-2 pt-2">
            <Button
              variant="default"
              onClick={handleCalculate}
              iconName="Calculator"
              iconPosition="left"
              className="flex-1"
            >
              Calculate
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              iconName="RotateCcw"
              size="default"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Results</h4>
          
          {!showResult ? (
            <div className="flex items-center justify-center h-48 bg-muted/50 rounded-lg border-2 border-dashed border-border">
              <div className="text-center">
                <Icon name="Calculator" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Enter values and click calculate to see results</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {type === 'emergencyFund' && result && (
                <div className="space-y-3">
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <div className="text-2xl font-bold text-primary">${result?.targetAmount?.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Target Emergency Fund</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="font-semibold text-foreground">${result?.remainingAmount?.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Still Needed</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="font-semibold text-foreground">{result?.progressPercentage}%</div>
                      <div className="text-xs text-muted-foreground">Complete</div>
                    </div>
                  </div>
                  
                  {result?.remainingAmount > 0 && (
                    <div className="bg-warning/5 p-4 rounded-lg border border-warning/20">
                      <div className="text-sm font-medium text-foreground mb-1">Savings Plan:</div>
                      <div className="text-sm text-muted-foreground">
                        Save ${result?.monthlySavingNeeded?.toLocaleString()}/month for {result?.monthsToReach} months
                      </div>
                    </div>
                  )}
                </div>
              )}

              {type === 'salaryNegotiation' && result && (
                <div className="space-y-3">
                  <div className="bg-success/5 p-4 rounded-lg border border-success/20">
                    <div className="text-2xl font-bold text-success">${result?.targetSalary?.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Target Salary</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="font-semibold text-foreground">${result?.minTarget?.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Minimum Ask</div>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="font-semibold text-foreground">${result?.maxTarget?.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Maximum Ask</div>
                    </div>
                  </div>
                  
                  <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
                    <div className="text-sm font-medium text-foreground mb-1">Potential Increase:</div>
                    <div className="text-sm text-muted-foreground">
                      ${result?.increaseAmount?.toLocaleString()} annually ({result?.increasePercentage}%)
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ${result?.monthlyIncrease?.toLocaleString()} per month
                    </div>
                  </div>
                </div>
              )}

              {type === 'budgetPlanner' && result && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/20 text-center">
                      <div className="font-semibold text-primary">${result?.recommendedNeeds?.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Needs (50%)</div>
                    </div>
                    <div className="bg-warning/5 p-3 rounded-lg border border-warning/20 text-center">
                      <div className="font-semibold text-warning">${result?.recommendedWants?.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Wants (30%)</div>
                    </div>
                    <div className="bg-success/5 p-3 rounded-lg border border-success/20 text-center">
                      <div className="font-semibold text-success">${result?.recommendedSavings?.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Savings (20%)</div>
                    </div>
                  </div>
                  
                  {(result?.needsVariance !== 0 || result?.wantsVariance !== 0) && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-foreground mb-2">Current vs Recommended:</div>
                      {result?.needsVariance !== 0 && (
                        <div className={`text-sm ${result?.needsVariance > 0 ? 'text-error' : 'text-success'}`}>
                          Needs: {result?.needsVariance > 0 ? '+' : ''}${result?.needsVariance?.toLocaleString()} 
                          {result?.needsVariance > 0 ? ' over budget' : ' under budget'}
                        </div>
                      )}
                      {result?.wantsVariance !== 0 && (
                        <div className={`text-sm ${result?.wantsVariance > 0 ? 'text-error' : 'text-success'}`}>
                          Wants: {result?.wantsVariance > 0 ? '+' : ''}${result?.wantsVariance?.toLocaleString()}
                          {result?.wantsVariance > 0 ? ' over budget' : ' under budget'}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveCalculator;