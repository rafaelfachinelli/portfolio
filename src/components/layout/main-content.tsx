import React from 'react'

type MainContentProps = Readonly<{
  children: React.ReactNode
}>

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="mx-auto min-h-screen max-w-[1024px] p-4">{children}</main>
  )
}
