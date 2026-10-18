import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import TurnReference from './components/TurnReference';
import WellingtonReference from './components/WellingtonReference';
import MarketToken from './components/MarketToken';
import IncomeCalculator from './components/IncomeCalculator';
import ShearingCalculator from './components/ShearingCalculator';
import BuySheep from './components/BuySheep';
import SeaRoutesReference from './components/SeaRoutesReference';

type ToolTab = 'turn' | 'wellington' | 'market' | 'income' | 'shearing' | 'buy-sheep' | 'sea-routes';

const tabs: { id: ToolTab; label: string }[] = [
  { id: 'turn', label: 'Turn' },
  { id: 'wellington', label: 'Wellington' },
  { id: 'market', label: 'Market token' },
  { id: 'income', label: 'Income' },
  { id: 'shearing', label: 'Shearing' },
  { id: 'buy-sheep', label: 'Buy sheep' },
  { id: 'sea-routes', label: 'Sea routes' },
];

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<ToolTab>('turn');
  const tabRefs = useRef<Map<ToolTab, HTMLButtonElement>>(new Map());

  const activateTab = (tab: ToolTab) => {
    setActiveTab(tab);
    tabRefs.current.get(tab)?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex === -1) {
      return;
    }
    let nextIndex: number;
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    const nextTab = tabs[nextIndex];
    if (nextTab) {
      activateTab(nextTab.id);
    }
  };

  return (
    <main className="min-h-screen bg-canvas text-text">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-text/60">Tools</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Tools</h1>
          <p className="max-w-2xl text-sm text-text/70">
            Turn, Wellington, market token, income, shearing, buying sheep and the sea routes.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="Tools"
          className="flex flex-wrap gap-2"
          onKeyDown={handleKeyDown}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  if (node) {
                    tabRefs.current.set(tab.id, node);
                  } else {
                    tabRefs.current.delete(tab.id);
                  }
                }}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => activateTab(tab.id)}
                className={`min-h-11 rounded-full border px-5 text-sm font-semibold uppercase tracking-[0.2em] transition ${
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

        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
        >
          {activeTab === 'turn' && <TurnReference />}
          {activeTab === 'wellington' && <WellingtonReference />}
          {activeTab === 'market' && <MarketToken />}
          {activeTab === 'income' && <IncomeCalculator />}
          {activeTab === 'shearing' && <ShearingCalculator />}
          {activeTab === 'buy-sheep' && <BuySheep />}
          {activeTab === 'sea-routes' && <SeaRoutesReference />}
        </div>
      </div>
    </main>
  );
}
