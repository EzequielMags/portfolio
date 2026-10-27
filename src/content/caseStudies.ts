import type { ProjectStatus } from './projects';

export interface CaseStudySection {
  id: string;
  title: string;
  // Parágrafos, uma lista simples ou passos numerados; textos entre colchetes são placeholders.
  paragraphs?: string[];
  list?: string[];
  steps?: string[];
}

export interface CaseStudy {
  slug: string;
  name: string;
  status?: ProjectStatus;
  lead: string;
  facts: { label: string; value: string }[];
  repoUrl?: string;
  visual: 'pipeline' | 'message-demo';
  sections: CaseStudySection[];
  next: { label: string; href: string; internal?: boolean };
}

export const caseStudies: CaseStudy[] = [
  // Ayni: tirado do HANDOFF, do AGENTS.md e da documentação oficial do projeto.
  {
    slug: 'ayni',
    name: 'Ayni',
    status: 'Em desenvolvimento',
    lead: 'Um CRM com IA no centro para quem vende serviços de tecnologia, do primeiro contato ao contrato. O primeiro público são freelancers e pequenos estúdios que vendem sites.',
    facts: [
      { label: 'Meu papel', value: 'Núcleo e plataforma' },
      { label: 'Equipe', value: '2 pessoas, startup' },
      { label: 'Stack', value: 'React, TypeScript, Supabase, Zod' },
    ],
    visual: 'pipeline',
    sections: [
      {
        id: 'problema',
        title: 'O problema',
        paragraphs: [
          'Quem vende sites e projetos de tecnologia costuma perder vendas por coisas simples, e os CRMs genéricos não foram pensados para esse tipo de venda:',
        ],
        list: [
          'Lead respondido tarde e follow-up esquecido.',
          'Vendas controladas em planilha ou na cabeça do dono.',
          'Prospecção que consome horas.',
          'Demora para montar briefing, protótipo e proposta.',
        ],
      },
      {
        id: 'solucao',
        title: 'A solução',
        paragraphs: [
          'Um chat com IA é a interface principal. A IA atende leads, cadastra, sugere horários e prepara rascunhos, enquanto o lead avança por um funil fixo, da primeira conversa ao contrato.',
          'A IA age, mas não decide sozinha o que é sensível: preço, proposta, contrato e prospecção passam por aprovação humana, e ela sempre se apresenta como IA.',
        ],
      },
      {
        id: 'arquitetura',
        title: 'Arquitetura',
        list: [
          'Monólito modular num monorepo pnpm: o app em React, um pacote compartilhado de tipos e contratos e o backend no Supabase (Postgres, Auth e Edge Functions).',
          'Cada módulo é dono das suas tabelas, e os dados de cada cliente ficam isolados por workspace com Row Level Security.',
          'Os módulos conversam por contratos tipados com Zod e com mocks, para os dois devs trabalharem em paralelo sem esperar um pelo outro.',
          'A IA nunca escreve direto no banco: usa as funções do núcleo. Texto vindo de lead, e-mail ou site é tratado como dado, nunca como instrução, para evitar prompt injection.',
        ],
      },
      {
        id: 'minha-parte',
        title: 'Minha parte',
        paragraphs: [
          'Sou responsável pelo núcleo e pela plataforma: contas e workspaces, funil de vendas, agenda, notificações, cobrança e o painel de administração.',
          'Até aqui, criei o monorepo e escrevi as regras e as skills que guiam os agentes de IA no projeto.',
        ],
      },
      {
        id: 'ia-no-dev',
        title: 'IA no desenvolvimento',
        paragraphs: [
          'Cada dev trabalha com um agente de IA (Claude Code e Antigravity), e os dois seguem o mesmo arquivo de regras do projeto. Cada tarefa tem critérios de aceite, e há skills para os passos repetidos: começar uma tarefa, criar uma migration com RLS, criar uma Edge Function, mudar um contrato e conferir a definição de pronto antes de cada push.',
        ],
      },
    ],
    next: { label: 'Próximo: FinancerAI', href: '/projetos/financerai', internal: true },
  },
  // FinancerAI: tirado do README do repositório.
  {
    slug: 'financerai',
    name: 'FinancerAI',
    status: 'Em desenvolvimento',
    lead: 'Controle financeiro pessoal por mensagem. Você escreve como fala, e a IA registra a receita ou a despesa na categoria certa.',
    facts: [
      { label: 'Meu papel', value: 'Node.js, IA e integrações' },
      { label: 'Equipe', value: '3 pessoas, projeto acadêmico' },
      { label: 'Stack', value: 'React, Node.js, Java, PostgreSQL, Gemini' },
    ],
    repoUrl: 'https://github.com/EzequielMags/FinancerAI',
    visual: 'message-demo',
    sections: [
      {
        id: 'problema',
        title: 'O problema',
        paragraphs: [
          'Registrar receitas e despesas costuma exigir planilhas ou sistemas cheios de formulários. O FinancerAI troca esse preenchimento manual por uma mensagem de texto comum.',
        ],
      },
      {
        id: 'como-funciona',
        title: 'Como funciona',
        steps: [
          'A pessoa envia uma mensagem, como “Gastei R$ 50 no Uber”.',
          'O backend em Node.js valida a mensagem e pede à IA que a interprete.',
          'A IA devolve os dados estruturados.',
          'O backend em Java aplica as regras de negócio e grava no PostgreSQL.',
          'O dashboard em React mostra o saldo e os relatórios atualizados.',
        ],
      },
      {
        id: 'minha-parte',
        title: 'Minha parte',
        paragraphs: [
          'Cuido do processamento das mensagens em Node.js com Fastify: a integração com a IA, a conversão de linguagem natural em dados e a comunicação com o backend em Java. Também respondo pelas próximas integrações com o WhatsApp.',
        ],
      },
    ],
    next: {
      label: 'Próximo: Gerenciamento de Usuários',
      href: 'https://github.com/EzequielMags/Gerenciamento-De-Usuarios',
    },
  },
];

export function findCaseStudy(slug: string | undefined) {
  return caseStudies.find((study) => study.slug === slug);
}
