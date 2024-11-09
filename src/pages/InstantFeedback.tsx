import React, { useState } from 'react';
import { Message } from '../types';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { api } from '../services/api';

export const InstantFeedback: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const loadingId = 'loading-' + Date.now();
    setMessages(prev => [...prev, {
      id: loadingId,
      text: 'Processing...',
      sender: 'bot',
      timestamp: new Date(),
    }]);

    try {
      const response = await api.processInstantFeedback(input);
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== loadingId);
        return [...filtered, {
          id: Date.now().toString(),
          text: response.text,
          sender: 'bot',
          timestamp: new Date(),
        }];
      });
    } catch (error) {
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== loadingId);
        return [...filtered, {
          id: Date.now().toString(),
          text: 'Sorry, there was an error processing your request.',
          sender: 'bot',
          timestamp: new Date(),
        }];
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={handleSend}
      />
    </div>
  );
};