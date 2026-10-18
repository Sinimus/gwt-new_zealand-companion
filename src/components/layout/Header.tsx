import { Home } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { SCREEN_TITLES } from './useDocumentTitle';

export default function Header() {
  const location = useLocation();
  const moduleLabel = SCREEN_TITLES[location.pathname] ?? 'Dashboard';
  return (
    <header className="sticky top-0 z-30 border-b border-primary/20 bg-canvas/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-2">
        <Link to="/" className="flex min-h-11 items-center gap-3 text-text">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
            <Home className="h-5 w-5 text-primary" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-text/60">GWT New Zealand</p>
            <p className="font-heading text-base font-semibold">Companion App</p>
          </div>
        </Link>
        <span className="text-xs uppercase tracking-[0.3em] text-text/50">{moduleLabel}</span>
      </div>
    </header>
  );
}
