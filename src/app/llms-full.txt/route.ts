import { articles } from '@/content/articles'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'

// Full-text companion of /llms.txt: every article as plain Markdown, so AI
// assistants can read and cite them without crawling each page.
export function GET() {
  const sections = articles.map(article => {
    const { title, description, summary, body, lessons, faq } =
      article.content['en-US']
    const url = `${SITE_URL}/en-US/articles/${article.slug}`

    const faqText =
      faq && faq.length > 0
        ? `\n\n## FAQ\n\n${faq.map(item => `**${item.question}**\n${item.answer}`).join('\n\n')}`
        : ''

    return `# ${title}

Source: ${url}
Author: ${SITE_NAME}
Published: ${article.date}
Tags: ${article.tags.join(', ')}

> ${description}

## Quick summary

${summary.map(item => `- ${item}`).join('\n')}

${body}

## Lessons

${lessons.map((lesson, index) => `${index + 1}. ${lesson}`).join('\n')}${faqText}`
  })

  const body = `# ${SITE_NAME}: full articles

Tech Lead and software engineer (Brazil). Site: ${SITE_URL}. Index: ${SITE_URL}/llms.txt

${sections.join('\n\n---\n\n')}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
