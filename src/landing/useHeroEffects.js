/** Prolibu hero background — iso-player + scroll-driven frames & parallax */

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function waitForGlobal(name, timeout = 8000) {
  return new Promise((resolve) => {
    if (window[name]) {
      resolve(window[name]);
      return;
    }
    const start = Date.now();
    const tick = () => {
      if (window[name]) {
        resolve(window[name]);
        return;
      }
      if (Date.now() - start > timeout) {
        resolve(null);
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();
  });
}

async function loadIsoPlayerScript() {
  const src = '/landing/iso-player.js';
  await loadScript(src);
  return waitForGlobal('IsoPlayer');
}

/** Shared iso-player scroll scrub (hero + migrate CTA) */
async function initIsoScrollScrub(containerEl, { getProgress, startFrameRatio = 0, onReady }) {
  if (!containerEl) return null;

  const IsoPlayer = await loadIsoPlayerScript();
  if (!IsoPlayer) return null;

  containerEl.innerHTML = '';

  const mobile = window.innerWidth < 768;
  const json = mobile
    ? '/landing/animations/iso-save-vertical.json'
    : '/landing/animations/iso-save.json';

  const player = await IsoPlayer.load(containerEl, json, {
    loop: false,
    autoplay: false,
    background: 'none',
    responsive: true,
    cover: true,
  });

  player.stop();
  const maxFrame = player.totalFrames - 1;
  const startFrame = Math.floor(startFrameRatio * maxFrame);
  player.setFrame(startFrame);

  if (onReady) onReady(containerEl);

  let targetFrame = startFrame;
  let currentFrame = startFrame;
  let animating = false;
  const lerp = mobile ? 0.1 : 0.07;

  function tickFrames() {
    const diff = targetFrame - currentFrame;
    if (Math.abs(diff) < 0.02) {
      currentFrame = targetFrame;
      player.setFrame(currentFrame);
      animating = false;
      return;
    }
    currentFrame += diff * lerp;
    player.setFrame(currentFrame);
    requestAnimationFrame(tickFrames);
  }

  function onScrollFrames() {
    const progress = clamp(getProgress(), 0, 1);
    const endFrame = startFrameRatio > 0
      ? startFrame + progress * (maxFrame - startFrame)
      : progress * maxFrame;
    targetFrame = endFrame;
    if (!animating) {
      animating = true;
      requestAnimationFrame(tickFrames);
    }
  }

  window.addEventListener('scroll', onScrollFrames, { passive: true });
  window.addEventListener('resize', onScrollFrames, { passive: true });
  onScrollFrames();

  return {
    player,
    cleanup: () => {
      window.removeEventListener('scroll', onScrollFrames);
      window.removeEventListener('resize', onScrollFrames);
      player.destroy();
      containerEl.innerHTML = '';
    },
  };
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export async function initHeroBackground() {
  const isoEl = document.getElementById('hero-iso');
  if (!isoEl) return null;

  const mobile = window.innerWidth < 768;
  const vh = () => window.__stableVH || window.innerHeight;

  const result = await initIsoScrollScrub(isoEl, {
    startFrameRatio: 0.15,
    getProgress: () => {
      const scrollRange = mobile ? vh() * 1.1 : vh() * 2.6;
      return clamp(window.scrollY / scrollRange, 0, 1);
    },
    onReady: (el) => {
      requestAnimationFrame(() => el.classList.add('hero-iso--revealed'));
      setTimeout(() => window.dispatchEvent(new Event('iso-revealed')), 600);
    },
  });

  return result?.cleanup || null;
}

/** Hero mock — mouse parallax on carousel cards (ReflexAI-style depth) */
export function initHeroMockEffects(refs) {
  const { viewport, carousel } = refs;
  if (!viewport || !carousel) return () => {};

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return () => {};

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;
  carousel.__mockParallax = { x: 0, y: 0 };

  function onPointerMove(e) {
    const rect = viewport.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    targetX = clamp((e.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5) * 2;
    targetY = clamp((e.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5) * 2;
  }

  function onPointerLeave() {
    targetX = 0;
    targetY = 0;
  }

  function tick() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    carousel.__mockParallax.x = currentX;
    carousel.__mockParallax.y = currentY;
    carousel.style.setProperty('--mock-mx', currentX.toFixed(4));
    carousel.style.setProperty('--mock-my', currentY.toFixed(4));
    rafId = requestAnimationFrame(tick);
  }

  viewport.addEventListener('pointermove', onPointerMove, { passive: true });
  viewport.addEventListener('pointerleave', onPointerLeave);
  rafId = requestAnimationFrame(tick);

  return () => {
    viewport.removeEventListener('pointermove', onPointerMove);
    viewport.removeEventListener('pointerleave', onPointerLeave);
    if (rafId) cancelAnimationFrame(rafId);
    carousel.style.removeProperty('--mock-mx');
    carousel.style.removeProperty('--mock-my');
    delete carousel.__mockParallax;
  };
}

export function initHeroParallax(refs) {
  const { hero, shotInner, shotWrap, introSettledRef } = refs;
  if (!hero) return () => {};

  let ticking = false;
  const maxW = 1280;
  const pad = window.innerWidth >= 1024 ? 64 : 24;
  const targetW = maxW + (window.innerWidth - pad - maxW) * 0.25;

  function isIntroSettled() {
    return !introSettledRef || introSettledRef.current;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const d = window.scrollY;
      const introDone = isIntroSettled();

      if (hero) {
        const f = clamp((d - 30) / (400 - 30), 0, 1);
        if (f > 0 && introDone) {
          const h = easeInOut(f);
          hero.style.transform = `scale(${1 - (1 - 0.88) * h})`;
          hero.style.opacity = String(1 - 0.12 * h);
          const blurAmt = clamp((d - 250) / 150, 0, 1);
          hero.style.filter = blurAmt > 0 ? `blur(${12 * blurAmt}px)` : '';
        } else if (introDone) {
          hero.style.transform = '';
          hero.style.opacity = '';
          hero.style.filter = '';
        }
      }

      if (shotInner) {
        if (!introDone) {
          shotInner.style.opacity = '';
          shotInner.style.transform = '';
        } else if (d <= 30) {
          shotInner.style.opacity = '1';
          shotInner.style.transform = 'translateY(0)';
        } else {
          const p = clamp((d - 30) / 220, 0, 1);
          const m = easeInOut(p);
          shotInner.style.opacity = '1';
          shotInner.style.transform = `translateY(${40 * (1 - m)}px)`;
        }
      }

      if (shotWrap) {
        const e = clamp((d - 250) / (600 - 250), 0, 1);
        const x = easeInOut(e);
        shotWrap.style.maxWidth = `${Math.round(maxW + (targetW - maxW) * x)}px`;

        if (introDone) {
          const cinematic = easeInOut(clamp(d / 500, 0, 1));
          const rect = shotWrap.getBoundingClientRect();
          shotWrap.style.setProperty('--shot-scroll-y', `${-rect.height * 0.1 * cinematic}px`);
          shotWrap.style.setProperty('--shot-scroll-scale', String(1 - 0.05 * cinematic));
          shotWrap.style.setProperty('--shot-scroll-opacity', String(1 - 0.15 * cinematic));
        }
      }

      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hero-intro-settled', onScroll);
  onScroll();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('hero-intro-settled', onScroll);
  };
}

/** Zendesk-style contained → full-bleed background on scroll into #features */
export function initFeaturesExpand(sectionEl, bgEl) {
  if (!sectionEl || !bgEl) return () => {};

  let currentProgress = 0;
  let targetProgress = 0;
  let rafId = null;

  const containedMax = 1080;
  const inset = 24;
  const radiusStart = 20;
  const lerp = 0.1;

  function smoothstep(t) {
    const c = clamp(t, 0, 1);
    return c * c * (3 - 2 * c);
  }

  function getTargetProgress() {
    const rect = sectionEl.getBoundingClientRect();
    const vh = window.innerHeight;
    const sectionCenterY = rect.top + rect.height * 0.38;
    const viewportCenterY = vh * 0.5;
    const enterY = vh * 0.95;
    const raw = (enterY - sectionCenterY) / (enterY - viewportCenterY);
    return smoothstep(raw);
  }

  function apply(progress) {
    const vw = window.innerWidth;
    const containedW = Math.min(containedMax, vw - inset * 2);
    const w = containedW + (vw - containedW) * progress;
    const r = radiusStart * (1 - progress);
    bgEl.style.width = `${w}px`;
    bgEl.style.borderRadius = `${r}px ${r}px 0 0`;
    bgEl.style.setProperty('--zd-expand', String(progress));
  }

  function tick() {
    const diff = targetProgress - currentProgress;
    if (Math.abs(diff) < 0.0015) {
      currentProgress = targetProgress;
      apply(currentProgress);
      rafId = null;
      return;
    }
    currentProgress += diff * lerp;
    apply(currentProgress);
    rafId = requestAnimationFrame(tick);
  }

  function onScroll() {
    targetProgress = getTargetProgress();
    if (rafId == null) rafId = requestAnimationFrame(tick);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (rafId != null) cancelAnimationFrame(rafId);
  };
}

/** Hide fixed hero iso/geometric layer once user scrolls past the hero mockup */
export function initHeroBgScrollHide() {
  const heroBg = document.querySelector('.hero-v2__bg');
  const lifecycle = document.getElementById('lifecycle');
  if (!heroBg) return () => {};

  let ticking = false;

  function update() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const threshold = lifecycle
        ? lifecycle.offsetTop - window.innerHeight * 0.12
        : window.innerHeight * 1.4;
      const hidden = window.scrollY > threshold;
      heroBg.style.opacity = hidden ? '0' : '1';
      heroBg.style.visibility = hidden ? 'hidden' : 'visible';
      ticking = false;
    });
  }

  heroBg.style.transition = 'opacity 0.65s ease, visibility 0.65s ease';
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();

  return () => {
    window.removeEventListener('scroll', update);
    window.removeEventListener('resize', update);
    heroBg.style.opacity = '';
    heroBg.style.visibility = '';
    heroBg.style.transition = '';
  };
}

/** Prolibu migrate-cta — scroll-driven iso frames + highlight count reveal */
export async function initFinalCtaEffects(targets) {
  const sectionEl = targets?.section || targets;
  const cardEl = targets?.card || sectionEl?.querySelector('.qc-migrate-cta__card');
  if (!sectionEl || !cardEl) return () => {};

  const cleanups = [];
  let aborted = false;
  const isoEl = document.getElementById('final-cta-iso');
  const countEl = cardEl.querySelector('[data-count-target]');
  const highlightEl = cardEl.querySelector('.qc-migrate-cta__highlight');
  const contentEl = cardEl.querySelector('.qc-migrate-cta__content');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  cardEl.classList.remove('is-iso-fallback');

  function getProgress() {
    const rect = cardEl.getBoundingClientRect();
    const vh = window.__stableVH || window.innerHeight;
    const mobile = window.innerWidth < 768;
    const end = mobile ? -rect.height * 0.5 : -rect.height;
    return clamp((vh - rect.top) / (vh - end), 0, 1);
  }

  function applyProgress(progress) {
    cardEl.style.setProperty('--cta-progress', progress.toFixed(4));
    if (contentEl) {
      const reveal = clamp((progress - 0.08) / 0.55, 0, 1);
      contentEl.style.setProperty('--cta-reveal', reveal.toFixed(4));
    }
  }

  function onScrollProgress() {
    applyProgress(getProgress());
  }

  window.addEventListener('scroll', onScrollProgress, { passive: true });
  window.addEventListener('resize', onScrollProgress, { passive: true });
  onScrollProgress();
  cleanups.push(() => {
    window.removeEventListener('scroll', onScrollProgress);
    window.removeEventListener('resize', onScrollProgress);
  });

  if (isoEl && !reducedMotion) {
    const isoResult = await initIsoScrollScrub(isoEl, {
      startFrameRatio: 0,
      getProgress,
      onReady: (el) => {
        if (aborted) return;
        cardEl.classList.add('is-iso-ready');
        requestAnimationFrame(() => el.classList.add('hero-iso--revealed'));
      },
    });

    if (aborted) {
      isoResult?.cleanup();
      return () => cleanups.forEach((fn) => fn());
    }

    if (isoResult) {
      cleanups.push(isoResult.cleanup);
    } else {
      cardEl.classList.add('is-iso-fallback');
    }
  } else if (isoEl) {
    cardEl.classList.add('is-iso-ready');
    isoEl.classList.add('hero-iso--revealed');
  }

  if (countEl && highlightEl) {
    const target = parseInt(countEl.getAttribute('data-count-target'), 10);
    const duration = reducedMotion ? 0 : 1600;
    let visible = false;
    let runId = 0;

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animateCount(startTime, id) {
      if (duration === 0) {
        countEl.textContent = String(target);
        highlightEl.style.setProperty('--bar', '1');
        highlightEl.style.color = 'var(--c-negro, #1a1a1a)';
        countEl.style.color = '#fff';
        return;
      }
      function frame(now) {
        if (id !== runId) return;
        const p = Math.min((now - startTime) / duration, 1);
        const h = easeOut(p);
        countEl.textContent = String(Math.round(h * target));
        highlightEl.style.setProperty('--bar', String(h));
        highlightEl.style.color = h > 0.12 ? 'var(--c-negro, #1a1a1a)' : '#fff';
        countEl.style.color = '#fff';
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          runId += 1;
          animateCount(performance.now(), runId);
        } else if (!entry.isIntersecting && visible) {
          visible = false;
          runId += 1;
          countEl.textContent = '0';
          highlightEl.style.setProperty('--bar', '0');
          highlightEl.style.color = '#fff';
          countEl.style.color = '';
        }
      });
    }, { threshold: 0.3 });

    observer.observe(cardEl);
    cleanups.push(() => observer.disconnect());
  }

  return () => {
    aborted = true;
    cardEl.classList.remove('is-iso-ready', 'is-iso-fallback');
    cleanups.forEach((fn) => fn());
  };
}

/** Login promo panel — hero gradient + time-driven iso crystal cycle */
async function initIsoTimeScrub(containerEl, { getProgress, startFrameRatio = 0, onReady }) {
  if (!containerEl) return null;

  const IsoPlayer = await loadIsoPlayerScript();
  if (!IsoPlayer) return null;

  containerEl.innerHTML = '';

  const mobile = window.innerWidth < 768;
  const json = mobile
    ? '/landing/animations/iso-save-vertical.json'
    : '/landing/animations/iso-save.json';

  const player = await IsoPlayer.load(containerEl, json, {
    loop: false,
    autoplay: false,
    background: 'none',
    responsive: true,
    cover: true,
  });

  player.stop();
  const maxFrame = player.totalFrames - 1;
  const startFrame = Math.floor(startFrameRatio * maxFrame);
  player.setFrame(startFrame);

  if (onReady) onReady(containerEl);

  let targetFrame = startFrame;
  let currentFrame = startFrame;
  let animating = false;
  const lerp = mobile ? 0.28 : 0.16;
  let rafId = null;

  function tickFrames() {
    const diff = targetFrame - currentFrame;
    if (Math.abs(diff) < 0.05) {
      currentFrame = targetFrame;
      player.setFrame(currentFrame);
      animating = false;
      return;
    }
    currentFrame += diff * lerp;
    player.setFrame(currentFrame);
    rafId = requestAnimationFrame(tickFrames);
  }

  function onTick() {
    const progress = clamp(getProgress(), 0, 1);
    const endFrame = startFrameRatio > 0
      ? startFrame + progress * (maxFrame - startFrame)
      : progress * maxFrame;
    targetFrame = endFrame;
    if (!animating) {
      animating = true;
      rafId = requestAnimationFrame(tickFrames);
    }
  }

  let loopId = null;
  function loop() {
    onTick();
    loopId = requestAnimationFrame(loop);
  }
  loopId = requestAnimationFrame(loop);

  return {
    player,
    cleanup: () => {
      if (loopId) cancelAnimationFrame(loopId);
      if (rafId) cancelAnimationFrame(rafId);
      player.destroy();
      containerEl.innerHTML = '';
    },
  };
}

export async function initLoginPromoEffects(promoEl) {
  if (!promoEl) return () => {};

  const isoEl = document.getElementById('login-promo-iso');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cleanups = [];
  const cycleMs = 14000;
  const start = performance.now();

  function getProgress() {
    return ((performance.now() - start) % cycleMs) / cycleMs;
  }

  function applyProgress() {
    promoEl.style.setProperty('--promo-progress', getProgress().toFixed(4));
  }

  if (reducedMotion) {
    promoEl.classList.add('is-iso-ready');
    if (isoEl) isoEl.classList.add('hero-iso--revealed');
    applyProgress();
    return () => {
      promoEl.classList.remove('is-iso-ready', 'is-iso-fallback');
      promoEl.style.removeProperty('--promo-progress');
    };
  }

  let progressId = null;
  function progressLoop() {
    applyProgress();
    progressId = requestAnimationFrame(progressLoop);
  }
  progressId = requestAnimationFrame(progressLoop);
  cleanups.push(() => {
    if (progressId) cancelAnimationFrame(progressId);
    promoEl.style.removeProperty('--promo-progress');
  });

  if (isoEl) {
    const isoResult = await initIsoTimeScrub(isoEl, {
      startFrameRatio: 0.15,
      getProgress,
      onReady: (el) => {
        promoEl.classList.add('is-iso-ready');
        requestAnimationFrame(() => el.classList.add('hero-iso--revealed'));
      },
    });

    if (isoResult) {
      cleanups.push(isoResult.cleanup);
    } else {
      promoEl.classList.add('is-iso-fallback');
      if (isoEl) isoEl.classList.add('hero-iso--revealed');
    }
  }

  return () => {
    promoEl.classList.remove('is-iso-ready', 'is-iso-fallback');
    cleanups.forEach((fn) => fn());
  };
}
