---
name: new-article
description: Use when the user wants to create or revise an article for the portfolio's /articles section. Runs an interview to "stress" the topic, researches the concepts, writes the pt-BR and en-US versions in the standard template, generates the cover and prepares the commit.
---

# New portfolio article

Articles live in `src/content/articles.ts` and are rendered by `src/components/pages/articles/`. The standard template is documented in `CONTEXT.md` ("Articles"). This skill is the process to produce one with the author (Rafael), who brings a topic and wants it stress-tested.

## 0. Ground rules

- **Facts come only from the author.** Never invent numbers, company names, team sizes, results or quotes. If something is a plausible inference, write it, then list it explicitly in your hand-off as "needs your confirmation".
- **Do not name colleagues or the employer** unless the author says so ("um colega", "a empresa").
- **Voice:** first person, informal and direct, short sentences. Not a formal paper. The author liked the existing tone ("Qualidade de código não escala na base do ...").
- **Voice transcription:** the author often dictates, so terms may be misheard (e.g. "pre-write" = Playwright, "DR" = ADR). Confirm odd tool names before writing.
- Work on a feature branch (`feat/article-<slug>`). **Never push to `production` without explicit approval** (Coolify auto-deploys that branch).

## 1. Interview ("estressar o assunto")

Ask in small batches (3-5 questions at a time), then dig into the answers. Cover:

1. **Context:** what situation, which team size, what stack. What was the starting point?
2. **Problem and cost:** what was hurting? Anything measurable (even approximate, mark estimates)?
3. **Decision and alternatives:** what was chosen, what was rejected and why?
4. **Counter-arguments:** the best objections (a colleague who disagreed, a trade-off). Great for a "mas e se...?" section.
5. **Results and honest limits:** what improved, what did not, what you would do differently.
6. **Insight:** the non-obvious learning that only comes from having done it. This is the article's hook.
7. **Reader takeaway:** what should someone do on Monday after reading?

Push back when an answer is vague ("quanto? com que frequência? como você sabe?"). Stop when there is enough for 3-6 minutes of reading.

## 2. Research the concepts

If the topic has a named concept, pattern or source, look it up (WebSearch/WebFetch): origin, author, year, canonical definition, common numbers and caveats. Cite only what you actually verified; say "regra prática muito citada" instead of attributing unverified claims to a person or company. Put sources in `references`.

## 3. Outline

Propose an outline and get a quick OK before writing:

- Title: concrete and promise-driven (e.g. "X na prática: como Y resolveu Z"), not generic.
- Description: 1-2 short sentences with a hook (shown on cards and in link previews).
- `summary`: 2-4 conversational bullets.
- `body`: short intro + `##` sections (free structure). Use `###` and lists/images where they help.
- `lessons`: 3-5 takeaways. `references`: sources. `cta`: optional custom sentence.

## 4. Write

- Write **pt-BR first**, then a natural **en-US** version (not word-for-word).
- Do not put lessons, references or CTA inside `body`: the template renders them.
- Do not start sections with "Introdução"; open with the problem or the hook.
- Add an illustration only if it clarifies (SVG in `public/images/articles/`, pt/en versions when it has text).

## 5. Cover

Generate it with the script (language-neutral text works best):

```bash
node scripts/generate-article-cover.mjs --slug <slug>-cover-v1 --kicker "TOPIC" --headline "BIG TEXT" --subline "SHORT LINE" --accent sky
```

Always use a **new file name** (`-v2`, `-v3`...) when changing a cover, to bust browser and Next image caches. Look at the PNG before using it. For richer covers (illustrations), hand-write the SVG and convert with `sharp` (1200x630, WebP).

## 6. Wire it up

Add the entry to the `articles` array (newest first): `slug` (kebab-case, no accents), `date` (ISO), `cover`, `tags` (2-4), `references?`, and `content` for `pt-BR` and `en-US` (`title`, `description`, `body`, `summary`, `lessons`, `cta?`). The sitemap, `llms.txt`, listing, metadata, JSON-LD and share buttons are automatic.

## 7. Verify

```bash
npx eslint src && npx tsc --noEmit && npm run build
NODE_ENV=production PORT=3100 node server.js   # then open /pt-BR/articles and the article, pt and en
```

Check: cover loads, summary box, section icons, spacing, lessons/references/CTA, share buttons, reading time (target 3-6 min), no 404 on `/en-US/articles/<slug>`.

## 8. Hand-off

Commit on the feature branch with a conventional message. Report to the author: what was written, **which parts are inferences to confirm**, and what is unverified. Merge to `production` and push only after they approve; then watch the Coolify deployment and check the live page.
