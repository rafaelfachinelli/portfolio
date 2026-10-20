import { Badge } from '@datum/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Check, TriangleAlert, X } from 'lucide-react'

const meta = {
  title: 'Componentes/Badge',
  component: Badge,
  args: { children: 'Tech Lead' },
  argTypes: {
    variant: {
      description: 'Cor e peso do selo.',
      control: 'select',
      options: ['accent', 'neutral', 'outline', 'success', 'warning', 'danger'],
      table: { defaultValue: { summary: 'accent' } },
    },
    asChild: {
      // No control: with plain-text children, Slot has no element to style.
      description:
        'Aplica o visual ao elemento filho (por exemplo um link). Veja a história **As Link**.',
      control: false,
    },
    children: { description: 'O texto e, se houver, o ícone.' },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Accent: Story = {}

export const Variants: Story = {
  render: args => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args} variant="accent">
        Accent
      </Badge>
      <Badge {...args} variant="neutral">
        Neutral
      </Badge>
      <Badge {...args} variant="outline">
        Outline
      </Badge>
      <Badge {...args} variant="success">
        Success
      </Badge>
      <Badge {...args} variant="warning">
        Warning
      </Badge>
      <Badge {...args} variant="danger">
        Danger
      </Badge>
    </div>
  ),
}

export const WithIcon: Story = {
  render: args => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args} variant="success">
        <Check />
        Publicado
      </Badge>
      <Badge {...args} variant="warning">
        <TriangleAlert />
        Em revisão
      </Badge>
      <Badge {...args} variant="danger">
        <X />
        Arquivado
      </Badge>
    </div>
  ),
}

export const Tags: Story = {
  render: args => (
    <div className="flex flex-wrap items-center gap-2">
      {['React', 'Next.js', 'TypeScript', 'Java', 'Spring Boot', 'Kafka'].map(
        tag => (
          <Badge key={tag} {...args} variant="outline">
            {tag}
          </Badge>
        ),
      )}
    </div>
  ),
}

export const AsLink: Story = {
  render: args => (
    <Badge {...args} asChild variant="neutral">
      <a href="https://rafaelfachinelli.com/pt-BR/articles">Artigos</a>
    </Badge>
  ),
}
