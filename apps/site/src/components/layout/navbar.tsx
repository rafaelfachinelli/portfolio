import {
  BookOpen,
  ChevronDown,
  Contact,
  ExternalLink,
  File,
  FlagTriangleRight,
  Github,
  Home,
  Info,
  Instagram,
  Linkedin,
  type LucideIcon,
  Presentation,
  Scroll,
  Wrench,
} from 'lucide-react'
import Link from 'next/link'

import type { ClientTranslation } from '@/contexts/LanguageContext'

import { LanguageSwitcher } from '../ui/language-switcher'
import { Logo } from '../ui/logo'
import { DesktopMenuGroup } from './desktop-menu-group'
import { MobileNav } from './mobile-nav'

type NavbarProps = Readonly<{
  lang: string
  translation: ClientTranslation
}>

type MenuItem = { href: string; title: string; description: string }

const ABOUT_ICONS: Record<string, LucideIcon> = {
  me: Info,
  resume: File,
  timeline: FlagTriangleRight,
  'personal-manifesto': Scroll,
}

const SOCIAL_LINKS = [
  {
    href: 'https://github.com/rafaelfachinelli',
    label: 'GitHub',
    icon: Github,
  },
  {
    href: 'https://www.linkedin.com/in/rafaelfachinelli/',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://www.instagram.com/rafaelfachinelli/',
    label: 'Instagram',
    icon: Instagram,
  },
]

const triggerClass =
  'inline-flex h-9 w-max cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:outline-none'

/** A desktop dropdown opened by hover or keyboard focus, in CSS only. */
function DesktopMenu({
  icon: Icon,
  title,
  items,
}: Readonly<{ icon: LucideIcon; title: string; items: MenuItem[] }>) {
  return (
    <DesktopMenuGroup>
      <button type="button" aria-haspopup="true" className={triggerClass}>
        <Icon className="text-season-accent mr-2 h-4 w-4" />
        {title}
        <ChevronDown className="ml-1 size-3 transition-transform group-focus-within/menu:rotate-180 group-hover/menu:rotate-180 group-data-closed/menu:rotate-0! motion-reduce:transition-none" />
      </button>
      <div className="invisible absolute top-full left-0 z-50 pt-1.5 opacity-0 transition-opacity group-focus-within/menu:visible group-focus-within/menu:opacity-100 group-hover/menu:visible group-hover/menu:opacity-100 group-data-closed/menu:invisible! group-data-closed/menu:opacity-0! motion-reduce:transition-none">
        <ul className="bg-popover text-popover-foreground grid w-[500px] gap-3 rounded-md border p-4 shadow-md md:grid-cols-2 lg:w-[600px]">
          {items.map(item => (
            <li key={item.href}>
              <Link
                prefetch={false}
                href={item.href}
                className="hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
              >
                <div className="text-sm leading-none font-medium">
                  {item.title}
                </div>
                <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </DesktopMenuGroup>
  )
}

const drawerLinkClass =
  'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-2 rounded-md px-2 py-2 text-sm [&>svg]:size-4 [&>svg]:shrink-0'

function DrawerGroup({
  label,
  children,
}: Readonly<{ label?: string; children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-1 p-2">
      {label && (
        <p className="text-sidebar-foreground/70 px-2 text-xs font-medium">
          {label}
        </p>
      )}
      <ul className="flex flex-col gap-1">{children}</ul>
    </div>
  )
}

// Server component. Every link here has prefetch off: the menus sit in the
// HTML (hidden), and prefetching all their routes would download the code of
// every page on first load. Pages still load quickly on click (static HTML).
export function Navbar({ lang, translation }: NavbarProps) {
  const options = translation.components.navbar.options
  const aboutItems: MenuItem[] = Object.entries(options.about.items).map(
    ([key, item]) => ({ href: `/${lang}/about/${key}`, ...item }),
  )

  return (
    <div className="bg-board/95 border-line-strong sticky top-0 z-50 flex w-full items-center justify-center border-b px-4 py-2">
      <div className="flex w-full max-w-[1024px] items-center justify-center">
        <MobileNav
          openLabel={translation.components.navbar.menu.open}
          closeLabel={translation.components.navbar.menu.close}
        >
          <div className="flex justify-center p-3">
            <Link prefetch={false} href={`/${lang}`}>
              <Logo size={40} />
            </Link>
          </div>
          <DrawerGroup>
            <li>
              <Link
                prefetch={false}
                href={`/${lang}`}
                className={drawerLinkClass}
              >
                <Home className="text-season-accent" />
                {options.home.title}
              </Link>
            </li>
          </DrawerGroup>
          <DrawerGroup label={options.about.title}>
            {aboutItems.map(item => {
              const Icon = ABOUT_ICONS[item.href.split('/').pop() ?? ''] ?? Info
              return (
                <li key={item.href}>
                  <Link
                    prefetch={false}
                    href={item.href}
                    className={drawerLinkClass}
                  >
                    <Icon className="text-season-accent" />
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </DrawerGroup>
          <DrawerGroup>
            <li>
              <Link
                prefetch={false}
                href={`/${lang}/projects`}
                className={drawerLinkClass}
              >
                <Presentation className="text-season-accent" />
                {options.projects.title}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                href={`/${lang}/articles`}
                className={drawerLinkClass}
              >
                <BookOpen className="text-season-accent" />
                {options.articles.title}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                href={`/${lang}/tools`}
                className={drawerLinkClass}
              >
                <Wrench className="text-season-accent" />
                {options.tools.title}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                href={`/${lang}/contact`}
                className={drawerLinkClass}
              >
                <Contact className="text-season-accent" />
                {options.contact.title}
              </Link>
            </li>
          </DrawerGroup>
          <div className="mt-auto">
            <DrawerGroup>
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={drawerLinkClass}
                  >
                    <Icon />
                    {label}
                    <ExternalLink className="ml-auto" />
                  </a>
                </li>
              ))}
            </DrawerGroup>
          </div>
        </MobileNav>

        <div className="flex w-full items-center justify-center md:w-fit md:justify-start">
          <Link
            prefetch={false}
            href={`/${lang}`}
            className="flex items-center justify-center"
          >
            <Logo size={40} className="md:mr-8" />
          </Link>
        </div>

        <nav aria-label="Main" className="hidden md:flex">
          <ul className="flex items-center gap-1">
            <li>
              <Link prefetch={false} href={`/${lang}`} className={triggerClass}>
                <Home className="text-season-accent mr-2 h-4 w-4" />
                {options.home.title}
              </Link>
            </li>
            <DesktopMenu
              icon={Info}
              title={options.about.title}
              items={aboutItems}
            />
            <li>
              <Link
                prefetch={false}
                href={`/${lang}/projects`}
                className={triggerClass}
              >
                <Presentation className="text-season-accent mr-2 h-4 w-4" />
                {options.projects.title}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                href={`/${lang}/articles`}
                className={triggerClass}
              >
                <BookOpen className="text-season-accent mr-2 h-4 w-4" />
                {options.articles.title}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                href={`/${lang}/tools`}
                className={triggerClass}
              >
                <Wrench className="text-season-accent mr-2 h-4 w-4" />
                {options.tools.title}
              </Link>
            </li>
            <li>
              <Link
                prefetch={false}
                href={`/${lang}/contact`}
                className={triggerClass}
              >
                <Contact className="text-season-accent mr-2 h-4 w-4" />
                {options.contact.title}
              </Link>
            </li>
          </ul>
        </nav>

        <LanguageSwitcher className="mr-2 ml-auto flex" />
      </div>
    </div>
  )
}
