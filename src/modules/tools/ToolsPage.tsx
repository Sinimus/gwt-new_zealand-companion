import { useState } from 'react';
import MarketRefillGuide from './components/MarketRefillGuide';
import WellingtonChecklist from './components/WellingtonChecklist';

type ToolTab = 'wellington' | 'market';

const tabs: { id: ToolTab; label: string }[] = [
  { id: 'wellington', label: 'Wellington' },
  { id: 'market', label: 'Market Refill' },
];

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<ToolTab>('wellington');

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Tools Module</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Gameplay Assistants</h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Quick, high-contrast references for the most commonly missed steps.
          </p>
        </header>

        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition ${
                  isActive
                    ? 'border-amber-200 bg-amber-200/20 text-amber-100'
                    : 'border-slate-700 bg-slate-900/70 text-slate-300 hover:border-slate-500'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <section>
          {activeTab === 'wellington' ? <WellingtonChecklist /> : <MarketRefillGuide />}
        </section>
      </div>
    </main>
  );
}
