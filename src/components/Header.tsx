import React from 'react';
import { MessageSquare } from 'lucide-react';

export const Header: React.FC = () => (
  <div className="bg-white rounded-t-xl shadow-sm border-b border-gray-200 p-4 flex items-center space-x-3">
    <MessageSquare className="w-8 h-8 text-blue-600" />
    <div>
      <h1 className="text-xl font-semibold text-gray-900">Interactive Chat Assistant</h1>
      <p className="text-sm text-gray-500">Choose your mode and start chatting</p>
    </div>
  </div>
);