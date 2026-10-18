import RuleSectionCard from '../../../components/rules/RuleSectionCard';
import { SEA_ROUTES } from '../../../data/rules/seaRoutes';

export default function SeaRoutesReference() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {SEA_ROUTES.map((route) => (
        <RuleSectionCard key={route.id} section={route} />
      ))}
    </div>
  );
}
