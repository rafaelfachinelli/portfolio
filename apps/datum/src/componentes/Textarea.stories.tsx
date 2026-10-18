import { Label, Textarea } from '@datum/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Componentes/Textarea',
  component: Textarea,
  args: { placeholder: 'Conte um pouco sobre o projeto' },
  argTypes: {
    placeholder: {
      description: 'Exemplo do conteúdo esperado. Não substitui o rótulo.',
    },
    rows: {
      description:
        'Altura inicial, em linhas. A pessoa pode aumentar arrastando.',
      control: 'number',
    },
    disabled: { description: 'Desabilita o campo.', control: 'boolean' },
    'aria-invalid': {
      description: 'Marca o valor como inválido.',
      control: 'boolean',
    },
  },
  decorators: [Story => <div className="max-w-md">{Story()}</div>],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <div className="grid gap-2">
      <Label htmlFor="textarea-default">Mensagem</Label>
      <Textarea id="textarea-default" {...args} />
    </div>
  ),
}

export const Filled: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="textarea-filled">Mensagem</Label>
      <Textarea
        id="textarea-filled"
        rows={5}
        defaultValue={
          'Olá, Rafael!\n\nVi o seu artigo sobre a pirâmide de testes e queria conversar sobre uma vaga de Tech Lead no nosso time.'
        }
      />
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="textarea-invalid">Mensagem</Label>
      <Textarea id="textarea-invalid" defaultValue="Oi" aria-invalid />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="textarea-disabled">Mensagem</Label>
      <Textarea id="textarea-disabled" disabled placeholder="Envio pausado" />
    </div>
  ),
}
