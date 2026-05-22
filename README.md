# Neural HUD Portfolio — Luiz Wessel

Portfolio pessoal modernizado com animações avançadas.

## 🚀 Deploy na Vercel

O site é estático: o `index.html` na raiz é servido diretamente, sem build.

### Opção 1 — Dashboard (recomendado)

1. Faça push deste repositório para o GitHub (ou GitLab / Bitbucket)
2. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório
3. Mantenha as configurações padrão:
   - **Framework Preset:** Other
   - **Root Directory:** `.` (raiz)
   - **Build Command:** vazio
   - **Output Directory:** `.` (raiz)
4. Clique em **Deploy**

Após o deploy, a Vercel gera uma URL de produção (`https://<projeto>.vercel.app`). Cada push na branch principal atualiza o site; pull requests recebem URLs de preview automaticamente.

### Opção 2 — CLI

```bash
npm i -g vercel
vercel          # primeiro deploy (preview)
vercel --prod   # produção
```

Na primeira execução, faça login e vincule o projeto ao repositório Git, se quiser deploys automáticos a cada push.

### Domínio personalizado

Em **Project → Settings → Domains**, adicione seu domínio e siga as instruções de DNS da Vercel.

## 📁 Estrutura

```
index.html          ← arquivo principal (tudo inline, abre direto no browser)
src/
  portfolio-data.js     ← conteúdo EN/PT (projetos, skills, textos)
  portfolio-shared.jsx  ← nav, hero, componentes compartilhados
  portfolio-sections.jsx← projetos, skills, sobre, contato
  Portfolio.html        ← versão modular (precisa de servidor)
  wessel.png            ← foto de perfil
```

## ✏️ Como editar conteúdo

Edite `src/portfolio-data.js` e depois rode o rebuild:

1. Abra `src/Portfolio.html` em um servidor local (ex: `npx serve src/`)
2. Edite os arquivos `.jsx` e `.js` conforme necessário
3. Para gerar novo bundle, copie o conteúdo dos 3 arquivos inline no `index.html`

Ou edite diretamente o `index.html` buscando os textos pelo conteúdo.

## ⚡ Tecnologias

- React 18 + Babel (inline, sem build)
- Space Grotesk + JetBrains Mono
- Canvas API (partículas)
- CSS Animations (glitch, orbit, scan, char stagger)
- Intersection Observer (scroll reveals)
