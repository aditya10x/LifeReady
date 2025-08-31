import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ResourceModal = ({ resource, isOpen, onClose, type = 'preview' }) => {
  const [calculatorData, setCalculatorData] = useState({
    monthlyIncome: '',
    monthlyExpenses: '',
    currentSavings: '',
    targetMonths: 6
  });

  if (!isOpen || !resource) return null;

  const handleCalculatorSubmit = (e) => {
    e?.preventDefault();
    const income = parseFloat(calculatorData?.monthlyIncome) || 0;
    const expenses = parseFloat(calculatorData?.monthlyExpenses) || 0;
    const current = parseFloat(calculatorData?.currentSavings) || 0;
    const target = calculatorData?.targetMonths;
    
    const targetAmount = expenses * target;
    const remaining = Math.max(0, targetAmount - current);
    const monthsToTarget = remaining > 0 ? Math.ceil(remaining / (income - expenses)) : 0;
    
    alert(`Emergency Fund Analysis:\nTarget Amount: $${targetAmount?.toLocaleString()}\nRemaining Needed: $${remaining?.toLocaleString()}\nMonths to Target: ${monthsToTarget}`);
  };

  const renderCalculator = () => {
    if (resource?.type !== 'calculator') return null;

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Emergency Fund Calculator
          </h3>
          <p className="text-sm text-muted-foreground">
            Calculate how much you need for your emergency fund and track your progress
          </p>
        </div>
        <form onSubmit={handleCalculatorSubmit} className="space-y-4">
          <Input
            label="Monthly Income (after tax)"
            type="number"
            placeholder="5000"
            value={calculatorData?.monthlyIncome}
            onChange={(e) => setCalculatorData(prev => ({ ...prev, monthlyIncome: e?.target?.value }))}
            required
          />

          <Input
            label="Monthly Essential Expenses"
            type="number"
            placeholder="3000"
            value={calculatorData?.monthlyExpenses}
            onChange={(e) => setCalculatorData(prev => ({ ...prev, monthlyExpenses: e?.target?.value }))}
            required
          />

          <Input
            label="Current Emergency Savings"
            type="number"
            placeholder="2000"
            value={calculatorData?.currentSavings}
            onChange={(e) => setCalculatorData(prev => ({ ...prev, currentSavings: e?.target?.value }))}
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Target Months of Expenses
            </label>
            <select
              value={calculatorData?.targetMonths}
              onChange={(e) => setCalculatorData(prev => ({ ...prev, targetMonths: parseInt(e?.target?.value) }))}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value={3}>3 months</option>
              <option value={6}>6 months</option>
              <option value={9}>9 months</option>
              <option value={12}>12 months</option>
            </select>
          </div>

          <Button type="submit" variant="default" className="w-full">
            Calculate Emergency Fund
          </Button>
        </form>
      </div>
    );
  };

  const renderPreview = () => {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {resource?.title}
          </h3>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center space-x-1">
              <Icon name="Tag" size={14} />
              <span>{resource?.category}</span>
            </span>
            <span className="inline-flex items-center space-x-1">
              <Icon name="BarChart3" size={14} />
              <span>{resource?.difficulty}</span>
            </span>
          </div>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-4">
            {resource?.description}
          </p>
          
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">What's included:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>Step-by-step instructions</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>Customizable templates</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>Real-world examples</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>Progress tracking checklist</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{resource?.downloadCount?.toLocaleString()} downloads</span>
          {resource?.estimatedTime && (
            <span className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{resource?.estimatedTime}</span>
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {type === 'calculator' ? 'Interactive Calculator' : 'Resource Preview'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {type === 'calculator' ? renderCalculator() : renderPreview()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-2 p-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="default" iconName="Download" iconPosition="left">
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;