import { Input, Label } from '@datum/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Componentes/Input',
  component: Input,
  args: { placeholder: 'voce@exemplo.com', type: 'email' },
  argTypes: {
    type: {
      description: 'O tipo do campo; muda o teclado no celular e a validação.',
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url', 'number'],
      table: { defaultValue: { summary: 'text' } },
    },
    placeholder: {
      description: 'Exemplo do formato esperado. Não substitui o rótulo.',
    },
    disabled: { description: 'Desabilita o campo.', control: 'boolean' },
    'aria-invalid': {
      description:
        'Marca o valor como inválido (borda de erro). Dentro de um Field, vem do `error`.',
      control: 'boolean',
    },
  },
  decorators: [Story => <div className="max-w-sm">{Story()}</div>],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <div className="grid gap-2">
      <Label htmlFor="input-default">E-mail</Label>
      <Input id="input-default" {...args} />
    </div>
  ),
}

export const Types: Story = {
  render: () => (
    <div className="grid gap-4">
      {(
        [
          ['text', 'Nome', 'Rafael Fachinelli'],
          ['email', 'E-mail', 'voce@exemplo.com'],
          ['password', 'Senha', ''],
          ['search', 'Buscar', 'Buscar artigos'],
          ['tel', 'Telefone', '(11) 99999-9999'],
          ['url', 'Site', 'https://'],
        ] as const
      ).map(([type, label, placeholder]) => (
        <div key={type} className="grid gap-2">
          <Label htmlFor={`input-${type}`}>{label}</Label>
          <Input id={`input-${type}`} type={type} placeholder={placeholder} />
        </div>
      ))}
    </div>
  ),
}

export const Filled: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="input-filled">Nome</Label>
      <Input id="input-filled" defaultValue="Rafael Fachinelli" />
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="input-invalid">E-mail</Label>
      <Input
        id="input-invalid"
        type="email"
        defaultValue="rafael@"
        aria-invalid
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="input-disabled">Empresa</Label>
      <Input id="input-disabled" disabled defaultValue="Kruzer" />
    </div>
  ),
}

export const File: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="input-file">Anexo</Label>
      <Input id="input-file" type="file" />
    </div>
  ),
}
