import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-canvas/95">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-text/70 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-semibold text-text">© 2026 Sinimus</p>
          <p>Fan-made companion app. Not affiliated with Eggertspiele or Alexander Pfister.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.25em]">
          <span>v1.0.0</span>
          <span>GPL-3.0</span>
          <a
            href="https://github.com/Sinimus/gwt-new_zealand-companion"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-text/70 transition hover:text-primary"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
