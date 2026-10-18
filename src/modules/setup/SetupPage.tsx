import PlayerCountPicker from '../../components/rules/PlayerCountPicker';
import RuleSectionCard from '../../components/rules/RuleSectionCard';
import { usePlayerCount } from '../../components/rules/usePlayerCount';
import type { RuleSource } from '../../data/rules/types';
import { SETUP_SECTIONS } from '../../data/rules/setup';
import { SOLO_REFERENCE, SOLO_SETUP } from '../../data/rules/solo';
import { formatSource, sectionsFor } from '../../logic/rules';
import { setupNumbers, startingResources } from '../../logic/setup';

const SETUP_SOURCE: RuleSource = { book: 'rules', pages: '4-5' };
const CAPITAL_SOURCE: RuleSource = { book: 'rules', pages: '5' };
const SARAH_SOURCE: RuleSource = { book: 'solo', pages: '1' };

const seatLabels: readonly string[] = ['1st', '2nd', '3rd', '4th'];

export default function SetupPage() {
  const [count, setCount] = usePlayerCount();
  const numbers = setupNumbers(count);
  const resources = startingResources(count);
  const sections = sectionsFor([SOLO_SETUP, ...SETUP_SECTIONS], count);

  return (
    <main className="min-h-screen bg-canvas text-text">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-text/60">Setup</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Setup</h1>
          <p className="max-w-2xl text-sm text-text/70">
            Setup for 1 to 4 players, solo against Sarah included.
          </p>
          <PlayerCountPicker value={count} onChange={setCount} />
        </header>

        <section className="rounded-2xl border border-primary/20 bg-white/70 p-5">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-semibold text-text">At a glance</h2>
            <span className="whitespace-nowrap text-xs text-text/50">
              {formatSource(SETUP_SOURCE)}
            </span>
          </div>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-text/60">
                Sheep market cards
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-text">{numbers.sheepMarket}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-text/60">
                Job market tiles drawn
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-text">{numbers.jobMarketTiles}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-text/60">
                Bonus tiles in the market
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-text">{numbers.bonusTiles}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-text/60">
                Bonus cards per set
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-text">{numbers.bonusCardsPerSet}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-text/60">Step tiles</dt>
              <dd className="mt-1 text-2xl font-semibold text-text">{numbers.stepTiles}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-primary/20 bg-white/70 p-5">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-semibold text-text">Starting capital</h2>
            <span className="whitespace-nowrap text-xs text-text/50">
              {formatSource(CAPITAL_SOURCE)}
            </span>
          </div>
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-[0.2em] text-text/60">
                <th scope="col" className="py-2 pr-4 font-semibold">
                  Seat
                </th>
                <th scope="col" className="py-2 pr-4 font-semibold">
                  Pounds
                </th>
                <th scope="col" className="py-2 pr-4 font-semibold">
                  Cards
                </th>
                <th scope="col" className="py-2 font-semibold">
                  Exchange tokens
                </th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr key={resource.seat} className="border-t border-primary/10">
                  <td className="py-2 pr-4 font-semibold text-text">
                    {seatLabels[resource.seat - 1] ?? resource.seat}
                  </td>
                  <td className="py-2 pr-4 text-text/80">{resource.pounds}</td>
                  <td className="py-2 pr-4 text-text/80">{resource.cards}</td>
                  <td className="py-2 text-text/80">{resource.exchangeTokens}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {count === 1 && (
            <p className="mt-4 text-sm text-text/80">
              Sarah: no money, cards or exchange token.
              <span className="ml-2 whitespace-nowrap text-xs text-text/50">
                {formatSource(SARAH_SOURCE)}
              </span>
            </p>
          )}
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <RuleSectionCard key={section.id} section={section} />
          ))}
        </div>

        {count === 1 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-text">Playing against Sarah</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {SOLO_REFERENCE.map((section) => (
                <RuleSectionCard key={section.id} section={section} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
