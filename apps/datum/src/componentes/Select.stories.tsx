import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@datum/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Componentes/Select',
  component: Select,
  decorators: [Story => <div className="max-w-xs">{Story()}</div>],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const years = ['2026', '2025', '2024', '2023', '2022', '2021']

export const Default: Story = {
  render: args => (
    <div className="grid gap-2">
      <Label htmlFor="select-year">Ano</Label>
      <Select {...args}>
        <SelectTrigger id="select-year">
          <SelectValue placeholder="Todos os anos" />
        </SelectTrigger>
        <SelectContent>
          {years.map(year => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
}

export const Open: Story = {
  args: { defaultOpen: true, defaultValue: '2025' },
  render: args => (
    <div className="grid h-72 content-start gap-2">
      <Label htmlFor="select-open">Ano</Label>
      <Select {...args}>
        <SelectTrigger id="select-open">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {years.map(year => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
}

export const Groups: Story = {
  render: args => (
    <div className="grid gap-2">
      <Label htmlFor="select-stack">Tecnologia</Label>
      <Select {...args}>
        <SelectTrigger id="select-stack">
          <SelectValue placeholder="Escolha uma tecnologia" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Front-end</SelectLabel>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="next">Next.js</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Back-end</SelectLabel>
            <SelectItem value="spring">Spring Boot</SelectItem>
            <SelectItem value="node">Node.js</SelectItem>
            <SelectItem value="go" disabled>
              Go (em breve)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const Small: Story = {
  render: args => (
    <div className="grid gap-2">
      <Label htmlFor="select-small">Ordenar por</Label>
      <Select {...args} defaultValue="recent">
        <SelectTrigger id="select-small" size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Mais recentes</SelectItem>
          <SelectItem value="name">Nome</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const Invalid: Story = {
  render: args => (
    <div className="grid gap-2">
      <Label htmlFor="select-invalid">Assunto</Label>
      <Select {...args}>
        <SelectTrigger id="select-invalid" aria-invalid>
          <SelectValue placeholder="Escolha um assunto" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="job">Vaga</SelectItem>
          <SelectItem value="project">Projeto</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
  render: args => (
    <div className="grid gap-2">
      <Label htmlFor="select-disabled">Idioma</Label>
      <Select {...args} defaultValue="pt">
        <SelectTrigger id="select-disabled">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pt">Português</SelectItem>
          <SelectItem value="en">English</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}
