import { X } from 'lucide-react';
import { useState } from 'react';

type PlayerAidModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type TabKey = 'turn' | 'mechanics';

const tabs: { id: TabKey; label: string }[] = [
  { id: 'turn', label: 'Turn Structure' },
  { id: 'mechanics', label: 'Key Mechanics' },
];

export default function PlayerAidModal({ isOpen, onClose }: PlayerAidModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('turn');

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-primary/20 bg-canvas p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-text/60">Player Aid</p>
            <h2 className="mt-2 text-2xl font-semibold text-text">Quick Reference</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-primary/30 bg-white/70 p-2 text-text/70 transition hover:border-primary hover:text-text"
            aria-label="Close player aid"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
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

        <div className="mt-6 space-y-4 text-sm text-text/80">
          {activeTab === 'turn' ? (
            <div className="rounded-2xl border border-primary/20 bg-white/80 p-4">
              <p className="text-sm font-semibold text-text">Turn Structure</p>
              <p className="mt-2">
                Phase A: Move Herder (step limit). Phase B: Local Action (if neutral/private)
                OR Single Aux Action. Phase C: Draw back to hand limit.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-primary/20 bg-white/80 p-4">
              <p className="text-sm font-semibold text-text">Key Mechanics</p>
              <p className="mt-2">
                Shearing: Value = (Distinct Sheep × Breed) + Certs + Shearer Bonus. / Gold:
                Max 50. / Hand Limit: 4 (initially).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
