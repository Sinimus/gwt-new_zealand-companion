import { lazy, Suspense } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router';
import { BookOpen, Map, Trophy, Wrench } from 'lucide-react';
import AppLayout from './components/layout/AppLayout';

const SetupPage = lazy(() => import('./modules/setup/SetupPage'));
const CodexPage = lazy(() => import('./modules/codex/CodexPage'));
const ToolsPage = lazy(() => import('./modules/tools/ToolsPage'));
const ScoringPage = lazy(() => import('./modules/scoring/ScoringPage'));

const modules = [
  {
    title: 'Setup',
    description: 'Setup for 1 to 4 players, solo against Sarah included.',
    icon: Map,
    to: '/setup',
  },
  {
    title: 'Codex',
    description: 'Rules, buildings and terms with rulebook pages.',
    icon: BookOpen,
    to: '/codex',
  },
  {
    title: 'Tools',
    description:
      'Turn, Wellington, market token, income, shearing, buying sheep and the sea routes.',
    icon: Wrench,
    to: '/tools',
  },
  {
    title: 'Scoring',
    description: 'The 12 categories of the scoring pad.',
    icon: Trophy,
    to: '/scoring',
  },
];

function Dashboard() {
  const location = useLocation();

  return (
    <main className="bg-canvas text-text">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-text/60">GWT:NZ Companion</p>
          <h1 className="text-4xl font-semibold text-text sm:text-5xl">
            Great Western Trail: New Zealand
          </h1>
          <p className="max-w-2xl text-base text-text/70 sm:text-lg">
            A reference for the table: you play the game, the app stores nothing.
          </p>
        </header>
        <section className="grid gap-4 sm:grid-cols-2">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.title}
                to={{ pathname: module.to, search: location.search }}
                className="group rounded-2xl border border-primary/20 bg-white/70 p-6 shadow-xs transition hover:-translate-y-1 hover:border-primary/50 hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-text">{module.title}</h2>
                  <Icon
                    aria-hidden="true"
                    className="h-6 w-6 text-primary transition group-hover:text-secondary"
                  />
                </div>
                <p className="mt-3 text-sm text-text/70">{module.description}</p>
                <span className="mt-6 inline-flex text-xs uppercase tracking-[0.2em] text-text/60">
                  Enter module
                </span>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <AppLayout>
      <Suspense
        fallback={
          <p className="px-6 py-16 text-center text-sm text-text/60" role="status">
            Loading…
          </p>
        }
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/codex" element={<CodexPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/scoring" element={<ScoringPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
}
