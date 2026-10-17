import { useState } from 'react';
import type { RuleSource } from '../../../data/rules/types';
import { SHEEP_PURCHASE_SOURCE } from '../../../data/rules/sheep';
import { formatSource } from '../../../logic/rules';
import { purchasesFor } from '../../../logic/sheepBuying';
import NumberField from './NumberField';

const RULES_SOURCE: RuleSource = { book: 'rules', pages: '14' };
const shepherdCounts: readonly number[] = [1, 2, 3, 4];

const notes: readonly string[] = [
  'Split your shepherds among these options as you like; each shepherd is used once per action.',
  'Each unused shepherd may add 2 cards from the market stack to the sheep market.',
  'Only sheep in the market can be bought; they go on your discard pile.',
];

export default function BuySheep() {
  const [shepherds, setShepherds] = useState(1);
  const options = purchasesFor(shepherds);

  const groups = shepherdCounts
    .map((used) => ({ used, purchases: options.filter((option) => option.shepherds === used) }))
    .filter((group) => group.purchases.length > 0);

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-primary/20 bg-white/70 p-5">
        <NumberField label="Shepherds" value={shepherds} min={1} max={6} onChange={setShepherds} />
      </section>
      {groups.map((group) => (
        <section
          key={group.used}
          className="rounded-2xl border border-primary/20 bg-white/70 p-5"
          aria-label={`Using ${group.used} shepherds`}
        >
          <h3 className="text-lg font-semibold text-text">
            Using {group.used} {group.used === 1 ? 'shepherd' : 'shepherds'}
          </h3>
          <ul className="mt-3 space-y-2">
            {group.purchases.map((purchase) => (
              <li key={purchase.id} className="text-sm text-text/80">
                {purchase.text}: £{purchase.pounds}
                <span className="ml-2 whitespace-nowrap text-xs text-text/50">
                  {formatSource(SHEEP_PURCHASE_SOURCE)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <section className="rounded-2xl border border-primary/20 bg-white/70 p-5">
        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note} className="text-sm text-text/80">
              {note}
              <span className="ml-2 whitespace-nowrap text-xs text-text/50">
                {formatSource(RULES_SOURCE)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
