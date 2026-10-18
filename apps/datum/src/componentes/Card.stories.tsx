import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@datum/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, Download } from 'lucide-react'

const meta = {
  title: 'Componentes/Card',
  component: Card,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: args => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>Pirâmide de testes na prática</CardTitle>
        <CardDescription>Artigo · 6 min de leitura</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-ink-muted text-sm">
          Como dividir testes de unidade, integração e ponta a ponta sem
          transformar a esteira num gargalo.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Ler artigo
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const WithAction: Story = {
  render: args => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>Currículo</CardTitle>
        <CardDescription>
          PDF gerado na hora, com a experiência mais recente.
        </CardDescription>
        <CardAction>
          <Badge variant="neutral">PDF</Badge>
        </CardAction>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">
          <Download />
          Baixar currículo
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const ContentOnly: Story = {
  render: args => (
    <Card {...args} className="max-w-sm">
      <CardContent>
        <p className="font-display text-3xl font-bold">40+</p>
        <p className="text-ink-muted text-sm">
          microsserviços no ecossistema liderado
        </p>
      </CardContent>
    </Card>
  ),
}

export const Grid: Story = {
  render: args => (
    <div className="grid gap-4 sm:grid-cols-3">
      {['Front-end', 'Back-end', 'Liderança'].map(title => (
        <Card key={title} {...args}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              Cards em grade mantêm a mesma altura.
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  ),
}
