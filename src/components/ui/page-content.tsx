import { cn } from '@/lib/utils'

interface PageContentProps {
  readonly className?: string
  readonly children: React.ReactNode
}

export function PageContent({ className, children }: PageContentProps) {
  return (
    <div className={cn('flex flex-col gap-8 overflow-hidden', className)}>
      {children}
    </div>
  )
}
