import RuleList from '../../../components/rules/RuleList';
import { NEUTRAL_BUILDINGS, NEUTRAL_RULES } from '../../../data/rules/buildings';
import { formatSource } from '../../../logic/rules';

export default function NeutralBuildings() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text">Neutral buildings</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {NEUTRAL_BUILDINGS.map((building) => (
          <article
            key={building.letter}
            className="rounded-2xl border border-primary/20 bg-white/70 p-5"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="text-base font-semibold text-text">
                Neutral building {building.letter}
              </h4>
              <span className="whitespace-nowrap text-xs text-text/50">
                {formatSource(building.source)}
              </span>
            </div>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-text/80">
              {building.front.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ol>
            {building.back && (
              <div className="mt-4">
                <p className="text-xs uppercase tracking-[0.35em] text-text/60">
                  After flipping (II side)
                </p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-text/80">
                  {building.back.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ol>
              </div>
            )}
          </article>
        ))}
      </div>
      <section className="rounded-2xl border border-primary/20 bg-white/70 p-5">
        <h4 className="text-base font-semibold text-text">During the game</h4>
        <div className="mt-3">
          <RuleList items={NEUTRAL_RULES} />
        </div>
      </section>
    </div>
  );
}
