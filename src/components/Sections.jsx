import React, { useContext, useEffect, useRef, useState } from 'react';
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

  useEffect(() => initTilt(ref.current), []);

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

          <div className="feat-grid" style={{ display:'grid', gridTemplateColumns:'1fr', gap:'clamp(24px,5vw,48px)', alignItems:'start' }}>
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

// ─── Searchable project collection ───────────────────────────────────────────
function ProjectCard({ project, index, lang }) {
  const pt = lang === 'pt';
  const [expanded, setExpanded] = useState(false);
  const palette = /Palette/.test(project.title);
  const vision = /Vision|YOLO|OpenCV/.test(project.technologies.join(' '));
  return <article className="work-card">
    <div className={'project-art ' + (palette ? 'art-palette' : vision ? 'art-vision' : 'art-code')} aria-hidden="true">
      <span className="art-index">PROJECT / {String(index + 1).padStart(2, '0')}</span>
      {palette ? <div className="palette-swatches">{['#b0e6d1','#59b4a5','#296b70','#e6cfaa','#e89475'].map(color => <span key={color} style={{background:color}} />)}</div> : vision ? <div className="vision-target"><span>OBJECT_IDENTIFIED</span><div /><b>CV / {project.technologies.includes('YOLOv11') ? 'YOLOv11' : 'PIPELINE'}</b></div> : <div className="code-art"><span>~/ {project.title.split(' — ')[0].toLowerCase().replaceAll(' ', '-')}</span><p><i>const</i> future = <b>build</b>({'{'}</p><p>  ideas: <em>true</em>,</p><p>  possibilities: <em>Infinity</em></p><p>{'}'});<span className="code-caret">▌</span></p></div>}
      <span className="art-caption">{pt ? 'VISUAL CONCEITUAL' : 'CONCEPT VISUAL'}</span>
    </div>
    <div className="work-content"><div className="work-meta"><span>{project.category}</span><StatusBadge status={project.status} /></div><h3>{project.title}</h3><p>{project.problem}</p>
      <div className="work-tags">{project.technologies.slice(0, 4).map(t => <TechBadge key={t} tech={t} xs />)}{project.technologies.length > 4 && <span>+{project.technologies.length - 4}</span>}</div>
      <div className="work-actions"><button aria-expanded={expanded} onClick={() => setExpanded(v => !v)}>{pt ? 'Como foi construído' : 'How it was built'} <span>{expanded ? '−' : '+'}</span></button><a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={'GitHub — ' + project.title}>GitHub ↗</a></div>
      {expanded && <div className="work-details"><p>{project.solution}</p><div className="work-tags">{project.technologies.map(t => <TechBadge key={t} tech={t} xs />)}</div>{project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">{pt ? 'Abrir demo' : 'Open demo'} ↗</a>}</div>}
    </div>
  </article>;
}

export function ProjectsSection() {
  const { lang } = useContext(LangContext);
  const pt = lang === 'pt';
  const proj = CONTENT[lang].projects;
  const [active, setActive] = useState('all');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    const handler = (e) => { setActive('all'); setQuery(e.detail); setLimit(6); };
    window.addEventListener('portfolio:searchProject', handler);
    return () => window.removeEventListener('portfolio:searchProject', handler);
  }, []);

  const filters = [{id:'all', label:pt?'Todos':'All work'}, {id:'ai',label:'AI / ML'}, {id:'vision',label:pt?'Visão computacional':'Computer vision'}, {id:'web',label:'Web / Mobile'}, {id:'data',label:pt?'Dados & automação':'Data & automation'}];
  const matches = (p) => {
    const tech = p.technologies.join(' ');
    return active === 'all' || (active === 'ai' && /AI|IA|ML|Machine|Generativ/.test(p.category)) || (active === 'vision' && /OpenCV|YOLO/.test(tech)) || (active === 'web' && /React|Next|Streamlit/.test(tech)) || (active === 'data' && /DuckDB|n8n|Playwright/.test(tech));
  };
  const filtered = proj.items.filter(p => matches(p) && [p.title,p.category,...p.technologies].join(' ').toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  return <section id="projects" className="project-section"><div className="c">
    <SectionHeader label={proj.label} title={pt?'Ideias reais. Sistemas funcionando.':'Real ideas. Working systems.'} />
    <div className="project-toolbar"><div className="filter-tabs">{filters.map(f => <button key={f.id} aria-pressed={active === f.id} className={active === f.id ? 'active' : ''} onClick={() => {setActive(f.id);setLimit(6);}}>{f.label}</button>)}</div><label className="project-search"><span aria-hidden="true">⌕</span><input value={query} onChange={e => {setQuery(e.target.value);setLimit(6);}} placeholder={pt?'Buscar projeto ou tecnologia':'Search projects or technology'} aria-label={pt?'Buscar projeto ou tecnologia':'Search projects or technology'} /></label></div>
    <p className="result-count" role="status">{String(filtered.length).padStart(2,'0')} {pt?'projetos encontrados':'projects found'}</p>
    <div className="work-grid">{filtered.slice(0,limit).map(p => <ProjectCard key={p.github} project={p} index={proj.items.indexOf(p)} lang={lang} />)}</div>
    {!filtered.length && <div className="empty-projects"><p>{pt?'Nenhum projeto encontrado. Tente outra tecnologia.':'No projects found. Try another technology.'}</p><button className="btn-s" onClick={() => {setQuery('');setActive('all');}}>{pt?'Limpar filtros':'Clear filters'}</button></div>}
    {filtered.length > limit && <button className="btn-s load-projects" onClick={() => setLimit(filtered.length)}>{pt?'Ver todos os projetos':'View all projects'} <span>+{filtered.length-limit}</span></button>}
  </div></section>;
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

// ─── Publications ─────────────────────────────────────────────────────────────
function PubCard({ item, delay, readBtn }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  useEffect(() => initTilt(ref.current), []);

  return (
    <div
      ref={ref}
      className={`sr card clip-sm d${delay}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ padding:'clamp(24px,4vw,36px)', position:'relative', overflow:'hidden' }}
    >
      {/* Top scan accent */}
      <div style={{ position:'absolute', inset:'0 0 auto 0', height:'1px', background:`linear-gradient(90deg,transparent,${hovered?'rgba(240,164,41,.55)':'rgba(240,164,41,.2)'},transparent)`, transition:'background .3s' }} />
      {/* Left amber bar */}
      <div style={{ position:'absolute', top:0, left:0, width:'3px', height:'100%', background:`linear-gradient(180deg,${hovered?'var(--amber)':'rgba(240,164,41,.55)'} 0%,rgba(240,164,41,0) 100%)`, transition:'background .3s' }} />
      {/* Scan line (amber tint) */}
      <div className="scan-line" style={{ position:'absolute', left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(240,164,41,.15),transparent)', animationDelay:`${delay*.9}s` }} />
      {/* Radial hover glow */}
      <div style={{ position:'absolute', top:'-40px', right:'-40px', width:'240px', height:'240px', borderRadius:'50%', background:'rgba(240,164,41,.07)', filter:'blur(50px)', opacity:hovered?1:0, transition:'opacity .4s', pointerEvents:'none' }} />

      {/* Header row */}
      <div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-start', justifyContent:'space-between', gap:'12px', marginBottom:'16px' }}>
        <div style={{ flex:'1 1 300px' }}>
          <p style={{ fontFamily:'var(--mono)', fontSize:'.58rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(240,164,41,.65)', marginBottom:'10px' }}>
            {item.journal}
          </p>
          <h3 style={{ fontSize:'clamp(.92rem,2vw,1.05rem)', fontWeight:600, color:hovered?'rgba(220,235,255,1)':'var(--txt-1)', lineHeight:1.5, marginBottom:'6px', transition:'color .2s', textShadow:hovered?'0 0 12px rgba(240,164,41,.2)':'none' }}>
            {item.title}
          </h3>
          <p style={{ fontFamily:'var(--mono)', fontSize:'.62rem', color:'var(--txt-2)', letterSpacing:'.08em' }}>{item.volume}</p>
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          data-hover
          className="clip-sm"
          style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'10px 18px', border:`1px solid ${hovered?'rgba(240,164,41,.55)':'rgba(240,164,41,.3)'}`, background:hovered?'rgba(240,164,41,.12)':'rgba(240,164,41,.06)', color:'var(--amber)', fontFamily:'var(--mono)', fontSize:'.62rem', letterSpacing:'.14em', textTransform:'uppercase', textDecoration:'none', whiteSpace:'nowrap', transition:'border-color .25s, background .25s, transform .25s', transform:hovered?'translateY(-2px)':'translateY(0)' }}
        >
          <span>↗</span><span>{readBtn}</span>
        </a>
      </div>

      {/* Abstract */}
      <p style={{ fontSize:'.85rem', color:'var(--txt-2)', lineHeight:1.8, marginBottom:'20px', borderLeft:`1px solid ${hovered?'rgba(240,164,41,.28)':'rgba(255,255,255,.06)'}`, paddingLeft:'16px', transition:'border-color .3s' }}>
        {item.abstract}
      </p>

      {/* Keywords + DOI */}
      <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:'8px' }}>
        {item.keywords.map(kw => (
          <span key={kw} className="badge" style={{ fontFamily:'var(--mono)', fontSize:'.58rem', letterSpacing:'.1em', padding:'3px 10px', border:'1px solid rgba(0,212,255,.14)', color:'rgba(0,212,255,.6)', background:'rgba(0,212,255,.05)' }}>
            {kw}
          </span>
        ))}
        <a href={item.doi} target="_blank" rel="noopener noreferrer" data-hover
          style={{ marginLeft:'auto', fontFamily:'var(--mono)', fontSize:'.58rem', color:'rgba(255,255,255,.32)', letterSpacing:'.1em', textDecoration:'none', transition:'color .2s' }}
          onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,.65)'}
          onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,.32)'}
        >
          DOI →
        </a>
        <span style={{ fontFamily:'var(--mono)', fontSize:'.55rem', color:'rgba(255,255,255,.25)', letterSpacing:'.08em' }}>{item.license}</span>
      </div>
    </div>
  );
}

export function PublicationsSection() {
  const { lang } = useContext(LangContext);
  const pub = CONTENT[lang].publications;
  const countRef = useRef(null);
  const countObserved = useRef(false);

  useEffect(() => {
    countObserved.current = false;
  }, [lang]);

  useEffect(() => {
    if (countObserved.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        countObserved.current = true;
        io.disconnect();
        if (countRef.current) countUp(countRef.current, String(pub.items.length));
      }
    }, { threshold: 0.4 });
    const section = document.getElementById('publications');
    if (section) io.observe(section);
    return () => io.disconnect();
  }, [pub]);

  return (
    <section id="publications" style={{ position:'relative', padding:'clamp(80px,10vw,120px) 0', background:'rgba(3,5,14,.4)' }} className="hud-grid">
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 30% 50%, rgba(240,164,41,.05) 0%, transparent 55%)', pointerEvents:'none' }} />
      {/* Ambient orb */}
      <div className="amb" style={{ width:'500px', height:'320px', background:'rgba(240,164,41,.04)', top:'8%', right:'-80px', animationDelay:'-3.5s' }} />

      <div className="c" style={{ position:'relative' }}>
        <SectionHeader label={pub.label} title={pub.title} />

        {/* Count badge + description */}
        <div className="sr" style={{ display:'flex', alignItems:'center', gap:'20px', marginBottom:'clamp(40px,6vw,64px)', flexWrap:'wrap' }}>
          <div className="clip-sm" style={{ display:'flex', alignItems:'center', gap:'14px', padding:'14px 24px', border:'1px solid rgba(240,164,41,.22)', background:'rgba(240,164,41,.06)', position:'relative', overflow:'hidden', flexShrink:0 }}>
            {/* Shimmer overlay */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent 0%,rgba(240,164,41,.08) 50%,transparent 100%)', backgroundSize:'200% auto', animation:'shimmer 3s linear infinite', pointerEvents:'none' }} />
            <span ref={countRef} style={{ fontFamily:'var(--mono)', fontSize:'2.2rem', fontWeight:700, color:'var(--amber)', lineHeight:1, textShadow:'0 0 18px rgba(240,164,41,.5)', position:'relative' }}>{pub.items.length}</span>
            <span style={{ fontFamily:'var(--mono)', fontSize:'.62rem', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(240,164,41,.6)', position:'relative' }}>{pub.countLabel}</span>
          </div>
          <p className="sr d1" style={{ fontSize:'.88rem', color:'var(--txt-2)', maxWidth:'480px', lineHeight:1.7 }}>{pub.description}</p>
        </div>

        {/* Article cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
          {pub.items.map((item, i) => (
            <PubCard key={i} item={item} delay={i + 2} readBtn={pub.readBtn} />
          ))}
        </div>
      </div>
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
