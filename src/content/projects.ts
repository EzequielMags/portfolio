export type ProjectStatus = 'Em desenvolvimento';

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface Project {
  name: string;
  image?: ProjectImage;
  summary: string;
  stack: string[];
  status?: ProjectStatus;
  role?: string;
  team?: string;
  repoUrl?: string;
  privateRepo?: boolean;
  caseStudyPath?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: 'FinancerAI',
    featured: true,
    status: 'Em desenvolvimento',
    summary:
      'Controle financeiro por mensagem: a IA lê frases como “Gastei R$ 50 no Uber” e as transforma em receitas e despesas organizadas por categoria.',
    role: 'Node.js, integração com IA e com o WhatsApp',
    stack: ['React', 'Node.js (Fastify)', 'Java (Spring Boot)', 'PostgreSQL', 'Google Gemini'],
    team: '3 pessoas, projeto acadêmico',
    repoUrl: 'https://github.com/EzequielMags/FinancerAI',
    caseStudyPath: '/projetos/financerai',
  },
  {
    name: 'Ayni',
    status: 'Em desenvolvimento',
    summary:
      'Startup: um CRM com IA para quem vende serviços de tecnologia, feito em parceria num monorepo, com entregas por fases e agentes de IA (Claude Code) trabalhando em paralelo. Cuido do núcleo da plataforma.',
    stack: ['React', 'TypeScript', 'Supabase', 'monorepo com pnpm'],
    privateRepo: true,
  },
  {
    name: 'ImageCloud',
    summary:
      'Automação que vincula imagens a produtos de um ERP via API, com progresso em tempo real (SSE) e log de resultados para o suporte.',
    stack: ['Node.js', 'Fastify', 'React', 'TypeScript'],
    repoUrl: 'https://github.com/EzequielMags/ImageCloud-InsideAutomacao',
    image: {
      src: '/projetos/imagecloud.webp',
      alt: 'Tela do ImageCloud: campo para o UUID da loja, botão Sincronizar, barra de progresso em 40% e log de produtos com os status Vinculado e Duplicado.',
      caption: 'Design no Figma: sincronização em andamento. Também desenhei as versões de tablet e celular e o guia de cores dos status.',
      width: 1200,
      height: 1002,
    },
  },
  {
    name: 'StudyAI',
    status: 'Em desenvolvimento',
    summary:
      'Plataforma de estudos com IA: matérias, metas, cronogramas personalizados, resumos e exercícios gerados por IA.',
    stack: ['React', 'Fastify', 'PostgreSQL', 'Prisma'],
    repoUrl: 'https://github.com/EzequielMags/StudyAI',
  },
  {
    name: 'Gerenciamento de Usuários',
    summary:
      'Aplicação full stack com API REST e cadastro completo de usuários: criar, listar, editar e excluir.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    repoUrl: 'https://github.com/EzequielMags/Gerenciamento-De-Usuarios',
  },
  {
    name: 'BlogDev',
    summary:
      'Blog que consome a API pública do DEV.to, com busca por título, rotas dinâmicas para cada artigo e página 404.',
    stack: ['React 19', 'React Router', 'Framer Motion'],
    repoUrl: 'https://github.com/EzequielMags/Blog.Dev',
    image: {
      src: '/projetos/blogdev.webp',
      alt: 'Tela inicial do BlogDev no desktop: título, botões Home e About, campo de busca e grade de cards de posts com o botão Ler mais.',
      caption: 'Design no Figma: home no desktop. São 9 telas, com home, post e sobre em celular, tablet e desktop.',
      width: 1200,
      height: 959,
    },
  },
];

export const allReposUrl = 'https://github.com/EzequielMags?tab=repositories';
