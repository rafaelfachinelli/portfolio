import { Button } from '@datum/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, Download, Plus } from 'lucide-react'

const meta = {
  title: 'Componentes/Button',
  component: Button,
  args: { children: 'Baixar currículo' },
  argTypes: {
    variant: {
      description: 'Peso visual da ação.',
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'danger'],
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      description:
        'Altura e espaçamento. `icon` é quadrado, para botões só com ícone.',
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      table: { defaultValue: { summary: 'md' } },
    },
    loading: {
      description:
        'Mostra o indicador, bloqueia cliques e marca `aria-busy`.',
      control: 'boolean',
    },
    disabled: { description: 'Desabilita o botão.', control: 'boolean' },
    asChild: {
      description: 'Aplica o visual ao elemento filho (por exemplo um link).',
    },
    children: { description: 'O texto e, se houver, o ícone.' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Variants: Story = {
  render: args => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
      <Button {...args} variant="danger">
        Danger
      </Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: args => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="icon" aria-label="Adicionar">
        <Plus />
      </Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: args => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args}>
        <Download />
        Baixar currículo
      </Button>
      <Button {...args} variant="outline">
        Ver projetos
        <ArrowRight />
      </Button>
    </div>
  ),
}

export const Loading: Story = {
  args: { loading: true, children: 'Enviando' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const AsLink: Story = {
  render: args => (
    <Button {...args} asChild variant="outline">
      <a href="https://rafaelfachinelli.com">Abrir o portfólio</a>
    </Button>
  ),
}
