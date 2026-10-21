/**
 * Spray engine: words fly out of a nozzle in a fan, drawn on a <canvas>.
 * Framework-free on purpose (no React here), so it is easy to test and reuse.
 *
 * Idea: every "ray" is a line that starts at the nozzle. Words travel along it.
 * Near the nozzle they are tiny and slow, far away they are bigger and faster,
 * which makes the fan look like a cone of mist.
 */

export interface RayConfig {
  /** Words that will loop along this ray. */
  words: readonly string[];
  /** Any CSS color. */
  color: string;
}

export interface SprayOptions {
  rays: readonly RayConfig[];
  /** Nozzle position in CSS pixels, relative to the canvas top-left corner. */
  getOrigin: () => { x: number; y: number };
  fontFamily?: string;
  /** When true: draws one still frame and never animates. */
  reducedMotion?: boolean;
}

export interface SprayEngine {
  start: () => void;
  pause: () => void;
  resume: () => void;
  /** Makes the words shoot out faster for a moment (like pressing the pump). */
  burst: (strength?: number) => void;
  resize: () => void;
  destroy: () => void;
}

/* ---------- word lists (taken from the product data) ---------- */

const FRESH = ['BERGAMOT', 'BLACK TEA', 'GREEN FIG', 'BASIL', 'MINT', 'NEROLI', 'GRAPEFRUIT', 'WET CONCRETE', 'CLEAN COTTON'];
const FLORAL = ['IRIS', 'TUBEROSE', 'WHITE PEACH', 'VIOLET', 'DRY ROSE', 'GARDENIA', 'ORANGE BLOSSOM'];
const WOODY = ['CEDARWOOD', 'PINE', 'LEATHER', 'SANDALWOOD', 'VETIVER', 'OLD BOOKS', 'SAWDUST'];
const AMBER = ['SMOKED VANILLA', 'CLOVE', 'HONEY', 'SAFFRON', 'TONKA', 'DARK RUM', 'EMBERS'];

export function makeRays(colors: { ink: string; olive: string; amber: string }): RayConfig[] {
  const { ink, olive, amber } = colors;
  return [
    { words: FRESH, color: ink },
    { words: WOODY, color: ink },
    { words: FLORAL, color: olive },
    { words: AMBER, color: ink },
    { words: FRESH, color: amber },
    { words: FLORAL, color: ink },
    { words: WOODY, color: olive },
    { words: AMBER, color: ink },
    { words: FRESH, color: ink },
  ];
}

/* ---------- internals ---------- */

const DEG = Math.PI / 180;
const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

/** Tiny seeded random generator, so the layout is the same on every load. */
function makeRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Word {
  text: string;
  /** Distance from the nozzle, in px. */
  d: number;
  /** Width in em (includes letter-spacing). */
  em: number;
}

interface Ray {
  pool: string[];
  cursor: number;
  words: Word[];
  color: string;
  speed: number;
  cos: number;
  sin: number;
  rot: number;
}

type LetterSpacingContext = CanvasRenderingContext2D & { letterSpacing?: string };

export function createSpray(canvas: HTMLCanvasElement, options: SprayOptions): SprayEngine {
  const ctx = canvas.getContext('2d') as LetterSpacingContext | null;
  if (!ctx) throw new Error('Canvas 2D is not available');

  const family = options.fontFamily ?? '"Jost", ui-sans-serif, system-ui, sans-serif';
  const reduced = options.reducedMotion === true;
  const supportsSpacing = 'letterSpacing' in ctx;
  const spacingEm = supportsSpacing ? 0.08 : 0;

  let w = 0;
  let h = 0;
  let ox = 0;
  let oy = 0;
  let reach = 1; // distance at which words reach their biggest size
  let sMin = 3.2;
  let sMax = 16;
  let baseSpeed = 95;
  let rays: Ray[] = [];
  let boost = { a: 5, t: 0, tau: 0.9 }; // starts with a "psssht"
  let raf = 0;
  let last = 0;
  let ready = false;
  let animating = false;
  let destroyed = false;
  const emCache = new Map<string, number>();

  const measureEm = (text: string): number => {
    let v = emCache.get(text);
    if (v === undefined) {
      ctx.font = `500 100px ${family}`;
      if (supportsSpacing) ctx.letterSpacing = '0px';
      v = ctx.measureText(text).width / 100 + spacingEm * text.length;
      emCache.set(text, v);
    }
    return v;
  };

  const sizeAt = (d: number): number => sMin + (sMax - sMin) * Math.pow(clamp(d / reach, 0, 1.15), 0.9);

  const buildRays = (): void => {
    const mobile = w < 640;
    const wanted = mobile ? 7 : 9;
    const pool = options.rays;
    const n = Math.min(wanted, pool.length);
    const rand = makeRandom(7);
    rays = [];
    for (let i = 0; i < n; i += 1) {
      const cfg = pool[n === 1 ? 0 : Math.round((i * (pool.length - 1)) / (n - 1))];
      const words = [...cfg.words];
      for (let k = words.length - 1; k > 0; k -= 1) {
        const j = Math.floor(rand() * (k + 1));
        [words[k], words[j]] = [words[j], words[k]];
      }
      rays.push({
        pool: words,
        cursor: Math.floor(rand() * words.length),
        words: [],
        color: cfg.color,
        speed: 0.9 + rand() * 0.22,
        cos: 0,
        sin: 0,
        rot: 0,
      });
    }
  };

  const layout = (): void => {
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const o = options.getOrigin();
    ox = o.x;
    oy = o.y;
    emCache.clear();

    const mobile = w < 640;
    sMax = clamp(w / 85, 11, 19);
    baseSpeed = clamp(w / 28, 28, 55); // half of the original speed
    reach = Math.max(200, ox, 0.7 * Math.hypot(ox, oy));

    if (rays.length === 0) buildRays();

    // Aim the fan straight out of the nozzle, level with it, toward the opposite side.
    const target = { x: w * (mobile ? 0.1 : 0.12), y: oy };
    let center = Math.atan2(oy - target.y, target.x - ox);
    if (center < 0) center += Math.PI * 2;
    const spread = (mobile ? 32 : 36) * DEG;
    rays.forEach((r, i) => {
      const t = rays.length === 1 ? 0 : (i / (rays.length - 1)) * 2 - 1;
      const psi = center + t * spread;
      r.cos = Math.cos(psi);
      r.sin = Math.sin(psi);
      r.rot = Math.PI - psi; // text reads toward the nozzle
    });
  };

  const inBounds = (r: Ray, d: number): boolean => {
    const x = ox + d * r.cos;
    const y = oy - d * r.sin;
    return x > -40 && x < w + 40 && y > -40 && y < h + 40;
  };

  const step = (dt: number): void => {
    boost.t += dt;
    const mult = 1 + boost.a * Math.exp(-boost.t / boost.tau);
    for (const r of rays) {
      for (const wd of r.words) {
        const f = clamp(wd.d / reach, 0, 1.3);
        wd.d += dt * baseSpeed * r.speed * (0.45 + 1.9 * Math.pow(f, 1.1)) * mult;
      }
      r.words = r.words.filter((wd) => inBounds(r, wd.d));

      const newest = r.words[r.words.length - 1];
      const next = r.pool[r.cursor % r.pool.length];
      const len0 = measureEm(next) * sMin;
      if (!newest || newest.d > len0 + sMin * 4) {
        r.words.push({ text: next, d: 0, em: measureEm(next) });
        r.cursor += 1;
      }
    }
  };

  const draw = (): void => {
    ctx.clearRect(0, 0, w, h);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    const fadeIn = Math.max(6, reach * 0.05);
    for (const r of rays) {
      ctx.fillStyle = r.color;
      for (const wd of r.words) {
        const size = sizeAt(wd.d);
        ctx.save();
        ctx.translate(ox + wd.d * r.cos, oy - wd.d * r.sin);
        ctx.rotate(r.rot);
        ctx.globalAlpha = clamp(wd.d / fadeIn, 0, 1) * 0.92;
        ctx.font = `500 ${size.toFixed(2)}px ${family}`;
        if (supportsSpacing) ctx.letterSpacing = `${(spacingEm * size).toFixed(2)}px`;
        ctx.fillText(wd.text, 0, 0);
        ctx.restore();
      }
    }
  };

  const frame = (now: number): void => {
    if (!animating) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    step(dt);
    draw();
  };

  const renderStill = (): void => {
    rays = [];
    layout();
    boost = { a: 0, t: 0, tau: 1 };
    for (let i = 0; i < 420; i += 1) step(1 / 30);
    draw();
  };

  const runLoop = (): void => {
    if (animating || destroyed || reduced) return;
    animating = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  };

  return {
    start() {
      const boot = async (): Promise<void> => {
        try {
          await document.fonts.load(`500 16px ${family}`);
        } catch {
          /* the fallback font is fine */
        }
        if (destroyed) return;
        ready = true;
        if (reduced) {
          renderStill();
        } else {
          layout();
          runLoop();
        }
      };
      void boot();
    },
    pause() {
      animating = false;
      cancelAnimationFrame(raf);
    },
    resume() {
      if (ready) runLoop();
    },
    burst(strength = 3) {
      boost = { a: strength, t: 0, tau: 0.5 };
    },
    resize() {
      if (!ready) return;
      if (reduced) renderStill();
      else layout();
    },
    destroy() {
      destroyed = true;
      animating = false;
      cancelAnimationFrame(raf);
    },
  };
}
