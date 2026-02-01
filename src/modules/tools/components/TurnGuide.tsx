import { Footprints, ScrollText, Sparkles } from 'lucide-react';

export default function TurnGuide() {
  return (
    <section className="flex flex-col gap-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-text">Turn Guide</h2>
        <p className="text-sm text-text/70">A quick reference for the three phases of a turn.</p>
      </header>

      <div className="grid gap-4">
        <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-secondary/40 bg-white/70">
              <Footprints className="h-5 w-5 text-secondary" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-text/60">Phase A</p>
              <h3 className="text-lg font-semibold text-text">Move</h3>
            </div>
          </div>
          <p className="mt-4 text-sm text-text/80">
            Move Herder up to X steps (based on board). Pay for Hazards. End movement on a Tile.
          </p>
        </div>

        <div className="rounded-2xl border border-primary/40 bg-primary/10 p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/50 bg-white/70">
              <Sparkles className="h-5 w-5 text-primary" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-text/60">Phase B</p>
              <h3 className="text-lg font-semibold text-text">Action</h3>
            </div>
          </div>
          <p className="mt-4 text-sm text-text/80">
            If Neutral/Private Building: Do Local Action(s) OR Single Aux Action. If
            Kansas/Wellington: Perform Delivery steps.
          </p>
        </div>

        <div className="rounded-2xl border border-accent/30 bg-accent/10 p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-accent/40 bg-white/70">
              <ScrollText className="h-5 w-5 text-accent" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-text/60">Phase C</p>
              <h3 className="text-lg font-semibold text-text">Draw</h3>
            </div>
          </div>
          <p className="mt-4 text-sm text-text/80">Draw cards up to hand limit (default 4).</p>
        </div>
      </div>
    </section>
  );
}
