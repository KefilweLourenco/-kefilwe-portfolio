// lib/data.ts — única fonte de verdade do conteúdo do portfólio.
// Para editar textos, imagens ou links, mexa só aqui.

type StackItem = { name: string; slug?: string; color?: string };
// slug e color são opcionais: itens sem ícone no Simple Icons ficam só com texto.

export const processSteps = [
  // Os três passos aparecem na seção "Process" logo abaixo do Hero.
  {
    number: "01",
    title: "Compreender",
    description: "Entendo pessoas, contexto e problema antes de escrever código.",
  },
  {
    number: "02",
    title: "Estruturar",
    description: "Organizo ideias em soluções claras e sustentáveis.",
  },
  {
    number: "03",
    title: "Construir",
    description: "Transformo soluções em software acessível e funcional.",
  },
];

export const photoStories = [
  // Cada item vira uma seção PhotoStory na página.
  // reverse: true inverte a ordem (foto à direita, texto à esquerda).
  // slug vira o id da seção — usado para ancoragem via href="#presencial".
  {
    slug: "presencial",
    title: "Compreender.",
    description:
      "Ensinar mudou minha forma de enxergar tecnologia. Antes de aprender linguagens de programação, aprendi que toda tecnologia existe para tornar algo mais compreensível. O desenvolvimento de software foi uma consequência desse caminho.",
    image: "/images/photos/presencial.webp",
    alt: "Kefilwe ensinando tecnologia presencialmente",
    reverse: false,
    captionNumber: "01",
    caption: "Toda tecnologia nasce da busca por compreender.",
  },
  {
    slug: "remoto",
    title: "Estruturar.",
    description:
      "A tecnologia mudou o ambiente de ensino, mas não o objetivo. Aprendi a organizar conteúdos, adaptar linguagens e estruturar experiências para que diferentes pessoas continuassem aprendendo.",
    image: "/images/photos/remoto.jpg",
    alt: "Sessão remota de educação financeira: instrutor com headset e participantes conectados",
    reverse: true, // foto à direita para alternar o ritmo visual
    captionNumber: "02",
    caption: "Mudam as ferramentas. O cuidado permanece.",
  },
];

// Capítulo único de projeto — não é grid de cards, é narrativa editorial.
// closingParts e closingParts2 são parágrafos com links inline;
// cada item { type: "link" } vira um <a>, { type: "text" } vira texto puro.
export const featuredProject = {
  paragraphs: [
    "Foi esse jeito de ensinar, com cuidado e sem pressa, que levei para o código quando decidi aprender programação.",
  ],
  image: "/images/projects/peoplecore.webp",
  alt: "Tela inicial do sistema PeopleCore",
  captionLabel: "PeopleCore",
  captionTech: "React • TypeScript • NestJS • PostgreSQL",
  link: { label: "Ver o projeto", href: "https://people-core-front.vercel.app/" },
  closingParts: [
    { type: "text" as const, value: "Na formação Full Stack JavaScript da Generation Brasil, onde também fui representante de turma, desenvolvi projetos em equipe e individuais. Atuei como Product Owner no " },
    { type: "link" as const, value: "Save Drive", href: "https://save-drive-front.vercel.app/" },
    { type: "text" as const, value: ", uma plataforma de seguro automotivo, e participei do desenvolvimento do " },
    { type: "link" as const, value: "PeopleCore", href: "https://people-core-front.vercel.app/" },
    { type: "text" as const, value: ", projeto final avaliado com nota máxima." },
  ],
  closingParts2: [
    { type: "text" as const, value: "No front-end, fui responsável pela Home, pela refatoração das rotas e pela configuração do fallback da Vercel. No back-end, implementei a autenticação com JWT. Também desenvolvi uma " },
    { type: "link" as const, value: "aplicação de previsão do tempo", href: "https://kefilwelourenco.github.io/app-meteorologia/" },
    { type: "text" as const, value: " como projeto individual." },
  ],
  githubLine: [
    { type: "text" as const, value: "Veja os projetos no " },
    { type: "link" as const, value: "GitHub ↗", href: "https://github.com/KefilweLourenco" },
    { type: "text" as const, value: "." },
  ],
};

export const timeline = [
  // Os itens aparecem na coluna esquerda do TrajectoryStack, de cima pra baixo.
  {
    date: "2026",
    title: "Desenvolvedor Full Stack JavaScript — Generation Brasil",
    description:
      "Formação intensiva com projetos práticos, metodologias ágeis e desenvolvimento de aplicações full stack.",
  },
  {
    date: "2025 — Atual",
    title: "Psicologia",
    description:
      "Estudo Psicologia para compreender como as pessoas aprendem, interagem e utilizam tecnologia. Meu interesse em neurociência, acessibilidade e experiência do usuário influencia diretamente a forma como construo software.",
  },
  {
    date: "2019 — Atual",
    title: "Instrutor de Tecnologia e Inclusão Digital",
    description:
      "Ensino tecnologia para diferentes públicos, utilizando linguagem simples, acessibilidade e metodologias adaptadas para tornar o aprendizado mais claro e acessível.",
  },
];

// Stack agrupado por era (período de uso), não por categoria técnica.
// slug é o identificador no Simple Icons (cdn.simpleicons.org/<slug>/<color>).
// Itens sem slug aparecem só com texto — não existe ícone disponível para eles.
export const stackEras: { label: string; items: StackItem[] }[] = [
  {
    label: "Tecnologia aplicada à educação, 2019 — atual",
    items: [
      { name: "Google Meet" },
      { name: "Canva", slug: "canva", color: "00C4CC" },
      { name: "Microsoft 365", slug: "microsoft365", color: "D83B01" },
      { name: "Field Service" },
      { name: "Suporte Técnico" },
    ],
  },
  {
    label: "Generation Brasil, 2026",
    items: [
      { name: "React", slug: "react", color: "61DAFB" },
      { name: "TypeScript", slug: "typescript", color: "3178C6" },
      { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
      { name: "HTML", slug: "html5", color: "E34F26" },
      { name: "CSS", slug: "css", color: "1572B6" },
      { name: "Vite", slug: "vite", color: "646CFF" },
      { name: "NestJS", slug: "nestjs", color: "E0234E" },
      { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
      { name: "Swagger", slug: "swagger", color: "85EA2D" },
      { name: "Jest", slug: "jest", color: "C21325" },
      { name: "MySQL", slug: "mysql", color: "4479A1" },
      { name: "Prisma", slug: "prisma", color: "A8A8A8" },
      { name: "Git", slug: "git", color: "F05032" },
      { name: "GitHub", slug: "github", color: "A8A8A8" },
      { name: "Figma", slug: "figma", color: "F24E1E" },
      { name: "Vercel", slug: "vercel", color: "A8A8A8" },
      { name: "Insomnia", slug: "insomnia", color: "4000BF" },
      { name: "JWT" },
    ],
  },
];

// testimonial usa o mesmo componente PhotoStory das fotos 01 e 02.
// reverse: false mantém a foto à esquerda, igual à foto 01.
export const testimonial = {
  title: "Construir.",
  description:
    "Quando alguém aprende, todo mundo ganha. Cada conquista representa um caminho construído em conjunto, e é esse impacto que continuo buscando através da tecnologia.",
  image: "/images/photos/testemunho.jpg",
  alt: "Conversa real: aluna escreve 'Eu consegui', e a colega responde 'Eu também consegui! Tô muito feliz'",
  captionNumber: "03",
  caption: "Quando alguém aprende, todo mundo ganha.",
  reverse: false,
};

export const contact = {
  email: "kefilwebr@hotmail.com",
  linkedin: "https://www.linkedin.com/in/kefilwe-lourenco/",
  linkedinLabel: "/in/kefilwe-lourenco",
  github: "https://github.com/KefilweLourenco",
  githubLabel: "/KefilweLourenco",
};
