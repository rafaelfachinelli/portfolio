import Image from 'next/image'

import { Card } from '@/components/ui/card'

import { ResumePdfButton } from './resume-pdf-button'

type HomeResumeCardProps = {
  title: string
  cardTitle: string
  description: string
  buttonLabel: string
}

export function HomeResumeCard({
  title,
  cardTitle,
  description,
  buttonLabel,
}: Readonly<HomeResumeCardProps>) {
  return (
    <div>
      <Card className="border-white/10 bg-white/10 p-6 dark:bg-black/40">
        <div className="flex h-full flex-col gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium tracking-[0.3em] text-white/70 uppercase">
              {title}
            </p>
            <h2 className="text-2xl font-semibold text-white">{cardTitle}</h2>
          </div>

          {/* Gentle float in CSS (no JavaScript loop); off for reduced motion. */}
          <div className="animate-datum-float flex justify-center motion-reduce:animate-none">
            <Image
              src="/images/resume/resume.png"
              alt={title}
              width={140}
              height={250}
              priority
              className="rounded-lg object-cover shadow-lg"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm leading-6 text-white/75">{description}</p>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <ResumePdfButton label={buttonLabel} />
          </div>
        </div>
      </Card>
    </div>
  )
}
