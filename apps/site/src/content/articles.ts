export type ArticleLocale = 'pt-BR' | 'en-US'

export interface ArticleReference {
  title: string
  url: string
}

export interface ArticleContent {
  title: string
  description: string
  /** Main text in Markdown. Do NOT include lessons, references or the CTA: they are rendered by the template. */
  body: string
  /** 2-4 short, conversational bullets shown in the "Quick summary" box before the body (inline Markdown). */
  summary: string[]
  /** Key takeaways, shown in the standard "Lessons" section (inline Markdown). */
  lessons: string[]
  /** Optional custom CTA sentence; falls back to a generic one. */
  cta?: string
  /** 3-5 direct questions people (and AI assistants) actually ask, with short plain-text answers. Also emitted as FAQPage JSON-LD. */
  faq?: ArticleFaq[]
}

export interface ArticleFaq {
  question: string
  /** Plain text, 1-3 sentences, answer-first. */
  answer: string
}

export interface Article {
  slug: string
  /** ISO date (YYYY-MM-DD) */
  date: string
  /** Path under /public, 1200x630 */
  cover: string
  tags: string[]
  /** Shown in the standard "References" section. */
  references?: ArticleReference[]
  content: Record<ArticleLocale, ArticleContent>
}

export function toArticleLocale(lang: string): ArticleLocale {
  return lang.startsWith('pt') ? 'pt-BR' : 'en-US'
}

export function getReadingMinutes(body: string) {
  const words = body.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export const articles: Article[] = [
  {
    slug: 'como-criei-o-datum-design-system',
    date: '2026-10-22',
    cover: '/images/articles/datum-cover-v1.webp',
    tags: ['Design system', 'Frontend', 'Acessibilidade'],
    references: [
      {
        title: 'shadcn/ui: Introduction',
        url: 'https://ui.shadcn.com/docs',
      },
      {
        title:
          'Design Tokens Format Module 2025.10 (W3C Design Tokens Community Group)',
        url: 'https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/',
      },
      {
        title: 'Radix Primitives',
        url: 'https://www.radix-ui.com/primitives',
      },
      {
        title: 'Understanding WCAG 2.2: Contrast (Minimum)',
        url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html',
      },
    ],
    content: {
      'pt-BR': {
        title:
          'Componentes bonitos, mas sem personalidade: como criei o Datum, o design system do meu portfólio',
        description:
          'Meu site era moderno, mas podia ser o de qualquer pessoa. Conto por que um design system vale a pena até para uma pessoa só, por que comecei pelo shadcn e como dirigi a IA para construí-lo.',
        summary: [
          'Um design system não é sobre o tamanho do time: é sobre **não decidir tudo de novo** a cada coisa que você constrói.',
          'Comecei pelo **shadcn/ui** porque ele entrega o código do componente para você evoluir, em vez de uma caixa preta no `node_modules`.',
          'As regras importantes **se defendem sozinhas**: contraste abaixo do WCAG AA reprova a build.',
          'A IA escreveu rápido; o que fez o resultado sair certo foi **saber o que pedir**.',
        ],
        body: `Meu site antigo era bonito. Escuro, moderno, com os componentes do shadcn/ui bem montados. O problema é que ele podia ser o site de qualquer pessoa: os botões, os cards e os menus eram exatamente os que vêm na instalação, sem nenhum trabalho em cima que dissesse quem eu sou. E ainda travava o celular: o fundo tinha umas cem estrelas animadas em JavaScript, para sempre.

![A home antiga: fundo de espaço com estrelas e nuvens, botões e cards genéricos do shadcn](/images/projects/datum/antes.webp)

O [Datum](/pt-BR/projects/datum) nasceu para resolver as duas coisas. É o design system do meu portfólio: tokens, temporadas e componentes que dão a mesma personalidade a tudo o que eu construo, do site às ferramentas.

## Por que um design system para uma pessoa só

Parece coisa de empresa grande, mas design system não é sobre o tamanho do time. É sobre não decidir tudo de novo. Com ele, cada coisa que eu construo, uma página ou uma ferramenta, já nasce sabendo a cor, o espaço, a tipografia e a mensagem que quero passar. Eu paro de perguntar "como isso deveria parecer?" e começo direto no problema.

E tem o outro lado: quem encontra o meu trabalho, no site, numa ferramenta ou num post, reconhece a mesma personalidade em qualquer lugar. Identidade visual consistente é o que faz as pessoas lerem a marca como uma personalidade, e não como um amontoado de telas.

## Por que comecei pelo shadcn (e não pelo MUI)

Bibliotecas como MUI, Chakra e Mantine entregam componentes prontos dentro do \`node_modules\`. Funcionam bem, mas o componente fica numa caixa preta: dá para configurar, não para evoluir. O shadcn/ui faz o contrário e copia o código-fonte do componente para o seu projeto. A própria documentação resume: não é uma biblioteca de componentes, é o jeito de construir a sua.

Isso decidiu a base. Os componentes do Datum partem do shadcn e do Radix, que cuida do teclado, do foco e do leitor de tela, e ganham por cima uma camada de personalidade. Quando um componente precisa mudar, eu mudo o código dele, em vez de brigar com ele.

## Uma fonte só para cor, espaço e tipografia

Os tokens, as decisões de base do sistema, ficam em arquivos JSON no formato do Design Tokens Community Group do W3C, que ganhou a primeira versão estável em 2025. Ele não é um padrão oficial do W3C, mas é um formato aberto e independente de ferramenta, e é isso que importa: cor, tipografia, espaço de 4 px e raio de 2 px descritos uma vez só.

\`\`\`json
"color": {
  "board": { "$value": "{palette.navy.900}", "$description": "Page background, the drafting board" },
  "ink": { "$value": "{palette.slate.50}", "$description": "Main text" },
  "line": { "$value": "#7dd3fc24", "$description": "Hairline borders" }
}
\`\`\`

Um build transforma esses arquivos em três saídas: variáveis CSS, um tema do Tailwind 4 e um módulo TypeScript. Os componentes usam só os nomes semânticos (\`bg-board\`, \`text-ink\`), nunca a cor crua.

## A personalidade: uma prancheta

Antes do código, escrevi os princípios da marca. O central é cuidar do que ninguém vê: o lado de dentro do trabalho recebe a mesma atenção que o de fora. Com isso, comparei três direções visuais: Blueprint, Órbita e Constelação. Venceu a Blueprint, uma prancheta de projeto com grade fina, cotas e anotações em fonte monoespaçada, porque ela mostra justamente o lado de dentro.

O nome também vem do desenho técnico. Numa planta, o datum é a referência de onde todas as medidas partem. As cotas não se medem umas das outras, todas saem do mesmo ponto, e é isso que faz a peça encaixar. Um design system faz o mesmo papel para cor, espaço e tipografia.

## Temporadas: o mesmo site, com a cor da data

O Datum tem oito temporadas: a base, Ano-Novo, Carnaval, Páscoa, Festa Junina, Dia do Programador, Halloween e Natal. Só a cor de destaque e o degradê do logo mudam. Layout, contraste e regras ficam iguais.

![O mesmo card na temporada base, no Halloween e no Natal: o botão muda de azul para laranja e vermelho](/images/projects/datum/temporadas.webp)

O detalhe técnico: as páginas são estáticas e ficam um ano em cache, então decidir a temporada no build faria o site ficar preso na data em que foi publicado. Um script pequeno no \`<head>\` lê a data de quem visita e marca a temporada antes da primeira pintura, sem o site piscar.

## Regras que se defendem sozinhas

Regra que depende de alguém lembrar é regra que um dia se perde. No Datum, as importantes estão no código:

- **Contraste.** Todo par de texto e fundo precisa passar no WCAG AA (4,5:1), inclusive a cor de cada temporada. Os testes reprovam a build se um token novo quebrar isso.
- **Só peças gerais.** O Datum é público, então só entra o que faria sentido em qualquer projeto. O card de artigo e as métricas da home são montados no site, com peças do Datum, e nunca entram nele.
- **Desempenho faz parte da marca.** Nada de animação contínua em JavaScript. Com movimento reduzido no sistema, o movimento decorativo para.

## IA executando, eu orquestrando

Construí o Datum com agentes de IA, e o trabalho que mais pesou foi direcionar. Eu defini as tecnologias (o shadcn como base, o formato do W3C para os tokens, o Storybook para documentar), a personalidade e as regras do sistema, e pedi três direções para escolher, em vez de aceitar a primeira.

Não foi o meu primeiro design system. Contribuí no Mozaic, o design system do grupo ADEO, e construí o do Castle Raiders. Essa bagagem fez diferença: eu sabia quais decisões tomar e em que ordem, e o agente acelerou a parte de escrever. Do primeiro token ao site inteiro usando os componentes foram três dias, sem retrabalho grande. Se eu começasse de novo, faria igual.

## O que deu errado mesmo assim

Dois bugs só apareceram com gente usando:

- **O \`asChild\` que quebrava a página.** No Storybook, ligar o \`asChild\` no painel de controles fazia o exemplo do Button cair: o \`asChild\` aplica o visual ao elemento filho, e ali o filho era só um texto. O componente estava certo; o painel é que oferecia um controle que não tinha como funcionar sozinho.
- **O indicador de carregamento parado.** Com o modo de desempenho do Windows, o sistema pede movimento reduzido, e o botão parava o indicador. Só que ele não é decoração: mostra que algo está acontecendo. Agora ele continua girando, mais devagar.

Os dois viraram regra escrita e entrada na [página de Novidades](https://design.rafaelfachinelli.com/?path=/docs/datum-novidades--docs) do Storybook.

## Os números

O Datum chegou junto com um orçamento de desempenho, e a mudança foi visível. Parte veio de trocar o fundo animado pela grade da prancheta, que é só CSS; parte de renderizar as páginas no servidor e cortar o JavaScript do primeiro carregamento. Na home, no Lighthouse com perfil de celular:

- **Performance:** de 54 para 90 ou mais.
- **Bloqueio da página (TBT):** de 1.424 ms para menos de 100 ms.

E o sistema em si: 14 componentes, 69 histórias no Storybook, cada uma checada com axe, 8 temporadas e contraste AA em todo par de cor.

![A home com o Datum: grade de prancheta azul-marinho, títulos em Archivo e destaque na cor da temporada](/images/projects/datum/depois.webp)

Tudo está aberto: os componentes no [Storybook do Datum](https://design.rafaelfachinelli.com) e o código no [GitHub](https://github.com/rafaelfachinelli/portfolio).`,
        lessons: [
          'Um design system serve para **não decidir tudo de novo**: vale até para uma pessoa só.',
          'Prefira uma base que **entrega o código** do componente quando você quer personalidade, não só configuração.',
          'Descreva cor, espaço e tipografia **uma vez só**, em tokens, e gere o resto a partir deles.',
          'Coloque as regras importantes **no código**: um teste de contraste lembra por você.',
          'Com IA, o resultado depende de **saber o que pedir**: tecnologias, regras e opções para escolher.',
        ],
        cta: 'Quer conversar sobre o design system do seu produto?',
        faq: [
          {
            question:
              'Vale a pena criar um design system para um projeto pessoal?',
            answer:
              'Vale quando a sua marca aparece em mais de um lugar, como um site, ferramentas e posts. O ganho é não decidir cor, espaço e tipografia de novo a cada peça, e manter a mesma personalidade em todas.',
          },
          {
            question: 'O shadcn/ui é uma biblioteca de componentes?',
            answer:
              'Não no sentido tradicional. Ele copia o código-fonte de cada componente para o seu projeto, então você pode mudar e criar componentes a partir dele, em vez de depender de um pacote fechado no node_modules.',
          },
          {
            question: 'O que são design tokens?',
            answer:
              'São as decisões de base de um design system, como cores, fontes, espaços e raios, guardadas num formato neutro. O formato do Design Tokens Community Group do W3C permite gerar a partir deles variáveis CSS, temas do Tailwind e código para outras plataformas.',
          },
          {
            question: 'Como garantir contraste acessível em um design system?',
            answer:
              'Teste cada par de texto e fundo contra o WCAG AA (4,5:1) de forma automática e faça a build falhar quando um par não passar. Assim um token novo não quebra a acessibilidade sem ninguém perceber.',
          },
        ],
      },
      'en-US': {
        title:
          'Good-looking components with no personality: how I built Datum, the design system of my portfolio',
        description:
          'My site looked modern but could have been anyone’s. Why a design system pays off even for one person, why I started from shadcn, and how I steered AI to build it.',
        summary: [
          'A design system is not about team size: it is about **not deciding everything again** for each thing you build.',
          'I started from **shadcn/ui** because it hands you the component code to evolve, instead of a black box in `node_modules`.',
          'The important rules **defend themselves**: contrast below WCAG AA fails the build.',
          'AI wrote fast; what made it come out right was **knowing what to ask for**.',
        ],
        body: `My old site looked good. Dark, modern, with well-assembled shadcn/ui components. The problem is that it could have been anyone’s site: the buttons, cards and menus were exactly what comes with the install, with no work on top to say who I am. And it froze phones: the background had about a hundred stars animated in JavaScript, forever.

![The old home page: a space background with stars and clouds, generic shadcn buttons and cards](/images/projects/datum/antes.webp)

[Datum](/en-US/projects/datum) was born to fix both. It is the design system of my portfolio: tokens, seasons and components that give everything I build the same personality, from the site to the tools.

## Why a design system for one person

It sounds like a big-company thing, but a design system is not about team size. It is about not deciding everything again. With it, everything I build, a page or a tool, starts out knowing the color, the spacing, the type and the message I want to send. I stop asking "what should this look like?" and go straight to the problem.

There is another side: whoever finds my work, on the site, in a tool or in a post, recognizes the same personality everywhere. A consistent visual identity is what makes people read a brand as a personality, not as a pile of screens.

## Why I started from shadcn (and not MUI)

Libraries like MUI, Chakra and Mantine ship ready components inside \`node_modules\`. They work well, but the component lives in a black box: you can configure it, not evolve it. shadcn/ui does the opposite and copies the component’s source code into your project. Its own docs put it this way: it is not a component library, it is how you build yours.

That settled the base. Datum’s components start from shadcn and Radix, which handles keyboard, focus and screen readers, and get a personality layer on top. When a component needs to change, I change its code instead of fighting it.

## One source for color, space and type

The tokens, the base decisions of the system, live in JSON files in the format of the W3C Design Tokens Community Group, which reached its first stable version in 2025. It is not an official W3C standard, but it is an open, tool-neutral format, and that is what matters: color, type, a 4 px spacing scale and a 2 px radius described once.

\`\`\`json
"color": {
  "board": { "$value": "{palette.navy.900}", "$description": "Page background, the drafting board" },
  "ink": { "$value": "{palette.slate.50}", "$description": "Main text" },
  "line": { "$value": "#7dd3fc24", "$description": "Hairline borders" }
}
\`\`\`

A build turns those files into three outputs: CSS variables, a Tailwind 4 theme and a TypeScript module. Components use only the semantic names (\`bg-board\`, \`text-ink\`), never the raw color.

## The personality: a drafting board

Before any code, I wrote the brand principles. The central one is to care for what nobody sees: the inside of the work gets the same attention as the outside. With that, I compared three visual directions: Blueprint, Órbita and Constelação. Blueprint won, a drafting board with a faint grid, dimension marks and monospaced notes, because it shows exactly that inside.

The name comes from technical drawing too. On a drawing, the datum is the reference every dimension is measured from. Dimensions are not measured from each other; they all start at the same point, and that is what makes the part fit. A design system plays the same role for color, space and type.

## Seasons: the same site, in the color of the date

Datum has eight seasons: the base one, New Year, Carnival, Easter, Festa Junina, Programmer’s Day, Halloween and Christmas. Only the accent color and the logo gradient change. Layout, contrast and rules stay the same.

![The same card in the base season, at Halloween and at Christmas: the button turns from blue to orange and red](/images/projects/datum/temporadas.webp)

The technical detail: pages are static and cached for a year, so choosing the season at build time would freeze the site on the day it was published. A small script in the \`<head>\` reads the visitor’s date and sets the season before the first paint, with no flash.

## Rules that defend themselves

A rule that depends on someone remembering it gets lost one day. In Datum, the important ones live in code:

- **Contrast.** Every text and background pair must pass WCAG AA (4.5:1), including the color of each season. The tests fail the build if a new token breaks it.
- **General pieces only.** Datum is public, so only what would make sense in any project goes in. The article card and the home metrics are built in the site, from Datum pieces, and never move into it.
- **Performance is part of the brand.** No continuous JavaScript animation. With reduced motion turned on, decorative motion stops.

## AI executing, me orchestrating

I built Datum with AI agents, and the work that mattered most was steering. I set the technologies (shadcn as the base, the W3C format for tokens, Storybook for the docs), the personality and the rules of the system, and asked for three directions to choose from instead of taking the first one.

It was not my first design system. I contributed to Mozaic, the design system of the ADEO group, and built the one for Castle Raiders. That background made the difference: I knew which decisions to make and in what order, and the agent sped up the writing. From the first token to the whole site using the components took three days, with no major rework. If I started again, I would do it the same way.

## What still went wrong

Two bugs only showed up with people using it:

- **The \`asChild\` that crashed the page.** In the Storybook, turning \`asChild\` on in the controls panel crashed the Button example: \`asChild\` passes the styles to the child element, and there the child was plain text. The component was right; the panel offered a control that could not work on its own.
- **The loading spinner that stopped.** With Windows’ performance mode, the system asks for reduced motion, and the button stopped its spinner. But the spinner is not decoration: it shows something is happening. Now it keeps turning, slower.

Both became written rules and entries on the Storybook’s [release notes page](https://design.rafaelfachinelli.com/?path=/docs/datum-novidades--docs).

## The numbers

Datum came with a performance budget, and the change showed. Part of it came from swapping the animated background for the drafting grid, which is CSS only; part from rendering pages on the server and cutting first-load JavaScript. On the home page, in Lighthouse with the mobile profile:

- **Performance:** from 54 to 90 or more.
- **Total Blocking Time:** from 1,424 ms to under 100 ms.

And the system itself: 14 components, 69 Storybook stories, each checked with axe, 8 seasons and AA contrast on every color pair.

![The home page with Datum: a navy drafting grid, Archivo headings and the accent in the season color](/images/projects/datum/depois.webp)

Everything is open: the components in the [Datum Storybook](https://design.rafaelfachinelli.com) and the code on [GitHub](https://github.com/rafaelfachinelli/portfolio).`,
        lessons: [
          'A design system is for **not deciding everything again**: it pays off even for one person.',
          'Pick a base that **hands you the component code** when you want personality, not just configuration.',
          'Describe color, space and type **once**, as tokens, and generate the rest from them.',
          'Put the important rules **in code**: a contrast test remembers for you.',
          'With AI, the result depends on **knowing what to ask for**: technologies, rules and options to choose from.',
        ],
        cta: 'Want to talk about the design system of your product?',
        faq: [
          {
            question:
              'Is it worth building a design system for a personal project?',
            answer:
              'It is when your brand shows up in more than one place, like a site, tools and posts. You stop deciding color, spacing and type again for each piece, and every piece keeps the same personality.',
          },
          {
            question: 'Is shadcn/ui a component library?',
            answer:
              'Not in the traditional sense. It copies the source code of each component into your project, so you can change it and build new components from it instead of depending on a closed package in node_modules.',
          },
          {
            question: 'What are design tokens?',
            answer:
              'They are the base decisions of a design system, such as colors, fonts, spacing and radii, stored in a neutral format. The W3C Design Tokens Community Group format lets you generate CSS variables, Tailwind themes and code for other platforms from them.',
          },
          {
            question:
              'How do you guarantee accessible contrast in a design system?',
            answer:
              'Test every text and background pair against WCAG AA (4.5:1) automatically and make the build fail when a pair does not pass. That way a new token cannot break accessibility without anyone noticing.',
          },
        ],
      },
    },
  },
  {
    slug: 'quanta-arquitetura-sua-aplicacao-precisa',
    date: '2026-10-20',
    cover: '/images/articles/quanta-arquitetura-cover-v1.webp',
    tags: ['Arquitetura', 'System design', 'Ferramentas'],
    references: [
      {
        title: 'MonolithFirst, Martin Fowler',
        url: 'https://martinfowler.com/bliki/MonolithFirst.html',
      },
      {
        title: 'Embracing Risk, Site Reliability Engineering (Google)',
        url: 'https://sre.google/sre-book/embracing-risk/',
      },
      {
        title: 'Documenting Architecture Decisions, Michael Nygard',
        url: 'https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions',
      },
      {
        title: 'React Flow',
        url: 'https://reactflow.dev/',
      },
    ],
    content: {
      'pt-BR': {
        title:
          'Quanta arquitetura a sua aplicação precisa? Do monólito às duas regiões em 11 perguntas',
        description:
          'Uma aplicação e um banco com backup resolvem mais do que parece. Fiz uma ferramenta que mostra, resposta por resposta, quando cada peça passa a valer o que custa.',
        summary: [
          'Quase todo produto começa bem com **uma aplicação, um banco com backup e logs**. O resto entra quando uma necessidade real pede.',
          'O número que importa é **quantas pessoas usam ao mesmo tempo**, não quantas visitam por mês.',
          'Microsserviços são uma decisão de **time**, não de escala.',
          'O [Esboço de arquitetura](/pt-BR/tools/architecture) transforma 11 respostas num diagrama animado e diz também **o que você ainda não precisa**.',
        ],
        body: `Toda conversa de arquitetura tem um momento em que o quadro já tem quinze caixas: fila, cache, réplicas, gateway, três microsserviços. Cada uma tem um bom motivo para existir em algum sistema. A pergunta que quase ninguém faz é se ela tem um bom motivo para existir **neste** sistema, **agora**.

Escrever essa pergunta em regras foi o ponto de partida do [Esboço de arquitetura](/pt-BR/tools/architecture): você responde 11 perguntas sobre a aplicação e recebe um diagrama em que cada caixa diz por que está ali, quanto custa e quando seria exagero. Este texto explica as regras por trás dele.

## O ponto de partida que quase sempre basta

Uma aplicação, um banco de dados relacional gerenciado com backup automático, e logs e métricas. Só isso.

![O ponto de partida no Esboço de arquitetura: usuários, aplicação e banco de dados, com logs e métricas ao lado](/images/articles/quanta-arquitetura-inicio-pt.svg)

Parece pouco, mas aguenta muito mais do que costumamos imaginar. Um banco bem indexado responde milhares de consultas por segundo, e uma aplicação bem escrita atende muita gente numa máquina só. O que esse desenho não tem é redundância: se a aplicação ou o banco caem, tudo cai. E isso pode ser aceitável. Um sistema interno, um projeto em validação ou um produto que aguenta algumas horas fora do ar por mês não precisam pagar por mais.

## O que muda com cada resposta

Cada resposta acrescenta só o que resolve um problema que ela mesma cria:

- **Mil pessoas ao mesmo tempo, ou pouca tolerância a queda:** várias cópias da aplicação atrás de um **balanceador de carga**. Uma máquina só tem um teto e é um ponto único de falha.
- **Dez mil pessoas ao mesmo tempo, ou uma aplicação que quase só lê:** um **cache** em memória na frente do banco, para não perguntar a mesma coisa mil vezes.
- **Muita leitura com dez mil pessoas:** **réplicas de leitura**. As escritas continuam indo ao banco principal.
- **99,99% de disponibilidade:** cópias em mais de uma zona e um **banco de prontidão**, que assume sozinho se o principal cair.
- **Nem uma região inteira pode derrubar o serviço:** uma **segunda região**. É a resposta mais cara da ferramenta, e ela avisa isso.
- **Arquivos enviados pelas pessoas:** **armazenamento de objetos** e uma **CDN**. Arquivo não mora no banco nem no disco da aplicação.
- **Trabalho pesado em segundo plano:** uma **fila** e **workers**. A requisição responde na hora, e o trabalho lento acontece depois, com novas tentativas quando algo falha.
- **Conversa nos dois sentidos** (chat, colaboração): um **gateway de tempo real** e um **pub/sub** entre as cópias. Se o servidor só avisa, eventos do servidor saindo da própria aplicação bastam.

Os números (mil, dez mil) são regras práticas, não leis. Eles servem para mostrar a ordem de grandeza em que cada peça começa a se pagar.

Para comparar com o ponto de partida: com as respostas de uma loja na Black Friday (até 100 mil pessoas ao mesmo tempo, 99,99% de disponibilidade, busca completa, dados de pagamento e vários times), o mesmo questionário chega a 16 peças.

![A arquitetura de uma loja na Black Friday no Esboço de arquitetura: entrada com WAF, CDN, balanceador e API gateway, serviços por domínio, cache, fila e workers, banco com réplicas e prontidão, motor de busca e armazenamento de arquivos](/images/articles/quanta-arquitetura-loja-pt.svg)

## "Ao mesmo tempo" é o número que importa

O número que mais engana é o de usuários. Um site com 100 mil visitas por mês parece grande, mas as visitas se espalham pelo mês, pelo dia e pelas horas. Quem dimensiona a infraestrutura é o pico de pessoas usando **ao mesmo tempo**, e ele costuma ser muito menor do que o total do mês. Por isso a ferramenta pergunta exatamente isso, com uma dica embaixo.

## Ponto único de falha nem sempre é um problema

O diagrama marca com um alerta as peças cuja queda derruba tudo. Num produto pequeno, a aplicação e o banco aparecem marcados, e a explicação diz que isso pode ser aceitável. Disponibilidade custa caro, e cada nove a mais custa mais que o anterior: é a mesma ideia que o livro de SRE do Google chama de aceitar o risco certo, em vez de buscar 100%. A pergunta certa é quanto tempo fora do ar o negócio aguenta, e a ferramenta começa por ela.

## Microsserviços são uma decisão de time

A regra mais importante não tem a ver com escala: com **um time**, a ferramenta recomenda um **monólito modular**, um só deploy com módulos bem separados. Serviços por domínio só entram quando há **vários times** que precisam publicar sem esperar uns pelos outros. Mesmo assim, ela avisa o custo: rede, deploys, observabilidade e dados espalhados. Martin Fowler descreve o mesmo padrão em *MonolithFirst*: as histórias de microsserviços que deram certo quase sempre começaram com um monólito que cresceu demais e foi dividido.

## O que você ainda não precisa

Abaixo do diagrama há uma lista com o que ficou de fora e o que faria cada peça entrar. Para um produto com cem pessoas ao mesmo tempo: sem cache, sem réplicas, sem microsserviços, e a resposta que mudaria cada decisão. É a parte que mais ajuda numa conversa com o time: tira o "e se a gente crescer?" do campo da ansiedade e coloca num gatilho concreto.

## Como a ferramenta foi feita

- **Regras fixas, não IA.** As mesmas respostas sempre geram o mesmo diagrama, e cada regra tem um teste automático.
- **Cada peça com a sua cor e o seu formato.** A cor diz a categoria (entrada e rede, processamento, mensageria, dados, apoio), e o formato diz o tipo: banco de dados é cilindro, fila guarda as mensagens enfileiradas, o tópico de pub/sub é um tubo, o cache é um chip de memória, o armazenamento de arquivos é um balde. Dá para reconhecer a peça antes de ler o nome.
- **Dados em movimento.** O diagrama usa React Flow. As setas mostram o sentido dos dados, e cenários como "abrir uma página" ou "enviar um arquivo" percorrem o caminho um salto por vez: só a peça que recebe os dados brilha, na cor dela, com uma legenda para cada passo e narração opcional.
- **Para levar ao projeto.** Dá para baixar o diagrama em PNG, copiar o código Mermaid (que vira diagrama no GitHub e no Notion) e baixar um ADR, o registro de decisão de arquitetura que Michael Nygard popularizou, já com contexto, decisão, prós e contras e quando revisar.
- **Nada sai do navegador.** As respostas ficam no endereço da página: dá para recarregar, guardar ou compartilhar o link.

![Os formatos e as cores das peças: pessoas, entrada e rede, processamento, mensageria (fila e pub/sub), dados (cache, banco e arquivos) e apoio](/images/articles/quanta-arquitetura-formatos-pt.svg)

As peças são genéricas de propósito: balanceador, cache, fila e réplica são os mesmos conceitos há mais de dez anos, em qualquer nuvem ou servidor próprio. Escolher o produto é o passo seguinte, e depende de coisas que um questionário não sabe: o time, o orçamento, o que vocês já operam bem.

Experimente com o seu próximo projeto: [abrir o Esboço de arquitetura](/pt-BR/tools/architecture).`,
        lessons: [
          'Comece com **uma aplicação, um banco com backup e logs**. Cada peça a mais precisa de um motivo concreto.',
          'Dimensione pelo **pico de pessoas ao mesmo tempo**, não pelas visitas do mês.',
          'Defina **quanto tempo fora do ar o negócio aguenta** antes de desenhar redundância.',
          '**Microsserviços seguem o número de times**; com um time, um monólito modular entrega o mesmo isolamento por menos.',
          'Registre também **o que ficou de fora e quando rever**: isso transforma "e se crescer?" num gatilho claro.',
        ],
        cta: 'Quer conversar sobre a arquitetura do seu produto?',
        faq: [
          {
            question: 'Qual é a arquitetura mínima para uma aplicação web?',
            answer:
              'Uma aplicação, um banco de dados gerenciado com backup automático, e logs e métricas. Ela aguenta muito tráfego; o que falta é redundância, que só vale o custo quando ficar fora do ar deixa de ser aceitável.',
          },
          {
            question: 'Quando devo usar microsserviços?',
            answer:
              'Quando vários times precisam publicar partes do produto sem esperar uns pelos outros. Com um time só, um monólito modular dá o mesmo isolamento de código com menos custo.',
          },
          {
            question: 'Quando colocar cache na aplicação?',
            answer:
              'Quando o banco passa a responder muitas vezes a mesma pergunta: em geral com milhares de pessoas ao mesmo tempo, ou numa aplicação que quase só lê. Antes disso, o cache só traz o problema de dado desatualizado.',
          },
          {
            question:
              'Como gerar um diagrama de arquitetura a partir de requisitos?',
            answer:
              'O Esboço de arquitetura, em rafaelfachinelli.com/pt-BR/tools/architecture, faz isso com 11 perguntas e exporta o resultado em PNG, Mermaid e rascunho de ADR. É gratuito e roda no navegador.',
          },
        ],
      },
      'en-US': {
        title:
          'How much architecture does your application need? From monolith to two regions in 11 questions',
        description:
          'One application and a database with backups go further than it seems. I built a tool that shows, answer by answer, when each extra piece starts to pay for itself.',
        summary: [
          'Almost every product starts well with **one application, a database with backups, and logs**. The rest comes in when a real need asks for it.',
          'The number that matters is **how many people use it at the same time**, not how many visit per month.',
          'Microservices are a **team** decision, not a scale one.',
          'The [Architecture sketch](/en-US/tools/architecture) turns 11 answers into an animated diagram and also tells you **what you do not need yet**.',
        ],
        body: `Every architecture conversation reaches a moment when the whiteboard has fifteen boxes: queue, cache, replicas, gateway, three microservices. Each one has a good reason to exist in some system. The question almost nobody asks is whether it has a good reason to exist in **this** system, **now**.

Turning that question into rules was the starting point of the [Architecture sketch](/en-US/tools/architecture): you answer 11 questions about the application and get a diagram where every box says why it is there, what it costs and when it would be too much. This article explains the rules behind it.

## The starting point that is almost always enough

One application, a managed relational database with automatic backups, and logs and metrics. That is all.

![The starting point in the Architecture sketch: users, application and database, with logs and metrics beside them](/images/articles/quanta-arquitetura-inicio-en.svg)

It looks small, but it carries much more than we tend to think. A well-indexed database answers thousands of queries per second, and a well-written application serves a lot of people from a single machine. What this design lacks is redundancy: if the application or the database fails, everything fails. And that can be fine. An internal system, a project still being validated or a product that can be down a few hours a month does not need to pay for more.

## What each answer changes

Each answer adds only what solves a problem the answer itself creates:

- **A thousand people at once, or little tolerance for downtime:** several copies of the application behind a **load balancer**. A single machine has a ceiling and is a single point of failure.
- **Ten thousand people at once, or an application that mostly reads:** an in-memory **cache** in front of the database, so it is not asked the same thing a thousand times.
- **Mostly reads with ten thousand people:** **read replicas**. Writes still go to the primary.
- **99.99% availability:** copies in more than one zone and a **standby database** that takes over on its own if the primary fails.
- **Not even a whole region can take the service down:** a **second region**. It is the most expensive answer in the tool, and the tool says so.
- **Files uploaded by people:** **object storage** and a **CDN**. Files do not live in the database or on the application disk.
- **Heavy background work:** a **queue** and **workers**. The request answers right away and the slow work happens later, retried when something fails.
- **Two-way conversation** (chat, collaboration): a **real-time gateway** and **pub/sub** between the copies. If the server only notifies, server-sent events from the application itself are enough.

The numbers (a thousand, ten thousand) are rules of thumb, not laws. They show the order of magnitude at which each piece starts to pay for itself.

To compare with the starting point: with the answers of an online store on Black Friday (up to 100,000 people at once, 99.99% availability, full search, payment data and several teams), the same questionnaire reaches 16 pieces.

![The architecture of a store on Black Friday in the Architecture sketch: entry with WAF, CDN, load balancer and API gateway, services by domain, cache, queue and workers, a database with replicas and a standby, a search engine and file storage](/images/articles/quanta-arquitetura-loja-en.svg)

## "At the same time" is the number that matters

The most misleading number is the number of users. A site with 100,000 visits a month sounds big, but those visits spread over the month, the day and the hours. What sizes the infrastructure is the peak of people using it **at the same time**, and it is usually far smaller than the monthly total. That is why the tool asks exactly that, with a hint under the question.

## A single point of failure is not always a problem

The diagram marks the pieces whose failure takes everything down. In a small product, the application and the database are marked, and the explanation says that can be acceptable. Availability is expensive, and each extra nine costs more than the last: it is the idea Google's SRE book describes as embracing the right amount of risk instead of chasing 100%. The right question is how much downtime the business can take, and the tool starts from it.

## Microservices are a team decision

The most important rule has nothing to do with scale: with **one team**, the tool recommends a **modular monolith**, one deployable with clearly separated modules. Services by domain only come in with **several teams** that need to ship without waiting for each other. Even then, it shows the cost: network, deploys, observability and scattered data. Martin Fowler describes the same pattern in *MonolithFirst*: microservice stories that worked almost always started with a monolith that grew too big and was split.

## What you do not need yet

Under the diagram there is a list of what was left out and what would bring each piece in. For a product with a hundred people at once: no cache, no replicas, no microservices, and the answer that would change each decision. It is the part that helps most in a conversation with the team: it moves "what if we grow?" out of anxiety and into a concrete trigger.

## How the tool was built

- **Fixed rules, not AI.** The same answers always give the same diagram, and every rule has an automated test.
- **Each piece with its own color and shape.** The color tells the category (entry and network, compute, messaging, data, support), and the shape tells the type: a database is a cylinder, a queue holds its messages in line, a pub/sub topic is a pipe, the cache is a memory chip, file storage is a bucket. You recognize the piece before reading its name.
- **Data in motion.** The diagram uses React Flow. Arrows show which way data goes, and scenarios such as "open a page" or "upload a file" walk the path one hop at a time: only the piece receiving the data glows, in its own color, with a caption for each step and optional narration.
- **Take it to your project.** You can download the diagram as PNG, copy the Mermaid code (which renders as a diagram on GitHub and Notion) and download an ADR, the architecture decision record Michael Nygard popularized, with context, decision, pros and cons and when to revisit.
- **Nothing leaves the browser.** The answers live in the page address: you can reload, bookmark or share the link.

![The shapes and colors of the pieces: people, entry and network, compute, messaging (queue and pub/sub), data (cache, database and files) and support](/images/articles/quanta-arquitetura-formatos-en.svg)

The pieces are generic on purpose: load balancer, cache, queue and replica have been the same concepts for over a decade, on any cloud or your own servers. Choosing the product is the next step, and it depends on things a questionnaire cannot know: the team, the budget, what you already run well.

Try it with your next project: [open the Architecture sketch](/en-US/tools/architecture).`,
        lessons: [
          'Start with **one application, a database with backups, and logs**. Every extra piece needs a concrete reason.',
          'Size for the **peak of people at the same time**, not monthly visits.',
          'Decide **how much downtime the business can take** before designing redundancy.',
          '**Microservices follow the number of teams**; with one team, a modular monolith gives the same isolation for less.',
          'Also record **what was left out and when to revisit it**: it turns "what if we grow?" into a clear trigger.',
        ],
        cta: 'Want to talk about your product’s architecture?',
        faq: [
          {
            question: 'What is the minimum architecture for a web application?',
            answer:
              'One application, a managed database with automatic backups, and logs and metrics. It carries a lot of traffic; what it lacks is redundancy, which only pays off when downtime stops being acceptable.',
          },
          {
            question: 'When should I use microservices?',
            answer:
              'When several teams need to ship parts of the product without waiting for each other. With a single team, a modular monolith gives the same code isolation at a lower cost.',
          },
          {
            question: 'When should I add a cache to my application?',
            answer:
              'When the database starts answering the same question many times: usually with thousands of people at once, or in an application that mostly reads. Before that, a cache only brings the problem of stale data.',
          },
          {
            question:
              'How can I generate an architecture diagram from requirements?',
            answer:
              'The Architecture sketch, at rafaelfachinelli.com/en-US/tools/architecture, does it from 11 questions and exports the result as PNG, Mermaid and an ADR draft. It is free and runs in the browser.',
          },
        ],
      },
    },
  },
  {
    slug: 'piramide-de-testes-na-pratica',
    date: '2026-10-09',
    cover: '/images/articles/piramide-de-testes-cover-v2.webp',
    tags: ['Testes', 'ADR', 'Playwright', 'Arquitetura'],
    references: [
      {
        title: 'TestPyramid, Martin Fowler',
        url: 'https://martinfowler.com/bliki/TestPyramid.html',
      },
      {
        title: 'The Practical Test Pyramid, martinfowler.com',
        url: 'https://martinfowler.com/articles/practical-test-pyramid.html',
      },
      {
        title: 'Just Say No to More End-to-End Tests, Google Testing Blog',
        url: 'https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html',
      },
    ],
    content: {
      'pt-BR': {
        title:
          'Pirâmide de testes na prática: como duas ADRs padronizaram a qualidade',
        description:
          'Unitários na base, e2e na ponta. O que aprendi transformando a pirâmide de testes em padrão para backend e frontend.',
        body: `Testes só protegem de verdade quando todo mundo segue as mesmas regras. Quando apoiei a padronização de testes na empresa, a resposta foi escrever essa decisão em duas ADRs (Architecture Decision Records), uma para backend e outra para frontend, e usar a **pirâmide de testes** como referência de quanto testar em cada nível.

## Por que padronizar

Sem um padrão, cada projeto escolhe o seu jeito, e isso tem custos conhecidos:

- **Revisões que discutem formato** de teste em vez de comportamento.
- **Qualidade imprevisível:** não dá para confiar que um projeto novo nasce com uma rede de segurança.
- **Onboarding mais lento:** quem entra precisa descobrir as convenções de cada repositório.

Em um contexto anterior, vi o outro lado: várias aplicações com cobertura de testes zero que levei para mais de 80%. O que faltava agora era evitar que os projetos *nascessem* sem essa base.

## O que as ADRs definem

Em vez de um guia genérico, as ADRs são objetivas e definem:

- **Os três níveis de teste:** unitários, de integração e end-to-end, todos presentes nos projetos novos.
- **O padrão AAA (Arrange, Act, Assert):** todo teste segue a mesma estrutura, o que torna a leitura previsível.
- **Jest como ferramenta padrão**, no backend e no frontend, para que configuração e vocabulário sejam os mesmos.
- **Playwright para os testes end-to-end do frontend:** é uma diferença importante entre as duas ADRs. O Playwright abre a aplicação em um navegador de verdade, navega pelas páginas, clica nos elementos e valida as funcionalidades como uma pessoa usuária faria, automatizando o teste de ponta a ponta. Isso está definido exclusivamente na ADR de frontend.
- **Execução no GitHub Actions:** como rodar testes unitários e de integração na esteira, de forma padronizada.
- **Estrutura de pastas:** onde cada tipo de teste mora, para que qualquer pessoa encontre o que procura em qualquer projeto.

## A pirâmide de testes como guia de quantidade

![Pirâmide de testes: unitários na base (cerca de 70% dos testes), integração no meio e end-to-end na ponta](/images/articles/test-pyramid-pt.svg)

### De onde vem o conceito

A **pirâmide de testes** (*test automation pyramid*) foi popularizada por Mike Cohn no livro *Succeeding with Agile* (2009). Na versão original, as camadas eram **Unit**, **Service** e **UI**; hoje, é comum mapeá-las para testes **unitários**, de **integração** e **end-to-end (e2e)**. A ideia central tem duas regras:

1. Escreva testes em **granularidades diferentes**.
2. **Quanto mais alto o nível, menos testes** você deve ter.

A razão é prática: testes de alto nível (que passam pela interface ou por vários serviços) são **mais lentos, mais caros de manter e mais frágeis** (*flaky*), enquanto os unitários dão feedback em milissegundos e apontam exatamente onde está o problema. A orientação do Google Testing Blog segue a mesma linha: manter o formato de pirâmide, com poucos testes e2e, e deixar a proporção exata para cada time.

### As proporções

Uma regra prática muito citada na indústria é a divisão **70/20/10**: cerca de **70% de testes unitários, 20% de integração e 10% de end-to-end**. Não é lei: o próprio Martin Fowler trata a pirâmide como uma heurística, e ressalta que, se testes de alto nível forem rápidos, confiáveis e baratos de mudar, a conta pode mudar. Mas, como ponto de partida, a proporção é útil, e foi o que adotamos como referência.

O insight veio depois de alguns meses, vendo a suíte crescer: **a pirâmide não é teoria, ela descreve a realidade.** Escrevemos muitos testes unitários de forma natural, porque são rápidos e baratos. Conforme subimos de nível, cada teste já integra tudo o que está abaixo dele, então precisamos de menos. A quantidade vai diminuindo de forma orgânica.

Por isso passei a usar a pirâmide dentro das ADRs: não como regra rígida, mas como **forma de indicar às pessoas a proporção esperada** em cada nível, sem ninguém precisar adivinhar quantos testes de cada tipo escrever.

## "Mas qual o valor dos testes unitários?"

Uma pergunta que ouvi de um colega foi justamente essa. Na experiência dele, o valor estava nos testes de integração e end-to-end, porque nunca tinha trabalhado de verdade com testes unitários. É uma dúvida legítima, e a conversa foi mais útil do que qualquer documento:

- **São os testes mais baratos de escrever, rodar e manter**, seja o código escrito por uma pessoa ou com ajuda de IA.
- **Dão o feedback mais rápido:** você descobre o problema em segundos, ainda enquanto desenvolve, e não depois de subir um ambiente inteiro.
- **Protegem as regras de negócio:** mexer em um ponto do código pode quebrar, sem ninguém perceber, uma regra que parecia não ter relação. O teste unitário aponta exatamente onde isso aconteceu.
- **Sustentam a qualidade do código ao longo do tempo**, porque dão segurança para refatorar e evoluir.

Com o passar do tempo e com essa mudança de mentalidade, o colega passou a enxergar o valor deles. Testes de integração e e2e continuam essenciais, mas eles se apoiam na base: quanto mais confiança nos unitários, menos precisamos depender dos testes caros lá em cima.

## O que mudou na prática

Hoje, os projetos novos da empresa já nascem com testes unitários, de integração e end-to-end seguindo esse padrão:

- **Mais confiança nas entregas**, porque o código é validado contra as funcionalidades esperadas.
- **Revisões mais focadas**, já que o formato dos testes não está mais em discussão.
- **Desenvolvimento agêntico mais preciso:** com convenções claras e testes confiáveis, agentes de IA conseguem seguir o padrão e validar o que geram. O mesmo vale para ajustes manuais, que passam a ter uma rede de segurança.`,
        summary: [
          'Duas ADRs (backend e frontend) padronizaram testes **unitários, de integração e e2e** em todos os projetos novos.',
          'A **pirâmide de testes** virou guia de proporção: cerca de 70% unitários, 20% integração e 10% e2e.',
          '**Jest** nos dois lados, **Playwright** no e2e do frontend, padrão **AAA** e tudo rodando no GitHub Actions.',
          'De bônus: testes confiáveis deixam o desenvolvimento manual e o agêntico bem mais precisos.',
        ],
        lessons: [
          '**Padronize a decisão, não só a ferramenta.** Jest e Playwright ajudam, mas o que alinha o time é a ADR.',
          '**Use a pirâmide para indicar proporção**, não só para ensinar teoria.',
          '**Estrutura de pastas e esteira são parte da qualidade**, não detalhe.',
          '**Bons testes servem a pessoas e a agentes.** Convenções explícitas reduzem erros dos dois lados.',
        ],
        faq: [
          {
            question: 'Qual a proporção ideal da pirâmide de testes?',
            answer:
              'Uma regra prática muito citada é 70% de testes unitários, 20% de integração e 10% de end-to-end. Não é lei: serve como ponto de partida, e o importante é manter o formato de pirâmide, com menos testes a cada nível acima.',
          },
          {
            question: 'Por que os testes unitários são a base da pirâmide?',
            answer:
              'Porque são os mais baratos de escrever, rodar e manter, dão o feedback mais rápido e protegem as regras de negócio quando alguém altera o código, seja uma pessoa ou uma IA.',
          },
          {
            question: 'Quais ferramentas as ADRs de testes definem?',
            answer:
              'Jest como ferramenta padrão no backend e no frontend, o padrão AAA (Arrange, Act, Assert), execução dos testes unitários e de integração no GitHub Actions e Playwright para os testes end-to-end do frontend.',
          },
          {
            question: 'Por que usar uma ADR para padronizar testes?',
            answer:
              'Porque a ADR registra a decisão, o contexto e as consequências no próprio repositório. Isso reduz discussões repetidas e dá um ponto de partida claro para evoluir o padrão.',
          },
        ],
        cta: 'Está padronizando testes no seu time e quer trocar ideias?',
      },
      'en-US': {
        title:
          'The test pyramid in practice: how two ADRs standardized quality',
        description:
          'Unit tests at the base, e2e at the tip. What I learned turning the test pyramid into a standard for backend and frontend.',
        body: `Tests only protect you when everyone follows the same rules. When I helped standardize testing at the company, the answer was to write that decision down in two ADRs (Architecture Decision Records), one for backend and one for frontend, and to use the **test pyramid** as the reference for how much to test at each level.

## Why standardize

Without a standard, every project picks its own way, and the costs are well known:

- **Reviews that debate test format** instead of behavior.
- **Unpredictable quality:** you cannot trust that a new project starts with a safety net.
- **Slower onboarding:** newcomers must discover each repository's conventions.

In a previous context I saw the other side: several applications with zero test coverage that I brought above 80%. What was missing now was preventing projects from *starting* without that foundation.

## What the ADRs define

Instead of a generic guide, the ADRs are focused and define:

- **The three test levels:** unit, integration, and end-to-end, all present in new projects.
- **The AAA pattern (Arrange, Act, Assert):** every test follows the same structure, making reading predictable.
- **Jest as the standard tool**, in backend and frontend, so configuration and vocabulary are the same.
- **Playwright for frontend end-to-end tests:** this is a key difference between the two ADRs. Playwright opens the application in a real browser, navigates the pages, clicks elements, and validates features the way a user would, automating end-to-end testing. This is defined exclusively in the frontend ADR.
- **Execution on GitHub Actions:** how to run unit and integration tests in the pipeline in a standardized way.
- **Folder structure:** where each type of test lives, so anyone can find what they need in any project.

## The test pyramid as a guide to quantity

![Test pyramid: unit tests at the base (about 70% of tests), integration in the middle, and end-to-end at the tip](/images/articles/test-pyramid-en.svg)

### Where the concept comes from

The **test pyramid** (the *test automation pyramid*) was popularized by Mike Cohn in the book *Succeeding with Agile* (2009). In the original version the layers were **Unit**, **Service**, and **UI**; today they are commonly mapped to **unit**, **integration**, and **end-to-end (e2e)** tests. The core idea has two rules:

1. Write tests at **different levels of granularity**.
2. **The higher the level, the fewer tests** you should have.

The reasoning is practical: high-level tests (going through the UI or several services) are **slower, more expensive to maintain, and more brittle** (*flaky*), while unit tests give feedback in milliseconds and point to exactly where the problem is. The Google Testing Blog's guidance goes the same way: keep the pyramid shape, with few e2e tests, and let each team tune the exact proportion.

### The proportions

A widely cited rule of thumb in the industry is the **70/20/10** split: about **70% unit tests, 20% integration tests, and 10% end-to-end tests**. It is not a law: Martin Fowler himself treats the pyramid as a heuristic, noting that if high-level tests are fast, reliable, and cheap to change, the math can change. But as a starting point the proportion is useful, and it is what we adopted as a reference.

The insight came after a few months of watching the suite grow: **the pyramid is not theory, it describes reality.** We write many unit tests naturally, because they are fast and cheap. As we move up, each test already integrates everything below it, so we need fewer. The quantity shrinks organically.

That is why I brought the pyramid into the ADRs: not as a rigid rule, but as **a way of telling people the expected proportion** at each level, so nobody has to guess how many tests of each type to write.

## "But what is the value of unit tests?"

A colleague asked me exactly that. In their experience, the value was in integration and end-to-end tests, because they had never really worked with unit tests. It is a fair question, and the conversation did more than any document could:

- **They are the cheapest tests to write, run, and maintain**, whether the code is written by a person or with the help of AI.
- **They give the fastest feedback:** you find the problem in seconds, while still developing, not after spinning up a whole environment.
- **They protect business rules:** changing one part of the code can silently break a rule that seemed unrelated. A unit test points exactly to where it happened.
- **They sustain code quality over time**, because they give you the safety to refactor and evolve.

Over time, and with that shift in mindset, my colleague came to see their value. Integration and e2e tests remain essential, but they rest on the base: the more confidence we have in unit tests, the less we depend on the expensive tests at the top.

## What changed in practice

Today, the company's new projects start with unit, integration, and end-to-end tests following this standard:

- **More confidence in deliveries**, because code is validated against the expected functionality.
- **More focused reviews**, since test format is no longer up for debate.
- **More precise agentic development:** with clear conventions and reliable tests, AI agents can follow the pattern and validate what they generate. The same applies to manual changes, which now have a safety net.`,
        summary: [
          'Two ADRs (backend and frontend) standardized **unit, integration, and e2e** tests across all new projects.',
          'The **test pyramid** became our proportion guide: about 70% unit, 20% integration, and 10% e2e.',
          '**Jest** on both sides, **Playwright** for frontend e2e, the **AAA** pattern, and everything running on GitHub Actions.',
          'As a bonus: reliable tests make both manual and agentic development far more precise.',
        ],
        lessons: [
          '**Standardize the decision, not just the tool.** Jest and Playwright help, but what aligns the team is the ADR.',
          '**Use the pyramid to indicate proportion**, not just to teach theory.',
          '**Folder structure and pipeline are part of quality**, not a detail.',
          '**Good tests serve people and agents.** Explicit conventions reduce mistakes on both sides.',
        ],
        faq: [
          {
            question: 'What is the ideal test pyramid proportion?',
            answer:
              'A widely cited rule of thumb is 70% unit tests, 20% integration tests, and 10% end-to-end tests. It is not a law: use it as a starting point and keep the pyramid shape, with fewer tests at each level up.',
          },
          {
            question: 'Why are unit tests the base of the pyramid?',
            answer:
              'Because they are the cheapest to write, run, and maintain, give the fastest feedback, and protect business rules whenever code changes, whether the change comes from a person or an AI.',
          },
          {
            question: 'Which tools do the testing ADRs define?',
            answer:
              'Jest as the standard tool in backend and frontend, the AAA pattern (Arrange, Act, Assert), unit and integration tests running on GitHub Actions, and Playwright for frontend end-to-end tests.',
          },
          {
            question: 'Why use an ADR to standardize testing?',
            answer:
              'Because an ADR records the decision, its context, and its consequences in the repository itself. That reduces repeated debates and gives a clear starting point to evolve the standard.',
          },
        ],
        cta: 'Standardizing tests in your team and want to exchange ideas?',
      },
    },
  },
]
