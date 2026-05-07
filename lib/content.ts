// ─── Types ────────────────────────────────────────────────────────────────────

export type Lang = "en" | "pt";

export interface ProjectContent {
  title: string;
  category: string;
  problem: string;
  solution: string;
  technologies: string[];
  github: string;
  demo?: string;
  signal: string;
}

export interface SkillContent {
  name: string;
  level: number;
  category: string;
}

export interface StatContent {
  value: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactLink {
  label: string;
  href: string;
  tag: string;
}

// ─── Project Data ─────────────────────────────────────────────────────────────

const EN_PROJECTS: ProjectContent[] = [
  {
    title: "Gate Vision",
    category: "Computer Vision / IoT",
    problem:
      "Condominiums and parking facilities need automated, reliable vehicle access control without manual operator intervention at every entry.",
    solution:
      "Built a full-stack platform combining a YOLO + EasyOCR backend for Mercosul plate detection, a FastAPI service that controls an Arduino gate actuator, and a React admin dashboard backed by Supabase for resident management and access logs.",
    technologies: ["Python", "YOLO", "EasyOCR", "FastAPI", "React", "Supabase", "Arduino"],
    github: "https://github.com/Wessel2007/Gate-Vision",
    signal: "End-to-end CV pipeline from image capture to hardware gate actuation",
  },
  {
    title: "Vehicle Plate Detection",
    category: "Computer Vision",
    problem:
      "Detecting and isolating Brazilian Mercosul license plates in real-world images requires a robust, reusable module before any OCR or access-control logic can run.",
    solution:
      "Trained a YOLOv11 model to locate plate regions, applied CLAHE contrast enhancement, and implemented a fast crop pipeline that feeds clean plate images to downstream OCR — later integrated into Gate Vision.",
    technologies: ["Python", "YOLOv11", "OpenCV", "PyTorch", "NumPy"],
    github: "https://github.com/Wessel2007/deteccao-placas-veiculares",
    signal: "Model training, image preprocessing, and modular detection pipeline",
  },
  {
    title: "Crypto Insight AI",
    category: "Applied AI / Finance",
    problem:
      "Tracking multiple technical indicators across timeframes for different cryptocurrencies is time-consuming and hard to interpret without a unified scoring layer.",
    solution:
      "Built a FastAPI backend that pulls live data via CCXT, computes RSI, EMA, MACD, and volume averages, runs a weighted scoring engine, and calls Claude to generate plain-language market summaries — served through a Next.js dashboard.",
    technologies: ["Python", "FastAPI", "CCXT", "Pandas", "Claude API", "Next.js", "TypeScript"],
    github: "https://github.com/Wessel2007/crypto-insight-ai",
    signal: "Financial data pipelines, indicator scoring, and LLM-powered interpretation",
  },
  {
    title: "Raiz Iguaçu — Hackatour Cataratas 2026",
    category: "Full-Stack Web",
    problem:
      "Community tourism in the Iguaçu region lacks a scalable platform where local producers can list experiences and travelers can discover, book, and review them.",
    solution:
      "Delivered a full-stack platform at Hackatour Cataratas 2026 with experience discovery, producer onboarding, admin dashboard with real-time metrics, physical QR-code totem management, and AI-generated visitor behavior insights.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind", "FastAPI", "PostgreSQL", "shadcn/ui"],
    github: "https://github.com/Wessel2007/Hackatour-Cataratas",
    signal: "Hackathon full-stack delivery: product, backend, and data visualization under pressure",
  },
  {
    title: "Pharm Assist",
    category: "Applied AI",
    problem:
      "Public pharmacy management in Toledo/PR needed an AI-assisted tool to support the city government in tracking and optimizing medication dispensing processes.",
    solution:
      "Collaborative academic project developed with the Biopark AI course for the Prefeitura de Toledo/PR, applying AI techniques to assist pharmacy workflows and reporting.",
    technologies: ["Python", "AI/ML"],
    github: "https://github.com/Wessel2007/Pharm-Assist",
    signal: "Applied AI for public-sector use case, team collaboration, academic integration",
  },
  {
    title: "New AI Invest",
    category: "Web / Finance",
    problem:
      "Investors managing multiple asset classes need a clear view of portfolio drift and a concrete rebalancing plan — without relying on spreadsheets.",
    solution:
      "Built a React SPA with full asset CRUD, configurable target allocations, an automatic rebalancing calculator, interactive Recharts dashboards, and an insights engine that scores portfolio diversification and ranks suggested actions.",
    technologies: ["React", "JavaScript", "Tailwind CSS", "Recharts"],
    github: "https://github.com/Wessel2007/new-ai-invest",
    signal: "Financial logic, custom hooks, and UX-focused dashboard design",
  },
  {
    title: "Neural HUD Portfolio",
    category: "Web Interface",
    problem:
      "Technical portfolios often look polished while failing to communicate engineering judgment, project context, or how problems were actually solved.",
    solution:
      "Designed this recruiter-ready interface in Next.js, framing every project as a structured engineering case study with problem, solution, and implementation signals — built with bilingual support and a HUD-inspired design system.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Wessel2007/Neural-HUD-Portfolio-AI-Developer-Interface",
    signal: "Product thinking, UI systems, bilingual content architecture, and motion design",
  },
];

const PT_PROJECTS: ProjectContent[] = [
  {
    title: "Gate Vision",
    category: "Visão Computacional / IoT",
    problem:
      "Condomínios e estacionamentos precisam de controle de acesso veicular automatizado e confiável, sem intervenção manual a cada entrada.",
    solution:
      "Construí uma plataforma completa combinando backend YOLO + EasyOCR para detecção de placas Mercosul, serviço FastAPI que controla cancela via Arduino, e dashboard administrativo em React com Supabase para gestão de moradores e histórico de acessos.",
    technologies: ["Python", "YOLO", "EasyOCR", "FastAPI", "React", "Supabase", "Arduino"],
    github: "https://github.com/Wessel2007/Gate-Vision",
    signal: "Pipeline de visão computacional ponta a ponta: da câmera à abertura da cancela",
  },
  {
    title: "Detecção de Placas Veiculares",
    category: "Visão Computacional",
    problem:
      "Detectar e isolar placas Mercosul em imagens reais exige um módulo robusto e reutilizável antes de qualquer lógica de OCR ou controle de acesso.",
    solution:
      "Treinei um modelo YOLOv11 para localizar regiões de placa, apliquei realce de contraste CLAHE e implementei um pipeline de recorte eficiente que alimenta o OCR posterior — posteriormente integrado ao Gate Vision.",
    technologies: ["Python", "YOLOv11", "OpenCV", "PyTorch", "NumPy"],
    github: "https://github.com/Wessel2007/deteccao-placas-veiculares",
    signal: "Treinamento de modelo, pré-processamento de imagem e pipeline de detecção modular",
  },
  {
    title: "Crypto Insight AI",
    category: "IA Aplicada / Finanças",
    problem:
      "Acompanhar múltiplos indicadores técnicos em diferentes timeframes para criptomoedas é trabalhoso e difícil de interpretar sem uma camada unificada de scoring.",
    solution:
      "Construí um backend FastAPI que busca dados em tempo real via CCXT, calcula RSI, EMA, MACD e médias de volume, executa um engine de scoring ponderado e chama Claude para gerar resumos de mercado em linguagem natural — servidos em um dashboard Next.js.",
    technologies: ["Python", "FastAPI", "CCXT", "Pandas", "Claude API", "Next.js", "TypeScript"],
    github: "https://github.com/Wessel2007/crypto-insight-ai",
    signal: "Pipelines de dados financeiros, scoring de indicadores e interpretação com LLM",
  },
  {
    title: "Raiz Iguaçu — Hackatour Cataratas 2026",
    category: "Full-Stack Web",
    problem:
      "O turismo comunitário na região do Iguaçu não tem uma plataforma escalável onde produtores locais possam listar experiências e turistas possam descobri-las, reservar e avaliar.",
    solution:
      "Entregamos uma plataforma full-stack no Hackatour Cataratas 2026 com descoberta de experiências, onboarding de produtores, dashboard administrativo com métricas em tempo real, gestão de totens físicos com QR Code e insights de comportamento de visitantes gerados por IA.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind", "FastAPI", "PostgreSQL", "shadcn/ui"],
    github: "https://github.com/Wessel2007/Hackatour-Cataratas",
    signal: "Entrega full-stack em hackathon: produto, backend e visualização de dados sob pressão",
  },
  {
    title: "Pharm Assist",
    category: "IA Aplicada",
    problem:
      "A gestão da farmácia municipal de Toledo/PR precisava de uma ferramenta com IA para apoiar a Prefeitura no monitoramento e otimização dos processos de dispensação de medicamentos.",
    solution:
      "Projeto integrador acadêmico desenvolvido com o curso de IA do Biopark para a Prefeitura de Toledo/PR, aplicando técnicas de IA para auxiliar workflows farmacêuticos e geração de relatórios.",
    technologies: ["Python", "IA/ML"],
    github: "https://github.com/Wessel2007/Pharm-Assist",
    signal: "IA aplicada ao setor público, colaboração em equipe e integração acadêmica",
  },
  {
    title: "New AI Invest",
    category: "Web / Finanças",
    problem:
      "Investidores que gerenciam múltiplas classes de ativos precisam de uma visão clara do desvio do portfólio e de um plano de rebalanceamento concreto, sem depender de planilhas.",
    solution:
      "Construí uma SPA em React com CRUD completo de ativos, alocações-alvo configuráveis, calculadora automática de rebalanceamento, dashboards interativos com Recharts e um engine de insights que pontua a diversificação e prioriza ações sugeridas.",
    technologies: ["React", "JavaScript", "Tailwind CSS", "Recharts"],
    github: "https://github.com/Wessel2007/new-ai-invest",
    signal: "Lógica financeira, hooks customizados e design de dashboard focado em UX",
  },
  {
    title: "Neural HUD Portfolio",
    category: "Interface Web",
    problem:
      "Portfólios técnicos frequentemente parecem polidos, mas falham em comunicar o julgamento de engenharia, o contexto dos projetos ou como os problemas foram de fato resolvidos.",
    solution:
      "Projetei esta interface pronta para recrutadores em Next.js, apresentando cada projeto como um estudo de caso de engenharia estruturado com problema, solução e sinais de implementação — com suporte bilíngue e um design system inspirado em HUD.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Wessel2007/Neural-HUD-Portfolio-AI-Developer-Interface",
    signal: "Pensamento de produto, sistemas de UI, arquitetura de conteúdo bilíngue e motion design",
  },
];

// ─── Content ──────────────────────────────────────────────────────────────────

export const content = {
  en: {
    navLinks: [
      { label: "Featured", href: "#featured" },
      { label: "Projects", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ] as NavLink[],

    langLabel: "EN",

    bootLines: [
      "> Booting recruiter-ready portfolio interface...",
      "[ OK ] Computer vision modules indexed",
      "[ OK ] Edge systems telemetry linked",
      "[ OK ] Professional signal calibrated",
    ],

    hero: {
      role: "AI & Computer Vision Developer",
      name: "Luiz Wessel",
      tagline: "Engineering AI systems from the edge of the void.",
      description:
        "I build practical AI, computer vision, and edge systems with clear interfaces, measurable behavior, and documentation that helps teams understand the system.",
      ctaPrimary: "Review Featured Work",
      ctaSecondary: "Get in Touch",
      hudSignal: "SIGNAL: HUMAN-READABLE AI",
      hudStatus: "STATUS: AVAILABLE",
      scroll: "SCROLL",
    },

    featured: {
      label: "// Featured Project",
      title: "A project framed like an engineering case study",
      intro:
        "A portfolio highlight focused on the work recruiters care about: what problem was solved, how the system was designed, and which technical decisions made it useful.",
      problemLabel: "Problem",
      solutionLabel: "Solution",
      technicalSignalLabel: "Technical Signal",
      technologiesLabel: "Technologies",
      githubButton: "GitHub Repository",
      demoButton: "Live Demo",
      project: {
        title: "Gate Vision — Vehicular Access Control Platform",
        category: "Featured Case Study",
        problem:
          "Condominiums and parking facilities need reliable, automated vehicle access without a manual operator at every entry — and the solution must work in real-world lighting conditions with Mercosul plates.",
        solution:
          "Built a complete platform: a Python/FastAPI backend runs a YOLO detection + EasyOCR pipeline with CLAHE preprocessing and TTA fallback for noisy frames; a React admin dashboard backed by Supabase handles resident management, access logs, camera config, and temporary authorizations; an Arduino integration receives serial commands to physically open the gate when a plate is authorized.",
        technologies: ["Python", "YOLO", "EasyOCR", "FastAPI", "React", "Supabase", "Arduino", "OpenCV"],
        github: "https://github.com/Wessel2007/Gate-Vision",
        signal: "End-to-end system thinking: CV pipeline + REST API + hardware actuation + admin interface",
      } as ProjectContent,
    },

    projects: {
      label: "// Project Archive",
      title: "Selected Work",
      problemLabel: "Problem",
      solutionLabel: "Solution",
      githubLabel: "GitHub",
      demoLabel: "Demo",
      items: EN_PROJECTS,
    },

    skills: {
      label: "// Capabilities",
      title: "Technical Operating Range",
      description:
        "A compact view of the stack I use to prototype intelligent systems: model development, interface work, and hardware-facing experiments.",
      items: [
        { name: "Python", level: 90, category: "Languages" },
        { name: "TypeScript / JavaScript", level: 82, category: "Languages" },
        { name: "C / C++", level: 70, category: "Languages" },
        { name: "Machine Learning", level: 85, category: "AI / ML" },
        { name: "TensorFlow / PyTorch", level: 80, category: "AI / ML" },
        { name: "Computer Vision", level: 78, category: "AI / ML" },
        { name: "React / Next.js", level: 83, category: "Web" },
        { name: "Arduino / ESP32", level: 75, category: "Hardware" },
      ] as SkillContent[],
    },

    about: {
      label: "// About",
      title: "Engineer in Training, Builder by Practice",
      bio: [
        "I'm an AI and Computer Vision student/developer focused on turning difficult technical ideas into working prototypes that are easy to inspect, explain, and improve.",
        "My strongest projects sit between model behavior and real-world constraints: image pipelines, sensor-driven systems, edge prototypes, and the dashboards that make results readable.",
        "I care about clean implementation, honest evaluation, and interfaces that make engineering decisions visible without turning the product into visual noise.",
      ],
      currentSignalLabel: "Current Signal",
      currentSignal:
        "Looking for internships, junior roles, research collaborations, and project work around AI, Computer Vision, and edge systems.",
      stats: [
        { value: "AI", label: "Primary Focus" },
        { value: "CV", label: "Computer Vision" },
        { value: "IoT", label: "Edge Systems" },
        { value: "UX", label: "Readable Interfaces" },
      ] as StatContent[],
    },

    contact: {
      label: "// Contact",
      title: "Ready to connect the signal.",
      description:
        "If you are hiring for AI, Computer Vision, full-stack prototyping, or hardware-adjacent software, this is the fastest route to reach me.",
      links: [
        { label: "GitHub", href: "https://github.com/Wessel2007", tag: "CODE" },
        { label: "LinkedIn", href: "https://linkedin.com/in/yourprofile", tag: "NETWORK" },
        { label: "Email", href: "mailto:heyxist3r@gmail.com", tag: "DIRECT" },
      ] as ContactLink[],
      footerBuild: "BUILD: NEXT.JS / TAILWIND / FRAMER MOTION",
      footerStatus: "SYSTEM STATUS: OPEN TO OPPORTUNITIES",
      footerSync: "LAST SYNC: 2026 / PORT_OS v2.1",
    },
  },

  pt: {
    navLinks: [
      { label: "Destaque", href: "#featured" },
      { label: "Projetos", href: "#projects" },
      { label: "Skills", href: "#skills" },
      { label: "Sobre", href: "#about" },
      { label: "Contato", href: "#contact" },
    ] as NavLink[],

    langLabel: "PT-BR",

    bootLines: [
      "> Iniciando interface de portfólio...",
      "[ OK ] Módulos de visão computacional indexados",
      "[ OK ] Telemetria de sistemas embarcados vinculada",
      "[ OK ] Sinal profissional calibrado",
    ],

    hero: {
      role: "Desenvolvedor de IA & Visão Computacional",
      name: "Luiz Wessel",
      tagline: "Construindo sistemas de IA na fronteira do desconhecido.",
      description:
        "Desenvolvo sistemas práticos de IA, visão computacional e edge computing com interfaces claras, comportamento mensurável e documentação que ajuda equipes a entender o sistema.",
      ctaPrimary: "Ver Projeto em Destaque",
      ctaSecondary: "Entrar em Contato",
      hudSignal: "SINAL: IA LEGÍVEL POR HUMANOS",
      hudStatus: "STATUS: DISPONÍVEL",
      scroll: "ROLAR",
    },

    featured: {
      label: "// Projeto em Destaque",
      title: "Um projeto apresentado como estudo de caso de engenharia",
      intro:
        "Um destaque do portfólio focado no que recrutadores realmente querem ver: qual problema foi resolvido, como o sistema foi projetado e quais decisões técnicas o tornaram útil.",
      problemLabel: "Problema",
      solutionLabel: "Solução",
      technicalSignalLabel: "Sinal Técnico",
      technologiesLabel: "Tecnologias",
      githubButton: "Repositório GitHub",
      demoButton: "Demo ao Vivo",
      project: {
        title: "Gate Vision — Plataforma de Controle de Acesso Veicular",
        category: "Estudo de Caso em Destaque",
        problem:
          "Condomínios e estacionamentos precisam de controle de acesso veicular confiável e automatizado, sem operador manual a cada entrada — e a solução precisa funcionar nas condições reais de iluminação com placas Mercosul.",
        solution:
          "Construí uma plataforma completa: backend Python/FastAPI executa pipeline de detecção YOLO + EasyOCR com pré-processamento CLAHE e fallback TTA para frames ruidosos; dashboard administrativo React com Supabase gerencia moradores, logs de acesso, câmeras e autorizações temporárias; integração com Arduino recebe comandos seriais para abertura física da cancela quando a placa é autorizada.",
        technologies: ["Python", "YOLO", "EasyOCR", "FastAPI", "React", "Supabase", "Arduino", "OpenCV"],
        github: "https://github.com/Wessel2007/Gate-Vision",
        signal: "Pensamento de sistema ponta a ponta: pipeline CV + API REST + atuação em hardware + interface administrativa",
      } as ProjectContent,
    },

    projects: {
      label: "// Arquivo de Projetos",
      title: "Trabalhos Selecionados",
      problemLabel: "Problema",
      solutionLabel: "Solução",
      githubLabel: "GitHub",
      demoLabel: "Demo",
      items: PT_PROJECTS,
    },

    skills: {
      label: "// Capacidades",
      title: "Faixa Operacional Técnica",
      description:
        "Uma visão compacta do stack que uso para prototipar sistemas inteligentes: desenvolvimento de modelos, trabalho de interface e experimentos voltados ao hardware.",
      items: [
        { name: "Python", level: 90, category: "Linguagens" },
        { name: "TypeScript / JavaScript", level: 82, category: "Linguagens" },
        { name: "C / C++", level: 70, category: "Linguagens" },
        { name: "Machine Learning", level: 85, category: "IA / ML" },
        { name: "TensorFlow / PyTorch", level: 80, category: "IA / ML" },
        { name: "Visão Computacional", level: 78, category: "IA / ML" },
        { name: "React / Next.js", level: 83, category: "Web" },
        { name: "Arduino / ESP32", level: 75, category: "Hardware" },
      ] as SkillContent[],
    },

    about: {
      label: "// Sobre",
      title: "Engenheiro em Formação, Construtor por Prática",
      bio: [
        "Sou estudante/desenvolvedor de IA e Visão Computacional focado em transformar ideias técnicas complexas em protótipos funcionais que são fáceis de inspecionar, explicar e melhorar.",
        "Meus projetos mais fortes estão entre o comportamento do modelo e as restrições do mundo real: pipelines de imagem, sistemas orientados a sensores, protótipos edge e os dashboards que tornam os resultados legíveis.",
        "Me preocupo com implementação limpa, avaliação honesta e interfaces que tornam as decisões de engenharia visíveis sem transformar o produto em ruído visual.",
      ],
      currentSignalLabel: "Sinal Atual",
      currentSignal:
        "Em busca de estágios, vagas júnior, colaborações de pesquisa e trabalhos em projetos de IA, Visão Computacional e sistemas embarcados.",
      stats: [
        { value: "IA", label: "Foco Principal" },
        { value: "VC", label: "Visão Computacional" },
        { value: "IoT", label: "Sistemas Edge" },
        { value: "UX", label: "Interfaces Legíveis" },
      ] as StatContent[],
    },

    contact: {
      label: "// Contato",
      title: "Pronto para conectar o sinal.",
      description:
        "Se você está contratando para IA, Visão Computacional, prototipagem full-stack ou software próximo ao hardware, este é o caminho mais rápido para me alcançar.",
      links: [
        { label: "GitHub", href: "https://github.com/Wessel2007", tag: "CÓDIGO" },
        { label: "LinkedIn", href: "https://linkedin.com/in/yourprofile", tag: "REDE" },
        { label: "Email", href: "mailto:heyxist3r@gmail.com", tag: "DIRETO" },
      ] as ContactLink[],
      footerBuild: "BUILD: NEXT.JS / TAILWIND / FRAMER MOTION",
      footerStatus: "STATUS DO SISTEMA: ABERTO A OPORTUNIDADES",
      footerSync: "ÚLTIMA SYNC: 2026 / PORT_OS v2.1",
    },
  },
} as const;

export type SiteContent = (typeof content)["en"];
