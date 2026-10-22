import '@datum/tokens/tokens.css'
import '../src/styles/components.css'
import '../src/styles/datum-docs.css'

import { getSeason, SEASON_IDS, SEASON_NAMES } from '@datum/tokens'
import type { Decorator, Preview } from '@storybook/react-vite'

import { datumTheme } from './theme'

// Applies the season from the toolbar (or today's season) to the document, so
// stories and docs pages show the same accent and logo as the live site.
const withSeason: Decorator = (Story, context) => {
  const chosen = context.globals.season as string | undefined
  const season = !chosen || chosen === 'auto' ? getSeason() : chosen
  document.documentElement.setAttribute('data-season', season)
  return <Story />
}

const preview: Preview = {
  decorators: [withSeason],
  globalTypes: {
    season: {
      description: 'Temporada do Datum',
      toolbar: {
        title: 'Temporada',
        icon: 'calendar',
        dynamicTitle: true,
        items: [
          { value: 'auto', title: 'Pela data de hoje' },
          ...SEASON_IDS.map(id => ({
            value: id,
            title: SEASON_NAMES[id]['pt-BR'],
          })),
        ],
      },
    },
  },
  initialGlobals: { season: 'auto' },
  parameters: {
    layout: 'padded',
    docs: { theme: datumTheme, toc: true },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          'Datum',
          ['Introducao', 'Principios', 'Novidades'],
          'Fundamentos',
          ['Cores', 'Tipografia', 'Espaco e forma', 'Temporadas'],
          'Componentes',
        ],
      },
    },
  },
}

export default preview
