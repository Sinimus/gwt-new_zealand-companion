import { useState, useEffect } from 'react';
import SetupWizard from './components/SetupWizard';
import { randomizeBuildings, type ActiveBuilding, type PlayerCount } from './logic';

// localStorage keys - namespaced to avoid conflicts
const STORAGE_KEYS = {
  SETUP: 'gwt-nz-setup-buildings',
  PLAYER_COUNT: 'gwt-nz-setup-playerCount',
};

export default function SetupPage() {
  const [setup, setSetup] = useState<ActiveBuilding[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.SETUP);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Validate that we have an array of 8 buildings
        if (Array.isArray(parsed) && parsed.length === 8) {
          return parsed;
        }
      } catch {
        // If parsing fails, fall through to default
      }
    }
    return randomizeBuildings();
  });
  
  const [playerCount, setPlayerCount] = useState<PlayerCount>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.PLAYER_COUNT);
    const count = stored ? Number(stored) : 4;
    return (count === 2 || count === 3 || count === 4) ? count : 4;
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETUP, JSON.stringify(setup));
  }, [setup]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PLAYER_COUNT, String(playerCount));
  }, [playerCount]);

  return (
    <main className="min-h-screen bg-canvas text-text">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-text/60">Setup Module</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Setup Wizard</h1>
          <p className="max-w-2xl text-sm text-text/70">
            Follow the steps in order to prepare the board, buildings, tokens, and player resources.
          </p>
        </header>
        <SetupWizard
          playerCount={playerCount}
          onPlayerCountChange={setPlayerCount}
          setup={setup}
          onSetupChange={setSetup}
        />
      </div>
    </main>
  );
}
