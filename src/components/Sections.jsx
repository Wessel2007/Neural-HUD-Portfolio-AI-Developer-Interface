import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { LangContext } from '../context.js';
import { CONTENT, TECH_COLORS, BADGE_DEFAULT } from '../data.js';
import { initTilt, countUp } from '../lib/runtime.js';
import { TechBadge, SectionHeader, ProfilePhoto } from './Shared.jsx';

// ─── Status Badge ─────────────────────────────────────────────────────────────
export function StatusBadge({ status }) {
  const { lang } = useContext(LangContext);
  const configs = {
    done:     { label: lang==='pt'?'CONCLUÍDO':'COMPLETED', color:'#34D399', bg:'rgba(52,211,153,.09)',  border:'rgba(52,211,153,.30)',  pulse:false },
    dev:      { label: lang==='pt'?'EM DEV':'IN DEV',       color:'#FBBF24', bg:'rgba(251,191,36,.09)',  border:'rgba(251,191,36,.30)',  pulse:true  },
    archived: { label: lang==='pt'?'ARQUIVADO':'ARCHIVED',  color:'#64748B', bg:'rgba(100,116,139,.07)', border:'rgba(100,116,139,.22)', pulse:false },
  };
  const cfg = configs[status] || configs.done;
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:'5px',
      fontFamily:'var(--mono)', fontSize:'.55rem', letterSpacing:'.16em', textTransform:'uppercase',
      color:cfg.color, background:cfg.bg, border:`1px solid ${cfg.border}`,
      padding:'2px 8px', flexShrink:0,
    }}>
      <span style={{
        width:'5px', height:'5px', borderRadius:'50%', background:cfg.color, flexShrink:0,
        ...(cfg.pulse ? { animation:'pulseDot 2.2s ease-in-out infinite' } : { opacity: status==='archived' ? .4 : 1 }),
      }} />
      {cfg.label}
    </span>
  );
}

// ─── Featured Project ─────────────────────────────────────────────────────────
export function FeaturedProject() {
  const { lang } = useContext(LangContext);
  const f = CONTENT[lang].featured;
  const p = f.project;
  const ref = useRef(null);

  useEffect(() => { initTilt(ref.current); }, []);

  return (
    <section id="featured" style={{ position:'relative', padding:'clamp(80px,10vw,120px) 0' }} className="hud-grid">
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 20%, rgba(0,212,255,.055) 0%, transparent 55%)', pointerEvents:'none' }} />
      <div className="c" style={{ position:'relative' }}>
        <SectionHeader label={f.label} title={f.title} />
        <div className="sr card clip-lg" ref={ref} style={{ position:'relative', overflow:'hidden', padding:'clamp(24px,4vw,48px)', background:'rgba(5,8,20,.75)' }}>
          {/* Top accent line */}
          <div style={{ position:'absolute', inset:'0 0 auto 0', height:'1px', background:'linear-gradient(90deg,transparent,rgba(0,212,255,.5),transparent)' }} />
          {/* Corner glow */}
          <div style={{ position:'absolute', top:'-60px', right:'-60px', width:'220px', height:'220px', borderRadius:'50%', background:'rgba(0,212,255,.06)', filter:'blur(40px)', pointerEvents:'none' }} />
          {/* Dot grid decoration */}
          <div style={{ position:'absolute', bottom:'20px', right:'20px', display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'5px', opacity:.2 }}>
            {Array.from({length:25}).map((_,i)=><span key={i} style={{ width:'3px', height:'3px', background:'var(--cyan)', borderRadius:'50%' }} />)}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'clamp(24px,5vw,48px)', alignItems:'start' }}>
            {/* Left */}
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap', marginBottom:'14px' }}>
                <p style={{ fontFamily:'var(--mono)', fontSize:'.66rem', letterSpacing:'.24em', textTransform:'uppercase', color:'rgba(0,212,255,.7)', margin:0 }}>{p.category}</p>
                {p.status && <StatusBadge status={p.status} />}
              </div>
              <h3 style={{ fontSize:'clamp(1.4rem,3.5vw,2rem)', fontWeight:700, color:'var(--txt-1)', letterSpacing:'-.02em', marginBottom:'20px', lineHeight:1.15 }}>{p.title}</h3>
              <p style={{ color:'var(--txt-2)', lineHeight:1.75, fontSize:'.95rem', marginBottom:'28px', maxWidth:'680px' }}>{f.intro}</p>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:'12px' }}>
                {[{lbl:f.problemLabel, val:p.problem},{lbl:f.solutionLabel, val:p.solution}].map(({lbl,val})=>(
                  <div key={lbl} style={{ border:'1px solid rgba(255,255,255,.055)', background:'rgba(0,0,0,.2)', padding:'16px' }}>
                    <span style={{ fontFamily:'var(--mono)', fontSize:'.62rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(140,163,190,.68)' }}>{lbl}</span>
                    <p style={{ marginTop:'8px', fontSize:'.88rem', color:'rgba(200,220,245,.8)', lineHeight:1.65 }}>{val}</p>
                  </div>
                ))}
              </div>

              {/* Measured Results */}
              {p.metrics && p.metrics.length > 0 && (
                <div style={{ marginTop:'28px' }}>
                  <span style={{ fontFamily:'var(--mono)', fontSize:'.62rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(0,212,255,.65)' }}>{f.metricsLabel}</span>
                  <div style={{ marginTop:'12px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:'10px' }}>
                    {p.metrics.map((m) => (
                      <div key={m.label} className="stat-card clip-sm" style={{ padding:'16px 12px' }}>
                        <div className="stat-val" style={{ fontSize:'1.4rem' }}>{m.value}</div>
                        <div className="stat-lbl" style={{ letterSpacing:'.08em', textTransform:'none', fontSize:'.62rem', lineHeight:1.4 }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right */}
            <div style={{ paddingTop:'4px' }}>
              <div style={{ marginBottom:'24px' }}>
                <span style={{ fontFamily:'var(--mono)', fontSize:'.62rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(0,212,255,.65)' }}>{f.signalLabel}</span>
                <p style={{ marginTop:'8px', fontSize:'.9rem', color:'rgba(200,220,245,.8)', lineHeight:1.65 }}>{p.signal}</p>
              </div>
              <div style={{ marginBottom:'28px' }}>
                <span style={{ fontFamily:'var(--mono)', fontSize:'.62rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(0,212,255,.65)' }}>{f.techLabel}</span>
                <div style={{ marginTop:'12px', display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {p.technologies.map(t=><TechBadge key={t} tech={t} />)}
                </div>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'10px' }}>
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-p clip-sm">{f.githubBtn}</a>
                {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-s clip-sm">{f.demoBtn}</a>}
              </div>
            </div>
          </div>

          <style>{`@media(min-width:860px){.feat-grid{grid-template-columns:1.1fr .9fr!important; gap:48px!important}}`}</style>
        </div>
      </div>
    </section>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, delay, labels }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  useEffect(() => { initTilt(ref.current); }, []);

  return (
    <div
      ref={ref}
      className={`sr card clip-sm d${delay}`}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{ position:'relative', padding:'clamp(18px,3vw,24px)', display:'flex', flexDirection:'column', gap:'16px', overflow:'hidden', cursor:'default' }}
    >
      {/* Top scan accent */}
      <div style={{ position:'absolute', inset:'0 0 auto 0', height:'1px', background:`linear-gradient(90deg,transparent,${hovered?'rgba(0,212,255,.5)':'rgba(0,212,255,.18)'},transparent)`, transition:'opacity .3s' }} />
      {/* Left bar */}
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'1px', background:`linear-gradient(to bottom,${hovered?'rgba(0,212,255,.5)':'rgba(0,212,255,.22)'},transparent)`, transition:'opacity .3s' }} />
      {/* Scan line */}
      <div className="scan-line" style={{ position:'absolute', left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(0,212,255,.18),transparent)', animationDelay:`${delay*.9}s` }} />
      {/* Radial hover glow */}
      <div style={{ position:'absolute', top:'-30px', right:'-30px', width:'180px', height:'180px', borderRadius:'50%', background:'rgba(0,212,255,.06)', filter:'blur(35px)', opacity: hovered?1:0, transition:'opacity .4s', pointerEvents:'none' }} />

      {/* Header */}
      <div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'8px', flexWrap:'wrap', marginBottom:'10px' }}>
          <p style={{ fontFamily:'var(--mono)', fontSize:'.62rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(0,212,255,.6)', margin:0 }}>{project.category}</p>
          {project.status && <StatusBadge status={project.status} />}
        </div>
        <h3 style={{ fontSize:'1.02rem', fontWeight:600, color: hovered?'rgba(200,225,255,1)':'var(--txt-1)', transition:'color .2s', lineHeight:1.3 }}>{project.title}</h3>
      </div>

      {/* Problem / Solution */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', gap:'12px' }}>
        {[{lbl:labels.problem,val:project.problem,col:'rgba(140,163,190,.65)'},{lbl:labels.solution,val:project.solution,col:'rgba(140,163,190,.65)'}].map(({lbl,val,col})=>(
          <div key={lbl}>
            <p style={{ fontFamily:'var(--mono)', fontSize:'.58rem', letterSpacing:'.2em', textTransform:'uppercase', color:col, marginBottom:'5px' }}>{lbl}</p>
            <p style={{ fontSize:'.84rem', color:'rgba(160,185,215,.8)', lineHeight:1.65 }}>{val}</p>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
        {project.technologies.map(t=><TechBadge key={t} tech={t} xs />)}
      </div>

      {/* Links */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,.05)', paddingTop:'12px', display:'flex', flexWrap:'wrap', gap:'16px' }}>
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily:'var(--mono)', fontSize:'.68rem', color:'rgba(0,212,255,.65)', display:'flex', alignItems:'center', gap:'6px', transition:'color .2s' }}
          onMouseEnter={e=>e.currentTarget.style.color='var(--cyan)'}
          onMouseLeave={e=>e.currentTarget.style.color='rgba(0,212,255,.65)'}
        >{labels.github} <span>→</span></a>
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:'var(--mono)', fontSize:'.68rem', color:'rgba(120,145,175,.6)', display:'flex', alignItems:'center', gap:'6px', transition:'color .2s' }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--txt-1)'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(120,145,175,.6)'}
          >{labels.demo} <span>→</span></a>
        )}
      </div>
    </div>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
export function ProjectsSection() {
  const { lang } = useContext(LangContext);
  const proj = CONTENT[lang].projects;
  const labels = { problem:proj.problemLabel, solution:proj.solutionLabel, github:proj.githubLabel, demo:proj.demoLabel };

  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => { setActiveFilter('all'); }, [lang]);

  useEffect(() => {
    if (window._initSR) window._initSR();
  }, [activeFilter]);

  const allLabel = lang === 'pt' ? 'Todos' : 'All';
  const categories = useMemo(() => {
    const seen = new Set();
    proj.items.forEach(item => { if (item.category) seen.add(item.category); });
    return Array.from(seen);
  }, [proj]);

  const filtered = activeFilter === 'all'
    ? proj.items
    : proj.items.filter(item => item.category === activeFilter);

  return (
    <section id="projects" style={{ position:'relative', padding:'clamp(80px,10vw,120px) 0' }} className="hud-grid">
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 100% 50%, rgba(0,212,255,.042) 0%, transparent 55%)', pointerEvents:'none' }} />
      <div className="c" style={{ position:'relative' }}>
        <SectionHeader label={proj.label} title={proj.title} />

        {/* Filter bar */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginTop:'-24px', marginBottom:'36px' }}>
          {[allLabel, ...categories].map(cat => {
            const isActive = cat === allLabel ? activeFilter === 'all' : activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat === allLabel ? 'all' : cat)}
                style={{
                  fontFamily:'var(--mono)', fontSize:'.62rem', letterSpacing:'.16em',
                  textTransform:'uppercase', padding:'5px 14px',
                  border:`1px solid ${isActive ? 'rgba(0,212,255,.45)' : 'rgba(0,212,255,.12)'}`,
                  background: isActive ? 'rgba(0,212,255,.08)' : 'transparent',
                  color: isActive ? 'rgba(0,212,255,.95)' : 'rgba(120,145,175,.65)',
                  cursor:'pointer', transition:'all .2s',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor='rgba(0,212,255,.28)'; e.currentTarget.style.color='rgba(160,190,220,.9)'; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor='rgba(0,212,255,.12)'; e.currentTarget.style.color='rgba(120,145,175,.65)'; } }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(300px,100%),1fr))', gap:'14px' }}>
          {filtered.map((item,i) => (
            <ProjectCard key={item.title} project={item} delay={(i%5)+1} labels={labels} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tech Layer Card ──────────────────────────────────────────────────────────
function LayerCard({ layer, idx }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`sr card clip-sm d${idx+1}`}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{ position:'relative', padding:'clamp(18px,3vw,24px)', display:'flex', flexDirection:'column', gap:'16px', overflow:'hidden', cursor:'default',
        borderColor: hovered?'rgba(0,212,255,.26)':'rgba(0,212,255,.08)',
        boxShadow: hovered?'0 0 40px rgba(0,212,255,.09),0 12px 36px rgba(0,0,0,.4)':'none',
        transition:'border-color .3s, box-shadow .3s',
      }}
    >
      {/* Scan line */}
      <div className="scan-line" style={{ position:'absolute', left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,rgba(0,212,255,.18),transparent)', animationDelay:`${idx*-.85}s` }} />
      {/* Left accent */}
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'1px', background:`linear-gradient(to bottom,${hovered?'rgba(0,212,255,.55)':'rgba(0,212,255,.25)'},transparent)`, transition:'background .3s' }} />
      {/* Top accent */}
      <div style={{ position:'absolute', inset:'0 0 auto 0', height:'1px', background:`linear-gradient(90deg,transparent,${hovered?'rgba(0,212,255,.5)':'rgba(0,212,255,.18)'},transparent)`, transition:'background .3s' }} />
      {/* Hover glow orb */}
      <div style={{ position:'absolute', top:'-40px', right:'-40px', width:'200px', height:'200px', borderRadius:'50%', background:'radial-gradient(circle,rgba(0,212,255,.08) 0%,transparent 70%)', opacity:hovered?1:0, transition:'opacity .4s', pointerEvents:'none' }} />

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'8px' }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:'10px' }}>
          <span style={{ fontFamily:'var(--mono)', fontSize:'.62rem', letterSpacing:'.22em', color: hovered?'rgba(0,212,255,.9)':'rgba(0,212,255,.45)', transition:'color .25s' }}>[{layer.index}]</span>
          <h3 style={{ fontSize:'.95rem', fontWeight:600, color: hovered?'#fff':'var(--txt-1)', transition:'color .2s', letterSpacing:'-.01em' }}>{layer.title}</h3>
        </div>
        <span className="p-dot" style={{ width:'6px', height:'6px', borderRadius:'50%', background:'var(--cyan)', flexShrink:0, animationDelay:`${idx*.38}s` }} />
      </div>

      {/* Badges */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:'7px' }}>
        {layer.technologies.map((tech,ti) => {
          const s = TECH_COLORS[tech] || BADGE_DEFAULT;
          return (
            <span
              key={tech}
              className="badge"
              style={{
                background:s.bg,
                border:`1px solid ${s.border}`,
                color:s.text,
                opacity: 0,
                animation: `fadeUp .4s ${.28+ti*.055}s var(--ease) both`,
              }}
            >{tech}</span>
          );
        })}
      </div>
    </div>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────
export function SkillsSection() {
  const { lang } = useContext(LangContext);
  const sk = CONTENT[lang].skills;

  return (
    <section id="skills" style={{ position:'relative', padding:'clamp(80px,10vw,120px) 0', background:'rgba(3,5,14,.4)' }} className="hud-grid">
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 0% 50%, rgba(0,212,255,.042) 0%, transparent 55%)', pointerEvents:'none' }} />
      <div className="c" style={{ position:'relative' }}>
        <SectionHeader label={sk.label} title={sk.title} />
        <p className="sr" style={{ marginTop:'-30px', marginBottom:'40px', maxWidth:'600px', fontSize:'.9rem', color:'var(--txt-2)', lineHeight:1.75 }}>{sk.description}</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(290px,100%),1fr))', gap:'14px' }}>
          {sk.layers.map((layer,i)=><LayerCard key={layer.index} layer={layer} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Hackathon Card ───────────────────────────────────────────────────────────
function HackathonCard({ item, idx }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`sr card clip-sm d${idx+1}`}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{
        position:'relative', padding:'clamp(20px,3vw,28px)', display:'flex', flexDirection:'column', gap:'14px', overflow:'hidden',
        borderColor: item.highlight ? 'rgba(240,164,41,.35)' : (hovered?'rgba(0,212,255,.26)':'rgba(0,212,255,.08)'),
        boxShadow: item.highlight ? '0 0 40px rgba(240,164,41,.08)' : (hovered?'0 0 40px rgba(0,212,255,.09)':'none'),
        transition:'border-color .3s, box-shadow .3s',
      }}
    >
      {/* Top accent */}
      <div style={{ position:'absolute', inset:'0 0 auto 0', height:'2px', background: item.highlight ? 'linear-gradient(90deg,transparent,rgba(240,164,41,.7),transparent)' : `linear-gradient(90deg,transparent,${hovered?'rgba(0,212,255,.5)':'rgba(0,212,255,.18)'},transparent)` }} />

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'10px', flexWrap:'wrap' }}>
        <span style={{
          fontFamily:'var(--mono)', fontSize:'1.6rem', fontWeight:700, letterSpacing:'-.02em',
          color: item.highlight ? 'var(--amber)' : 'var(--cyan)',
          textShadow: item.highlight ? '0 0 18px rgba(240,164,41,.4)' : '0 0 14px rgba(0,212,255,.35)',
        }}>{item.place}</span>
        <span style={{
          fontFamily:'var(--mono)', fontSize:'.58rem', letterSpacing:'.18em', textTransform:'uppercase',
          color: item.highlight ? '#FBBF24' : 'rgba(148,175,205,.75)',
          border:`1px solid ${item.highlight?'rgba(251,191,36,.35)':'rgba(148,175,205,.25)'}`,
          padding:'3px 10px',
        }}>{item.award}</span>
      </div>

      <h3 style={{ fontSize:'1.05rem', fontWeight:600, color:'var(--txt-1)', lineHeight:1.3 }}>{item.title}</h3>
      <p style={{ fontFamily:'var(--mono)', fontSize:'.62rem', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(140,163,190,.6)' }}>{item.org}</p>
      <p style={{ fontSize:'.88rem', color:'rgba(160,185,215,.85)', lineHeight:1.7 }}>{item.description}</p>
    </div>
  );
}

// ─── Hackathons Section ───────────────────────────────────────────────────────
export function HackathonsSection() {
  const { lang } = useContext(LangContext);
  const hk = CONTENT[lang].hackathons;

  return (
    <section id="hackathons" style={{ position:'relative', padding:'clamp(80px,10vw,120px) 0' }} className="hud-grid">
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 100% 0%, rgba(240,164,41,.04) 0%, transparent 55%)', pointerEvents:'none' }} />
      <div className="c" style={{ position:'relative' }}>
        <SectionHeader label={hk.label} title={hk.title} />
        <p className="sr" style={{ marginTop:'-30px', marginBottom:'40px', maxWidth:'600px', fontSize:'.9rem', color:'var(--txt-2)', lineHeight:1.75 }}>{hk.description}</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(320px,100%),1fr))', gap:'14px' }}>
          {hk.items.map((item,i)=><HackathonCard key={item.title} item={item} idx={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
export function AboutSection() {
  const { lang } = useContext(LangContext);
  const ab = CONTENT[lang].about;
  const hero = CONTENT[lang].hero;
  const statsRef = useRef([]);
  const statsObserved = useRef(false);

  useEffect(() => {
    if (statsObserved.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        statsObserved.current = true;
        io.disconnect();
        statsRef.current.forEach((el, i) => {
          if (el) setTimeout(() => countUp(el, ab.stats[i].value), i * 120);
        });
      }
    }, { threshold: 0.4 });
    const section = document.getElementById('about');
    if (section) io.observe(section);
    return () => io.disconnect();
  }, [ab]);

  return (
    <section id="about" style={{ position:'relative', padding:'clamp(80px,10vw,120px) 0' }} className="hud-grid">
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 100%, rgba(0,212,255,.05) 0%, transparent 55%)', pointerEvents:'none' }} />
      <div className="c" style={{ position:'relative' }}>
        <SectionHeader label={ab.label} title={ab.title} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'clamp(40px,6vw,72px)', alignItems:'start' }}>
          {/* Bio side */}
          <div className="sr">
            {/* Profile card */}
            <div style={{ display:'flex', alignItems:'center', gap:'20px', padding:'16px 20px', border:'1px solid rgba(255,255,255,.055)', background:'rgba(5,8,18,.5)', marginBottom:'28px' }}>
              <ProfilePhoto size={68} />
              <div>
                <p style={{ fontFamily:'var(--mono)', fontSize:'.6rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(0,212,255,.6)', marginBottom:'4px' }}>PROFILE</p>
                <p style={{ fontWeight:600, fontSize:'.98rem', color:'var(--txt-1)', marginBottom:'2px' }}>Luiz Wessel</p>
                <p style={{ fontFamily:'var(--mono)', fontSize:'.65rem', color:'var(--txt-2)' }}>{hero.role}</p>
              </div>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'16px', marginBottom:'24px' }}>
              {ab.bio.map((p,i)=>(
                <p key={i} style={{ fontSize:'.92rem', color:'var(--txt-2)', lineHeight:1.8 }}>{p}</p>
              ))}
            </div>

            <div style={{ borderTop:'1px solid rgba(255,255,255,.055)', paddingTop:'20px' }}>
              <p style={{ fontFamily:'var(--mono)', fontSize:'.6rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(0,212,255,.55)', marginBottom:'8px' }}>{ab.signalLabel}</p>
              <p style={{ fontSize:'.88rem', color:'var(--txt-2)', lineHeight:1.7 }}>{ab.signal}</p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="sr d2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
            {ab.stats.map((stat,i) => (
              <div key={stat.label} className="stat-card clip-sm">
                <div className="stat-val" ref={el=>statsRef.current[i]=el}>{stat.value}</div>
                <div className="stat-lbl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(min-width:768px){#about .c > div > :first-child ~ div:last-child{grid-column:auto}} @media(min-width:768px){#about .c > div{grid-template-columns:1fr 1fr!important}}`}</style>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
export function ContactSection() {
  const { lang } = useContext(LangContext);
  const ct = CONTENT[lang].contact;

  return (
    <section id="contact" style={{ position:'relative', padding:'clamp(80px,10vw,120px) 0', background:'rgba(3,5,14,.4)', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,.065) 0%, transparent 55%)', pointerEvents:'none' }} />
      {/* Ambient orb */}
      <div className="amb" style={{ width:'600px', height:'400px', background:'rgba(0,212,255,.05)', top:'-100px', left:'50%', transform:'translateX(-50%)', animationDelay:'-2s' }} />

      <div className="c" style={{ position:'relative', textAlign:'center' }}>
        <p className="sr sec-lbl" style={{ marginBottom:'16px' }}>{ct.label}</p>

        <h2 className="sr d1 glow" style={{ fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:700, color:'var(--txt-1)', letterSpacing:'-.03em', marginBottom:'20px', lineHeight:1.1 }}>
          {ct.title}
        </h2>

        <p className="sr d2" style={{ fontSize:'.95rem', color:'var(--txt-2)', maxWidth:'480px', margin:'0 auto 56px', lineHeight:1.75 }}>
          {ct.description}
        </p>

        <div className="sr d3 contact-links" style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'12px', marginBottom:'72px' }}>
          {ct.links.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card clip-sm"
              style={{ display:'flex', alignItems:'center', gap:'12px', padding:'18px 28px', transition:'transform .25s var(--ease)', textDecoration:'none' }}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}
            >
              <span style={{ fontFamily:'var(--mono)', fontSize:'.62rem', color:'rgba(0,212,255,.55)', letterSpacing:'.12em' }}>[{link.tag}]</span>
              <span style={{ fontWeight:500, fontSize:'.9rem', color:'var(--txt-1)' }}>{link.label}</span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,.05)', paddingTop:'32px' }} className="footer-grid">
          <p style={{ fontFamily:'var(--mono)', fontSize:'.6rem', color:'rgba(255,255,255,.15)', letterSpacing:'.12em', textAlign:'left' }}>{ct.footerBuild}</p>
          <p style={{ fontFamily:'var(--mono)', fontSize:'.6rem', color:'rgba(0,212,255,.28)', letterSpacing:'.16em', textAlign:'center' }}>{ct.footerStatus}</p>
          <p style={{ fontFamily:'var(--mono)', fontSize:'.6rem', color:'rgba(255,255,255,.15)', letterSpacing:'.12em', textAlign:'right' }}>{ct.footerSync}</p>
        </div>
      </div>
    </section>
  );
}
