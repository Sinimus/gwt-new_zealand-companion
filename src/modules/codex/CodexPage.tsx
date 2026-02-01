import { Link } from 'react-router-dom';

export default function CodexPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-16">
        <h1 className="text-3xl font-semibold">Codex Module</h1>
        <p className="text-slate-300">
          Placeholder route. Add rules lookup, expansions, and quick references here.
        </p>
        <Link to="/" className="text-sm text-slate-400 hover:text-slate-200">
          ← Back to dashboard
        </Link>
      </div>
    </main>
  );
}
