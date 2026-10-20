import { ImageResponse } from 'next/og'

import type { ArchitectureCopy } from '@/content/tools/architecture'
import { flowLayers } from '@/lib/tools/architecture/layout'
import type { Architecture } from '@/lib/tools/architecture/rules'

// Open Graph image (1200×630) that draws an architecture as columns of boxes.
// Satori renders it, so only flexbox and inline styles; colors are the Datum
// base palette written out (CSS variables do not exist there).

export const OG_SIZE = { width: 1200, height: 630 }

const COLORS = {
  board: '#020617',
  surface: '#0f172a',
  line: '#334155',
  ink: '#e2e8f0',
  muted: '#94a3b8',
  accent: '#38bdf8',
  warning: '#f59e0b',
}

export function architectureOgImage({
  copy,
  architecture,
  kicker,
  title,
}: {
  copy: ArchitectureCopy
  architecture: Architecture
  kicker: string
  title: string
}) {
  const layers = flowLayers(architecture)
  const boxHeight = layers.some(layer => layer.length > 4) ? 44 : 52

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '52px 56px',
          color: COLORS.ink,
          backgroundColor: COLORS.board,
          backgroundImage: `linear-gradient(${COLORS.surface} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.surface} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            letterSpacing: 4,
            color: COLORS.accent,
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 54,
            fontWeight: 800,
            marginTop: 10,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 24,
          }}
        >
          {layers.map((layer, index) => (
            <div
              key={layer.join()}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {index > 0 && (
                <div
                  style={{
                    display: 'flex',
                    width: 20,
                    height: 2,
                    backgroundColor: COLORS.accent,
                    opacity: 0.7,
                  }}
                />
              )}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                {layer.map(id => {
                  const node = architecture.nodes.find(item => item.id === id)
                  return (
                    <div
                      key={id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: boxHeight,
                        width: 116,
                        padding: '0 10px',
                        borderRadius: 6,
                        border: `1.5px solid ${node?.spof ? COLORS.warning : COLORS.line}`,
                        backgroundColor: COLORS.surface,
                        fontSize: 15,
                        fontWeight: 600,
                        lineHeight: 1.15,
                      }}
                    >
                      {copy.nodes[id].name}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 20,
            color: COLORS.muted,
            marginTop: 20,
          }}
        >
          <span>rafaelfachinelli.com</span>
          <span>
            {copy.ui.pieces.replace(
              '{count}',
              String(architecture.nodes.length - 1),
            )}
          </span>
        </div>
      </div>
    ),
    OG_SIZE,
  )
}
