import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import svLogoBadge from "figma:asset/389f347f23d75ed31a109e0cf49ef599b9018841.png";

const SALE_START = new Date("2026-05-01T00:00:00+02:00");

function getTimeLeft() {
  const now = new Date();
  const diff = SALE_START.getTime() - now.getTime();
  if (diff <= 0) return null;
  return {
    tage: Math.floor(diff / (1000 * 60 * 60 * 24)),
    stunden: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minuten: Math.floor((diff / (1000 * 60)) % 60),
    sekunden: Math.floor((diff / 1000) % 60),
  };
}

/* ── Konfetti-Punkte ── */
function FestConfetti() {
  const dots = useMemo(() => {
    const colors = ["#f5c542", "#e85d3a", "#2d8b6f", "#d4437a", "#ffffff", "#006B3F"];
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 3 + Math.random() * 6,
      color: colors[i % colors.length],
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      opacity: 0.2 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: d.color,
            opacity: d.opacity,
            animation: `confetti-float ${d.duration}s ${d.delay}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Mini-Wimpelkette ── */
function MiniPennants({ count = 14, className = "" }: { count?: number; className?: string }) {
  const green = "#006B3F";
  const white = "#ffffff";
  const getY = (x: number, w: number) => {
    const t = x / w;
    return 8 + 50 * t * (1 - t);
  };
  const getAngle = (x: number, w: number) => {
    const t = x / w;
    return Math.atan2(50 - 100 * t, w) * (180 / Math.PI);
  };
  const vw = 1000;

  return (
    <div className={`w-full pointer-events-none ${className}`}>
      <svg viewBox={`0 0 ${vw} 65`} className="w-full" preserveAspectRatio="none" style={{ display: "block" }}>
        <path d={`M0,8 Q${vw / 2},38 ${vw},8`} stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" />
        {Array.from({ length: count }).map((_, i) => {
          const x = (i + 0.5) * (vw / count);
          const ropeY = getY(x, vw);
          const angle = getAngle(x, vw);
          const fill = i % 2 === 0 ? green : white;
          return (
            <polygon
              key={i}
              points="-14,0 14,0 0,40"
              fill={fill}
              opacity={0.8}
              transform={`translate(${x},${ropeY}) rotate(${angle})`}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ── Endlos-Feuerwerk (Canvas) ── */
const FW_COLORS = [
  "#ff4e50", "#fc913a", "#f9d423", "#ede574", "#ffffff",
  "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff9a9e",
  "#ff3366", "#ffcc00", "#00ff88", "#ff7700", "#ff55aa",
];
const BASE_DT = 1000 / 60;

interface FwParticle {
  x: number; y: number; vx: number; vy: number;
  alpha: number; color: string; size: number; decay: number; life: number;
}
interface FwRocket {
  x: number; y: number; targetX: number; targetY: number;
  vx: number; vy: number;
  trail: { x: number; y: number; alpha: number }[];
  exploded: boolean; color: string;
}

function LoopingFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const createRocket = useCallback((w: number, h: number): FwRocket => {
    const startX = 0.1 * w + Math.random() * 0.8 * w;
    const startY = h * 0.95;
    const targetX = 0.1 * w + Math.random() * 0.8 * w;
    const targetY = 0.1 * h + Math.random() * 0.35 * h;
    const flight = 55 + Math.random() * 20;
    return {
      x: startX, y: startY, targetX, targetY,
      vx: (targetX - startX) / flight,
      vy: (targetY - startY) / flight,
      trail: [], exploded: false,
      color: FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)],
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let stopped = false;
    const particles: FwParticle[] = [];
    const rockets: FwRocket[] = [];
    let lastTime = 0;
    let nextLaunch = 800; // ms until first rocket
    let elapsed = 0;

    const syncSize = () => {
      const p = canvas.parentElement;
      if (p) { canvas.width = p.clientWidth; canvas.height = p.clientHeight; }
    };

    const explode = (x: number, y: number) => {
      const count = 60 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = 2 + Math.random() * 6;
        particles.push({
          x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          alpha: 1, color: FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)],
          size: 2 + Math.random() * 3, decay: 0.008 + Math.random() * 0.01, life: 1,
        });
      }
      // glitter
      for (let i = 0; i < 20; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 1 + Math.random() * 3;
        particles.push({
          x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
          alpha: 1, color: "#fff", size: 1.5 + Math.random() * 2,
          decay: 0.02 + Math.random() * 0.015, life: 1,
        });
      }
    };

    const animate = (ts: number) => {
      if (stopped) return;
      if (!lastTime) lastTime = ts;
      const rawDt = ts - lastTime;
      lastTime = ts;
      const dt = Math.min(rawDt, 50);
      const scale = dt / BASE_DT;
      elapsed += dt;

      const w = canvas.width;
      const h = canvas.height;

      // Launch rockets at intervals
      if (elapsed >= nextLaunch) {
        rockets.push(createRocket(w, h));
        nextLaunch = elapsed + 2500 + Math.random() * 3000; // every 2.5–5.5s
      }

      ctx.clearRect(0, 0, w, h);

      // Rockets
      for (let ri = rockets.length - 1; ri >= 0; ri--) {
        const r = rockets[ri];
        if (r.exploded) { rockets.splice(ri, 1); continue; }

        r.x += r.vx * scale;
        r.y += r.vy * scale;
        r.trail.push({ x: r.x, y: r.y, alpha: 1 });
        if (r.trail.length > 20) r.trail.shift();

        // Draw trail
        r.trail.forEach((t, ti) => {
          t.alpha -= 0.05 * scale;
          if (t.alpha <= 0) return;
          const sz = 2.5 * (ti / r.trail.length);
          ctx.globalAlpha = t.alpha * 0.15;
          ctx.beginPath(); ctx.arc(t.x, t.y, sz * 3, 0, Math.PI * 2);
          ctx.fillStyle = r.color; ctx.fill();
          ctx.globalAlpha = t.alpha * 0.7;
          ctx.beginPath(); ctx.arc(t.x, t.y, sz, 0, Math.PI * 2);
          ctx.fillStyle = r.color; ctx.fill();
        });

        // Head glow
        ctx.globalAlpha = 0.35;
        ctx.beginPath(); ctx.arc(r.x, r.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = r.color; ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath(); ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#fff"; ctx.fill();

        // Sparks
        if (Math.random() < 0.4 * scale) {
          particles.push({
            x: r.x + (Math.random() - 0.5) * 3, y: r.y + (Math.random() - 0.5) * 3,
            vx: (Math.random() - 0.5) * 1.5, vy: Math.random() * 2 + 0.3,
            alpha: 1, color: r.color, size: 1 + Math.random(), decay: 0.05 + Math.random() * 0.03, life: 1,
          });
        }

        // Reached target?
        const dx = r.targetX - r.x, dy = r.targetY - r.y;
        if (Math.sqrt(dx * dx + dy * dy) < 10) {
          r.exploded = true;
          explode(r.x, r.y);
        }
      }

      // Particles
      ctx.globalAlpha = 1;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * scale;
        p.y += p.vy * scale;
        p.vy += 0.03 * scale;
        p.vx *= Math.pow(0.99, scale);
        p.life -= p.decay * scale;
        p.alpha = Math.max(0, p.life);
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        const s = p.size * Math.max(0.3, p.life);
        ctx.globalAlpha = p.alpha * 0.2;
        ctx.beginPath(); ctx.arc(p.x, p.y, s * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath(); ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(animate);
    };

    syncSize();
    const resizeHandler = () => syncSize();
    window.addEventListener("resize", resizeHandler);
    animId = requestAnimationFrame(animate);

    return () => { stopped = true; cancelAnimationFrame(animId); window.removeEventListener("resize", resizeHandler); };
  }, [createRocket]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 15 }}
    />
  );
}

export function TicketCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => {
      const t = getTimeLeft();
      setTimeLeft(t);
      if (!t) {
        clearInterval(id);
        navigate("/tickets");
      }
    }, 1000);
    return () => clearInterval(id);
  }, [navigate]);

  if (!timeLeft) return null;

  const blocks = [
    { label: "Tage", value: timeLeft.tage },
    { label: "Stunden", value: timeLeft.stunden },
    { label: "Minuten", value: timeLeft.minuten },
    { label: "Sekunden", value: timeLeft.sekunden },
  ];

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1a3a2e 0%, #2d8b6f 20%, #e85d3a 50%, #d4437a 75%, #1a1a2e 100%)",
      }}
    >
      <style>{`
        @keyframes confetti-float {
          0% { transform: translateY(0px) rotate(0deg) scale(1); }
          100% { transform: translateY(-25px) rotate(180deg) scale(0.7); }
        }
        @keyframes countdown-glow {
          0%, 100% { box-shadow: 0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15); }
          50% { box-shadow: 0 4px 40px rgba(245,197,66,0.3), 0 0 60px rgba(245,197,66,0.1), inset 0 1px 0 rgba(255,255,255,0.2); }
        }
        @keyframes badge-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        @keyframes ticket-sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
      `}</style>

      <FestConfetti />
      <LoopingFireworks />

      {/* Radial light overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 30%, rgba(245,197,66,0.15) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(45,139,111,0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(232,93,58,0.1) 0%, transparent 50%)",
        }}
      />

      {/* Sparkle stars */}
      {[
        { top: "8%", left: "12%", delay: 0, size: 16 },
        { top: "15%", right: "10%", delay: 1.2, size: 12 },
        { top: "45%", left: "6%", delay: 2.5, size: 14 },
        { top: "55%", right: "8%", delay: 0.8, size: 10 },
        { top: "25%", left: "85%", delay: 3, size: 18 },
        { top: "70%", left: "15%", delay: 1.8, size: 11 },
        { top: "35%", right: "18%", delay: 4, size: 13 },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            top: s.top,
            left: s.left,
            right: (s as any).right,
            width: s.size,
            height: s.size,
            animation: `sparkle ${3 + i * 0.5}s ${s.delay}s ease-in-out infinite`,
            zIndex: 20,
          }}
        >
          <svg viewBox="0 0 24 24" fill="#f5c542">
            <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" />
          </svg>
        </div>
      ))}

      {/* Top pennants */}
      <div className="relative z-20 mt-16 sm:mt-20">
        <MiniPennants count={16} />
      </div>

      {/* Main content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 -mt-4">
        {/* Badge logo – GROSS */}
        <div
          className="mb-6"
          style={{ animation: "badge-float 4s ease-in-out infinite" }}
        >
          <img
            src={svLogoBadge}
            alt="Schützenverein Bahrdorf 1850 e.V."
            className="object-contain drop-shadow-2xl"
            style={{
              width: "clamp(200px, 45vw, 380px)",
              height: "clamp(200px, 45vw, 380px)",
              filter: "drop-shadow(0 0 35px rgba(255,255,255,0.35)) drop-shadow(0 0 80px rgba(245,197,66,0.2))",
            }}
          />
        </div>

        {/* Heading */}
        <h1
          className="text-white text-center mb-1 drop-shadow-lg"
          style={{
            fontSize: "clamp(26px, 5.5vw, 44px)",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            lineHeight: 1.15,
          }}
        >
          Ticket-Vorverkauf
        </h1>

        {/* Subtitle with decorative frame */}
        <div className="flex items-center justify-center gap-3 mb-2 mt-1">
          <span className="text-accent/70" style={{ fontSize: 18 }}>»</span>
          <p
            style={{
              fontSize: "clamp(14px, 3vw, 20px)",
              fontFamily: "'Fredoka', sans-serif",
              color: "#f5c542",
              textShadow: "0 2px 10px rgba(245,197,66,0.4)",
            }}
          >
            startet am 1. Mai 2026
          </p>
          <span className="text-accent/70" style={{ fontSize: 18 }}>«</span>
        </div>

        {/* Event info */}
        <p
          className="text-white/60 text-center max-w-sm mx-auto mb-8"
          style={{
            fontSize: "clamp(12px, 2vw, 14px)",
            fontFamily: "'Nunito', sans-serif",
            lineHeight: 1.7,
          }}
        >
          Schützenfest Bahrdorf · 11. – 13. September 2026
          <br />
          Sichere dir rechtzeitig deine Tickets!
        </p>

        {/* Countdown */}
        <div className="flex items-start justify-center gap-2 sm:gap-4 mb-10">
          {blocks.map((block, i) => (
            <div key={block.label} className="flex items-start gap-2 sm:gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="rounded-2xl flex items-center justify-center relative"
                  style={{
                    width: "clamp(62px, 17vw, 95px)",
                    height: "clamp(72px, 20vw, 110px)",
                    background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)",
                    border: "2px solid rgba(245,197,66,0.25)",
                    backdropFilter: "blur(12px)",
                    animation: "countdown-glow 4s ease-in-out infinite",
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  {/* Subtle inner shine */}
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 40%)",
                    }}
                  />
                  <span
                    className="text-white tabular-nums relative z-10"
                    style={{
                      fontSize: "clamp(30px, 8vw, 50px)",
                      fontFamily: "'Fredoka', sans-serif",
                      fontWeight: 600,
                      textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                    }}
                  >
                    {String(block.value).padStart(2, "0")}
                  </span>
                </div>
                <span
                  className="mt-2 uppercase tracking-wider"
                  style={{
                    fontSize: "clamp(9px, 1.8vw, 12px)",
                    fontFamily: "'Nunito', sans-serif",
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {block.label}
                </span>
              </div>
              {i < blocks.length - 1 && (
                <span
                  className="mt-4 sm:mt-6"
                  style={{
                    fontSize: "clamp(22px, 5vw, 34px)",
                    fontFamily: "'Fredoka', sans-serif",
                    color: "rgba(245,197,66,0.4)",
                  }}
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Ticket SVG decoration + back button */}
        <div className="flex flex-col items-center gap-5">
          {/* Decorative ticket stub */}
          <div style={{ animation: "ticket-sway 3s ease-in-out infinite" }}>
            <svg
              viewBox="0 0 200 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "clamp(160px, 40vw, 220px)", height: "auto", opacity: 0.7 }}
            >
              <defs>
                <mask id="cd-ticket-mask">
                  <rect x="0" y="0" width="200" height="60" rx="8" fill="white" />
                  <circle cx="0" cy="30" r="9" fill="black" />
                  <circle cx="200" cy="30" r="9" fill="black" />
                  {[30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170].map((x) => (
                    <circle key={`t-${x}`} cx={x} cy="0" r="2" fill="black" />
                  ))}
                  {[30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170].map((x) => (
                    <circle key={`b-${x}`} cx={x} cy="60" r="2" fill="black" />
                  ))}
                </mask>
                <linearGradient id="cd-ticket-bg" x1="0" y1="0" x2="200" y2="60" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#2d8b6f" />
                  <stop offset="100%" stopColor="#1a6b4a" />
                </linearGradient>
              </defs>
              <g mask="url(#cd-ticket-mask)">
                <rect x="0" y="0" width="200" height="60" fill="url(#cd-ticket-bg)" />
                <rect x="0" y="0" width="32" height="60" fill="rgba(0,0,0,0.1)" />
                <line x1="32" y1="5" x2="32" y2="55" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="3 2" />
                <text x="16" y="35" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.5)" fontFamily="'Playfair Display', serif" fontWeight="700">★</text>
                <text x="116" y="28" textAnchor="middle" fill="white" fontSize="13" fontFamily="'Playfair Display', serif" fontWeight="700" fontStyle="italic" letterSpacing="0.04em">Vorverkauf</text>
                <text x="116" y="44" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="'Nunito', sans-serif">ab Mai 2026</text>
              </g>
            </svg>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-white transition-all hover:scale-105"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              fontSize: 14,
              fontFamily: "'Fredoka', sans-serif",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
