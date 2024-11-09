import React from 'react';
import { Message } from '../types';

interface Props {
  message: Message;
}

export const ChatMessage: React.FC<Props> = ({ message }) => (
  <div
    className={`flex ${
      message.sender === 'user' ? 'justify-end' : 'justify-start'
    }`}
  >
    <div
      className={`max-w-[70%] rounded-lg p-4 ${
        message.sender === 'user'
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="flex items-center space-x-2 mb-1">
        <span className="text-xs opacity-75">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
      <p className="whitespace-pre-wrap break-words">{message.text}</p>
    </div>
  </div>
);