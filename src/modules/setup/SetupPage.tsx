import { useState } from 'react';
import SetupWizard from './components/SetupWizard';
import { randomizeBuildings, type ActiveBuilding, type PlayerCount } from './logic';

export default function SetupPage() {
  const [setup, setSetup] = useState<ActiveBuilding[]>(() => randomizeBuildings());
  const [playerCount, setPlayerCount] = useState<PlayerCount>(4);

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
