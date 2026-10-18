import {
  Button,
  Field,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@datum/ui'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Send } from 'lucide-react'
import { type FormEvent, useState } from 'react'

const meta = {
  title: 'Componentes/Field',
  component: Field,
  args: { label: 'E-mail', children: null },
  argTypes: {
    label: { description: 'O nome do campo, acima do controle.' },
    hint: {
      description:
        'Texto de ajuda abaixo do controle. Some enquanto houver erro.',
      control: 'text',
    },
    error: {
      description: 'Mensagem de erro. Marca o controle como inválido.',
      control: 'text',
    },
    required: {
      description: 'Marca o controle como obrigatório e mostra o asterisco.',
      control: 'boolean',
    },
    disabled: {
      description: 'Desabilita o controle e esmaece o rótulo.',
      control: 'boolean',
    },
    id: { description: 'O `id` do controle; gerado quando omitido.' },
    children: {
      description: 'Um controle: Input, Textarea ou Select.',
      control: false,
    },
  },
  decorators: [Story => <div className="max-w-sm">{Story()}</div>],
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { hint: 'Respondo em até dois dias úteis.' },
  render: args => (
    <Field {...args}>
      <Input type="email" placeholder="voce@exemplo.com" />
    </Field>
  ),
}

export const Required: Story = {
  render: () => (
    <Field label="Nome" required>
      <Input placeholder="Seu nome" />
    </Field>
  ),
}

export const WithError: Story = {
  render: () => (
    <Field
      label="E-mail"
      required
      error="Informe um e-mail válido, como voce@exemplo.com."
    >
      <Input type="email" defaultValue="rafael@" />
    </Field>
  ),
}

export const WithTextarea: Story = {
  render: () => (
    <Field label="Mensagem" hint="Até 1.000 caracteres.">
      <Textarea maxLength={1000} placeholder="Conte um pouco sobre o projeto" />
    </Field>
  ),
}

export const WithSelect: Story = {
  render: () => (
    <Field label="Assunto" required>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Escolha um assunto" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="job">Vaga</SelectItem>
          <SelectItem value="project">Projeto</SelectItem>
          <SelectItem value="talk">Palestra</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Field label="Empresa" disabled hint="Preenchido pelo convite.">
      <Input defaultValue="Kruzer" />
    </Field>
  ),
}

type Errors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>

function ContactFormExample() {
  const [errors, setErrors] = useState<Errors>({})
  const [subject, setSubject] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const next: Errors = {}
    if (String(data.get('name')).trim().length < 2)
      next.name = 'Informe o seu nome.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get('email')))) {
      next.email = 'Informe um e-mail válido, como voce@exemplo.com.'
    }
    if (!subject) next.subject = 'Escolha um assunto.'
    if (String(data.get('message')).trim().length < 10) {
      next.message = 'Escreva pelo menos 10 caracteres.'
    }
    setErrors(next)
    setSent(Object.keys(next).length === 0)
  }

  return (
    <form noValidate onSubmit={submit} className="grid gap-5">
      <Field label="Nome" required error={errors.name}>
        <Input name="name" autoComplete="name" />
      </Field>
      <Field
        label="E-mail"
        required
        error={errors.email}
        hint="Só para responder você."
      >
        <Input name="email" type="email" autoComplete="email" />
      </Field>
      <Field label="Assunto" required error={errors.subject}>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger>
            <SelectValue placeholder="Escolha um assunto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="job">Vaga</SelectItem>
            <SelectItem value="project">Projeto</SelectItem>
            <SelectItem value="talk">Palestra</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Mensagem" required error={errors.message}>
        <Textarea name="message" rows={4} />
      </Field>
      <Button type="submit">
        <Send />
        Enviar
      </Button>
      <p aria-live="polite" className="text-success min-h-5 text-sm">
        {sent && 'Tudo certo: a mensagem seria enviada.'}
      </p>
    </form>
  )
}

export const Form: Story = {
  render: () => <ContactFormExample />,
}
