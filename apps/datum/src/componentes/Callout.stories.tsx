import { Callout, CalloutContent, CalloutTitle } from '@datum/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  CircleAlert,
  CircleCheck,
  Info,
  Lightbulb,
  Sparkles,
  TriangleAlert,
} from 'lucide-react'

const meta = {
  title: 'Componentes/Callout',
  component: Callout,
  argTypes: {
    tone: {
      description: 'O tom da caixa: cor da faixa, do fundo e do ícone.',
      control: 'select',
      options: ['accent', 'neutral', 'success', 'warning', 'danger'],
      table: { defaultValue: { summary: 'accent' } },
    },
    icon: {
      description: 'Um ícone ao lado do conteúdo (decorativo).',
      control: false,
    },
  },
  decorators: [Story => <div className="max-w-xl">{Story()}</div>],
} satisfies Meta<typeof Callout>

export default meta
type Story = StoryObj<typeof meta>

export const Summary: Story = {
  args: { tone: 'accent', icon: <Sparkles /> },
  render: args => (
    <Callout {...args}>
      <CalloutTitle>Resumo</CalloutTitle>
      <CalloutContent>
        <ul>
          <li>
            A maior parte dos testes deve ser de unidade: rápidos e baratos.
          </li>
          <li>Testes de integração cobrem as fronteiras entre módulos.</li>
          <li>Poucos testes de ponta a ponta, nos fluxos que mais importam.</li>
        </ul>
      </CalloutContent>
    </Callout>
  ),
}

export const Tones: Story = {
  render: () => (
    <div className="grid gap-3">
      <Callout tone="accent" icon={<Lightbulb />}>
        <CalloutTitle>Dica</CalloutTitle>
        <CalloutContent>
          Comece pelos testes de unidade do domínio.
        </CalloutContent>
      </Callout>
      <Callout tone="neutral" icon={<Info />}>
        <CalloutTitle>Nota</CalloutTitle>
        <CalloutContent>
          Os exemplos usam Jest, mas valem para qualquer framework.
        </CalloutContent>
      </Callout>
      <Callout tone="success" icon={<CircleCheck />}>
        <CalloutTitle>Mensagem enviada</CalloutTitle>
        <CalloutContent>Respondo em até dois dias úteis.</CalloutContent>
      </Callout>
      <Callout tone="warning" icon={<TriangleAlert />}>
        <CalloutTitle>Atenção</CalloutTitle>
        <CalloutContent>
          Os valores usam a tabela do INSS de 2026.
        </CalloutContent>
      </Callout>
      <Callout tone="danger" icon={<CircleAlert />}>
        <CalloutTitle>Não foi possível enviar</CalloutTitle>
        <CalloutContent>Tente de novo em alguns minutos.</CalloutContent>
      </Callout>
    </div>
  ),
}

export const WithoutIcon: Story = {
  args: { tone: 'neutral' },
  render: args => (
    <Callout {...args}>
      <CalloutTitle>Sem ícone</CalloutTitle>
      <CalloutContent>O conteúdo ocupa toda a largura.</CalloutContent>
    </Callout>
  ),
}

export const ContentOnly: Story = {
  args: { tone: 'accent', icon: <Info /> },
  render: args => (
    <Callout {...args}>
      <CalloutContent>
        Uma frase curta, sem título. Veja também o artigo sobre{' '}
        <a href="https://rafaelfachinelli.com/pt-BR/articles">
          arquitetura de testes
        </a>
        .
      </CalloutContent>
    </Callout>
  ),
}

export const NumberedList: Story = {
  args: { tone: 'neutral', icon: <Lightbulb /> },
  render: args => (
    <Callout {...args}>
      <CalloutTitle asChild>
        <h2>Lições</h2>
      </CalloutTitle>
      <CalloutContent>
        <ol>
          <li>Testes rápidos rodam a cada mudança.</li>
          <li>Testes lentos rodam antes do deploy.</li>
          <li>Teste quebrado se conserta antes de seguir.</li>
        </ol>
      </CalloutContent>
    </Callout>
  ),
}
