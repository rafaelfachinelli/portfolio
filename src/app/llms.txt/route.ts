import { articles } from '@/content/articles'
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

## Case studies

- [Instalações e Reformas](${SITE_URL}/en-US/projects/instalacoes-e-reformas): technical leadership of a 40+ microservices ecosystem at Leroy Merlin
- [Markit3D](${SITE_URL}/en-US/projects/markit3d): business website for a 3D printing company
- [Flex Sewing Machine](${SITE_URL}/en-US/projects/flex-sewing-machine): systems and embedded software for industrial automation

## Articles

${articleLinks}

## Profiles

- [LinkedIn](https://www.linkedin.com/in/rafaelfachinelli/)
- [GitHub](https://github.com/rafaelfachinelli)
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
