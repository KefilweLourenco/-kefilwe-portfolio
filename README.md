# Kefilwe Lourenço — Portfólio v2.0

> Tecnologia para pessoas.

Conheça meu novo portfólio — construído junto com a minha carreira, não separado dela. Esse projeto é a segunda versão do meu portfólio pessoal, e nasceu de uma pergunta simples: como mostrar quem eu sou como desenvolvedor sem fingir que minha trajetória começou num curso de programação?

A resposta foi tratar a página como uma narrativa, não como um menu.

---

## Sobre este projeto

Essa é a **versão 2.0** do meu portfólio. A primeira versão era um site estático simples, com a estrutura clássica de "cards de projeto" — funcional, mas genérico, do tipo que qualquer dev júnior monta seguindo um tutorial.

Essa versão é um experimento de design e de engenharia ao mesmo tempo:

- **Design**: em vez de grids e cards repetidos, a página é lida como uma composição editorial — quase uma revista. Cada seção é um "parágrafo" visual, não uma caixa isolada. Isso significou testar (e descartar) vários formatos — grid estático, zigue-zague de cards, lista contínua — até chegar num layout que conta uma história em vez de listar informações.

- **Engenharia**: o front-end é construído com **Next.js (App Router)**, TypeScript e Tailwind CSS, com o conteúdo do site inteiro centralizado em um único arquivo de dados — separado da lógica visual dos componentes, pra eu poder editar texto sem tocar em estilo (e vice-versa).

## Por que essa paleta

A identidade visual do projeto se chama **"Tinta & Sálvia"**: um fundo de tinta escura combinado com verde-sálvia como cor de destaque.

A escolha não foi estética por si só. Antes de programar, eu já trabalhava ensinando tecnologia para pessoas em pontos de partida muito diferentes — de adolescentes a pessoas 60+. Acessibilidade e clareza sempre foram parte do meu trabalho, não um requisito que se adiciona depois.

O verde-sálvia entrou exatamente por isso: é uma cor de baixo contraste agressivo, fácil de manter legível em modo claro e escuro, e que remete a algo orgânico e calmo — o oposto da estética "tech neon" que normalmente sinaliza "isso aqui é feito por um programador". A tinta escura de fundo dá o peso editorial, tipo página impressa, reforçando que isso é uma narrativa para ser lida, não um dashboard para ser escaneado.

As cores são definidas como CSS custom properties em `globals.css` — isso garante que toda a troca de tema (claro/escuro) acontece em um único lugar, sem duplicar regras de estilo nos componentes.

## O que tem neste projeto

```
app/
  layout.tsx          → metadata, fontes (Space Grotesk, Public Sans, JetBrains Mono), OpenGraph
  page.tsx            → ordem das seções da página
  globals.css         → tokens de design (cores, espaçamento) em CSS custom properties
  icon.svg            → favicon (logo KF)

components/
  Header.tsx          → marca + alternância de tema claro/escuro
  Hero.tsx            → abertura, com foto de perfil em tratamento editorial
  Process.tsx         → como eu trabalho (Compreender → Estruturar → Construir)
  PhotoStory.tsx      → componente reutilizável de foto + texto editorial
                        (usado em 3 seções diferentes da página)
  ProjectChapter.tsx  → projeto em destaque, narrado, não em formato card
  TrajectoryStack.tsx → trajetória profissional + stack técnico por época
  Contact.tsx         → contato
  CursorDot.tsx       → bolinha animada no cursor, some sobre texto, respeita prefers-reduced-motion
  ThemeToggle.tsx     → botão de alternância claro/escuro
  ThemeProvider.tsx   → wrapper do next-themes, define modo escuro como padrão

lib/
  data.ts             → todo o conteúdo (textos, links, dados) do site,
                        separado dos componentes

public/
  images/             → fotos editoriais (.webp, .jpg) e prints de projetos
  docs/               → currículo em PDF
```

### Stack técnico

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS + CSS custom properties |
| Tipografia | Space Grotesk · Public Sans · JetBrains Mono |
| Tema | next-themes (modo escuro como padrão) |
| Ícones de stack | Simple Icons (CDN) |
| Deploy | Vercel |

### Decisões técnicas que valem ser destacadas

- **Conteúdo separado de componente.** Nenhum componente tem texto fixo em português direto no JSX — tudo vem de `lib/data.ts`. Isso significa que eu posso editar o conteúdo do site inteiro sem tocar em uma linha de CSS ou de lógica, e vice-versa.

- **Um componente, vários usos.** `PhotoStory.tsx` é usado nas três seções de foto+texto da página (aula presencial, aula remota e o depoimento de uma aluna), recebendo dados diferentes via props — em vez de copiar e colar o mesmo bloco de JSX três vezes com pequenas variações. A prop `reverse` inverte a ordem foto/texto para alternar o ritmo visual.

- **Capítulo único em vez de grid de cards.** A seção de projeto em destaque (`ProjectChapter.tsx`) narra o PeopleCore em texto corrido, com os outros projetos citados como links inline — uma escolha editorial deliberada, não a estrutura padrão de "cards de portfólio".

- **Imagens otimizadas em dois níveis.** Os arquivos estão em WebP (comprimidos com `sharp` antes do deploy — `presencial.png` caiu de 4,9 MB para 142 KB). Em runtime, o componente `<Image>` do Next.js serve o tamanho exato para cada dispositivo via `sizes`.

- **Cursor dot acessível.** A bolinha verde que segue o mouse usa `requestAnimationFrame` para não travar o scroll, some automaticamente sobre texto legível, e é completamente desativada se o sistema operacional do usuário tiver "reduzir movimento" ativado (`prefers-reduced-motion`).

> O PeopleCore — projeto em destaque nesta página — é onde entram decisões de back-end como segurança com JWT e fallback de rotas na Vercel. Esse portfólio em si é um site estático front-end, sem back-end próprio.

## O que esse projeto representa pra mim

Sou instrutor de tecnologia e inclusão digital desde 2019, e estou cursando Psicologia em paralelo à minha formação Full Stack pela Generation Brasil. Esse portfólio é o primeiro projeto em que tentei, de propósito, trazer essas três coisas pra um lugar só: a parte técnica, a didática de quem já ensina, e a atenção a como uma pessoa real vai sentir a experiência de usar o que eu construí — não só se vai "funcionar".

Ainda sou júnior, e esse projeto também é um registro de aprendizado: a estrutura mudou várias vezes até eu entender o que realmente significava "componentizar" — não é só dividir HTML em arquivos diferentes, é separar o que muda (conteúdo) do que não muda (estrutura/visual).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para acessar de outro dispositivo na mesma rede (ex: celular):

```bash
npm run dev -- -H 0.0.0.0
```

Descubra seu IP local com `ipconfig` (Windows) e acesse `http://<seu-ip>:3000`.

## Deploy na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Em vercel.com → "Add New Project" → importe o repositório.
3. A Vercel detecta Next.js automaticamente — não precisa configurar nada.
4. Cada push na branch principal gera um novo deploy automático.

## Acessibilidade

- Skip link ("Pular para o conteúdo") e foco visível em todos os elementos interativos
- Hierarquia de headings coerente (h1 → h2 → h3), sem saltos
- Contraste AA verificado nos dois temas
- HTML semântico (`<main>`, `<section>`, `aria-labelledby`, headings ocultos com `sr-only` quando o título visual já existe em outro elemento)
- Cursor dot desativado via `prefers-reduced-motion`

## Contato

- E-mail: kefilwebr@hotmail.com
- LinkedIn: [/in/kefilwe-lourenco](https://www.linkedin.com/in/kefilwe-lourenco/)
