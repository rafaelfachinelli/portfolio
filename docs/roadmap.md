# Portfolio roadmap: brand, design system and tools

Status: planning · Last updated: 2026-10-17

## Goal

Turn rafaelfachinelli.com into a public lab where every piece is useful on its own and proves the work: a design system for the Rafael Fachinelli brand, tools built on top of it, and an article or case study for each piece.

## Decisions

| # | Decision | Choice | Date |
| --- | --- | --- | --- |
| D1 | Code structure | Monorepo in this repository (site, Storybook, tokens and UI packages), same model as Castle Raiders | 2026-10-17 |
| D2 | Brand | Evolve the current identity: keep the dark navy base, sky / indigo / amber accents and the RF logo, no rebrand. With D10 the space background gives way to the Blueprint drafting grid | 2026-10-17 |
| D3 | Visibility | Public: code on GitHub and Storybook online as a showcase | 2026-10-17 |
| D4 | Design system address | `design.rafaelfachinelli.com` (Storybook, Coolify). DNS already resolves to the VPS | 2026-10-17 |
| D5 | First tool | CLT x PJ calculator, at `rafaelfachinelli.com/<lang>/ferramentas/...` (subfolder for SEO) | 2026-10-17 |
| D6 | Theme | Dark only; remove the light/system theme switcher | 2026-10-17 |
| D7 | Seasons | Automatic seasonal themes by date (DTCG resolver `season` modifier), including logo colors | 2026-10-17 |
| D8 | Logo | Keep the current RF mark; only colors vary by season | 2026-10-17 |
| D9 | Performance | Part of the brand: fix the mobile freeze caused by the animated background; budget in `docs/brand.md` (approved) | 2026-10-17 |
| D10 | Visual direction | **Blueprint** is the official design system direction, chosen after comparing three previews (Blueprint, Órbita, Constelação) | 2026-10-17 |
| D11 | Design system name | **Datum** (Latin "something given"; in technical drawing, the reference from which every dimension is measured; in Brazil also the geodetic reference, e.g. "datum SIRGAS 2000"). Works in English and Portuguese. Always shown with the brand ("Datum, design system de Rafael Fachinelli") because the word alone is common. "Blueprint" stays the name of the visual direction. Replaces Prancheta, which was chosen and then dropped as too Brazil-only | 2026-10-17 |
| D12 | Component base | Keep shadcn/ui (Radix) as the base, with the Blueprint personality layer on top; not stock shadcn | 2026-10-17 |
| D13 | Season calendar | Approved as listed in brand.md | 2026-10-17 |
| D14 | "See inside" mode | Dropped. Storybook already ships Measure and Outline tools for designers and devs; on the site it stays a parked idea | 2026-10-17 |

Brand principles: [brand.md](./brand.md).

## Phases

### Phase 0: brand foundation (done)
Interview, brand principles ([brand.md](./brand.md)) and three visual previews. Blueprint chosen. The previews are private Claude artifacts: [Blueprint](https://claude.ai/artifact/VcVGWnH6cpXAhThuyrcZK9), [Órbita](https://claude.ai/artifact/5zLgornzPR27aoh6uWgGVa), [Constelação](https://claude.ai/artifact/8caSoSfu7E1MEsXQHi4UdW).

### Phase 1: monorepo, tokens and Storybook (done 2026-10-17)

One PR per step, in this order. Nothing visible changes until step 1.3. Package scope: `@datum/*`.

**1.0 Baseline (done 2026-10-17).** Lighthouse 12.6.1, default mobile profile (throttled), live site:

| Page | Performance | LCP | TBT | CLS | Accessibility | SEO |
| --- | --- | --- | --- | --- | --- | --- |
| `/pt-BR` | 54 | 4.7 s | 1,424 ms | 0 | 100 | 100 |
| `/pt-BR/articles/piramide-de-testes-na-pratica` | 66 | 3.2 s | 1,500 ms | 0 | 100 | 100 |
| `/pt-BR/about/timeline` | 69 | 3.0 s | 1,210 ms | 0 | 98 | 100 |

The main problem is Total Blocking Time (main-thread JavaScript), not layout shift.

**1.1 Monorepo skeleton (done, PR #4).**
- Next app in `apps/site`; npm workspaces + Turborepo at the root (same model as Castle Raiders).
- The root `Dockerfile` builds from the workspace root, so the Coolify app settings did not change. Validated on a temporary Coolify staging app before merging.
- CI workflow, `CONTEXT.md` and the `new-article` skill paths updated in the same PR.

**1.2 `packages/tokens` (`@datum/tokens`) (done, PR #5).**
- DTCG JSON: palette, base theme (board, well, ink, drafting line), type (Archivo, IBM Plex Sans, IBM Plex Mono), spacing (4 px grid), radius (2 px), and the 8 season sets, combined by a resolver (`base` + `season`, seasons never stack).
- Build to CSS variables, a Tailwind 4 theme and a typed TS module.
- Tests: WCAG AA contrast for every text/background pair, including each season accent on the board; the season-by-date function (Easter computation, day 256) with known dates.

**1.3 The site adopts Datum (done, PR #6).**
- Replace the shadcn default color variables with the tokens; load the three fonts with `next/font`.
- Dark only: remove the theme switcher and its provider.
- Replace `src/components/ui/space-background.tsx` with the drafting grid (CSS gradients only). Likely cause of the mobile freeze (from reading the code, not yet measured): ~100 stars, each a framer-motion element animated forever in JavaScript, plus 5 clouds with `filter: blur(20px)` that also animate.
- Seasons by date. Finding: pages are statically generated and cached for a year (`s-maxage=31536000`), so a season chosen at build time would never change. Plan: a tiny inline script in `<head>` sets `data-season` on `<html>` from the visitor's date before the first paint (no flash), and the CSS picks the season variables from that attribute.
- Lighthouse after (2026-10-17, same profile as 1.0, live site):

| Page | Performance | LCP | TBT | CLS |
| --- | --- | --- | --- | --- |
| `/pt-BR` | 54 → **70** | 4.7 → 5.3 s | 1,424 → **293 ms** | 0 |
| `/pt-BR/articles/piramide-de-testes-na-pratica` | 66 → **76** | 3.2 → 5.0 s | 1,500 → **204 ms** | 0 |
| `/pt-BR/about/timeline` | 69 → **90** | 3.0 → 3.2 s | 1,210 → **177 ms** | 0 |

Total Blocking Time fell by 80-85% on every page, which confirms the animated background as the cause of the mobile freeze. The budget (Performance 90+, LCP under 2.5 s) is met only on the timeline. LCP is now the bottleneck: on the home the LCP element is the hero text and on the article it is the cover image, both with about 4.4-4.6 s of **render delay** (zero load delay), which points at elements that start hidden by framer-motion entrance animations (`initial: opacity 0`) and only appear after hydration. Next step: render the above-the-fold content visible from the first paint (CSS-only entrance or none), then measure again.

**1.4 Storybook (`apps/datum`) (done).**
- Storybook 10 (react-vite) with pages in pt-BR: Introdução, Princípios, Cores, Tipografia, Espaço e forma, Temporadas; a "Temporada" toolbar; the Storybook chrome wears the Datum theme.
- Static site (nginx) on a Coolify app at `design.rafaelfachinelli.com`.
- Rules home: [docs/datum/README.md](./datum/README.md).

### Phase 2: components
- `packages/ui`: components on shadcn/ui, one story per state, starting with what the site already uses (button, card, badge, form fields, summary box, section title with icon, article card) and growing with the tools.

### Phase 3: tools
1. CLT x PJ calculator (first). Official INSS / IRRF / Simples Nacional tables, with the reference year on the page; not financial advice notice; explanation of the math, FAQ, Umami events.
2. Financial planner: compound interest, emergency fund, financial independence goal.
3. Architecture decision helper: questions about team, scale, domain and deadline; recommendation with trade-offs and when not to use it; generates an ADR draft.

Each tool and the design system get a case study or article (see `.claude/skills/new-article`).

## Open questions

- Approve the Phase 1 steps above (nothing is implemented before that).
- Package scope: `@datum/*` (proposed; workspace-only, not published to npm, so an existing public scope does not matter) or `@rafaelfachinelli/*`.
