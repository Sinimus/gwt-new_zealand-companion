import { useMemo, useState } from 'react';
import BuildingCard from '../../../components/ui/BuildingCard';
import { setupSteps } from '../steps';
import {
  getMarketSetupNote,
  getStartingResources,
  randomizeBuildings,
  type ActiveBuilding,
  type PlayerCount,
} from '../logic';

type SetupWizardProps = {
  playerCount: PlayerCount;
  onPlayerCountChange: (count: PlayerCount) => void;
  setup: ActiveBuilding[];
  onSetupChange: (next: ActiveBuilding[]) => void;
};

export default function SetupWizard({
  playerCount,
  onPlayerCountChange,
  setup,
  onSetupChange,
}: SetupWizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const totalSteps = setupSteps.length;
  const step = setupSteps[currentStepIndex];

  const startingResources = useMemo(
    () => getStartingResources(playerCount),
    [playerCount],
  );
  const marketNote = useMemo(() => getMarketSetupNote(playerCount), [playerCount]);

  const canGoBack = currentStepIndex > 0;
  const canGoNext = currentStepIndex < totalSteps - 1;

  const resetWizard = () => {
    setCurrentStepIndex(0);
    onSetupChange(randomizeBuildings());
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="rounded-2xl border border-primary/20 bg-white/70 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-text/60">
              Step {currentStepIndex + 1} of {totalSteps}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-text">{step.title}</h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-text/70">
            <span>Player Count</span>
            <div className="flex gap-2">
              {[2, 3, 4].map((count) => {
                const isActive = playerCount === count;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => onPlayerCountChange(count as PlayerCount)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                      isActive
                        ? 'border-primary bg-primary/20 text-primary'
                        : 'border-primary/30 bg-white/50 text-text/70 hover:border-primary'
                    }`}
                  >
                    {count}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-text/70">{step.content}</p>
      </div>

      {step.id === 'buildings' ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-text/70">
              Generate the eight neutral building sides for your session.
            </p>
            <button
              type="button"
              onClick={() => onSetupChange(randomizeBuildings())}
              className="rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:border-primary hover:bg-primary/20"
            >
              Reroll Buildings
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {setup.map((building) => (
              <BuildingCard
                key={`${building.id}-${building.activeSide.side}`}
                name={building.name}
                activeSide={building.activeSide}
              />
            ))}
          </div>
        </div>
      ) : null}

      {step.id === 'resources' ? (
        <div className="grid gap-4 lg:grid-cols-[1.1fr_1.4fr]">
          <div className="rounded-2xl border border-primary/20 bg-white/70 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-text/60">Market Setup Note</p>
            <p className="mt-3 text-sm text-text/70">{marketNote}</p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-white/70 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-text/60">Starting Resources</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {startingResources.map((entry) => (
                <div
                  key={entry.player}
                  className="rounded-xl border border-primary/20 bg-white/80 p-4"
                >
                  <p className="text-sm font-semibold text-text">Player {entry.player}</p>
                  <div className="mt-3 flex items-center justify-between text-sm text-text/70">
                    <span>Money</span>
                    <span className="text-lg font-semibold text-primary">£{entry.money}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-text/70">
                    <span>Cards</span>
                    <span className="text-lg font-semibold text-text">{entry.cards}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="sticky bottom-0 z-10 rounded-2xl border border-primary/20 bg-canvas/95 px-5 py-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={!canGoBack}
            className="rounded-full border border-primary/30 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text/70 transition hover:border-primary hover:text-text disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="button"
            onClick={resetWizard}
            className="rounded-full border border-primary/30 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-text/70 transition hover:border-primary hover:text-text"
          >
            Start New Setup
          </button>
          <button
            type="button"
            onClick={() => setCurrentStepIndex((prev) => Math.min(totalSteps - 1, prev + 1))}
            disabled={!canGoNext}
            className="rounded-full border border-primary bg-primary px-6 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-canvas transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
