import React from 'react';

interface QuickActionButtonProps {
  text: string;
  onClick: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
  >
    {text}
  </button>
);

interface Props {
  onActionSelect: (text: string) => void;
}

export const QuickActions: React.FC<Props> = ({ onActionSelect }) => (
  <div className="bg-white p-4 border-t border-gray-200 flex gap-2 overflow-x-auto">
    <QuickActionButton
      text="Check Latest Patterns"
      onClick={() => onActionSelect('Analyze recent trading patterns')}
    />
    <QuickActionButton
      text="Report Suspicious Activity"
      onClick={() => onActionSelect('Report suspicious trading activity')}
    />
    <QuickActionButton
      text="View Alerts"
      onClick={() => onActionSelect('Show recent alerts')}
    />
    <QuickActionButton
      text="Generate Report"
      onClick={() => onActionSelect('Generate fraud analysis report')}
    />
  </div>
);