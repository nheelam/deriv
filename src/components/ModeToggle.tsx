import React from 'react';
import { ChatMode } from '../types';

interface Props {
  mode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
}

export const ModeToggle: React.FC<Props> = ({ mode, onModeChange }) => {
  return (
    <div className="flex justify-center space-x-2 p-4 bg-white border-b border-gray-200">
      <button
        onClick={() => onModeChange('general')}
        className={`px-6 py-3 rounded-lg transition-colors font-medium ${
          mode === 'general'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        General Enquiry
      </button>
      <button
        onClick={() => onModeChange('feedback')}
        className={`px-6 py-3 rounded-lg transition-colors font-medium ${
          mode === 'feedback'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Instant Feedback
      </button>
    </div>
  );
};