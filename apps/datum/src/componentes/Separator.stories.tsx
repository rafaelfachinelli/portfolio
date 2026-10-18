import { Separator } from '@datum/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Componentes/Separator',
  component: Separator,
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: args => (
    <div className="text-ink max-w-md">
      <p className="font-display text-lg font-semibold">Experiência</p>
      <p className="text-ink-muted text-sm">Tech Lead · Kruzer</p>
      <Separator {...args} className="my-4" />
      <p className="font-display text-lg font-semibold">Formação</p>
      <p className="text-ink-muted text-sm">
        Análise e Desenvolvimento de Sistemas · FATEC
      </p>
    </div>
  ),
}

export const Vertical: Story = {
  render: args => (
    <div className="text-ink flex h-5 items-center gap-4 text-sm">
      <span>Artigos</span>
      <Separator {...args} orientation="vertical" />
      <span>Projetos</span>
      <Separator {...args} orientation="vertical" />
      <span>Contato</span>
    </div>
  ),
}

export const Semantic: Story = {
  args: { decorative: false },
  render: args => (
    <div className="text-ink max-w-md text-sm">
      <p>Seção sobre o projeto.</p>
      <Separator {...args} className="my-4" />
      <p>Seção sobre os resultados.</p>
    </div>
  ),
}
