import '@/app/globals.css'

import { AppSidebar } from '@/components/layout/app-sidebar/app-sidebar'
import { Footer } from '@/components/layout/footer'
import { MainContent } from '@/components/layout/main-content'
import { Navbar } from '@/components/layout/navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { LanguageProvider } from '@/contexts/LanguageContext'

import { getDictionary } from '../../../get-dictionary'
import { Locale } from '../../../i18n-config'

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: Locale }>
}>) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <html lang={lang}>
      <body className="min-h-screen max-w-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider lang={lang} dictionary={dictionary}>
            <SidebarProvider defaultOpen={false}>
              <div className="flex w-full flex-col">
                <Navbar />
                <AppSidebar />
                <MainContent>{children}</MainContent>
                <Footer dictionary={dictionary} />
              </div>
            </SidebarProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
