import { useMemo, useState } from 'react';
import { useSearch } from './useSearch';
import { formatSource } from '../../logic/rules';
import TopicBrowser from './components/TopicBrowser';
import NeutralBuildings from './components/NeutralBuildings';
import PrivateBuildings from './components/PrivateBuildings';

const quickLinks = [
  { label: 'Wellington', query: 'wellington' },
  { label: 'Delivery', query: 'delivery' },
  { label: 'Hazard', query: 'hazard' },
  { label: 'Exchange token', query: 'exchange token' },
  { label: 'Hand limit', query: 'hand limit' },
  { label: 'Gold', query: 'gold' },
  { label: 'Pathfinder', query: 'pathfinder' },
];

export default function CodexPage() {
  const [query, setQuery] = useState('');
  const search = useSearch();
  const results = useMemo(() => search(query), [query, search]);
  const searching = query.trim().length > 0;

  return (
    <main className="min-h-screen bg-canvas text-text">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-text/60">Codex</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Codex</h1>
          <p className="max-w-2xl text-sm text-text/70">
            Rules, buildings and terms with rulebook pages.
          </p>
        </header>

        <section className="rounded-2xl border border-primary/20 bg-white/70 p-5">
          <label
            htmlFor="codex-search"
            className="text-xs uppercase tracking-[0.35em] text-text/60"
          >
            Search the rules
          </label>
          <input
            id="codex-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Delivery, exchange token, gold, building…"
            className="mt-2 block min-h-11 w-full rounded-2xl border border-primary/30 bg-white px-5 py-3 text-lg font-semibold text-text outline-hidden transition focus:border-primary"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {quickLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => setQuery(link.query)}
                className="min-h-11 rounded-full border border-primary/30 bg-white px-4 text-sm font-semibold text-text/80 transition hover:border-primary hover:text-primary"
              >
                {link.label}
              </button>
            ))}
          </div>
        </section>

        {searching ? (
          results.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-primary/30 bg-white/60 p-6 text-center text-text/70">
              No results for “{query.trim()}”.
            </p>
          ) : (
            <section className="grid gap-4" aria-label="Search results">
              {results.map((result) => (
                <article
                  key={result.key}
                  className="rounded-2xl border border-primary/20 bg-white/70 p-5"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-lg font-semibold text-text">{result.title}</h2>
                    <span className="text-xs uppercase tracking-[0.25em] text-text/60">
                      {result.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-text/80">{result.text}</p>
                  <span className="mt-2 inline-block whitespace-nowrap text-xs text-text/50">
                    {formatSource(result.source)}
                  </span>
                </article>
              ))}
            </section>
          )
        ) : (
          <div className="space-y-10">
            <TopicBrowser />
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-text">Buildings</h2>
              <NeutralBuildings />
              <PrivateBuildings />
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
