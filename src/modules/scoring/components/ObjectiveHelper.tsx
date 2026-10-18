import { useState } from 'react';
import { objectiveScore } from '../../../logic/objectives';

interface ObjectiveRow {
  id: number;
  victoryPoints: number;
  penalty: number;
  fulfilled: boolean;
}

type ObjectiveHelperProps = {
  disabled: boolean;
  onUse: (value: number) => void;
};

const toMin0 = (raw: string): number => Math.max(0, Number.parseInt(raw, 10) || 0);

const numberClass =
  'block w-20 min-h-11 rounded-2xl border border-primary/30 bg-white px-3 py-2 font-semibold text-text outline-hidden transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-50';

export default function ObjectiveHelper({ disabled, onUse }: ObjectiveHelperProps) {
  const [rows, setRows] = useState<readonly ObjectiveRow[]>([{ id: 0, victoryPoints: 0, penalty: 0, fulfilled: false }]);
  const [nextId, setNextId] = useState(1);

  const total = objectiveScore(rows);

  const update = (id: number, patch: Partial<ObjectiveRow>) => {
    setRows((previous) => previous.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  };

  const addRow = () => {
    setRows((previous) => [
      ...previous,
      { id: nextId, victoryPoints: 0, penalty: 0, fulfilled: false },
    ]);
    setNextId((id) => id + 1);
  };

  const removeRow = (id: number) => {
    setRows((previous) => previous.filter((row) => row.id !== id));
  };

  return (
    <details className="mt-4 rounded-2xl border border-primary/20 bg-white/80 p-4">
      <summary className="flex min-h-11 cursor-pointer items-center text-sm font-semibold text-text">
        Objective cards helper
      </summary>
      <div className="mt-3 space-y-2">
        {rows.map((row, index) => (
          <div key={row.id} className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2">
              <span className="sr-only">Objective card {index + 1} victory points</span>
              <span className="text-xs uppercase tracking-[0.2em] text-text/60">VP</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={row.victoryPoints}
                disabled={disabled}
                onChange={(event) => update(row.id, { victoryPoints: toMin0(event.target.value) })}
                className={numberClass}
              />
            </label>
            <label className="flex items-center gap-2">
              <span className="sr-only">Objective card {index + 1} penalty</span>
              <span className="text-xs uppercase tracking-[0.2em] text-text/60">Penalty</span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={row.penalty}
                disabled={disabled}
                onChange={(event) => update(row.id, { penalty: toMin0(event.target.value) })}
                className={numberClass}
              />
            </label>
            <label className="flex min-h-11 items-center gap-2">
              <input
                type="checkbox"
                checked={row.fulfilled}
                disabled={disabled}
                onChange={(event) => update(row.id, { fulfilled: event.target.checked })}
                className="h-5 w-5 rounded accent-primary disabled:opacity-50"
              />
              <span className="text-sm text-text/80">
                <span className="sr-only">Objective card {index + 1} </span>Fulfilled
              </span>
            </label>
            <button
              type="button"
              disabled={disabled}
              onClick={() => removeRow(row.id)}
              className="min-h-11 rounded-full border border-primary/30 bg-white px-4 text-xs font-semibold uppercase tracking-[0.2em] text-text/70 transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={disabled}
            onClick={addRow}
            className="min-h-11 rounded-full border border-primary/30 bg-white px-4 text-xs font-semibold uppercase tracking-[0.2em] text-text/70 transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add a card
          </button>
          <p className="text-sm text-text/80">Total: {total} VP</p>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onUse(total)}
            className="min-h-11 rounded-full border border-primary bg-primary/20 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Use {total} VP
          </button>
        </div>
      </div>
    </details>
  );
}
