import {
  architectureOgImage,
  OG_SIZE,
} from '@/components/pages/tools/architecture/architecture-og-image'
import { toArticleLocale } from '@/content/articles'
import { architectureCopy } from '@/content/tools/architecture'
import { decodeAnswers } from '@/lib/tools/architecture/code'
import { DEFAULT_ANSWERS } from '@/lib/tools/architecture/questions'
import { buildArchitecture } from '@/lib/tools/architecture/rules'

export const alt = 'Architecture sketch'
export const size = OG_SIZE
export const contentType = 'image/png'

/** The preview of a shared link draws that link's architecture. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string; code: string }>
}) {
  const { lang, code } = await params
  const copy = architectureCopy[toArticleLocale(lang)]
  const answers = decodeAnswers(code) ?? DEFAULT_ANSWERS
  const kind = copy.questions.kind.options[answers.kind].title
  const users = copy.questions.users.options[answers.users].title

  return architectureOgImage({
    copy,
    architecture: buildArchitecture(answers),
    kicker: copy.meta.ogTitle.toUpperCase(),
    title: `${kind} · ${users} ${copy.meta.atOnce}`,
  })
}
