// ─── Runtime utilities (pure JS/DOM, framework-agnostic) ──────────────────────

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Custom cursor ── */
export function initCursor() {
  const dot = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  if (!dot || !ring) return () => {};
  if (prefersReducedMotion()) { dot.style.display = 'none'; ring.style.display = 'none'; return () => {}; }

  let mx = -999, my = -999, rx = -999, ry = -999, raf;

  const onMove = (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  };
  const tick = () => {
    rx += (mx - rx) * .11; ry += (my - ry) * .11;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    raf = requestAnimationFrame(tick);
  };
  const onOver = (e) => { if (e.target.closest('a,button,[data-hover]')) document.body.classList.add('cursor-expand'); };
  const onOut = (e) => { if (e.target.closest('a,button,[data-hover]')) document.body.classList.remove('cursor-expand'); };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseover', onOver);
  document.addEventListener('mouseout', onOut);
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseover', onOver);
    document.removeEventListener('mouseout', onOut);
  };
}

/* ── Scroll progress bar ── */
export function initProgressBar() {
  const bar = document.getElementById('prog');
  if (!bar) return () => {};
  const onScroll = () => {
    const s = window.scrollY, t = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (t > 0 ? s / t : 0) + ')';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}

/* ── IntersectionObserver for .sr and .cw scroll-reveal ── */
export function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.sr,.cw').forEach((el) => io.observe(el));
  return io;
}

/* ── TextScramble ── */
export function TextScramble(el) {
  this.el = el;
  this.chars = '!<>_\\/[]{}—=+*^?#~';
  this.frame = 0;
  this.queue = [];
  const self = this;
  this.update = function () {
    let html = '', complete = 0;
    const n = self.queue.length;
    for (let i = 0; i < n; i++) {
      const item = self.queue[i];
      if (self.frame >= item.end) { complete++; html += item.to; }
      else if (self.frame >= item.start) {
        if (!item.char || Math.random() < .28) item.char = self.chars[Math.floor(Math.random() * self.chars.length)];
        html += '<span style="color:rgba(0,212,255,.45)">' + item.char + '</span>';
      } else {
        html += '<span style="opacity:.2">' + item.to + '</span>';
      }
    }
    self.el.innerHTML = html;
    if (complete === n) { self.resolve(); }
    else { self.frameReq = requestAnimationFrame(self.update); self.frame++; }
  };
  this.setText = function (text) {
    return new Promise((resolve) => {
      self.resolve = resolve; self.queue = []; self.frame = 0;
      cancelAnimationFrame(self.frameReq);
      if (prefersReducedMotion()) { self.el.textContent = text; resolve(); return; }
      for (let i = 0; i < text.length; i++) {
        const start = Math.floor(Math.random() * 14);
        self.queue.push({ to: text[i], start, end: start + Math.floor(Math.random() * 14) + 4, char: '' });
      }
      self.update();
    });
  };
}

/* ── Count-up ── */
export function countUp(el, target, dur) {
  dur = dur || 1400;
  const num = parseFloat(target), isNum = !isNaN(num);
  if (!isNum || prefersReducedMotion()) { el.textContent = target; return; }
  const suf = target.replace(String(Math.floor(num)), '');
  const start = performance.now();
  (function tick(now) {
    const p = Math.min((now - start) / dur, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(num * e) + suf;
    if (p < 1) requestAnimationFrame(tick);
  })(start);
}

/* ── Particle system ── */
export function Particles(canvas) {
  const ctx = canvas.getContext('2d');
  let pts = [], raf;
  const mouse = { x: -999, y: -999 };
  const reduced = prefersReducedMotion();

  function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  function init() {
    pts = [];
    const n = reduced ? 0 : Math.min(Math.floor(canvas.width * canvas.height / 15000), 75);
    for (let i = 0; i < n; i++) {
      pts.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22,
        s: Math.random() * 1.1 + .4, o: Math.random() * .32 + .07,
      });
    }
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const dmx = p.x - mouse.x, dmy = p.y - mouse.y, dm = Math.sqrt(dmx * dmx + dmy * dmy);
      if (dm < 90) { const f = (90 - dm) / 90; p.vx += dmx / dm * f * .28; p.vy += dmy / dm * f * .28; }
      const sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (sp > 1.4) { p.vx *= .92; p.vy *= .92; }
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 140) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(0,212,255,' + (1 - d / 140) * .065 + ')';
          ctx.lineWidth = .7;
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,212,255,' + p.o + ')'; ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(() => { resize(); init(); });
  ro.observe(canvas);
  resize(); init();
  if (!reduced) draw(); else ctx.clearRect(0, 0, canvas.width, canvas.height);

  const section = canvas.closest('section');
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  };
  if (section) section.addEventListener('mousemove', onMove);

  this.destroy = function () {
    cancelAnimationFrame(raf);
    ro.disconnect();
    if (section) section.removeEventListener('mousemove', onMove);
  };
}

/* ── 3-D card tilt ── */
export function initTilt(el) {
  if (!el) return;
  if (prefersReducedMotion()) return;
  const onMove = (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    el.style.transform = 'perspective(900px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg) translateZ(8px)';
    el.style.transition = 'transform .08s linear';
  };
  const onLeave = () => {
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    el.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1)';
  };
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);
}
