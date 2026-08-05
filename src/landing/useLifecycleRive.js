import { Rive, Layout, Fit, Alignment } from '@rive-app/webgl2';

const SM = 'State Machine 1';
const SCRUB_ANIM = 'Timeline 1';

/**
 * ReflexAI Roleplay/QA orbit — byte-identical Sanity .riv (fa9968e8…).
 * WebGL2 renderer. Scroll scrubs "Timeline 1" (Reflex riveScrollInput pattern);
 * "intro" / "loop" keep ambient motion when not scrubbing hard.
 */
export function initLifecycleRive(canvas, { getScrollProgress } = {}) {
  if (!canvas) return () => {};

  let rive = null;
  let raf = 0;
  let disposed = false;
  let canScrub = false;

  const applyScroll = () => {
    if (!rive || !canScrub) return;
    const p = Math.min(1, Math.max(0, Number(getScrollProgress?.()) || 0));
    try {
      /* Rive scrub(animationName, amount) amount is 0–1 */
      rive.scrub(SCRUB_ANIM, p);
    } catch (_) {
      try {
        const anims = rive.animationNames || [];
        const name = anims.find((a) => /timeline/i.test(a)) || anims[0];
        if (name) rive.scrub(name, p);
      } catch (__) {
        /* ignore */
      }
    }
  };

  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(applyScroll);
  };

  const resize = () => {
    try {
      rive?.resizeDrawingSurfaceToCanvas();
    } catch (_) {
      /* ignore */
    }
  };

  rive = new Rive({
    src: '/rive/lifecycle-orbit.riv',
    canvas,
    autoplay: true,
    autoBind: true,
    stateMachines: SM,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.BottomCenter,
    }),
    onLoad: () => {
      if (disposed) {
        try { rive?.cleanup(); } catch (_) { /* ignore */ }
        return;
      }

      rive.resizeDrawingSurfaceToCanvas();

      const anims = rive.animationNames || [];
      canScrub = typeof rive.scrub === 'function' && (
        anims.includes(SCRUB_ANIM) || anims.length > 0
      );

      /* Keep ambient intro/loop playing under SM; scrub Timeline on scroll */
      try {
        if (anims.includes('intro')) rive.play('intro');
        if (anims.includes('loop')) rive.play('loop');
      } catch (_) {
        /* SM autoplay already covers ambient motion */
      }

      applyScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', resize, { passive: true });
    },
  });

  const ro = typeof ResizeObserver !== 'undefined'
    ? new ResizeObserver(() => resize())
    : null;
  if (ro && canvas.parentElement) ro.observe(canvas.parentElement);

  return () => {
    disposed = true;
    cancelAnimationFrame(raf);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', resize);
    ro?.disconnect();
    try { rive?.cleanup(); } catch (_) { /* ignore */ }
    rive = null;
  };
}
