import { Label, RadioCard, RadioGroup, RadioGroupItem } from '@datum/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Building2, Globe, MapPin } from 'lucide-react'

const meta = {
  title: 'Componentes/RadioGroup',
  component: RadioGroup,
  args: { defaultValue: 'mensal' },
  argTypes: {
    defaultValue: {
      description: 'Opção escolhida no início (sem controlar o estado).',
    },
    value: {
      description: 'Opção escolhida, quando o estado é controlado.',
    },
    onValueChange: {
      description: 'Chamado com o valor da opção escolhida.',
    },
    orientation: {
      description:
        'Direção das setas do teclado. Não muda o layout, que vem do `className`.',
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
    },
    disabled: {
      description: 'Desabilita todas as opções.',
      control: 'boolean',
    },
    'aria-labelledby': {
      description: 'Id do título visível que nomeia o grupo.',
    },
  },
  decorators: [Story => <div className="max-w-md">{Story()}</div>],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => (
    <div className="grid gap-3">
      <p id="radio-default-title" className="text-sm font-medium">
        Frequência do relatório
      </p>
      <RadioGroup aria-labelledby="radio-default-title" {...args}>
        {[
          ['diario', 'Diário'],
          ['semanal', 'Semanal'],
          ['mensal', 'Mensal'],
        ].map(([value, label]) => (
          <div key={value} className="flex items-center gap-2">
            <RadioGroupItem value={value} id={`radio-default-${value}`} />
            <Label htmlFor={`radio-default-${value}`}>{label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  ),
}

export const Cards: Story = {
  args: { defaultValue: 'equilibrado' },
  render: args => (
    <div className="grid gap-3">
      <p id="radio-cards-title" className="text-sm font-medium">
        A aplicação mais lê ou mais escreve dados?
      </p>
      <RadioGroup aria-labelledby="radio-cards-title" {...args}>
        <RadioCard
          value="leitura"
          title="Mais leitura"
          description="Catálogos, blogs, painéis: muita gente vendo os mesmos dados."
        />
        <RadioCard
          value="equilibrado"
          title="Equilibrado"
          description="Sistemas de gestão, SaaS: lê e grava na mesma medida."
        />
        <RadioCard
          value="escrita"
          title="Mais escrita"
          description="Telemetria, logs, eventos: chega mais dado do que é lido."
        />
      </RadioGroup>
    </div>
  ),
}

export const CardsWithIcons: Story = {
  args: { defaultValue: 'pais' },
  render: args => (
    <div className="grid gap-3">
      <p id="radio-icons-title" className="text-sm font-medium">
        Onde estão os usuários?
      </p>
      <RadioGroup aria-labelledby="radio-icons-title" {...args}>
        <RadioCard
          value="cidade"
          icon={<MapPin />}
          title="Uma cidade ou região"
        />
        <RadioCard value="pais" icon={<Building2 />} title="Um país" />
        <RadioCard value="mundo" icon={<Globe />} title="Vários países" />
      </RadioGroup>
    </div>
  ),
}

export const Grid: Story = {
  args: { defaultValue: '1k', orientation: 'horizontal' },
  decorators: [Story => <div className="max-w-xl">{Story()}</div>],
  render: args => (
    <div className="grid gap-3">
      <p id="radio-grid-title" className="text-sm font-medium">
        Pessoas usando ao mesmo tempo, no pico
      </p>
      <RadioGroup
        aria-labelledby="radio-grid-title"
        className="grid-cols-2 sm:grid-cols-3"
        {...args}
      >
        <RadioCard value="100" title="Até 100" />
        <RadioCard value="1k" title="Até 1 mil" />
        <RadioCard value="10k" title="Até 10 mil" />
        <RadioCard value="100k" title="Até 100 mil" />
        <RadioCard value="mais" title="Mais de 100 mil" />
      </RadioGroup>
    </div>
  ),
}

export const DisabledOption: Story = {
  args: { defaultValue: 'mensal' },
  render: args => (
    <div className="grid gap-3">
      <p id="radio-disabled-title" className="text-sm font-medium">
        Plano
      </p>
      <RadioGroup aria-labelledby="radio-disabled-title" {...args}>
        <RadioCard value="mensal" title="Mensal" description="R$ 29 por mês" />
        <RadioCard
          value="anual"
          title="Anual"
          description="Disponível a partir de janeiro"
          disabled
        />
      </RadioGroup>
    </div>
  ),
}
