import { cn } from '@/lib/utils'

interface PageContentProps {
  readonly className?: string
  readonly children: React.ReactNode
}

export function PageContent({ className, children }: PageContentProps) {
  return <div className={cn('flex flex-col pt-8', className)}>{children}</div>
}
