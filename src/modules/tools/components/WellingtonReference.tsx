import RuleList from '../../../components/rules/RuleList';
import RuleSectionCard from '../../../components/rules/RuleSectionCard';
import { FORESIGHT_PLACEMENT, WELLINGTON_SUBPHASES } from '../../../data/rules/turn';

export default function WellingtonReference() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {WELLINGTON_SUBPHASES.map((subphase) => (
          <RuleSectionCard key={subphase.id} section={subphase} />
        ))}
      </div>
      <section className="rounded-2xl border border-primary/20 bg-white/70 p-5">
        <h3 className="text-lg font-semibold text-text">Where foresight tiles go</h3>
        <div className="mt-3">
          <RuleList items={FORESIGHT_PLACEMENT} />
        </div>
      </section>
    </div>
  );
}
