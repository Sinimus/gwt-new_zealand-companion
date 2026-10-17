import RuleList from '../../../components/rules/RuleList';
import { HARBOURMASTER_TASKS, SCORING_RULES } from '../../../data/rules/scoring';

interface RankedRow {
  player: number;
  total: number;
  rank: number;
  sharedWin: boolean;
}

type ResultsCardProps = {
  ranked: readonly RankedRow[];
  nameOf: (player: number) => string;
};

export default function ResultsCard({ ranked, nameOf }: ResultsCardProps) {
  return (
    <section className="rounded-2xl border border-primary/20 bg-white/70 p-5">
      <h2 className="text-lg font-semibold text-text">Results</h2>
      <ol className="mt-3 space-y-2">
        {ranked.map((row) => (
          <li
            key={row.player}
            className={`flex min-h-11 items-center justify-between gap-4 rounded-2xl border px-4 py-2 text-sm ${
              row.rank === 1
                ? 'border-primary/50 bg-primary/10 font-semibold text-text'
                : 'border-primary/20 bg-white/60 text-text/80'
            }`}
          >
            <span>
              {row.rank}. {nameOf(row.player)}: {row.total} VP
              {row.sharedWin && (
                <span className="ml-2 text-xs uppercase tracking-[0.2em] text-primary">
                  Shared victory
                </span>
              )}
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-5">
        <RuleList items={SCORING_RULES} />
      </div>
      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-semibold text-text">
          Harbourmaster tasks
        </summary>
        <div className="mt-3">
          <RuleList items={HARBOURMASTER_TASKS} />
        </div>
      </details>
    </section>
  );
}
