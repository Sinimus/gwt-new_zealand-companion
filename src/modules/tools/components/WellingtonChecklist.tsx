import { useState } from 'react';

const steps = [
  {
    id: 'income',
    title: 'Income & Certificates',
    detail: 'Receive income and apply any certificates as needed.',
  },
  {
    id: 'delivery',
    title: 'Delivery',
    detail: 'Sum unique sheep values and place your disc.',
  },
  {
    id: 'foresightA',
    title: 'Foresight A',
    detail: 'Place disc on the chosen Foresight A space.',
    highlight: true,
  },
  {
    id: 'foresightB',
    title: 'Foresight B',
    detail: 'Perform the action associated with that space.',
    highlight: true,
  },
  {
    id: 'cleanup',
    title: 'Cleanup',
    detail: 'Refill Foresight spaces if needed.',
  },
] as const;

type StepState = Record<(typeof steps)[number]['id'], boolean>;

const defaultState: StepState = {
  income: false,
  delivery: false,
  foresightA: false,
  foresightB: false,
  cleanup: false,
};

export default function WellingtonChecklist() {
  const [checked, setChecked] = useState<StepState>(defaultState);

  const toggle = (id: keyof StepState) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="flex flex-col gap-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-text">Wellington Delivery</h2>
        <p className="text-sm text-text/70">
          Tick each step as you resolve the Wellington phase.
        </p>
      </header>

      <div className="space-y-3">
        {steps.map((step) => {
          const isChecked = checked[step.id];
          return (
            <label
              key={step.id}
              className={`flex cursor-pointer items-start gap-4 rounded-2xl border px-5 py-4 transition ${
                step.highlight
                  ? 'border-l-4 border-primary/60 bg-primary/10 shadow-sm'
                  : 'border-primary/20 bg-white/80'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(step.id)}
                className="mt-1 h-5 w-5 accent-primary"
              />
              <div>
                <p
                  className={`text-lg font-semibold ${
                    step.highlight ? 'text-primary' : 'text-text'
                  }`}
                >
                  {step.title}
                </p>
                <p className="mt-1 text-sm text-text/70">{step.detail}</p>
              </div>
            </label>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setChecked(defaultState)}
        className="w-full rounded-full border border-primary/30 bg-white/80 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-text/80 transition hover:border-primary hover:bg-white"
      >
        Reset Checklist
      </button>
    </section>
  );
}
