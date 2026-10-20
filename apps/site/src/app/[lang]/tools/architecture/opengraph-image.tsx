import {
  architectureOgImage,
  OG_SIZE,
} from '@/components/pages/tools/architecture/architecture-og-image'
import { toArticleLocale } from '@/content/articles'
import { architectureCopy } from '@/content/tools/architecture'
import { PRESETS } from '@/lib/tools/architecture/questions'
import { buildArchitecture } from '@/lib/tools/architecture/rules'

export const alt = 'Architecture sketch'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const copy = architectureCopy[toArticleLocale(lang)]

  // The store preset shows most of the pieces without crowding the image.
  return architectureOgImage({
    copy,
    architecture: buildArchitecture(PRESETS.store),
    kicker: lang.startsWith('pt') ? 'FERRAMENTA GRATUITA' : 'FREE TOOL',
    title: copy.meta.ogTitle,
  })
}
