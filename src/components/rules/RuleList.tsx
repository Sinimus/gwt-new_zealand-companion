import type { RuleItem } from '../../data/rules/types';
import { formatSource } from '../../logic/rules';

type RuleListProps = {
  items: readonly RuleItem[];
};

export default function RuleList({ items }: RuleListProps) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item.id} className="whitespace-pre-line text-sm leading-relaxed text-text/80">
          {item.text}
          <span className="ml-2 whitespace-nowrap text-xs text-text/50">
            {formatSource(item.source)}
          </span>
        </li>
      ))}
    </ul>
  );
}
