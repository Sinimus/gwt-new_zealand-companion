import {
  Anchor,
  Coins,
  FileBadge,
  Footprints,
  GraduationCap,
  Hammer,
  LayoutTemplate,
  Mountain,
  RefreshCw,
  Scissors,
  Sun,
  Target,
  TriangleAlert,
  Users,
  Waves,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearch } from './useSearch';
import iconsData from '../../data/codex_icons.json';

const iconMap = {
  i1: Footprints,
  i2: FileBadge,
  i3: Coins,
  i4: RefreshCw,
  i5: LayoutTemplate,
  w1: Users,
  w2: Hammer,
  w3: Anchor,
  w4: Scissors,
  h1: TriangleAlert,
  h2: Waves,
  h3: Mountain,
  h4: Sun,
  a1: Hammer,
  a2: GraduationCap,
  a3: Target,
} as const;

const icons = iconsData as Array<{
  id: string;
  name: string;
  description: string;
  type: string;
}>;

const galleryGroups = icons.reduce<Record<string, typeof icons>>((acc, icon) => {
  acc[icon.type] = acc[icon.type] ? [...acc[icon.type], icon] : [icon];
  return acc;
}, {});

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
          <section className="space-y-6">
            <div className="rounded-2xl border border-primary/20 bg-white/70 p-5">
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
            </div>
            <div className="rounded-2xl border border-primary/20 bg-white/70 p-5">
              <h2 className="text-lg font-semibold text-text">Visual Gallery</h2>
              <div className="mt-6 space-y-6">
                {Object.entries(galleryGroups).map(([group, groupIcons]) => (
                  <div key={group} className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.35em] text-text/60">{group}</p>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {groupIcons.map((icon) => {
                        const Icon = iconMap[icon.id as keyof typeof iconMap] ?? LayoutTemplate;
                        const isHazard = icon.type.toLowerCase() === 'hazard';
                        return (
                          <div
                            key={icon.id}
                            className="flex items-center gap-4 rounded-2xl border border-primary/20 bg-white/80 p-4"
                          >
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                                isHazard
                                  ? 'border-amber-300/40 bg-amber-100'
                                  : 'border-primary/30 bg-primary/10'
                              }`}
                            >
                              <Icon
                                className={`h-6 w-6 ${isHazard ? 'text-amber-700' : 'text-primary'}`}
                              />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-text">{icon.name}</p>
                              <p className="text-xs text-text/60">{icon.type}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
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
