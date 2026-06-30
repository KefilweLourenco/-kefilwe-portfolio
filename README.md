# Kefilwe Lourenço — Portfólio v2.1

> Tecnologia para pessoas.

Conheça meu novo portfólio — construído junto com a minha carreira, não separado dela. Esse projeto é a segunda versão do meu portfólio pessoal, e nasceu de uma pergunta simples: como mostrar quem eu sou como desenvolvedor sem fingir que minha trajetória começou num curso de programação?

A resposta foi tratar a página como uma narrativa, não como um menu.

---

## Sobre este projeto

Essa é a **versão 2.1** do meu portfólio, evoluída a partir da v2.0.

A primeira versão era um site estático simples, com a estrutura clássica de "cards de projeto" — funcional, mas genérico, do tipo que qualquer dev júnior monta seguindo um tutorial.

A v2.0 foi um experimento de design e engenharia ao mesmo tempo — layout editorial, tema claro/escuro, conteúdo separado da estrutura. A v2.1 adiciona a camada de comunidade: qualquer pessoa que trabalhou comigo pode enviar uma recomendação diretamente pelo site, com moderação manual antes de publicar.

## Por que essa paleta

A identidade visual do projeto se chama **"Tinta & Sálvia"**: um fundo de tinta escura combinado com verde-sálvia como cor de destaque.

A escolha não foi estética por si só. Antes de programar, eu já trabalhava ensinando tecnologia para pessoas em pontos de partida muito diferentes — de adolescentes a pessoas 60+. Acessibilidade e clareza sempre foram parte do meu trabalho, não um requisito que se adiciona depois.

O verde-sálvia entrou exatamente por isso: é uma cor de baixo contraste agressivo, fácil de manter legível em modo claro e escuro, e que remete a algo orgânico e calmo — o oposto da estética "tech neon" que normalmente sinaliza "isso aqui é feito por um programador". A tinta escura de fundo dá o peso editorial, tipo página impressa, reforçando que isso é uma narrativa para ser lida, não um dashboard para ser escaneado.

As cores são definidas como CSS custom properties em `globals.css` — isso garante que toda a troca de tema (claro/escuro) acontece em um único lugar, sem duplicar regras de estilo nos componentes.

## O que tem neste projeto

```
app/
  layout.tsx              → metadata, fontes, OpenGraph
  page.tsx                → ordem das seções da página
  globals.css             → tokens de design em CSS custom properties
  icon.svg                → favicon (logo KF)
  recomendar/
    page.tsx              → rota /recomendar com formulário de recomendação
    actions.ts            → Server Action: validação, rate limit, Supabase, Resend

components/
  Header.tsx              → marca + alternância de tema claro/escuro
  Hero.tsx                → abertura, com foto de perfil em tratamento editorial
  Process.tsx             → como eu trabalho (Compreender → Estruturar → Construir)
  PhotoStory.tsx          → componente reutilizável de foto + texto editorial
  ProjectChapter.tsx      → projeto em destaque, narrado, não em formato card
  TrajectoryStack.tsx     → trajetória profissional + stack técnico por época
  Recommendations.tsx     → Server Component: lista recomendações aprovadas do Supabase
  RecommendForm.tsx       → formulário de recomendação com avatar customizável
  Avatar.tsx              → avatar SVG gerado dinamicamente (3 estilos × 5 tons de pele)
  AvatarPicker.tsx        → seletor interativo de estilo de cabelo e tom de pele
  Contact.tsx             → contato
  CursorDot.tsx           → bolinha animada no cursor, respeita prefers-reduced-motion
  ThemeToggle.tsx         → botão de alternância claro/escuro
  ThemeProvider.tsx       → wrapper do next-themes, define modo escuro como padrão

lib/
  data.ts                 → todo o conteúdo (textos, links, dados) do site
  supabase.ts             → cliente Supabase server-only (service role, import "server-only")

public/
  images/                 → fotos editoriais (.webp, .jpg) e prints de projetos
  docs/                   → currículo em PDF
```

### Stack técnico

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS + CSS custom properties |
| Tipografia | Space Grotesk · Public Sans · JetBrains Mono |
| Tema | next-themes (modo escuro como padrão) |
| Banco de dados | Supabase (PostgreSQL + RLS) |
| E-mail | Resend |
| Validação | Zod |
| Deploy | Vercel |

### O que é novo na v2.1 — Sistema de Recomendações

A v2.1 adiciona um fluxo completo de recomendações de colegas e ex-alunos, sem dependência de plataformas externas como LinkedIn.

**Fluxo:**
1. Visitante acessa `/recomendar`, preenche o formulário e escolhe um avatar personalizado
2. A recomendação é salva no Supabase com `approved = false`
3. Recebo uma notificação por e-mail via Resend
4. Após aprovação manual no painel do Supabase (`approved = true`), o depoimento aparece na seção "Na voz de quem conhece"

**Avatar customizável:**
- 3 estilos de cabelo: Liso, Crespo, Locs
- 5 tons de pele: Branca, Amarela, Morena, Parda, Retinta
- Avatar SVG gerado inteiramente no cliente, sem imagens externas
- Preview em tempo real conforme a seleção muda

**Segurança implementada:**
- `import "server-only"` em `lib/supabase.ts` — chave de serviço nunca vaza para o cliente
- Honeypot anti-bot (campo oculto `website`)
- Rate limiting: máximo 3 envios por IP por hora, verificado via Supabase
- IP armazenado apenas como SHA-256 hash — nunca o IP real
- Validação com Zod no servidor (sanitização de HTML em todos os campos de texto)
- RLS no Supabase: leitura pública apenas de `approved = true`; inserção permitida; update/delete bloqueados
- Regex estrita para URL do LinkedIn

### Decisões técnicas que valem ser destacadas

- **Conteúdo separado de componente.** Nenhum componente tem texto fixo em português direto no JSX — tudo vem de `lib/data.ts`.

- **Um componente, vários usos.** `PhotoStory.tsx` é usado nas três seções de foto+texto da página, recebendo dados diferentes via props. A prop `reverse` inverte a ordem foto/texto para alternar o ritmo visual.

- **Capítulo único em vez de grid de cards.** A seção de projeto em destaque (`ProjectChapter.tsx`) narra o PeopleCore em texto corrido — uma escolha editorial deliberada.

- **Imagens otimizadas em dois níveis.** Os arquivos estão em WebP (comprimidos com `sharp` — `presencial.png` caiu de 4,9 MB para 142 KB). Em runtime, o `<Image>` do Next.js serve o tamanho exato para cada dispositivo via `sizes`.

- **Cursor dot acessível.** A bolinha verde usa `requestAnimationFrame`, some sobre texto legível, e é desativada com `prefers-reduced-motion`.

- **Server Action com `useActionState`.** O formulário de recomendação não usa fetch manual — toda a comunicação cliente↔servidor passa pela Server Action `submitRecommendation`, com estado gerenciado pelo hook `useActionState` do React 19.

- **Recomendações como Server Component.** `Recommendations.tsx` busca os dados diretamente no Supabase no servidor, sem estado no cliente, sem loading spinner, sem SWR.

## O que esse projeto representa pra mim

Sou instrutor de tecnologia e inclusão digital desde 2019, e estou cursando Psicologia em paralelo à minha formação Full Stack pela Generation Brasil. Esse portfólio é o primeiro projeto em que tentei, de propósito, trazer essas três coisas pra um lugar só: a parte técnica, a didática de quem já ensina, e a atenção a como uma pessoa real vai sentir a experiência de usar o que eu construí — não só se vai "funcionar".

Ainda sou júnior, e esse projeto também é um registro de aprendizado: a estrutura mudou várias vezes até eu entender o que realmente significava "componentizar" — não é só dividir HTML em arquivos diferentes, é separar o que muda (conteúdo) do que não muda (estrutura/visual).

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RECOMMENDATIONS_EMAIL_TO=
```

Consulte `.env.local.example` para referência. Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` ou `RESEND_API_KEY` no cliente.

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
3. Adicione as variáveis de ambiente no painel da Vercel (Settings → Environment Variables).
4. A Vercel detecta Next.js automaticamente — não precisa configurar mais nada.
5. Cada push na branch principal gera um novo deploy automático.

## Acessibilidade

- Skip link ("Pular para o conteúdo") e foco visível em todos os elementos interativos
- Hierarquia de headings coerente (h1 → h2 → h3), sem saltos
- Contraste AA verificado nos dois temas
- HTML semântico (`<main>`, `<section>`, `aria-labelledby`, headings ocultos com `sr-only`)
- Cursor dot desativado via `prefers-reduced-motion`
- Formulário de recomendação com `aria-label` e labels visíveis em todos os campos

## Contato

- E-mail: kefilwebr@hotmail.com
- LinkedIn: [/in/kefilwe-lourenco](https://www.linkedin.com/in/kefilwe-lourenco/)
