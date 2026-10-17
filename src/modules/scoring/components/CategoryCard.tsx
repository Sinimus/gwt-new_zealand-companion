import { useState } from 'react';
import type { ScoreCategory } from '../../../data/rules/scoring';
import { categoryPoints } from '../../../logic/scoring';
import { formatSource } from '../../../logic/rules';
import ObjectiveHelper from './ObjectiveHelper';

type CategoryCardProps = {
  category: ScoreCategory;
  value: number;
  disabled: boolean;
  onChange: (value: number) => void;
};

const inputClass =
  'mt-2 block w-28 min-h-11 rounded-2xl border border-primary/30 bg-white px-4 py-2 font-semibold text-text outline-hidden transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-50';

function parseSheetValue(raw: string, category: ScoreCategory): number {
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) {
    return 0;
  }
  if (category.input.kind === 'pounds') {
    return Math.max(0, parsed);
  }
  if (category.input.kind === 'points') {
    const clamped = category.input.allowNegative ? parsed : Math.max(0, parsed);
    const max = category.input.max;
    return max !== undefined ? Math.min(clamped, max) : clamped;
  }
  return parsed;
}

type ScoreInputProps = {
  category: ScoreCategory;
  value: number;
  disabled: boolean;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

// Keeps the typed text while editing, so "-" or an empty field can be typed before the number.
function ScoreInput({ category, value, disabled, min, max, onChange }: ScoreInputProps) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <input
      type="number"
      inputMode="numeric"
      value={draft ?? String(value)}
      min={min}
      max={max}
      disabled={disabled}
      onChange={(event) => {
        setDraft(event.target.value);
        onChange(parseSheetValue(event.target.value, category));
      }}
      onBlur={() => setDraft(null)}
      className={inputClass}
    />
  );
}

export default function CategoryCard({ category, value, disabled, onChange }: CategoryCardProps) {
  return (
    <section className="rounded-2xl border border-primary/20 bg-white/70 p-5">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold text-text">
          {category.number}. {category.title}
        </h3>
        <span className="whitespace-nowrap text-xs text-text/50">
          {formatSource(category.source)}
        </span>
      </div>
      <p className="mt-1 text-sm text-text/70">{category.hint}</p>

      {category.input.kind === 'pounds' && (
        <div className="mt-4">
          <label className="block">
            <span className="text-xs uppercase tracking-[0.35em] text-text/60">
              <span className="sr-only">{category.title}: </span>Pounds
            </span>
            <ScoreInput
              category={category}
              value={value}
              min={0}
              disabled={disabled}
              onChange={onChange}
            />
          </label>
          <p className="mt-2 text-sm text-text/80">
            = {categoryPoints(category, value)} VP
          </p>
        </div>
      )}

      {category.input.kind === 'points' && (
        <label className="mt-4 block">
          <span className="text-xs uppercase tracking-[0.35em] text-text/60">
            <span className="sr-only">{category.title}: </span>VP
          </span>
          <ScoreInput
            category={category}
            value={value}
            min={category.input.allowNegative ? undefined : 0}
            max={category.input.max}
            disabled={disabled}
            onChange={onChange}
          />
        </label>
      )}

      {category.input.kind === 'flag' && (
        <label className="mt-4 flex min-h-11 items-center gap-3">
          <input
            type="checkbox"
            checked={value === 1}
            disabled={disabled}
            onChange={(event) => onChange(event.target.checked ? 1 : 0)}
            className="h-5 w-5 rounded accent-primary disabled:opacity-50"
          />
          <span className="text-sm text-text/80">
            <span className="sr-only">{category.title}: </span>Yes ({category.input.points} VP)
          </span>
        </label>
      )}

      {disabled && <p className="mt-3 text-xs text-text/60">Sarah does not score this (Solo p. 2).</p>}

      {category.id === 'objectives' && <ObjectiveHelper disabled={disabled} onUse={onChange} />}
    </section>
  );
}
