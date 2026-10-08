import { ImageResponse } from 'next/og'

export const alt = 'Rafael Fachinelli — Tech Lead & Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const isPortuguese = lang.startsWith('pt')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          color: 'white',
          background:
            'linear-gradient(135deg, #020617 0%, #0f172a 55%, #0c4a6e 100%)',
        }}
      >
        <div style={{ fontSize: 30, color: '#38bdf8', letterSpacing: 4 }}>
          RAFAELFACHINELLI.COM
        </div>
        <div style={{ fontSize: 88, fontWeight: 800, marginTop: 24 }}>
          Rafael Fachinelli
        </div>
        <div style={{ fontSize: 40, marginTop: 16, color: '#e2e8f0' }}>
          {isPortuguese
            ? 'Tech Lead & Engenheiro de Software'
            : 'Tech Lead & Software Engineer'}
        </div>
        <div style={{ fontSize: 28, marginTop: 32, color: '#94a3b8' }}>
          React · Next.js · Java · Spring Boot · Kafka
        </div>
      </div>
    ),
    size,
  )
}
