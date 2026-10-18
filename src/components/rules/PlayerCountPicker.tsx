import { PLAYER_COUNTS, type PlayerCount } from '../../data/rules/types';

type PlayerCountPickerProps = {
  value: PlayerCount;
  onChange: (count: PlayerCount) => void;
};

const labels: Readonly<Record<PlayerCount, string>> = {
  1: 'Solo',
  2: '2',
  3: '3',
  4: '4',
};

export default function PlayerCountPicker({ value, onChange }: PlayerCountPickerProps) {
  return (
    <div role="group" aria-label="Player count" className="flex flex-wrap gap-2">
      {PLAYER_COUNTS.map((count) => {
        const active = count === value;
        return (
          <button
            key={count}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(count)}
            className={`min-h-11 rounded-full border px-5 text-sm font-semibold uppercase tracking-[0.2em] transition ${
              active
                ? 'border-primary bg-primary/20 text-primary'
                : 'border-primary/30 bg-white/70 text-text/70 hover:border-primary'
            }`}
          >
            {labels[count]}
          </button>
        );
      })}
    </div>
  );
}
