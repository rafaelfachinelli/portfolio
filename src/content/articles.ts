export type ArticleLocale = 'pt-BR' | 'en-US'

export interface ArticleContent {
  title: string
  description: string
  body: string
}

export interface Article {
  slug: string
  /** ISO date (YYYY-MM-DD) */
  date: string
  /** Path under /public, 1200x630 */
  cover: string
  tags: string[]
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
    slug: 'piramide-de-testes-na-pratica',
    date: '2026-10-09',
    cover: '/images/articles/piramide-de-testes-cover.webp',
    tags: ['Testes', 'ADR', 'Arquitetura'],
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
- **Jest como ferramenta única**, no backend e no frontend, para que configuração e vocabulário sejam os mesmos.
- **Execução no GitHub Actions:** como rodar testes unitários e de integração na esteira, de forma padronizada.
- **Estrutura de pastas:** onde cada tipo de teste mora, para que qualquer pessoa encontre o que procura em qualquer projeto.

## A pirâmide de testes como guia de quantidade

![Pirâmide de testes: unitários na base (cerca de 70% dos testes), integração no meio e end-to-end na ponta](/images/articles/test-pyramid-pt.svg)

A pirâmide diz que a **base são os testes unitários, cerca de 70% do total**, e que a cada nível acima a quantidade diminui: poucos testes de integração no meio e pouquíssimos end-to-end na ponta.

O insight veio depois de alguns meses, vendo a suíte crescer: **a pirâmide não é teoria, ela descreve a realidade.** Escrevemos muitos testes unitários de forma natural, porque são rápidos e baratos. Conforme subimos de nível, cada teste já integra tudo o que está abaixo dele, então precisamos de menos. A quantidade vai diminuindo de forma orgânica.

Por isso passei a usar a pirâmide dentro das ADRs: não como regra rígida, mas como **forma de indicar às pessoas a proporção esperada** em cada nível, sem ninguém precisar adivinhar quantos testes de cada tipo escrever.

## O que mudou na prática

Hoje, os projetos novos da empresa já nascem com testes unitários, de integração e end-to-end seguindo esse padrão:

- **Mais confiança nas entregas**, porque o código é validado contra as funcionalidades esperadas.
- **Revisões mais focadas**, já que o formato dos testes não está mais em discussão.
- **Desenvolvimento agêntico mais preciso:** com convenções claras e testes confiáveis, agentes de IA conseguem seguir o padrão e validar o que geram. O mesmo vale para ajustes manuais, que passam a ter uma rede de segurança.

## Lições

1. **Padronize a decisão, não só a ferramenta.** Jest ajuda, mas o que alinha o time é a ADR.
2. **Use a pirâmide para indicar proporção**, não só para ensinar teoria.
3. **Estrutura de pastas e esteira são parte da qualidade**, não detalhe.
4. **Bons testes servem a pessoas e a agentes.** Convenções explícitas reduzem erros dos dois lados.

Se você está padronizando testes no seu time e quer trocar ideias, [fale comigo](/pt-BR/contact).`,
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
- **Jest as the single tool**, in backend and frontend, so configuration and vocabulary are the same.
- **Execution on GitHub Actions:** how to run unit and integration tests in the pipeline in a standardized way.
- **Folder structure:** where each type of test lives, so anyone can find what they need in any project.

## The test pyramid as a guide to quantity

![Test pyramid: unit tests at the base (about 70% of tests), integration in the middle, and end-to-end at the tip](/images/articles/test-pyramid-en.svg)

The pyramid says the **base is unit tests, about 70% of the total**, and that each level up has fewer tests: a few integration tests in the middle and very few end-to-end tests at the tip.

The insight came after a few months of watching the suite grow: **the pyramid is not theory, it describes reality.** We write many unit tests naturally, because they are fast and cheap. As we move up, each test already integrates everything below it, so we need fewer. The quantity shrinks organically.

That is why I brought the pyramid into the ADRs: not as a rigid rule, but as **a way of telling people the expected proportion** at each level, so nobody has to guess how many tests of each type to write.

## What changed in practice

Today, the company's new projects start with unit, integration, and end-to-end tests following this standard:

- **More confidence in deliveries**, because code is validated against the expected functionality.
- **More focused reviews**, since test format is no longer up for debate.
- **More precise agentic development:** with clear conventions and reliable tests, AI agents can follow the pattern and validate what they generate. The same applies to manual changes, which now have a safety net.

## Lessons

1. **Standardize the decision, not just the tool.** Jest helps, but what aligns the team is the ADR.
2. **Use the pyramid to indicate proportion**, not just to teach theory.
3. **Folder structure and pipeline are part of quality**, not a detail.
4. **Good tests serve people and agents.** Explicit conventions reduce mistakes on both sides.

If you are standardizing tests in your team and want to exchange ideas, [get in touch](/en-US/contact).`,
      },
    },
  },
]
