import { Link, Route, Routes } from 'react-router-dom';
import { BookOpen, Map, Trophy, Wrench } from 'lucide-react';
import SetupPage from './modules/setup/SetupPage';
import CodexPage from './modules/codex/CodexPage';
import ToolsPage from './modules/tools/ToolsPage';
import ScoringPage from './modules/scoring/ScoringPage';

const modules = [
  {
    title: 'Setup',
    description: 'Prepare the table and initialize the New Zealand flow.',
    icon: Map,
    to: '/setup',
  },
  {
    title: 'Codex',
    description: 'Rules references, expansions, and tactical notes.',
    icon: BookOpen,
    to: '/codex',
  },
  {
    title: 'Tools',
    description: 'Timers, trackers, and utility widgets for play.',
    icon: Wrench,
    to: '/tools',
  },
  {
    title: 'Scoring',
    description: 'Score computation and endgame summaries.',
    icon: Trophy,
    to: '/scoring',
  },
];

function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-16">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">GWT Companion</p>
          <h1 className="text-4xl font-semibold text-slate-50 sm:text-5xl">
            Great Western Trail: New Zealand
          </h1>
          <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
            A focused command center for setup, rules, utilities, and scoring.
          </p>
        </header>
        <section className="grid gap-4 sm:grid-cols-2">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.title}
                to={module.to}
                className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-100">{module.title}</h2>
                  <Icon className="h-6 w-6 text-slate-400 transition group-hover:text-slate-200" />
                </div>
                <p className="mt-3 text-sm text-slate-400">{module.description}</p>
                <span className="mt-6 inline-flex text-xs uppercase tracking-[0.2em] text-slate-500">
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
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/setup" element={<SetupPage />} />
      <Route path="/codex" element={<CodexPage />} />
      <Route path="/tools" element={<ToolsPage />} />
      <Route path="/scoring" element={<ScoringPage />} />
    </Routes>
  );
}
