export interface SkillGroup {
  title: string;
  items: string[];
  usedIn: string;
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Interface',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Bootstrap'],
    usedIn: 'Usado em Ayni, BlogDev e Gerenciamento de Usuários',
  },
  {
    title: 'Servidor',
    items: ['Node.js', 'Express', 'Fastify', 'Prisma', 'Python', 'PostgreSQL', 'MongoDB', 'Supabase'],
    usedIn: 'Usado em FinancerAI, ImageCloud, StudyAI, Ayni e nas APIs em Python da faculdade',
  },
  {
    title: 'IA no desenvolvimento',
    items: ['Claude Code', 'agentes em paralelo', 'integração com LLMs'],
    usedIn: 'Usado na Ayni, no FinancerAI e no StudyAI',
  },
  {
    title: 'Design',
    items: ['Figma', 'web design', 'UX/UI', 'design system'],
    usedIn:
      'Usado no ImageCloud (fluxo de sincronização e guia de cores em três tamanhos) e no BlogDev (9 telas responsivas)',
  },
  {
    title: 'Ferramentas',
    items: ['Git', 'GitHub'],
    usedIn: 'Todos os projetos versionados; trabalho em equipe no FinancerAI e na Ayni',
  },
];

// Tirado do perfil do currículo.
export const softSkills =
  'Valorizo boas práticas de programação, aprendizado contínuo e crescimento profissional em equipe.';
