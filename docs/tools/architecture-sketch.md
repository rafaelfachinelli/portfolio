# Architecture sketch: specification

Audience: Rafael and AI agents building the first tool of Phase 3.
Status: approved, in build · Last updated: 2026-10-19

The first tool of [Phase 3](../roadmap.md#phase-3-tools) (decision D15).

## What it does

A short questionnaire about an application (what it is, how many people use it at the same time, how much downtime it can take, what it stores) returns a **diagram of a starting architecture**, drawn with React Flow, and explains every box: why it is there, what it costs in money and complexity, and when it would be too much.

It answers the question every project asks at the start and every system design interview asks: "what does this need, and what does it not need yet?". The second half matters as much as the first: for a small product the honest answer is one application and one database with backups, and the tool says so.

## Who it is for

Developers, tech leads, founders and students preparing for system design interviews. The same people who read Rafael's articles and would hire him, which is the point of the tool.

## Why it does not go stale

- It uses **building blocks** (load balancer, cache, queue, read replica, CDN, object storage), not products or prices. These have been the same for over a decade.
- No laws, rates or vendor price lists. The only things that age are the dependencies (React Flow), which update like any other package.
- Upkeep: none required. A yearly read of the rules is enough.

## The questionnaire

Eleven questions on one page, each with two to five options as cards (Datum RadioGroup). Every answer has a default, so the diagram is there from the start and changes with each answer.

| # | Question | Options |
| --- | --- | --- |
| 1 | What kind of application? | Content site · Web app (SaaS, back office) · API for mobile apps · Online store · Real time (chat, game, live updates) |
| 2 | How many people use it **at the same time** at peak? | Up to 100 · 100 to 1,000 · 1,000 to 10,000 · 10,000 to 100,000 · More than 100,000 |
| 3 | How much downtime can it take? | Some (hours a month) · Little (99.9%, ~45 min a month) · Almost none (99.99%, ~4 min a month) · None, even if a whole region goes down |
| 4 | Mostly reading or writing? | Mostly reading · Balanced · Mostly writing |
| 5 | Does it need live updates? | No · Notifications from the server · Two-way (chat, collaboration, games) |
| 6 | Does it do heavy work in the background? | No · Sometimes (e-mails, reports) · A lot (video, imports, AI) |
| 7 | Does it store files from users? | No · Some (avatars, documents) · A lot (photos, video) |
| 8 | Does it need text search? | No · Simple filters · Full text search |
| 9 | Where are the people? | One country · Several countries |
| 10 | Who builds it? | One team (up to about 10 people) · Several teams |
| 11 | Does it store sensitive personal or payment data? | No · Yes (adds the security pieces) |

A tenth optional question: does it handle sensitive personal or payment data (LGPD)? It adds security pieces.

## The rules

The result comes from **fixed rules, not from AI**: the same answers always give the same diagram, every box can say which answer put it there, and every rule has a test. Rules live in one module (`apps/site/src/lib/tools/architecture/rules.ts`), each with a condition, the nodes and edges it adds, and its explanation.

The starting point for every answer: **users → application (one instance) → relational database with automatic backups**, plus logs and metrics. Each rule adds to it:

| When | Adds | Why |
| --- | --- | --- |
| 1,000+ at the same time, or downtime "little" or less | Load balancer and 2+ application instances (no state in memory) | One machine is a single point of failure and has a ceiling |
| 10,000+ at the same time, or mostly reading with 1,000+ | In-memory cache in front of the database | Repeated reads stop hitting the database |
| Mostly reading with 10,000+ | Database read replicas | Spreads reads; writes stay on the primary |
| Downtime "almost none" | Instances in 2+ availability zones; database standby with automatic failover | Survives the loss of one data center |
| Downtime "none, even a region" | A second region, global traffic routing, cross-region database replication | Survives the loss of a region; the result warns about cost and consistency |
| Content site, online store, several countries, or many files | CDN | Serves static files and media close to the user |
| Files from users | Object storage (served through the CDN) | Files do not belong in the database or on the application's disk |
| Background work | Queue and workers | Slow tasks leave the request; failures retry |
| Two-way live updates | Real-time gateway (WebSocket) and pub/sub | Keeps connections open and fans out messages between instances |
| Server notifications only | Server-sent events from the application | Simpler than WebSocket when data flows one way |
| Full text search | Search engine, fed from the database through the queue | The database stays the source of truth |
| Mostly writing with 100,000+ | A note on partitioning and an event log | Shown as "consider", not as a box: it depends on the data |
| API for mobile apps, or 10,000+ | Rate limiting at the edge | Protects the application from bursts and abuse |
| Sensitive data | WAF, secrets manager, encryption at rest, audit log | LGPD and payment rules ask for them |
| Team up to 10 | **Modular monolith** (one deployable, clear modules) | Microservices cost more than they give a small team |
| Several teams | Services split by domain, behind an API gateway | Teams deploy on their own; the result warns about the cost |

The result also lists **what you do not need yet**, with the answer that would change it. For example, at 500 users: "no cache, no replicas, no microservices; revisit at 10,000 people at the same time".

## The experience

The goal is a tool that is quick to use, clear, and does something other architecture pages do not: it shows the data moving.

- **Live diagram.** On the desktop the questions sit on the left and the diagram on the right; every answer changes the diagram at once, and new boxes enter with a short animation. On the phone the questions come first, then the result.
- **Start from an example.** One click fills the answers for a blog, a B2B SaaS, an online store on Black Friday, a chat app or a video platform. The person adjusts from there.
- **Data in motion.** Edges show which way data goes, with a small animated dot per flow, and each kind of flow has its own style: request and response, writes, replication, queue messages, live connections.
- **Play a scenario.** "Open a page", "Save something", "Upload a file", "Send a chat message", "Run a background job": the path lights up step by step, with a numbered caption for each hop ("2. The load balancer sends the request to a healthy instance"). Play, pause, step.
- **Single points of failure.** Boxes whose loss takes the whole application down carry a mark, and the side panel says what happens if each one fails. For a small product the answer can be "acceptable, restore from backup", and the tool says so.
- **Each box explains itself.** Click or tab to a box: what it is, the answer that put it there, cost and complexity (low, medium, high), when it would be too much.
- **What you do not need yet.** A list under the diagram, each item with the answer that would change it.
- **Colors and shapes.** Each box has a color by category (entry and network: indigo; compute: sky; messaging: amber; data: green; support: slate, dashed) and a shape by type: cylinder for databases and indexes, a box holding messages for the queue, a pipe for the pub/sub topic, a memory chip for the cache, a bucket for file storage, a hexagon for entry pieces, a pill for people. The same colors and shapes go to the legend, the Mermaid export and the preview image (`apps/site/src/lib/tools/architecture/categories.ts`). During a scenario the lit box glows in its own category color, and the hop in progress takes that color; the season color marks the selected box.
- **Narration.** Each scenario caption has a clip in Rafael's cloned voice (ElevenLabs, model `eleven_multilingual_v2`), in pt-BR and English. A "Narração" switch in the player turns it on; it is off by default and the choice is kept in the browser. With narration on, the hops spread over the spoken caption and the next step starts when the voice ends. The clips are generated once, on Rafael's machine, by `npm run narration -w @rafaelfachinelli/site` (`apps/site/scripts/generate-narration.ts`, key in `ELEVENLABS_API_KEY`), into `apps/site/public/audio/architecture/<locale>/<step>.mp3`; `architecture-narration.json` keeps each clip's fingerprint (caption, voice, model). The script only redoes missing or changed clips, and a test fails when a caption changes without its clip.
- **Reduced motion.** With `prefers-reduced-motion` the dots stop and the scenario steps change without animation.

## The result and export

- **Diagram**: React Flow (`@xyflow/react`, MIT). Boxes in fixed layers (users, edge, entry, application, fast data, storage, cross-cutting), top to bottom on every screen (left to right made the boxes too small on a laptop); positions come from the layers, so no layout library is needed. Pan and zoom; no free editing.
- **Text version**: the same architecture as a list of components and connections, for screen readers and for copying.
- **Export, from v1**:
  - **PNG** of the diagram.
  - **Mermaid** code, to paste into a README, GitHub or Notion, where it renders as a diagram.
  - **ADR draft** in Markdown: context from the answers, the decision, consequences, what was left out and when to revisit.
  - **Share link**: `/<lang>/tools/architecture/r/<code>`, where the code holds the answers. The link opens the same result, and its preview image (Open Graph) draws that architecture. Result pages are `noindex` with the tool as canonical, so they do not compete with it in search.
- Nothing is stored and there is no account or backend: the answers live in the URL. While the person answers, the address follows: `?a=<code>` on the tool page (read in the browser, since the page is static), the code itself on a shared page, and a clean address when the answers are the defaults. A reload or a copied address keeps the answers; an invalid code falls back to the defaults.

## Page and SEO

- Routes: `/<lang>/tools` (index of tools, one for now) and `/<lang>/tools/architecture`, in pt-BR and English. A "Tools" item joins the main menu.
- Working name: "Esboço de arquitetura" / "Architecture sketch".
- Built from Datum. General pieces Datum does not have yet enter it first, with their stories: a **RadioGroup** with card-style options (Radix Radio Group). The diagram nodes and the scenario player are compositions of the site.
- Performance: the questions render on the server; React Flow loads in the browser after them, so the page opens within the brand budget (Performance 90+).
- SEO:
  - Title, description, canonical and `hreflang` per language; its own Open Graph image (a drawn diagram, not the site default).
  - JSON-LD: `WebApplication` (free, developer tool), `FAQPage` for the tool's FAQ, `BreadcrumbList`.
  - Text on the page that search engines read: how the rules work, the FAQ (system design questions people search for), a link to the article.
  - Sitemap, `llms.txt` and `llms-full.txt`; IndexNow after the deploy.
- Umami events, with no personal data: `architecture-preset`, `architecture-scenario`, `architecture-export` (with the format), `architecture-share`.
- The page says what the tool is: a starting point for a conversation, not a design review.

## The article

A first-person article that leads to the tool: how much architecture a product needs at each size, why the tool says "you do not need it yet", and the rules behind it, with diagrams from the tool. Cover image 1200×630, FAQ, references, pt-BR and English, following the `new-article` skill. The tool links to the article and the article to the tool.

## Build plan

One branch, run locally for Rafael to try, then reviewed and merged in this order:

| Step | Content |
| --- | --- |
| A | This specification |
| B | Datum: RadioGroup (default and card), with stories |
| C | Rules module, scenarios, Mermaid and ADR generators, URL code, with Vitest tests (one per rule, plus whole examples) |
| D | The page: questions, live diagram, animated flows, scenario player, side panel, text version, export, share page with its image, menu item, tools index |
| E | SEO: metadata, Open Graph images, JSON-LD, sitemap, `llms.txt` |
| F | The article and its cover |

## Decisions

- Route in English: `/<lang>/tools/architecture` (Rafael, 2026-10-19).
- Export in the first version (Rafael, 2026-10-19).
- Generic boxes, no vendor names (proposal kept; vendor examples can come later in the side panel).
