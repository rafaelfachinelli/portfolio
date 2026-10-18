'use client'

import { Download, Loader } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'
import { generateResumePdf } from '@/lib/generate-resume-pdf'

type ResumeDownloadButtonProps = Readonly<{
  title: string
  downloadDescription: string
  downloadLabel: string
  fileName: string
}>

export function ResumeDownloadButton({
  title,
  downloadDescription,
  downloadLabel,
  fileName,
}: ResumeDownloadButtonProps) {
  const { lang } = useLanguage()
  const [isLoadingImage, setIsLoadingImage] = useState(true)

  return (
    <Card className="mb-4 w-full border-0 bg-white p-6 dark:bg-black/50">
      <div className="animate-datum-float relative flex w-full items-center justify-center overflow-hidden motion-reduce:animate-none">
        <Image
          src="/images/resume/resume.png"
          alt={title}
          width={200}
          height={400}
          priority
          className="rounded-lg object-cover transition-transform duration-500 select-none hover:scale-105"
          title={downloadDescription}
          onLoad={() => setIsLoadingImage(false)}
          onError={() => {
            setIsLoadingImage(false)
          }}
        />
        {isLoadingImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="text-season-accent h-8 w-8 animate-spin" />
          </div>
        )}
      </div>
      <p className="text-foreground text-center text-sm">
        {downloadDescription}
      </p>
      <Button
        onClick={() => generateResumePdf(lang)}
        className="flex w-full cursor-pointer items-center gap-2"
        variant="secondary"
      >
        <Download className="h-4 w-4" />
        {downloadLabel}
      </Button>
      <div className="flex w-full items-center justify-between">
        <p className="text-foreground text-sm">{fileName}</p>
        <p className="text-foreground text-sm">4.1 MB</p>
      </div>
    </Card>
  )
}
