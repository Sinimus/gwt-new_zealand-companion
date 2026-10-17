import { useState } from 'react';
import type { RuleSource } from '../../../data/rules/types';
import type { SheepId } from '../../../data/rules/sheep';
import { reachableWoolPosts, shearTotal } from '../../../logic/economy';
import { formatSource } from '../../../logic/rules';
import NumberField from './NumberField';
import SheepToggleGrid from './SheepToggleGrid';

const WOOL_SOURCE: RuleSource = { book: 'rules', pages: '16' };

export default function ShearingCalculator() {
  const [selected, setSelected] = useState<readonly SheepId[]>([]);
  const [shearers, setShearers] = useState(1);
  const [permanentWool, setPermanentWool] = useState(0);
  const total = shearTotal(selected, shearers, permanentWool);
  const posts = reachableWoolPosts(total);

  const toggle = (id: SheepId) => {
    setSelected((previous) =>
      previous.includes(id) ? previous.filter((entry) => entry !== id) : [...previous, id],
    );
  };

  return (
    <div className="space-y-4">
      <section className="space-y-4 rounded-2xl border border-primary/20 bg-white/70 p-5">
        <SheepToggleGrid
          selected={selected}
          onToggle={toggle}
          describe={(sheep) => `Wool ${sheep.woolValue}`}
        />
        <div className="flex flex-wrap gap-6">
          <NumberField label="Shearers" value={shearers} min={1} onChange={setShearers} />
          <NumberField
            label="Permanent wool"
            value={permanentWool}
            min={0}
            onChange={setPermanentWool}
          />
        </div>
      </section>
      <section className="space-y-3 rounded-2xl border border-primary/20 bg-white/70 p-5">
        <p className="text-xl font-semibold text-text">
          {total} pounds
          <span className="ml-2 whitespace-nowrap text-xs font-normal text-text/50">
            {formatSource(WOOL_SOURCE)}
          </span>
        </p>
        <p className="text-sm text-text/80">
          Local wool trading posts within reach:{' '}
          {posts.length > 0 ? posts.join(', ') : 'none'}
          <span className="ml-2 whitespace-nowrap text-xs text-text/50">
            {formatSource(WOOL_SOURCE)}
          </span>
        </p>
        <p className="text-sm text-text/70">
          Post 13 takes any number of your discs; 5 and 9 one each.
          <span className="ml-2 whitespace-nowrap text-xs text-text/50">
            {formatSource(WOOL_SOURCE)}
          </span>
        </p>
        <div>
          <button
            type="button"
            onClick={() => {
              setSelected([]);
              setShearers(1);
              setPermanentWool(0);
            }}
            className="min-h-11 rounded-full border border-primary/30 bg-white px-5 text-sm font-semibold uppercase tracking-[0.2em] text-text/70 transition hover:border-primary"
          >
            Clear
          </button>
        </div>
      </section>
    </div>
  );
}
