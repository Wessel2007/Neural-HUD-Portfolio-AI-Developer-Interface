// ─── Language Context ─────────────────────────────────────────────────────────
const LangContext = React.createContext({ lang:'en', toggle:()=>{} });
window.LangContext = LangContext;

// ─── TechBadge ────────────────────────────────────────────────────────────────
function TechBadge({ tech, xs }) {
  const s = (window.TECH_COLORS||{})[tech] || window.BADGE_DEFAULT;
  return (
    <span className="badge" style={{ background:s.bg, border:`1px solid ${s.border}`, color:s.text, fontSize: xs?'.65rem':'.7rem', padding: xs?'2px 7px':'3px 9px' }}>
      {tech}
    </span>
  );
}
window.TechBadge = TechBadge;

// ─── SectionHeader ────────────────────────────────────────────────────────────
function SectionHeader({ label, title, id }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        io.disconnect();
        const scrambler = new window.TextScramble(el);
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
window.SectionHeader = SectionHeader;

// ─── LangToggle ───────────────────────────────────────────────────────────────
function LangToggle() {
  const { lang, toggle } = React.useContext(LangContext);
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={toggle}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        position:'relative', display:'flex', alignItems:'center', gap:'6px',
        fontFamily:'var(--mono)', fontSize:'.62rem', letterSpacing:'.18em', textTransform:'uppercase',
        border:`1px solid ${hover?'rgba(0,212,255,.28)':'rgba(255,255,255,.08)'}`,
        color: hover?'rgba(0,212,255,.9)':'rgba(120,145,175,.8)',
        padding:'6px 12px',
        background: hover?'rgba(0,212,255,.06)':'transparent',
        transition:'all .25s',
        overflow:'hidden',
      }}
    >
      {hover && <span style={{ position:'absolute', inset:0, top:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(0,212,255,.4),transparent)', pointerEvents:'none' }} />}
      <span style={{ color:'rgba(0,212,255,.65)' }}>{lang==='en'?'EN':'PT'}</span>
      <span style={{ color:'rgba(255,255,255,.2)' }}>{'→'}</span>
      <span style={{ color:'rgba(100,130,165,.5)' }}>{lang==='en'?'PT':'EN'}</span>
    </button>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar() {
  const { lang } = React.useContext(LangContext);
  const c = window.CONTENT[lang];
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState('');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuOpenRef = React.useRef(false);

  React.useEffect(() => { menuOpenRef.current = menuOpen; }, [menuOpen]);

  React.useEffect(() => {
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

  React.useEffect(() => {
    const nav = document.getElementById('nav');
    if (nav) nav.className = scrolled ? 'scrolled' : '';
  }, [scrolled]);

  return (
    <nav id="nav" style={{ opacity:0, transform:'translateY(-56px)', animation:'fadeUp .6s .05s var(--ease) forwards' }}>
      <div id="nav-inner">
        <span style={{ fontFamily:'var(--mono)', color:'var(--cyan)', fontSize:'.72rem', letterSpacing:'.22em', textTransform:'uppercase', textShadow:'0 0 10px rgba(0,212,255,.4)' }}>
          PORT_OS
        </span>
        <ul style={{ display:'flex', gap:'clamp(16px,3vw,32px)', listStyle:'none', alignItems:'center' }} className="hide-mobile">
          {c.navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} style={{
                fontFamily:'var(--mono)', fontSize:'.68rem', letterSpacing:'.14em', textTransform:'uppercase',
                color: active===link.href.slice(1) ? 'var(--cyan)' : 'rgba(120,145,175,.75)',
                transition:'color .2s',
              }}
              onMouseEnter={e=>e.target.style.color='var(--cyan)'}
              onMouseLeave={e=>e.target.style.color=active===link.href.slice(1)?'var(--cyan)':'rgba(120,145,175,.75)'}
              >{link.label}</a>
            </li>
          ))}
        </ul>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <LangToggle />
          <button
            className="show-mob"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle navigation"
            style={{
              display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'5px',
              width:'32px', height:'32px', cursor:'pointer', padding:'4px',
              border:`1px solid ${menuOpen ? 'rgba(0,212,255,.35)' : 'rgba(0,212,255,.15)'}`,
              background: menuOpen ? 'rgba(0,212,255,.06)' : 'transparent',
              transition:'border-color .2s, background .2s', flexShrink:0,
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
          <ul style={{ listStyle:'none', padding:0 }}>
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
      <style>{`.hide-mobile { display:none } @media(min-width:768px){.hide-mobile{display:flex}}`}</style>
    </nav>
  );
}
window.NavBar = NavBar;

// ─── ProfilePhoto ─────────────────────────────────────────────────────────────
function ProfilePhoto({ size }) {
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
        <img src="./wessel.png" alt="Luiz Wessel" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
      </div>
      {/* Status dot */}
      <span style={{ position:'absolute', bottom:size*.08, right:size*.08, width:11, height:11, borderRadius:'50%', background:'var(--cyan)', border:'2px solid var(--bg)', boxShadow:'0 0 8px rgba(0,212,255,.9)' }} className="p-dot" />
    </div>
  );
}
window.ProfilePhoto = ProfilePhoto;

// ─── HeroSection ──────────────────────────────────────────────────────────────
function HeroSection() {
  const { lang } = React.useContext(LangContext);
  const c = window.CONTENT[lang];
  const h = c.hero;

  const [heroVisible, setHeroVisible] = React.useState(false);
  const canvasRef = React.useRef(null);
  const particlesRef = React.useRef(null);
  const bootLines = window.CONTENT[lang].bootLines;
  const BOOT_DURATION = bootLines.length * 220 + 300; // ms until hero reveals

  /* Boot then reveal hero */
  React.useEffect(() => {
    setHeroVisible(false);
    const t = setTimeout(() => setHeroVisible(true), BOOT_DURATION);
    return () => clearTimeout(t);
  }, [lang, BOOT_DURATION]);

  /* Canvas particles */
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (particlesRef.current) { particlesRef.current.destroy(); particlesRef.current=null; }
    particlesRef.current = new window.Particles(canvas);
    return () => { if(particlesRef.current) { particlesRef.current.destroy(); particlesRef.current=null; } };
  }, []);

  /* Init scroll animations after hero mounts */
  React.useEffect(() => {
    if (heroVisible) setTimeout(()=>window._initSR&&window._initSR(), 600);
  }, [heroVisible]);

  const name = h.name;

  return (
    <section id="home" style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', overflow:'hidden' }} className="hud-grid">
      {/* Canvas background */}
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }} />
      {/* Radial glow */}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% -5%, rgba(0,212,255,.1) 0%, transparent 60%)', pointerEvents:'none' }} />
      {/* Ambient orbs */}
      <div className="amb" style={{ width:'500px', height:'500px', background:'rgba(0,212,255,.07)', top:'-150px', left:'-100px', animationDelay:'0s' }} />
      <div className="amb" style={{ width:'400px', height:'400px', background:'rgba(124,111,255,.05)', bottom:'-100px', right:'-80px', animationDelay:'-4s' }} />

      {/* HUD corners */}
      {[['top:88px','left:24px','T'],['top:88px','right:24px','T'],['bottom:80px','left:24px','B'],['bottom:80px','right:24px','B']].map(([pos1,pos2,tb],i)=>{
        const [k1,v1]=pos1.split(':'), [k2,v2]=pos2.split(':');
        const side=k2==='left'?'L':'R';
        return <div key={i} style={{ position:'absolute', [k1]:v1+'px',[k2]:v2+'px', width:16, height:16, [`border${side==='L'?'Left':'Right'}`]:'1px solid rgba(0,212,255,.18)', [`border${tb==='T'?'Top':'Bottom'}`]:'1px solid rgba(0,212,255,.18)' }} />;
      })}

      <div className="c" style={{ position:'relative', paddingTop:'120px', paddingBottom:'100px', width:'100%' }}>
        {/* Boot lines — CSS stagger */}
        <div style={{ fontFamily:'var(--mono)', fontSize:'.72rem', lineHeight:'1.9', marginBottom:'48px', minHeight:'5.5rem' }}>
          {bootLines.map((line, i) => (
            <p key={`${lang}-${i}`} style={{
              color: line.startsWith('[ OK ]') ? 'rgba(0,212,255,.7)' : 'rgba(100,130,165,.65)',
              opacity: 0,
              animation: `fadeUp .35s ${60 + i * 200}ms var(--ease) both`,
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              {line}
              {i === bootLines.length - 1 && !heroVisible && <span className="boot-caret" />}
            </p>
          ))}
        </div>

        {/* Hero content */}
        {heroVisible && (
          <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
            {/* Mobile profile photo — hidden at 900px+ */}
            <div className="hero-photo-mob" style={{ opacity:0, animation:'fadeUp .6s .1s var(--ease) forwards' }}>
              <ProfilePhoto size={140} />
            </div>

            {/* Role */}
            <div style={{ opacity:0, animation:'fadeUp .5s .05s var(--ease) forwards', marginBottom:'20px' }}>
              <span style={{ fontFamily:'var(--mono)', fontSize:'.68rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(0,212,255,.75)', border:'1px solid rgba(0,212,255,.18)', padding:'5px 14px', display:'inline-block' }}>
                {h.role}
              </span>
            </div>

            {/* Layout row: text + photo */}
            <div style={{ display:'flex', flexDirection:'column', gap:'40px', alignItems:'flex-start' }}>
              <div style={{ flex:1, minWidth:0 }}>
                {/* Name — character stagger */}
                <div style={{ opacity:0, animation:'fadeUp .6s .15s var(--ease) forwards', marginBottom:'20px', perspective:'600px' }}>
                  <h1 className="glitch glow" data-text={name} style={{ fontSize:'clamp(2.8rem,8vw,5.5rem)', fontWeight:700, letterSpacing:'-.03em', lineHeight:.92, color:'var(--txt-1)', display:'flex', flexWrap:'wrap' }}>
                    {name.split('').map((ch,i)=>(
                      <span key={i} style={{ display:'inline-block', opacity:0, animation:`charIn .55s ${.2+i*.04}s var(--ease) forwards`, whiteSpace: ch===' '?'pre':'normal' }}>{ch===' '?'\u00A0':ch}</span>
                    ))}
                  </h1>
                </div>

                {/* Tagline */}
                <p style={{ opacity:0, animation:'fadeUp .6s .42s var(--ease) forwards', fontSize:'clamp(1.05rem,2.5vw,1.45rem)', color:'rgba(220,235,250,.9)', maxWidth:'640px', lineHeight:1.35, marginBottom:'14px', fontWeight:500 }}>
                  {h.tagline}
                </p>

                {/* Description */}
                <p style={{ opacity:0, animation:'fadeUp .6s .54s var(--ease) forwards', fontSize:'clamp(.88rem,1.6vw,1rem)', color:'var(--txt-2)', maxWidth:'560px', lineHeight:1.75, marginBottom:'40px' }}>
                  {h.description}
                </p>

                {/* CTAs */}
                <div className="cta-row" style={{ opacity:0, animation:'fadeUp .5s .66s var(--ease) forwards', display:'flex', flexWrap:'wrap', gap:'12px' }}>
                  <a href="#featured" className="btn-p clip-sm">
                    {h.ctaPrimary} <span style={{ color:'rgba(0,212,255,.5)' }}>→</span>
                  </a>
                  <a href="#contact" className="btn-s clip-sm">
                    {h.ctaSecondary}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile photo — floating right on large screens */}
      {heroVisible && (
        <div style={{ position:'absolute', right:'clamp(40px,8vw,120px)', top:'50%', transform:'translateY(-50%)', opacity:0, animation:'fadeUp .7s .3s var(--ease) forwards', display:'none' }} className="show-lg">
          <ProfilePhoto size={220} />
        </div>
      )}

      {/* HUD labels */}
      <div style={{ position:'absolute', bottom:'32px', left:'24px', fontFamily:'var(--mono)', fontSize:'.6rem', color:'rgba(255,255,255,.15)', letterSpacing:'.22em' }}>{h.hudSignal}</div>
      <div style={{ position:'absolute', bottom:'32px', right:'24px', fontFamily:'var(--mono)', fontSize:'.6rem', color:'rgba(255,255,255,.15)', letterSpacing:'.22em' }}>{h.hudStatus}</div>

      {/* Scroll indicator */}
      {heroVisible && (
        <div style={{ position:'absolute', bottom:'40px', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', opacity:0, animation:'fadeUp .5s 1s var(--ease) forwards' }}>
          <div style={{ width:'1px', height:'36px', background:'linear-gradient(to bottom,rgba(0,212,255,.45),transparent)', animation:'scrollBounce 1.7s ease-in-out infinite' }} />
        </div>
      )}

      <style>{`
        @media(min-width:900px){
          .show-lg { display:block !important; }
          #home > .c { padding-right: clamp(260px, 30vw, 380px); }
        }
      `}</style>
    </section>
  );
}
window.HeroSection = HeroSection;
