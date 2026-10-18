'use client'

import {
  Contact,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Send,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import type { Translation } from '../../../../get-translation'

const MIN_NAME_LENGTH = 2
const MIN_MESSAGE_LENGTH = 5
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CONTACT_EMAIL = 'rafael.l.a.fachinelli@gmail.com'

export function ContactPageContent({
  text,
}: Readonly<{ text: Translation['pages']['contact'] }>) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '',
  })
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target
    setStatus('idle')
    setFormData(prev => ({
      ...prev,
      [id]: value.trimStart(),
    }))
  }

  const isNameValid = formData.name.trim().length >= MIN_NAME_LENGTH
  const isEmailFilled = formData.email.trim().length > 0
  const isEmailValid = EMAIL_REGEX.test(formData.email.trim())
  const isMessageValid = formData.message.trim().length >= MIN_MESSAGE_LENGTH

  const isFormValid =
    isNameValid && isEmailValid && isMessageValid && status !== 'sending'

  const getValidationMessage = () => {
    if (!isNameValid) {
      return text.form.validation.name
    }

    if (!isEmailFilled) {
      return text.form.validation.email
    }

    if (!isEmailValid) {
      return text.form.validation.emailInvalid
    }

    if (!isMessageValid) {
      return text.form.validation.message
    }

    return text.form.validation.send
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) return

    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Request failed')

      setFormData({ name: '', email: '', message: '', website: '' })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageTitle
        icon={Contact}
        title={text.title}
        description={text.description}
      />

      <PageContent className="gap-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{text.info.title}</CardTitle>
                <CardDescription>{text.info.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link
                  href="https://www.google.com.br/maps/place/Ferraz+de+Vasconcelos,+SP,+08529-030/@-23.5499237,-46.3841998,3985m/data=!3m2!1e3!4b1!4m6!3m5!1s0x94ce6539afdaa161:0x2abc8a866e2ff2e0!8m2!3d-23.5499441!4d-46.3739001!16s%2Fg%2F11c5s9sy0q?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Location of Rafael Fachinelli"
                  className="flex items-center gap-2 transition-colors duration-200 hover:text-red-500"
                >
                  <MapPin className="h-5 w-5 text-red-500" />
                  Ferraz de Vasconcelos - SP, Brazil
                </Link>
                <Link
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2 transition-colors duration-200 hover:text-amber-500"
                >
                  <Mail className="h-5 w-5 text-amber-500" />
                  {CONTACT_EMAIL}
                </Link>
                <Link
                  href="https://www.linkedin.com/in/rafaelfachinelli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-season-accent flex items-center gap-2 transition-colors duration-200"
                >
                  <Linkedin className="text-season-accent h-5 w-5" />
                  linkedin.com/in/rafaelfachinelli
                </Link>
                <Link
                  href="https://github.com/rafaelfachinelli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground flex items-center gap-2 transition-colors duration-200"
                >
                  <Github className="text-foreground h-5 w-5" />
                  github.com/rafaelfachinelli
                </Link>
                <Link
                  href="https://www.instagram.com/rafaelfachinelli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors duration-200 hover:text-pink-500"
                  aria-label="Instagram profile of Rafael Fachinelli"
                  title="Rafael Fachinelli on Instagram"
                >
                  <Instagram className="h-5 w-5 text-pink-500" />
                  instagram.com/rafaelfachinelli
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{text.form.title}</CardTitle>
                <CardDescription>{text.form.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Honeypot field: hidden from users, filled only by bots */}
                  <input
                    id="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {text.form.fields.name.label}{' '}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder={text.form.fields.name.placeholder}
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {text.form.fields.email.label}{' '}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={text.form.fields.email.placeholder}
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {text.form.fields.message.label}{' '}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={text.form.fields.message.placeholder}
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      minLength={MIN_MESSAGE_LENGTH}
                    />
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={
                            isFormValid
                              ? 'cursor-pointer transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] motion-reduce:transition-none'
                              : 'cursor-not-allowed'
                          }
                        >
                          <Button
                            type="submit"
                            className="w-full cursor-pointer"
                            disabled={!isFormValid}
                          >
                            <Send className="mr-2 h-4 w-4" />
                            {status === 'sending'
                              ? text.form.sending
                              : text.form.submit}
                          </Button>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{getValidationMessage()}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div aria-live="polite" className="min-h-6 text-sm">
                    {status === 'success' && (
                      <p className="text-green-600 dark:text-green-400">
                        {text.form.success}
                      </p>
                    )}
                    {status === 'error' && (
                      <p className="text-red-600 dark:text-red-400">
                        {text.form.error}
                      </p>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContent>
    </>
  )
}
