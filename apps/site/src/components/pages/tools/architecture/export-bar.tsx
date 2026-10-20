import { Button, Card, CardContent } from '@datum/ui'
import { Check, Code2, FileText, ImageDown, Link2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { ArchitectureCopy } from '@/content/tools/architecture'
import { track } from '@/lib/analytics'
import { encodeAnswers } from '@/lib/tools/architecture/code'
import { toAdr, toMermaid } from '@/lib/tools/architecture/export'
import type { Answers } from '@/lib/tools/architecture/questions'
import type { Architecture } from '@/lib/tools/architecture/rules'

import type { DiagramApi } from './architecture-diagram'

type Format = 'png' | 'mermaid' | 'adr' | 'link'

function download(href: string, fileName: string) {
  const link = document.createElement('a')
  link.href = href
  link.download = fileName
  link.click()
}

/** PNG, Mermaid, ADR draft and share link. Everything happens in the browser. */
export function ExportBar({
  copy,
  locale,
  answers,
  architecture,
  diagram,
}: Readonly<{
  copy: ArchitectureCopy
  locale: string
  answers: Answers
  architecture: Architecture
  diagram: DiagramApi | null
}>) {
  const [done, setDone] = useState<Format | null>(null)

  useEffect(() => {
    if (!done) return
    const timer = window.setTimeout(() => setDone(null), 2000)
    return () => window.clearTimeout(timer)
  }, [done])

  const shareUrl = () =>
    `${window.location.origin}/${locale}/tools/architecture/r/${encodeAnswers(answers)}`
  const fileBase = locale.startsWith('pt') ? 'arquitetura' : 'architecture'

  const run = async (format: Format) => {
    if (format === 'png') {
      if (!diagram) return
      const caption = `${window.location.host}/${locale}/tools/architecture`
      download(await diagram.toPng(caption), `${fileBase}.png`)
    } else if (format === 'mermaid') {
      await navigator.clipboard.writeText(toMermaid(architecture, copy))
    } else if (format === 'adr') {
      const markdown = toAdr(architecture, answers, copy, {
        date: new Date().toISOString().slice(0, 10),
        url: shareUrl(),
      })
      const url = URL.createObjectURL(
        new Blob([markdown], { type: 'text/markdown;charset=utf-8' }),
      )
      download(url, `adr-${fileBase}.md`)
      URL.revokeObjectURL(url)
    } else {
      await navigator.clipboard.writeText(shareUrl())
      track('architecture-share')
    }
    setDone(format)
    if (format !== 'link') track('architecture-export', { format })
  }

  const label = (format: Format, text: string) =>
    done === format
      ? format === 'png' || format === 'adr'
        ? copy.ui.downloaded
        : copy.ui.copied
      : text

  const buttons: { format: Format; text: string; icon: React.ReactNode }[] = [
    { format: 'png', text: copy.ui.exportPng, icon: <ImageDown /> },
    { format: 'mermaid', text: copy.ui.exportMermaid, icon: <Code2 /> },
    { format: 'adr', text: copy.ui.exportAdr, icon: <FileText /> },
    { format: 'link', text: copy.ui.share, icon: <Link2 /> },
  ]

  return (
    <Card>
      <CardContent className="grid gap-3">
        <h2 className="font-display text-lg font-bold">
          {copy.ui.exportTitle}
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {buttons.map(({ format, text, icon }) => (
            <Button
              key={format}
              variant={format === 'link' ? 'primary' : 'outline'}
              disabled={format === 'png' && !diagram}
              onClick={() => void run(format)}
            >
              {done === format ? <Check /> : icon}
              <span aria-live="polite">{label(format, text)}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
