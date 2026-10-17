import { Coins, Flag, Hammer, Layers, Map as MapIcon, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import RuleSectionCard from '../../../components/rules/RuleSectionCard';
import { CODEX_TOPICS, type CodexCategory, type CodexTopic } from '../../../data/rules/codex';

// Decorations only, not game icons (the rulebook icons are not reproduced here).
const categoryIcons: Readonly<Record<CodexCategory, LucideIcon>> = {
  Actions: Hammer,
  Resources: Coins,
  Workers: Users,
  Cards: Layers,
  Board: MapIcon,
  'Game end': Flag,
};

const categoryOrder: readonly CodexCategory[] = [
  'Actions',
  'Resources',
  'Workers',
  'Cards',
  'Board',
  'Game end',
];

export default function TopicBrowser() {
  return (
    <div className="space-y-8">
      {categoryOrder.map((category) => {
        const topics: readonly CodexTopic[] = CODEX_TOPICS.filter((topic) => topic.category === category);
        if (topics.length === 0) {
          return null;
        }
        const Icon = categoryIcons[category];
        return (
          <section key={category} className="space-y-4">
            <h2 className="flex items-center gap-3 text-2xl font-semibold text-text">
              <Icon aria-hidden="true" className="h-6 w-6 text-primary" />
              {category}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {topics.map((topic) => (
                <RuleSectionCard key={topic.id} section={topic} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
