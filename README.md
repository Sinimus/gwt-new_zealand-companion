# GWT New Zealand Companion

Web-centric PWA companion for Great Western Trail: New Zealand.

## Stack
- React + Vite + TypeScript (strict)
- Tailwind CSS v3.4
- React Router
- shadcn/ui-style structure (components/ui + lib/utils)

## Getting Started
```bash
pnpm install
pnpm dev
```

## Structure
- `src/modules/setup` — setup flow and checklists
- `src/modules/codex` — rules and references
- `src/modules/tools` — utility widgets
- `src/modules/scoring` — scoring tools
- `src/data/json` — static JSON fixtures

## Dev Log
- No tests yet; add vitest for module logic when rules parsing begins.
- Tailwind baseline only; theme tokens and components not defined.

## Roadmap
- Add module-specific routing layouts and shared navigation shell.
- Introduce data fixtures for setup presets and scoring templates.
- Add vitest coverage for scoring calculations.
