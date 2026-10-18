import { useState } from 'react';
import type { RuleSource } from '../../../data/rules/types';
import type { SheepId } from '../../../data/rules/sheep';
import { incomeTotal } from '../../../logic/economy';
import { formatSource } from '../../../logic/rules';
import NumberField from './NumberField';
import SheepToggleGrid from './SheepToggleGrid';

const INCOME_SOURCE: RuleSource = { book: 'rules', pages: '9' };

export default function IncomeCalculator() {
  const [selected, setSelected] = useState<readonly SheepId[]>([]);
  const [certificates, setCertificates] = useState(0);
  const total = incomeTotal(selected, certificates);

  const toggle = (id: SheepId) => {
    setSelected((previous) =>
      previous.includes(id) ? previous.filter((entry) => entry !== id) : [...previous, id],
    );
  };

  return (
    <div className="space-y-4">
      <section className="space-y-4 rounded-2xl border border-primary/20 bg-white/70 p-5">
        <p className="text-sm text-text/80">
          Each sheep type counts once; add certificates.
          <span className="ml-2 whitespace-nowrap text-xs text-text/50">
            {formatSource(INCOME_SOURCE)}
          </span>
        </p>
        <SheepToggleGrid
          selected={selected}
          onToggle={toggle}
          describe={(sheep) => `Breeding ${sheep.breedingValue}`}
        />
        <NumberField
          label="Certificates used (temporary + permanent)"
          value={certificates}
          min={0}
          onChange={setCertificates}
        />
      </section>
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-white/70 p-5">
        <p className="text-xl font-semibold text-text">
          {total} pounds
          <span className="ml-2 whitespace-nowrap text-xs font-normal text-text/50">
            {formatSource(INCOME_SOURCE)}
          </span>
        </p>
        <button
          type="button"
          onClick={() => {
            setSelected([]);
            setCertificates(0);
          }}
          className="min-h-11 rounded-full border border-primary/30 bg-white px-5 text-sm font-semibold uppercase tracking-[0.2em] text-text/70 transition hover:border-primary"
        >
          Clear
        </button>
      </section>
    </div>
  );
}
