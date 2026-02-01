const playerRules = [
  {
    count: 2,
    rule: 'Refill 1 card to the Sheep Market after each purchase.',
  },
  {
    count: 3,
    rule: 'Refill 2 cards to the Sheep Market after each purchase.',
  },
  {
    count: 4,
    rule: 'Refill 2 cards to the Sheep Market after each purchase.',
  },
] as const;

export default function MarketRefillGuide() {
  return (
    <section className="flex flex-col gap-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-100">Sheep Market Refill</h2>
        <p className="text-sm text-slate-300">
          Quick reference for how many cards to refill based on player count.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {playerRules.map((entry) => (
          <div
            key={entry.count}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              {entry.count} Players
            </p>
            <p className="mt-3 text-lg font-semibold text-slate-100">{entry.rule}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-300">
        Always refill immediately after buying sheep. If your group uses variants, confirm
        against your rulebook.
      </div>
    </section>
  );
}
