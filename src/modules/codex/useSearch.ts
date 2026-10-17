import { useCallback } from 'react';
import Fuse from 'fuse.js';
import { CODEX_TOPICS } from '../../data/rules/codex';
import { NEUTRAL_BUILDINGS, PRIVATE_BUILDINGS } from '../../data/rules/buildings';
import type { RuleSource } from '../../data/rules/types';

export interface SearchEntry {
  key: string;
  topicId: string;
  title: string;
  category: string;
  tags: readonly string[];
  text: string;
  source: RuleSource;
}

const entries: SearchEntry[] = [
  ...CODEX_TOPICS.flatMap((topic) =>
    topic.items.map((item) => ({
      key: `${topic.id}:${item.id}`,
      topicId: topic.id,
      title: topic.title,
      category: topic.category,
      tags: topic.tags,
      text: item.text,
      source: item.source,
    })),
  ),
  ...NEUTRAL_BUILDINGS.map((building) => ({
    key: `neutral-${building.letter}`,
    topicId: `neutral-${building.letter}`,
    title: `Neutral building ${building.letter}`,
    category: 'Buildings',
    tags: ['building', 'neutral', building.letter.toLowerCase()],
    text: [...building.front, ...(building.back ?? [])].join(' '),
    source: building.source,
  })),
  ...PRIVATE_BUILDINGS.map((building) => ({
    key: `private-${building.id}`,
    topicId: `private-${building.id}`,
    title: `Private building ${building.id}`,
    category: 'Buildings',
    tags: ['building', 'private', building.id],
    text: building.actions.join(' '),
    source: building.source,
  })),
];

const fuse = new Fuse(entries, {
  keys: [{ name: 'title', weight: 2 }, 'tags', 'text'],
  threshold: 0.3,
});

export function useSearch(): (query: string) => SearchEntry[] {
  return useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      return [];
    }
    return fuse.search(trimmed).map((result) => result.item);
  }, []);
}
