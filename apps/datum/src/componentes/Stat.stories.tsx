import { Card, CardContent, Stat } from '@datum/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Briefcase, Network, ShieldCheck, Users } from 'lucide-react'

const meta = {
  title: 'Componentes/Stat',
  component: Stat,
  args: {
    label: 'Microsserviços',
    value: '40+',
    description: 'no ecossistema que liderei tecnicamente',
  },
  argTypes: {
    label: { description: 'O que o número mede.' },
    value: {
      description:
        'O número, já formatado (por exemplo com `Intl.NumberFormat`).',
    },
    description: { description: 'Uma linha de contexto abaixo do número.' },
    icon: {
      description: 'Um ícone ao lado do rótulo (decorativo).',
      control: false,
    },
    trend: {
      description:
        'Variação em relação a uma referência: direção, valor, se é boa notícia (`positive`) e o texto para leitor de tela (`label`).',
    },
  },
} satisfies Meta<typeof Stat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = {
  args: { icon: <Network /> },
}

export const WithTrend: Story = {
  render: () => (
    <div className="flex flex-wrap gap-12">
      <Stat
        label="Cobertura de testes"
        value="82%"
        trend={{
          direction: 'up',
          value: '+82 pp',
          label: 'subiu 82 pontos percentuais',
        }}
        description="de 0% no início do projeto"
      />
      <Stat
        label="Incidentes por mês"
        value="0,3"
        trend={{
          direction: 'down',
          value: '−92%',
          positive: true,
          label: 'caiu 92%, uma melhora',
        }}
        description="queda é boa notícia aqui"
      />
      <Stat
        label="Tempo de build"
        value="14 min"
        trend={{
          direction: 'up',
          value: '+3 min',
          positive: false,
          label: 'subiu 3 minutos, uma piora',
        }}
        description="alta é má notícia aqui"
      />
    </div>
  ),
}

export const InCards: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {[
        {
          icon: <Briefcase />,
          label: 'Experiência',
          value: '5+ anos',
          description: 'em varejo e commerce',
        },
        {
          icon: <Network />,
          label: 'Microsserviços',
          value: '40+',
          description: 'no ecossistema liderado',
        },
        {
          icon: <Users />,
          label: 'Time',
          value: '10',
          description: 'pessoas entre dev, QA e produto',
        },
        {
          icon: <ShieldCheck />,
          label: 'Cobertura',
          value: '80%+',
          description: 'de testes automatizados',
        },
      ].map(stat => (
        <Card key={stat.label}>
          <CardContent>
            <Stat {...stat} />
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}

export const Row: Story = {
  render: () => (
    <div className="flex flex-wrap gap-x-12 gap-y-6">
      <Stat label="Artigos" value="3" />
      <Stat label="Projetos" value="49" />
      <Stat label="Temporadas" value="8" />
    </div>
  ),
}
