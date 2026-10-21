# Brand principles: Rafael Fachinelli

Status: draft (Phase 0) · Last updated: 2026-10-17

## Essence

**Care for what nobody sees.** The inside of the work is designed with the same attention as the outside: code that still reads well five or ten years later, interfaces where every detail has a reason, and decisions explained in plain words.

The reference is the mindset (not the products) of designing a device down to the parts no user will ever open.

## Attributes

| Attribute | What it means on the site |
| --- | --- |
| Reliable | Facts only, numbers marked as estimates, nothing that breaks or lags |
| Responsible | Clear ownership of decisions, accessible by default, fast on any phone |
| Technical | Real architecture, real code, real trade-offs; no buzzword filler |
| Detail-oriented | Alignment, spacing and states are deliberate; the small things are finished |
| Communicator | Explains what was built and why, in a direct and informal voice |

## Voice

- First person, direct, informal, short sentences. Technical without being formal.
- Explain the why, not only the what. Prefer an example to an adjective.
- Never inflate: no invented numbers, no "world-class", no "passionate about".

## Visual direction

- **Dark only.** The site is designed for a dark background; the light/system theme switcher goes away.
- **Evolve the current palette:** deep navy, sky blue, indigo and amber as the accent. The goal is a look that is recognizably his, not a rebrand. The space background is replaced by the Blueprint drafting grid (see below).
- **Logo:** the current RF mark stays as is. Only its colors change with the season.
- **Performance is part of the brand.** A detail-oriented brand cannot freeze a phone. The animated background is the known problem on mobile and gets fixed in Phase 1.

## Seasonal themes

- Themes change automatically by date (no user toggle), using the DTCG resolver pattern from Castle Raiders: a `base` set plus a `season` modifier; the later layer overrides, two seasons never stack.
- A season changes accent colors, the logo colors and small decorative touches. It never changes layout, contrast rules or readability.
- Calendar (approved 2026-10-17); outside these windows the base theme applies:

| Season | Window |
| --- | --- |
| Ano Novo | 26 Dec to 6 Jan |
| Carnaval | Friday before Carnival to Ash Wednesday (Easter - 51 to Easter - 46) |
| Páscoa | Palm Sunday to Easter Sunday (Easter - 7 to Easter) |
| Festa Junina | 1 to 30 Jun |
| Dia do Programador | Day 256 of the year (13 Sep, 12 Sep in leap years) |
| Halloween | 24 to 31 Oct |
| Natal | 1 to 25 Dec |

Moving dates come from the Gregorian Easter computation (anonymous algorithm, Meeus/Jones/Butcher).

## Direction: Blueprint (chosen 2026-10-17)

A drafting board: faint grid, dimension marks, corner registration ticks, monospaced annotations. It shows the "inside" that nobody sees, which is the brand essence.

- Type: Archivo (display), IBM Plex Sans (text), IBM Plex Mono (annotations, labels, numbers).
- Shapes: small radius (2 px), dashed and hairline borders, corner ticks on key surfaces.
- Components: shadcn/ui (Radix) as the base, with this personality layer on top, never stock shadcn.
- Name: the design system is called **Datum** (decided 2026-10-17). In technical drawing the datum is the reference every dimension is measured from; in Brazil it is also the geodetic reference ("datum SIRGAS 2000"), so it reads well in English and Portuguese. Always shown with the brand ("Datum, design system de Rafael Fachinelli"), since the word alone is common. "Blueprint" stays as the name of the visual direction; on its own it would clash with Palantir's well-known open source React UI toolkit. "Prancheta" was chosen first and dropped as too Brazil-only.
- The "see inside" mode was dropped (Storybook already ships Measure and Outline tools).

## Performance budget (approved 2026-10-17)

- No continuous JavaScript animation in the background; decorative motion in CSS only, paused when off screen.
- `prefers-reduced-motion` turns decorative motion off. Motion that reports status, such as the loading spinner, keeps running, only slower.
- Mobile Lighthouse: Performance 90+, LCP under 2.5 s, CLS under 0.1, measured on a throttled mid-range phone profile.
