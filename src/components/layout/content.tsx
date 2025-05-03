import React from 'react';

type MainContentProps = Readonly<{
  children: React.ReactNode;
}>;

export function MainContent({ children }: MainContentProps) {
  return <main className="p-4 min-h-screen">{children}</main>;
}
