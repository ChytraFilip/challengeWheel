import React from 'react';
import { Wheel } from './components/Wheel';
import { DebugPanel } from './components/DebugPanel';
import { ResultModal } from './components/ResultModal';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Twitch Wheel of Fortune
      </h1>
      <Wheel />
      <DebugPanel />
      <ResultModal />
    </div>
  );
}

export default App;