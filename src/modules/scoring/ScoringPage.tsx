import { useState } from 'react';
import PlayerCountPicker from '../../components/rules/PlayerCountPicker';
import { usePlayerCount } from '../../components/rules/usePlayerCount';
import {
  SCORE_CATEGORIES,
  type ScoreCategoryId,
} from '../../data/rules/scoring';
import { emptySheet, ranking, SARAH_EXCLUDED, type ScoreSheet } from '../../logic/scoring';
import CategoryCard from './components/CategoryCard';
import ResultsCard from './components/ResultsCard';

interface PlayerEntry {
  player: number;
  name: string;
}

const initialSheets = (): Record<number, ScoreSheet> => ({
  1: emptySheet(),
  2: emptySheet(),
  3: emptySheet(),
  4: emptySheet(),
});

const playersFor = (count: number): readonly PlayerEntry[] =>
  count === 1
    ? [
        { player: 1, name: 'You' },
        { player: 2, name: 'Sarah' },
      ]
    : Array.from({ length: count }, (_, index) => ({
        player: index + 1,
        name: `Player ${index + 1}`,
      }));

export default function ScoringPage() {
  const [count, setCount] = usePlayerCount();
  const [selectedPlayer, setSelectedPlayer] = useState(1);
  const [sheets, setSheets] = useState<Record<number, ScoreSheet>>(initialSheets);

  const players = playersFor(count);
  const active = players.some((entry) => entry.player === selectedPlayer) ? selectedPlayer : 1;
  const activeSheet = sheets[active];
  const sarahActive = count === 1 && active === 2;

  const setValue = (category: ScoreCategoryId, value: number) => {
    setSheets((previous) => {
      const updated: ScoreSheet = { ...previous[active] };
      updated[category] = value;
      return { ...previous, [active]: updated };
    });
  };

  const resetPlayer = () => {
    setSheets((previous) => ({ ...previous, [active]: emptySheet() }));
  };

  const resetAll = () => {
    setSheets(initialSheets());
  };

  const ranked = ranking(
    players.map((entry) => ({
      player: entry.player,
      sheet: sheets[entry.player],
      excluded: count === 1 && entry.player === 2 ? SARAH_EXCLUDED : undefined,
    })),
  );

  const nameOf = (player: number): string =>
    players.find((entry) => entry.player === player)?.name ?? `Player ${player}`;

  return (
    <main className="min-h-screen bg-canvas text-text">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-text/60">Scoring</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Scoring</h1>
          <p className="max-w-2xl text-sm text-text/70">
            The 12 categories of the scoring pad. Nothing is stored: reloading starts from zero.
          </p>
          <PlayerCountPicker value={count} onChange={setCount} />
        </header>

        <section aria-label="Players" className="space-y-4">
          <div
            className={`grid gap-2 ${count === 1 ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}
          >
            {players.map((entry) => {
              const isActive = entry.player === active;
              return (
                <button
                  key={entry.player}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedPlayer(entry.player)}
                  className={`min-h-11 rounded-2xl border px-4 text-sm font-semibold transition ${
                    isActive
                      ? 'border-primary bg-primary/20 text-primary'
                      : 'border-primary/30 bg-white/70 text-text/70 hover:border-primary'
                  }`}
                >
                  {entry.name}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={resetPlayer}
              className="min-h-11 rounded-full border border-primary/30 bg-white px-5 text-xs font-semibold uppercase tracking-[0.2em] text-text/70 transition hover:border-primary"
            >
              Reset this player
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="min-h-11 rounded-full border border-primary/30 bg-white px-5 text-xs font-semibold uppercase tracking-[0.2em] text-text/70 transition hover:border-primary"
            >
              Reset all
            </button>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          {SCORE_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              value={activeSheet[category.id]}
              disabled={sarahActive && SARAH_EXCLUDED.includes(category.id)}
              onChange={(value) => setValue(category.id, value)}
            />
          ))}
        </div>

        <ResultsCard ranked={ranked} nameOf={nameOf} />
      </div>
    </main>
  );
}
