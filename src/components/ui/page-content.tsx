interface PageContentProps {
  readonly className?: string
  readonly children: React.ReactNode
}

export function PageContent({ className, children }: PageContentProps) {
  return (
    <div className={`flex flex-col gap-8 py-8 ${className}`}>{children}</div>
  )
}
