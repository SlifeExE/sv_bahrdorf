import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  life: number;
}

interface Rocket {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  trail: { x: number; y: number; alpha: number }[];
  exploded: boolean;
  color: string;
  launchTime: number;
}

const COLORS = [
  "#ff4e50", "#fc913a", "#f9d423", "#ede574", "#ffffff",
  "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff9a9e",
  "#ff3366", "#ffcc00", "#00ff88", "#ff7700", "#ff55aa",
];

// Target 60fps as baseline – all speeds are defined "per 16.67ms"
const BASE_DT = 1000 / 60;

export function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let done = false;

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    let rocketsInitialized = false;
    let startTime = 0;
    let lastTime = 0;

    const syncSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    const initRockets = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w < 10 || h < 10) return false;

      const flightDuration = 65; // in "base frames" worth of time (was 80, now faster)

      rockets.length = 0;

      const r1 = {
        x: w * 0.08,
        y: h * 0.92,
        targetX: w * 0.42,
        targetY: h * 0.38,
        vx: 0,
        vy: 0,
        trail: [] as { x: number; y: number; alpha: number }[],
        exploded: false,
        color: "#ffd93d",
        launchTime: 0,
      };
      r1.vx = (r1.targetX - r1.x) / flightDuration;
      r1.vy = (r1.targetY - r1.y) / flightDuration;
      rockets.push(r1);

      const r2 = {
        x: w * 0.92,
        y: h * 0.92,
        targetX: w * 0.58,
        targetY: h * 0.34,
        vx: 0,
        vy: 0,
        trail: [] as { x: number; y: number; alpha: number }[],
        exploded: false,
        color: "#ff6b6b",
        launchTime: 1000, // 1 second delay
      };
      r2.vx = (r2.targetX - r2.x) / flightDuration;
      r2.vy = (r2.targetY - r2.y) / flightDuration;
      rockets.push(r2);

      return true;
    };

    const createExplosion = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = 3 + Math.random() * 7;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 3 + Math.random() * 4,
          decay: 0.008 + Math.random() * 0.008,
          life: 1,
        });
      }
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 4;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1, color: "#fff",
          size: 2 + Math.random() * 3,
          decay: 0.02 + Math.random() * 0.015,
          life: 1,
        });
      }
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 5 + Math.random() * 4;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 2 + Math.random() * 2,
          decay: 0.006 + Math.random() * 0.006,
          life: 1,
        });
      }
    };

    const animate = (timestamp: number) => {
      if (done) return;

      if (!lastTime) {
        lastTime = timestamp;
        startTime = timestamp;
      }

      const rawDt = timestamp - lastTime;
      lastTime = timestamp;
      // Clamp dt to avoid huge jumps (e.g. tab was hidden)
      const dt = Math.min(rawDt, 50);
      const scale = dt / BASE_DT; // 1.0 at 60fps, higher if slower

      const elapsed = timestamp - startTime;

      const w = canvas.width;
      const h = canvas.height;

      if (!rocketsInitialized) {
        syncSize();
        rocketsInitialized = initRockets();
        if (!rocketsInitialized) {
          animId = requestAnimationFrame(animate);
          return;
        }
      }

      ctx.clearRect(0, 0, w, h);

      // Update & draw rockets
      rockets.forEach((r) => {
        if (r.exploded) return;
        if (elapsed < r.launchTime) return;

        r.x += r.vx * scale;
        r.y += r.vy * scale;

        // Trail
        r.trail.push({ x: r.x, y: r.y, alpha: 1 });
        if (r.trail.length > 25) r.trail.shift();

        // Draw trail with glow
        r.trail.forEach((t, ti) => {
          t.alpha -= 0.045 * scale;
          if (t.alpha <= 0) return;
          const trailSize = 3.5 * (ti / r.trail.length);

          ctx.beginPath();
          ctx.arc(t.x, t.y, trailSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.globalAlpha = t.alpha * 0.15;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(t.x, t.y, trailSize, 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.globalAlpha = t.alpha * 0.8;
          ctx.fill();
        });

        // Rocket head glow
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.fill();

        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();

        // Sparks while flying
        if (Math.random() < 0.5 * scale) {
          particles.push({
            x: r.x + (Math.random() - 0.5) * 4,
            y: r.y + (Math.random() - 0.5) * 4,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 2 + 0.5,
            alpha: 1, color: r.color,
            size: 1.5 + Math.random(),
            decay: 0.04 + Math.random() * 0.03,
            life: 1,
          });
        }

        // Check if reached target
        const dx = r.targetX - r.x;
        const dy = r.targetY - r.y;
        if (Math.sqrt(dx * dx + dy * dy) < 12) {
          r.exploded = true;
          createExplosion(r.x, r.y, 100);
        }
      });

      // Update & draw particles
      ctx.globalAlpha = 1;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * scale;
        p.y += p.vy * scale;
        p.vy += 0.03 * scale;
        p.vx *= Math.pow(0.99, scale);
        p.life -= p.decay * scale;
        p.alpha = Math.max(0, p.life);

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const s = p.size * Math.max(0.3, p.life);

        ctx.beginPath();
        ctx.arc(p.x, p.y, s * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.2;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      // Check if all done
      const allExploded = rockets.every((r) => r.exploded);
      if (allExploded && particles.length === 0) {
        done = true;
        let fadeAlpha = 1;
        const fadeOut = () => {
          fadeAlpha -= 0.05;
          if (fadeAlpha <= 0) {
            ctx.clearRect(0, 0, w, h);
            canvas.style.opacity = "0";
            return;
          }
          canvas.style.opacity = String(fadeAlpha);
          requestAnimationFrame(fadeOut);
        };
        fadeOut();
        return;
      }

      animId = requestAnimationFrame(animate);
    };

    // Wait for layout to settle, then start
    const startTimeout = setTimeout(() => {
      syncSize();
      animId = requestAnimationFrame(animate);
    }, 800);

    const handleResize = () => {
      syncSize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      done = true;
      cancelAnimationFrame(animId);
      clearTimeout(startTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 50 }}
    />
  );
}