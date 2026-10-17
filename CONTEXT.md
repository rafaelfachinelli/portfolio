# Project Context

## Project Overview

This project is a personal portfolio website built using modern web technologies. It includes features such as internationalization, a custom UI library, and server-side rendering. The project is structured to support scalability and maintainability.

## Key Technologies

- **Next.js**: For server-side rendering and routing.
- **React**: For building user interfaces.
- **Tailwind CSS**: For styling.
- **TypeScript**: For type safety.
- **Docker**: For containerization.

## Repository layout (monorepo)

npm workspaces + Turborepo. Plans and brand rules: [docs/roadmap.md](docs/roadmap.md), [docs/brand.md](docs/brand.md).

| Path | What it is |
| --- | --- |
| `apps/site` | The portfolio (Next.js), deployed to rafaelfachinelli.com by the root `Dockerfile` |
| `packages/*` | Shared workspace packages (the Datum design system packages, `@datum/*`) |
| `docs/` | Plans, brand and design system rules |

Unless noted, paths in the rest of this file are relative to `apps/site`.

## Folder Structure (apps/site)

- **translations/**: JSON files with all site copy (`en-US.json`, `pt-BR.json`). Timeline, resume and home texts live here; keep both files with the same keys.
- **public/**: Static assets like images.
- **src/**: Main source code, including middleware, app pages, components, and utility functions.
- **app/**: Houses the main application logic, including layouts and pages.
- **components/**: Reusable UI components.
- **lib/**: Utility functions and helpers.
- **scripts/**: Article cover generator and IndexNow submitter.

## Using ShadCN UI Components

This project utilizes ShadCN UI components for building reusable and accessible UI elements. These components are located in the `src/components/ui/` directory.

### Key Features

- **Accessibility**: Built with accessibility in mind.
- **Customizability**: Easily customizable to match the project's design system.
- **Performance**: Optimized for fast loading times and responsiveness.
- **Documentation**: Comprehensive guides and examples for easy integration.

### Example Usage

To use a ShadCN UI component in your project:

```tsx
import { Button } from '@/components/ui/button';

export default function Example() {
  return <Button>Click Me</Button>;
}
```

### Documentation

Refer to the [ShadCN UI documentation](https://ui.shadcn.com/) for more details on available components and their usage.

## Development Scripts

Run from the repository root:

- `npm install`: Installs every workspace.
- `npm run dev`: Starts the site's development server.
- `npm run build`, `npm run lint`, `npm run typecheck`, `npm run test`: Turborepo runs the task in every workspace, packages first.
- Production server locally: `cd apps/site && NODE_ENV=production PORT=3100 node server.js` (after a build).

## Environment variables

Copy `apps/site/.env.example` to `apps/site/.env.local`. `RESEND_API_KEY` enables the contact form (`/api/contact`); without it the form returns an error. `GITHUB_TOKEN` is optional and raises the GitHub API rate limit.

## SEO

Page metadata comes from `src/lib/seo.ts` (`buildPageMetadata`), used by each `page.tsx`. `src/app/sitemap.ts`, `src/app/robots.ts` and `src/app/[lang]/opengraph-image.tsx` are generated. When adding a page, also add its path to `SITE_PATHS`.

### Discoverability for search and AI assistants

- `robots.ts` explicitly allows search and AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot...).
- `/llms.txt` (index) and `/llms-full.txt` (full article text) are generated from `articles.ts`.
- RSS feeds per language at `/pt-BR/feed.xml` and `/en-US/feed.xml` (linked from every page's `<head>`).
- IndexNow: the key file lives in `public/<key>.txt`. After a deploy, run `node apps/site/scripts/indexnow.mjs [urls...]` from the root to notify Bing and others.
- Home and "About me" carry one plain third-person sentence about who Rafael is (`entityStatement` in the translations); keep it consistent with LinkedIn and GitHub.

## Articles (standard template)

Articles live in `src/content/articles.ts` (one entry per article, with `pt-BR` and `en-US` content). Every article follows the same template, rendered by `article-page-content.tsx`:

1. **Cover** (1200x630, `public/images/articles/`), **tags** (2-4), title, description (one or two short sentences), date and reading time.
2. **Quick summary** (`summary`, with a sparkles icon): 2-4 short, conversational bullets in a highlighted box. Keep the tone informal, not a formal abstract.
3. **Body** (`body`, Markdown): short intro, then `##` sections. Free structure, may use `###`, lists and images. Do not write lessons, references or a CTA inside the body.
4. **Lessons** (`lessons`, lightbulb icon): 3-5 short takeaways, always present.
5. **FAQ** (`faq`, question icon): 3-5 direct questions with short, answer-first replies, phrased like real searches. Also emitted as FAQPage JSON-LD.
6. **References** (`references`, bookmark icon): external sources, when there are any.
7. **Share** buttons, then a **CTA** card linking to the contact page. Use `cta` to customize the sentence; otherwise a generic one is used.

When changing a cover image, give the file a new name (e.g. `-v2`) so browsers and the image optimizer do not keep serving the old one.

Aim for 3-6 minutes of reading. New slugs are added to the sitemap and `llms.txt` automatically.

## Debugging

A VS Code launch configuration is available to debug the Node.js server in development mode.

## Formatting

Prettier is configured for consistent code formatting. Format-on-save is enabled in VS Code.

## Recommended Extensions

- **Prettier - Code formatter**: For consistent code formatting.

## Author

This project is maintained by Rafael. Note: `npm start` uses `NODE_ENV=production` inline syntax, so on Windows run it from Git Bash.
