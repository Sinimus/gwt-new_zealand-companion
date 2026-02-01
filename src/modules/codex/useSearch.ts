import { useCallback } from 'react';
import Fuse from 'fuse.js';
import rulesData from '../../data/codex_rules.json';
import iconsData from '../../data/codex_icons.json';

type RuleEntry = {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
};

type IconEntry = {
  id: string;
  name: string;
  description: string;
  type: string;
};

export type SearchResult =
  | {
      kind: 'rule';
      id: string;
      title: string;
      category: string;
      content: string;
      tags: string[];
      score?: number;
    }
  | {
      kind: 'icon';
      id: string;
      name: string;
      description: string;
      type: string;
      score?: number;
    };

const rules = rulesData as RuleEntry[];
const icons = iconsData as IconEntry[];

const ruleFuse = new Fuse(rules, {
  keys: ['title', 'content', 'tags', 'category'],
  threshold: 0.3,
  includeScore: true,
});

const iconFuse = new Fuse(icons, {
  keys: ['name', 'description', 'type'],
  threshold: 0.3,
  includeScore: true,
});

export function useSearch() {
  return useCallback((query: string): SearchResult[] => {
    const trimmed = query.trim();
    if (!trimmed) {
      return [];
    }

    const ruleResults = ruleFuse.search(trimmed).map((result) => ({
      kind: 'rule' as const,
      id: result.item.id,
      title: result.item.title,
      category: result.item.category,
      content: result.item.content,
      tags: result.item.tags,
      score: result.score,
    }));

    const iconResults = iconFuse.search(trimmed).map((result) => ({
      kind: 'icon' as const,
      id: result.item.id,
      name: result.item.name,
      description: result.item.description,
      type: result.item.type,
      score: result.score,
    }));

    return [...ruleResults, ...iconResults].sort((a, b) => {
      const aScore = a.score ?? 1;
      const bScore = b.score ?? 1;
      return aScore - bScore;
    });
  }, []);
}
