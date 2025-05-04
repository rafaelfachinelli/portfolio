type MainContentProps = Readonly<{
  children: React.ReactNode
}>

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1024px] p-4">
      {children}
    </main>
  )
}
