'use client'

import { motion } from 'framer-motion'
import { Download, Loader } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'
import { generateResumePdf } from '@/lib/generate-resume-pdf'

export function ResumeDownloadButton() {
  const { translation } = useLanguage()
  const [isLoadingImage, setIsLoadingImage] = useState(true)

  return (
    <Card className="mb-4 w-full border-0 bg-white p-6 backdrop-blur-sm dark:bg-black/50">
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="relative flex w-full items-center justify-center overflow-hidden"
      >
        <Image
          src="/images/resume/resume.png"
          alt={translation.pages.about.resume.title}
          width={200}
          height={400}
          priority
          className="rounded-lg object-cover transition-transform duration-500 select-none hover:scale-105"
          title={translation.pages.about.resume.downloadDescription}
          onLoad={() => setIsLoadingImage(false)}
          onError={() => {
            setIsLoadingImage(false)
          }}
        />
        {isLoadingImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        )}
      </motion.div>
      <p className="text-foreground text-center text-sm">
        {translation.pages.about.resume.downloadDescription}
      </p>
      <Button
        onClick={() => generateResumePdf(translation)}
        className="flex w-full cursor-pointer items-center gap-2"
        variant="secondary"
      >
        <Download className="h-4 w-4" />
        {translation.pages.about.resume.download}
      </Button>
      <div className="flex w-full items-center justify-between">
        <p className="text-foreground text-sm">
          {translation.pages.about.resume.file.name}
        </p>
        <p className="text-foreground text-sm">4.1 MB</p>
      </div>
    </Card>
  )
}
