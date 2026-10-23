import {
  type ProjectCard,
  ProjectsPageContent,
} from '@/components/pages/projects/projects-page-content'
import {
  buildPageMetadata,
  canonicalLocale,
  resolveLocale,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo'

import { getTranslation } from '../../../../get-translation'

type Params = Promise<{ lang: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { lang } = await params

  return buildPageMetadata({
    lang,
    path: '/projects',
    getCopy: t => ({
      title: t.pages.projects.title,
      description: t.pages.projects.description,
    }),
  })
}

export default async function Page({ params }: { params: Params }) {
  const { lang } = await params
  const locale = canonicalLocale(resolveLocale(lang))
  const text = (await getTranslation(resolveLocale(lang))).pages.projects
  const items = text.items

  // Datum first: the design system behind the site and the tools.
  const projects: ProjectCard[] = [
    {
      href: '/projects/datum',
      kind: 'project',
      image: {
        src: '/images/projects/datum/temporadas.webp',
        position: 'left center',
      },
      ...items.datum,
    },
    {
      href: '/projects/instalacoes-e-reformas',
      kind: 'project',
      image: {
        src: '/images/projects/instalacoes_e_reformas_leroy_merlin/card-bg.webp',
      },
      ...items.instalacoesEReformas,
    },
    {
      href: '/tools/architecture',
      kind: 'tool',
      image: {
        src: '/images/articles/quanta-arquitetura-cover-v1.webp',
        position: 'right center',
      },
      ...items.architecture,
    },
    {
      href: '/projects/markit3d',
      kind: 'project',
      image: { src: '/images/projects/markit3d/blueprint.svg' },
      ...items.markit3d,
    },
    {
      href: '/projects/flex-sewing-machine',
      kind: 'project',
      image: { src: '/images/projects/flex-sewing-machine/blueprint.svg' },
      ...items.flexSewingMachine,
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: text.title,
    description: text.description,
    url: `${SITE_URL}/${locale}/projects`,
    inLanguage: locale,
    author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.title,
        url: `${SITE_URL}/${locale}${project.href}`,
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsPageContent
        locale={locale}
        title={text.title}
        description={text.description}
        text={text.index}
        projects={projects}
      />
    </>
  )
}
