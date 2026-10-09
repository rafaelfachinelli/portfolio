'use client'

import { Check, Link2, Share2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaLinkedinIn, FaWhatsapp, FaXTwitter } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/LanguageContext'

type ShareButtonsProps = {
  url: string
  title: string
}

export function ShareButtons({ url, title }: Readonly<ShareButtonsProps>) {
  const { translation } = useLanguage()
  const text = translation.pages.articles
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share)
  }, [])

  const encodedUrl = encodeURIComponent(url)
  const encodedMessage = encodeURIComponent(`${text.shareText} ${title}`)

  const links = [
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <FaLinkedinIn className="h-4 w-4" />,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`,
      icon: <FaWhatsapp className="h-4 w-4" />,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`,
      icon: <FaXTwitter className="h-4 w-4" />,
    },
  ]

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Clipboard unavailable (e.g. insecure context): nothing to do.
    }
  }

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url })
    } catch {
      // User cancelled the share sheet.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-medium text-gray-600 dark:text-gray-300">
        {text.shareTitle}
      </span>

      {canNativeShare && (
        <Button type="button" size="sm" onClick={nativeShare}>
          <Share2 className="mr-2 h-4 w-4" />
          {text.shareNative}
        </Button>
      )}

      {links.map(link => (
        <Button key={link.label} asChild size="sm" variant="outline">
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${text.shareNative}: ${link.label}`}
          >
            {link.icon}
            <span className="ml-2">{link.label}</span>
          </a>
        </Button>
      ))}

      <Button type="button" size="sm" variant="outline" onClick={copyLink}>
        {copied ? (
          <Check className="mr-2 h-4 w-4 text-green-500" />
        ) : (
          <Link2 className="mr-2 h-4 w-4" />
        )}
        <span aria-live="polite">{copied ? text.copied : text.copyLink}</span>
      </Button>
    </div>
  )
}
