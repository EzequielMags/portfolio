# Portfólio — Ezequiel Magoga

Portfólio pessoal em React + Vite + TypeScript. Identidade visual "componente inspecionado": o nome aparece como uma camada selecionada no Figma e pode ser visto também como código.

## Rodar

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # checa tipos e gera dist/
pnpm preview    # serve o build localmente
```

## Onde editar o conteúdo

Todo o texto fica em `src/content/`, sem precisar mexer nos componentes:

| Arquivo | O que tem |
|---|---|
| `profile.ts` | nome, cargo, resumo, contato e link do currículo |
| `projects.ts` | projetos (o `featured: true` vira o destaque) |
| `skills.ts` | competências e soft skills |
| `journey.ts` | trajetória, do mais recente ao mais antigo |
| `caseStudies.ts` | estudos de caso (Ayni e FinancerAI), servidos em `/projetos/<slug>` |

Textos entre colchetes, como `[Soft skills...]`, são placeholders: aparecem em rosa no site até serem trocados.

Para o botão de currículo, coloque o PDF em `public/` e preencha `resumeUrl` em `profile.ts` (ex.: `'/curriculo-ezequiel-magoga.pdf'`).

## Estrutura

```
src/
  content/      textos e dados
  components/   seções da página (Header, Hero, Projects, Skills, Journey, Contact)
  pages/        Home, estudo de caso e 404
  styles/       global.css (paleta e tokens) e animations.css
```

## Paleta Noturno

| Token | Cor | Uso |
|---|---|---|
| `--bg` | `#151927` | fundo |
| `--surface` | `#1D2234` | seções elevadas |
| `--line` | `#2C3247` | divisórias |
| `--text` | `#ECEEF5` | texto |
| `--text-2` | `#A9B0C4` | texto de apoio |
| `--select` | `#7F9BFF` | seleção, links, foco |
| `--measure` | `#FF6F9F` | medidas e placeholders |

## Animações

CSS puro, em `src/styles/animations.css`: abertura do topo, linhas da vista de código, revelação do exemplo do FinancerAI ao rolar (Chrome e Edge) e sublinhado do menu. Tudo fica desligado quando o sistema pede menos movimento (`prefers-reduced-motion`).

## Publicar

O site é estático. Na Vercel ou na Netlify, use `pnpm build` como comando e `dist` como pasta de saída. `vercel.json` e `public/_redirects` já fazem as rotas (como `/projetos/financerai`) funcionarem ao recarregar a página.
