import React, { useState } from 'react';
import { ChatMode } from './types';
import { Header } from './components/Header';
import { ModeToggle } from './components/ModeToggle';
import { GeneralEnquiry } from './pages/GeneralEnquiry';
import { InstantFeedback } from './pages/InstantFeedback';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NetworkStatus } from './components/NetworkStatus';

function App() {
  const [mode, setMode] = useState<ChatMode>('general');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <Header />
        <div className="bg-white rounded-lg shadow-sm flex flex-col h-[calc(100vh-8rem)]">
          <ModeToggle mode={mode} onModeChange={setMode} />
          <ErrorBoundary>
            {mode === 'general' ? <GeneralEnquiry /> : <InstantFeedback />}
          </ErrorBoundary>
        </div>
      </div>
      <NetworkStatus />
    </div>
  );
}

export default App;