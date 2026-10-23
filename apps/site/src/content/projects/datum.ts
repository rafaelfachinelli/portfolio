import type { ArticleLocale } from '@/content/articles'

export const DATUM_STORYBOOK_URL = 'https://design.rafaelfachinelli.com'
export const DATUM_SOURCE_URL =
  'https://github.com/rafaelfachinelli/portfolio/tree/production/packages'
/** The article on how Datum was made; its button appears once it is published. */
export const DATUM_ARTICLE_SLUG = 'como-criei-o-datum-design-system'

type Item = { title: string; description: string }

export type DatumCopy = {
  meta: { title: string; description: string }
  name: string
  eyebrow: string
  lead: string
  actions: { storybook: string; source: string; article: string }
  numbers: {
    title: string
    components: Item
    stories: Item
    seasons: Item
    contrast: Item
    lcp: Item & { trend: string; trendLabel: string }
    performance: Item & { trend: string; trendLabel: string }
  }
  beforeAfter: {
    title: string
    lead: string
    before: { caption: string; alt: string }
    after: { caption: string; alt: string }
  }
  seasons: { title: string; lead: string; alt: string }
  inside: {
    title: string
    items: Item[]
    storybook: { caption: string; alt: string }
  }
  stack: { title: string }
  cta: { title: string; text: string }
}

export const DATUM_STACK = [
  'W3C DTCG',
  'Tailwind CSS 4',
  'Radix UI',
  'shadcn/ui',
  'React 19',
  'TypeScript',
  'Storybook 10',
  'Vitest',
]

export const datumCopy: Record<ArticleLocale, DatumCopy> = {
  'pt-BR': {
    meta: {
      title: 'Datum: o design system de Rafael Fachinelli',
      description:
        'Tokens no formato do W3C DTCG, 8 temporadas e 14 componentes React acessíveis: o design system que dá a mesma personalidade ao site e às ferramentas.',
    },
    name: 'Datum',
    eyebrow: 'Design system',
    lead: 'O design system deste site: tokens, temporadas e componentes que dão a mesma personalidade a tudo o que eu construo, do portfólio às ferramentas.',
    actions: {
      storybook: 'Abrir o Storybook',
      source: 'Ver o código',
      article: 'Ler como foi feito',
    },
    numbers: {
      title: 'Em números',
      components: {
        title: 'Componentes',
        description:
          'Primitivos e padrões gerais, com uma história por estado.',
      },
      stories: {
        title: 'Histórias no Storybook',
        description:
          'Cada uma passa pelo axe, a checagem automática de acessibilidade.',
      },
      seasons: {
        title: 'Temporadas',
        description: 'A cor de destaque muda com a data, do Carnaval ao Natal.',
      },
      contrast: {
        title: 'Contraste',
        description:
          'Em todo par de texto e fundo: os testes reprovam a build abaixo de 4,5:1.',
      },
      lcp: {
        title: 'Bloqueio da página (TBT)',
        description: 'Home no Lighthouse, perfil de celular.',
        trend: 'era 1.424 ms',
        trendLabel: 'caiu de 1.424 ms',
      },
      performance: {
        title: 'Performance no Lighthouse',
        description: 'Home, perfil de celular.',
        trend: 'era 54',
        trendLabel: 'subiu de 54',
      },
    },
    beforeAfter: {
      title: 'Antes e depois',
      lead: 'A mesma home, na mesma tela. Antes, componentes do shadcn sem nenhuma personalidade e um fundo de estrelas animado em JavaScript que travava o celular. Depois, a prancheta Blueprint, com a cor da temporada.',
      before: {
        caption: 'Antes do Datum, em 15 de outubro de 2026.',
        alt: 'A home antiga: fundo de espaço com estrelas e nuvens, botões e cards genéricos do shadcn.',
      },
      after: {
        caption: 'Com o Datum.',
        alt: 'A home com o Datum: grade de prancheta azul-marinho, títulos em Archivo e destaque na cor da temporada.',
      },
    },
    seasons: {
      title: 'Uma peça, três temporadas',
      lead: 'O mesmo card na temporada base, no Halloween e no Natal. Só a cor de destaque muda; o layout e o contraste ficam iguais, e o site troca sozinho pela data.',
      alt: 'O mesmo card com o botão em azul, laranja e vermelho, um para cada temporada.',
    },
    inside: {
      title: 'O que tem dentro',
      items: [
        {
          title: 'Tokens',
          description:
            'Paleta, tema escuro, tipografia, espaço de 4 px e raio de 2 px no formato do W3C DTCG. Uma fonte só gera as variáveis CSS, o tema do Tailwind 4 e um módulo TypeScript.',
        },
        {
          title: 'Componentes',
          description:
            'Button, Badge, Card, Field, Select, RadioGroup, Sheet e outros, sobre Radix e shadcn/ui, com a camada de personalidade Blueprint por cima.',
        },
        {
          title: 'Temporadas',
          description:
            'O tema troca pela data antes da primeira pintura da página, mesmo com as páginas em cache por um ano.',
        },
        {
          title: 'Storybook',
          description:
            'Fundamentos, componentes e novidades, com quando usar cada variante e checagem de acessibilidade em cada história.',
        },
      ],
      storybook: {
        caption:
          'A página do Button no Storybook: o que ele faz, os exemplos e cada propriedade.',
        alt: 'O Storybook do Datum com a página do Button aberta e o menu de fundamentos e componentes.',
      },
    },
    stack: { title: 'Tecnologias' },
    cta: {
      title: 'Por dentro do Datum',
      text: 'Todos os componentes estão no Storybook, e o código é aberto no GitHub.',
    },
  },
  'en-US': {
    meta: {
      title: 'Datum: the design system of Rafael Fachinelli',
      description:
        'W3C DTCG tokens, 8 seasons and 14 accessible React components: the design system that gives the site and the tools one personality.',
    },
    name: 'Datum',
    eyebrow: 'Design system',
    lead: 'The design system behind this site: tokens, seasons and components that give everything I build the same personality, from the portfolio to the tools.',
    actions: {
      storybook: 'Open the Storybook',
      source: 'See the code',
      article: 'Read how it was made',
    },
    numbers: {
      title: 'In numbers',
      components: {
        title: 'Components',
        description: 'Primitives and general patterns, one story per state.',
      },
      stories: {
        title: 'Storybook stories',
        description:
          'Each one runs through axe, the automated accessibility check.',
      },
      seasons: {
        title: 'Seasons',
        description:
          'The accent color changes with the date, from Carnival to Christmas.',
      },
      contrast: {
        title: 'Contrast',
        description:
          'On every text and background pair: the tests fail the build below 4.5:1.',
      },
      lcp: {
        title: 'Total Blocking Time',
        description: 'Home page in Lighthouse, mobile profile.',
        trend: 'was 1,424 ms',
        trendLabel: 'down from 1,424 ms',
      },
      performance: {
        title: 'Lighthouse Performance',
        description: 'Home page, mobile profile.',
        trend: 'was 54',
        trendLabel: 'up from 54',
      },
    },
    beforeAfter: {
      title: 'Before and after',
      lead: 'The same home page on the same screen. Before, stock shadcn components with no personality and a background of stars animated in JavaScript that froze phones. After, the Blueprint drafting board, in the color of the season.',
      before: {
        caption: 'Before Datum, on October 15, 2026.',
        alt: 'The old home page: a space background with stars and clouds, generic shadcn buttons and cards.',
      },
      after: {
        caption: 'With Datum.',
        alt: 'The home page with Datum: a navy drafting grid, Archivo headings and the accent in the season color.',
      },
    },
    seasons: {
      title: 'One piece, three seasons',
      lead: 'The same card in the base season, at Halloween and at Christmas. Only the accent changes; layout and contrast stay the same, and the site switches by date on its own.',
      alt: 'The same card with its button in blue, orange and red, one per season.',
    },
    inside: {
      title: "What's inside",
      items: [
        {
          title: 'Tokens',
          description:
            'Palette, dark theme, type, a 4 px spacing scale and a 2 px radius in the W3C DTCG format. One source builds the CSS variables, the Tailwind 4 theme and a TypeScript module.',
        },
        {
          title: 'Components',
          description:
            'Button, Badge, Card, Field, Select, RadioGroup, Sheet and more, on Radix and shadcn/ui, with the Blueprint personality layer on top.',
        },
        {
          title: 'Seasons',
          description:
            'The theme switches by date before the first paint, even though pages are cached for a year.',
        },
        {
          title: 'Storybook',
          description:
            'Foundations, components and release notes, with when to use each variant and an accessibility check on every story.',
        },
      ],
      storybook: {
        caption:
          'The Button page in the Storybook (in Portuguese): what it does, the examples and every prop.',
        alt: 'The Datum Storybook with the Button page open and the foundations and components menu.',
      },
    },
    stack: { title: 'Stack' },
    cta: {
      title: 'Inside Datum',
      text: 'Every component is in the Storybook, and the code is open on GitHub.',
    },
  },
}
