import type { NodeShape } from '@/lib/tools/architecture/categories'

// The outline of a box, drawn in SVG so each kind of piece has its own shape.
// Fill and stroke come from CSS (`.arch-shape`), so states (selected, lit,
// dimmed) only change classes.

/** Room the shape takes from the content, in px: [top, right, bottom, left]. */
export const SHAPE_INSET: Record<NodeShape, [number, number, number, number]> =
  {
    pill: [0, 16, 0, 16],
    hexagon: [0, 18, 0, 18],
    rect: [0, 12, 0, 12],
    queue: [0, 40, 0, 12],
    pipe: [0, 22, 0, 14],
    chip: [4, 12, 4, 12],
    cylinder: [10, 12, 0, 12],
    bucket: [6, 18, 0, 18],
    group: [0, 12, 0, 12],
  }

export function NodeShapeOutline({
  shape,
  width: w,
  height: h,
  dashed,
}: Readonly<{
  shape: NodeShape
  width: number
  height: number
  dashed: boolean
}>) {
  const dash = dashed ? '5 4' : undefined
  const common = {
    className: 'arch-shape',
    strokeDasharray: dash,
    vectorEffect: 'non-scaling-stroke' as const,
  }
  // Inner lines (a cylinder's lid, a queue's messages) share the stroke but not the fill.
  const detail = { className: 'arch-shape-detail', strokeDasharray: dash }

  return (
    <svg
      aria-hidden="true"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="absolute inset-0 overflow-visible"
    >
      {shape === 'pill' && (
        <rect
          x={0.75}
          y={0.75}
          width={w - 1.5}
          height={h - 1.5}
          rx={(h - 1.5) / 2}
          {...common}
        />
      )}
      {(shape === 'rect' || shape === 'group') && (
        <rect
          x={0.75}
          y={0.75}
          width={w - 1.5}
          height={h - 1.5}
          rx={6}
          {...common}
        />
      )}
      {shape === 'hexagon' && (
        <polygon
          points={`14,0.75 ${w - 14},0.75 ${w - 0.75},${h / 2} ${w - 14},${h - 0.75} 14,${h - 0.75} 0.75,${h / 2}`}
          strokeLinejoin="round"
          {...common}
        />
      )}
      {shape === 'queue' && (
        <>
          <rect
            x={0.75}
            y={0.75}
            width={w - 1.5}
            height={h - 1.5}
            rx={6}
            {...common}
          />
          {[12, 20, 28].map(offset => (
            <rect
              key={offset}
              x={w - offset - 4}
              y={12}
              width={5}
              height={h - 24}
              rx={1.5}
              {...detail}
              style={{ fill: 'var(--arch-color)', fillOpacity: 0.35 }}
            />
          ))}
        </>
      )}
      {shape === 'pipe' && (
        <>
          <path
            d={`M12 0.75 H${w - 12} A11 ${h / 2 - 0.75} 0 0 1 ${w - 12} ${h - 0.75} H12 A11 ${h / 2 - 0.75} 0 0 1 12 0.75 Z`}
            {...common}
          />
          <path
            d={`M${w - 12} 0.75 A11 ${h / 2 - 0.75} 0 0 0 ${w - 12} ${h - 0.75}`}
            fill="none"
            {...detail}
          />
        </>
      )}
      {shape === 'chip' && (
        <>
          <rect
            x={0.75}
            y={4}
            width={w - 1.5}
            height={h - 8}
            rx={4}
            {...common}
          />
          {Array.from({ length: Math.floor((w - 24) / 18) }, (_, index) => {
            const x = 18 + index * 18
            return (
              <g key={x} {...detail}>
                <line x1={x} y1={0} x2={x} y2={4} />
                <line x1={x} y1={h - 4} x2={x} y2={h} />
              </g>
            )
          })}
        </>
      )}
      {shape === 'cylinder' && (
        <>
          <path
            d={`M0.75 9 A${w / 2 - 0.75} 8 0 0 1 ${w - 0.75} 9 V${h - 9} A${w / 2 - 0.75} 8 0 0 1 0.75 ${h - 9} Z`}
            {...common}
          />
          <path
            d={`M0.75 9 A${w / 2 - 0.75} 8 0 0 0 ${w - 0.75} 9`}
            fill="none"
            {...detail}
          />
        </>
      )}
      {shape === 'bucket' && (
        <>
          <path
            d={`M0.75 6 L12 ${h - 0.75} H${w - 12} L${w - 0.75} 6 Z`}
            strokeLinejoin="round"
            {...common}
          />
          <ellipse cx={w / 2} cy={6} rx={w / 2 - 0.75} ry={5} {...common} />
        </>
      )}
    </svg>
  )
}
