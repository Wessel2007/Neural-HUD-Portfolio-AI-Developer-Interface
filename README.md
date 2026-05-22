# Neural HUD Portfolio — Luiz Wessel

Portfolio pessoal com visual de interface neural/HUD: animações, partículas em canvas, tipografia mono + sans e seções de projetos, skills, sobre e contato. Conteúdo bilíngue (EN/PT).

Site estático em um único `index.html` na raiz — React e Babel rodam inline no browser, sem pipeline de build.

## 📁 Estrutura

```
index.html              ← página publicada (bundle inline)
src/
  portfolio-data.js     ← textos, projetos e skills (EN/PT)
  portfolio-shared.jsx  ← nav, hero e componentes compartilhados
  portfolio-sections.jsx← seções de projetos, skills, sobre e contato
  Portfolio.html        ← versão modular para desenvolvimento local
  wessel.png            ← foto de perfil
```

## ✏️ Como editar conteúdo

**Dados e textos:** edite `src/portfolio-data.js`.

**Layout e componentes:** trabalhe nos `.jsx` em `src/` e visualize com um servidor local, por exemplo:

```bash
npx serve src/
```

Abra `src/Portfolio.html` no browser. Depois de alterar os módulos, copie o conteúdo dos três arquivos (`portfolio-data.js`, `portfolio-shared.jsx`, `portfolio-sections.jsx`) para o bundle inline em `index.html`.

Também é possível editar textos diretamente em `index.html`, buscando pelo conteúdo.

## ⚡ Tecnologias

- React 18 + Babel (inline, sem build)
- Space Grotesk + JetBrains Mono
- Canvas API (partículas)
- CSS Animations (glitch, orbit, scan, char stagger)
- Intersection Observer (scroll reveals)
