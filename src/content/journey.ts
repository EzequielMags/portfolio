import type { ProjectStatus } from './projects';

export interface JourneyItem {
  period: string;
  title: string;
  place: string;
  description?: string;
  status?: ProjectStatus;
  current?: boolean;
}

// Do mais recente para o mais antigo.
export const journey: JourneyItem[] = [
  {
    period: 'out 2026 – atual',
    title: 'Ayni',
    place: 'Startup',
    status: 'Em desenvolvimento',
    current: true,
    description:
      'Um CRM com inteligência artificial para quem vende serviços de tecnologia, do primeiro contato ao contrato. Cuido do núcleo da plataforma: contas, funil de vendas, agenda, notificações e cobrança. Desenvolvo com React, TypeScript e Supabase.',
  },
  {
    period: 'set 2024 – atual',
    title: 'Suporte Técnico & Programador',
    place: 'Inside Automação',
    current: true,
    description: 'Atendimento ao cliente e resolução de problemas técnicos.',
  },
  {
    period: '2024 – cursando',
    title: 'Sistemas de Informação',
    place: 'Faculdade Impacta',
  },
  {
    period: '2023 – cursando',
    title: 'Formações na Alura',
    place:
      'Desenvolvimento Front End (React), Desenvolvimento Back End (Node.js) e Design (web design e Figma)',
  },
];
