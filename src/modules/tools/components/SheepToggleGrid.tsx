import { SHEEP, type Sheep, type SheepId } from '../../../data/rules/sheep';

type SheepToggleGridProps = {
  selected: readonly SheepId[];
  onToggle: (id: SheepId) => void;
  describe: (sheep: Sheep) => string;
};

export default function SheepToggleGrid({ selected, onToggle, describe }: SheepToggleGridProps) {
  return (
    <div role="group" aria-label="Sheep types" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {SHEEP.map((sheep) => {
        const active = selected.includes(sheep.id);
        return (
          <button
            key={sheep.id}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(sheep.id)}
            className={`min-h-11 rounded-2xl border px-4 py-2 text-left transition ${
              active
                ? 'border-primary bg-primary/15 text-primary'
                : 'border-primary/20 bg-white/70 text-text/80 hover:border-primary/50'
            }`}
          >
            <span className="block text-sm font-semibold">{sheep.name}</span>
            <span className={`block text-xs ${active ? 'text-primary/80' : 'text-text/60'}`}>
              {describe(sheep)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
