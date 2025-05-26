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

const MIN_LENGTH = 5

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
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value.trimStart(),
    }))
  }

  const validateField = (value: string) => {
    const trimmed = value.trim()
    return trimmed.length >= MIN_LENGTH
  }

  const isFormValid =
    validateField(formData.name) &&
    validateField(formData.email) &&
    validateField(formData.message)

  const getValidationMessage = () => {
    if (!validateField(formData.name)) {
      return 'Name must be filled out.'
    }

    if (!validateField(formData.email)) {
      return 'Email must be filled out.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Please enter a valid email address.'
    }

    if (!validateField(formData.message)) {
      return 'Message must be at least 5 characters.'
    }

    return 'Click to send your message.'
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
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Feel free to reach out through any of these channels
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
                  href="mailto:rafaelfachinelli@gmail.com"
                  className="flex items-center gap-2 transition-colors duration-200 hover:text-amber-500"
                >
                  <Mail className="h-5 w-5 text-amber-500" />
                  rafael.fachinelli@hotmail.com
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
                <CardTitle>Send me a message</CardTitle>
                <CardDescription>
                  I&apos;ll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <motion.div
                    className="space-y-2"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Label htmlFor="name">
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
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
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
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
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Your message"
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      minLength={MIN_LENGTH}
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
                            Send Message
                          </Button>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>{getValidationMessage()}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </PageContent>
    </>
  )
}
