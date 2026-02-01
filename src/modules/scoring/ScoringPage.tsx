import { useMemo, useState } from 'react';
import { calculateTotal } from './logic';
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

export default function ScoringPage() {
  const [sheet, setSheet] = useState<ScoreSheet>(defaultSheet);
  const total = useMemo(() => calculateTotal(sheet), [sheet]);

  const handleChange = (key: keyof ScoreSheet, value: string) => {
    const parsed = Number(value);
    setSheet((prev) => ({
      ...prev,
      [key]: Number.isNaN(parsed) ? 0 : parsed,
    }));
  };

  const reset = () => setSheet(defaultSheet);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-28 pt-16">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Scoring Module</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">End-Game Scoring Calculator</h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Enter each category score to calculate your final total instantly.
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          <ScoreCard title="Board Assets" fields={boardAssets} sheet={sheet} onChange={handleChange} />
          <ScoreCard title="Cards" fields={cards} sheet={sheet} onChange={handleChange} />
          <ScoreCard title="Tiles" fields={tiles} sheet={sheet} onChange={handleChange} />
        </section>

        <button
          type="button"
          onClick={reset}
          className="w-full rounded-full border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-slate-500 hover:bg-slate-900 lg:w-auto"
        >
          Reset
        </button>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Total Score</p>
            <p className="text-3xl font-semibold text-amber-200">{total} VP</p>
          </div>
          <div className="text-right text-xs text-slate-400">
            Coins are converted at 5:1.
          </div>
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
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
      <div className="mt-4 space-y-3">
        {fields.map((field) => (
          <label key={field.key} className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">{field.label}</span>
            {field.helper ? (
              <span className="block text-xs text-slate-500">{field.helper}</span>
            ) : null}
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={Number.isNaN(sheet[field.key]) ? 0 : sheet[field.key]}
              onChange={(event) => onChange(field.key, event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-lg font-semibold text-slate-100 outline-none transition focus:border-amber-200"
            />
          </label>
        ))}
      </div>
    </section>
  );
}
