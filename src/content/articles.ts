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
  content: Record<ArticleLocale, ArticleContent>
}

export function toArticleLocale(lang: string): ArticleLocale {
  return lang.startsWith('pt') ? 'pt-BR' : 'en-US'
}

export const articles: Article[] = [
  {
    slug: 'adrs-de-testes-padronizacao',
    date: '2026-10-09',
    content: {
      'pt-BR': {
        title:
          'Como duas ADRs padronizaram os testes em todos os projetos novos',
        description:
          'Como ajudei a criar ADRs de testes para backend e frontend (AAA, Jest, GitHub Actions e estrutura de pastas) e por que isso melhora o desenvolvimento manual e o agêntico.',
        body: `Qualidade de código não escala na base do "cada time faz do seu jeito". Quando comecei a apoiar a padronização de testes na empresa, o problema não era falta de vontade: era falta de uma decisão **escrita, compartilhada e fácil de seguir**. A resposta foi transformar essa decisão em duas ADRs (Architecture Decision Records), uma para backend e outra para frontend.

## O problema

Cada projeto tinha seu próprio jeito de testar, ou simplesmente não testava. Isso gera três custos:

- **Revisões inconsistentes:** cada pull request discute formato de teste em vez de comportamento.
- **Qualidade imprevisível:** não dá para confiar que um projeto novo nasce com uma rede de segurança.
- **Onboarding lento:** quem entra precisa descobrir as convenções de cada repositório.

Em um contexto anterior, já tinha visto o outro lado: várias aplicações com cobertura de testes zero que levei para mais de 80%. O que faltava agora era evitar que os projetos *nascessem* sem essa base.

## A decisão: duas ADRs

Em vez de um guia genérico, escrevemos ADRs objetivas, uma para backend e outra para frontend, definindo:

- **Os três níveis de teste:** unitários, de integração e end-to-end, todos exigidos nos projetos novos.
- **O padrão AAA (Arrange, Act, Assert):** todo teste segue a mesma estrutura, o que torna a leitura previsível.
- **Jest como ferramenta única**, tanto no backend quanto no frontend, para que a configuração e o vocabulário sejam os mesmos.
- **Execução no GitHub Actions:** como rodar testes unitários e de integração na esteira, de forma padronizada.
- **Estrutura de pastas:** onde cada tipo de teste mora, para que qualquer pessoa encontre o que procura em qualquer projeto.

## Por que ADR e não só um guia

Uma ADR registra **a decisão, o contexto e as consequências**. Quando alguém pergunta "por que fazemos assim?", a resposta está no repositório, versionada. Isso reduz discussões repetidas e dá um ponto de partida claro para evoluir a decisão no futuro, em vez de ela se perder em um documento solto.

## O que mudou na prática

Hoje, os projetos novos da empresa já nascem com testes unitários, de integração e end-to-end seguindo esse padrão. Os ganhos que percebi:

- **Mais confiança nas entregas**, porque o código é validado contra as funcionalidades esperadas.
- **Revisões mais focadas**, já que o formato dos testes não está mais em discussão.
- **Desenvolvimento agêntico mais preciso:** quando o projeto tem convenções claras e testes confiáveis, agentes de IA conseguem seguir o padrão e validar o que geram. O mesmo vale para ajustes manuais, que passam a ter uma rede de segurança.

## Lições

1. **Padronize a decisão, não só a ferramenta.** Jest ajuda, mas o que alinha o time é a ADR.
2. **Estrutura de pastas e esteira são parte da qualidade**, não detalhe.
3. **Bons testes servem a pessoas e a agentes.** Convenções explícitas reduzem erros dos dois lados.

Se você está padronizando testes no seu time e quer trocar ideias, [fale comigo](/pt-BR/contact).`,
      },
      'en-US': {
        title: 'How two ADRs standardized testing across all new projects',
        description:
          'How I helped create testing ADRs for backend and frontend (AAA, Jest, GitHub Actions, and folder structure) and why they improve both manual and agentic development.',
        body: `Code quality does not scale when every team does things their own way. When I started supporting test standardization at the company, the problem was not lack of willingness: it was the lack of a decision that was **written down, shared, and easy to follow**. The answer was to turn that decision into two ADRs (Architecture Decision Records), one for backend and one for frontend.

## The problem

Each project tested in its own way, or did not test at all. That has three costs:

- **Inconsistent reviews:** every pull request debates test format instead of behavior.
- **Unpredictable quality:** you cannot trust that a new project starts with a safety net.
- **Slow onboarding:** newcomers must discover each repository's conventions.

In a previous context I had seen the other side: several applications with zero test coverage that I brought above 80%. What was missing now was preventing projects from *starting* without that foundation.

## The decision: two ADRs

Instead of a generic guide, we wrote focused ADRs, one for backend and one for frontend, defining:

- **The three test levels:** unit, integration, and end-to-end, all required in new projects.
- **The AAA pattern (Arrange, Act, Assert):** every test follows the same structure, making reading predictable.
- **Jest as the single tool**, in both backend and frontend, so configuration and vocabulary are the same.
- **Execution on GitHub Actions:** how to run unit and integration tests in the pipeline in a standardized way.
- **Folder structure:** where each type of test lives, so anyone can find what they need in any project.

## Why an ADR and not just a guide

An ADR records **the decision, its context, and its consequences**. When someone asks "why do we do it this way?", the answer is in the repository, versioned. That reduces repeated discussions and gives a clear starting point to evolve the decision later, instead of it getting lost in a loose document.

## What changed in practice

Today, the company's new projects start with unit, integration, and end-to-end tests following this standard. The gains I noticed:

- **More confidence in deliveries**, because code is validated against the expected functionality.
- **More focused reviews**, since test format is no longer up for debate.
- **More precise agentic development:** when a project has clear conventions and reliable tests, AI agents can follow the pattern and validate what they generate. The same applies to manual changes, which now have a safety net.

## Lessons

1. **Standardize the decision, not just the tool.** Jest helps, but what aligns the team is the ADR.
2. **Folder structure and pipeline are part of quality**, not a detail.
3. **Good tests serve people and agents.** Explicit conventions reduce mistakes on both sides.

If you are standardizing tests in your team and want to exchange ideas, [get in touch](/en-US/contact).`,
      },
    },
  },
]
