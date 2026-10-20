'use client'

import '@xyflow/react/dist/base.css'
import './architecture-diagram.css'

import { Button } from '@datum/ui'
import {
  BaseEdge,
  type Edge,
  type EdgeProps,
  getBezierPath,
  getViewportForBounds,
  Handle,
  MarkerType,
  type Node,
  type NodeProps,
  Panel,
  Position,
  ReactFlow,
  ReactFlowProvider,
  type Rect,
  useReactFlow,
} from '@xyflow/react'
import { toCanvas } from 'html-to-image'
import { Maximize, Minus, Plus, TriangleAlert } from 'lucide-react'
import { useEffect, useMemo } from 'react'

import type { ArchitectureCopy } from '@/content/tools/architecture'
import {
  type Direction,
  layoutArchitecture,
  NODE_HEIGHT,
  NODE_WIDTH,
} from '@/lib/tools/architecture/layout'
import type {
  Architecture,
  EdgeKind,
  NodeId,
} from '@/lib/tools/architecture/rules'
import type { ScenarioStep } from '@/lib/tools/architecture/scenarios'

import { ACTIVE_COLOR, EDGE_STYLE } from './edge-styles'
import { NODE_ICONS } from './node-icons'

export type DiagramApi = { toPng: (caption: string) => Promise<string> }

type ArchNodeData = {
  nodeId: NodeId
  title: string
  tags: string[]
  spof: boolean
  spofLabel: string
  state: 'idle' | 'active' | 'dim'
  direction: Direction
}

type FlowEdgeData = {
  kind: EdgeKind
  state: 'idle' | 'active' | 'dim'
  reverse: boolean
  reducedMotion: boolean
}

type ArchFlowNode = Node<ArchNodeData, 'arch'>
type ArchFlowEdge = Edge<FlowEdgeData, 'flow'>

function ArchitectureNode({ data, selected }: NodeProps<ArchFlowNode>) {
  const Icon = NODE_ICONS[data.nodeId]
  const horizontal = data.direction === 'horizontal'
  const main = horizontal
    ? { target: Position.Left, source: Position.Right }
    : { target: Position.Top, source: Position.Bottom }
  const side = horizontal
    ? { target: Position.Top, source: Position.Bottom }
    : { target: Position.Left, source: Position.Right }

  return (
    <div
      data-state={data.state}
      data-selected={selected || undefined}
      style={{ width: NODE_WIDTH, height: NODE_HEIGHT }}
      className="arch-node border-line-strong bg-surface text-ink data-[selected]:border-season-accent data-[selected]:ring-season-accent/40 data-[state=active]:border-season-accent relative flex items-center gap-2.5 rounded-[var(--datum-radius-md)] border px-3 shadow-sm transition-[opacity,border-color,box-shadow] duration-300 data-[selected]:ring-2 data-[state=active]:shadow-[0_0_18px_-4px_var(--datum-season-accent)] data-[state=dim]:opacity-35"
    >
      <Handle type="target" id="main" position={main.target} />
      <Handle type="target" id="side" position={side.target} />
      <Handle type="target" id="back" position={side.source} />
      <span className="bg-well text-season-accent grid size-8 shrink-0 place-items-center rounded-[var(--datum-radius-sm)]">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="grid min-w-0 gap-0.5">
        <span className="line-clamp-2 text-[13px] leading-tight font-semibold">
          {data.title}
        </span>
        {data.tags.length > 0 && (
          <span className="text-ink-muted truncate font-mono text-[10px] leading-tight">
            {data.tags.join(' · ')}
          </span>
        )}
      </span>
      {data.spof && (
        <span
          title={data.spofLabel}
          className="bg-board text-warning absolute -top-2 -right-2 grid size-5 place-items-center rounded-full"
        >
          <TriangleAlert className="size-3.5" aria-hidden="true" />
        </span>
      )}
      <Handle type="source" id="main" position={main.source} />
      <Handle type="source" id="side" position={side.source} />
      <Handle type="source" id="back" position={side.target} />
    </div>
  )
}

function FlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  markerStart,
  data,
}: EdgeProps<ArchFlowEdge>) {
  const [path] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  })
  if (!data) return null
  const style = EDGE_STYLE[data.kind]
  const active = data.state === 'active'
  const color = active ? ACTIVE_COLOR : style.color
  const seconds = active ? 1.1 : style.seconds
  const showDots = !data.reducedMotion && data.state !== 'dim'
  const directions =
    data.kind === 'live' && !active ? [false, true] : [data.reverse]

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        markerStart={markerStart}
        className="transition-opacity duration-300"
        style={{
          stroke: color,
          strokeWidth: active ? 2.5 : style.width,
          strokeDasharray: active ? undefined : style.dash,
          opacity: data.state === 'dim' ? 0.18 : active ? 1 : 0.7,
        }}
      />
      {showDots &&
        directions.map(reverse => (
          <circle
            key={String(reverse)}
            className="flow-dot"
            r={active ? 4.5 : 2.5}
            fill={color}
            opacity={active ? 1 : 0.85}
            style={
              active ? { filter: `drop-shadow(0 0 4px ${color})` } : undefined
            }
          >
            <animateMotion
              dur={`${seconds}s`}
              repeatCount="indefinite"
              path={path}
              keyPoints={reverse ? '1;0' : '0;1'}
              keyTimes="0;1"
              calcMode="linear"
            />
          </circle>
        ))}
    </>
  )
}

const nodeTypes = { arch: ArchitectureNode }
const edgeTypes = { flow: FlowEdge }

export type ArchitectureDiagramProps = {
  architecture: Architecture
  copy: Pick<ArchitectureCopy, 'nodes' | 'tags' | 'ui'>
  direction: Direction
  selected: NodeId | null
  onSelect: (id: NodeId | null) => void
  step: ScenarioStep | null
  reducedMotion: boolean
  onReady?: (api: DiagramApi) => void
}

function Diagram({
  architecture,
  copy,
  direction,
  selected,
  onSelect,
  step,
  reducedMotion,
  onReady,
}: ArchitectureDiagramProps) {
  const { fitView, zoomIn, zoomOut } = useReactFlow()
  const layout = useMemo(
    () => layoutArchitecture(architecture, direction),
    [architecture, direction],
  )

  // Boxes and edges touched by the current scenario step.
  const activeEdges = useMemo(() => new Set(step?.edges ?? []), [step])
  const activeNodes = useMemo(() => {
    const ids = new Set<string>()
    for (const edge of architecture.edges) {
      if (activeEdges.has(edge.id)) {
        ids.add(edge.from)
        ids.add(edge.to)
      }
    }
    return ids
  }, [architecture.edges, activeEdges])

  const nodes: ArchFlowNode[] = useMemo(
    () =>
      architecture.nodes.map(node => ({
        id: node.id,
        type: 'arch',
        position: layout.positions[node.id] ?? { x: 0, y: 0 },
        selected: node.id === selected,
        draggable: false,
        connectable: false,
        ariaLabel: [
          copy.nodes[node.id].name,
          ...node.tags.map(tag => copy.tags[tag]),
          node.spof ? copy.ui.spof : '',
        ]
          .filter(Boolean)
          .join(', '),
        data: {
          nodeId: node.id,
          title: copy.nodes[node.id].name,
          tags: node.tags
            .filter(tag => tag !== 'modular')
            .map(tag => copy.tags[tag]),
          spof: node.spof,
          spofLabel: copy.ui.spofHint,
          direction,
          state: step ? (activeNodes.has(node.id) ? 'active' : 'dim') : 'idle',
        },
      })),
    [architecture.nodes, layout, selected, copy, direction, step, activeNodes],
  )

  const edges: ArchFlowEdge[] = useMemo(
    () =>
      architecture.edges.map(edge => {
        const handles = layout.handles[edge.id]
        const active = activeEdges.has(edge.id)
        const color = active ? ACTIVE_COLOR : EDGE_STYLE[edge.kind].color
        const marker = {
          type: MarkerType.ArrowClosed,
          color,
          width: 16,
          height: 16,
        }
        return {
          id: edge.id,
          type: 'flow',
          source: edge.from,
          target: edge.to,
          sourceHandle: handles.source,
          targetHandle: handles.target,
          focusable: false,
          markerEnd: marker,
          markerStart: edge.kind === 'live' ? marker : undefined,
          data: {
            kind: edge.kind,
            state: step ? (active ? 'active' : 'dim') : 'idle',
            reverse: Boolean(step?.reverse && active),
            reducedMotion,
          },
        }
      }),
    [architecture.edges, layout, activeEdges, step, reducedMotion],
  )

  // Reframe when boxes come or go, or the direction changes.
  const shape = architecture.nodes.map(node => node.id).join() + direction
  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      fitView({
        padding: 0.12,
        maxZoom: 1.1,
        duration: reducedMotion ? 0 : 450,
      }),
    )
    return () => cancelAnimationFrame(frame)
  }, [shape, fitView, reducedMotion])

  useEffect(() => {
    // Boxes have a fixed size, so the layout alone gives the drawing's bounds.
    const positions = Object.values(layout.positions)
    const left = Math.min(...positions.map(position => position.x))
    const top = Math.min(...positions.map(position => position.y))
    const bounds: Rect = {
      x: left,
      y: top,
      width:
        Math.max(...positions.map(position => position.x)) - left + NODE_WIDTH,
      height:
        Math.max(...positions.map(position => position.y)) - top + NODE_HEIGHT,
    }
    onReady?.({ toPng: caption => renderPng(bounds, caption) })
  }, [onReady, layout])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitView
      fitViewOptions={{ padding: 0.12, maxZoom: 1.1 }}
      minZoom={0.2}
      maxZoom={1.75}
      nodesDraggable={false}
      nodesConnectable={false}
      edgesFocusable={false}
      elementsSelectable
      onNodeClick={(_, node) => onSelect(node.id as NodeId)}
      onPaneClick={() => onSelect(null)}
      // Keyboard selection (Enter on a focused box) arrives as a change.
      onNodesChange={changes => {
        const chosen = changes.find(
          change => change.type === 'select' && change.selected,
        )
        if (chosen && 'id' in chosen) onSelect(chosen.id as NodeId)
      }}
      proOptions={{ hideAttribution: true }}
      ariaLabelConfig={{
        'node.a11yDescription.default': copy.ui.a11yNode,
        'node.a11yDescription.keyboardDisabled': copy.ui.a11yNode,
        'controls.ariaLabel': copy.ui.a11yControls,
        'controls.zoomIn.ariaLabel': copy.ui.zoomIn,
        'controls.zoomOut.ariaLabel': copy.ui.zoomOut,
        'controls.fitView.ariaLabel': copy.ui.fitView,
      }}
      className="architecture-flow"
    >
      <Panel position="top-right" className="flex gap-1">
        <Button
          size="icon"
          variant="secondary"
          aria-label={copy.ui.zoomIn}
          onClick={() => void zoomIn({ duration: 200 })}
        >
          <Plus />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          aria-label={copy.ui.zoomOut}
          onClick={() => void zoomOut({ duration: 200 })}
        >
          <Minus />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          aria-label={copy.ui.fitView}
          onClick={() =>
            void fitView({ padding: 0.12, maxZoom: 1.1, duration: 300 })
          }
        >
          <Maximize />
        </Button>
      </Panel>
    </ReactFlow>
  )
}

/** Draws the whole diagram (not just the visible part) to a PNG data URL. */
async function renderPng(bounds: Rect, caption: string): Promise<string> {
  const viewport = document.querySelector<HTMLElement>(
    '.architecture-flow .react-flow__viewport',
  )
  if (!viewport) throw new Error('Diagram not mounted')

  const scale = 2
  const width = Math.round(bounds.width + 96)
  const height = Math.round(bounds.height + 96)
  const transform = getViewportForBounds(bounds, width, height, 1, 1, 0)
  const background =
    getComputedStyle(document.body).getPropertyValue('--datum-color-board') ||
    '#020617'

  const options = {
    backgroundColor: background,
    width,
    height,
    pixelRatio: scale,
    style: {
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.zoom})`,
    },
    // The moving dots would be frozen at the edge's start.
    filter: (element: HTMLElement) =>
      !(element instanceof Element && element.classList.contains('flow-dot')),
  }
  const diagram = await toCanvas(viewport, options)

  // A caption band at the bottom, so a shared image says where it came from.
  const band = 40 * scale
  const canvas = document.createElement('canvas')
  canvas.width = diagram.width
  canvas.height = diagram.height + band
  const context = canvas.getContext('2d')!
  context.fillStyle = background
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(diagram, 0, 0)
  context.fillStyle =
    getComputedStyle(document.body).getPropertyValue(
      '--datum-color-ink-muted',
    ) || '#94a3b8'
  context.font = `${13 * scale}px "IBM Plex Mono", monospace`
  context.textBaseline = 'middle'
  context.fillText(caption, 24 * scale, diagram.height + band / 2)
  return canvas.toDataURL('image/png')
}

export default function ArchitectureDiagram(props: ArchitectureDiagramProps) {
  return (
    <ReactFlowProvider>
      <Diagram {...props} />
    </ReactFlowProvider>
  )
}
