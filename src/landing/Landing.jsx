/* QCTool Landing — Prolibu full-page layout (extracted from QC Tool_Project) */
import { useState, useEffect, useRef } from 'react';
import './landing.css';
import { initHeroBgScrollHide, initFinalCtaEffects, initHeroMockEffects } from './useHeroEffects.js';
import { initLifecycleRive } from './useLifecycleRive.js';
import { BrandLogo } from '../shared/BrandLogo.jsx';

/** @typedef {{ onLogin?: () => void }} LandingProps */

let loginHandler = () => {};
function goLogin(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  loginHandler();
}

function Eyebrow({ children, light }) {
  return (
    <span className={`s-eyebrow${light ? ' s-eyebrow--light' : ''}`}>
      <svg viewBox="0 0 10 12" fill="var(--accent)" aria-hidden="true"><polygon points="0,0 10,6 0,12" /></svg>
      {children}
    </span>
  );
}

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return scrolled;
}

function Waveform({ n = 28 }) {
  const h = [28, 45, 62, 38, 72, 55, 48, 65, 42, 58, 70, 35, 52, 68, 44, 60];
  return (
    <div className="qc-waveform" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} style={{ height: `${h[i % h.length]}%` }} />
      ))}
    </div>
  );
}

/* —— Nav —— */
const NAV_LINKS = [
  ['Features', '#features'],
  ['Services', '#services'],
  ['Work Examples', '#work'],
  ['Pricing', '#pricing'],
];

function Nav() {
  const scrolled = useNavScroll();
  const [open, setOpen] = useState(false);

  return (
    <nav className={`qc-nav${scrolled ? ' is-scrolled' : ' is-hero'}`}>
      <a href="#top" className="qc-nav__logo">
        <BrandLogo tone="inherit" size={40} />
      </a>
      <div className="qc-nav__links">
        {NAV_LINKS.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
      </div>
      <div className="qc-nav__cta">
        <a href="#login" onClick={goLogin} className="btn-outline">Sign In</a>
        <a href="#login" onClick={goLogin} className="btn-fill">Book a Demo</a>
      </div>
      <button type="button" className="qc-hamburger" aria-label="Menu" onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
      {open && (
        <div style={{
          position: 'fixed', top: 60, left: 16, right: 16, zIndex: 99,
          background: '#0a0a0a', borderRadius: 12, padding: 16,
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {NAV_LINKS.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} style={{ color: '#f7f6f0', padding: '12px 8px', fontSize: 16 }}>{l}</a>
          ))}
          <a href="#login" onClick={goLogin} className="btn-outline" style={{ marginTop: 8 }} onClick={() => setOpen(false)}>Sign In</a>
          <a href="#login" onClick={goLogin} className="btn-fill" onClick={() => setOpen(false)}>Book a Demo</a>
        </div>
      )}
    </nav>
  );
}

/* —— Hero background (fixed, Prolibu hero-v2__bg) —— */
function HeroBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.35;
  }, []);

  return (
    <div className="hero-v2__bg" aria-hidden="true">
      <div className="hero-v2__bg-video">
        <video ref={videoRef} autoPlay loop muted playsInline>
          <source src="/landing/hero-robot-bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-v2__bg-gradient">
        <img src="/landing/gradient-save.svg" alt="" />
      </div>
    </div>
  );
}

/* —— Hero —— */
const HERO_SOCIAL_AVATARS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
];

function Hero() {
  const heroRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setRevealed(true), reduced ? 0 : 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let cleanupHeroBgHide = () => {};

    cleanupHeroBgHide = initHeroBgScrollHide();

    return () => {
      cleanupHeroBgHide();
    };
  }, []);

  return (
    <section className="qc-hero hero-v2" id="top" ref={heroRef}>
      <div className="qc-hero__copy">
        <div className="qc-hero__social">
          <span className="qc-hero__avatars" aria-hidden="true">
            {HERO_SOCIAL_AVATARS.map((src) => (
              <img key={src} src={src} alt="" width="28" height="28" draggable="false" />
            ))}
          </span>
          <span>Join 15,725+ other loving customers</span>
        </div>

        <h1 className={revealed ? 'is-revealed hero-title--revealed' : ''}>
          Supercharge Your Productivity and Workflow with AI
        </h1>

        <p className="qc-hero__sub">
          Automate the busywork, eliminate bottlenecks, and focus on what matters most,
          {' '}
          powered by intelligent automation that learns with you.
        </p>

        <div className="qc-hero__ctas">
          <a href="#login" onClick={goLogin} className="btn-fill qc-hero__cta-primary">Get Started Free</a>
          <a href="#features" className="btn-outline qc-hero__cta-secondary">Book a Demo</a>
        </div>
      </div>

      <div className="hero-screenshot hero-screenshot--static">
        <div className="hero-screenshot__inner">
          <HeroStackMockup />
        </div>
      </div>
    </section>
  );
}

/* —— Hero product mockup cards (original QCTool content) —— */
function HeroDashboardShot({ src, alt }) {
  return (
    <div className="qc-hero-card qc-hero-card--shot">
      <img src={src} alt={alt} draggable="false" />
    </div>
  );
}

const HERO_MOCK_SLIDES = [
  {
    id: 'super-admin',
    Card: () => (
      <HeroDashboardShot src="/landing/dashboards/super-admin.png" alt="QCTool Super Admin platform overview" />
    ),
  },
  {
    id: 'org-admin',
    Card: () => (
      <HeroDashboardShot src="/landing/dashboards/org-admin.png" alt="QCTool Org Admin workspace overview" />
    ),
  },
  {
    id: 'qa-lead',
    Card: () => (
      <HeroDashboardShot src="/landing/dashboards/qa-lead.png" alt="QCTool QA Lead today dashboard" />
    ),
  },
];
const HERO_MOCK_HOLD_MS = 5200;
const HERO_MOCK_TRANS_MS = 2400;
const HERO_MOCK_INTRO_MS = 1400;

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2;
}

function wrapMockOffset(index, progress, total) {
  let d = index - progress;
  const half = total / 2;
  while (d > half) d -= total;
  while (d < -half) d += total;
  return d;
}

function getMockCardStyle(offset, mx, my, mobile) {
  const abs = Math.abs(offset);
  const spacing = mobile ? 90 : 340;
  const x = offset * spacing + mx * (10 + abs * 8);
  const y = abs * (mobile ? 26 : 38) + my * (5 + abs * 4);
  const rot = offset * (mobile ? 4 : 6);
  const scale = 1 - Math.min(abs, 2.2) * 0.1;
  const opacity = abs < 0.08 ? 1 : Math.max(0.12, 1 - abs * 0.42);
  const blur = abs < 0.08 ? 0 : Math.min(12, abs * 5.5);
  const z = Math.round(20 - abs * 4);
  const focus = Math.max(0, 1 - abs);
  return {
    transform: `translate3d(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px), 0) rotate(${rot.toFixed(3)}deg) scale(${scale.toFixed(4)})`,
    opacity: opacity.toFixed(3),
    filter: `blur(${blur.toFixed(2)}px)`,
    zIndex: z,
    '--mock-focus': focus.toFixed(3),
  };
}

/* Fanned card-stack hero mockup — original QCTool recreation */
function HeroStackMockup() {
  const viewportRef = useRef(null);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const progressRef = useRef(0);
  const startRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setReady(true), reduced ? 0 : HERO_MOCK_INTRO_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return undefined;
    return initHeroMockEffects({
      viewport: viewportRef.current,
      carousel: carouselRef.current,
    });
  }, [ready]);

  useEffect(() => {
    if (!ready) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = HERO_MOCK_SLIDES.length;
    let rafId = 0;

    const apply = (progress, mx, my) => {
      const mobile = window.innerWidth <= 640;
      cardRefs.current.forEach((el, index) => {
        if (!el) return;
        const offset = wrapMockOffset(index, progress, total);
        const style = getMockCardStyle(offset, mx, my, mobile);
        el.style.transform = style.transform;
        el.style.opacity = style.opacity;
        el.style.filter = style.filter;
        el.style.zIndex = String(style.zIndex);
        el.style.setProperty('--mock-focus', style['--mock-focus']);
        el.classList.toggle('is-focus', Number(style['--mock-focus']) > 0.55);
      });
    };

    if (reduced) {
      apply(0, 0, 0);
      return undefined;
    }

    startRef.current = performance.now();
    const cycle = HERO_MOCK_HOLD_MS + HERO_MOCK_TRANS_MS;

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const full = cycle * total;
      const t = elapsed % full;
      const idx = Math.floor(t / cycle);
      const local = t % cycle;
      let progress = idx;
      if (local > HERO_MOCK_HOLD_MS) {
        progress = idx + easeInOutCubic((local - HERO_MOCK_HOLD_MS) / HERO_MOCK_TRANS_MS);
      }
      progressRef.current = progress;
      const parallax = carouselRef.current?.__mockParallax || { x: 0, y: 0 };
      apply(progress, parallax.x, parallax.y);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [ready]);

  return (
    <div className={`hero-mock-stage${ready ? ' is-ready' : ''}`} aria-hidden="true">
      <div ref={viewportRef} className="hero-mock-stage__viewport">
        <div ref={carouselRef} className="hero-mock-stage__carousel">
          {HERO_MOCK_SLIDES.map(({ id, Card }, index) => (
            <div
              key={id}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`hero-mock-card${index === 0 ? ' is-focus' : ''}`}
            >
              <div className="hero-mock-card__surface">
                <Card />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* —— Lifecycle —— */
/* ReflexAI Roleplay/QA lifecycle — same .riv graphic + scroll transitions */
const ORBIT_CARDS = [
  {
    icon: 'ph-phone-call',
    accent: 'blue',
    pos: 'top',
    title: 'AI-powered call simulation',
    body: 'designed for real-world nuance.',
  },
  {
    icon: 'ph-chart-bar',
    accent: 'navy',
    pos: 'right',
    title: 'Measurable impact from Day One',
    body: 'see results as soon as teams start training.',
  },
  {
    icon: 'ph-waveform',
    accent: 'soft',
    pos: 'left',
    title: 'Forensic scoring on every call',
    body: 'nine dimensions with cited evidence you can defend.',
  },
  {
    icon: 'ph-shield-check',
    accent: 'blue',
    pos: 'right',
    title: 'Compliance that sticks',
    body: 'flag policy misses with timestamped proof.',
  },
  {
    icon: 'ph-graduation-cap',
    accent: 'navy',
    pos: 'top',
    title: 'Coach with citations',
    body: 'jump agents to the exact phrase, no re-listening.',
  },
];

function RollingScore({ value, active }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    let raf;
    const start = performance.now();
    const from = 0;
    const to = value;
    const dur = 1400;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return (
    <span className="qc-orbit__stat" aria-label={`${value} percent`}>
      <span className="qc-orbit__stat-num">{display}</span>
      <span className="qc-orbit__stat-pct">%</span>
    </span>
  );
}

function Lifecycle() {
  const [visible, setVisible] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardVisible, setCardVisible] = useState(false);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(0);
  const cardIndexRef = useRef(0);
  const cardSwapTimer = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setCardVisible(true);
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Scroll progress through section → Rive input (Reflex riveScrollInput) */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const total = rect.height + vh;
        const traveled = vh - rect.top;
        const p = Math.min(1, Math.max(0, traveled / total));
        progressRef.current = p;

        const nextIdx = Math.min(
          ORBIT_CARDS.length - 1,
          Math.floor(p * ORBIT_CARDS.length),
        );
        if (nextIdx !== cardIndexRef.current) {
          cardIndexRef.current = nextIdx;
          setCardVisible(false);
          clearTimeout(cardSwapTimer.current);
          cardSwapTimer.current = setTimeout(() => {
            setCardIndex(nextIdx);
            setCardVisible(true);
          }, 220);
        }
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(cardSwapTimer.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    return initLifecycleRive(canvas, {
      getScrollProgress: () => progressRef.current,
    });
  }, []);

  return (
    <section
      className={`qc-lifecycle${visible ? ' is-visible' : ''}`}
      id="lifecycle"
      ref={sectionRef}
    >
      <div className="qc-lifecycle__inner">
        <h2 className="qc-lifecycle__headline">
          <span className="qc-lifecycle__hline">
            <span className="qc-lifecycle__word">Pipeline</span>
            <span className="qc-lifecycle__inline">
              <span className="qc-orbit__avatar">
                <img
                  src="/rive/lifecycle-avatar.webp"
                  alt=""
                  width="132"
                  height="132"
                  draggable="false"
                />
              </span>
              <span className="qc-orbit__pill" aria-hidden="true">
                <RollingScore value={83} active={visible} />
                <span className="qc-orbit__dots">
                  {[0, 1, 2, 3, 4].map((d) => (
                    <span
                      key={d}
                      className={`qc-orbit__dot${d < 4 ? ' is-on' : ''}`}
                      style={{ transitionDelay: `${220 + d * 90}ms` }}
                    />
                  ))}
                </span>
              </span>
            </span>
            <span className="qc-lifecycle__word">and QA</span>
          </span>
          <span className="qc-lifecycle__hline qc-lifecycle__hline--sub">
            that&apos;s production-ready
          </span>
        </h2>

        <div className="qc-orbit__stage">
          <div className="qc-orbit__rive" aria-hidden="true">
            <canvas ref={canvasRef} className="qc-orbit__canvas" />
          </div>

          {(() => {
            const card = ORBIT_CARDS[cardIndex];
            return (
              <div
                className={`qc-orbit__float qc-orbit__float--${card.pos}${cardVisible ? ' is-on' : ''}`}
                key={cardIndex}
              >
                <span className={`qc-orbit__float-icon qc-orbit__float-icon--${card.accent}`}>
                  <i className={`ph ${card.icon}`} />
                </span>
                <p className="qc-orbit__float-text">
                  <strong>{card.title}</strong>
                  {', '}
                  {card.body}
                </p>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}

/* —— Features / Assure-style section —— */
const FEATURE_TABS = [
  {
    id: 'org-admin',
    label: 'Organization Admin',
    icon: 'ph-buildings',
    desc: 'Manage seats, campaigns and team access — one workspace for every QA program you run.',
    mock: 'org-admin',
  },
  {
    id: 'qa-lead',
    label: 'QA Lead',
    icon: 'ph-chart-bar',
    desc: 'Today view, review queue, agent scorecards and coaching — everything a lead needs in one dashboard.',
    mock: 'qa-lead',
  },
  {
    id: 'coaching',
    label: 'Coaching',
    icon: 'ph-chalkboard-teacher',
    desc: 'Track who needs a session, what to focus on, and whether follow-up is overdue — all in one coaching queue.',
    mock: 'coaching',
  },
];

function OrgAdminDashboardMock() {
  return (
    <div className="qc-feat-dash">
      <div className="qc-feat-dash__shell">
        <aside className="qc-feat-dash__sidebar" aria-hidden="true">
          <div className="qc-feat-dash__logo">N</div>
          <div className="qc-feat-dash__nav-item is-active" />
          <div className="qc-feat-dash__nav-item" />
          <div className="qc-feat-dash__nav-item" />
          <div className="qc-feat-dash__nav-item" />
        </aside>
        <div className="qc-feat-dash__main">
          <div className="qc-feat-dash__topbar">
            <span className="qc-feat-dash__crumb">Overview</span>
            <span className="qc-feat-dash__pill">Pro · 9/12 seats</span>
          </div>
          <div className="qc-feat-dash__body">
            <div className="qc-feat-dash__kpis">
              <div className="qc-feat-dash__kpi">
                <span>Minutes used</span>
                <strong>3,674</strong>
                <em>89% of plan</em>
              </div>
              <div className="qc-feat-dash__kpi">
                <span>Active agents</span>
                <strong>48</strong>
                <em>+6 this month</em>
              </div>
              <div className="qc-feat-dash__kpi">
                <span>Campaigns</span>
                <strong>3</strong>
                <em>All active</em>
              </div>
              <div className="qc-feat-dash__kpi">
                <span>Avg QA</span>
                <strong>84</strong>
                <em className="is-up">+3 pts</em>
              </div>
            </div>
            <div className="qc-feat-dash__split">
              <div className="qc-feat-dash__panel">
                <p className="qc-feat-dash__panel-title">Usage &amp; billing</p>
                <div className="qc-feat-dash__bars">
                  {[72, 58, 89, 64, 91, 78, 85].map((h, i) => (
                    <span key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <div className="qc-feat-dash__panel">
                <p className="qc-feat-dash__panel-title">Team roster</p>
                <ul className="qc-feat-dash__list">
                  <li><span>Retention team</span><strong>18 agents</strong></li>
                  <li><span>Sales team</span><strong>14 agents</strong></li>
                  <li><span>Support team</span><strong>9 agents</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QALeadDashboardMock() {
  return (
    <div className="qc-feat-dash qc-feat-dash--qalead">
      <div className="qc-feat-dash__shell">
        <aside className="qc-feat-dash__sidebar" aria-hidden="true">
          <div className="qc-feat-dash__logo">N</div>
          <div className="qc-feat-dash__nav-item is-active" title="Today" />
          <div className="qc-feat-dash__nav-item" />
          <div className="qc-feat-dash__nav-item" />
          <div className="qc-feat-dash__nav-item" />
          <div className="qc-feat-dash__nav-item" />
        </aside>
        <div className="qc-feat-dash__main">
          <div className="qc-feat-dash__topbar">
            <span className="qc-feat-dash__crumb">Work / Today</span>
            <span className="qc-feat-dash__live">Pipeline live</span>
          </div>
          <div className="qc-feat-dash__body">
            <div className="qc-feat-dash__action-strip">
              <span className="qc-feat-dash__dot-live" />
              Action queue
              <span className="qc-feat-dash__badge qc-feat-dash__badge--danger">4 RED FLAGS</span>
              <span className="qc-feat-dash__badge qc-feat-dash__badge--warn">3 DECISIONS</span>
            </div>
            <div className="qc-feat-dash__kpis qc-feat-dash__kpis--4">
              <div className="qc-feat-dash__kpi">
                <span>Avg QA score</span>
                <strong>84</strong>
                <em className="is-up">+3 vs last week</em>
              </div>
              <div className="qc-feat-dash__kpi">
                <span>Calls analyzed</span>
                <strong>1,247</strong>
                <em>Last 14 days</em>
              </div>
              <div className="qc-feat-dash__kpi">
                <span>Red flags</span>
                <strong className="is-danger">7</strong>
                <em>Needs review</em>
              </div>
              <div className="qc-feat-dash__kpi">
                <span>Compliance</span>
                <strong>93%</strong>
                <em className="is-up">Above target</em>
              </div>
            </div>
            <div className="qc-feat-dash__split">
              <div className="qc-feat-dash__panel">
                <p className="qc-feat-dash__panel-title">Volume &amp; quality</p>
                <svg viewBox="0 0 240 80" className="qc-feat-dash__chart" aria-hidden="true">
                  <path d="M0,60 C30,52 50,40 80,38 S140,28 180,32 S220,24 240,20" fill="none" stroke="#ffd54f" strokeWidth="2.5" />
                  <path d="M0,50 C30,48 50,44 80,42 S140,38 180,40 S220,36 240,34" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeDasharray="4 3" />
                </svg>
              </div>
              <div className="qc-feat-dash__panel">
                <p className="qc-feat-dash__panel-title">Why calls fail</p>
                <ul className="qc-feat-dash__fail-bars">
                  <li><span>Mandatory disclosure</span><i style={{ width: '78%' }} /></li>
                  <li><span>Verification skipped</span><i style={{ width: '52%' }} /></li>
                  <li><span>Script deviation</span><i style={{ width: '38%' }} /></li>
                </ul>
              </div>
            </div>
            <div className="qc-feat-dash__panel qc-feat-dash__panel--table">
              <p className="qc-feat-dash__panel-title">Team performance</p>
              <table className="qc-feat-dash__table">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>QA</th>
                    <th>Flags</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="qc-feat-dash__avatar">HK</span> Hira Khan</td>
                    <td><span className="qc-feat-dash__score is-ok">91</span></td>
                    <td>0</td>
                    <td><span className="qc-feat-dash__link">View</span></td>
                  </tr>
                  <tr>
                    <td><span className="qc-feat-dash__avatar">DA</span> Danish Ali</td>
                    <td><span className="qc-feat-dash__score is-bad">58</span></td>
                    <td>12</td>
                    <td><span className="qc-feat-dash__link">Coach</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QACoachingDashboardMock() {
  const rows = [
    { initials: 'DA', agent: 'Danish Ali', focus: 'De-escalation & tone', qa: 58, trend: '-14', due: '16 Aug', status: 'Overdue', tone: 'bad' },
    { initials: 'FI', agent: 'Faisal Iqbal', focus: 'Verification before promise', qa: 66, trend: '-6', due: '08 Aug', status: 'Open', tone: 'warn' },
    { initials: 'AM', agent: 'Ayesha Malik', focus: 'Objection handling script', qa: 74, trend: '-4', due: '11 Aug', status: 'Open', tone: 'warn' },
    { initials: 'UT', agent: 'Usman Tariq', focus: 'Disclosure accuracy', qa: 78, trend: '+3', due: '02 Aug', status: 'Done', tone: 'ok' },
  ];

  return (
    <div className="qc-feat-dash qc-feat-dash--coaching">
      <div className="qc-feat-dash__shell">
        <aside className="qc-feat-dash__sidebar" aria-hidden="true">
          <div className="qc-feat-dash__logo">N</div>
          <div className="qc-feat-dash__nav-item" />
          <div className="qc-feat-dash__nav-item" />
          <div className="qc-feat-dash__nav-item is-active" title="Coaching" />
          <div className="qc-feat-dash__nav-item" />
          <div className="qc-feat-dash__nav-item" />
        </aside>
        <div className="qc-feat-dash__main">
          <div className="qc-feat-dash__topbar">
            <span className="qc-feat-dash__crumb">Quality / Coaching</span>
            <button type="button" className="qc-feat-dash__btn">+ New session</button>
          </div>
          <div className="qc-feat-dash__body">
            <div className="qc-feat-dash__page-head">
              <div>
                <h3 className="qc-feat-dash__page-title">Coaching</h3>
                <p className="qc-feat-dash__page-sub">
                  A failing score is not just a report. Book a session here and track the follow-up.
                </p>
              </div>
            </div>
            <div className="qc-feat-dash__panel qc-feat-dash__panel--table qc-feat-dash__panel--flush">
              <table className="qc-feat-dash__table qc-feat-dash__table--coaching">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Focus</th>
                    <th>QA</th>
                    <th>7D</th>
                    <th>Due</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.agent}>
                      <td>
                        <span className="qc-feat-dash__avatar">{row.initials}</span>
                        {row.agent}
                      </td>
                      <td className="qc-feat-dash__focus">{row.focus}</td>
                      <td>
                        <span className={`qc-feat-dash__score ${row.qa < 70 ? 'is-bad' : row.qa < 80 ? 'is-warn' : 'is-ok'}`}>
                          {row.qa}
                        </span>
                      </td>
                      <td className={row.trend.startsWith('+') ? 'qc-feat-dash__trend-up' : 'qc-feat-dash__trend-down'}>
                        {row.trend}
                      </td>
                      <td>{row.due}</td>
                      <td>
                        <span className={`qc-feat-dash__status qc-feat-dash__status--${row.tone}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureVisual({ tab }) {
  if (tab.mock === 'qa-lead') return <QALeadDashboardMock />;
  if (tab.mock === 'org-admin') return <OrgAdminDashboardMock />;
  return <QACoachingDashboardMock />;
}

function OrbitSection() {
  const [active, setActive] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => setActive((a) => (a + 1) % FEATURE_TABS.length), 5500);
    return () => clearInterval(t);
  }, [paused]);

  const tab = FEATURE_TABS[active];

  return (
    <section className="qc-feat-sec" id="features">
      <div className="qc-feat-sec__inner qc-wrap">
        <header className="qc-feat-sec__header">
          <Eyebrow light>Assure · Automated quality assurance</Eyebrow>
          <h2 className="qc-feat-sec__title">
            Stop relying on random sampling. Automatically QA 100% of conversations.
          </h2>
          <a href="#login" onClick={goLogin} className="qc-feat-sec__cta">
            See QA in Action <span aria-hidden="true">→</span>
          </a>
        </header>

        <nav className="qc-feat-sec__tabs" aria-label="QA features">
          {FEATURE_TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              className={`qc-feat-sec__tab${i === active ? ' is-active' : ''}`}
              onMouseEnter={() => { setPaused(true); setActive(i); }}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => { setPaused(true); setActive(i); }}
              onBlur={() => setPaused(false)}
              onClick={() => setActive(i)}
            >
              <i className={`ph ${t.icon}`} aria-hidden="true" />
              {t.label}
            </button>
          ))}
        </nav>

        <div className="qc-feat-sec__stage">
          <div className="qc-feat-sec__glow" aria-hidden="true" />
          <div key={tab.id} className="qc-feat-sec__mock-wrap">
            <FeatureVisual tab={tab} />
          </div>
        </div>

        <div className="qc-feat-sec__footer">
          <p className="qc-feat-sec__caption">{tab.desc}</p>
          <div className="qc-feat-sec__dots" role="tablist" aria-label="Feature slides">
            {FEATURE_TABS.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={t.label}
                className={`qc-feat-sec__dot${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* —— Stats (Zendesk-style count-up) —— */
const STATS = [
  { value: 22, suffix: 'K+', label: 'QA teams' },
  { value: 830, suffix: 'M', label: 'Calls analyzed' },
  { value: 4.8, suffix: 'B', label: 'Scores delivered', decimal: true },
];

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function StatCounter({ value, suffix, label, decimal, active }) {
  const [text, setText] = useState('000');

  useEffect(() => {
    if (!active) {
      setText('000');
      return undefined;
    }

    const duration = 2400;
    let raf = 0;
    const start = performance.now();

    const tick = (now) => {
      const p = easeOutCubic(Math.min((now - start) / duration, 1));
      const cur = value * p;

      if (p >= 1) {
        setText(decimal ? `${value}${suffix}` : `${Math.round(value)}${suffix}`);
      } else if (decimal) {
        setText(cur < 0.4 ? '000' : `${cur.toFixed(1)}${suffix}`);
      } else {
        const n = Math.floor(cur);
        if (n === 0) setText('000');
        else if (p > 0.82) setText(`${Math.max(n, 1)}${suffix}`);
        else setText(String(n).padStart(3, '0'));
      }

      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value, suffix, decimal]);

  return (
    <div className="qc-stats-sec__item">
      <div className="qc-stats-sec__value" aria-live="polite">{text}</div>
      <div className="qc-stats-sec__label">{label}</div>
    </div>
  );
}

function StatsSection() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="qc-stats-sec" id="stats" ref={sectionRef}>
      <div className="qc-wrap">
        <h2 className="qc-stats-sec__title">
          Trillions of data points turned into billions of successful outcomes.
        </h2>
        <div className="qc-stats-sec__grid">
          {STATS.map((s) => (
            <StatCounter key={s.label} {...s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* —— Nine dimensions (services) —— */
const DIMENSIONS = [
  {
    icon: 'ph-smiley',
    title: 'Sentiment & emotion',
    desc: 'Turn-by-turn emotional arc for both speakers — frustration, satisfaction, confusion, de-escalation.',
    layout: 'insights',
    code: 'SE',
    meta: { id: 'A-4821', person: 'Dana R.', type: 'Live call' },
    score: 86,
    metrics: [
      { label: 'Frustration peaks', pct: 72 },
      { label: 'De-escalation', pct: 91 },
      { label: 'Empathy markers', pct: 84 },
    ],
    chat: {
      customer: 'I’ve been charged twice and I’m getting frustrated.',
      agent: 'I hear you — let me pull up the charges and fix this now.',
      agentName: 'Dana',
    },
    tasks: [
      { label: 'Emotion timeline', done: 12, total: 12 },
      { label: 'Speaker arcs', done: 9, total: 12 },
      { label: 'Escalation cues', done: 7, total: 12 },
    ],
  },
  {
    icon: 'ph-shield-check',
    title: 'Compliance breaches',
    desc: 'Mandatory disclosures, consent, mini-Miranda, recording notice. Every miss is cited with a timestamp.',
    layout: 'metrics',
    code: 'CB',
    meta: { id: 'C-1092', person: 'QA Bot', type: 'Audit' },
    score: 74,
    metrics: [
      { label: 'Recording notice', pct: 96 },
      { label: 'Mini-Miranda', pct: 68 },
      { label: 'Consent capture', pct: 81 },
    ],
    chat: {
      customer: 'Is this call being recorded?',
      agent: 'Yes — for quality and training. I’ll also read the required disclosure.',
      agentName: 'Marcus',
    },
    tasks: [
      { label: 'Disclosure checks', done: 28, total: 32 },
      { label: 'Consent flags', done: 24, total: 32 },
      { label: 'Policy citations', done: 19, total: 32 },
    ],
  },
  {
    icon: 'ph-clipboard-text',
    title: 'Script adherence',
    desc: 'How closely the agent followed the approved flow — greeting, verification, resolution, close.',
    layout: 'chat',
    code: 'SA',
    meta: { id: 'S-7740', person: 'Amina K.', type: 'Script' },
    score: 82,
    metrics: [
      { label: 'Greeting', pct: 98 },
      { label: 'Verification', pct: 88 },
      { label: 'Close', pct: 76 },
    ],
    chat: {
      customer: 'I need to verify my account before we continue.',
      agent: 'Of course — can I confirm the last four of your SSN and billing ZIP?',
      agentName: 'Amina',
    },
    tasks: [
      { label: 'Opening protocol', done: 32, total: 32 },
      { label: 'Verification steps', done: 29, total: 32 },
      { label: 'Resolution close', done: 21, total: 32 },
    ],
  },
  {
    icon: 'ph-headset',
    title: 'Agent tone & conduct',
    desc: 'Politeness, interruptions, empathy markers, hold etiquette and professionalism scoring.',
    layout: 'progress',
    code: 'AT',
    meta: { id: 'T-2201', person: 'Leah M.', type: 'Coach' },
    score: 91,
    metrics: [
      { label: 'Politeness', pct: 94 },
      { label: 'Interruptions', pct: 78 },
      { label: 'Hold etiquette', pct: 89 },
    ],
    chat: {
      customer: 'I’ve already explained this twice.',
      agent: 'You’re right to expect better — I’ll stay with you until it’s resolved.',
      agentName: 'Leah',
    },
    tasks: [
      { label: 'Tone review', done: 16, total: 16 },
      { label: 'Hold etiquette', done: 14, total: 16 },
      { label: 'Empathy drills', done: 11, total: 16 },
    ],
  },
  {
    icon: 'ph-flag',
    title: 'Profanity & abuse',
    desc: 'Profanity, threats and abusive language from either side, surfaced and severity-ranked.',
    layout: 'insights',
    code: 'PA',
    meta: { id: 'R-5518', person: 'Review', type: 'Flagged' },
    score: 63,
    metrics: [
      { label: 'Severity high', pct: 41 },
      { label: 'Agent restraint', pct: 92 },
      { label: 'Threat language', pct: 55 },
    ],
    chat: {
      customer: 'This is ridiculous — fix it now or I’m done.',
      agent: 'I understand the urgency. I’ll escalate this with a supervisor on the line.',
      agentName: 'Noah',
    },
    tasks: [
      { label: 'Severity ranking', done: 18, total: 20 },
      { label: 'Speaker attribution', done: 20, total: 20 },
      { label: 'Coach handoff', done: 12, total: 20 },
    ],
  },
  {
    icon: 'ph-lightning',
    title: 'Escalation risk',
    desc: 'Predicts churn and complaint-escalation risk from language, pace and sentiment trajectory.',
    layout: 'metrics',
    code: 'ER',
    meta: { id: 'E-8833', person: 'Risk AI', type: 'Predict' },
    score: 58,
    metrics: [
      { label: 'Churn risk', pct: 64 },
      { label: 'Complaint path', pct: 71 },
      { label: 'Pace spikes', pct: 49 },
    ],
    chat: {
      customer: 'I’m one step away from canceling everything.',
      agent: 'I don’t want you to leave — let’s remove the fee and lock in a retention offer.',
      agentName: 'Priya',
    },
    tasks: [
      { label: 'Risk trajectory', done: 22, total: 24 },
      { label: 'Retention cues', done: 15, total: 24 },
      { label: 'Supervisor alerts', done: 10, total: 24 },
    ],
  },
  {
    icon: 'ph-waveform',
    title: 'Talk / listen & silence',
    desc: 'Talk-over, monologue, and dead-air analysis — who dominated, where the call went quiet.',
    layout: 'chat',
    code: 'TL',
    meta: { id: 'W-4410', person: 'Audio', type: 'Wave' },
    score: 79,
    metrics: [
      { label: 'Talk ratio', pct: 62 },
      { label: 'Dead air', pct: 88 },
      { label: 'Talk-over', pct: 73 },
    ],
    chat: {
      customer: 'Hello… are you still there?',
      agent: 'Yes — sorry for the pause while I checked your ledger. I’m back with you.',
      agentName: 'Chris',
    },
    tasks: [
      { label: 'Talk/listen split', done: 30, total: 30 },
      { label: 'Silence windows', done: 26, total: 30 },
      { label: 'Overlap events', done: 18, total: 30 },
    ],
  },
  {
    icon: 'ph-lock-key',
    title: 'PII exposure',
    desc: 'Detects card numbers, SSNs, addresses and DOBs spoken aloud — redact or alert automatically.',
    layout: 'progress',
    code: 'PI',
    meta: { id: 'P-9901', person: 'Redact', type: 'PII' },
    score: 95,
    metrics: [
      { label: 'Card numbers', pct: 99 },
      { label: 'SSN / DOB', pct: 97 },
      { label: 'Address leaks', pct: 91 },
    ],
    chat: {
      customer: 'My card is 4111… should I say the rest?',
      agent: 'Please don’t read the full number — I’ll send a secure link instead.',
      agentName: 'Elena',
    },
    tasks: [
      { label: 'Auto-redactions spans', done: 44, total: 44 },
      { label: 'Alert queue', done: 38, total: 44 },
      { label: 'Auditor export', done: 31, total: 44 },
    ],
  },
  {
    icon: 'ph-fingerprint',
    title: 'Authenticity signals',
    desc: 'Voice-print continuity, spoof and tampering cues, and identity-verification evidence for QA.',
    layout: 'insights',
    code: 'AU',
    meta: { id: 'V-3077', person: 'Voice ID', type: 'Verify' },
    score: 88,
    metrics: [
      { label: 'Voice continuity', pct: 93 },
      { label: 'Spoof risk', pct: 22 },
      { label: 'ID match', pct: 90 },
    ],
    chat: {
      customer: 'This is still me — I can re-verify if needed.',
      agent: 'Thanks — voice-print looks consistent. I’ll continue the secure verification.',
      agentName: 'Omar',
    },
    tasks: [
      { label: 'Voice-print checks', done: 27, total: 27 },
      { label: 'Spoof scan', done: 24, total: 27 },
      { label: 'ID evidence pack', done: 20, total: 27 },
    ],
  },
];

function ScoreDots({ score, max = 5 }) {
  const filled = Math.max(0, Math.min(max, Math.round((score / 100) * max)));
  return (
    <span className="qc-dim-dots" aria-hidden="true">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`qc-dim-dot${i < filled ? ' is-on' : ''}`} />
      ))}
    </span>
  );
}

function DimMockInsights({ d }) {
  return (
    <div className="qc-dim-mock qc-dim-mock--insights">
      <div className="qc-dim-mock__head">
        <span className="qc-dim-mock__badge">{d.code}</span>
        <span className="qc-dim-mock__head-title">{d.title}</span>
        <i className="ph ph-caret-down qc-dim-mock__caret" />
      </div>
      <div className="qc-dim-mock__meta">
        <div>
          <span>ID</span>
          <strong>{d.meta.id}</strong>
        </div>
        <div>
          <span>Owner</span>
          <strong>{d.meta.person}</strong>
        </div>
        <div>
          <span>Type</span>
          <strong className="qc-dim-mock__pill">
            <i className={`ph ${d.icon}`} />
            {d.meta.type}
          </strong>
        </div>
      </div>
      <div className="qc-dim-mock__insight">
        <div className="qc-dim-mock__insight-label">
          <i className="ph ph-sparkle" />
          AI Insights
        </div>
        <p>{d.desc}</p>
      </div>
      <div className="qc-dim-mock__score">
        <span>Overall Score</span>
        <strong>{d.score}%</strong>
        <ScoreDots score={d.score} />
      </div>
    </div>
  );
}

function DimMockMetrics({ d }) {
  return (
    <div className="qc-dim-mock qc-dim-mock--metrics">
      <div className="qc-dim-mock__agents">
        <span className="qc-dim-mock__badge">{d.code}</span>
        <div>
          <strong>{d.metrics[0].pct + 12} Agents</strong>
          <span>Live on this dimension</span>
        </div>
      </div>
      <ul className="qc-dim-mock__list">
        {d.metrics.map((m) => (
          <li key={m.label}>
            <span>{m.label}</span>
            <div className="qc-dim-mock__list-right">
              <strong>{m.pct}%</strong>
              <ScoreDots score={m.pct} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DimMockChat({ d }) {
  return (
    <div className="qc-dim-mock qc-dim-mock--chat">
      <div className="qc-dim-mock__bubble qc-dim-mock__bubble--in">
        <p>{d.chat.customer}</p>
      </div>
      <div className="qc-dim-mock__who">Customer · 1 min ago</div>
      <div className="qc-dim-mock__bubble qc-dim-mock__bubble--out">
        <p>{d.chat.agent}</p>
      </div>
      <div className="qc-dim-mock__agent">
        <span className="qc-dim-mock__avatar">{d.chat.agentName.slice(0, 1)}</span>
        <span>{d.chat.agentName} · just now</span>
      </div>
    </div>
  );
}

function DimMockProgress({ d }) {
  return (
    <div className="qc-dim-mock qc-dim-mock--progress">
      <div className="qc-dim-mock__agents">
        <span className="qc-dim-mock__badge"><i className={`ph ${d.icon}`} /></span>
        <div>
          <strong>Review queue</strong>
          <span>{d.meta.type} · {d.meta.id}</span>
        </div>
      </div>
      <ul className="qc-dim-mock__tasks">
        {d.tasks.map((t) => {
          const pct = Math.round((t.done / t.total) * 100);
          return (
            <li key={t.label}>
              <div className="qc-dim-mock__task-top">
                <span>{t.label}</span>
                <strong>{t.done}/{t.total}</strong>
              </div>
              <div className="qc-dim-mock__bar">
                <span style={{ width: `${pct}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DimensionCard({ d }) {
  const mock =
    d.layout === 'metrics' ? <DimMockMetrics d={d} />
      : d.layout === 'chat' ? <DimMockChat d={d} />
        : d.layout === 'progress' ? <DimMockProgress d={d} />
          : <DimMockInsights d={d} />;

  return (
    <article className={`qc-dimensions__card qc-dimensions__card--${d.layout}`}>
      <div className="qc-dimensions__mock-wrap" aria-hidden="true">
        {mock}
      </div>
      <h3 className="qc-dimensions__caption">{d.title}</h3>
    </article>
  );
}

function DimensionsMarqueeRow({ items, direction }) {
  const loop = [...items, ...items];
  return (
    <div className={`qc-dimensions__row qc-dimensions__row--${direction}`}>
      <div className="qc-dimensions__track">
        {loop.map((d, i) => (
          <DimensionCard key={`${d.title}-${i}`} d={d} />
        ))}
      </div>
    </div>
  );
}

function DimensionsSection() {
  const withIndex = DIMENSIONS.map((d, i) => ({ ...d, origIndex: i }));
  const rowTop = withIndex.filter((d) => d.origIndex % 2 === 0);
  const rowBottom = withIndex.filter((d) => d.origIndex % 2 === 1);

  return (
    <section className="qc-dimensions" id="services">
      <div className="qc-dimensions__dots" aria-hidden="true" />
      <div className="qc-wrap qc-dimensions__inner">
        <div className="qc-dimensions__header">
          <Eyebrow light>Nine dimensions, every call</Eyebrow>
          <h2 className="qc-dimensions__title">The forensic layer your QA team can defend.</h2>
          <p className="qc-dimensions__lede">
            Every score is traceable to the exact words that produced it — no black box, no guessing.
          </p>
        </div>
      </div>
      <div className="qc-dimensions__marquee">
        <DimensionsMarqueeRow items={rowTop} direction="left" />
        <DimensionsMarqueeRow items={rowBottom} direction="right" />
      </div>
    </section>
  );
}

/* —— Work examples (bento grid) —— */

const WORK_AGENTS = [
  {
    icon: 'ph-waveform',
    title: 'Diarization',
    desc: 'Separates agent and customer with word-level sync.',
    stat: '98.2% speaker accuracy',
  },
  {
    icon: 'ph-shield-check',
    title: 'Compliance',
    desc: 'Flags disclosure misses and script gaps live.',
    stat: '94% pass rate',
  },
  {
    icon: 'ph-heart',
    title: 'Sentiment',
    desc: 'Tracks emotional arc for both speakers.',
    stat: '+0.32 avg delta',
  },
  {
    icon: 'ph-chart-line-up',
    title: 'QA scoring',
    desc: 'Rolls up nine dimensions into one scorecard.',
    stat: '81.4 overall QA',
  },
  {
    icon: 'ph-chalkboard-teacher',
    title: 'Coaching',
    desc: 'Routes low scores to sessions with focus areas and due dates.',
    stat: '2 sessions due',
  },
];

function WorkGuardrailVisual() {
  const items = [
    { label: 'Recording notice', status: 'Passed' },
    { label: 'Refund disclosure', status: 'Failed' },
    { label: 'PII redaction', status: 'Passed' },
  ];
  return (
    <div className="qc-work__mock qc-work__mock--guard" aria-hidden="true">
      <div className="qc-work__mock-bar">
        <span>Guardrails</span>
        <strong>3 active</strong>
      </div>
      <ul className="qc-work__mock-list">
        {items.map(({ label, status }) => (
          <li key={label} className={status === 'Failed' ? 'is-fail' : 'is-pass'}>
            <span>{label}</span>
            <em>{status}</em>
          </li>
        ))}
      </ul>
      <button type="button" className="qc-work__mock-btn">Review citation</button>
    </div>
  );
}

function WorkChannelVisual() {
  return (
    <div className="qc-work__mock qc-work__mock--channels" aria-hidden="true">
      <div className="qc-work__channel">
        <span className="qc-work__channel-icon qc-work__channel-icon--teal"><i className="ph ph-chat-text" /></span>
        <div className="qc-work__channel-body">
          <span>Transcript</span>
          <div className="qc-work__typing"><span /><span /><span /></div>
        </div>
      </div>
      <div className="qc-work__channel">
        <span className="qc-work__channel-icon qc-work__channel-icon--orange"><i className="ph ph-waveform" /></span>
        <div className="qc-work__channel-body">
          <span>Waveform</span>
          <div className="qc-work__wave-bars">
            {Array.from({ length: 18 }, (_, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.07}s` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="qc-work__channel">
        <span className="qc-work__channel-icon qc-work__channel-icon--green"><i className="ph ph-crosshair" /></span>
        <div className="qc-work__channel-body">
          <span>Evidence</span>
          <div className="qc-work__evidence-chip">PII · 0:42</div>
        </div>
      </div>
    </div>
  );
}

function WorkSopVisual() {
  return (
    <div className="qc-work__mock qc-work__mock--sop" aria-hidden="true">
      <div className="qc-work__sop-row">
        <span>Rubric</span>
        <strong>Northwind v3</strong>
      </div>
      <div className="qc-work__sop-row">
        <span>Queue</span>
        <strong>Support tier 2</strong>
      </div>
      <ol className="qc-work__sop-steps">
        <li><span className="qc-work__sop-tag">Step 3</span> Verify account holder</li>
        <li><span className="qc-work__sop-tag is-hot">Step 4</span> Read refund policy</li>
        <li><span className="qc-work__sop-tag">Step 5</span> Confirm resolution</li>
      </ol>
    </div>
  );
}

function WorkAgentCard({ agent, index }) {
  return (
    <article className="qc-work__agent" style={{ '--work-agent-i': index }}>
      <div className="qc-work__agent-icon" aria-hidden="true">
        <i className={`ph ${agent.icon}`} />
      </div>
      <div className="qc-work__agent-body">
        <strong>{agent.title}</strong>
        <p>{agent.desc}</p>
        <span className="qc-work__agent-stat">
          {agent.stat}
          <i className="ph ph-info" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

function WorkExamplesSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const tiles = [
    {
      id: 'defensible',
      title: 'Provably defensible',
      desc: 'Every verdict links to the exact phrase. No black box, no guessing in audit.',
      Visual: WorkGuardrailVisual,
    },
    {
      id: 'synced',
      title: 'Synced to the waveform',
      desc: 'Click any chip to jump to the moment in the recording that triggered it.',
      Visual: WorkChannelVisual,
    },
    {
      id: 'rubrics',
      title: 'Built on your rubrics',
      desc: 'Score against your SOPs, disclosure scripts, and coaching playbooks.',
      Visual: WorkSopVisual,
    },
  ];

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`qc-work${visible ? ' is-visible' : ''}`}
    >
      <div className="qc-work__dots" aria-hidden="true" />
      <div className="qc-wrap">
        <header className="qc-work__header">
          <span className="qc-pill-eyebrow">Work examples</span>
          <h2>Read the call the way an examiner would.</h2>
          <p>
            Diarized transcript on the left, forensic evidence on the right. Click any verdict to jump to the exact phrase and waveform moment that triggered it.
          </p>
        </header>

        <div className="qc-work__bento">
          <article className="qc-work__hero-card">
            <div className="qc-work__hero-copy">
              <Eyebrow>Real work example</Eyebrow>
              <h3>How QCTool analyzes a live call</h3>
              <p>
                A real Northwind Support recording ingested, diarized, and scored with evidence your QA team can defend in audit.
              </p>
              <div className="qc-work__meta" aria-label="Call metadata">
                <span className="qc-work__meta-chip">
                  <i className="ph ph-hash" aria-hidden="true" />
                  A-48213
                </span>
                <span className="qc-work__meta-chip">
                  <i className="ph ph-buildings" aria-hidden="true" />
                  Northwind Support
                </span>
                <span className="qc-work__meta-chip">
                  <i className="ph ph-user" aria-hidden="true" />
                  Agent Dana R.
                </span>
                <span className="qc-work__meta-chip">
                  <i className="ph ph-chalkboard-teacher" aria-hidden="true" />
                  Coaching flagged
                </span>
              </div>
            </div>
            <div className="qc-work__hero-grid">
              {WORK_AGENTS.map((agent, i) => (
                <WorkAgentCard key={agent.title} agent={agent} index={i} />
              ))}
            </div>
          </article>

          {tiles.map(({ id, title, desc, Visual }, i) => (
            <article key={id} className="qc-work__tile" style={{ '--work-tile-i': i }}>
              <div className="qc-work__tile-visual">
                <Visual />
              </div>
              <div className="qc-work__tile-copy">
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="qc-work__footer-cta">
          <a href="#login" onClick={goLogin} className="btn-fill qc-work__cta">See it in action →</a>
        </div>
      </div>
    </section>
  );
}

/* —— Testimonial —— */
/* Framer-style vertical testimonial slide — 3 columns, alternating scroll */
const TESTIMONIALS = [
  {
    id: 'finance',
    quote: 'Before QCTool, we audited 3% of calls and still missed disclosure failures. Now every interaction is scored before end-of-day reporting.',
    name: 'Marcus Webb',
    role: 'Compliance Lead',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 'collections',
    quote: 'QCTool replaced our manual 2% sampling with 100% coverage. Our compliance rate went from 78% to 94% in the first quarter.',
    name: 'Sarah Chen',
    role: 'QA Director',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=520&fit=crop',
  },
  {
    id: 'healthcare',
    quote: 'We needed HIPAA-safe QA at scale. QCTool redacts PII automatically and gives supervisors evidence they can act on same-day.',
    name: 'Priya Nair',
    role: 'VP Operations',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 'insurance',
    quote: 'Forensic citations changed how we coach. Agents see the exact phrase that triggered a miss — no more subjective scorecards.',
    name: 'Elena Park',
    role: 'Training Manager',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 'bpo',
    quote: 'We rolled QCTool across three sites in six weeks. Supervisors finally trust the scores because every verdict is evidence-backed.',
    name: 'David Kim',
    role: 'Head of Quality',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=520&fit=crop',
  },
  {
    id: 'retail',
    quote: 'Talk/listen and dead-air analysis alone paid for the platform. Our average handle time dropped without hurting CSAT.',
    name: 'Olivia Chen',
    role: 'Contact Center Lead',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 'fintech',
    quote: 'PII redaction and disclosure scoring let us expand QA coverage without expanding the compliance team.',
    name: 'James Henderson',
    role: 'Chief Operations Officer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face',
  },
  {
    id: 'telecom',
    quote: 'Escalation-risk alerts surface the calls that matter before customers churn. That alone shifted our retention numbers.',
    name: 'Sofia Alvarez',
    role: 'CX Strategy Lead',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=520&fit=crop',
  },
  {
    id: 'banking',
    quote: 'From ingest to coaching reports, QCTool is the first QA stack our auditors actually understand — and defend.',
    name: 'Rachel Foster',
    role: 'Audit & Risk Partner',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
  },
];

function TestimonialCard({ item }) {
  if (item.photo) {
    return (
      <article className="qc-tslide-card qc-tslide-card--photo">
        <img className="qc-tslide-card__bg" src={item.photo} alt="" aria-hidden="true" />
        <div className="qc-tslide-card__shade" aria-hidden="true" />
        <div className="qc-tslide-card__blur" aria-hidden="true" />
        <div className="qc-tslide-card__body">
          <blockquote className="qc-tslide-card__quote">“{item.quote}”</blockquote>
          <footer className="qc-tslide-card__footer">
            <div className="qc-tslide-card__meta">
              <div className="qc-tslide-card__name">{item.name}</div>
              <div className="qc-tslide-card__role">{item.role}</div>
            </div>
            <img className="qc-tslide-card__avatar" src={item.avatar} alt={item.name} />
          </footer>
        </div>
      </article>
    );
  }

  return (
    <article className="qc-tslide-card">
      <blockquote className="qc-tslide-card__quote">“{item.quote}”</blockquote>
      <footer className="qc-tslide-card__footer">
        <div className="qc-tslide-card__meta">
          <div className="qc-tslide-card__name">{item.name}</div>
          <div className="qc-tslide-card__role">{item.role}</div>
        </div>
        <img className="qc-tslide-card__avatar" src={item.avatar} alt={item.name} />
      </footer>
    </article>
  );
}

function TestimonialColumn({ items, direction, duration }) {
  const loop = [...items, ...items];
  return (
    <div className={`qc-tslide-col qc-tslide-col--${direction}`} style={{ '--tslide-dur': duration }}>
      <div className="qc-tslide-col__track">
        {loop.map((item, i) => (
          <TestimonialCard key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function TestimonialSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const colA = [TESTIMONIALS[0], TESTIMONIALS[3], TESTIMONIALS[6]];
  const colB = [TESTIMONIALS[1], TESTIMONIALS[4], TESTIMONIALS[7]];
  const colC = [TESTIMONIALS[2], TESTIMONIALS[5], TESTIMONIALS[8]];

  return (
    <section
      className={`qc-testimonial-sec${visible ? ' is-visible' : ''}`}
      id="testimonials"
      ref={sectionRef}
    >
      <div className="qc-wrap">
        <header className="qc-testimonial-sec__header">
          <Eyebrow light>Testimonials</Eyebrow>
          <h2 className="sec-title">Success stories</h2>
          <p className="sec-desc">
            QA teams across finance, healthcare and collections trust QCTool to score every call — not just a sample.
          </p>
        </header>
      </div>

      <div className="qc-tslide" aria-label="Customer testimonials">
        <TestimonialColumn items={colA} direction="up" duration="28s" />
        <TestimonialColumn items={colB} direction="down" duration="32s" />
        <TestimonialColumn items={colC} direction="up" duration="26s" />
      </div>
    </section>
  );
}

/* —— Pricing —— */
function PricingSection() {
  const [billing, setBilling] = useState('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter Plan',
      price: '$0',
      suffix: 'lifetime free',
      desc: 'For small teams validating AI-powered QA on live calls.',
      features: [
        'Up to 500 calls scored per month',
        'Core forensic scoring dimensions',
        'Diarized transcript review',
        '7-day call history',
        'Email support',
      ],
      cta: 'Get Started Free',
      featured: false,
    },
    {
      id: 'growth',
      name: 'Growth Plan',
      price: billing === 'monthly' ? '$499' : '$399',
      suffix: billing === 'monthly' ? 'per month' : 'per month, billed annually',
      desc: 'Full platform for contact centers scaling QA across every queue.',
      badge: 'Popular',
      features: [
        'Up to 25,000 calls scored monthly',
        'All nine scoring dimensions',
        'Batch ingest & worker scaling',
        'Custom rubrics & coaching workflows',
        'CRM & STT integrations',
        'Priority support & onboarding',
      ],
      cta: 'Book a Demo',
      featured: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: null,
      priceLabel: 'Talk to Sales',
      desc: 'Dedicated infrastructure, compliance controls, and unlimited scale.',
      features: [
        'Unlimited call volume',
        'On-prem or VPC deployment',
        'SSO, RBAC & audit logging',
        'Custom models & rubrics',
        'Dedicated success engineer',
        'SLA-backed uptime',
      ],
      cta: 'Contact Sales',
      featured: false,
    },
  ];

  return (
    <section className="qc-pricing" id="pricing">
      <div className="qc-wrap">
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="sec-title">QCTool platform pricing.</h2>
        <p className="sec-desc">
          Everything you need to ingest, score, and review calls in one place — from pilot teams to enterprise contact centers.
        </p>

        <div className="qc-pricing__toggle" role="tablist" aria-label="Billing period">
          <button
            type="button"
            role="tab"
            aria-selected={billing === 'monthly'}
            className={`qc-pricing__toggle-btn${billing === 'monthly' ? ' is-active' : ''}`}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={billing === 'annual'}
            className={`qc-pricing__toggle-btn${billing === 'annual' ? ' is-active' : ''}`}
            onClick={() => setBilling('annual')}
          >
            Annually
          </button>
        </div>

        <div className="qc-pricing__grid">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`qc-pricing__card${plan.featured ? ' is-featured' : ''}`}
            >
              <div className="qc-pricing__card-head">
                <div className="qc-pricing__card-head-top">
                  <h3>{plan.name}</h3>
                  {plan.badge && <span className="qc-pricing__popular">{plan.badge}</span>}
                </div>
                <div className="qc-pricing__price">
                  {plan.priceLabel ? (
                    <span className="qc-pricing__price-label">{plan.priceLabel}</span>
                  ) : (
                    <>
                      <span className="qc-pricing__price-val">{plan.price}</span>
                      <span className="qc-pricing__price-suffix">{plan.suffix}</span>
                    </>
                  )}
                </div>
                <p className="qc-pricing__card-desc">{plan.desc}</p>
              </div>

              <ul className="qc-pricing__features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className="qc-pricing__check" aria-hidden="true">
                      <i className="ph ph-check" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a href="#login" onClick={goLogin} className="qc-pricing__cta">
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* —— Final CTA (Prolibu migrate-cta) —— */
function FinalCTA() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    let cleanup = () => {};
    let mounted = true;
    initFinalCtaEffects({ section: sectionRef.current, card: cardRef.current }).then((fn) => {
      if (mounted && fn) cleanup = fn;
    });
    return () => {
      mounted = false;
      cleanup();
    };
  }, []);

  return (
    <section className="qc-migrate-cta" ref={sectionRef}>
      <div className="qc-migrate-cta__card" ref={cardRef}>
        <div className="qc-migrate-cta__grid" aria-hidden="true">
          <img src="/landing/cta-call-analysis-bg.svg" alt="" />
        </div>
        <div className="qc-migrate-cta__glow" aria-hidden="true">
          <span className="qc-migrate-cta__glow-strip qc-migrate-cta__glow-strip--1" />
          <span className="qc-migrate-cta__glow-strip qc-migrate-cta__glow-strip--2" />
          <span className="qc-migrate-cta__glow-strip qc-migrate-cta__glow-strip--3" />
          <span className="qc-migrate-cta__glow-strip qc-migrate-cta__glow-strip--4" />
          <span className="qc-migrate-cta__glow-strip qc-migrate-cta__glow-strip--5" />
        </div>
        <div className="qc-migrate-cta__content">
          <h2>
            <span className="qc-migrate-cta__highlight">
              Score up to <span className="qc-migrate-cta__count" data-count-target="100">0</span>% of calls
            </span>
            <span className="qc-migrate-cta__subtitle">when you replace manual sampling with QCTool</span>
          </h2>
          <p>
            Deploy in weeks — ingest recordings, score every call, and review flagged evidence without interrupting your QA workflow.
          </p>
          <a href="#login" onClick={goLogin} className="qc-migrate-cta__btn">
            Book a <span className="qc-migrate-cta__btn-accent">Demo</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* —— Footer (Sendr-style tiers, QCTool brand) —— */
const FOOTER_LINKS = [
  {
    title: 'Product',
    links: [
      { label: 'Dashboard', href: '#login' },
      { label: 'Call analysis', href: '#login' },
      { label: 'Batch ingest', href: '#login', badge: 'New' },
      { label: 'Analytics', href: '#login' },
      { label: 'STT models', href: '#login' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About QCTool', href: '#login' },
      { label: 'Security', href: '#login' },
      { label: 'Careers', href: '#login' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '#login' },
      { label: 'API reference', href: '#login' },
      { label: 'Status', href: '#login' },
      { label: 'Changelog', href: '#login' },
    ],
  },
  {
    title: 'Legals',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms of service', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  },
];

const FOOTER_TRUST = [
  { icon: 'ph-seal-check', label: 'GDPR Compliant' },
  { icon: 'ph-shield-check', label: 'ISO 27001:2022' },
  { icon: 'ph-lock-key', label: 'HIPAA Ready' },
];

function Footer() {
  return (
    <footer className="qc-footer">
      <div className="qc-footer__glow" aria-hidden="true" />
      <div className="qc-footer__dots" aria-hidden="true" />

      <div className="qc-footer__inner qc-wrap">
        <div className="qc-footer__cta">
          <div className="qc-footer__cta-copy">
            <h2 className="qc-footer__cta-title">
              QA that every call can defend — and every team can ship.
            </h2>
            <p className="qc-footer__cta-desc">
              Ingest, score, and review every conversation in one platform — without juggling tools or workflows.
            </p>
          </div>
          <a href="#login" onClick={goLogin} className="qc-footer__cta-btn">Book a Demo</a>
        </div>

        <div className="qc-footer__trust">
          <p className="qc-footer__trust-title">Certified standards. Verified practices.</p>
          <ul className="qc-footer__trust-list">
            {FOOTER_TRUST.map((item) => (
              <li key={item.label}>
                <i className={`ph ${item.icon}`} aria-hidden="true" />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="qc-footer__grid">
          <div className="qc-footer__brand">
            <div className="qc-footer__brand-head">
              <BrandLogo tone="dark" size={32} className="qc-brand--sm" />
            </div>
            <p className="qc-footer__tagline">
              Forensic AI quality assurance for high-volume call centers. Hear every call. Listen to none.
            </p>
            <Waveform n={22} />
            <div className="qc-footer__status">
              <span className="qc-footer__status-dot" aria-hidden="true" />
              All systems operational
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="qc-footer__col">
              <h3 className="qc-footer__col-title">{col.title}</h3>
              <ul className="qc-footer__links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={link.href === '#login' ? goLogin : undefined}
                    >
                      {link.label}
                      {link.badge && <span className="qc-footer__badge">{link.badge}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="qc-footer__bottom">
          <p className="qc-footer__copy">
            © 2026 QCTool. All rights reserved
            <span className="qc-footer__copy-sep" aria-hidden="true">|</span>
            Developed by{' '}
            <a href="https://zekiexpert.com" className="qc-footer__copy-accent">
              Zeki Expert Solutions
            </a>
          </p>
          <div className="qc-footer__social">
            <a href="https://zekiexpert.com" className="qc-footer__social-btn" aria-label="Website">
              <i className="ph ph-globe" />
            </a>
            <a href="#" className="qc-footer__social-btn" aria-label="X">
              <i className="ph ph-x-logo" />
            </a>
            <a href="#" className="qc-footer__social-btn" aria-label="LinkedIn">
              <i className="ph ph-linkedin-logo" />
            </a>
            <a href="#" className="qc-footer__social-btn" aria-label="YouTube">
              <i className="ph ph-youtube-logo" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* —— App —— */
export function Landing({ onLogin } = {}) {
  loginHandler = typeof onLogin === 'function' ? onLogin : () => {};
  return (
    <div className="qc-lp">
      <HeroBackground />
      <Nav />
      <main>
        <Hero />
        <Lifecycle />
        <OrbitSection />
        <StatsSection />
        <DimensionsSection />
        <WorkExamplesSection />
        <TestimonialSection />
        <PricingSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

