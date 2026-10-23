# Portfolio roadmap: brand, design system and tools

Status: Phases 0-2 done; Phase 3 (tools): the architecture sketch is live · Last updated: 2026-10-20

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
| D15 | First tool | The **architecture sketch** (questionnaire → React Flow diagram) replaces the CLT x PJ calculator as the first tool: it does not go stale with yearly tax tables and it reaches the audience of Rafael's profile. The calculator is parked; its draft spec stays in the closed PR #27. Replaces D5's choice of first tool | 2026-10-19 |

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

**1.5 LCP fix (done, PR #9).** The home hero and resume card render visible from the server; the resume image float is CSS; no more `backdrop-blur` on cards nor animated `blur`; metric counters render the final value on the server.

Lighthouse simulated mobile (same profile as above) and with real CPU/network throttling (`--throttling-method=devtools`), live site, 2026-10-17:

| Page | Perf (simulated) | LCP (simulated) | LCP (devtools) | TBT (devtools) |
| --- | --- | --- | --- | --- |
| `/pt-BR` | 70 → **73** | 5.3 → 4.9 s | **8.2 → 2.7 s** | 2,120 → 1,159 ms |
| `/pt-BR/articles/piramide-de-testes-na-pratica` | 76 → **82** | 5.0 → 3.6 s | 2.6 → 2.6 s | 951 → 1,058 ms |
| `/pt-BR/about/timeline` | 90 → 89 | 3.2 → 3.2 s | n/a → 2.3 s | n/a → 692 ms |

The real-world LCP of the home dropped from 8.2 s to 2.7 s. The simulated LCP stays high because Lighthouse's simulation counts all the JavaScript that runs before the observed paint: every page hydrates as one large client component tree (`'use client'` pages with framer-motion in the layout and the sections). Reaching the 90+ budget needs less JavaScript on first load: render page sections as Server Components, keep client code to the interactive bits, and drop framer-motion from the layout (navbar, language switcher, sidebar) and the home sections in favor of CSS. This fits Phase 2, when the components move to `@datum/ui`.

**1.6 First-load JavaScript (done, PR #11).**
- Pages and home sections are Server Components. Client code is limited to small islands: the resume PDF button, the timeline tenure label, the hero word cycle, the share buttons, the contact form and the repository list.
- framer-motion is removed from the layout (navbar, language switcher, sidebar menu), the home and every page, and from the dependencies. CSS animations replace it and respect `prefers-reduced-motion`.
- The language context carries only `commons` and `components`. Page texts are passed as props, so the full dictionary (~56 KB) is no longer serialized into every page (home HTML 182 KB → 138 KB).
- jsPDF and the resume texts load only when the PDF is requested. Unused `cmdk`, `jspdf-autotable` and `date-fns` removed.

Lighthouse 12.6.1 mobile, live site, 2026-10-18:

| Page | Perf (simulated) | LCP (simulated) | LCP (devtools) | TBT (devtools) | JS transferred |
| --- | --- | --- | --- | --- | --- |
| `/pt-BR` | 73 → **90** | 4.9 → 3.4 s | 2.7 → **2.3 s** | 1,159 → **330 ms** | 229 KiB |
| `/pt-BR/articles/piramide-de-testes-na-pratica` | 82 → 82 | 3.6 → 3.7 s | 2.6 → **2.3 s** | 1,058 → **320 ms** | 206 KiB |
| `/pt-BR/about/timeline` | 89 → **92** | 3.2 → 3.0 s | 2.3 → 2.4 s | 692 → 540 ms | 203 KiB |

With real throttling every page now paints its LCP under the 2.5 s budget. The simulated LCP stays above it because the remaining scripts download and run before the first paint, and the simulation adds all of that CPU to the LCP (render delay ~2.8-3.0 s, load delay 0). What is left on first load is the React and Next.js runtime (~100 KB) plus the layout's client components: the shadcn sidebar with its Radix tooltip, dropdown, sheet and collapsible. Next lever, in Phase 2: rebuild the navbar and sidebar in `@datum/ui` as lighter components (server-rendered navigation, a small client toggle), then measure again.

**1.7 Lightweight navigation (done, PRs #14 and #15).** PageSpeed Insights (mobile, home) before this step: Performance 96, Accessibility 100, Best Practices 100, SEO 100; the missing points were TBT (210 ms) and Speed Index.
- The navbar is a Server Component; desktop menus open in CSS. The phone menu is a small client drawer around server-rendered links, replacing the shadcn sidebar (Sheet, Tooltip, DropdownMenu, Collapsible, `useIsMobile`). The language switcher is a native `<details>` linking to the canonical locales.
- Hidden menu links and the home links to `/projects/more` have prefetch off, so a visit does not download the code of other pages.
- The home resume image has `sizes` (PageSpeed image delivery insight).
- The GitHub token in Coolify had expired (the repositories API answered 401); a new read-only token is set.

Lighthouse 12.6.1 simulated mobile from the local machine, live site, 2026-10-18 (two runs each): home JS 207 → **153 KiB**, TBT 130-180 → **60-100 ms**, Performance 86-91 → **90-95**; article 82 → **90-95**; timeline 92 → **92-95**. These local runs read a few points below PageSpeed Insights (96 vs 90 for the same version).

**1.4 Storybook (`apps/datum`) (done).**
- Storybook 10 (react-vite) with pages in pt-BR: Introdução, Princípios, Cores, Tipografia, Espaço e forma, Temporadas; a "Temporada" toolbar; the Storybook chrome wears the Datum theme.
- Static site (nginx) on a Coolify app at `design.rafaelfachinelli.com`.
- Rules home: [docs/datum/README.md](./datum/README.md).

### Phase 2: components (done 2026-10-18)
- `packages/ui` (`@datum/ui`): components on shadcn/ui and Radix, one story per state, starting with what the site already uses and growing with the tools.
- Decision (2026-10-18): Datum holds **only primitives and general-purpose patterns**. It is shown publicly as a portfolio piece, so every component must make sense to any project. Compositions specific to one page (article card, home metrics, page title, resume card) are built in `apps/site` from Datum pieces.
- Plan, one PR each:
  1. Package, Tailwind in Storybook, accessibility addon; Button, Badge, Card, Separator, Label (done, see below).
  2. Forms: Input, Textarea, Select, Tooltip and the **Field** pattern (label, control, hint, error) (done, see below).
  3. General patterns the site already uses: **Callout** (generalizes the article summary and lessons boxes) and **Stat** (number and caption, generalizes the home metrics) (done, see below).
  4. The site adopts `@datum/ui`, its `components/ui` copies are deleted, and site-specific pieces are recomposed in the site; visual check of every page and Lighthouse with no regression (done, see below).
  5. Storybook deployed with the components; roadmap updated (done, see below).
- **2.1 (done).** `@datum/ui` with Button (primary, secondary, outline, ghost, link, danger; sizes; loading; disabled; as link), Badge (accent, neutral, outline, success, warning, danger), Card (header, title, description, action, content, footer), Separator and Label. Storybook gets Tailwind 4 (`@tailwindcss/vite`) and `@storybook/addon-a11y`; 23 stories pass axe, and the color variants pass contrast in all 8 seasons.
- **2.2 (done).** Input, Textarea, Select (Radix; groups, sizes) and Tooltip (Radix; inverted surface, provider for groups), sharing one control style (border, focus halo in the season color, invalid, disabled). **Field** wires label, control, hint and error through context: generated ids, `aria-describedby` to the hint or the error, `aria-invalid`, `required` (as `aria-required` on the Select trigger) and `disabled`; props passed to the control win. A contact-form story validates on submit. 51 component stories pass axe; the only flag is the forced-open Select, where Radix hides the page behind the open list as a modal does.
- **2.3 (done).** **Callout**: a box with a side stripe and a light tint in five tones (accent in the season color, neutral, success, warning, danger), optional icon, `CalloutTitle` (with `asChild` for heading levels) and `CalloutContent` styled for text, lists and links. **Stat**: a number with label, optional icon, description and trend; a `dl` so screen readers read "label: value"; the trend color says good or bad news (`positive`), which is not always going up, and its screen reader text (`label`) is written by the consumer in the page's language. Callout and Stat stories pass axe in all 8 seasons.
- **2.4 (done).** The site uses `@datum/ui` (`transpilePackages`, `@datum/ui/styles.css` in `globals.css`, `optimizePackageImports` so a page imports only the modules it uses). Its shadcn copies (badge, button, card, input, label, select, separator, sheet, textarea, tooltip) and six Radix packages plus `class-variance-authority` are gone. **Sheet** joined Datum (Radix Dialog; entrance animations in CSS, off with reduced motion; `closeLabel` required, so no fixed text). Recomposed in the site: home metrics as Stats in Cards, the article summary as a Callout. Card titles that start a page section render as `h2` (`asChild`). Lighthouse on the local build: Performance 91-92 on home, article, contact, timeline and case study; Accessibility 100 on every page checked except the timeline (heading order, already on production). The repositories page went from 85 to 100 in Accessibility: refresh button named, topic badge readable over the banner, the live preview is a link styled as a button instead of a link inside a button.
- **2.5 (done).** [design.rafaelfachinelli.com](https://design.rafaelfachinelli.com) serves the 13 components (64 stories); Coolify deploys it on every push to `production`. After the adoption the home prefetched the contact page (form and tooltip, ~26 KiB); its two contact links have prefetch off (PR #25), and the home is back to 154 KiB of JS (Lighthouse simulated mobile: Performance 89, TBT 140 ms, CLS 0).

### Phase 3: tools
1. Architecture sketch (first, D15): a short questionnaire (kind of application, users at the same time, downtime, reads and writes, live updates, background work, files, search, team) returns a starting architecture as a React Flow diagram, with why each box is there, what it costs and what is not needed yet; share link and ADR draft. Specification: [tools/architecture-sketch.md](./tools/architecture-sketch.md) (done 2026-10-20). Route `/<lang>/tools/architecture`; article `quanta-arquitetura-sua-aplicacao-precisa`; Datum gained RadioGroup (cards) for the questions.
2. Financial planner: compound interest, emergency fund, financial independence goal.
3. CLT x PJ calculator (parked, D15): depends on tax tables that change every year; draft spec in the closed PR #27.

Each tool and the design system get a case study or article (see `.claude/skills/new-article`).

### Datum showcase
Datum becomes a visible project: Storybook sharing card, Novidades page and versioning; a projects index at `/<lang>/projects` with Datum first and the GitHub repositories as a smaller section; the project page `/<lang>/projects/datum`; and the article on how it was made. Specification: [datum/showcase.md](./datum/showcase.md). Done: the Storybook finish (PR #34, version 0.3.1), the projects index and the Datum page (PR #35), the article (PR #36).

### Datum in its own repository, on npm
Datum moves to the public repository `rafaelfachinelli/datum` and is published as `@rafaelfachinelli/datum-ui` and `@rafaelfachinelli/datum-tokens` (MIT, with a note that the name, logo and Blueprint identity are not licensed); the site installs it from npm and this repository becomes private. Replaces the earlier "workspace-only, not published to npm" choice. Specification: [datum/own-repo-and-npm.md](./datum/own-repo-and-npm.md) (draft 2026-10-23).

## Open questions

None. Phase 1 was approved. The package scope was `@datum/*` (workspace-only); see "Datum in its own repository, on npm" for the move to npm.
