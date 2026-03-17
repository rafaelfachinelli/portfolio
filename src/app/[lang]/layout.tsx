import '@/app/globals.css'

import { AppSidebar } from '@/components/layout/app-sidebar/app-sidebar'
import { Footer } from '@/components/layout/footer'
import { MainContent } from '@/components/layout/main-content'
import { Navbar } from '@/components/layout/navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { SpaceBackground } from '@/components/ui/space-background'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { LanguageProvider } from '@/contexts/LanguageContext'

import { getTranslation } from '../../../get-translation'
import { i18n, Locale } from '../../../i18n-config'

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>) {
  const { lang } = await params
  const locale = i18n.locales.includes(lang as Locale)
    ? (lang as Locale)
    : i18n.defaultLocale
  const translation = await getTranslation(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen max-w-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider lang={locale} translation={translation}>
            <SidebarProvider defaultOpen={false}>
              <div className="flex w-full flex-col">
                <Navbar />
                <AppSidebar />
                <SpaceBackground />
                <MainContent>{children}</MainContent>
                <Footer translation={translation} />
              </div>
            </SidebarProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
