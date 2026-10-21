import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { createSpray, makeRays, type SprayEngine } from './sprayEngine';
import { LABEL } from './labelPaths';
import './SprayBanner.css';

interface SprayBannerProps {
  /** Accessible page title (the words on the canvas are decoration). */
  title: string;
  /** Overlay content, e.g. a "Shop all" button. Shown at the bottom-left. */
  children?: ReactNode;
  className?: string;
}

/** One spray shoots words for this long (seconds), then the nozzle is quiet until the next one. */
const SPRAY_SECONDS = 5;
/** Time from the start of one spray to the start of the next (ms): 5 s of spray + 8 s of rest. */
const SPRAY_CYCLE_MS = 13000;

/** Reads a CSS variable from the element, with a fallback (canvas cannot use var()). */
function readToken(el: Element, name: string, fallback: string): string {
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  return v || fallback;
}

export function SprayBanner({ title, children, className = '' }: SprayBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nozzleRef = useRef<SVGCircleElement>(null);
  const engineRef = useRef<SprayEngine | null>(null);
  const pressTimer = useRef<number>(0);
  const [pressed, setPressed] = useState(false);

  // the pump goes down for a moment every time a spray starts (click, timer or page load)
  const markPressed = useCallback(() => {
    setPressed(true);
    window.clearTimeout(pressTimer.current);
    pressTimer.current = window.setTimeout(() => setPressed(false), 350);
  }, []);

  const press = useCallback(() => {
    engineRef.current?.spray(3);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const nozzle = nozzleRef.current;
    if (!canvas || !nozzle) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rays = makeRays({
      ink: readToken(canvas, '--color-ink', '#1C1A17'),
      olive: readToken(canvas, '--color-olive', '#6B6F4E'),
      amber: readToken(canvas, '--color-amber', '#B5793B'),
    });

    const engine = createSpray(canvas, {
      rays,
      reducedMotion: reduced,
      sprayDuration: SPRAY_SECONDS,
      onSpray: markPressed,
      getOrigin: () => {
        const c = canvas.getBoundingClientRect();
        const n = nozzle.getBoundingClientRect();
        return { x: n.left + n.width / 2 - c.left, y: n.top + n.height / 2 - c.top };
      },
    });
    engineRef.current = engine;
    engine.start();

    const resizeObserver = new ResizeObserver(() => engine.resize());
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) engine.resume();
      else engine.pause();
    });
    visibility.observe(canvas);

    const interval = reduced ? 0 : window.setInterval(press, SPRAY_CYCLE_MS);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(pressTimer.current);
      resizeObserver.disconnect();
      visibility.disconnect();
      engine.destroy();
      engineRef.current = null;
    };
  }, [press, markPressed]);

  const labelScale = 56 / LABEL.width;
  const labelH = LABEL.height * labelScale;

  return (
    <section className={`spray-banner${pressed ? ' is-pressed' : ''} ${className}`.trim()} aria-label={title}>
      <h1 className="spray-banner__sr">{title}</h1>
      <canvas ref={canvasRef} className="spray-banner__canvas" aria-hidden="true" />

      {/* bottle + overlay form one composition: the overlay is positioned from the bottle box */}
      <div className="spray-banner__stage">
      <button type="button" className="spray-banner__bottle" onClick={press} aria-label="Press the spray">
        <svg viewBox="0 0 260 320" role="img" aria-hidden="true" focusable="false">
          <defs>
            {/* cylindrical shading: dark edges, lit middle */}
            <linearGradient id="sb-cap" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#0d0c0a" />
              <stop offset="0.18" stopColor="#3b3833" />
              <stop offset="0.4" stopColor="#24221e" />
              <stop offset="1" stopColor="#0d0c0a" />
            </linearGradient>
            <linearGradient id="sb-glass" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="0.07" stopColor="#fff" stopOpacity="0.18" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0.08" />
              <stop offset="0.93" stopColor="#fff" stopOpacity="0.2" />
              <stop offset="1" stopColor="#fff" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="sb-liquid" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#C9A55E" />
              <stop offset="0.22" stopColor="#EBD093" />
              <stop offset="0.5" stopColor="#F4E0AE" />
              <stop offset="0.82" stopColor="#E0BF78" />
              <stop offset="1" stopColor="#BE9A52" />
            </linearGradient>
            {/* liquid gets a little darker toward the bottom */}
            <linearGradient id="sb-liquid-depth" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#7a5418" stopOpacity="0" />
              <stop offset="1" stopColor="#7a5418" stopOpacity="0.28" />
            </linearGradient>
            <linearGradient id="sb-streak" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="0.7" stopColor="#fff" stopOpacity="0.35" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sb-label" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#1C1A17" stopOpacity="0.14" />
              <stop offset="0.25" stopColor="#1C1A17" stopOpacity="0" />
              <stop offset="0.75" stopColor="#1C1A17" stopOpacity="0" />
              <stop offset="1" stopColor="#1C1A17" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="sb-neck-shadow" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#1C1A17" stopOpacity="0.35" />
              <stop offset="1" stopColor="#1C1A17" stopOpacity="0" />
            </linearGradient>
            <filter id="sb-blur-lg" x="-50%" y="-300%" width="200%" height="700%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
            <filter id="sb-blur-sm" x="-50%" y="-300%" width="200%" height="700%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
            <filter id="sb-blur-xs" x="-50%" y="-20%" width="200%" height="140%">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>
          </defs>

          {/* ground shadows: a wide soft cast shadow and a tight contact shadow */}
          <ellipse cx="165" cy="308" rx="120" ry="9" fill="#1C1A17" opacity="0.2" filter="url(#sb-blur-lg)" />
          <ellipse cx="130" cy="304" rx="84" ry="5" fill="#1C1A17" opacity="0.5" filter="url(#sb-blur-sm)" />

          {/* pump head: this part moves down when pressed */}
          <g className="spray-banner__actuator">
            <rect x="96" y="18" width="7" height="7" fill="url(#sb-cap)" />
            <rect x="102" y="10" width="56" height="24" fill="url(#sb-cap)" />
            <rect x="102" y="10" width="56" height="2" fill="#fff" opacity="0.18" />
            <rect x="114" y="34" width="32" height="12" fill="url(#sb-cap)" />
            <circle ref={nozzleRef} cx="96" cy="21.5" r="1" fill="none" />
          </g>

          {/* cap */}
          <rect x="94" y="46" width="72" height="52" fill="url(#sb-cap)" />
          <rect x="94" y="46" width="72" height="1.5" fill="#fff" opacity="0.2" />
          <rect x="101" y="48" width="4" height="48" fill="#fff" opacity="0.16" filter="url(#sb-blur-xs)" />
          <rect x="94" y="94" width="72" height="4" fill="#000" opacity="0.35" />

          {/* neck and shoulder */}
          <rect x="108" y="98" width="44" height="8" fill="url(#sb-glass)" stroke="#1C1A17" strokeOpacity="0.5" strokeWidth="1.2" />
          <rect x="108" y="98" width="44" height="8" fill="url(#sb-neck-shadow)" />

          {/* glass body */}
          <rect x="50" y="106" width="160" height="196" rx="3" fill="#fff" fillOpacity="0.22" />
          <rect x="50" y="106" width="160" height="196" rx="3" fill="url(#sb-glass)" />

          {/* liquid with depth */}
          <rect x="56" y="168" width="148" height="128" fill="url(#sb-liquid)" />
          <rect x="56" y="168" width="148" height="128" fill="url(#sb-liquid-depth)" />
          <ellipse cx="130" cy="168" rx="74" ry="2.6" fill="#fff" opacity="0.55" />
          <rect x="56" y="169" width="148" height="10" fill="#fff" opacity="0.14" />

          {/* thick glass base: lighter band, inner edge and refraction line */}
          <rect x="50" y="276" width="160" height="26" fill="#fff" fillOpacity="0.38" />
          <rect x="56" y="276" width="148" height="1.5" fill="#fff" opacity="0.6" />
          <rect x="50" y="298" width="160" height="4" fill="#1C1A17" opacity="0.18" />

          {/* label with the stacked logo, slightly curved by shading */}
          <rect x="88" y="182" width="88" height="84" fill="#1C1A17" opacity="0.12" filter="url(#sb-blur-xs)" />
          <rect x="86" y="180" width="88" height="84" fill="#FBFAF7" stroke="#1C1A17" strokeOpacity="0.08" />
          <g transform={`translate(${130 - 28} ${180 + (84 - labelH) / 2}) scale(${labelScale})`} fill="#1C1A17">
            <path d={LABEL.line1} />
            <rect x={LABEL.rule.x} y={LABEL.rule.y} width={LABEL.rule.width} height={LABEL.rule.height} />
            <path d={LABEL.line2} />
          </g>
          <rect x="86" y="180" width="88" height="84" fill="url(#sb-label)" />

          {/* glass outline on top, then gloss */}
          <rect x="50" y="106" width="160" height="196" rx="3" fill="none" stroke="#1C1A17" strokeOpacity="0.55" strokeWidth="1.4" />
          <rect x="60" y="116" width="6" height="156" fill="url(#sb-streak)" filter="url(#sb-blur-xs)" />
          <rect x="70" y="122" width="2" height="100" fill="url(#sb-streak)" opacity="0.6" />
          <rect x="195" y="116" width="3" height="156" fill="url(#sb-streak)" opacity="0.5" filter="url(#sb-blur-xs)" />
        </svg>
      </button>

      {children ? <div className="spray-banner__overlay">{children}</div> : null}
      </div>
    </section>
  );
}
