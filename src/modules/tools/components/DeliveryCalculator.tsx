import { useMemo, useState } from 'react';

type SheepKey = 'romney' | 'lincoln' | 'perendale' | 'corriedale';

type SheepOption = {
  key: SheepKey;
  label: string;
  value: number;
};

const sheepOptions: SheepOption[] = [
  { key: 'romney', label: 'Romney', value: 1 },
  { key: 'lincoln', label: 'Lincoln', value: 2 },
  { key: 'perendale', label: 'Perendale', value: 3 },
  { key: 'corriedale', label: 'Corriedale', value: 4 },
];

export default function DeliveryCalculator() {
  const [selected, setSelected] = useState<Record<SheepKey, boolean>>({
    romney: false,
    lincoln: false,
    perendale: false,
    corriedale: false,
  });
  const [certificates, setCertificates] = useState(0);

  const total = useMemo(() => {
    const sheepTotal = sheepOptions.reduce(
      (sum, option) => sum + (selected[option.key] ? option.value : 0),
      0,
    );
    return sheepTotal + certificates;
  }, [selected, certificates]);

  const toggleSheep = (key: SheepKey) => {
    setSelected((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section className="flex flex-col gap-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-text">Delivery Value Calculator</h2>
        <p className="text-sm text-text/70">
          Select each distinct sheep type in hand and add certificates to estimate delivery value.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-primary/20 bg-white/80 p-5">
          <p className="text-xs uppercase tracking-[0.35em] text-text/60">Sheep Types</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {sheepOptions.map((option) => {
              const isActive = selected[option.key];
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => toggleSheep(option.key)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'border-secondary bg-secondary/15 text-secondary'
                      : 'border-primary/20 bg-white text-text/80 hover:border-primary'
                  }`}
                >
                  <span>{option.label}</span>
                  <span className="text-lg font-semibold">{option.value}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-primary/20 bg-white/80 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-text/60">Certificates</p>
            <input
              type="number"
              min={0}
              value={certificates}
              onChange={(event) => setCertificates(Number(event.target.value) || 0)}
              className="mt-4 w-full rounded-xl border border-primary/30 bg-white px-4 py-3 text-lg font-semibold text-text outline-none transition focus:border-secondary"
            />
          </div>
          <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-5 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-text/60">Total Delivery Value</p>
            <p className="mt-3 text-4xl font-semibold text-secondary">{total}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
