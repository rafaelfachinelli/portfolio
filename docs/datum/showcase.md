# Datum as a portfolio piece: specification

Audience: Rafael and AI agents building the Datum showcase.
Status: draft · Last updated: 2026-10-21

Datum is live (Storybook at design.rafaelfachinelli.com, used by the whole site), but the portfolio barely points to it: only the tools page names it, with no link. This plan turns it into a visible project: a project page, an article that tells how it was made, a real projects index, and a Storybook that looks finished when someone shares it.

## What exists today

- The home hero button "Ver projetos" goes to `/projects/more`, the list of GitHub repositories. There is no projects index: `/<lang>/projects` answers 404.
- The case studies (Instalações e Reformas, Markit3D, Flex) are reachable only from the navbar menu and the home featured projects.
- The Storybook shares with no image: `manager-head.html` has a description and the favicon, no Open Graph or Twitter tags.
- `@datum/tokens` and `@datum/ui` are both at `0.1.0` since the first commit; there is no changelog.

## Deliverables

One PR each, in this order.

### 1. Storybook finish

- **Sharing.** Open Graph and Twitter tags in `apps/datum/.storybook/manager-head.html`: `og:title` "Datum, o design system de Rafael Fachinelli", `og:description`, `og:image` (absolute URL, 1200×630 PNG in `apps/datum/public/og.png`, drawn in HTML in the Blueprint style and rendered with headless Chrome, like the site covers), `og:url`, `og:locale` `pt_BR`, `twitter:card` `summary_large_image`. Crawlers do not run JavaScript; these tags are in the static `index.html`, so every Storybook link shares the same card.
- **Novidades page** (`Datum/Novidades`, `apps/datum/src/Novidades.mdx`), written by hand, newest first. One version for Datum as a whole: `@datum/tokens` and `@datum/ui` move together. Semantic versioning: patch for fixes, minor for a new component, token or variant, major for a breaking change (a removed prop, a renamed token). Starting history, from the git log:

| Version | Date | What |
| --- | --- | --- |
| 0.1.0 | 2026-10-17 | Tokens (DTCG), 8 seasons, contrast tests, Storybook with the foundations (#5, #7) |
| 0.2.0 | 2026-10-18 | `@datum/ui`: Button, Badge, Card, Separator, Label, Input, Textarea, Select, Tooltip, Field, Callout, Stat, Sheet; the site drops its shadcn copies (#21-#24) |
| 0.3.0 | 2026-10-19 | RadioGroup (cards), for the architecture sketch (#29) |
| 0.3.1 | 2026-10-20 | Fixes: no `asChild` control on Button and Badge (#31); the loading spinner keeps turning under reduced motion (#32) |

  Both `package.json` move to `0.3.1` in this PR.
- **Skill** `.claude/skills/datum-release/SKILL.md`: when a PR changes `packages/tokens`, `packages/ui` or a component page in `apps/datum`, pick the version bump, update both `package.json`, write the Novidades entry (pt-BR, one line per change, the PR number) and the status line of `docs/datum/README.md`.

### 2. Projects index and the Datum project page

- **`/<lang>/projects`** (new): the projects in cards, Datum first, then Instalações e Reformas, Markit3D, Flex and the architecture sketch (links to the tool). The GitHub repositories become a smaller section at the end ("Todos os repositórios no GitHub", linking to `/projects/more`). The home hero button and the navbar "Projetos" point here; the navbar menu gains Datum. In the sitemap, with metadata and JSON-LD like the other pages.
- **Home:** Datum joins the featured projects (four cards, two by two).
- **`/<lang>/projects/datum`**: short, and it points to the article for the story, so the two do not repeat each other.
  - Hero: name, one line ("O design system deste site: tokens, temporadas e componentes"), three buttons: Storybook, GitHub and the article (the article button appears when it is published).
  - Numbers as Datum Stats: 15 components, 69 stories, 8 seasons, every text pair WCAG AA (the build fails otherwise), home LCP 8.2 s → 2.3 s on a throttled phone, Lighthouse Performance 54 → 90+ on the home.
  - Three to five screenshots with captions: before (the old site), after, the Storybook, one component in three seasons.
  - What is inside: tokens, components, seasons, the Storybook; stack (DTCG, Tailwind 4, Radix, shadcn as a base, Storybook 10, Vitest).
- The page is built from Datum pieces (Card, Stat, Button, Badge) in `apps/site`, not with the long case study template, which fits client projects.

### 3. Article

pt-BR and en-US, following the `new-article` skill (interview first: facts come only from Rafael). Working title: "Como criei o design system do meu portfólio (e por que comecei pelo shadcn)". Outline to confirm in the interview:

1. The starting point: a generic shadcn site that froze phones (an animated background of ~100 framer-motion stars) and a home LCP of 8.2 s.
2. Why a design system for a one-person portfolio.
3. The base: shadcn/ui and Radix (own the code, accessible primitives) and why not stock shadcn: the Blueprint personality layer on top.
4. Tokens in the W3C format, one source for CSS variables, the Tailwind 4 theme and TypeScript.
5. The name and the direction: three previews (Blueprint, Órbita, Constelação), Datum over Prancheta.
6. Seasons: the theme changes by date, set before the first paint because pages are cached for a year.
7. Contrast that fails the build.
8. The rule "only general pieces": what stays in Datum and what stays in the site.
9. What went wrong: the `asChild` control that crashed a story, the spinner that stopped under reduced motion.
10. Results in numbers, and what is next.

Screenshots:
- **Before:** the site at `8ea72ea` (the last commit before Datum), run locally from a git worktree and captured at 1440×900 and 390×844.
- **After:** the same pages today.
- **Storybook:** the introduction, the Button page, the colors with contrast, the seasons calendar, and one component in three seasons.

Code goes in code blocks, not images. Files in `apps/site/public/images/articles/datum-*`, pt and en versions when they hold text.

Questions for the interview (to stress the topic):

- Why build a design system for a personal site, and why now?
- Before Datum, what bothered you in the old site, besides the slowness?
- Why shadcn as the base rather than another library (MUI, Chakra, Mantine) or nothing?
- How much of the work was done with AI agents, and how did you steer them? Is that part of the story you want to tell?
- What would you do differently if you started again?
- What should a reader take away on Monday?

The LinkedIn hook comes from the article once written (same flow as the architecture sketch).

## Out of scope

- Storybook tests in CI. The portfolio CI runs on GitHub-hosted runners (`ubuntu-latest`, free for public repositories), so it needs no VPS; parked until Rafael decides.
- An English Storybook and a light theme (decisions D6 and the pt-BR docs stand).
- New components for the sake of breadth.
