import { Input, Label } from '@datum/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Componentes/Label',
  component: Label,
  args: { children: 'E-mail' },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const WithInput: Story = {
  render: args => (
    <div className="grid max-w-sm gap-2">
      <Label {...args} htmlFor="email" />
      <Input id="email" type="email" placeholder="voce@exemplo.com" />
    </div>
  ),
}

export const Required: Story = {
  render: args => (
    <div className="grid max-w-sm gap-2">
      <Label {...args} htmlFor="name">
        Nome
        <span aria-hidden="true" className="text-danger">
          *
        </span>
      </Label>
      <Input id="name" required />
    </div>
  ),
}

export const WithCheckbox: Story = {
  render: args => (
    <div className="flex items-center gap-2">
      <input
        id="news"
        type="checkbox"
        className="accent-season-accent size-4"
      />
      <Label {...args} htmlFor="news">
        Quero receber os novos artigos
      </Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: args => (
    <div className="flex max-w-sm flex-col-reverse gap-2">
      <Input
        id="company"
        disabled
        placeholder="Indisponível"
        className="peer"
      />
      <Label {...args} htmlFor="company">
        Empresa
      </Label>
    </div>
  ),
}
