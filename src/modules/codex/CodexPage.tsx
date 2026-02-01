import { Coins, FileBadge, Footprints, LayoutTemplate, RefreshCw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearch } from './useSearch';

const iconMap = {
  i1: Footprints,
  i2: FileBadge,
  i3: Coins,
  i4: RefreshCw,
  i5: LayoutTemplate,
} as const;

const quickLinks = [
  { label: 'Wellington', query: 'wellington' },
  { label: 'Delivery', query: 'delivery' },
  { label: 'Hazards', query: 'hazard' },
  { label: 'Exchange Token', query: 'exchange token' },
  { label: 'Hand Limit', query: 'hand limit' },
  { label: 'Gold', query: 'gold' },
];

export default function CodexPage() {
  const [query, setQuery] = useState('');
  const search = useSearch();
  const results = useMemo(() => search(query), [query, search]);

  return (
    <main className="min-h-screen bg-canvas text-text">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-text/60">Codex</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Rules & Icon Search</h1>
          <p className="max-w-2xl text-sm text-text/70">
            Type a rule, symbol, or keyword to find instant answers.
          </p>
        </header>

        <div className="rounded-3xl border border-primary/20 bg-white/70 p-5">
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for delivery, exchange token, gold..."
            className="w-full rounded-2xl border border-primary/30 bg-white px-5 py-4 text-lg font-semibold text-text outline-none transition focus:border-primary"
          />
        </div>

        {query.trim().length === 0 ? (
          <section className="rounded-2xl border border-primary/20 bg-white/70 p-5">
            <h2 className="text-lg font-semibold text-text">Quick Links</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => setQuery(link.query)}
                  className="rounded-full border border-primary/30 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-text/80 transition hover:border-primary hover:text-primary"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </section>
        ) : results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-primary/30 bg-white/60 p-6 text-center text-text/70">
            No results found for “{query}”.
          </div>
        ) : (
          <section className="grid gap-4">
            {results.map((result) => {
              if (result.kind === 'rule') {
                return (
                  <article
                    key={result.id}
                    className="rounded-2xl border border-sky-400/40 bg-white/80 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-900">
                        Rule
                      </span>
                      <span className="text-xs uppercase tracking-[0.25em] text-text/60">
                        {result.category}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-text">
                      {result.title}
                    </h3>
                    <p className="mt-2 whitespace-pre-line text-sm text-text/80">
                      {result.content}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-text/70">
                      {result.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary/30 bg-primary/10 px-2 py-1 text-text"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              }

              return (
                <article
                  key={result.id}
                  className="rounded-2xl border border-amber-300/40 bg-white/80 p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900">
                          Icon
                        </span>
                        <span className="text-xs uppercase tracking-[0.25em] text-text/60">
                          {result.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-text">{result.name}</h3>
                      <p className="text-sm text-text/80">{result.description}</p>
                    </div>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/40 bg-amber-300/10">
                      {(() => {
                        const Icon = iconMap[result.id as keyof typeof iconMap];
                        return Icon ? (
                          <Icon className="h-9 w-9 text-amber-500" />
                        ) : (
                          <LayoutTemplate className="h-9 w-9 text-amber-500" />
                        );
                      })()}
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
