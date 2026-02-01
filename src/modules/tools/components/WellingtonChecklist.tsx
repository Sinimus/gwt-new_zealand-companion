import { useState } from 'react';

const steps = [
  {
    id: 'income',
    title: 'Income & Certificates',
    detail: 'Gain Income. Optionally decline for £ per certificate.',
  },
  {
    id: 'delivery',
    title: 'Delivery',
    detail: 'Check distinct sheep, max value, then place your disc.',
  },
  {
    id: 'foresight',
    title: 'Foresight',
    detail: 'MUST PICK 2 TOKENS before moving on.',
    highlight: true,
  },
  {
    id: 'bonus',
    title: 'Bonus',
    detail: 'Perform the action covered by your disc.',
  },
] as const;

type StepState = Record<(typeof steps)[number]['id'], boolean>;

const defaultState: StepState = {
  income: false,
  delivery: false,
  foresight: false,
  bonus: false,
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
        <h2 className="text-2xl font-semibold text-slate-100">Wellington Delivery</h2>
        <p className="text-sm text-slate-300">
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
                  ? 'border-amber-300/60 bg-amber-200/10'
                  : 'border-slate-800 bg-slate-900/70'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(step.id)}
                className="mt-1 h-5 w-5 accent-amber-200"
              />
              <div>
                <p
                  className={`text-lg font-semibold ${
                    step.highlight ? 'text-amber-100' : 'text-slate-100'
                  }`}
                >
                  {step.title}
                </p>
                <p className="mt-1 text-sm text-slate-300">{step.detail}</p>
              </div>
            </label>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setChecked(defaultState)}
        className="w-full rounded-full border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
      >
        Reset Checklist
      </button>
    </section>
  );
}
