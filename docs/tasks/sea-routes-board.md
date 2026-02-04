# Task: Interactive Sea Routes Board (MVP)

**Goal**: Implement a functional, interactive Sea Routes Board to track ships and port discs.

## Context
The Sea Routes Board is a central mechanic in Great Western Trail: New Zealand. Players move their ships along paths to reach ports where they can place discs for bonuses and delivery opportunities.

## Rules of Engagement
- **Thematic Consistency**: Maintain the app's aesthetic (Lucide icons, Tailwind "Pastoral" colors).
- **Persistence**: Use `localStorage` with namespaced keys (`gwt-nz-sea-state`).
- **Simplicity**: For the MVP, a structured list or a simple schematic grid is preferred over a full geographical map.

## Files to touch
- `src/types/index.ts`
- `src/modules/tools/ToolsPage.tsx`
- `src/modules/tools/components/SeaRoutesBoard.tsx` (New file)

## Instructions

1.  **Types**: Add `Port` and `SeaBoardState` to `src/types/index.ts`. A Port should have an `id`, `name`, `cost` (ship movement), and `bonus` description.
2.  **Component**: Create `src/modules/tools/components/SeaRoutesBoard.tsx`.
    - Define a static list of ports based on the game (e.g., Lyttelton, Akaroa, Timaru, Oamaru, Dunedin, etc.).
    - Implement state for `playerShips` (mapping player number to port ID).
    - Implement state for `claimedPorts` (tracking which players have discs on which ports).
    - Provide a UI to:
        - Change current port for each player.
        - Toggle a disc for a player on a specific port.
3.  **Persistence**: Implement `useEffect` hooks to save/load from `localStorage`.
4.  **Navigation**: Add "Sea Routes" as a new tab in `src/modules/tools/ToolsPage.tsx`.

## Acceptance Criteria
- [ ] Users can track ship positions for 1-4 players.
- [ ] Users can mark ports as "claimed" by placing virtual discs.
- [ ] Board state survives page refresh.
- [ ] Layout is clear and usable on mobile devices.
