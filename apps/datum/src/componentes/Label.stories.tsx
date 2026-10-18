import { Label } from '@datum/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Componentes/Label',
  component: Label,
  args: { children: 'E-mail' },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

// Until the Input arrives in Datum, a plain styled input stands in for it.
const inputClass =
  'peer h-9 w-full rounded-[var(--datum-radius-md)] border border-line-strong bg-transparent px-3 text-sm text-ink placeholder:text-ink-subtle disabled:opacity-50'

export const WithInput: Story = {
  render: args => (
    <div className="grid max-w-sm gap-2">
      <Label {...args} htmlFor="email" />
      <input
        id="email"
        type="email"
        placeholder="voce@exemplo.com"
        className={inputClass}
      />
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
      <input id="name" required aria-required="true" className={inputClass} />
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
      <input
        id="company"
        disabled
        placeholder="Indisponível"
        className={inputClass}
      />
      <Label {...args} htmlFor="company">
        Empresa
      </Label>
    </div>
  ),
}
