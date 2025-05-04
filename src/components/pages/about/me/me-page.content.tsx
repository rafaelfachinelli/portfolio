'use client'

import { PageContent } from '@/components/ui/page-content'
import { PageTitle } from '@/components/ui/page-title'
import { useLanguage } from '@/contexts/LanguageContext'

export function MePageContent() {
  const { dictionary } = useLanguage()

  return (
    <>
      <PageTitle
        title={dictionary.pages.about.title}
        description={dictionary.pages.about.description}
      />

      <PageContent>
        <p className="text-justify">
          Sou Tech Lead na Leroy Merlin através da Develcode, uma empresa de
          tecnologia em sistemas que oferece soluções inovadoras e
          personalizadas para seus clientes. Tenho mais de quatro anos de
          experiência na Develcode, onde trabalho com as linguagens e
          ferramentas HTML5, CSS3, JavaScript, React, GitHub e Datadog entre
          outros.
        </p>

        <p className="text-justify">
          Minhas principais competências são o desenvolvimento de PWA
          (Progressive Web Apps), a aplicação de boas práticas de código limpo,
          o desempenho e as técnicas de debug no React, e a documentação de
          projetos e produção de tutoriais. Também sou responsável pelo
          versionamento semântico do projeto, pelo controle de ambientes e
          deploy com GitHub Actions, e pelo planejamento e demonstração de
          entregas. Além disso, participei da implantação de observalidade no
          Datadog RUM em aplicações React, contribuindo para a melhoria da
          experiência do usuário e a otimização dos recursos da aplicação.
        </p>
        <p className="text-justify">
          Sou formado em Análise e Desenvolvimento de Sistemas pela FATEC e
          técnico em Informática pela ETEC. Sou apaixonado pelo desenvolvimento
          de aplicações web e automação, e estou sempre buscando aprender novas
          tecnologias e metodologias. Sou um profissional comprometido,
          criativo, e colaborativo, que gosta de trabalhar em equipe e resolver
          problemas. Tenho orgulho de ter sido premiado em dois eventos de
          inovação, o Ideathon e o Inovathon São Paulo, onde apresentei soluções
          para os desafios do ambiente digital e da cultura e turismo. Meu
          objetivo é continuar desenvolvendo soluções que gerem valor para os
          clientes e para a sociedade.
        </p>
        <p className="text-justify">
          Além disso, estou sempre em busca de novos desafios e oportunidades
          para expandir meu conhecimento e habilidades, contribuindo para o
          crescimento da equipe e da empresa.
        </p>
      </PageContent>
    </>
  )
}
