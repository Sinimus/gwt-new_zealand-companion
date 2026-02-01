import { useState } from 'react';
import DeliveryCalculator from './components/DeliveryCalculator';
import MarketRefillGuide from './components/MarketRefillGuide';
import WellingtonChecklist from './components/WellingtonChecklist';

type ToolTab = 'wellington' | 'market' | 'calculator';

const tabs: { id: ToolTab; label: string }[] = [
  { id: 'wellington', label: 'Wellington' },
  { id: 'market', label: 'Market Refill' },
  { id: 'calculator', label: 'Calculator' },
];

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<ToolTab>('wellington');

  return (
    <main className="min-h-screen bg-canvas text-text">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-text/60">Tools Module</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Gameplay Assistants</h1>
          <p className="max-w-2xl text-sm text-text/70">
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
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-primary/30 bg-white/70 text-text/70 hover:border-primary'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <section>
          {activeTab === 'wellington' ? (
            <WellingtonChecklist />
          ) : activeTab === 'market' ? (
            <MarketRefillGuide />
          ) : (
            <DeliveryCalculator />
          )}
        </section>
      </div>
    </main>
  );
}
