import { addons } from 'storybook/manager-api'

import { datumTheme } from './theme'

// Story titles stay ASCII so the generated ids (and URLs) are stable; the
// sidebar shows the Portuguese labels with accents.
const LABELS: Record<string, string> = {
  Introducao: 'Introdução',
  Principios: 'Princípios',
  'Espaco e forma': 'Espaço e forma',
}

addons.setConfig({
  theme: datumTheme,
  sidebar: {
    showRoots: true,
    renderLabel: item => LABELS[item.name] ?? item.name,
  },
})
