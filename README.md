# Neural HUD Portfolio — Luiz Wessel

Portfolio pessoal com visual de interface neural/HUD: animações, partículas em canvas, tipografia mono + sans e seções de projetos, skills, hackathons, sobre e contato. Conteúdo bilíngue (EN/PT), com idioma persistido entre visitas.

Aplicação React 18 com build via **Vite** — sem dependências carregadas via CDN em produção, com bundle minificado e otimizado.

🔗 Produção: [wesselproject.vercel.app](https://wesselproject.vercel.app)

## 📁 Estrutura

```
index.html                 ← template HTML (entry point do Vite: meta tags, SEO, JSON-LD)
public/
  robots.txt                ← diretivas para crawlers
  sitemap.xml                ← mapa do site
  og-banner.png              ← imagem de preview ao compartilhar o link (og:image)
src/
  main.jsx                   ← ponto de entrada React (mount + utilitários globais)
  App.jsx                    ← componente raiz, contexto de idioma (com persistência em localStorage)
  context.js                 ← LangContext (React Context de idioma)
  data.js                    ← todo o conteúdo textual, projetos, skills e hackathons (EN/PT)
  styles.css                 ← design system em CSS puro (variáveis, animações, componentes)
  assets/
    wessel.png                ← foto de perfil (asset real, processado pelo pipeline do Vite)
  components/
    Shared.jsx                 ← NavBar, Hero, ProfilePhoto, TechBadge, SectionHeader, LangToggle
    Sections.jsx                ← Featured, Projects, Skills, Hackathons, About, Contact
  lib/
    runtime.js                  ← partículas em canvas, cursor customizado, scroll-reveal, text scramble,
                                   count-up — todos respeitam `prefers-reduced-motion`
```

## ⚡ Tecnologias

- React 18 + Vite (build de produção real, sem Babel/React via CDN)
- Space Grotesk + JetBrains Mono
- Canvas API (partículas)
- CSS Animations (glitch, orbit, scan, char stagger) com fallback para `prefers-reduced-motion`
- Intersection Observer (scroll reveals)
- SEO: meta tags Open Graph/Twitter Card, JSON-LD (`schema.org/Person`), `robots.txt`, `sitemap.xml`

## 🚀 Como rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## 📦 Build de produção

```bash
npm run build     # gera a pasta dist/
npm run preview   # serve o build de produção localmente para conferir
```

O deploy é feito no Vercel a partir da branch principal — o Vercel detecta o projeto Vite automaticamente (`npm run build`, output em `dist/`).

## ✏️ Como editar conteúdo

**Textos, projetos, skills, hackathons (EN/PT):** edite `src/data.js`.

**Layout e componentes:** edite os arquivos em `src/components/`. O servidor de desenvolvimento (`npm run dev`) recarrega automaticamente (HMR).

**Estilos globais / animações:** `src/styles.css`.

## ✅ Notas de acessibilidade e SEO

- Animações decorativas (glitch, partículas, cursor customizado, scroll-reveal) são desativadas automaticamente quando o usuário tem `prefers-reduced-motion: reduce` ativado no sistema.
- Idioma escolhido (EN/PT) é persistido via `localStorage` entre visitas.
- Meta tags Open Graph/Twitter e dado estruturado JSON-LD usam a URL de produção (`https://wesselproject.vercel.app`) — se o domínio mudar, atualize as URLs em `index.html`, `public/robots.txt` e `public/sitemap.xml`.
