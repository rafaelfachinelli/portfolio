# Datum in its own repository, on npm: specification

Audience: Rafael and AI agents moving Datum out of the portfolio.
Status: draft · Last updated: 2026-10-23

Datum moves to a public repository of its own and is published on npm, so anyone can install it; the portfolio becomes a private repository that installs Datum like any other package. Decided with Rafael on 2026-10-23: npm user `rafaelfachinelli`, MIT license with a brand note, history kept.

## Today

- `packages/tokens` (`@datum/tokens`), `packages/ui` (`@datum/ui`) and `apps/datum` (Storybook) live in this repository, which is public. Both packages are `private: true` at `0.3.1`.
- `@datum/ui` ships TypeScript source (`exports: ./src/index.ts`); the site compiles it through `transpilePackages`. `@datum/tokens` builds `dist/tokens.css`, `dist/theme.css` and `dist/tokens.json`, but its JavaScript entry is also TypeScript source.
- The site imports `@datum/*` in 33 files, `globals.css` and `next.config.ts`. The CSS variables are `--datum-*`; that prefix does not change.
- The Storybook image builds from this repository's root (`apps/datum/Dockerfile`); Coolify app "Datum (Storybook)", branch `production`.
- Coolify clones this repository over its public HTTPS URL, for both apps.
- Links to the code point here: the Datum page (`DATUM_SOURCE_URL`), the Datum article, the Storybook introduction.
- The `@datum` scope on npm belongs to someone else, so the names change.

## Target

| | Repository | Package |
| --- | --- | --- |
| Tokens | `rafaelfachinelli/datum` (public), `packages/tokens` | `@rafaelfachinelli/datum-tokens` |
| Components | `rafaelfachinelli/datum`, `packages/ui` | `@rafaelfachinelli/datum-ui` |
| Storybook | `rafaelfachinelli/datum`, `apps/storybook` | not published; design.rafaelfachinelli.com |
| Site | `rafaelfachinelli/portfolio` (private) | installs both from npm |

## Steps

One PR or step each, in this order; the site keeps working after every step.

### 1. The `datum` repository, with its history

- `git filter-repo` (or `git subtree split`) keeps the commits that touched `packages/tokens`, `packages/ui`, `apps/datum`, `docs/datum` and `.claude/skills/datum-release`, and moves them to the new layout. Commits by the GitHub noreply address.
- Root: npm workspaces and Turborepo (same tools as today), Prettier and ESLint config, `.gitignore`, `LICENSE` (MIT) and `README.md`.
- README: what Datum is, install, usage with Next.js and Vite, the Storybook link, and the brand note: "The code is MIT. The name Datum, the RF logo and the Blueprint identity (the drafting board and the seasons as a brand) belong to Rafael Fachinelli and are not covered by the license." The public README follows the existing READMEs flow (`rafaelfachinelli/readmes`).
- CI on GitHub-hosted runners: lint, typecheck, token tests, package build, Storybook build.

### 2. Installable packages

- `@rafaelfachinelli/datum-ui`: build with `tsc` to `dist/` (one ES module per source file, so the `"use client"` directives stay where they are, and `.d.ts` next to them). `exports` points to `dist`; `styles.css` ships in `dist` with `@source "./"` so a consumer's Tailwind 4 generates the components' classes from the built files. `peerDependencies`: `react` and `react-dom` 19, `tailwindcss` 4. Radix and the rest stay `dependencies`.
- `@rafaelfachinelli/datum-tokens`: the JavaScript entry (`getSeason`, `seasonInlineScript`, `contrastRatio`…) also builds to `dist`; the CSS and JSON outputs stay.
- Both: no `private`, `license`, `repository`, `homepage` (the Storybook), `files: ["dist"]`, `sideEffects` for CSS, `publishConfig.access: public` and `provenance`.
- A check that installs the packed tarballs (`npm pack`) into a throwaway Vite app and builds it, so a broken `exports` map fails CI before it reaches npm.

### 3. Publishing

- Version `0.4.0` for both (the rename changes every import for a consumer). The `datum-release` skill gains the publish step and the Novidades entry.
- GitHub Actions workflow on a `v*` tag: build, test, `npm publish` with npm trusted publishing (OIDC: no token stored), provenance on.
- The first publish creates the packages; Rafael links the repository as a trusted publisher on npmjs.com (one setting per package).

### 4. Storybook from the new repository

- `apps/storybook/Dockerfile` builds from the `datum` repository's root. Coolify app "Datum (Storybook)": source changes to `rafaelfachinelli/datum`. Production change: done with Rafael's go-ahead at that moment; the old image keeps serving until the new build is healthy.
- The Storybook introduction: install with npm, the new package names, the link to the new repository.

### 5. The site installs Datum from npm

- `apps/site/package.json` depends on `@rafaelfachinelli/datum-ui` and `@rafaelfachinelli/datum-tokens` at `^0.4.0`; imports, `globals.css` and `next.config.ts` (`transpilePackages` goes away for the built packages; `optimizePackageImports` keeps the new name) follow.
- `packages/` and `apps/datum` leave this repository, with `docs/datum` (a pointer to the new repository stays in `docs/roadmap.md`) and the `datum-release` skill; the root workspaces list and the CI follow.
- Links to the code point to `github.com/rafaelfachinelli/datum`: `DATUM_SOURCE_URL`, both versions of the Datum article, the Storybook introduction.
- Visual check of every page against production and the site build.
- Working on a component and the site together: `npm link` the local `datum` packages into the site (documented in both READMEs).

### 6. The portfolio becomes private

Only after step 5 is live:

- Coolify: the site app (the only one still reading this repository) switches from the public HTTPS URL to the GitHub App (or a deploy key), or the next deploy fails to clone. Production change, with Rafael's go-ahead.
- CI: private repositories spend the free 2,000 GitHub Actions minutes a month; a run takes 1 to 8 minutes, so it fits.
- The repositories page lists public repositories, so the portfolio drops off it and `datum` appears.
- Then Rafael switches the visibility on GitHub.

## Cost

A change to a component now goes: change in `datum`, publish a version, bump it in the site. Normal for a public design system; `npm link` covers working on both at once.

## Out of scope

- New components or a public API redesign: the move keeps the components as they are.
- An English Storybook (unchanged decision).
