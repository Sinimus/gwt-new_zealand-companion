import { HelpCircle, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import PlayerAidModal from '../ui/PlayerAidModal';

const routeLabels: Record<string, string> = {
  '/': 'Dashboard',
  '/setup': 'Setup',
  '/codex': 'Codex',
  '/tools': 'Tools',
  '/scoring': 'Scoring',
};

export default function Header() {
  const location = useLocation();
  const moduleLabel = routeLabels[location.pathname] ?? 'Module';
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-primary/20 bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-2">
        <Link to="/" className="flex items-center gap-3 text-text">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
            <Home className="h-5 w-5 text-primary" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-text/60">GWT New Zealand</p>
            <p className="font-heading text-base font-semibold">Companion App</p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.3em] text-text/50">{moduleLabel}</span>
          <button
            type="button"
            onClick={() => setIsHelpOpen(true)}
            className="rounded-full border border-primary/30 bg-white/70 p-2 text-text/70 transition hover:border-primary hover:text-text"
            aria-label="Open player aid"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
      <PlayerAidModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </header>
  );
}
