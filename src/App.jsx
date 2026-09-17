import React, { useCallback, useEffect, useState } from 'react';
import { LangContext } from './context.js';
import { NavBar, HeroSection } from './components/Shared.jsx';
import {
  FeaturedProject,
  ProjectsSection,
  SkillsSection,
  HackathonsSection,
  AboutSection,
  PublicationsSection,
  ContactSection,
} from './components/Sections.jsx';
import { initScrollReveal } from './lib/runtime.js';

const LANG_STORAGE_KEY = 'portfolio-lang';

function getInitialLang() {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'en' || stored === 'pt') return stored;
  } catch (e) {
    // localStorage unavailable (private mode, etc.) — fall back to default
  }
  return typeof navigator !== 'undefined' && navigator.language.startsWith('pt') ? 'pt' : 'en';
}

export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [fading, setFading] = useState(false);

  const toggle = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setLang((l) => {
        const next = l === 'en' ? 'pt' : 'en';
        try { window.localStorage.setItem(LANG_STORAGE_KEY, next); } catch (e) { /* ignore */ }
        return next;
      });
      setFading(false);
    }, 160);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    // Re-init scroll animations after lang change
    const t = setTimeout(() => { window._initSR = initScrollReveal; window._initSR(); }, 800);
    return () => clearTimeout(t);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      <div style={{ opacity: fading ? 0.08 : 1, transition:'opacity .15s', background:'var(--bg)', minHeight:'100vh' }}>
        <a className="skip-link" href="#main-content">{lang === 'pt' ? 'Pular para conteúdo' : 'Skip to content'}</a><NavBar />
        <main id="main-content"><HeroSection />
        <FeaturedProject />
        <ProjectsSection />
        <SkillsSection />
        <HackathonsSection />
        <AboutSection />
        <PublicationsSection />
        <ContactSection /></main>
      </div>
    </LangContext.Provider>
  );
}
