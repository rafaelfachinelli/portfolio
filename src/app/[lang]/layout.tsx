import '@/app/globals.css'

import type { Metadata } from 'next'
import Script from 'next/script'

import { AppSidebar } from '@/components/layout/app-sidebar/app-sidebar'
import { Footer } from '@/components/layout/footer'
import { MainContent } from '@/components/layout/main-content'
import { Navbar } from '@/components/layout/navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { SpaceBackground } from '@/components/ui/space-background'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { SITE_URL } from '@/lib/seo'

import { getTranslation } from '../../../get-translation'
import { i18n, Locale } from '../../../i18n-config'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
}

// Only the known locales are generated; anything else returns a real 404
// instead of a "soft 404" page, and pages become statically cacheable.
export const dynamicParams = false

export function generateStaticParams() {
  return i18n.locales.map(lang => ({ lang }))
}

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
          {process.env.NODE_ENV === 'production' && (
            <Script
              defer
              strategy="afterInteractive"
              src="https://cloud.umami.is/script.js"
              data-website-id="5fc56e02-c7cf-45fa-b3f3-ad701c512834"
            />
          )}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Rafael Fachinelli',
                jobTitle: 'Tech Lead & Software Engineer',
                url: SITE_URL,
                image: `${SITE_URL}/logo_1024x1024.png`,
                email: 'rafael.l.a.fachinelli@gmail.com',
                worksFor: { '@type': 'Organization', name: 'Kruzer' },
                knowsAbout: [
                  'React',
                  'Next.js',
                  'TypeScript',
                  'Java',
                  'Spring Boot',
                  'Microservices',
                  'Apache Kafka',
                  'Software Architecture',
                  'Automated Testing',
                  'CI/CD',
                ],
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Ferraz de Vasconcelos',
                  addressRegion: 'SP',
                  addressCountry: 'BR',
                },
                alumniOf: ['FATEC-SP', 'ETEC', 'USP/Esalq'],
                sameAs: [
                  'https://www.linkedin.com/in/rafaelfachinelli/',
                  'https://github.com/rafaelfachinelli',
                ],
              }),
            }}
          />
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
