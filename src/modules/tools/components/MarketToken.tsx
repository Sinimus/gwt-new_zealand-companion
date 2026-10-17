import PlayerCountPicker from '../../../components/rules/PlayerCountPicker';
import RuleList from '../../../components/rules/RuleList';
import { usePlayerCount } from '../../../components/rules/usePlayerCount';
import { MARKET_ARROWS, SHEEP_MARKET_REFILL } from '../../../data/rules/turn';
import { itemsFor } from '../../../logic/rules';

export default function MarketToken() {
  const [count, setCount] = usePlayerCount();

  return (
    <div className="space-y-4">
      <PlayerCountPicker value={count} onChange={setCount} />
      <div className="grid gap-4 md:grid-cols-2">
        {MARKET_ARROWS.map((arrow) => (
          <section
            key={arrow.id}
            className="rounded-2xl border border-primary/20 bg-white/70 p-5"
          >
            <h3 className="text-lg font-semibold text-text">{arrow.label}</h3>
            <div className="mt-3">
              <RuleList items={[arrow.item]} />
            </div>
          </section>
        ))}
      </div>
      <section className="rounded-2xl border border-primary/20 bg-white/70 p-5">
        <h3 className="text-lg font-semibold text-text">Refilling the sheep market</h3>
        <div className="mt-3">
          <RuleList items={itemsFor(SHEEP_MARKET_REFILL, count)} />
        </div>
      </section>
    </div>
  );
}
