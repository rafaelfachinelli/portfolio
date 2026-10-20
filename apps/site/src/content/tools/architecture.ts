import type { ArticleLocale } from '@/content/articles'
import type { PresetId, QuestionId } from '@/lib/tools/architecture/questions'
import type {
  Cost,
  EdgeKind,
  NodeId,
  NodeTag,
  NoteId,
} from '@/lib/tools/architecture/rules'
import type { ScenarioId } from '@/lib/tools/architecture/scenarios'

type Option = { title: string; description?: string }

export type ArchitectureCopy = {
  meta: {
    title: string
    description: string
    ogTitle: string
    /** After the users answer in a shared preview title. */
    atOnce: string
  }
  name: string
  lead: string
  disclaimer: string
  presets: { title: string; items: Record<PresetId, string> }
  questionsTitle: string
  questions: Record<
    QuestionId,
    { title: string; hint?: string; options: Record<string, Option> }
  >
  nodes: Record<
    NodeId,
    {
      name: string
      what: string
      tooMuch: string
      ifFails: string
      /** What the piece gives, for the ADR's pros. */
      pro: string
      /** What it costs, for the ADR's cons. */
      con: string
    }
  >
  tags: Record<NodeTag, string>
  costs: Record<Cost, string>
  edges: Record<EdgeKind, string>
  notNeeded: Partial<Record<NodeId, string>>
  notes: Record<NoteId, string>
  scenarios: Record<ScenarioId, string>
  steps: Record<string, string>
  ui: {
    diagramLabel: string
    /** `{count}` is replaced. */
    pieces: string
    /** Read by screen readers on each box. */
    a11yNode: string
    a11yControls: string
    resultTitle: string
    seeResult: string
    legend: string
    spof: string
    spofHint: string
    scenariosTitle: string
    scenariosHint: string
    play: string
    pause: string
    previous: string
    next: string
    stop: string
    /** `{current}` and `{total}` are replaced. */
    step: string
    panelWhy: string
    panelBase: string
    panelCost: string
    panelTooMuch: string
    panelIfFails: string
    panelClose: string
    panelEmpty: string
    notNeededTitle: string
    notNeededEmpty: string
    notesTitle: string
    textVersionTitle: string
    textComponents: string
    textConnections: string
    exportTitle: string
    exportPng: string
    exportMermaid: string
    exportAdr: string
    share: string
    copied: string
    downloaded: string
    fitView: string
    zoomIn: string
    zoomOut: string
    sharedNotice: string
    startOver: string
    articleCta: string
    articleLink: string
  }
  howItWorks: { title: string; paragraphs: string[] }
  faq: { question: string; answer: string }[]
  adr: {
    /** Locale for joining lists ("a, b e c"). */
    lang: string
    title: string
    status: string
    date: string
    context: string
    /** `{kind}`, `{users}`… are replaced by the phrases below. */
    contextText: string
    phrases: Record<QuestionId, Record<string, string>>
    answers: string
    decision: string
    /** `{pieces}` is replaced by the list of pieces. */
    decisionText: string
    why: string
    reasonPrefix: string
    diagram: string
    consequences: string
    pros: string
    cons: string
    revisit: string
    revisitEmpty: string
    references: string
    referenceTool: string
    referenceArticle: string
    referenceAdr: string
    referenceMonolith: string
    referenceSre: string
    footer: string
  }
}

const ptBR: ArchitectureCopy = {
  meta: {
    title: 'Esboço de arquitetura: do questionário ao diagrama',
    description:
      'Responda perguntas sobre a sua aplicação (usuários simultâneos, disponibilidade, arquivos, tempo real) e veja um diagrama de arquitetura animado, com o porquê de cada peça e o que você ainda não precisa.',
    ogTitle: 'Esboço de arquitetura',
    atOnce: 'ao mesmo tempo',
  },
  name: 'Esboço de arquitetura',
  lead: 'Responda algumas perguntas sobre a sua aplicação e veja a arquitetura de partida: cada caixa diz por que está ali, quanto custa e quando seria exagero. E veja os dados andando por ela.',
  disclaimer:
    'É um ponto de partida para a conversa, não uma revisão de projeto. Peças genéricas, sem fornecedor: o que importa é o papel de cada uma.',
  presets: {
    title: 'Comece por um exemplo',
    items: {
      blog: 'Blog',
      saas: 'SaaS B2B',
      store: 'Loja na Black Friday',
      chat: 'App de chat',
      video: 'Plataforma de vídeo',
    },
  },
  questionsTitle: 'Sobre a aplicação',
  questions: {
    kind: {
      title: 'Que tipo de aplicação?',
      options: {
        content: {
          title: 'Site de conteúdo',
          description: 'Blog, portal, documentação',
        },
        saas: {
          title: 'Aplicação web',
          description: 'SaaS, sistema de gestão, painel',
        },
        mobileApi: {
          title: 'API para apps',
          description: 'Backend de app mobile ou parceiros',
        },
        store: {
          title: 'Loja online',
          description: 'Catálogo, carrinho, pagamento',
        },
        realtime: {
          title: 'Tempo real',
          description: 'Chat, jogo, colaboração ao vivo',
        },
      },
    },
    users: {
      title: 'Quantas pessoas usam ao mesmo tempo, no pico?',
      hint: 'Ao mesmo tempo, não por mês. Um site com 100 mil visitas por mês costuma ter menos de 100 pessoas ao mesmo tempo.',
      options: {
        u100: { title: 'Até 100' },
        u1k: { title: 'Até 1 mil' },
        u10k: { title: 'Até 10 mil' },
        u100k: { title: 'Até 100 mil' },
        u1m: { title: 'Mais de 100 mil' },
      },
    },
    uptime: {
      title: 'Quanto tempo fora do ar ela aguenta?',
      options: {
        some: {
          title: 'Algumas horas por mês',
          description: 'Um sistema interno, um projeto pessoal',
        },
        little: {
          title: 'Pouco: 99,9%',
          description: 'Cerca de 45 minutos por mês',
        },
        minimal: {
          title: 'Quase nada: 99,99%',
          description: 'Cerca de 4 minutos por mês',
        },
        region: {
          title: 'Nada, nem se uma região cair',
          description: 'Um data center inteiro fora não pode parar o serviço',
        },
      },
    },
    load: {
      title: 'Ela mais lê ou mais grava dados?',
      options: {
        read: {
          title: 'Mais leitura',
          description: 'Muita gente vendo os mesmos dados',
        },
        balanced: {
          title: 'Equilibrado',
          description: 'Lê e grava na mesma medida',
        },
        write: {
          title: 'Mais escrita',
          description: 'Eventos, telemetria, mensagens',
        },
      },
    },
    live: {
      title: 'Precisa de atualização ao vivo?',
      options: {
        none: {
          title: 'Não',
          description: 'A página atualiza quando a pessoa recarrega',
        },
        push: {
          title: 'Avisos do servidor',
          description: 'Notificações, status de pedido',
        },
        twoWay: {
          title: 'Nos dois sentidos',
          description: 'Chat, edição colaborativa, jogo',
        },
      },
    },
    jobs: {
      title: 'Faz trabalho pesado em segundo plano?',
      options: {
        none: { title: 'Não' },
        some: {
          title: 'Às vezes',
          description: 'E-mails, relatórios, integrações',
        },
        heavy: {
          title: 'Muito',
          description: 'Vídeo, importações grandes, IA',
        },
      },
    },
    files: {
      title: 'Guarda arquivos enviados pelas pessoas?',
      options: {
        none: { title: 'Não' },
        some: { title: 'Alguns', description: 'Foto de perfil, documentos' },
        many: { title: 'Muitos', description: 'Fotos e vídeos são o produto' },
      },
    },
    search: {
      title: 'Precisa de busca por texto?',
      options: {
        none: { title: 'Não' },
        filters: {
          title: 'Filtros simples',
          description: 'Por nome, data, status',
        },
        fullText: {
          title: 'Busca completa',
          description: 'Relevância, erros de digitação, sinônimos',
        },
      },
    },
    reach: {
      title: 'Onde estão as pessoas?',
      options: {
        country: { title: 'Em um país' },
        global: { title: 'Em vários países' },
      },
    },
    team: {
      title: 'Quem constrói?',
      options: {
        small: { title: 'Um time', description: 'Até umas 10 pessoas' },
        teams: {
          title: 'Vários times',
          description: 'Cada um com uma parte do produto',
        },
      },
    },
    sensitive: {
      title: 'Guarda dados pessoais sensíveis ou de pagamento?',
      hint: 'Saúde, documentos, cartão. A LGPD e as regras de pagamento pedem cuidados extras.',
      options: {
        no: { title: 'Não' },
        yes: { title: 'Sim' },
      },
    },
  },
  nodes: {
    users: {
      name: 'Usuários',
      pro: '',
      con: '',
      what: 'Navegadores e apps que usam a aplicação.',
      tooMuch: '',
      ifFails: '',
    },
    dns: {
      name: 'Roteamento global',
      pro: 'Tira uma região inteira do caminho quando ela falha.',
      con: 'Mais uma camada para configurar, e o failover precisa ser ensaiado.',
      what: 'DNS que manda cada pessoa para a região saudável mais próxima e tira uma região do ar quando ela falha.',
      tooMuch: 'Com uma região só, o DNS comum basta.',
      ifFails:
        'Serviços de DNS gerenciado são distribuídos; uma falha total é rara, mas tira tudo do ar.',
    },
    waf: {
      name: 'WAF',
      pro: 'Barra ataques comuns antes de chegarem ao código.',
      con: 'Regras mal ajustadas podem bloquear tráfego legítimo.',
      what: 'Firewall de aplicação: barra ataques conhecidos (injeção, robôs, excesso de requisições) antes de chegarem ao código.',
      tooMuch: 'Num sistema interno, atrás de VPN, raramente compensa.',
      ifFails:
        'Costuma ser um serviço gerenciado e redundante, junto da CDN ou do balanceador.',
    },
    cdn: {
      name: 'CDN',
      pro: 'Arquivos e páginas públicas chegam rápido, de perto de cada pessoa.',
      con: 'O que está em cache pode ficar velho; é preciso invalidar ao publicar.',
      what: 'Rede de servidores perto das pessoas que guarda cópias de imagens, CSS, JS e páginas públicas.',
      tooMuch:
        'Raramente é exagero: é barata. Só sobra quando quase nada é público ou estático.',
      ifFails:
        'Os arquivos voltam a sair da origem, mais lentos, mas a aplicação continua de pé.',
    },
    lb: {
      name: 'Balanceador de carga',
      pro: 'A aplicação aguenta mais gente e sobrevive à queda de uma cópia.',
      con: 'A aplicação não pode guardar estado em memória; sessões vão para fora dela.',
      what: 'Divide as requisições entre várias cópias da aplicação e tira do caminho as que estão doentes.',
      tooMuch: 'Com uma instância e pouca gente, é uma peça a mais sem ganho.',
      ifFails:
        'Balanceadores gerenciados já são redundantes; por isso não aparece como ponto único de falha.',
    },
    realtime: {
      name: 'Gateway de tempo real',
      pro: 'Mensagens chegam na hora, sem a página perguntar de tempos em tempos.',
      con: 'Conexões abertas consomem recursos e pedem cuidado com reconexão.',
      what: 'Mantém conexões abertas (WebSocket) com quem está usando e empurra mensagens na hora.',
      tooMuch:
        'Se o servidor só avisa e a pessoa não responde pelo mesmo canal, eventos do servidor (SSE) direto da aplicação bastam.',
      ifFails:
        'As conexões caem e os clientes reconectam em outra instância; mensagens no meio do caminho podem precisar ser reenviadas.',
    },
    gateway: {
      name: 'API gateway',
      pro: 'Autenticação, limites e rotas num lugar só, para todos os serviços.',
      con: 'Vira peça crítica: se cair ou ficar lento, todos os serviços sentem.',
      what: 'Uma porta única para os serviços: rota cada chamada ao serviço certo e cuida de autenticação e limites num lugar só.',
      tooMuch:
        'Com uma aplicação só, o balanceador e a própria aplicação fazem esse papel.',
      ifFails: 'Sem cópias, nenhuma chamada chega aos serviços.',
    },
    app: {
      name: 'Aplicação',
      pro: 'Um deploy e um código para entender e testar; módulos separados permitem dividir depois.',
      con: 'Tudo é publicado junto: um módulo com problema pode atrasar a publicação dos outros.',
      what: 'Um monólito modular: um só deploy, com módulos bem separados por assunto. Simples de entender, testar e publicar.',
      tooMuch: 'Nunca é exagero. É o começo certo para quase tudo.',
      ifFails:
        'Com uma cópia só, a aplicação fica fora do ar até subir de novo. Para muitos produtos pequenos isso é aceitável.',
    },
    services: {
      name: 'Serviços por domínio',
      pro: 'Cada time publica a sua parte sem esperar os outros.',
      con: 'Rede, deploys, observabilidade e dados espalhados custam caro, e chamadas entre serviços precisam de plano B.',
      what: 'A aplicação dividida em serviços, um por área do negócio, cada um com o seu time e o seu deploy.',
      tooMuch:
        'Com um time só, custa mais (rede, deploy, observabilidade, dados espalhados) do que entrega.',
      ifFails:
        'A falha de um serviço não precisa derrubar os outros, se as chamadas entre eles tiverem tempo limite e plano B.',
    },
    pubsub: {
      name: 'Pub/sub',
      pro: 'Mensagens chegam a quem está conectado em qualquer cópia do gateway.',
      con: 'Mais uma peça para operar; mensagens podem se perder numa falha.',
      what: 'Canal de mensagens entre as cópias do gateway: o que chega numa instância é entregue a quem está conectado nas outras.',
      tooMuch: 'Com uma instância só, as mensagens nem saem da memória.',
      ifFails:
        'Mensagens ao vivo param de chegar a quem está em outra instância até ele voltar.',
    },
    cache: {
      name: 'Cache',
      pro: 'Respostas repetidas em milissegundos e menos carga no banco.',
      con: 'Risco de dado desatualizado: é preciso decidir quando invalidar.',
      what: 'Memória rápida com as respostas mais pedidas, para não perguntar ao banco a mesma coisa mil vezes.',
      tooMuch:
        'Com pouca gente, o banco responde rápido sozinho, e cache traz um problema novo: dado velho.',
      ifFails:
        'Tudo vai direto ao banco: mais lento e com risco de sobrecarga, mas funciona.',
    },
    queue: {
      name: 'Fila',
      pro: 'Trabalho lento sai da requisição e é refeito quando falha.',
      con: 'O resultado chega depois; a interface precisa mostrar o andamento.',
      what: 'Guarda tarefas para depois: a requisição responde na hora e o trabalho pesado acontece em segundo plano.',
      tooMuch:
        'Se toda tarefa leva milissegundos, fazer na própria requisição é mais simples.',
      ifFails:
        'Tarefas novas não entram; as que já estavam guardadas esperam. A aplicação segue respondendo.',
    },
    workers: {
      name: 'Workers',
      pro: 'Escalam separados da aplicação, conforme o volume de tarefas.',
      con: 'Cada tarefa precisa poder rodar mais de uma vez sem estragar dados.',
      what: 'Processos que pegam tarefas da fila e as executam, com novas tentativas quando algo falha.',
      tooMuch: 'Sem fila, não há o que consumir.',
      ifFails: 'As tarefas acumulam na fila e são feitas quando eles voltam.',
    },
    db: {
      name: 'Banco de dados',
      pro: 'Fonte da verdade, com transações e backup automático.',
      con: 'Um banco só tem um limite de escrita; passar dele exige particionar os dados.',
      what: 'Banco relacional gerenciado, com backup automático. A fonte da verdade.',
      tooMuch: 'Nunca é exagero.',
      ifFails:
        'Sem uma cópia de prontidão, a aplicação para até o banco voltar ou ser restaurado do backup.',
    },
    replica: {
      name: 'Réplicas de leitura',
      pro: 'Divide a carga de leitura sem mexer nas escritas.',
      con: 'Réplicas atrasam alguns instantes: uma leitura logo depois de gravar pode vir antiga.',
      what: 'Cópias do banco que só respondem leituras, para dividir a carga. Escritas continuam indo ao principal.',
      tooMuch:
        'Com pouca leitura, só aumentam custo e trazem atraso de réplica para explicar.',
      ifFails: 'As leituras voltam ao banco principal.',
    },
    standby: {
      name: 'Banco de prontidão',
      pro: 'Se o banco principal cair, a cópia assume em minutos, sem restaurar backup.',
      con: 'Paga-se um segundo banco que fica parado a maior parte do tempo.',
      what: 'Uma cópia do banco em outra zona, atualizada o tempo todo, que assume sozinha se o principal cair.',
      tooMuch:
        'Se algumas horas fora do ar são aceitáveis, backup e restauração bastam.',
      ifFails: 'Nada muda até o principal falhar também.',
    },
    search: {
      name: 'Motor de busca',
      pro: 'Busca rápida, com relevância e tolerância a erros de digitação.',
      con: 'Outro sistema para manter sincronizado com o banco.',
      what: 'Índice próprio para busca por texto, com relevância e tolerância a erro. Alimentado a partir do banco.',
      tooMuch:
        'Para filtros simples, o banco resolve (inclusive com índice de texto).',
      ifFails: 'A busca para; o resto da aplicação não.',
    },
    storage: {
      name: 'Armazenamento de arquivos',
      pro: 'Arquivos guardados de forma barata e durável, fora do banco.',
      con: 'As permissões de acesso aos arquivos precisam de cuidado.',
      what: 'Object storage para fotos, vídeos e documentos. Arquivo não fica no banco nem no disco da aplicação.',
      tooMuch: 'Sem arquivos, não é preciso.',
      ifFails:
        'Uploads e downloads param. Serviços de object storage são muito redundantes.',
    },
    region2: {
      name: 'Segunda região',
      pro: 'O serviço continua mesmo com uma região inteira fora do ar.',
      con: 'Custo e complexidade dobram, e escritas entre regiões são um problema difícil.',
      what: 'Uma cópia da aplicação e do banco em outra região, pronta para assumir se a primeira cair inteira.',
      tooMuch:
        'Na maioria dos produtos, várias zonas numa região já dão 99,99%. Duas regiões dobram custo e complexidade.',
      ifFails: 'A região principal segue sozinha.',
    },
    observability: {
      name: 'Logs e métricas',
      pro: 'Você descobre o problema antes do cliente.',
      con: 'Logs e métricas também custam; defina o que guardar e por quanto tempo.',
      what: 'Logs, métricas e alertas: como você descobre que algo quebrou antes do cliente avisar.',
      tooMuch: 'Nunca é exagero, mesmo pequeno.',
      ifFails: 'A aplicação segue, mas você fica sem enxergar o que acontece.',
    },
    secrets: {
      name: 'Cofre de segredos',
      pro: 'Senhas e chaves fora do código, com acesso registrado.',
      con: 'Mais um serviço do qual a aplicação depende para subir.',
      what: 'Guarda senhas, chaves e tokens fora do código, com acesso registrado e troca periódica.',
      tooMuch:
        'Variáveis de ambiente bem cuidadas bastam quando não há dado sensível.',
      ifFails:
        'Instâncias novas não conseguem subir; as que estão de pé continuam.',
    },
    audit: {
      name: 'Log de auditoria',
      pro: 'Registro de quem acessou dados sensíveis, como a LGPD pede.',
      con: 'O volume de registros cresce; é preciso definir a retenção.',
      what: 'Registro de quem acessou ou mudou cada dado sensível, que ninguém consegue apagar.',
      tooMuch: 'Sem dado sensível, os logs comuns bastam.',
      ifFails:
        'A aplicação segue, mas os acessos desse período ficam sem registro.',
    },
  },
  tags: {
    instances: '2+ cópias',
    zones: '2+ zonas',
    rateLimit: 'limite de taxa',
    sse: 'eventos do servidor',
    encrypted: 'criptografado',
    modular: 'monólito modular',
  },
  costs: { low: 'Custo baixo', medium: 'Custo médio', high: 'Custo alto' },
  edges: {
    request: 'Requisição e resposta',
    async: 'Mensagem na fila',
    replication: 'Replicação',
    live: 'Conexão ao vivo',
    assets: 'Arquivos',
  },
  notNeeded: {
    lb: 'Quando chegar a mil pessoas ao mesmo tempo, ou quando ficar fora do ar deixar de ser aceitável.',
    cache:
      'Quando passar de 10 mil pessoas ao mesmo tempo, ou antes se a aplicação for quase só leitura.',
    replica: 'Com muita leitura e mais de 10 mil pessoas ao mesmo tempo.',
    standby:
      'Quando a meta for 99,99%. Até lá, backup automático e restauração testada.',
    cdn: 'Para conteúdo público, loja, público em vários países ou muitos arquivos.',
    queue:
      'Quando aparecer trabalho que não precisa terminar antes da resposta.',
    search: 'Quando filtros não bastarem e a busca precisar de relevância.',
    realtime: 'Quando a conversa for nos dois sentidos (chat, colaboração).',
    waf: 'Com dados sensíveis ou a partir de 100 mil pessoas ao mesmo tempo.',
    services:
      'Quando houver vários times precisando publicar sem esperar uns pelos outros.',
    region2:
      'Só se ficar fora do ar com uma região inteira caída não for aceitável.',
  },
  notes: {
    partitioning:
      'Muita escrita em grande escala: um banco só pode virar o gargalo. Avalie particionar os dados (por cliente, por região) ou um log de eventos para as escritas. Depende muito dos dados, por isso não vira caixa.',
    multiRegion:
      'Duas regiões dobram o custo e trazem uma pergunta difícil: o que fazer com escritas que estavam a caminho quando a região caiu. Decida isso antes.',
    services:
      'Serviços por domínio cobram em rede, deploy e dados espalhados. Comece com poucos serviços grandes e divida quando um time ficar travando o outro.',
  },
  scenarios: {
    read: 'Abrir uma página',
    write: 'Salvar algo',
    upload: 'Enviar um arquivo',
    live: 'Mensagem ao vivo',
    job: 'Tarefa em segundo plano',
  },
  steps: {
    'cdn-assets':
      'Imagens, CSS e JS vêm da CDN, de um servidor perto da pessoa.',
    'via-dns': 'O roteamento global escolhe a região saudável mais próxima.',
    'via-waf': 'O WAF confere a requisição e barra ataques conhecidos.',
    'via-lb': 'O balanceador escolhe uma cópia saudável da aplicação.',
    'via-gateway':
      'O API gateway confere a autenticação e encaminha ao serviço certo.',
    'via-app': 'A requisição chega à aplicação.',
    'via-services': 'A requisição chega ao serviço responsável.',
    cache: 'Primeiro, procura no cache. Se achar, responde em milissegundos.',
    'read-replica':
      'Se não achou, lê de uma réplica, sem pesar no banco principal.',
    'read-db': 'Lê do banco de dados.',
    respond: 'A resposta volta pelo mesmo caminho.',
    arrive: 'A requisição atravessa a entrada e chega à aplicação.',
    'write-db': 'Grava no banco principal, a fonte da verdade.',
    replicate: 'O banco copia a mudança para as réplicas e para a prontidão.',
    invalidate: 'Apaga do cache a versão antiga, para ninguém ver dado velho.',
    'enqueue-index': 'Coloca na fila um pedido para atualizar a busca.',
    index: 'Um worker pega o pedido e atualiza o índice de busca.',
    'ask-upload':
      'O navegador pede à aplicação permissão para enviar um arquivo.',
    'signed-url':
      'A aplicação gera um link de envio temporário no armazenamento.',
    'return-url': 'O link volta para o navegador.',
    'direct-upload':
      'O navegador envia o arquivo direto ao armazenamento, sem passar pela aplicação.',
    'enqueue-media': 'A aplicação coloca na fila o processamento do arquivo.',
    'process-media':
      'Um worker gera miniaturas ou converte o vídeo e salva o resultado.',
    'serve-cdn':
      'Quem abre o arquivo recebe da CDN, que busca no armazenamento só na primeira vez.',
    connect:
      'O app abre uma conexão que fica aberta com o gateway de tempo real.',
    publish: 'A mensagem enviada é publicada no pub/sub.',
    'fan-out':
      'O pub/sub entrega a todas as cópias do gateway, que empurram para quem está conectado.',
    'server-event':
      'A aplicação também publica eventos (um pedido aprovado, uma menção).',
    enqueue: 'A aplicação coloca a tarefa na fila.',
    'respond-early':
      'E responde na hora: a pessoa não espera o trabalho pesado.',
    consume:
      'Um worker pega a tarefa. Se falhar, ela volta para a fila e é tentada de novo.',
    'job-write': 'O resultado é gravado no banco.',
  },
  ui: {
    diagramLabel: 'Diagrama da arquitetura',
    pieces: '{count} peças',
    a11yNode: 'Pressione Enter para ver os detalhes desta peça.',
    a11yControls: 'Controles do diagrama',
    resultTitle: 'A arquitetura',
    seeResult: 'Ver a arquitetura',
    legend: 'Legenda',
    spof: 'Ponto único de falha',
    spofHint: 'Se esta peça cair, a aplicação inteira cai.',
    scenariosTitle: 'Veja os dados andando',
    scenariosHint: 'Escolha uma situação e acompanhe o caminho, passo a passo.',
    play: 'Reproduzir',
    pause: 'Pausar',
    previous: 'Passo anterior',
    next: 'Próximo passo',
    stop: 'Parar',
    step: 'Passo {current} de {total}',
    panelWhy: 'Por que está aqui',
    panelBase: 'Toda aplicação precisa desta peça.',
    panelCost: 'Custo e complexidade',
    panelTooMuch: 'Quando é exagero',
    panelIfFails: 'Se cair',
    panelClose: 'Fechar detalhes',
    panelEmpty: 'Clique numa caixa para ver por que ela está ali.',
    notNeededTitle: 'O que você ainda não precisa',
    notNeededEmpty: 'Com essas respostas, todas as peças entram.',
    notesTitle: 'Atenção',
    textVersionTitle: 'Versão em texto',
    textComponents: 'Componentes',
    textConnections: 'Conexões',
    exportTitle: 'Levar para o seu projeto',
    exportPng: 'Imagem (PNG)',
    exportMermaid: 'Copiar Mermaid',
    exportAdr: 'Rascunho de ADR',
    share: 'Copiar link',
    copied: 'Copiado',
    downloaded: 'Baixado',
    fitView: 'Enquadrar',
    zoomIn: 'Aproximar',
    zoomOut: 'Afastar',
    sharedNotice:
      'Você está vendo uma arquitetura compartilhada. Mude as respostas para fazer a sua.',
    startOver: 'Recomeçar',
    articleCta: 'Quer entender as regras por trás das caixas?',
    articleLink: 'Leia o artigo',
  },
  howItWorks: {
    title: 'Como funciona',
    paragraphs: [
      'As respostas passam por regras fixas, não por IA: as mesmas respostas sempre geram o mesmo diagrama, e cada caixa sabe dizer qual resposta a colocou ali.',
      'Tudo começa no mínimo que qualquer aplicação precisa: uma aplicação, um banco de dados com backup automático, e logs e métricas. Cada resposta acrescenta só o que resolve um problema que ela cria: mais gente ao mesmo tempo pede várias cópias e um balanceador; muita leitura pede cache e réplicas; pouca tolerância a queda pede várias zonas e um banco de prontidão; arquivos pedem armazenamento próprio e CDN.',
      'As peças são genéricas de propósito. Balanceador, cache, fila e réplica são os mesmos conceitos há mais de dez anos, em qualquer nuvem ou servidor próprio. Escolher o produto é o passo seguinte.',
      'Nada do que você responde sai do navegador. As respostas ficam no link, que você pode compartilhar.',
    ],
  },
  faq: [
    {
      question: 'Quando vale a pena usar microsserviços?',
      answer:
        'Quando vários times precisam publicar partes do produto sem esperar uns pelos outros. Com um time só, um monólito modular entrega o mesmo isolamento de código com muito menos custo de rede, deploy e observabilidade.',
    },
    {
      question: 'Quando preciso de cache?',
      answer:
        'Quando o banco começa a responder muitas vezes a mesma pergunta: em geral, com milhares de pessoas ao mesmo tempo ou com uma aplicação quase só de leitura. Antes disso, o cache só traz o problema de dado desatualizado.',
    },
    {
      question: 'Qual a diferença entre 99,9% e 99,99% de disponibilidade?',
      answer:
        '99,9% permite cerca de 45 minutos fora do ar por mês; 99,99%, cerca de 4 minutos. Chegar ao segundo pede várias zonas, banco com failover automático e deploy sem parada, o que aumenta bastante custo e cuidado.',
    },
    {
      question: 'Para que serve uma fila numa aplicação web?',
      answer:
        'Para tirar trabalho lento da requisição: a aplicação guarda a tarefa, responde na hora, e workers fazem o trabalho em segundo plano, tentando de novo quando algo falha.',
    },
    {
      question: 'Esta ferramenta substitui um arquiteto?',
      answer:
        'Não. Ela dá um ponto de partida e um vocabulário comum para a conversa. Dados, orçamento, prazos e o time real mudam a resposta, e é aí que entra a revisão de alguém com contexto.',
    },
  ],
  adr: {
    lang: 'pt-BR',
    title: 'ADR: arquitetura inicial',
    status: 'Status: proposta',
    date: 'Data',
    context: 'Contexto',
    contextText:
      'Estamos construindo {kind} para {users}. A aplicação {uptime}, {load} e {live}. Ela {jobs}, {files} e {search}. As pessoas estão {reach}, e o sistema é construído por {team}. {sensitive}.',
    phrases: {
      kind: {
        content: 'um site de conteúdo',
        saas: 'uma aplicação web (SaaS, sistema de gestão ou painel)',
        mobileApi: 'uma API que atende apps e parceiros',
        store: 'uma loja online',
        realtime: 'uma aplicação de tempo real',
      },
      users: {
        u100: 'até 100 pessoas ao mesmo tempo no pico',
        u1k: 'até mil pessoas ao mesmo tempo no pico',
        u10k: 'até 10 mil pessoas ao mesmo tempo no pico',
        u100k: 'até 100 mil pessoas ao mesmo tempo no pico',
        u1m: 'mais de 100 mil pessoas ao mesmo tempo no pico',
      },
      uptime: {
        some: 'pode ficar algumas horas fora do ar por mês',
        little:
          'precisa de 99,9% de disponibilidade (cerca de 45 minutos fora do ar por mês)',
        minimal:
          'precisa de 99,99% de disponibilidade (cerca de 4 minutos fora do ar por mês)',
        region: 'não pode parar nem se uma região inteira da nuvem cair',
      },
      load: {
        read: 'mais lê do que grava dados',
        balanced: 'lê e grava dados na mesma medida',
        write: 'mais grava do que lê dados',
      },
      live: {
        none: 'não precisa de atualização ao vivo',
        push: 'precisa enviar avisos do servidor para as pessoas',
        twoWay: 'precisa de comunicação ao vivo nos dois sentidos',
      },
      jobs: {
        none: 'não faz trabalho pesado em segundo plano',
        some: 'faz algum trabalho em segundo plano, como e-mails e relatórios',
        heavy:
          'faz muito trabalho pesado em segundo plano, como vídeo ou importações',
      },
      files: {
        none: 'não guarda arquivos enviados pelas pessoas',
        some: 'guarda alguns arquivos enviados pelas pessoas',
        many: 'tem fotos e vídeos das pessoas como parte central do produto',
      },
      search: {
        none: 'não precisa de busca por texto',
        filters: 'precisa só de filtros simples',
        fullText: 'precisa de busca completa por texto',
      },
      reach: { country: 'em um país', global: 'em vários países' },
      team: { small: 'um time', teams: 'vários times' },
      sensitive: {
        no: 'Não há dados pessoais sensíveis nem de pagamento',
        yes: 'Há dados pessoais sensíveis ou de pagamento, sujeitos à LGPD',
      },
    },
    answers: 'Respostas',
    decision: 'Decisão',
    decisionText:
      'Vamos começar com {pieces}. Cada peça entra para atender uma necessidade descrita no contexto; o que não tem uma necessidade concreta agora fica de fora, com um gatilho claro para revisar.',
    why: 'Por que cada peça',
    reasonPrefix: 'Entrou por',
    diagram: 'Diagrama',
    consequences: 'Consequências',
    pros: 'Prós',
    cons: 'Contras',
    revisit: 'Quando revisar',
    revisitEmpty:
      'Todas as peças já fazem parte da arquitetura; revise quando as respostas mudarem.',
    references: 'Referências',
    referenceTool: 'Esboço de arquitetura (esta arquitetura)',
    referenceArticle: 'Quanta arquitetura a sua aplicação precisa?',
    referenceAdr: 'Documenting Architecture Decisions, Michael Nygard',
    referenceMonolith: 'MonolithFirst, Martin Fowler',
    referenceSre: 'Embracing Risk, Site Reliability Engineering (Google)',
    footer: 'Gerado pelo Esboço de arquitetura',
  },
}

const enUS: ArchitectureCopy = {
  meta: {
    title: 'Architecture sketch: from a questionnaire to a diagram',
    description:
      'Answer questions about your application (concurrent users, availability, files, real time) and get an animated architecture diagram, with why each piece is there and what you do not need yet.',
    ogTitle: 'Architecture sketch',
    atOnce: 'at once',
  },
  name: 'Architecture sketch',
  lead: 'Answer a few questions about your application and get a starting architecture: every box says why it is there, what it costs and when it would be too much. And watch the data move through it.',
  disclaimer:
    'A starting point for a conversation, not a design review. Generic pieces, no vendors: what matters is the role each one plays.',
  presets: {
    title: 'Start from an example',
    items: {
      blog: 'Blog',
      saas: 'B2B SaaS',
      store: 'Store on Black Friday',
      chat: 'Chat app',
      video: 'Video platform',
    },
  },
  questionsTitle: 'About the application',
  questions: {
    kind: {
      title: 'What kind of application?',
      options: {
        content: {
          title: 'Content site',
          description: 'Blog, portal, documentation',
        },
        saas: {
          title: 'Web application',
          description: 'SaaS, back office, dashboard',
        },
        mobileApi: {
          title: 'API for apps',
          description: 'Backend for a mobile app or partners',
        },
        store: { title: 'Online store', description: 'Catalog, cart, payment' },
        realtime: {
          title: 'Real time',
          description: 'Chat, game, live collaboration',
        },
      },
    },
    users: {
      title: 'How many people use it at the same time, at peak?',
      hint: 'At the same time, not per month. A site with 100,000 visits a month usually has fewer than 100 people at once.',
      options: {
        u100: { title: 'Up to 100' },
        u1k: { title: 'Up to 1,000' },
        u10k: { title: 'Up to 10,000' },
        u100k: { title: 'Up to 100,000' },
        u1m: { title: 'More than 100,000' },
      },
    },
    uptime: {
      title: 'How much downtime can it take?',
      options: {
        some: {
          title: 'A few hours a month',
          description: 'An internal system, a side project',
        },
        little: {
          title: 'Little: 99.9%',
          description: 'About 45 minutes a month',
        },
        minimal: {
          title: 'Almost none: 99.99%',
          description: 'About 4 minutes a month',
        },
        region: {
          title: 'None, even if a region fails',
          description: 'A whole data center down cannot stop the service',
        },
      },
    },
    load: {
      title: 'Does it mostly read or write data?',
      options: {
        read: {
          title: 'Mostly reading',
          description: 'Many people viewing the same data',
        },
        balanced: {
          title: 'Balanced',
          description: 'Reads and writes in equal measure',
        },
        write: {
          title: 'Mostly writing',
          description: 'Events, telemetry, messages',
        },
      },
    },
    live: {
      title: 'Does it need live updates?',
      options: {
        none: {
          title: 'No',
          description: 'The page updates when the person reloads',
        },
        push: {
          title: 'Server notifications',
          description: 'Alerts, order status',
        },
        twoWay: {
          title: 'Two-way',
          description: 'Chat, collaborative editing, games',
        },
      },
    },
    jobs: {
      title: 'Does it do heavy work in the background?',
      options: {
        none: { title: 'No' },
        some: {
          title: 'Sometimes',
          description: 'E-mails, reports, integrations',
        },
        heavy: { title: 'A lot', description: 'Video, large imports, AI' },
      },
    },
    files: {
      title: 'Does it store files people upload?',
      options: {
        none: { title: 'No' },
        some: { title: 'Some', description: 'Profile pictures, documents' },
        many: {
          title: 'Many',
          description: 'Photos and videos are the product',
        },
      },
    },
    search: {
      title: 'Does it need text search?',
      options: {
        none: { title: 'No' },
        filters: {
          title: 'Simple filters',
          description: 'By name, date, status',
        },
        fullText: {
          title: 'Full search',
          description: 'Relevance, typos, synonyms',
        },
      },
    },
    reach: {
      title: 'Where are the people?',
      options: {
        country: { title: 'In one country' },
        global: { title: 'In several countries' },
      },
    },
    team: {
      title: 'Who builds it?',
      options: {
        small: { title: 'One team', description: 'Up to about 10 people' },
        teams: {
          title: 'Several teams',
          description: 'Each owns part of the product',
        },
      },
    },
    sensitive: {
      title: 'Does it store sensitive personal or payment data?',
      hint: 'Health, ID documents, cards. Privacy laws (GDPR, LGPD) and payment rules ask for extra care.',
      options: {
        no: { title: 'No' },
        yes: { title: 'Yes' },
      },
    },
  },
  nodes: {
    users: {
      name: 'Users',
      pro: '',
      con: '',
      what: 'Browsers and apps that use the application.',
      tooMuch: '',
      ifFails: '',
    },
    dns: {
      name: 'Global routing',
      pro: 'Takes a whole region out of the path when it fails.',
      con: 'One more layer to configure, and failover has to be rehearsed.',
      what: 'DNS that sends each person to the nearest healthy region and takes a region out when it fails.',
      tooMuch: 'With one region, plain DNS is enough.',
      ifFails:
        'Managed DNS services are distributed; a full outage is rare, but it takes everything down.',
    },
    waf: {
      name: 'WAF',
      pro: 'Blocks common attacks before they reach the code.',
      con: 'Badly tuned rules can block legitimate traffic.',
      what: 'Web application firewall: blocks known attacks (injection, bots, request floods) before they reach the code.',
      tooMuch: 'For an internal system behind a VPN, it rarely pays off.',
      ifFails:
        'It is usually a managed, redundant service, next to the CDN or the load balancer.',
    },
    cdn: {
      name: 'CDN',
      pro: 'Files and public pages arrive fast, from close to each person.',
      con: 'Cached content can go stale; it must be invalidated on publish.',
      what: 'A network of servers close to people that keeps copies of images, CSS, JS and public pages.',
      tooMuch:
        'Rarely too much: it is cheap. Only skip it when almost nothing is public or static.',
      ifFails:
        'Files come from the origin again, slower, but the application stays up.',
    },
    lb: {
      name: 'Load balancer',
      pro: 'The application takes more people and survives losing a copy.',
      con: 'The application cannot keep state in memory; sessions move out of it.',
      what: 'Spreads requests across several copies of the application and takes unhealthy ones out of the path.',
      tooMuch:
        'With one instance and few people, it is one more piece with no gain.',
      ifFails:
        'Managed load balancers are redundant already, so it is not marked as a single point of failure.',
    },
    realtime: {
      name: 'Real-time gateway',
      pro: 'Messages arrive instantly, without the page polling.',
      con: 'Open connections use resources and need careful reconnection.',
      what: 'Keeps connections open (WebSocket) with the people using the app and pushes messages instantly.',
      tooMuch:
        'If the server only notifies and the person does not answer on the same channel, server-sent events from the application are enough.',
      ifFails:
        'Connections drop and clients reconnect to another instance; messages in flight may need to be sent again.',
    },
    gateway: {
      name: 'API gateway',
      pro: 'Authentication, limits and routing in one place for every service.',
      con: 'It becomes critical: if it fails or slows down, every service feels it.',
      what: 'One door to the services: routes each call to the right service and handles authentication and limits in one place.',
      tooMuch:
        'With a single application, the load balancer and the application itself do this job.',
      ifFails: 'Without copies, no call reaches the services.',
    },
    app: {
      name: 'Application',
      pro: 'One deploy and one codebase to understand and test; separate modules allow a split later.',
      con: 'Everything ships together: one troubled module can delay the release of the others.',
      what: 'A modular monolith: one deployable, with modules clearly split by subject. Simple to understand, test and ship.',
      tooMuch: 'Never too much. It is the right start for almost everything.',
      ifFails:
        'With a single copy, the application is down until it restarts. For many small products, that is acceptable.',
    },
    services: {
      name: 'Services by domain',
      pro: 'Each team ships its part without waiting for the others.',
      con: 'Network, deploys, observability and scattered data are expensive, and calls between services need a fallback.',
      what: 'The application split into services, one per business area, each with its own team and deploy.',
      tooMuch:
        'With one team, it costs more (network, deploys, observability, scattered data) than it gives.',
      ifFails:
        'One service failing does not have to take down the others, if calls between them have timeouts and a fallback.',
    },
    pubsub: {
      name: 'Pub/sub',
      pro: 'Messages reach people connected to any gateway copy.',
      con: 'One more piece to run; messages can be lost in a failure.',
      what: 'A message channel between the gateway copies: what arrives at one instance reaches people connected to the others.',
      tooMuch: 'With a single instance, messages never leave memory.',
      ifFails:
        'Live messages stop reaching people on other instances until it is back.',
    },
    cache: {
      name: 'Cache',
      pro: 'Repeated answers in milliseconds and less load on the database.',
      con: 'Risk of stale data: you must decide when to invalidate.',
      what: 'Fast memory with the most requested answers, so the database is not asked the same thing a thousand times.',
      tooMuch:
        'With few people, the database answers quickly on its own, and a cache brings a new problem: stale data.',
      ifFails:
        'Everything goes straight to the database: slower and at risk of overload, but it works.',
    },
    queue: {
      name: 'Queue',
      pro: 'Slow work leaves the request and is retried when it fails.',
      con: 'The result arrives later; the interface has to show progress.',
      what: 'Stores tasks for later: the request answers right away and the heavy work happens in the background.',
      tooMuch:
        'If every task takes milliseconds, doing it in the request is simpler.',
      ifFails:
        'New tasks cannot enter; stored ones wait. The application keeps answering.',
    },
    workers: {
      name: 'Workers',
      pro: 'They scale apart from the application, with the volume of tasks.',
      con: 'Each task must be safe to run more than once.',
      what: 'Processes that take tasks from the queue and run them, retrying when something fails.',
      tooMuch: 'Without a queue, there is nothing to consume.',
      ifFails: 'Tasks pile up in the queue and run when the workers are back.',
    },
    db: {
      name: 'Database',
      pro: 'The source of truth, with transactions and automatic backups.',
      con: 'A single database has a write ceiling; going past it means partitioning the data.',
      what: 'A managed relational database with automatic backups. The source of truth.',
      tooMuch: 'Never too much.',
      ifFails:
        'Without a standby copy, the application stops until the database is back or restored from backup.',
    },
    replica: {
      name: 'Read replicas',
      pro: 'Shares the read load without touching writes.',
      con: 'Replicas lag a little: a read right after a write can come back old.',
      what: 'Copies of the database that only answer reads, to share the load. Writes still go to the primary.',
      tooMuch:
        'With few reads, they only add cost and replication lag to explain.',
      ifFails: 'Reads go back to the primary database.',
    },
    standby: {
      name: 'Standby database',
      pro: 'If the primary fails, the copy takes over in minutes, without restoring a backup.',
      con: 'You pay for a second database that sits idle most of the time.',
      what: 'A copy of the database in another zone, always up to date, that takes over on its own if the primary fails.',
      tooMuch:
        'If a few hours down are acceptable, backup and restore are enough.',
      ifFails: 'Nothing changes until the primary fails too.',
    },
    search: {
      name: 'Search engine',
      pro: 'Fast search with relevance and typo tolerance.',
      con: 'Another system to keep in sync with the database.',
      what: 'Its own index for text search, with relevance and typo tolerance. Fed from the database.',
      tooMuch:
        'For simple filters, the database does it (text indexes included).',
      ifFails: 'Search stops; the rest of the application does not.',
    },
    storage: {
      name: 'File storage',
      pro: 'Files stored cheaply and durably, outside the database.',
      con: 'Access permissions to the files need care.',
      what: 'Object storage for photos, videos and documents. Files do not belong in the database or on the application disk.',
      tooMuch: 'Without files, it is not needed.',
      ifFails:
        'Uploads and downloads stop. Object storage services are highly redundant.',
    },
    region2: {
      name: 'Second region',
      pro: 'The service keeps running even with a whole region down.',
      con: 'Cost and complexity double, and writes across regions are a hard problem.',
      what: 'A copy of the application and database in another region, ready to take over if the first one fails entirely.',
      tooMuch:
        'For most products, several zones in one region already give 99.99%. Two regions double cost and complexity.',
      ifFails: 'The main region carries on alone.',
    },
    observability: {
      name: 'Logs and metrics',
      pro: 'You find the problem before the customer does.',
      con: 'Logs and metrics cost too; decide what to keep and for how long.',
      what: 'Logs, metrics and alerts: how you learn something broke before a customer tells you.',
      tooMuch: 'Never too much, even when small.',
      ifFails:
        'The application keeps running, but you cannot see what happens.',
    },
    secrets: {
      name: 'Secrets manager',
      pro: 'Passwords and keys out of the code, with logged access.',
      con: 'One more service the application needs in order to start.',
      what: 'Keeps passwords, keys and tokens out of the code, with logged access and rotation.',
      tooMuch:
        'Well-kept environment variables are enough when there is no sensitive data.',
      ifFails: 'New instances cannot start; running ones carry on.',
    },
    audit: {
      name: 'Audit log',
      pro: 'A record of who accessed sensitive data, as privacy laws ask.',
      con: 'The volume of records grows; retention must be defined.',
      what: 'A record of who read or changed each piece of sensitive data, that nobody can erase.',
      tooMuch: 'Without sensitive data, regular logs are enough.',
      ifFails:
        'The application keeps running, but access in that period goes unrecorded.',
    },
  },
  tags: {
    instances: '2+ copies',
    zones: '2+ zones',
    rateLimit: 'rate limit',
    sse: 'server events',
    encrypted: 'encrypted',
    modular: 'modular monolith',
  },
  costs: { low: 'Low cost', medium: 'Medium cost', high: 'High cost' },
  edges: {
    request: 'Request and response',
    async: 'Queued message',
    replication: 'Replication',
    live: 'Live connection',
    assets: 'Files',
  },
  notNeeded: {
    lb: 'At 1,000 people at the same time, or when downtime stops being acceptable.',
    cache:
      'Past 10,000 people at the same time, or sooner if the application mostly reads.',
    replica: 'With mostly reads and more than 10,000 people at the same time.',
    standby:
      'When the goal is 99.99%. Until then, automatic backups and a tested restore.',
    cdn: 'For public content, a store, people in several countries or many files.',
    queue:
      'When work appears that does not need to finish before the response.',
    search: 'When filters are not enough and search needs relevance.',
    realtime: 'When the conversation goes both ways (chat, collaboration).',
    waf: 'With sensitive data or from 100,000 people at the same time.',
    services: 'When several teams need to ship without waiting for each other.',
    region2: 'Only if being down while a whole region fails is not acceptable.',
  },
  notes: {
    partitioning:
      'Many writes at large scale: a single database may become the bottleneck. Consider partitioning the data (by customer, by region) or an event log for writes. It depends on the data, so it is not a box.',
    multiRegion:
      'Two regions double the cost and raise a hard question: what happens to writes in flight when a region fails. Decide that first.',
    services:
      'Services by domain cost network, deploys and scattered data. Start with a few large services and split when one team keeps blocking another.',
  },
  scenarios: {
    read: 'Open a page',
    write: 'Save something',
    upload: 'Upload a file',
    live: 'Live message',
    job: 'Background task',
  },
  steps: {
    'cdn-assets':
      'Images, CSS and JS come from the CDN, from a server close to the person.',
    'via-dns': 'Global routing picks the nearest healthy region.',
    'via-waf': 'The WAF checks the request and blocks known attacks.',
    'via-lb': 'The load balancer picks a healthy copy of the application.',
    'via-gateway':
      'The API gateway checks authentication and forwards to the right service.',
    'via-app': 'The request reaches the application.',
    'via-services': 'The request reaches the service in charge.',
    cache:
      'First, it looks in the cache. If it is there, the answer takes milliseconds.',
    'read-replica':
      'If not, it reads from a replica, without loading the primary database.',
    'read-db': 'It reads from the database.',
    respond: 'The response goes back the same way.',
    arrive: 'The request crosses the entry and reaches the application.',
    'write-db': 'It writes to the primary database, the source of truth.',
    replicate:
      'The database copies the change to the replicas and the standby.',
    invalidate:
      'It drops the old version from the cache, so nobody sees stale data.',
    'enqueue-index': 'It puts a request to update search in the queue.',
    index: 'A worker takes it and updates the search index.',
    'ask-upload':
      'The browser asks the application for permission to upload a file.',
    'signed-url': 'The application creates a temporary upload link in storage.',
    'return-url': 'The link goes back to the browser.',
    'direct-upload':
      'The browser sends the file straight to storage, without going through the application.',
    'enqueue-media': 'The application queues the file processing.',
    'process-media':
      'A worker makes thumbnails or converts the video and saves the result.',
    'serve-cdn':
      'Whoever opens the file gets it from the CDN, which fetches from storage only the first time.',
    connect:
      'The app opens a connection that stays open with the real-time gateway.',
    publish: 'The message sent is published to pub/sub.',
    'fan-out':
      'Pub/sub delivers it to every gateway copy, which pushes it to the people connected.',
    'server-event':
      'The application publishes events too (an order approved, a mention).',
    enqueue: 'The application puts the task in the queue.',
    'respond-early':
      'And answers right away: the person does not wait for the heavy work.',
    consume:
      'A worker takes the task. If it fails, it goes back to the queue and is tried again.',
    'job-write': 'The result is written to the database.',
  },
  ui: {
    diagramLabel: 'Architecture diagram',
    pieces: '{count} pieces',
    a11yNode: 'Press Enter to see the details of this piece.',
    a11yControls: 'Diagram controls',
    resultTitle: 'The architecture',
    seeResult: 'See the architecture',
    legend: 'Legend',
    spof: 'Single point of failure',
    spofHint: 'If this piece fails, the whole application fails.',
    scenariosTitle: 'Watch the data move',
    scenariosHint: 'Pick a situation and follow the path, step by step.',
    play: 'Play',
    pause: 'Pause',
    previous: 'Previous step',
    next: 'Next step',
    stop: 'Stop',
    step: 'Step {current} of {total}',
    panelWhy: 'Why it is here',
    panelBase: 'Every application needs this piece.',
    panelCost: 'Cost and complexity',
    panelTooMuch: 'When it is too much',
    panelIfFails: 'If it fails',
    panelClose: 'Close details',
    panelEmpty: 'Click a box to see why it is there.',
    notNeededTitle: 'What you do not need yet',
    notNeededEmpty: 'With these answers, every piece is in.',
    notesTitle: 'Watch out',
    textVersionTitle: 'Text version',
    textComponents: 'Components',
    textConnections: 'Connections',
    exportTitle: 'Take it to your project',
    exportPng: 'Image (PNG)',
    exportMermaid: 'Copy Mermaid',
    exportAdr: 'ADR draft',
    share: 'Copy link',
    copied: 'Copied',
    downloaded: 'Downloaded',
    fitView: 'Fit',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    sharedNotice:
      'You are looking at a shared architecture. Change the answers to make your own.',
    startOver: 'Start over',
    articleCta: 'Want to understand the rules behind the boxes?',
    articleLink: 'Read the article',
  },
  howItWorks: {
    title: 'How it works',
    paragraphs: [
      'The answers go through fixed rules, not AI: the same answers always give the same diagram, and every box can say which answer put it there.',
      'Everything starts from the minimum any application needs: one application, a database with automatic backups, and logs and metrics. Each answer adds only what solves a problem it creates: more people at once asks for several copies and a load balancer; mostly reads asks for a cache and replicas; little tolerance for downtime asks for several zones and a standby database; files ask for their own storage and a CDN.',
      'The pieces are generic on purpose. Load balancer, cache, queue and replica have been the same concepts for over a decade, on any cloud or your own servers. Choosing the product is the next step.',
      'Nothing you answer leaves the browser. The answers live in the link, which you can share.',
    ],
  },
  faq: [
    {
      question: 'When are microservices worth it?',
      answer:
        'When several teams need to ship parts of the product without waiting for each other. With one team, a modular monolith gives the same code isolation at a much lower cost in network, deploys and observability.',
    },
    {
      question: 'When do I need a cache?',
      answer:
        'When the database starts answering the same question many times: usually with thousands of people at once, or with an application that mostly reads. Before that, a cache only brings the problem of stale data.',
    },
    {
      question: 'What is the difference between 99.9% and 99.99% availability?',
      answer:
        '99.9% allows about 45 minutes down a month; 99.99%, about 4 minutes. Reaching the second takes several zones, a database with automatic failover and zero-downtime deploys, which adds a lot of cost and care.',
    },
    {
      question: 'What is a queue for in a web application?',
      answer:
        'To take slow work out of the request: the application stores the task, answers right away, and workers do the work in the background, retrying when something fails.',
    },
    {
      question: 'Does this tool replace an architect?',
      answer:
        'No. It gives a starting point and a shared vocabulary for the conversation. Data, budget, deadlines and the real team change the answer, and that is where a review by someone with context comes in.',
    },
  ],
  adr: {
    lang: 'en-US',
    title: 'ADR: starting architecture',
    status: 'Status: proposed',
    date: 'Date',
    context: 'Context',
    contextText:
      'We are building {kind} for {users}. The application {uptime}, {load} and {live}. It {jobs}, {files} and {search}. The people are {reach}, and the system is built by {team}. {sensitive}.',
    phrases: {
      kind: {
        content: 'a content site',
        saas: 'a web application (SaaS, back office or dashboard)',
        mobileApi: 'an API serving apps and partners',
        store: 'an online store',
        realtime: 'a real-time application',
      },
      users: {
        u100: 'up to 100 people at the same time at peak',
        u1k: 'up to 1,000 people at the same time at peak',
        u10k: 'up to 10,000 people at the same time at peak',
        u100k: 'up to 100,000 people at the same time at peak',
        u1m: 'more than 100,000 people at the same time at peak',
      },
      uptime: {
        some: 'can be down a few hours a month',
        little: 'needs 99.9% availability (about 45 minutes down a month)',
        minimal: 'needs 99.99% availability (about 4 minutes down a month)',
        region: 'cannot stop even if a whole cloud region fails',
      },
      load: {
        read: 'reads more data than it writes',
        balanced: 'reads and writes data in equal measure',
        write: 'writes more data than it reads',
      },
      live: {
        none: 'needs no live updates',
        push: 'needs to push notifications from the server',
        twoWay: 'needs live two-way communication',
      },
      jobs: {
        none: 'does no heavy background work',
        some: 'does some background work, such as e-mails and reports',
        heavy: 'does a lot of heavy background work, such as video or imports',
      },
      files: {
        none: 'stores no files from people',
        some: 'stores some files people upload',
        many: 'has people’s photos and videos at the core of the product',
      },
      search: {
        none: 'needs no text search',
        filters: 'needs only simple filters',
        fullText: 'needs full text search',
      },
      reach: { country: 'in one country', global: 'in several countries' },
      team: { small: 'one team', teams: 'several teams' },
      sensitive: {
        no: 'There is no sensitive personal or payment data',
        yes: 'There is sensitive personal or payment data, subject to privacy laws',
      },
    },
    answers: 'Answers',
    decision: 'Decision',
    decisionText:
      'We will start with {pieces}. Each piece meets a need described in the context; anything without a concrete need now stays out, with a clear trigger to revisit.',
    why: 'Why each piece',
    reasonPrefix: 'Added because of',
    diagram: 'Diagram',
    consequences: 'Consequences',
    pros: 'Pros',
    cons: 'Cons',
    revisit: 'When to revisit',
    revisitEmpty:
      'Every piece is already part of the architecture; revisit when the answers change.',
    references: 'References',
    referenceTool: 'Architecture sketch (this architecture)',
    referenceArticle: 'How much architecture does your application need?',
    referenceAdr: 'Documenting Architecture Decisions, Michael Nygard',
    referenceMonolith: 'MonolithFirst, Martin Fowler',
    referenceSre: 'Embracing Risk, Site Reliability Engineering (Google)',
    footer: 'Generated by the Architecture sketch',
  },
}

export const architectureCopy: Record<ArticleLocale, ArchitectureCopy> = {
  'pt-BR': ptBR,
  'en-US': enUS,
}

/** The article that explains the tool; the page links to it once it exists. */
export const ARCHITECTURE_ARTICLE_SLUG =
  'quanta-arquitetura-sua-aplicacao-precisa'
