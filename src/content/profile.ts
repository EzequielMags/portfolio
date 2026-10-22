// Dados pessoais e de contato. Textos entre colchetes são placeholders
// e aparecem destacados em rosa na interface até serem trocados.

export const profile = {
  firstName: 'Ezequiel',
  lastName: 'Magoga',
  role: 'Desenvolvedor Full Stack',
  lookingFor: 'primeira vaga como júnior',
  heroStack: ['React', 'Node.js'],
  summary:
    'Procuro minha primeira oportunidade como desenvolvedor full stack júnior, com foco em JavaScript, React e Node.js. Curso Sistemas de Informação na Faculdade Impacta e também estudo design de interfaces, com Figma, UX/UI e design system.',
  // PDF servido a partir de public/. Use null para esconder o botão.
  resumeUrl: '/curriculo-ezequiel-magoga.pdf' as string | null,
  contact: {
    intro: 'Estou buscando minha primeira vaga como desenvolvedor full stack júnior.',
    email: 'ezequielmagoga07@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ezequiel-magoga',
    github: 'https://github.com/EzequielMags',
  },
};

export const fullName = `${profile.firstName} ${profile.lastName}`;
