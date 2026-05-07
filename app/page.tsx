"use client";

import { motion, AnimatePresence, useInView, useScroll, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/lib/language-context";
import { content, type ProjectContent, type TechLayerContent } from "@/lib/content";

// ─── Animation Variants ───────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const layerCardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.12, ease: EASE_OUT },
  }),
};

const badgeContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.28 } },
};

const badgeItemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: EASE_OUT },
  },
};

// ─── Technology Badge Colors ───────────────────────────────────────────────────

const TECH_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Python:          { bg: "rgba(255,212,0,0.08)",    border: "rgba(255,212,0,0.35)",    text: "#FFD44D" },
  YOLO:            { bg: "rgba(239,68,68,0.08)",    border: "rgba(239,68,68,0.35)",    text: "#F87171" },
  YOLOv11:         { bg: "rgba(239,68,68,0.08)",    border: "rgba(239,68,68,0.35)",    text: "#F87171" },
  EasyOCR:         { bg: "rgba(168,85,247,0.08)",   border: "rgba(168,85,247,0.35)",   text: "#C084FC" },
  FastAPI:         { bg: "rgba(5,150,105,0.08)",    border: "rgba(5,150,105,0.35)",    text: "#34D399" },
  React:           { bg: "rgba(56,189,248,0.08)",   border: "rgba(56,189,248,0.35)",   text: "#38BDF8" },
  Supabase:        { bg: "rgba(52,211,153,0.08)",   border: "rgba(52,211,153,0.35)",   text: "#34D399" },
  Arduino:         { bg: "rgba(0,151,167,0.08)",    border: "rgba(0,151,167,0.35)",    text: "#00BCD4" },
  OpenCV:          { bg: "rgba(71,85,105,0.12)",    border: "rgba(100,116,139,0.40)",  text: "#94A3B8" },
  PyTorch:         { bg: "rgba(238,76,44,0.08)",    border: "rgba(238,76,44,0.35)",    text: "#F97316" },
  NumPy:           { bg: "rgba(77,128,196,0.08)",   border: "rgba(77,128,196,0.35)",   text: "#60A5FA" },
  CCXT:            { bg: "rgba(234,179,8,0.08)",    border: "rgba(234,179,8,0.35)",    text: "#FACC15" },
  Pandas:          { bg: "rgba(99,102,241,0.08)",   border: "rgba(99,102,241,0.35)",   text: "#818CF8" },
  "Claude API":    { bg: "rgba(201,136,78,0.08)",   border: "rgba(201,136,78,0.35)",   text: "#D4956A" },
  "Next.js":       { bg: "rgba(250,250,250,0.06)",  border: "rgba(250,250,250,0.25)",  text: "#F1F5F9" },
  TypeScript:      { bg: "rgba(49,120,198,0.08)",   border: "rgba(49,120,198,0.35)",   text: "#60A5FA" },
  JavaScript:      { bg: "rgba(234,179,8,0.08)",    border: "rgba(234,179,8,0.35)",    text: "#FACC15" },
  Vite:            { bg: "rgba(149,87,234,0.08)",   border: "rgba(149,87,234,0.35)",   text: "#A78BFA" },
  Tailwind:        { bg: "rgba(6,182,212,0.08)",    border: "rgba(6,182,212,0.35)",    text: "#22D3EE" },
  "Tailwind CSS":  { bg: "rgba(6,182,212,0.08)",    border: "rgba(6,182,212,0.35)",    text: "#22D3EE" },
  PostgreSQL:      { bg: "rgba(51,103,145,0.08)",   border: "rgba(51,103,145,0.35)",   text: "#60A5FA" },
  "shadcn/ui":     { bg: "rgba(250,250,250,0.06)",  border: "rgba(250,250,250,0.22)",  text: "#CBD5E1" },
  Recharts:        { bg: "rgba(239,68,68,0.08)",    border: "rgba(239,68,68,0.30)",    text: "#FCA5A5" },
  "Framer Motion": { bg: "rgba(236,72,153,0.08)",   border: "rgba(236,72,153,0.30)",   text: "#F472B6" },
  "AI/ML":         { bg: "rgba(168,85,247,0.08)",   border: "rgba(168,85,247,0.35)",   text: "#C084FC" },
  "IA/ML":         { bg: "rgba(168,85,247,0.08)",   border: "rgba(168,85,247,0.35)",   text: "#C084FC" },
  HTML:            { bg: "rgba(234,88,12,0.08)",    border: "rgba(234,88,12,0.35)",    text: "#FB923C" },
  CSS:             { bg: "rgba(59,130,246,0.08)",   border: "rgba(59,130,246,0.35)",   text: "#93C5FD" },
  OCR:             { bg: "rgba(168,85,247,0.08)",   border: "rgba(168,85,247,0.35)",   text: "#C084FC" },
  Roboflow:        { bg: "rgba(99,102,241,0.08)",   border: "rgba(99,102,241,0.35)",   text: "#818CF8" },
  CVAT:            { bg: "rgba(71,85,105,0.12)",    border: "rgba(100,116,139,0.40)",  text: "#94A3B8" },
  MySQL:           { bg: "rgba(234,88,12,0.08)",    border: "rgba(234,88,12,0.35)",    text: "#FB923C" },
  SQL:             { bg: "rgba(51,103,145,0.08)",   border: "rgba(51,103,145,0.35)",   text: "#7DD3FC" },
  DBeaver:         { bg: "rgba(71,85,105,0.12)",    border: "rgba(100,116,139,0.40)",  text: "#94A3B8" },
  "REST APIs":     { bg: "rgba(5,150,105,0.08)",    border: "rgba(5,150,105,0.35)",    text: "#6EE7B7" },
  IoT:             { bg: "rgba(0,151,167,0.08)",    border: "rgba(0,151,167,0.35)",    text: "#67E8F9" },
  Airflow:         { bg: "rgba(14,165,233,0.08)",   border: "rgba(14,165,233,0.35)",   text: "#38BDF8" },
  Git:             { bg: "rgba(239,68,68,0.08)",    border: "rgba(239,68,68,0.35)",    text: "#FCA5A5" },
  GitHub:          { bg: "rgba(250,250,250,0.06)",  border: "rgba(250,250,250,0.22)",  text: "#CBD5E1" },
  Docker:          { bg: "rgba(14,165,233,0.08)",   border: "rgba(14,165,233,0.35)",   text: "#0EA5E9" },
  Vercel:          { bg: "rgba(250,250,250,0.06)",  border: "rgba(250,250,250,0.25)",  text: "#F1F5F9" },
};

const DEFAULT_BADGE = { bg: "rgba(30,41,59,0.70)", border: "rgba(51,65,85,0.50)", text: "#94A3B8" };

function TechBadge({ tech, size = "sm" }: { tech: string; size?: "sm" | "xs" }) {
  const style = TECH_COLORS[tech] ?? DEFAULT_BADGE;
  const padding = size === "xs" ? "px-2 py-0.5" : "px-2.5 py-1";
  return (
    <span
      className={`font-mono text-xs ${padding} inline-block`}
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        color: style.text,
      }}
    >
      {tech}
    </span>
  );
}

// ─── Scroll Progress Bar ───────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 inset-x-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #1e40af 0%, #0ea5e9 45%, #00d4ff 70%, #FACC15 100%)",
        boxShadow: "0 0 8px rgba(0,212,255,0.5), 0 0 18px rgba(250,204,21,0.25)",
      }}
    />
  );
}

// ─── Language Toggle ──────────────────────────────────────────────────────────

function LangToggle() {
  const { lang, toggleLang } = useLang();
  const isEN = lang === "en";

  return (
    <button
      onClick={toggleLang}
      aria-label={isEN ? "Switch to Portuguese" : "Mudar para Inglês"}
      className="group relative font-mono text-[0.6rem] sm:text-[0.65rem] tracking-[0.18em] uppercase flex items-center gap-1.5 border border-slate-800/70 hover:border-cyan-500/30 px-2.5 sm:px-3 py-1.5 transition-all duration-300 text-slate-500 hover:text-slate-300 overflow-hidden"
    >
      {/* Scan line on hover */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span className="hidden sm:inline text-slate-600 group-hover:text-slate-500 transition-colors">
        LANG
      </span>
      <span className="hidden sm:inline text-slate-800">//</span>
      <motion.span
        key={lang}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-cyan-400/70 group-hover:text-cyan-400 transition-colors"
      >
        {isEN ? "EN" : "PT-BR"}
      </motion.span>
      <span className="text-slate-700 group-hover:text-cyan-500/40 transition-colors text-[0.55rem]">
        ▸
      </span>
      <motion.span
        key={`next-${lang}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-slate-700 group-hover:text-slate-500 transition-colors"
      >
        {isEN ? "PT-BR" : "EN"}
      </motion.span>
    </button>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const { c } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050810]/90 backdrop-blur-md border-b border-cyan-500/10"
          : "bg-transparent"
      }`}
    >
      {/* offset para a barra de progresso acima */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <span className="font-mono text-cyan-400 text-xs tracking-[0.22em] uppercase glow-text-sm shrink-0">
          PORT_OS
        </span>

        <ul className="hidden md:flex gap-6 lg:gap-8 items-center">
          {c.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-slate-400 hover:text-cyan-400 font-mono text-xs tracking-widest uppercase transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <LangToggle />
      </div>
    </motion.nav>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-10 sm:mb-14">
      <p className="font-mono text-xs text-cyan-400/80 tracking-[0.3em] uppercase mb-3">
        {label}
      </p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
        {title}
      </h2>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-px w-12 bg-cyan-500/50" />
        <div className="h-px flex-1 bg-slate-800/50" />
      </div>
    </div>
  );
}

// ─── Profile Photo ────────────────────────────────────────────────────────────

function ProfilePhoto({ size = 180 }: { size?: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 70%)",
          boxShadow: "0 0 32px rgba(0,212,255,0.22), 0 0 64px rgba(0,212,255,0.08)",
        }}
      />
      {/* Corner HUD markers */}
      <span className="absolute top-1 left-1 w-3 h-3 border-l border-t border-cyan-400/60" />
      <span className="absolute top-1 right-1 w-3 h-3 border-r border-t border-cyan-400/60" />
      <span className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-cyan-400/60" />
      <span className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-cyan-400/60" />
      {/* Photo */}
      <div
        className="relative overflow-hidden rounded-full"
        style={{
          width: size,
          height: size,
          border: "1.5px solid rgba(0,212,255,0.30)",
          boxShadow: "inset 0 0 16px rgba(0,212,255,0.10)",
        }}
      >
        <Image
          src="/profile/wessel.png"
          alt="Luiz Wessel"
          fill
          className="object-cover object-top"
          priority
          sizes={`${size}px`}
        />
      </div>
      {/* Status dot */}
      <span className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-cyan-400 border-2 border-[#050810] shadow-[0_0_6px_rgba(0,212,255,0.8)]" />
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const { lang, c } = useLang();
  const [visibleLines, setVisibleLines] = useState(0);
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    let count = 0;
    const bootLength = content[lang].bootLines.length;
    const interval = setInterval(() => {
      count++;
      setVisibleLines(count);
      if (count >= bootLength) {
        clearInterval(interval);
        setTimeout(() => setShowHero(true), 350);
      }
    }, 420);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center hud-grid overflow-hidden">
      {/* Radial glow backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(0,212,255,0.1)_0%,transparent_62%)]" />
      {/* Corner grid markers */}
      <div className="pointer-events-none absolute top-20 left-6 w-4 h-4 border-l border-t border-cyan-500/20" />
      <div className="pointer-events-none absolute top-20 right-6 w-4 h-4 border-r border-t border-cyan-500/20" />
      <div className="pointer-events-none absolute bottom-20 left-6 w-4 h-4 border-l border-b border-cyan-500/20" />
      <div className="pointer-events-none absolute bottom-20 right-6 w-4 h-4 border-r border-b border-cyan-500/20" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 py-28 sm:py-32 w-full">
        {/* Boot sequence lines */}
        <div className="font-mono text-xs space-y-1.5 mb-12 min-h-[5.5rem]">
          {c.bootLines.slice(0, visibleLines).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={
                line.startsWith("[ OK ]")
                  ? "text-cyan-500/65"
                  : "text-slate-500"
              }
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Hero content revealed after boot */}
        <AnimatePresence>
          {showHero && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16"
            >
              {/* Text content */}
              <div className="flex-1">
                {/* Role badge */}
                <motion.span
                  variants={fadeUp}
                  className="inline-block font-mono text-[0.65rem] sm:text-xs text-cyan-400/80 tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-6 border border-cyan-500/20 px-3 py-1"
                >
                  {c.hero.role}
                </motion.span>

                {/* Name */}
                <motion.h1
                  variants={fadeUp}
                  className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[0.95] mb-6 glow-text"
                >
                  {c.hero.name}
                </motion.h1>

                {/* Tagline */}
                <motion.p
                  variants={fadeUp}
                  className="text-slate-200 text-xl sm:text-2xl md:text-3xl max-w-3xl leading-tight mb-5"
                >
                  {c.hero.tagline}
                </motion.p>

                <motion.p
                  variants={fadeUp}
                  className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed mb-10"
                >
                  {c.hero.description}
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                  variants={fadeUp}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <a
                    href="#featured"
                    className="inline-flex justify-center items-center gap-2.5 px-7 py-3.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs tracking-widest uppercase hover:bg-cyan-500/18 hover:border-cyan-400/55 transition-all duration-300 glow-box"
                  >
                    {c.hero.ctaPrimary}
                    <span className="text-cyan-500/60">-&gt;</span>
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex justify-center items-center gap-2.5 px-7 py-3.5 border border-slate-700/60 text-slate-300 font-mono text-xs tracking-widest uppercase hover:border-slate-500 hover:text-white transition-all duration-300"
                  >
                    {c.hero.ctaSecondary}
                  </a>
                </motion.div>
              </div>

              {/* Profile photo — desktop right, mobile centered above */}
              <motion.div
                variants={fadeUp}
                className="flex justify-center lg:justify-end lg:shrink-0"
              >
                <ProfilePhoto size={220} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom HUD labels */}
      <div className="hidden sm:block absolute bottom-8 left-6 font-mono text-slate-700 text-xs tracking-widest">
        {c.hero.hudSignal}
      </div>
      <div className="hidden sm:block absolute bottom-8 right-6 font-mono text-slate-700 text-xs tracking-widest">
        {c.hero.hudStatus}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showHero ? 1 : 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-slate-600 text-xs tracking-[0.3em]">
          {c.hero.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-cyan-500/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// ─── Featured Project ─────────────────────────────────────────────────────────

function FeaturedProject() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });
  const { c } = useLang();
  const fp = c.featured;
  const project = fp.project;

  return (
    <section id="featured" className="relative py-24 sm:py-28 hud-grid">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(0,212,255,0.065)_0%,transparent_55%)]" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
        <SectionHeader label={fp.label} title={fp.title} />

        <motion.article
          ref={ref}
          initial={{ opacity: 0, y: 34 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE_OUT }}
          className="industrial-panel relative overflow-hidden bg-slate-950/70 border border-cyan-500/15 glow-box p-5 sm:p-7 md:p-9"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/55 to-transparent" />
          <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full bg-cyan-500/[0.07] blur-3xl" />
          <div className="absolute bottom-5 right-5 hidden md:grid grid-cols-5 gap-1 opacity-25">
            {Array.from({ length: 25 }).map((_, index) => (
              <span
                key={index}
                className="w-1 h-1 bg-cyan-400/60"
                aria-hidden="true"
              />
            ))}
          </div>

          <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-start">
            <div>
              <p className="font-mono text-xs text-cyan-400/75 tracking-[0.25em] uppercase mb-4">
                {project.category}
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight mb-5">
                {project.title}
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-2xl mb-7">
                {fp.intro}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border border-slate-800/70 bg-black/20 p-4">
                  <span className="font-mono text-[0.68rem] text-slate-500 tracking-widest uppercase">
                    {fp.problemLabel}
                  </span>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
                <div className="border border-slate-800/70 bg-black/20 p-4">
                  <span className="font-mono text-[0.68rem] text-slate-500 tracking-widest uppercase">
                    {fp.solutionLabel}
                  </span>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:border-l lg:border-slate-800/70 lg:pl-8">
              <div className="mb-7">
                <span className="font-mono text-[0.68rem] text-cyan-400/70 tracking-widest uppercase">
                  {fp.technicalSignalLabel}
                </span>
                <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                  {project.signal}
                </p>
              </div>

              <div className="mb-8">
                <span className="font-mono text-[0.68rem] text-cyan-400/70 tracking-widest uppercase">
                  {fp.technologiesLabel}
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <TechBadge key={tech} tech={tech} size="sm" />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center px-5 py-3 border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-mono text-xs tracking-widest uppercase hover:border-cyan-400/60 hover:bg-cyan-500/15 transition-colors"
                >
                  {fp.githubButton}
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center items-center px-5 py-3 border border-slate-700/70 text-slate-300 font-mono text-xs tracking-widest uppercase hover:border-slate-500 hover:text-white transition-colors"
                  >
                    {fp.demoButton}
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  labels,
}: {
  project: ProjectContent;
  index: number;
  labels: { problem: string; solution: string; github: string; demo: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.09, ease: EASE_OUT }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="industrial-panel group relative bg-slate-950/60 border border-slate-800/70 p-5 sm:p-6 flex flex-col gap-5 glow-box-hover cursor-default overflow-hidden"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute left-0 top-0 h-10 w-px bg-gradient-to-b from-cyan-400/45 to-transparent" />

      <div>
        <span className="font-mono text-[0.68rem] text-cyan-500/65 tracking-widest uppercase">
          {project.category}
        </span>
        <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-cyan-100 transition-colors duration-200 leading-snug">
          {project.title}
        </h3>
      </div>

      <div className="space-y-4 flex-1">
        <div>
          <p className="font-mono text-[0.65rem] text-slate-600 tracking-widest uppercase mb-1.5">
            {labels.problem}
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            {project.problem}
          </p>
        </div>
        <div>
          <p className="font-mono text-[0.65rem] text-slate-600 tracking-widest uppercase mb-1.5">
            {labels.solution}
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((tag) => (
          <TechBadge key={tag} tech={tag} size="xs" />
        ))}
      </div>

      <div className="pt-1 flex flex-wrap gap-4 border-t border-slate-800/60">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-2 text-xs font-mono text-cyan-500/70 hover:text-cyan-400 transition-colors duration-200 w-fit"
        >
          <span>{labels.github}</span>
          <span className="group-hover/link:translate-x-1 transition-transform duration-200 inline-block">
            -&gt;
          </span>
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-slate-200 transition-colors duration-200 w-fit"
          >
            <span>{labels.demo}</span>
            <span className="group-hover/link:translate-x-1 transition-transform duration-200 inline-block">
              -&gt;
            </span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

function ProjectsSection() {
  const { c } = useLang();
  const proj = c.projects;
  const labels = {
    problem: proj.problemLabel,
    solution: proj.solutionLabel,
    github: proj.githubLabel,
    demo: proj.demoLabel,
  };

  return (
    <section id="projects" className="relative py-24 sm:py-28 hud-grid">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(0,212,255,0.05)_0%,transparent_55%)]" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
        <SectionHeader label={proj.label} title={proj.title} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {proj.items.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i}
              labels={labels}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tech Stack Section ───────────────────────────────────────────────────────

function TechLayerCard({ layer, index }: { layer: TechLayerContent; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.18 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={layerCardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="industrial-panel group relative bg-slate-950/60 border p-5 sm:p-6 flex flex-col gap-4 overflow-hidden cursor-default"
      style={{
        borderColor: hovered ? "rgba(0,212,255,0.28)" : "rgba(51,65,85,0.70)",
        boxShadow: hovered
          ? "0 0 36px rgba(0,212,255,0.10), 0 8px 32px rgba(0,0,0,0.45), inset 0 0 22px rgba(0,212,255,0.03)"
          : "none",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Scanline sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="hud-scanline absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/22 to-transparent"
          style={{ animationDelay: `${index * -0.9}s` }}
        />
      </div>

      {/* Corner accent — top-left vertical bar */}
      <div className="absolute left-0 top-0 h-16 w-px bg-gradient-to-b from-cyan-400/55 to-transparent" />

      {/* Top accent line — brightens on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        animate={
          hovered
            ? { opacity: 1, background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.60), transparent)" }
            : { opacity: 0.6, background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.22), transparent)" }
        }
        transition={{ duration: 0.3 }}
      />

      {/* Radial glow — appears on hover */}
      <motion.div
        className="pointer-events-none absolute -right-10 -top-10 w-52 h-52 rounded-full"
        animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.45 }}
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.09) 0%, transparent 70%)" }}
      />

      {/* Header: index marker + title + status dot */}
      <div className="relative flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-2.5">
          <motion.span
            className="font-mono text-[0.65rem] tracking-[0.25em] shrink-0"
            animate={hovered ? { color: "rgba(0,212,255,0.90)" } : { color: "rgba(0,212,255,0.50)" }}
            transition={{ duration: 0.25 }}
          >
            [{layer.index}]
          </motion.span>
          <h3 className="text-sm font-semibold text-slate-300 tracking-wide group-hover:text-white transition-colors duration-200">
            {layer.title}
          </h3>
        </div>
        <span
          className="hud-pulse-dot shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400"
          style={{ animationDelay: `${index * 0.38}s` }}
        />
      </div>

      {/* Badges — staggered entry + hover lift */}
      <motion.div
        className="flex flex-wrap gap-2"
        variants={badgeContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {layer.technologies.map((tech) => {
          const s = TECH_COLORS[tech] ?? DEFAULT_BADGE;
          return (
            <motion.span
              key={tech}
              variants={badgeItemVariants}
              whileHover={{ y: -2, scale: 1.07, transition: { duration: 0.14 } }}
              className="font-mono text-xs px-2.5 py-1 inline-block cursor-default"
              style={{
                background: s.bg,
                border: `1px solid ${s.border}`,
                color: s.text,
              }}
            >
              {tech}
            </motion.span>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

function SkillsSection() {
  const { c } = useLang();
  const sk = c.skills;
  const descRef = useRef<HTMLParagraphElement>(null);
  const descInView = useInView(descRef, { once: true, amount: 0.5 });

  return (
    <section id="skills" className="relative py-24 sm:py-28 bg-slate-950/35 hud-grid">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(0,212,255,0.05)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_70%,rgba(0,212,255,0.04)_0%,transparent_50%)]" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
        <SectionHeader label={sk.label} title={sk.title} />
        <motion.p
          ref={descRef}
          initial={{ opacity: 0, y: 14 }}
          animate={descInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="-mt-8 sm:-mt-10 mb-12 max-w-2xl text-sm sm:text-base text-slate-500 leading-relaxed"
        >
          {sk.description}
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sk.layers.map((layer, i) => (
            <TechLayerCard key={layer.index} layer={layer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { c } = useLang();
  const ab = c.about;

  return (
    <section id="about" className="relative py-24 sm:py-28 hud-grid">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,212,255,0.06)_0%,transparent_55%)]" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
        <SectionHeader label={ab.label} title={ab.title} />
        <div ref={ref} className="grid md:grid-cols-2 gap-14 items-start">
          {/* Bio + photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* Compact profile card */}
            <div className="flex items-center gap-5 mb-2 p-4 border border-slate-800/60 bg-slate-950/40">
              <ProfilePhoto size={72} />
              <div>
                <p className="font-mono text-xs text-cyan-400/70 tracking-widest uppercase mb-1">
                  {ab.label.replace("// ", "")}
                </p>
                <p className="text-white font-semibold text-base leading-snug">Luiz Wessel</p>
                <p className="text-slate-500 text-xs font-mono mt-0.5">{c.hero.role}</p>
              </div>
            </div>

            <div className="space-y-5 text-slate-400 leading-relaxed text-[0.95rem]">
              {ab.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}

              <div className="pt-2 border-t border-slate-800/60">
                <p className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase mb-2">
                  {ab.currentSignalLabel}
                </p>
                <p className="text-slate-400 text-sm">{ab.currentSignal}</p>
              </div>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-2 gap-3"
          >
            {ab.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-950/55 border border-slate-800/60 p-6 text-center glow-box"
              >
                <div className="text-3xl font-bold text-cyan-400 glow-text-sm mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 font-mono uppercase tracking-widest leading-relaxed">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { c } = useLang();
  const ct = c.contact;

  return (
    <section id="contact" className="relative py-24 sm:py-28 bg-slate-950/35">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,212,255,0.07)_0%,transparent_55%)]" />
      <div ref={ref} className="relative max-w-6xl mx-auto px-5 sm:px-6 text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs text-cyan-400/75 tracking-[0.3em] uppercase mb-4"
          >
            {ct.label}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {ct.title}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-slate-400 max-w-lg mx-auto mb-14 leading-relaxed"
          >
            {ct.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
          >
            {ct.links.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.18 }}
                className="group flex justify-center items-center gap-3 px-7 py-4 bg-slate-950/55 border border-slate-700/45 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-colors duration-300 glow-box-hover"
              >
                <span className="font-mono text-xs text-cyan-500/55 group-hover:text-cyan-400 transition-colors">
                  [{link.tag}]
                </span>
                <span className="font-medium text-sm">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-20 sm:mt-24 border-t border-slate-800/40 pt-8 max-w-6xl mx-auto px-5 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3 md:items-center">
          <span className="font-mono text-xs text-slate-700">
            {ct.footerBuild}
          </span>
          <span className="font-mono text-xs text-cyan-500/35 tracking-widest md:text-center">
            {ct.footerStatus}
          </span>
          <span className="font-mono text-xs text-slate-700 md:text-right">
            {ct.footerSync}
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const { lang } = useLang();
  const [fading, setFading] = useState(false);
  const prevLangRef = useRef(lang);

  useEffect(() => {
    if (prevLangRef.current !== lang) {
      setFading(true);
      const t = setTimeout(() => setFading(false), 180);
      prevLangRef.current = lang;
      return () => clearTimeout(t);
    }
  }, [lang]);

  return (
    <>
      <ScrollProgressBar />
      <motion.main
        className="bg-[#050810] min-h-screen overflow-x-hidden"
        animate={{ opacity: fading ? 0.08 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <NavBar />
        <HeroSection />
        <FeaturedProject />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </motion.main>
    </>
  );
}
