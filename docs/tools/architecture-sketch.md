# Architecture sketch: specification

Audience: Rafael and AI agents building the first tool of Phase 3.
Status: draft, waiting for Rafael's approval · Last updated: 2026-10-19

The first tool of [Phase 3](../roadmap.md#phase-3-tools) (decision D15). Nothing is built before this page is approved.

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

Nine questions, one per screen on the phone and all on one page on the desktop, each with three to five options and a short hint. Every answer has a default, so "see the result" works at any point.

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
| 9 | Where are the users, and who builds it? | Users: one country · several countries. Team: up to 10 people · several teams |

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

## The result

- **Diagram** (React Flow, `@xyflow/react`, MIT): boxes in fixed layers (users → edge → application → data → background), left to right on the desktop and top to bottom on the phone. Pan and zoom, no free editing in v1. Positions come from the layers, so no layout library is needed.
- **Each box**: click or tab to it and a side panel shows why it is there (the answer that added it), cost and complexity (low, medium, high) and when it would be too much.
- **Text version**: the same architecture as a list of components and connections, for screen readers and for copying. A diagram alone is not accessible.
- **Share link**: the answers go in the URL (`?a=…`), so a link opens the same result. No account, no backend, nothing stored.
- **Export**: the diagram as PNG, and an **ADR draft** in Markdown (context from the answers, decision, consequences, what was left out), from the original Phase 3 idea.

## Page

- Route: `/<lang>/tools/architecture` (open question 2), pt-BR and English.
- Built from Datum. Pieces the questionnaire needs and Datum does not have yet, both general purpose, enter Datum first with their stories: a **RadioGroup** with card-style options (Radix Radio Group), and a **Progress** or step indicator. The diagram nodes are a composition of the site.
- Performance: the questionnaire is light; React Flow (~50 KB gzip, to be measured) loads only when the result opens (dynamic import), so the page opens within the brand budget (Performance 90+).
- Umami events without personal data: `architecture-started`, `architecture-result` (with the answers, which are not personal), `architecture-shared`, `architecture-exported`.
- SEO: "system design", "arquitetura de software", "alta disponibilidade"; entry in the sitemap and `llms.txt`.
- The page says what the tool is: a starting point for a conversation, not a design review.

## Build plan

| PR | Content |
| --- | --- |
| A | This specification (docs only) |
| B | Rules module and its tests (one per rule, plus whole scenarios: blog, SaaS, store at peak, chat) |
| C | Datum: RadioGroup (card options) and Progress, with stories |
| D | The page: questionnaire, diagram, side panel, text version, share link, Umami, pt-BR and English |
| E | Export: PNG and the ADR draft |
| F | An article: how the rules were chosen and why the tool says "you do not need it yet" |

## Open questions

1. Name. Proposals: "Esboço de arquitetura" / "Architecture sketch", "Prancheta de arquitetura" (ties to the Blueprint direction), or another.
2. Route: `/<lang>/tools/architecture`, like the site's other routes in English, or `/<lang>/ferramentas/arquitetura`.
3. Vendor examples: keep the boxes generic (proposal), or add examples per box (for instance "Redis, Valkey" for the cache, "S3, R2" for object storage) in the side panel. Examples help beginners but are the one part that can age.
4. Export in v1 (PR E), or after the first release.
