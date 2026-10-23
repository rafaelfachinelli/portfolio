# Datum

Audience: developers and AI agents working on the Datum design system.
Status: version 0.3.1 (14 components); changelog on the Novidades page · Last updated: 2026-10-21

Datum is the design system of Rafael Fachinelli, in the **Blueprint** visual direction (the drafting board). In technical drawing, the datum is the reference every dimension is measured from; the design system plays the same role for color, space and type.

- Public site: [design.rafaelfachinelli.com](https://design.rafaelfachinelli.com) (Storybook, `apps/datum`).
- Brand rules (essence, voice, direction, seasons, performance budget): [../brand.md](../brand.md).
- Plan and decisions: [../roadmap.md](../roadmap.md).

## Packages

| Workspace | Name | Role |
| --- | --- | --- |
| `packages/tokens` | `@datum/tokens` | W3C DTCG tokens; builds `dist/tokens.css` (CSS variables), `dist/theme.css` (Tailwind 4 theme) and `dist/tokens.json`; exports `getSeason`, `seasonIdFor`, `seasonInlineScript`, `contrastRatio`, `cssVar` |
| `apps/datum` | `@datum/storybook` | Storybook 10 (react-vite); docs pages in pt-BR; static site served by nginx |
| `packages/ui` | `@datum/ui` | React components (primitives and general patterns) styled with Tailwind 4 on the token theme; shadcn/ui and Radix as the base |

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

## Components

- **Only primitives and general-purpose patterns** (Button, Badge, Card, Label, Separator, Input, Textarea, Select, RadioGroup, Tooltip, Sheet, Field, Callout, Stat). Components hold no user-facing text of their own: anything a screen reader says (a Stat trend, the Sheet close button) comes from props, so the consumer writes it in the page's language. Datum is shown publicly as a portfolio piece, so it holds what any project could use. Compositions specific to one page of the site (article card, home metrics, page title) are built in `apps/site` from Datum pieces and never move here.
- Form controls (Input, Textarea, SelectTrigger) share `controlClass` and call `useFieldControl(props)`, so inside a `Field` they get the id and ARIA wiring. A new control does the same.
- Code: `packages/ui/src/<component>.tsx`, exported from `src/index.ts`. Variants with `cva`, classes merged with `cn`, `asChild` (Radix Slot) where a component may render a link. Colors only from semantic tokens, so every component follows the season.
- The package ships TypeScript source. A consumer imports `tailwindcss`, `@datum/tokens/theme.css` and then `@datum/ui/styles.css` (an `@source`, so Tailwind generates the components' classes).
- Docs: `apps/datum/src/componentes/<Name>.stories.tsx` (one story per state) and `<Name>.mdx` (usage in pt-BR: when to use, variants, states, accessibility). Prop descriptions go in the stories' `argTypes`, in pt-BR.
- Accessibility: `@storybook/addon-a11y` runs axe on every story. Check color contrast in every season (the `season` global, for example `&globals=season:natal`) before merging a component with color variants.

## Storybook

- Run locally: `npm run dev -w @datum/storybook` (port 6006). Build: `npx turbo run build --filter=@datum/storybook`.
- Story titles stay ASCII (stable ids and URLs); `.storybook/manager.ts` maps them to accented labels in the sidebar.
- Deploy: Coolify app "Datum (Storybook)", Dockerfile `apps/datum/Dockerfile`, build context the repository root, branch `production`.
- Sharing card: `.storybook/manager-head.html` holds the Open Graph and Twitter tags (crawlers do not run JavaScript, so every Storybook URL shares the same card). The image `public/og.png` (1200×630) is drawn in `og/og.html`; after changing it, run `npm run og -w @datum/storybook` (headless Chrome; `CHROME=<path>` to pick the browser).

## Versions and Novidades

- One version for `@datum/tokens` and `@datum/ui`; they move together. Patch for fixes, minor for a new component, token, variant or optional prop, major for a breaking change.
- The changelog is the Storybook page **Datum / Novidades** (`apps/datum/src/Novidades.mdx`), written by hand in the PR that makes the change. Process: [.claude/skills/datum-release](../../.claude/skills/datum-release/SKILL.md).
