import type { BuildingSide } from '../../types';

type BuildingCardProps = {
  name: string;
  activeSide: BuildingSide;
};

export default function BuildingCard({ name, activeSide }: BuildingCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-primary/20 bg-white/75 p-5 text-text shadow-sm">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.35em] text-text/60">Neutral Building</p>
        <h3 className="text-lg font-semibold leading-tight text-text">{name}</h3>
      </div>
      <div className="rounded-xl border border-primary/30 bg-canvas px-4 py-3 text-center">
        <span className="text-3xl font-semibold text-primary">
          Side {activeSide.side.toUpperCase()}
        </span>
      </div>
      <ul className="space-y-2 text-sm text-text/80">
        {activeSide.actions.map((action, index) => (
          <li key={`${activeSide.id}-${index}`} className="rounded-lg bg-white/90 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-text/60">{action.type}</p>
            <p className="mt-2 text-sm text-text/90">{action.description}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
