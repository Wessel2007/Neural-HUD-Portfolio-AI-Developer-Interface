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
    title: "Neural Vision Classifier",
    category: "Computer Vision",
    problem:
      "Image datasets often contain subtle classes that are hard to separate with rule-based logic.",
    solution:
      "Trained and evaluated a CNN classifier with preprocessing, augmentation, and confidence tracking for cleaner model decisions.",
    technologies: ["Python", "TensorFlow", "OpenCV", "CUDA"],
    github: "https://github.com/yourusername",
    demo: "https://your-demo-link.com",
    signal: "Model training, evaluation, and inference optimization",
  },
  {
    title: "LLM Fine-Tuning Pipeline",
    category: "Applied AI",
    problem:
      "General-purpose models can miss domain-specific language, tone, and task constraints.",
    solution:
      "Created a reproducible fine-tuning workflow with dataset preparation, LoRA adapters, validation runs, and experiment notes.",
    technologies: ["Python", "PyTorch", "Hugging Face", "LoRA"],
    github: "https://github.com/yourusername",
    signal: "Data preparation, PEFT, and reproducible AI workflows",
  },
  {
    title: "Autonomous Navigation Robot",
    category: "Arduino / Robotics",
    problem:
      "Small robots need stable movement and local decisions without relying on heavy compute.",
    solution:
      "Implemented PID motor control, ultrasonic obstacle avoidance, and Bluetooth telemetry for fast debugging in the field.",
    technologies: ["C++", "Arduino", "PID", "Bluetooth"],
    github: "https://github.com/yourusername",
    signal: "Embedded control, sensors, and hardware debugging",
  },
  {
    title: "Smart Environment Monitor",
    category: "Arduino / IoT",
    problem:
      "Environmental data is useful only when it is visible, reliable, and easy to interpret.",
    solution:
      "Built an ESP32 sensor node that streams readings over MQTT into a dashboard with live status and threshold indicators.",
    technologies: ["C++", "ESP32", "MQTT", "React"],
    github: "https://github.com/yourusername",
    demo: "https://your-demo-link.com",
    signal: "IoT data flow from sensor to interface",
  },
  {
    title: "AI Study Lab",
    category: "AI Research Practice",
    problem:
      "Learning advanced AI concepts is difficult without small experiments that expose the tradeoffs.",
    solution:
      "Created focused notebooks for diffusion, embeddings, model evaluation, and optimization experiments with documented outcomes.",
    technologies: ["Python", "PyTorch", "Embeddings", "Notebooks"],
    github: "https://github.com/yourusername",
    signal: "Research curiosity translated into working experiments",
  },
  {
    title: "Developer Portfolio",
    category: "Web Interface",
    problem:
      "Technical portfolios can look polished while still failing to explain engineering judgment.",
    solution:
      "Designed a recruiter-ready interface that frames projects by problem, solution, and implementation signals.",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/yourusername",
    signal: "Product thinking, UI systems, and motion design",
  },
];

const PT_PROJECTS: ProjectContent[] = [
  {
    title: "Classificador Neural de Visão",
    category: "Visão Computacional",
    problem:
      "Datasets de imagens frequentemente contêm classes sutis difíceis de separar com lógica baseada em regras.",
    solution:
      "Treinei e avaliei um classificador CNN com pré-processamento, augmentation e rastreamento de confiança para decisões mais limpas do modelo.",
    technologies: ["Python", "TensorFlow", "OpenCV", "CUDA"],
    github: "https://github.com/yourusername",
    demo: "https://your-demo-link.com",
    signal: "Treinamento, avaliação e otimização de inferência de modelos",
  },
  {
    title: "Pipeline de Fine-Tuning de LLM",
    category: "IA Aplicada",
    problem:
      "Modelos de uso geral podem perder linguagem específica do domínio, tom e restrições de tarefas.",
    solution:
      "Criei um workflow de fine-tuning reproduzível com preparação de dataset, adaptadores LoRA, execuções de validação e notas de experimento.",
    technologies: ["Python", "PyTorch", "Hugging Face", "LoRA"],
    github: "https://github.com/yourusername",
    signal: "Preparação de dados, PEFT e workflows reproduzíveis de IA",
  },
  {
    title: "Robô de Navegação Autônoma",
    category: "Arduino / Robótica",
    problem:
      "Robôs pequenos precisam de movimentos estáveis e decisões locais sem depender de computação pesada.",
    solution:
      "Implementei controle de motor PID, desvio de obstáculos por ultrassom e telemetria Bluetooth para depuração rápida em campo.",
    technologies: ["C++", "Arduino", "PID", "Bluetooth"],
    github: "https://github.com/yourusername",
    signal: "Controle embarcado, sensores e depuração de hardware",
  },
  {
    title: "Monitor Inteligente de Ambiente",
    category: "Arduino / IoT",
    problem:
      "Dados ambientais são úteis apenas quando visíveis, confiáveis e fáceis de interpretar.",
    solution:
      "Construí um nó sensor ESP32 que transmite leituras via MQTT para um dashboard com status ao vivo e indicadores de limite.",
    technologies: ["C++", "ESP32", "MQTT", "React"],
    github: "https://github.com/yourusername",
    demo: "https://your-demo-link.com",
    signal: "Fluxo de dados IoT do sensor à interface",
  },
  {
    title: "Laboratório de Estudos em IA",
    category: "Pesquisa em IA",
    problem:
      "Aprender conceitos avançados de IA é difícil sem experimentos pequenos que expõem os trade-offs.",
    solution:
      "Criei notebooks focados em difusão, embeddings, avaliação de modelos e experimentos de otimização com resultados documentados.",
    technologies: ["Python", "PyTorch", "Embeddings", "Notebooks"],
    github: "https://github.com/yourusername",
    signal: "Curiosidade de pesquisa traduzida em experimentos funcionais",
  },
  {
    title: "Portfólio de Desenvolvedor",
    category: "Interface Web",
    problem:
      "Portfólios técnicos podem parecer polidos enquanto ainda falham em explicar o julgamento de engenharia.",
    solution:
      "Projetei uma interface pronta para recrutadores que enquadra projetos por problema, solução e sinais de implementação.",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/yourusername",
    signal: "Pensamento de produto, sistemas de UI e design de motion",
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
      name: "Your Name",
      tagline: "Engineering AI systems from the edge of the void.",
      description:
        "I build practical AI, computer vision, and edge prototypes with clear interfaces, measurable behavior, and documentation that helps teams understand the system.",
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
        title: "Real-Time Computer Vision Safety Monitor",
        category: "Featured Case Study",
        problem:
          "Manual monitoring is slow, inconsistent, and difficult to scale when visual signals need to be interpreted in real time.",
        solution:
          "Built a computer vision pipeline that detects relevant objects, filters noisy frames, and presents clear confidence signals in a lightweight dashboard.",
        technologies: ["Python", "OpenCV", "PyTorch", "Next.js", "Tailwind"],
        github: "https://github.com/yourusername",
        demo: "https://your-demo-link.com",
        signal: "Vision model + interface + deployment thinking",
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
        { label: "GitHub", href: "https://github.com/yourusername", tag: "CODE" },
        { label: "LinkedIn", href: "https://linkedin.com/in/yourprofile", tag: "NETWORK" },
        { label: "Email", href: "mailto:you@email.com", tag: "DIRECT" },
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
      name: "Seu Nome",
      tagline: "Construindo sistemas de IA na fronteira do desconhecido.",
      description:
        "Desenvolvo protótipos práticos de IA, visão computacional e edge computing com interfaces claras, comportamento mensurável e documentação que ajuda equipes a entender o sistema.",
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
        title: "Monitor de Segurança por Visão Computacional em Tempo Real",
        category: "Estudo de Caso em Destaque",
        problem:
          "Monitoramento manual é lento, inconsistente e difícil de escalar quando sinais visuais precisam ser interpretados em tempo real.",
        solution:
          "Construí um pipeline de visão computacional que detecta objetos relevantes, filtra frames ruidosos e apresenta sinais de confiança claros em um dashboard leve.",
        technologies: ["Python", "OpenCV", "PyTorch", "Next.js", "Tailwind"],
        github: "https://github.com/yourusername",
        demo: "https://your-demo-link.com",
        signal: "Modelo de visão + interface + pensamento de deployment",
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
        { label: "GitHub", href: "https://github.com/yourusername", tag: "CÓDIGO" },
        { label: "LinkedIn", href: "https://linkedin.com/in/yourprofile", tag: "REDE" },
        { label: "Email", href: "mailto:you@email.com", tag: "DIRETO" },
      ] as ContactLink[],
      footerBuild: "BUILD: NEXT.JS / TAILWIND / FRAMER MOTION",
      footerStatus: "STATUS DO SISTEMA: ABERTO A OPORTUNIDADES",
      footerSync: "ÚLTIMA SYNC: 2026 / PORT_OS v2.1",
    },
  },
} as const;

export type SiteContent = (typeof content)["en"];
