import { Trophy } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { buildLeaderboard, type PlayerScore } from './logic';
import type { ScoreSheet } from '../../types';

const defaultSheet: ScoreSheet = {
  coins: 0,
  buildings: 0,
  citiesPorts: 0,
  unlockedDiscs: 0,
  hazards: 0,
  sheepCards: 0,
  objectiveCards: 0,
  birdCards: 0,
  bonusTiles: 0,
  harbourmasterTiles: 0,
  remainingMoney: 0,
};

type FieldConfig = {
  key: keyof ScoreSheet;
  label: string;
  helper?: string;
};

const boardAssets: FieldConfig[] = [
  { key: 'coins', label: 'Coins', helper: '5 coins = 1 VP' },
  { key: 'buildings', label: 'Buildings VP' },
  { key: 'citiesPorts', label: 'Cities & Ports VP' },
  { key: 'unlockedDiscs', label: 'Unlocked Discs VP' },
  { key: 'hazards', label: 'Hazards VP' },
];

const cards: FieldConfig[] = [
  { key: 'sheepCards', label: 'Sheep Cards VP' },
  { key: 'objectiveCards', label: 'Objective Cards VP' },
  { key: 'birdCards', label: 'Bird Cards VP' },
];

const tiles: FieldConfig[] = [
  { key: 'bonusTiles', label: 'Bonus Tiles VP' },
  { key: 'harbourmasterTiles', label: 'Harbourmaster Tiles VP' },
];

const tieBreakers: FieldConfig[] = [
  { key: 'remainingMoney', label: 'Remaining Money', helper: 'Tie-breaker: £' },
];

// localStorage keys - use namespaced keys to avoid conflicts
const STORAGE_KEYS = {
  SHEETS: 'gwt-nz-scoring-sheets',
  PLAYER_COUNT: 'gwt-nz-scoring-playerCount',
  ACTIVE_PLAYER: 'gwt-nz-scoring-activePlayer',
};

export default function ScoringPage() {
  // Initialize from localStorage or defaults
  const [playerCount, setPlayerCount] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.PLAYER_COUNT);
    return stored ? Number(stored) : 4;
  });
  
  const [activePlayer, setActivePlayer] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.ACTIVE_PLAYER);
    return stored ? Number(stored) : 1;
  });
  
  const [sheets, setSheets] = useState<Record<number, ScoreSheet>>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.SHEETS);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Validate structure - ensure all player slots exist
        const validated: Record<number, ScoreSheet> = {};
        for (let i = 1; i <= 4; i++) {
          // Merge with defaultSheet to handle migration from old format
          validated[i] = { ...defaultSheet, ...parsed[i] };
        }
        return validated;
      } catch {
        // If parsing fails, return defaults
      }
    }
    return {
      1: { ...defaultSheet },
      2: { ...defaultSheet },
      3: { ...defaultSheet },
      4: { ...defaultSheet },
    };
  });

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHEETS, JSON.stringify(sheets));
  }, [sheets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PLAYER_COUNT, String(playerCount));
  }, [playerCount]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PLAYER, String(activePlayer));
  }, [activePlayer]);

  const currentSheet = sheets[activePlayer];
  const leaderboard = useMemo(
    () => buildLeaderboard(sheets, playerCount),
    [sheets, playerCount],
  );

  const handleChange = (key: keyof ScoreSheet, value: string) => {
    const parsed = Number(value);
    setSheets((prev) => ({
      ...prev,
      [activePlayer]: {
        ...prev[activePlayer],
        [key]: Number.isNaN(parsed) ? 0 : parsed,
      },
    }));
  };

  const resetCurrent = () => {
    setSheets((prev) => ({
      ...prev,
      [activePlayer]: { ...defaultSheet },
    }));
  };

  const clearAll = () => {
    // Clear both state and localStorage
    const clearedSheets = {
      1: { ...defaultSheet },
      2: { ...defaultSheet },
      3: { ...defaultSheet },
      4: { ...defaultSheet },
    };
    setSheets(clearedSheets);
    localStorage.removeItem(STORAGE_KEYS.SHEETS);
    localStorage.removeItem(STORAGE_KEYS.PLAYER_COUNT);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_PLAYER);
  };

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    if (activePlayer > count) {
      setActivePlayer(count);
    }
  };

  return (
    <main className="min-h-screen bg-canvas text-text">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-48 pt-16">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-text/60">Scoring Module</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">End-Game Scoring Calculator</h1>
          <p className="max-w-2xl text-sm text-text/70">
            Enter each category score to calculate your final total instantly.
          </p>
        </header>

        <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-white/80 p-4">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((player) => (
              <button
                key={player}
                type="button"
                onClick={() => setActivePlayer(player)}
                disabled={player > playerCount}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  player === activePlayer
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-primary/30 bg-white/60 text-text/70 hover:border-primary'
                } ${player > playerCount ? 'cursor-not-allowed opacity-40' : ''}`}
              >
                Player {player}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-text/60">
            <span>Players</span>
            <div className="flex gap-2">
              {[2, 3, 4].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => handlePlayerCountChange(count)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    playerCount === count
                      ? 'border-primary bg-primary/20 text-primary'
                      : 'border-primary/30 bg-white/60 text-text/70 hover:border-primary'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <ScoreCard
            title="Board Assets"
            fields={boardAssets}
            sheet={currentSheet}
            onChange={handleChange}
          />
          <ScoreCard title="Cards" fields={cards} sheet={currentSheet} onChange={handleChange} />
          <ScoreCard title="Tiles" fields={tiles} sheet={currentSheet} onChange={handleChange} />
        </section>

        <section className="grid gap-4 lg:grid-cols-1">
          <ScoreCard
            title="Tie-Breakers"
            fields={tieBreakers}
            sheet={currentSheet}
            onChange={handleChange}
          />
        </section>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={resetCurrent}
            className="rounded-full border border-primary/30 bg-white/80 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-text/80 transition hover:border-primary hover:bg-white"
          >
            Reset Player
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="rounded-full border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary transition hover:border-primary hover:bg-primary/20"
          >
            Clear All
          </button>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-primary/20 bg-canvas/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-text/60">Leaderboard</p>
            <LeaderboardSummary entries={leaderboard} />
          </div>
          <div className="text-right text-xs text-text/60">Coins are converted at 5:1.</div>
        </div>
      </footer>
    </main>
  );
}

type ScoreCardProps = {
  title: string;
  fields: FieldConfig[];
  sheet: ScoreSheet;
  onChange: (key: keyof ScoreSheet, value: string) => void;
};

function ScoreCard({ title, fields, sheet, onChange }: ScoreCardProps) {
  return (
    <section className="rounded-2xl border border-primary/20 bg-white/80 p-5">
      <h2 className="text-lg font-semibold text-text">{title}</h2>
      <div className="mt-4 space-y-3">
        {fields.map((field) => (
          <label key={field.key} className="block space-y-2">
            <span className="text-sm font-medium text-text">{field.label}</span>
            {field.helper ? (
              <span className="block text-xs text-text/60">{field.helper}</span>
            ) : null}
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={Number.isNaN(sheet[field.key]) ? 0 : sheet[field.key]}
              onChange={(event) => onChange(field.key, event.target.value)}
              className="w-full rounded-xl border border-primary/30 bg-white px-4 py-3 text-lg font-semibold text-text outline-none transition focus:border-primary"
            />
          </label>
        ))}
      </div>
    </section>
  );
}

type LeaderboardSummaryProps = {
  entries: PlayerScore[];
};

function LeaderboardSummary({ entries }: LeaderboardSummaryProps) {
  if (entries.length === 0) {
    return <p className="text-lg font-semibold text-primary">No scores yet</p>;
  }

  const topScore = entries[0].total;
  const topMoney = entries[0].remainingMoney;
  
  // Count how many players have the top score
  const scoreCounts = entries.reduce<Record<number, number>>((acc, entry) => {
    acc[entry.total] = (acc[entry.total] ?? 0) + 1;
    return acc;
  }, {});
  const topCount = scoreCounts[topScore] ?? 1;

  // A player is a sole winner if they have the unique highest score
  const soleWinnerIndex = entries.findIndex(
    (e) => e.total === topScore && e.remainingMoney === topMoney && topCount === 1
  );

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-text/80">
      {entries.map((entry, index) => {
        const isSoleWinner = index === soleWinnerIndex;
        const isTiedByScore = (scoreCounts[entry.total] ?? 0) > 1;
        
        // Check if this player is tied by score but broken by money
        const isTiedByScoreBrokenByMoney = isTiedByScore && entry.total === topScore && entry.remainingMoney === topMoney;
        
        return (
          <div
            key={entry.player}
            className={`flex items-center gap-2 rounded-full border px-3 py-1 ${
              isSoleWinner || isTiedByScoreBrokenByMoney
                ? 'border-primary bg-primary/20 text-primary'
                : 'border-primary/20 bg-white/70 text-text/80'
            }`}
          >
            {(isSoleWinner || isTiedByScoreBrokenByMoney) ? <Trophy className="h-4 w-4" /> : null}
            <span className="font-semibold">
              {index + 1}. P{entry.player} ({entry.total})
            </span>
            {isTiedByScoreBrokenByMoney ? (
              <span className="text-xs uppercase text-text/60">£{entry.remainingMoney}</span>
            ) : null}
            {isTiedByScore && !(entry.total === topScore && entry.remainingMoney === topMoney) ? (
              <span className="text-xs uppercase text-text/60">Tied</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
