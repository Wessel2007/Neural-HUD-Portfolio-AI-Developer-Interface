import React, { useContext, useEffect, useRef, useState } from 'react';
import { LangContext } from '../context.js';
import { CONTENT, TECH_COLORS, BADGE_DEFAULT } from '../data.js';
import { TextScramble, Particles } from '../lib/runtime.js';
import wesselPhoto from '../assets/wessel.png';

// ─── TechBadge ────────────────────────────────────────────────────────────────
export function TechBadge({ tech, xs }) {
  const s = TECH_COLORS[tech] || BADGE_DEFAULT;
  return (
    <span className="badge" style={{ background:s.bg, border:`1px solid ${s.border}`, color:s.text, fontSize: xs?'.65rem':'.7rem', padding: xs?'2px 7px':'3px 9px' }}>
      {tech}
    </span>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
export function SectionHeader({ label, title, id }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        io.disconnect();
        const scrambler = new TextScramble(el);
        scrambler.setText(title);
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [title]);

  return (
    <div className="sr" style={{ marginBottom:'48px' }}>
      <p className="sec-lbl">{label}</p>
      <h2 ref={ref} id={id} style={{ fontSize:'clamp(1.6rem,4vw,2.6rem)', fontWeight:700, color:'var(--txt-1)', letterSpacing:'-.02em', lineHeight:1.1, minHeight:'1.2em' }}>
        {title}
      </h2>
      <div style={{ marginTop:'14px', display:'flex', alignItems:'center', gap:'12px' }}>
        <div style={{ width:'40px', height:'1px', background:'rgba(0,212,255,.5)', boxShadow:'0 0 8px rgba(0,212,255,.3)' }} />
        <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,.035)' }} />
      </div>
    </div>
  );
}

// ─── LangToggle ───────────────────────────────────────────────────────────────
function LangToggle({ compact }) {
  const { lang, toggle } = useContext(LangContext);
  const [hover, setHover] = useState(false);
  const btnStyle = {
    position:'relative', display:'flex', alignItems:'center', justifyContent:'center',
    fontFamily:'var(--mono)', fontSize: compact ? '.58rem' : '.62rem',
    letterSpacing: compact ? '.1em' : '.18em', textTransform:'uppercase',
    border:`1px solid ${hover?'rgba(0,212,255,.28)':'rgba(255,255,255,.08)'}`,
    color: hover?'rgba(0,212,255,.9)':'rgba(120,145,175,.8)',
    padding: compact ? '6px 8px' : '6px 12px',
    background: hover?'rgba(0,212,255,.06)':'transparent',
    transition:'all .25s', overflow:'hidden', flexShrink:0, gap: compact ? 0 : '6px',
  };
  if (compact) {
    return (
      <button className="lang-toggle-compact" onClick={toggle} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={btnStyle} aria-label="Toggle language">
        <span style={{ color:'rgba(0,212,255,.75)' }}>{lang==='en'?'EN':'PT'}</span>
      </button>
    );
  }
  return (
    <button className="lang-toggle-full" onClick={toggle} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} style={btnStyle}>
      {hover && <span style={{ position:'absolute', inset:0, top:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(0,212,255,.4),transparent)', pointerEvents:'none' }} />}
      <span style={{ color:'rgba(0,212,255,.65)' }}>{lang==='en'?'EN':'PT'}</span>
      <span style={{ color:'rgba(255,255,255,.2)' }}>{'→'}</span>
      <span style={{ color:'rgba(100,130,165,.5)' }}>{lang==='en'?'PT':'EN'}</span>
    </button>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
export function NavBar() {
  const { lang } = useContext(LangContext);
  const c = CONTENT[lang];
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(false);

  useEffect(() => { menuOpenRef.current = menuOpen; }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll('section[id]');
      let cur = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
      setActive(cur);
      if (menuOpenRef.current) setMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const nav = document.getElementById('nav');
    if (nav) nav.className = scrolled ? 'scrolled' : '';
  }, [scrolled]);

  return (
    <nav id="nav" style={{ opacity:0, transform:'translateY(-56px)', animation:'fadeUp .6s .05s var(--ease) forwards' }}>
      <div id="nav-inner">
        <a href="#home" className="nav-brand" aria-label="Luiz Wessel — Home">LW<span style={{ color: "var(--txt-1)" }}> / </span>PORTFOLIO<span style={{ color: "var(--txt-2)" }}> ®</span></a>
        <ul className="hide-mobile" style={{ gap:'clamp(14px,2.4vw,28px)', listStyle:'none', alignItems:'center', margin:0, padding:0 }}>
          {c.navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} style={{
                fontFamily:'var(--mono)', fontSize:'.68rem', letterSpacing:'.14em', textTransform:'uppercase',
                color: active===link.href.slice(1) ? 'var(--cyan)' : 'rgba(120,145,175,.75)',
                transition:'color .2s', whiteSpace:'nowrap',
              }}
              onMouseEnter={e=>e.target.style.color='var(--cyan)'}
              onMouseLeave={e=>e.target.style.color=active===link.href.slice(1)?'var(--cyan)':'rgba(120,145,175,.75)'}
              >{link.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <LangToggle compact />
          <LangToggle />
          <button
            className="show-mob"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            style={{
              display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'5px',
              width:'36px', height:'36px', cursor:'pointer', padding:'4px', flexShrink:0,
              border:`1px solid ${menuOpen ? 'rgba(0,212,255,.35)' : 'rgba(0,212,255,.15)'}`,
              background: menuOpen ? 'rgba(0,212,255,.06)' : 'transparent',
              transition:'border-color .2s, background .2s',
            }}
          >
            <span style={{ display:'block', width:'16px', height:'1px', background:'rgba(0,212,255,.65)', transition:'transform .25s, opacity .2s', transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
            <span style={{ display:'block', width:'16px', height:'1px', background:'rgba(0,212,255,.65)', transition:'opacity .2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display:'block', width:'16px', height:'1px', background:'rgba(0,212,255,.65)', transition:'transform .25s, opacity .2s', transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="mob-menu">
          <ul style={{ listStyle:'none', padding:0, margin:0 }}>
            {c.navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={active === link.href.slice(1) ? 'mob-active' : ''}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

// ─── ProfilePhoto ─────────────────────────────────────────────────────────────
export function ProfilePhoto({ size }) {
  size = size || 200;
  return (
    <div style={{ position:'relative', width:size, height:size, flexShrink:0 }}>
      {/* Orbit rings */}
      <div className="orbit-outer"><div className="orbit-dot" /></div>
      <div className="orbit-inner" />
      {/* Glow halo */}
      <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,212,255,.16) 0%,transparent 70%)', boxShadow:'0 0 36px rgba(0,212,255,.18),0 0 80px rgba(0,212,255,.06)' }} />
      {/* Radar sweep */}
      <div className="radar-wrap" />
      {/* Corner HUD marks */}
      {[['top:4px','left:4px','borderLeft','borderTop'],['top:4px','right:4px','borderRight','borderTop'],['bottom:4px','left:4px','borderLeft','borderBottom'],['bottom:4px','right:4px','borderRight','borderBottom']].map(([t,l,b1,b2],i)=>(
        <span key={i} style={{ position:'absolute', ...Object.fromEntries([[t.split(':')[0],t.split(':')[1]],[l.split(':')[0],l.split(':')[1]]]), width:12, height:12, [b1]:'1px solid rgba(0,212,255,.6)', [b2]:'1px solid rgba(0,212,255,.6)' }} />
      ))}
      {/* Photo */}
      <div style={{ position:'relative', width:size, height:size, borderRadius:'50%', overflow:'hidden', border:'1.5px solid rgba(0,212,255,.28)', boxShadow:'inset 0 0 20px rgba(0,212,255,.08)' }}>
        <img src={wesselPhoto} alt="Luiz Wessel" width={size} height={size} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
      </div>
      {/* Status dot */}
      <span style={{ position:'absolute', bottom:size*.08, right:size*.08, width:11, height:11, borderRadius:'50%', background:'var(--cyan)', border:'2px solid var(--bg)', boxShadow:'0 0 8px rgba(0,212,255,.9)' }} className="p-dot" />
    </div>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
const MODE_TECH_FILTERS = [
  (tech) => /OpenCV|YOLO/.test(tech),
  (tech) => /PyTorch|Claude|Gemini|Groq|Llama|Machine Learning/.test(tech),
  (tech) => /Arduino|IoT|Ollama|n8n/.test(tech),
];

function useModeProjects(lang) {
  const proj = CONTENT[lang].projects.items;
  const featured = CONTENT[lang].featured.project;
  const pool = [featured, ...proj];
  return MODE_TECH_FILTERS.map((matches) =>
    pool.filter((p) => matches(p.technologies.join(' '))).slice(0, 2)
  );
}

function goToProject(title) {
  window.dispatchEvent(new CustomEvent('portfolio:searchProject', { detail: title }));
}

export function HeroSection() {
  const { lang } = useContext(LangContext);
  const pt = lang === 'pt';
  const [mode, setMode] = useState(0);
  const modes = ['Computer vision', 'Neural networks', 'Edge systems'];
  const modeProjects = useModeProjects(lang);
  const canvasRef = useRef(null);
  useEffect(() => { const particles = new Particles(canvasRef.current); return () => particles.destroy(); }, []);
  return (
    <section id="home" className="hero-v4 hud-grid">
      <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />
      <div className="c hero-layout">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> {pt ? 'DISPONÍVEL PARA NOVAS OPORTUNIDADES' : 'AVAILABLE FOR NEW OPPORTUNITIES'}</div>
          <div className="hero-name-row">
            <div className="id-scan" aria-hidden="true">
              <ProfilePhoto size={72} />
              <span className="id-scan-corner tl" /><span className="id-scan-corner tr" /><span className="id-scan-corner bl" /><span className="id-scan-corner br" />
            </div>
            <div className="hero-name-block">
              <p className="hero-intro">{pt ? 'Olá, eu sou' : "Hi, I’m"}</p>
              <p className="hero-name">Luiz Wessel</p>
              <span className="id-confirmed" aria-hidden="true">✓ {pt ? 'IDENTIDADE CONFIRMADA' : 'IDENTITY CONFIRMED'}</span>
            </div>
          </div>
          <h1>{pt ? 'Transformando' : 'Turning'}<br />{pt ? 'ideias em' : 'ideas into'}<br /><span>{pt ? 'inteligência.' : 'intelligence.'}</span></h1>
          <p className="hero-summary">{pt ? 'IA, visão computacional e software que sai da tela e transforma o mundo real.' : 'AI, computer vision, and software that goes beyond the screen and into the real world.'}</p>
          <div className="hero-cta"><a href="#projects" className="btn-p">{pt ? 'Explorar projetos' : 'Explore my work'} <span>↗</span></a><a href="#contact" className="btn-s">{pt ? 'Vamos conversar' : 'Let’s connect'} <span>↗</span></a></div>
          <div className="hero-signature"><div><strong>AI & Computer Vision Developer</strong><span>Biopark · Brasil <span className="signature-plus">+ {pt ? 'curiosidade sem limites' : 'endless curiosity'}</span></span></div></div>
        </div>
        <div className="neural-panel">
          <div className="panel-top"><span><span className="live-dot" /> NEURAL EXPLORER</span><span>v.04</span></div>
          <div className={'neural-scene mode-' + mode} aria-hidden="true">
            <div className="scene-cross cross-one">+</div><div className="scene-cross cross-two">+</div>
            <div className="neural-orb">
              {Array.from({length: 12}, (_, i) => <div key={i} className="orb-ring" style={{'--i': i}} />)}
              <div className="orb-core" /><div className="orb-equator" />
              {/* Vision: focus brackets + scan sweep, like a camera locking onto a target */}
              <div className="vision-focus"><span /><span /><span /><span /></div>
              <div className="vision-scan" />
              {/* Neural: pulses expanding from the core, like activation propagating through layers */}
              <div className="neural-pulse-ring p1" /><div className="neural-pulse-ring p2" /><div className="neural-pulse-ring p3" />
              {/* Edge: a ping traveling out and fading, like a local inference round-trip */}
              <div className="edge-ping" />
            </div>
            <div className="scene-label label-one">{['INPUT / VISION', 'INPUT / DATA', 'INPUT / SENSOR'][mode]}<b>{['01 → 128 → 01', '128 → 256 → 512', 'EDGE → INFERENCE'][mode]}</b></div>
            <div className="scene-label label-two">{['OBJECT DETECTION', 'PATTERN RECOGNITION', 'LOCAL INTELLIGENCE'][mode]}<b>● {(pt ? ['ESCANEANDO', 'PROPAGANDO SINAL', 'PING LOCAL'] : ['SCANNING', 'SIGNAL PROPAGATING', 'LOCAL PING'])[mode]}</b></div>
          </div>
          <div className="neural-controls" aria-label={pt ? 'Modo da visualização' : 'Visualization mode'}>{modes.map((m, i) => <button key={m} aria-pressed={mode === i} className={mode === i ? 'selected' : ''} onClick={() => setMode(i)}><span>0{i+1}</span>{m}</button>)}</div>
          <div className="neural-related">
            <span className="neural-related-label">{pt ? 'PROJETOS REAIS NESTE DOMÍNIO' : 'REAL PROJECTS IN THIS DOMAIN'}</span>
            <div className="neural-related-list">
              {modeProjects[mode].map(p => {
                const isFeatured = p.title === CONTENT[lang].featured.project.title;
                return (
                  <a key={p.title} href={isFeatured ? '#featured' : '#projects'} className="neural-related-chip" onClick={() => !isFeatured && goToProject(p.title)}>
                    {p.title.split(' — ')[0]}<span>↗</span>
                  </a>
                );
              })}
            </div>
          </div>
          <div className="panel-bottom"><span>{pt ? 'SELECIONE UM DOMÍNIO PARA EXPLORAR' : 'SELECT A DOMAIN TO EXPLORE'}</span><span>↗</span></div>
        </div>
      </div>
      <div className="c hero-bottom"><span>PYTHON <i>/</i> PYTORCH <i>/</i> OPENCV <i>/</i> REACT <i>/</i> FASTAPI</span><a href="#featured">{pt ? 'CONTINUE EXPLORANDO' : 'SCROLL TO EXPLORE'} ↓</a></div>
    </section>
  );
}
