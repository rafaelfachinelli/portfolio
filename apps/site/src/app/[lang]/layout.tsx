import '@/app/globals.css'

import { seasonInlineScript } from '@datum/tokens'
import type { Metadata } from 'next'
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import Script from 'next/script'

import { AppSidebar } from '@/components/layout/app-sidebar/app-sidebar'
import { Footer } from '@/components/layout/footer'
import { MainContent } from '@/components/layout/main-content'
import { Navbar } from '@/components/layout/navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { SITE_URL } from '@/lib/seo'

import { getTranslation } from '../../../get-translation'
import { i18n, Locale } from '../../../i18n-config'

// Datum type: Archivo for titles, IBM Plex Sans for text, IBM Plex Mono for
// annotations and numbers. The variables feed the Datum font tokens (globals.css).
const fontDisplay = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-archivo',
  display: 'swap',
})
const fontText = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
})
const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

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
    // Dark only (Datum). data-season is replaced before the first paint by the
    // inline script, from the visitor's local date.
    <html
      lang={locale}
      data-season="base"
      className={`dark ${fontDisplay.variable} ${fontText.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: seasonInlineScript }} />
      </head>
      <body className="min-h-screen max-w-screen antialiased">
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
              <MainContent>{children}</MainContent>
              <Footer translation={translation} />
            </div>
          </SidebarProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
