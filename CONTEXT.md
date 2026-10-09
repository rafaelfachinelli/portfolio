# Project Context

## Project Overview

This project is a personal portfolio website built using modern web technologies. It includes features such as internationalization, a custom UI library, and server-side rendering. The project is structured to support scalability and maintainability.

## Key Technologies

- **Next.js**: For server-side rendering and routing.
- **React**: For building user interfaces.
- **Tailwind CSS**: For styling.
- **TypeScript**: For type safety.
- **Docker**: For containerization.

## Folder Structure

- **translations/**: JSON files with all site copy (`en-US.json`, `pt-BR.json`). Timeline, resume and home texts live here; keep both files with the same keys.
- **public/**: Static assets like images.
- **src/**: Main source code, including middleware, app pages, components, and utility functions.
- **app/**: Houses the main application logic, including layouts and pages.
- **components/**: Reusable UI components.
- **lib/**: Utility functions and helpers.

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

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm start`: Runs the production server.
- `npm run lint`: Lints the codebase.

## Environment variables

Copy `.env.example` to `.env.local`. `RESEND_API_KEY` enables the contact form (`/api/contact`); without it the form returns an error. `GITHUB_TOKEN` is optional and raises the GitHub API rate limit.

## SEO

Page metadata comes from `src/lib/seo.ts` (`buildPageMetadata`), used by each `page.tsx`. `src/app/sitemap.ts`, `src/app/robots.ts` and `src/app/[lang]/opengraph-image.tsx` are generated. When adding a page, also add its path to `SITE_PATHS`.

## Articles (standard template)

Articles live in `src/content/articles.ts` (one entry per article, with `pt-BR` and `en-US` content). Every article follows the same template, rendered by `article-page-content.tsx`:

1. **Cover** (1200x630, `public/images/articles/`), **tags** (2-4), title, description (one or two short sentences), date and reading time.
2. **Body** (`body`, Markdown): short intro, then `##` sections. Free structure, may use `###`, lists and images. Do not write lessons, references or a CTA inside the body.
3. **Lessons** (`lessons`): 3-5 short takeaways, always present.
4. **References** (`references`): external sources, when there are any.
5. **CTA** card linking to the contact page. Use `cta` to customize the sentence; otherwise a generic one is used.

Aim for 3-6 minutes of reading. New slugs are added to the sitemap and `llms.txt` automatically.

## Debugging

A VS Code launch configuration is available to debug the Node.js server in development mode.

## Formatting

Prettier is configured for consistent code formatting. Format-on-save is enabled in VS Code.

## Recommended Extensions

- **Prettier - Code formatter**: For consistent code formatting.

## Author

This project is maintained by Rafael. Note: `npm start` uses `NODE_ENV=production` inline syntax, so on Windows run it from Git Bash.
