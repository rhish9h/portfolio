import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface GridDot {
  gx: number;
  gy: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  hoverEnergy: number;
  noiseOffset: number;
  clearance: number;
}

interface MaskBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const spacing = 28;
    let dots: GridDot[] = [];

    const mouse = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      inside: false,
      lastMovedAt: -9999,
    };

    const getMaskBoxes = (): MaskBox[] => {
      const section = canvas.closest('section');
      if (!section) return [];
      const canvasRect = canvas.getBoundingClientRect();
      const maskedEls = section.querySelectorAll('[data-dot-mask]');
      const boxes: MaskBox[] = [];

      maskedEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        boxes.push({
          left: r.left - canvasRect.left - 12,
          top: r.top - canvasRect.top - 8,
          right: r.right - canvasRect.left + 12,
          bottom: r.bottom - canvasRect.top + 8,
        });
      });

      return boxes;
    };

    const computeClearance = (x: number, y: number, boxes: MaskBox[]): number => {
      if (boxes.length === 0) return 1;
      const feather = 42;
      let minClearance = 1;

      for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        const dx = Math.max(b.left - x, 0, x - b.right);
        const dy = Math.max(b.top - y, 0, y - b.bottom);
        const dist = Math.hypot(dx, dy);

        if (dist <= 0) {
          return 0.04;
        }
        if (dist < feather) {
          const t = dist / feather;
          const smooth = t * t * (3 - 2 * t);
          const c = 0.04 + smooth * 0.96;
          if (c < minClearance) minClearance = c;
        }
      }

      return minClearance;
    };

    const updateClearances = () => {
      const boxes = getMaskBoxes();
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.clearance = computeClearance(d.gx, d.gy, boxes);
      }
    };

    const buildGrid = () => {
      dots = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const offsetX = (width - (cols - 1) * spacing) * 0.5;
      const offsetY = (height - (rows - 1) * spacing) * 0.5;
      const boxes = getMaskBoxes();

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const gx = offsetX + c * spacing;
          const gy = offsetY + r * spacing;
          dots.push({
            gx,
            gy,
            ox: 0,
            oy: 0,
            vx: 0,
            vy: 0,
            hoverEnergy: 0,
            noiseOffset: (r * 0.37 + c * 0.23) % (Math.PI * 2),
            clearance: computeClearance(gx, gy, boxes),
          });
        }
      }
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      if (
        localX >= -20 &&
        localX <= rect.width + 20 &&
        localY >= -20 &&
        localY <= rect.height + 20
      ) {
        if (mouse.inside) {
          mouse.vx = (localX - mouse.x) * 0.35;
          mouse.vy = (localY - mouse.y) * 0.35;
        }
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
        mouse.x = localX;
        mouse.y = localY;
        mouse.inside = true;
        mouse.lastMovedAt = performance.now();
      } else {
        mouse.inside = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.inside = false;
    };

    handleResize();
    // Re-measure text bounds once entrance animations settle
    const settleTimer = window.setTimeout(updateClearances, 600);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');

      // Base resting dot color
      const baseR = isDark ? 160 : 28;
      const baseG = isDark ? 160 : 28;
      const baseB = isDark ? 170 : 32;
      const baseAlpha = isDark ? 0.28 : 0.34;

      // Active wave / hover highlight color (warm vermilion-red like the Opus showreel inspiration)
      const activeR = isDark ? 239 : 218;
      const activeG = isDark ? 83 : 68;
      const activeB = isDark ? 68 : 53;

      if (!prefersReducedMotion) {
        time += 0.018;
      }

      // Autonomous S-curved wave ("school") gliding freely across the grid
      const waveCenterX =
        width * 0.52 +
        Math.cos(time * 0.42) * (width * 0.25) +
        Math.sin(time * 0.95) * (width * 0.06);
      const waveCenterY =
        height * 0.46 +
        Math.sin(time * 0.55) * (height * 0.18) +
        Math.cos(time * 1.1) * (height * 0.05);

      const waveAngle = -0.95 + Math.sin(time * 0.35) * 0.28;
      const cosA = Math.cos(waveAngle);
      const sinA = Math.sin(waveAngle);

      const spineLength = Math.min(width, height) * 0.46;
      const bandWidth = 95;
      const hoverRadius = 135;

      mouse.vx *= 0.9;
      mouse.vy *= 0.9;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        // 1. Compute autonomous S-wave intensity at this grid dot
        const relX = d.gx - waveCenterX;
        const relY = d.gy - waveCenterY;

        const u = relX * cosA + relY * sinA;
        const v = -relX * sinA + relY * cosA;

        const sCurveOffset =
          Math.sin(u * 0.0085 - time * 1.6) * 68 +
          Math.cos(u * 0.015 + time * 1.1) * 22;
        const vCurved = v - sCurveOffset;

        const normU = u / spineLength;
        const normV = vCurved / bandWidth;
        const waveDistSq = normU * normU + normV * normV;

        let waveIntensity = 0;
        let wavePushX = 0;
        let wavePushY = 0;

        if (waveDistSq < 1.35) {
          const falloff = Math.exp(-waveDistSq * 2.3);
          const ripple =
            0.82 + 0.18 * Math.sin(u * 0.025 - time * 2.8 + d.noiseOffset);
          waveIntensity = falloff * ripple;

          const dispMag = waveIntensity * 6.5 * d.clearance;
          const dispAngle =
            waveAngle + Math.cos(u * 0.012 - time * 1.8) * 0.6;
          wavePushX = Math.cos(dispAngle) * dispMag;
          wavePushY = Math.sin(dispAngle) * dispMag;
        }

        // 2. Compute mouse hover brightening & ripple displacement
        let targetHover = 0;
        let mousePushX = 0;
        let mousePushY = 0;

        if (mouse.inside) {
          const mdx = d.gx - mouse.x;
          const mdy = d.gy - mouse.y;
          const mDist = Math.hypot(mdx, mdy);

          if (mDist < hoverRadius) {
            const prox = 1 - mDist / hoverRadius;
            targetHover = prox * prox * (3 - 2 * prox);

            if (mDist > 0.1) {
              const push = targetHover * 5.5 * d.clearance;
              mousePushX = (mdx / mDist) * push + mouse.vx * targetHover * 0.45;
              mousePushY = (mdy / mDist) * push + mouse.vy * targetHover * 0.45;
            }
          }
        }

        const hoverLerp = targetHover > d.hoverEnergy ? 0.28 : 0.055;
        d.hoverEnergy += (targetHover - d.hoverEnergy) * hoverLerp;

        // Attenuate energy behind text blocks so typography stays 100% crisp and legible
        const rawEnergy = Math.min(
          Math.max(waveIntensity, d.hoverEnergy * 1.15),
          1
        );
        const totalEnergy = rawEnergy * d.clearance;

        const targetOx = wavePushX + mousePushX;
        const targetOy = wavePushY + mousePushY;
        d.vx = (d.vx + (targetOx - d.ox) * 0.14) * 0.78;
        d.vy = (d.vy + (targetOy - d.oy) * 0.14) * 0.78;
        d.ox += d.vx;
        d.oy += d.vy;

        const drawX = d.gx + d.ox;
        const drawY = d.gy + d.oy;

        const baseRadius = 1.6 * (0.4 + 0.6 * d.clearance);
        const radius = baseRadius + (totalEnergy ** 1.15) * 3.55;

        const colorMix = Math.min(totalEnergy * 1.1, 1);
        const r = Math.round(baseR + (activeR - baseR) * colorMix);
        const g = Math.round(baseG + (activeG - baseG) * colorMix);
        const b = Math.round(baseB + (activeB - baseB) * colorMix);
        const alpha =
          Math.min(baseAlpha + totalEnergy * 0.58, 0.96) * d.clearance;

        if (alpha > 0.015) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.clearTimeout(settleTimer);
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
