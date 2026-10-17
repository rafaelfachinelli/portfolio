import React from 'react'
import { FaJava } from 'react-icons/fa6'
import {
  SiCss3,
  SiDart,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiPhp,
  SiPython,
  SiRuby,
  SiRust,
  SiTypescript,
} from 'react-icons/si'

export interface LanguageConfig {
  icon: React.ReactNode
  color: string
}

export const languageConfigs: Record<string, LanguageConfig> = {
  javascript: {
    icon: <SiJavascript className="text-yellow-400" size={14} />,
    color: 'text-yellow-400',
  },
  js: {
    icon: <SiJavascript className="text-yellow-400" size={14} />,
    color: 'text-yellow-400',
  },
  typescript: {
    icon: <SiTypescript className="text-blue-500" size={14} />,
    color: 'text-blue-500',
  },
  ts: {
    icon: <SiTypescript className="text-blue-500" size={14} />,
    color: 'text-blue-500',
  },
  html: {
    icon: <SiHtml5 className="text-orange-600" size={14} />,
    color: 'text-orange-600',
  },
  html5: {
    icon: <SiHtml5 className="text-orange-600" size={14} />,
    color: 'text-orange-600',
  },
  css: {
    icon: <SiCss3 className="text-blue-400" size={14} />,
    color: 'text-blue-400',
  },
  css3: {
    icon: <SiCss3 className="text-blue-400" size={14} />,
    color: 'text-blue-400',
  },
  java: {
    icon: <FaJava className="text-[#F89820]" size={14} />,
    color: 'text-[#F89820]',
  },
  python: {
    icon: <SiPython className="text-yellow-500" size={14} />,
    color: 'text-yellow-500',
  },
  php: {
    icon: <SiPhp className="text-indigo-500" size={14} />,
    color: 'text-indigo-500',
  },
  go: {
    icon: <SiGo className="text-cyan-500" size={14} />,
    color: 'text-cyan-500',
  },
  ruby: {
    icon: <SiRuby className="text-red-500" size={14} />,
    color: 'text-red-500',
  },
  kotlin: {
    icon: <SiKotlin className="text-purple-400" size={14} />,
    color: 'text-purple-400',
  },
  dart: {
    icon: <SiDart className="text-cyan-700" size={14} />,
    color: 'text-cyan-700',
  },
  rust: {
    icon: <SiRust className="text-orange-800" size={14} />,
    color: 'text-orange-800',
  },
}

export const getLanguageConfig = (
  lang?: string | null,
): LanguageConfig | null => {
  if (!lang) return null
  const key = lang.toLowerCase().replace(/\s/g, '')
  return languageConfigs[key] || null
}
