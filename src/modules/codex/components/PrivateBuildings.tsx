import { useState } from 'react';
import { PRIVATE_BUILDINGS, type PrivateBuilding } from '../../../data/rules/buildings';
import type { RuleSource } from '../../../data/rules/types';
import { buildCost } from '../../../logic/building';
import { formatSource } from '../../../logic/rules';

const REPLACE_SOURCE: RuleSource = { book: 'rules', pages: '14' };
const sides: readonly ('a' | 'b')[] = ['a', 'b'];

const handFee = (building: PrivateBuilding): string | null => {
  if (building.hand === 'black') {
    return 'Black hand: opponents pay 1 pound';
  }
  if (building.hand === 'green') {
    return 'Green hand: opponents pay 2 pounds';
  }
  return null;
};

export default function PrivateBuildings() {
  const [side, setSide] = useState<'a' | 'b'>('a');
  const buildings = PRIVATE_BUILDINGS.filter((building) => building.side === side);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text">Private buildings</h3>
      <div role="group" aria-label="Building side" className="flex flex-wrap gap-2">
        {sides.map((option) => {
          const active = side === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => setSide(option)}
              className={`min-h-11 rounded-full border px-5 text-sm font-semibold uppercase tracking-[0.2em] transition ${
                active
                  ? 'border-primary bg-primary/20 text-primary'
                  : 'border-primary/30 bg-white/70 text-text/70 hover:border-primary'
              }`}
            >
              Side {option}
            </button>
          );
        })}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {buildings.map((building) => {
          const fee = handFee(building);
          return (
            <article
              key={building.id}
              className="rounded-2xl border border-primary/20 bg-white/70 p-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h4 className="text-base font-semibold text-text">Building {building.id}</h4>
                <span className="whitespace-nowrap text-xs text-text/50">
                  {formatSource(building.source)}
                </span>
              </div>
              <p className="mt-2 text-sm text-text/80">
                Needs {building.craftsmen} {building.craftsmen === 1 ? 'craftsman' : 'craftsmen'} ·
                costs £{buildCost(building.craftsmen)} · {building.victoryPoints} VP
              </p>
              {fee !== null && <p className="mt-1 text-sm text-text/70">{fee}</p>}
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-text/80">
                {building.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ol>
            </article>
          );
        })}
      </div>
      <p className="text-sm leading-relaxed text-text/80">
        Replacing: you need only the difference in craftsmen and pay 2 pounds per craftsman of the
        difference.
        <span className="ml-2 whitespace-nowrap text-xs text-text/50">
          {formatSource(REPLACE_SOURCE)}
        </span>
      </p>
    </div>
  );
}
