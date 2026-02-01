import type { BuildingSide } from '../../types';

type BuildingCardProps = {
  name: string;
  activeSide: BuildingSide;
};

export default function BuildingCard({ name, activeSide }: BuildingCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-slate-100 shadow-lg shadow-black/20">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Neutral Building</p>
        <h3 className="text-lg font-semibold leading-tight text-slate-50">{name}</h3>
      </div>
      <div className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-center">
        <span className="text-3xl font-semibold text-amber-200">Side {activeSide.side.toUpperCase()}</span>
      </div>
      <ul className="space-y-2 text-sm text-slate-300">
        {activeSide.actions.map((action, index) => (
          <li key={`${activeSide.id}-${index}`} className="rounded-lg bg-slate-950/60 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{action.type}</p>
            <p className="mt-2 text-sm text-slate-200">{action.description}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
