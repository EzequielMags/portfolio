// Conteúdo do estudo de caso do FinancerAI, tirado do README do repositório.

export const financerAiCase = {
  name: 'FinancerAI',
  status: 'Em desenvolvimento' as const,
  lead: 'Controle financeiro pessoal por mensagem. Você escreve como fala, e a IA registra a receita ou a despesa na categoria certa.',
  facts: [
    { label: 'Meu papel', value: 'Node.js, IA e integrações' },
    { label: 'Equipe', value: '3 pessoas, projeto acadêmico' },
    { label: 'Stack', value: 'React, Node.js, Java, PostgreSQL, Gemini' },
  ],
  repoUrl: 'https://github.com/EzequielMags/FinancerAI',
  problem:
    'Registrar receitas e despesas costuma exigir planilhas ou sistemas cheios de formulários. O FinancerAI troca esse preenchimento manual por uma mensagem de texto comum.',
  steps: [
    'A pessoa envia uma mensagem, como “Gastei R$ 50 no Uber”.',
    'O backend em Node.js valida a mensagem e pede à IA que a interprete.',
    'A IA devolve os dados estruturados.',
    'O backend em Java aplica as regras de negócio e grava no PostgreSQL.',
    'O dashboard em React mostra o saldo e os relatórios atualizados.',
  ],
  myPart:
    'Cuido do processamento das mensagens em Node.js com Fastify: a integração com a IA, a conversão de linguagem natural em dados e a comunicação com o backend em Java. Também respondo pelas próximas integrações com o WhatsApp.',
  statusText: 'Em desenvolvimento, em sprints incrementais.',
  statusDetail: '[O que já funciona de ponta a ponta]',
  learnings: '[Aprendizados sobre integração de IA e trabalho em equipe]',
  next: {
    label: 'Próximo: Gerenciamento de Usuários',
    href: 'https://github.com/EzequielMags/Gerenciamento-De-Usuarios',
  },
};
