import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

// SVG Cyclist — side-view bike + rider, pedals animate when scrolling
function CyclistSVG({ pedaling, size = 64 }: { pedaling: boolean; size?: number }) {
  const pedalAngle = useRef(0);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (!pedaling) return;
    let raf: number;
    const spin = () => {
      pedalAngle.current += 0.13;
      setAngle(pedalAngle.current);
      raf = requestAnimationFrame(spin);
    };
    raf = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(raf);
  }, [pedaling]);

  const cr = 5;
  const lx = Math.cos(angle) * cr;
  const ly = Math.sin(angle) * cr;
  const rx = Math.cos(angle + Math.PI) * cr;
  const ry = Math.sin(angle + Math.PI) * cr;

  return (
    <svg width={size} height={size} viewBox="-24 -28 54 46" className="drop-shadow-lg" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))' }}>
      <g>
        {/* Rear wheel */}
        <circle cx="-11" cy="9" r="9" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.8" opacity="0.75" />
        <circle cx="-11" cy="9" r="1.4" fill="hsl(var(--foreground))" opacity="0.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
          <line key={`rs${d}`} x1={-11 + Math.cos(d * Math.PI / 180) * 1.8} y1={9 + Math.sin(d * Math.PI / 180) * 1.8}
            x2={-11 + Math.cos(d * Math.PI / 180) * 8.2} y2={9 + Math.sin(d * Math.PI / 180) * 8.2}
            stroke="hsl(var(--muted-foreground))" strokeWidth="0.35" opacity="0.35" />
        ))}

        {/* Front wheel */}
        <circle cx="13" cy="9" r="9" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.8" opacity="0.75" />
        <circle cx="13" cy="9" r="1.4" fill="hsl(var(--foreground))" opacity="0.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
          <line key={`fs${d}`} x1={13 + Math.cos(d * Math.PI / 180) * 1.8} y1={9 + Math.sin(d * Math.PI / 180) * 1.8}
            x2={13 + Math.cos(d * Math.PI / 180) * 8.2} y2={9 + Math.sin(d * Math.PI / 180) * 8.2}
            stroke="hsl(var(--muted-foreground))" strokeWidth="0.35" opacity="0.35" />
        ))}

        {/* Frame */}
        <line x1="-11" y1="9" x2="0" y2="1" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
        <line x1="0" y1="1" x2="-4" y2="-7" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
        <line x1="-4" y1="-7" x2="-11" y2="9" stroke="hsl(var(--primary))" strokeWidth="1.7" strokeLinecap="round" />
        <line x1="0" y1="1" x2="7" y2="-6" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="7" y1="-6" x2="13" y2="9" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

        {/* Seat */}
        <line x1="-4" y1="-7" x2="-5" y2="-10" stroke="hsl(var(--foreground))" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
        <ellipse cx="-5" cy="-11" rx="4" ry="1.2" fill="hsl(var(--foreground))" opacity="0.5" />

        {/* Handlebars */}
        <line x1="7" y1="-6" x2="9" y2="-8.5" stroke="hsl(var(--foreground))" strokeWidth="1.3" strokeLinecap="round" opacity="0.65" />
        <line x1="8" y1="-9" x2="11" y2="-7" stroke="hsl(var(--foreground))" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />

        {/* Chainring */}
        <circle cx="0" cy="1" r="3" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.9" opacity="0.3" />

        {/* Cranks + pedals */}
        <line x1="0" y1="1" x2={lx} y2={1 + ly} stroke="hsl(var(--foreground))" strokeWidth="1.1" opacity="0.6" />
        <rect x={lx - 1.8} y={1 + ly - 0.6} width="3.6" height="1.2" rx="0.4" fill="hsl(var(--foreground))" opacity="0.5" />
        <line x1="0" y1="1" x2={rx} y2={1 + ry} stroke="hsl(var(--foreground))" strokeWidth="1.1" opacity="0.6" />
        <rect x={rx - 1.8} y={1 + ry - 0.6} width="3.6" height="1.2" rx="0.4" fill="hsl(var(--foreground))" opacity="0.5" />

        {/* Rider — torso */}
        <line x1="-4" y1="-11" x2="4" y2="-18" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" />

        {/* Left leg */}
        <line x1="-4" y1="-11" x2={-2 + lx * 0.35} y2={-3 + ly * 0.45} stroke="hsl(var(--foreground))" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
        <line x1={-2 + lx * 0.35} y1={-3 + ly * 0.45} x2={lx} y2={1 + ly} stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        {/* Right leg */}
        <line x1="-4" y1="-11" x2={-2 + rx * 0.35} y2={-3 + ry * 0.45} stroke="hsl(var(--foreground))" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
        <line x1={-2 + rx * 0.35} y1={-3 + ry * 0.45} x2={rx} y2={1 + ry} stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        {/* Arms */}
        <line x1="3" y1="-16" x2="9.5" y2="-8" stroke="hsl(var(--accent))" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />

        {/* Head */}
        <circle cx="5" cy="-20" r="3.5" fill="hsl(var(--accent))" opacity="0.9" />
        {/* Helmet */}
        <path d="M 2 -21.5 Q 5 -25 8 -21.5" fill="hsl(var(--primary))" opacity="0.75" />
      </g>
    </svg>
  );
}

// The road is rendered as a fixed overlay — its Y scroll is mapped from the document
export function WindingRoad() {
  const pathRef = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll();
  const [pathLength, setPathLength] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [cyclist, setCyclist] = useState({ x: 50, y: 0, angle: 0 });
  const [progress, setProgress] = useState(0);

  // We use a viewBox that matches a logical coordinate space.
  // The SVG is rendered in a fixed sidebar, so it needs to map scroll position to Y.
  const W = 120;
  const H = 1000;

  // Winding road path — S-curves snaking left-right within the sidebar
  // Starts at y=30 (below navbar) and ends at y=970
  const roadPath = `M 60,30 C 95,80 25,130 60,180 C 95,230 25,280 60,330 C 95,380 25,430 60,480 C 95,530 25,580 60,630 C 95,680 25,730 60,780 C 95,830 25,880 60,930 C 70,960 55,975 60,970`;

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Pedaling detection
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let lastY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - lastY) > 3) {
        setIsMoving(true);
        lastY = window.scrollY;
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 250);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(timeout); };
  }, []);

  // Update cyclist position on the path
  const updateCyclist = useCallback((prog: number) => {
    const path = pathRef.current;
    if (!path || pathLength === 0) return;
    const pt = path.getPointAtLength(prog * pathLength);
    const d = 2;
    const next = path.getPointAtLength(Math.min(prog * pathLength + d, pathLength));
    const ang = Math.atan2(next.y - pt.y, next.x - pt.x) * (180 / Math.PI);
    setCyclist({ x: pt.x, y: pt.y, angle: ang });
    setProgress(prog);
  }, [pathLength]);

  useEffect(() => {
    if (pathLength === 0) return;
    // Initial position
    updateCyclist(0);
    const unsub = scrollYProgress.on('change', updateCyclist);
    return unsub;
  }, [scrollYProgress, pathLength, updateCyclist]);

  // Build section stop points
  const stopTs = [0.05, 0.18, 0.34, 0.50, 0.67, 0.84, 0.97];
  const sectionLabels = ['Hero', 'About', 'Education', 'Experience', 'Skills', 'Achievements', 'Contact'];

  const [stops, setStops] = useState<Array<{ x: number; y: number }>>([]);
  useEffect(() => {
    if (!pathRef.current || pathLength === 0) return;
    setStops(stopTs.map(t => {
      const p = pathRef.current!.getPointAtLength(t * pathLength);
      return { x: p.x, y: p.y };
    }));
  }, [pathLength]);

  return (
    <>
      {/* Fixed left-side road strip — hidden on mobile */}
      <div className="fixed left-0 top-0 bottom-0 z-[5] pointer-events-none hidden lg:block" style={{ width: '80px', overflow: 'visible' }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Measurement path (hidden) */}
          <path ref={pathRef} d={roadPath} fill="none" stroke="none" />

          {/* Road shadow */}
          <path d={roadPath} fill="none" stroke="hsl(var(--foreground))" strokeWidth="18" strokeLinecap="round" opacity="0.06" />

          {/* Road surface */}
          <path d={roadPath} fill="none" stroke="hsl(var(--muted))" strokeWidth="14" strokeLinecap="round" opacity="0.55" />

          {/* Road edge lines */}
          <path d={roadPath} fill="none" stroke="hsl(var(--border))" strokeWidth="16" strokeLinecap="round" opacity="0.25" />
          <path d={roadPath} fill="none" stroke="hsl(var(--muted))" strokeWidth="12" strokeLinecap="round" opacity="0.45" />

          {/* Center dashed line */}
          <path d={roadPath} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeDasharray="6 5" opacity="0.4" />

          {/* Scroll progress glow trail */}
          {pathLength > 0 && (
            <motion.path
              d={roadPath}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength * (1 - progress),
              }}
              opacity="0.7"
            />
          )}

          {/* Stop markers along the road */}
          {stops.map((s, i) => {
            const passed = progress >= stopTs[i] - 0.02;
            return (
              <g key={`stop-${i}`}>
                <circle cx={s.x} cy={s.y} r="6" fill={passed ? 'hsl(var(--primary))' : 'hsl(var(--muted))'} opacity={passed ? 0.25 : 0.1} />
                <circle cx={s.x} cy={s.y} r="3.5" fill={passed ? 'hsl(var(--primary))' : 'hsl(var(--background))'} stroke="hsl(var(--primary))" strokeWidth="1.5" opacity={passed ? 0.9 : 0.5} />
              </g>
            );
          })}

          {/* Decorative dots between stops */}
          {stops.slice(0, -1).map((s, i) => {
            const next = stops[i + 1];
            if (!next) return null;
            const midX = (s.x + next.x) / 2;
            const midY = (s.y + next.y) / 2;
            return (
              <circle key={`dot-${i}`} cx={midX} cy={midY} r="1.5" fill="hsl(var(--primary))" opacity="0.15" />
            );
          })}
        </svg>

        {/* Cyclist rendered as HTML overlay on top of the SVG */}
        {pathLength > 0 && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${(cyclist.x / W) * 100}%`,
              top: `${(cyclist.y / H) * 100}%`,
              transform: `translate(-30%, -65%)`,
              transition: 'left 0.15s ease-out, top 0.15s ease-out',
              zIndex: 10,
            }}
          >
            <CyclistSVG pedaling={isMoving} size={62} />
          </div>
        )}
      </div>

      {/* Section labels floating next to the road — hidden on mobile */}
      <div className="fixed left-[84px] top-0 bottom-0 z-[4] pointer-events-none hidden lg:block" style={{ width: '100px' }}>
        {stops.map((s, i) => {
          const passed = progress >= stopTs[i] - 0.02;
          return (
            <div
              key={`label-${i}`}
              className="absolute text-xs font-medium whitespace-nowrap transition-all duration-300"
              style={{
                top: `${(s.y / H) * 100}%`,
                transform: 'translateY(-50%)',
                color: passed ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                opacity: passed ? 0.9 : 0.4,
                fontWeight: passed ? 600 : 400,
              }}
            >
              {sectionLabels[i]}
            </div>
          );
        })}
      </div>
    </>
  );
}
