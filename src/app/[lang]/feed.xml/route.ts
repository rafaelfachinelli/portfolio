import { articles, toArticleLocale } from '@/content/articles'
import { INDEXED_LOCALES, SITE_NAME, SITE_URL } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return INDEXED_LOCALES.map(lang => ({ lang }))
}

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params
  const locale = toArticleLocale(lang)
  const isPortuguese = locale === 'pt-BR'

  const items = articles
    .map(article => {
      const { title, description } = article.content[locale]
      const url = `${SITE_URL}/${locale}/articles/${article.slug}`

      return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${article.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(description)}</description>
${article.tags.map(tag => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`
    })
    .join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} - ${isPortuguese ? 'Artigos' : 'Articles'}</title>
    <link>${SITE_URL}/${locale}/articles</link>
    <description>${
      isPortuguese
        ? 'Textos sobre engenharia de software, arquitetura, testes e liderança técnica.'
        : 'Writing about software engineering, architecture, testing, and technical leadership.'
    }</description>
    <language>${locale}</language>
    <atom:link href="${SITE_URL}/${locale}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(feed, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
