'use client'

import { motion } from 'framer-motion'
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
import { useLanguage } from '@/contexts/LanguageContext'

const MIN_NAME_LENGTH = 2
const MIN_MESSAGE_LENGTH = 5
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CONTACT_EMAIL = 'rafael.l.a.fachinelli@gmail.com'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function ContactPageContent() {
  const { translation } = useLanguage()
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
      return translation.pages.contact.form.validation.name
    }

    if (!isEmailFilled) {
      return translation.pages.contact.form.validation.email
    }

    if (!isEmailValid) {
      return translation.pages.contact.form.validation.emailInvalid
    }

    if (!isMessageValid) {
      return translation.pages.contact.form.validation.message
    }

    return translation.pages.contact.form.validation.send
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
        title={translation.pages.contact.title}
        description={translation.pages.contact.description}
      />

      <PageContent className="gap-8">
        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{translation.pages.contact.info.title}</CardTitle>
                <CardDescription>
                  {translation.pages.contact.info.description}
                </CardDescription>
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
                  className="flex items-center gap-2 transition-colors duration-200 hover:text-blue-500"
                >
                  <Linkedin className="h-5 w-5 text-blue-500" />
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
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{translation.pages.contact.form.title}</CardTitle>
                <CardDescription>
                  {translation.pages.contact.form.description}
                </CardDescription>
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
                  <motion.div
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Label htmlFor="name">
                      {translation.pages.contact.form.fields.name.label}{' '}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder={
                        translation.pages.contact.form.fields.name.placeholder
                      }
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      aria-required="true"
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Label htmlFor="email">
                      {translation.pages.contact.form.fields.email.label}{' '}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={
                        translation.pages.contact.form.fields.email.placeholder
                      }
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Label htmlFor="message">
                      {translation.pages.contact.form.fields.message.label}{' '}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={
                        translation.pages.contact.form.fields.message
                          .placeholder
                      }
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      minLength={MIN_MESSAGE_LENGTH}
                    />
                  </motion.div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          className={`${
                            isFormValid
                              ? 'cursor-pointer'
                              : 'cursor-not-allowed'
                          }`}
                          whileHover={isFormValid ? { scale: 1.02 } : {}}
                          whileTap={isFormValid ? { scale: 0.98 } : {}}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <Button
                            type="submit"
                            className="w-full cursor-pointer"
                            disabled={!isFormValid}
                          >
                            <Send className="mr-2 h-4 w-4" />
                            {status === 'sending'
                              ? translation.pages.contact.form.sending
                              : translation.pages.contact.form.submit}
                          </Button>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>{getValidationMessage()}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div aria-live="polite" className="min-h-6 text-sm">
                    {status === 'success' && (
                      <p className="text-green-600 dark:text-green-400">
                        {translation.pages.contact.form.success}
                      </p>
                    )}
                    {status === 'error' && (
                      <p className="text-red-600 dark:text-red-400">
                        {translation.pages.contact.form.error}
                      </p>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </PageContent>
    </>
  )
}
