import { articles } from '@/content/articles'
import { DATUM_STORYBOOK_URL, datumCopy } from '@/content/projects/datum'
import { architectureCopy } from '@/content/tools/architecture'
import { SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'

export function GET() {
  const articleLinks = articles
    .map(
      article =>
        `- [${article.content['en-US'].title}](${SITE_URL}/en-US/articles/${article.slug}): ${article.content['en-US'].description}`,
    )
    .join('\n')

  const body = `# Rafael Fachinelli

> Tech Lead and software engineer based in Ferraz de Vasconcelos, São Paulo, Brazil. Hands-on with React, Next.js, TypeScript, Java and Spring Boot; led the technical direction of an ecosystem of 40+ microservices in retail and commerce. Currently Tech Lead at Kruzer.

The site is available in Portuguese (pt-BR) and English (en-US).

## Main pages

- [About me](${SITE_URL}/en-US/about/me): background, education and focus areas
- [Resume](${SITE_URL}/en-US/about/resume): downloadable PDF resume
- [Timeline](${SITE_URL}/en-US/about/timeline): career timeline (Kruzer, Leroy Merlin via Develcode, Flex, and earlier roles)
- [Contact](${SITE_URL}/en-US/contact): contact form and links

## Tools

- [Architecture sketch](${SITE_URL}/en-US/tools/architecture): ${architectureCopy['en-US'].meta.description} Free, runs in the browser, exports PNG, Mermaid and an ADR draft.

## Projects

All projects: ${SITE_URL}/en-US/projects

- [Datum](${SITE_URL}/en-US/projects/datum): ${datumCopy['en-US'].meta.description} Storybook at ${DATUM_STORYBOOK_URL}
- [Instalações e Reformas](${SITE_URL}/en-US/projects/instalacoes-e-reformas): technical leadership of a 40+ microservices ecosystem at Leroy Merlin
- [Markit3D](${SITE_URL}/en-US/projects/markit3d): business website for a 3D printing company
- [Flex Sewing Machine](${SITE_URL}/en-US/projects/flex-sewing-machine): systems and embedded software for industrial automation

## Articles

${articleLinks}

Full text of every article: [llms-full.txt](${SITE_URL}/llms-full.txt). RSS: [en-US](${SITE_URL}/en-US/feed.xml), [pt-BR](${SITE_URL}/pt-BR/feed.xml).

## Profiles

- [LinkedIn](https://www.linkedin.com/in/rafaelfachinelli/)
- [GitHub](https://github.com/rafaelfachinelli)
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
