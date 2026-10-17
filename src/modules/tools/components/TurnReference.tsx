import RuleSectionCard from '../../../components/rules/RuleSectionCard';
import { TURN_PHASES } from '../../../data/rules/turn';

export default function TurnReference() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {TURN_PHASES.map((phase) => (
        <RuleSectionCard key={phase.id} section={phase} />
      ))}
    </div>
  );
}
