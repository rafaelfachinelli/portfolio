type MainContentProps = Readonly<{
  children: React.ReactNode
}>

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="mx-auto min-h-screen max-w-[1024px] overflow-hidden p-4">
      {children}
    </main>
  )
}
