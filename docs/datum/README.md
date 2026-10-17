# Datum

Audience: developers and AI agents working on the Datum design system.
Status: Phase 1 (tokens and Storybook) · Last updated: 2026-10-17

Datum is the design system of Rafael Fachinelli, in the **Blueprint** visual direction (the drafting board). In technical drawing, the datum is the reference every dimension is measured from; the design system plays the same role for color, space and type.

- Public site: [design.rafaelfachinelli.com](https://design.rafaelfachinelli.com) (Storybook, `apps/datum`).
- Brand rules (essence, voice, direction, seasons, performance budget): [../brand.md](../brand.md).
- Plan and decisions: [../roadmap.md](../roadmap.md).

## Packages

| Workspace | Name | Role |
| --- | --- | --- |
| `packages/tokens` | `@datum/tokens` | W3C DTCG tokens; builds `dist/tokens.css` (CSS variables), `dist/theme.css` (Tailwind 4 theme) and `dist/tokens.json`; exports `getSeason`, `seasonIdFor`, `seasonInlineScript`, `contrastRatio`, `cssVar` |
| `apps/datum` | `@datum/storybook` | Storybook 10 (react-vite); docs pages in pt-BR; static site served by nginx |
| `packages/ui` (Phase 2) | `@datum/ui` | Components on shadcn/ui with the Blueprint personality layer |

Packages are workspace-only (not published to npm). The site consumes them through npm workspaces (`"*"`).

## Tokens

- Sources: `packages/tokens/src/tokens/*.json`, combined by `resolver.json` (base set + `season` modifier; later layers override, seasons never stack).
- Naming: CSS variables are `--datum-<path>` (`color.board` -> `--datum-color-board`). Tailwind utilities drop the `color.` prefix (`bg-board`, `text-ink`, `border-line-strong`) and keep `season-` (`text-season-accent`).
- Components use semantic tokens (`color.*`, `season.*`), never `palette.*`.
- Adding or changing a color: run `npm run test -w @datum/tokens`; the contrast tests fail if any text/background pair (or a season accent) drops below WCAG AA 4.5:1.

## Seasons

- Calendar and rules: [../brand.md](../brand.md#seasonal-themes). Logic: `packages/tokens/src/seasons.ts` (`seasonIdFor`), tested for 2026-2028.
- A season changes only `season.a`, `season.b` (logo gradient), `season.accent` and `season.on-accent`.
- Pages are statically cached, so the season is set in the browser: `seasonInlineScript` runs in `<head>` and sets `data-season` on `<html>` before the first paint.

## Storybook

- Run locally: `npm run dev -w @datum/storybook` (port 6006). Build: `npx turbo run build --filter=@datum/storybook`.
- Story titles stay ASCII (stable ids and URLs); `.storybook/manager.ts` maps them to accented labels in the sidebar.
- Deploy: Coolify app "Datum (Storybook)", Dockerfile `apps/datum/Dockerfile`, build context the repository root, branch `production`.
