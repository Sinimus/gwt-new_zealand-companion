import { useMemo, useState } from 'react';
import BuildingCard from '../../components/ui/BuildingCard';
import {
  getMarketSetupNote,
  getStartingResources,
  randomizeBuildings,
  type ActiveBuilding,
  type PlayerCount,
} from './logic';

export default function SetupPage() {
  const [setup, setSetup] = useState<ActiveBuilding[]>(() => randomizeBuildings());
  const [playerCount, setPlayerCount] = useState<PlayerCount>(4);
  const startingResources = useMemo(
    () => getStartingResources(playerCount),
    [playerCount],
  );
  const marketNote = useMemo(() => getMarketSetupNote(playerCount), [playerCount]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16">
        <header className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Setup Module</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Neutral Building Randomizer</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Generate the eight neutral building sides for your session. Tap generate to reroll.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSetup(randomizeBuildings())}
            className="rounded-full border border-amber-300/40 bg-amber-200/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-100 transition hover:border-amber-200 hover:bg-amber-200/20"
          >
            Generate Setup
          </button>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1.1fr_1.4fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Player Count</p>
              <div className="mt-4 flex gap-3">
                {[2, 3, 4].map((count) => {
                  const isActive = playerCount === count;
                  return (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setPlayerCount(count as PlayerCount)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? 'border-amber-200 bg-amber-200/20 text-amber-100'
                          : 'border-slate-700 bg-slate-950/40 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {count} Players
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-slate-300">{marketNote}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Starting Resources
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {startingResources.map((entry) => (
                  <div
                    key={entry.player}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                  >
                    <p className="text-sm font-semibold text-slate-200">
                      Player {entry.player}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                      <span>Money</span>
                      <span className="text-lg font-semibold text-amber-200">£{entry.money}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                      <span>Cards</span>
                      <span className="text-lg font-semibold text-slate-100">
                        {entry.cards}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {setup.map((building) => (
            <BuildingCard
              key={`${building.id}-${building.activeSide.side}`}
              name={building.name}
              activeSide={building.activeSide}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
