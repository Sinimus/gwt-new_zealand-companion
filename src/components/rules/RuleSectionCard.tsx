import type { RuleSection } from '../../data/rules/types';
import RuleList from './RuleList';

type RuleSectionCardProps = {
  section: RuleSection;
};

export default function RuleSectionCard({ section }: RuleSectionCardProps) {
  return (
    <section className="rounded-2xl border border-primary/20 bg-white/70 p-5">
      <h3 className="text-lg font-semibold text-text">{section.title}</h3>
      <div className="mt-3">
        <RuleList items={section.items} />
      </div>
    </section>
  );
}
